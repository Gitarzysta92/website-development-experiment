import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const root = path.dirname(new URL(import.meta.url).pathname);
const require = createRequire(path.join(root, 'snapshots/A/package.json'));
const { chromium, firefox, webkit } = require('@playwright/test');
const inventory = JSON.parse(fs.readFileSync(path.join(root, 'scorecard-template.json'))).page_purposes;
const out = path.join(root, 'evidence/interactions'); fs.mkdirSync(out, { recursive: true });
const results = [];
function save() { fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(results, null, 2)); }
async function check(id, fn) { try { const data = await fn(); results.push({ id, status: 'pass', ...data }); } catch (e) { results.push({ id, status: 'fail', error: e.message }); } save(); }
function assert(value, message) { if (!value) throw new Error(message); }
for (const [engine, type] of Object.entries({ chromium, firefox, webkit })) {
  let browser;
  try { browser = await type.launch({ headless: true }); } catch (e) { results.push({ id: engine, status: 'not_tested', error: e.message }); save(); continue; }
  for (const label of ['A', 'B']) {
    const base = label === 'A' ? 'http://127.0.0.1:4501' : 'http://127.0.0.1:4511';
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await context.route('**/*', r => /^https?:\/\/127\.0\.0\.1:/.test(r.request().url()) ? r.continue() : r.abort());
    const page = await context.newPage(); page.setDefaultTimeout(4000);
    page.on('dialog', d => d.accept());
    for (const locale of ['en', 'pl']) {
      const route = id => inventory.find(x => x.page_id === id)[`proposed_${locale}`];
      await check(`${label}-${engine}-${locale}-investor`, async () => {
        await page.goto(base + route('home'));
        await page.locator(`main a[href="${route('investors')}"]`).first().click();
        assert(new URL(page.url()).pathname === route('investors'), 'Investor link destination');
        await page.locator(`main a[href="${route('artisense')}"]`).first().click();
        await page.locator(`a[href="${route('artisense-validation')}"]`).filter({ visible: true }).first().click();
        await page.locator(`a[href^="${route('contact')}?intent=investment"]`).filter({ visible: true }).first().click();
        assert(await page.locator('[name="intent"]').inputValue() === 'investment', 'Investment intent not preserved');
        return { finalUrl: page.url() };
      });
      await check(`${label}-${engine}-${locale}-partner`, async () => {
        await page.goto(base + route('artisense-technology'));
        await page.locator(`a[href="${route('partnerships')}"]`).filter({ visible: true }).first().click();
        await page.locator(`a[href^="${route('contact')}?intent=partnership"]`).first().click();
        assert(await page.locator('[name="intent"]').inputValue() === 'partnership', 'Partnership intent not preserved');
        return { finalUrl: page.url() };
      });
      await check(`${label}-${engine}-${locale}-demo`, async () => {
        await page.goto(base + route('aifield-ai'));
        await page.locator(`a[href^="${route('contact')}?intent=demo"]`).first().click();
        assert(await page.locator('[name="intent"]').inputValue() === 'demo', 'Demo intent not preserved');
        assert(await page.locator('[name="project"]').inputValue() === 'aifield', 'AIFIELD context not preserved');
        return { finalUrl: page.url() };
      });
      await check(`${label}-${engine}-${locale}-mobile-menu-keyboard`, async () => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(base + route('home'));
        const menu = page.getByRole('button', { name: /Menu/ }).first();
        await menu.focus(); await page.keyboard.press('Enter');
        assert(await menu.getAttribute('aria-expanded') === 'true', 'Menu not expanded from keyboard');
        assert(await page.locator(`header a[href="${route('investors')}"]`).isVisible(), 'Investor link hidden in expanded menu');
        await page.screenshot({ path: path.join(out, `${label}-${engine}-${locale}-menu.png`) });
        await page.keyboard.press('Escape');
        assert(await menu.getAttribute('aria-expanded') === 'false', 'Escape did not close menu');
        return { activeElement: await page.evaluate(() => document.activeElement?.outerHTML) };
      });
      await check(`${label}-${engine}-${locale}-form`, async () => {
        await page.goto(base + route('contact') + '?intent=demo&project=aifield');
        const requests = [];
        const collect = r => { if (r.method() === 'POST') requests.push({ url: r.url(), data: r.postData() }); };
        page.on('request', collect);
        await page.locator('button[type="submit"]').click();
        const invalid = await page.locator('[aria-invalid="true"]').count();
        assert(invalid >= 2, 'Blank fields did not get visible invalid states');
        await page.screenshot({ path: path.join(out, `${label}-${engine}-${locale}-errors.png`), fullPage: true });
        await page.locator('[name="email"]').fill('evaluation@example.invalid');
        await page.locator('[name="message"]').fill('Synthetic evaluation message for a local AIFIELD demonstration. No real enquiry.');
        if (label === 'A' && engine === 'chromium') {
          const receiptResponse = page.waitForResponse(r => r.url().endsWith('/api/enquiries') && r.request().method() === 'POST');
          await page.locator('button[type="submit"]').click();
          const response = await receiptResponse; const body = await response.json();
          await page.locator('[data-state="accepted"]').waitFor();
          assert(body.status === 'accepted' && body.mode === 'fixture' && body.receiptId?.startsWith('local-'), 'No local fixture receipt');
          const post = requests[0];
          const repeat = await context.request.post(base + '/api/enquiries', { headers: { Origin: base, 'Content-Type': 'application/json' }, data: post.data });
          const duplicate = await repeat.json();
          assert(duplicate.receiptId === body.receiptId, 'Retry produced a different receipt');
          await page.screenshot({ path: path.join(out, `${label}-${engine}-${locale}-receipt.png`), fullPage: true });
          page.off('request', collect);
          return { invalid, requests: requests.length, receipt: body, duplicate, statusText: await page.locator('[role="status"]').innerText() };
        }
        if (label === 'B') {
          await page.locator('button[type="submit"]').click();
          await page.locator('[data-draft]').waitFor({ state: 'visible' });
          const draft = await page.locator('#draft-text').inputValue();
          assert(draft.includes('evaluation@example.invalid') && draft.includes('Synthetic evaluation'), 'Draft missing supplied values');
          assert(requests.length === 0, 'Unexpected network submission from draft form');
          const mailto = await page.locator('[data-draft] a[href^="mailto:"]').getAttribute('href');
          await page.screenshot({ path: path.join(out, `${label}-${engine}-${locale}-draft.png`), fullPage: true });
          await page.locator('[data-edit]').click();
          assert((await page.locator('[name="message"]').inputValue()).includes('Synthetic evaluation'), 'Editing draft lost form data');
          page.off('request', collect); return { invalid, networkSubmissions: requests.length, mailto, draft };
        }
        page.off('request', collect);
        return { invalid, receipt: 'Chromium verifies live fixture; other engines checked form entry and validation' };
      });
      await page.setViewportSize({ width: 1440, height: 900 });
    }
    if (engine === 'chromium') {
      for (const item of inventory) await check(`${label}-language-${item.page_id}`, async () => {
        await page.goto(base + item.proposed_en);
        await page.locator(`a[href="${item.proposed_pl}"]`).filter({ visible: true }).first().click();
        assert(new URL(page.url()).pathname === item.proposed_pl && await page.locator('html').getAttribute('lang') === 'pl', 'Wrong Polish equivalent');
        await page.reload();
        await page.goBack();
        assert(new URL(page.url()).pathname === item.proposed_en, 'Back did not restore English page');
        await page.goForward();
        assert(new URL(page.url()).pathname === item.proposed_pl, 'Forward did not restore Polish page');
        return {};
      });
      for (const [view, width, height] of [['narrow', 320, 640], ['short', 1280, 720]]) {
        await page.setViewportSize({ width, height });
        for (const item of inventory) await check(`${label}-${view}-${item.page_id}`, async () => {
          await page.goto(base + item.proposed_pl);
          const dimensions = await page.evaluate(() => ({ viewport: innerWidth, page: document.documentElement.scrollWidth }));
          assert(dimensions.page <= dimensions.viewport + 1, 'Horizontal page overflow');
          await page.screenshot({ path: path.join(out, `${label}-${view}-${item.page_id}.png`), fullPage: true });
          return dimensions;
        });
      }
      await page.setViewportSize({ width: 1440, height: 900 });
      for (const id of ['home', 'artisense-technology', 'aifield-neural', 'contact']) {
        await check(`${label}-zoom-${id}`, async () => {
          await page.goto(base + inventory.find(x => x.page_id === id).proposed_pl);
          await page.evaluate(() => { document.documentElement.style.zoom = '2'; });
          const d = await page.evaluate(() => ({ viewport: innerWidth, scroll: document.documentElement.scrollWidth }));
          await page.screenshot({ path: path.join(out, `${label}-zoom-${id}.png`) });
          assert(d.scroll <= d.viewport + 1, 'Overflow under 200 percent CSS zoom proxy'); return { ...d, method: 'CSS zoom proxy, not native browser zoom' };
        });
      }
      await context.tracing.stop().catch(() => {});
    }
    await context.close();
    console.log(`${label} ${engine}: ${results.length} cumulative checks`);
  }
  await browser.close();
}
console.log('Interaction checks complete.');
