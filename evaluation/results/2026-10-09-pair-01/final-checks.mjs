import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const root = path.dirname(new URL(import.meta.url).pathname);
const require = createRequire(path.join(root, 'snapshots/A/package.json'));
const { chromium, expect } = require('@playwright/test');
const template = JSON.parse(fs.readFileSync(path.join(root, 'scorecard-template.json')));
const out = path.join(root, 'evidence/final-checks'); fs.mkdirSync(out, { recursive: true });
const results = [];
const assert = (value, text) => { if (!value) throw new Error(text); };
async function check(id, fn) { try { results.push({ id, status: 'pass', ...await fn() }); } catch (e) { results.push({ id, status: 'fail', error: e.message }); } fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(results, null, 2)); }
const browser = await chromium.launch({ headless: true });
for (const label of ['A', 'B']) {
  const base = label === 'A' ? 'http://127.0.0.1:4501' : 'http://127.0.0.1:4511';
  const pages = template.page_purposes.map(p => ['en', 'pl'].map(locale => JSON.parse(fs.readFileSync(path.join(root, `evidence/browser/${label}-${locale}-${p.page_id}-desktop.json`))))).flat();
  const urls = new Set();
  for (const page of pages) for (const link of page.links) {
    const url = new URL(link.href, base + new URL(page.url).pathname);
    if (url.origin === base) urls.add(url.href);
  }
  await check(`${label}-internal-links`, async () => {
    const cache = new Map(); const broken = [];
    for (const value of urls) {
      const url = new URL(value); const hash = decodeURIComponent(url.hash.slice(1)); url.hash = '';
      if (!cache.has(url.href)) { const r = await fetch(url); cache.set(url.href, { status: r.status, text: await r.text() }); }
      const r = cache.get(url.href);
      if (r.status !== 200 || (hash && !r.text.includes(`id="${hash}"`) && !r.text.includes(`id='${hash}'`))) broken.push({ url: value, status: r.status, hash });
    }
    assert(!broken.length, JSON.stringify(broken)); return { uniqueLinksIncludingFragments: urls.size, uniqueRequests: cache.size };
  });
  await check(`${label}-metadata`, async () => {
    const issues = [];
    for (const p of pages) {
      const item = template.page_purposes.find(x => x.page_id === p.pageId);
      const canonical = p.metadata.find(x => x.rel === 'canonical')?.href;
      if (canonical !== base + item[`proposed_${p.locale}`]) issues.push(`${p.pageId}/${p.locale} canonical`);
      for (const lang of ['en', 'pl', 'x-default']) if (p.metadata.find(x => x.rel === 'alternate' && x.hreflang === lang)?.href !== base + item[`proposed_${lang === 'x-default' ? 'en' : lang}`]) issues.push(`${p.pageId}/${p.locale} alternate ${lang}`);
      if (!p.title || !p.metadata.find(x => x.name === 'description')?.content) issues.push(`${p.pageId}/${p.locale} title/description`);
      if (!p.metadata.find(x => x.name === 'robots')?.content.includes('noindex')) issues.push(`${p.pageId}/${p.locale} preview noindex`);
    }
    assert(!issues.length, JSON.stringify(issues)); return { routes: pages.length, uniqueTitles: new Set(pages.map(p => p.title)).size };
  });
  await check(`${label}-redirects`, async () => {
    const rows = [];
    for (const [from, to] of Object.entries(template.legacy_entries)) { const r = await fetch(base + from, { redirect: 'manual' }); rows.push({ from, to, status: r.status, location: r.headers.get('location') }); assert([301,308].includes(r.status) && new URL(r.headers.get('location'),base).pathname === to, `Incorrect redirect ${from}`); }
    return { redirects: rows };
  });
  await check(`${label}-visibility`, async () => {
    const paths = ['/en/evaluation-missing/', '/pl/evaluation-missing/', '/.env', '/.env.example', '/content/shared/routes.json', '/docs/acceptance-report.md', '/inputs/docs/project-brief.md'];
    const statuses = [];
    for (const p of paths) { const r = await fetch(base + p); statuses.push({ path: p, status: r.status, robots: r.headers.get('x-robots-tag') }); assert(r.status === 404, `Unexpected exposure/status ${p}: ${r.status}`); }
    const sitemap = await (await fetch(base + '/sitemap.xml')).text(); const robots = await (await fetch(base + '/robots.txt')).text();
    assert(!sitemap.includes('<loc>'), 'Preview sitemap includes indexable routes');
    return { statuses, robots, sitemap };
  });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const page = await context.newPage(); page.setDefaultTimeout(5000);
  for (const locale of ['en','pl']) {
    const contact = template.page_purposes.find(x => x.page_id === 'contact')[`proposed_${locale}`];
    await check(`${label}-${locale}-keyboard-and-motion`, async () => {
      await page.goto(base + contact); await page.keyboard.press('Tab');
      const first = await page.evaluate(() => ({ tag: document.activeElement.tagName, text: document.activeElement.textContent.trim(), href: document.activeElement.getAttribute('href') }));
      assert(first.href?.startsWith('#'), 'Skip link not first keyboard target'); await page.keyboard.press('Enter');
      const tree = await page.locator('main').ariaSnapshot();
      fs.writeFileSync(path.join(out, `${label}-${locale}-contact-aria.txt`), tree);
      const motion = await page.evaluate(() => ({ reduced: matchMedia('(prefers-reduced-motion: reduce)').matches, activeAnimations: document.getAnimations().filter(a => a.playState === 'running').length }));
      await page.locator('[name="email"]').focus();
      const focus = await page.locator('[name="email"]').evaluate(el => { const c = getComputedStyle(el); return { outline: c.outline, shadow: c.boxShadow }; });
      await page.screenshot({ path: path.join(out, `${label}-${locale}-keyboard-focus.png`), fullPage: true });
      return { first, motion, focus, screenReader: 'Accessibility tree inspected; no real screen reader used' };
    });
  }
  await check(`${label}-legacy-fragments`, async () => {
    const rows = [];
    for (const id of template.legacy_artisense_fragments) { await page.goto(base + '/artisense-module/#' + id); const target = page.locator(`[id="${id}"]`); assert(await target.count() === 1, `Missing legacy fragment ${id}`); rows.push({ id, finalUrl: page.url(), visible: await target.isVisible() }); }
    return { fragments: rows };
  });
  await context.close();
  const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const fallback = await nojs.newPage();
  await check(`${label}-no-javascript`, async () => {
    await fallback.goto(base + '/en/contact/');
    const submit = fallback.locator('button[type="submit"]');
    const safe = !(await submit.isVisible()) || await submit.isDisabled();
    assert(safe, 'Form can submit unhandled values without JavaScript');
    assert(await fallback.locator('a[href="mailto:info@artifactory.tech"]').first().isVisible(), 'Email fallback absent');
    await fallback.screenshot({ path: path.join(out, `${label}-no-js.png`), fullPage: true }); return { submitHiddenOrDisabled: safe };
  });
  await nojs.close();
}
// Fault injection changes only the browser response in this evaluation session.
const context = await browser.newContext(); const page = await context.newPage(); page.setDefaultTimeout(16000);
for (const locale of ['en','pl']) {
  const url = 'http://127.0.0.1:4501' + (locale === 'en' ? '/en/contact/' : '/pl/kontakt/');
  for (const state of ['rejected','unavailable','uncertain','timeout','duplicate']) {
    await check(`A-${locale}-${state}`, async () => {
      await page.goto(url);
      const bodies = [];
      await page.route('**/api/enquiries', async r => {
        bodies.push(JSON.parse(r.request().postData()));
        if (state === 'timeout') { await new Promise(resolve => setTimeout(resolve, 13000)); await r.abort().catch(() => {}); return; }
        if (state === 'duplicate') await new Promise(resolve => setTimeout(resolve, 400));
        const result = state === 'rejected' ? { status: state, errors: { email: 'invalid' } } : { status: state === 'duplicate' ? 'pending' : state };
        await r.fulfill({ status: state === 'rejected' ? 422 : 503, contentType: 'application/json', body: JSON.stringify(result) });
      });
      await page.locator('[name="email"]').fill('evaluation@example.invalid');
      await page.locator('[name="message"]').fill('Synthetic failure-state evaluation. No real enquiry.');
      if (state === 'duplicate') await page.locator('button[type="submit"]').click({ clickCount: 2 });
      else await page.locator('button[type="submit"]').click();
      const expected = state === 'timeout' ? 'uncertain' : state === 'duplicate' ? 'pending' : state;
      await expect(page.locator('.form-status')).toHaveAttribute('data-state', expected, { timeout: 15000 });
      assert(await page.locator('[name="email"]').inputValue() === 'evaluation@example.invalid', 'Email lost after failure');
      assert((await page.locator('[name="message"]').inputValue()).includes('Synthetic'), 'Message lost after failure');
      if (state === 'duplicate') assert(bodies.length === 1, 'Duplicate click sent multiple requests');
      if (state === 'uncertain') {
        await page.locator('button[type="submit"]').click();
        await expect.poll(() => bodies.length).toBe(2);
        assert(bodies[0].submissionId === bodies[1].submissionId, 'Uncertain retry changed idempotency key');
      }
      await page.screenshot({ path: path.join(out, `A-${locale}-${state}.png`), fullPage: true });
      const text = await page.locator('.form-status').innerText();
      await page.unroute('**/api/enquiries'); return { state: expected, requests: bodies.length, text, evidenceKind: 'browser fault injection' };
    });
    await page.unroute('**/api/enquiries');
  }
}
await context.close(); await browser.close();
console.log(JSON.stringify({ checks: results.length, failures: results.filter(r => r.status !== 'pass') }, null, 2));
