import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from '../../../runs/2026-10-09-pair-01/02-inputs-only/website/node_modules/@playwright/test/index.mjs';

const values = Object.fromEntries(readFileSync(process.argv[2], 'utf8').split('\n').filter((line) => line.trim() && !line.trimStart().startsWith('#') && line.includes('=')).map((line) => {
  const index = line.indexOf('=');
  return [line.slice(0, index).trim(), line.slice(index + 1).trim().replace(/^['"]|['"]$/g, '')];
}));
const state = JSON.parse(readFileSync(new URL('./artifacts/deployment.json', import.meta.url), 'utf8'));
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const [variant, entry] of Object.entries(state.applications)) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', extraHTTPHeaders: {
      'CF-Access-Client-Id': values.CF_Access_Client_Id,
      'CF-Access-Client-Secret': values.CF_Access_Client_Secret,
    } });
    await context.route('**/*', (route) => new URL(route.request().url()).origin === entry.origin ? route.continue() : route.abort());
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('response', (response) => { if (response.status() >= 400) errors.push(`${response.status()} ${new URL(response.url()).pathname}`); });
    const home = await page.goto(entry.origin + '/en/', { waitUntil: 'networkidle' });
    if (home.status() !== 200 || !(await page.locator('h1').isVisible())) throw new Error('Home failed: ' + variant);
    await page.screenshot({ path: fileURLToPath(new URL(`./artifacts/${variant}/desktop.png`, import.meta.url)), fullPage: true });
    await page.locator('.language-switch a[lang=pl]').first().click();
    await page.waitForURL('**/pl/');
    await page.waitForLoadState('networkidle');
    if (await page.locator('html').getAttribute('lang') !== 'pl') throw new Error('Language switch failed');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: fileURLToPath(new URL(`./artifacts/${variant}/mobile.png`, import.meta.url)), fullPage: false, animations: 'disabled' });
    if (await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)) throw new Error('Mobile overflow: ' + variant);
    await page.goto(entry.origin + '/en/contact/?intent=investment&project=artisense', { waitUntil: 'networkidle' });
    if (variant === '01-detailed') {
      await page.locator('#email').fill('coolify-sol-browser@example.test');
      await page.locator('#message').fill('Synthetic browser verification of the Sol medium preview. No email delivery expected.');
      const response = page.waitForResponse(r => r.url().includes('/api/enquiries') && r.request().method() === 'POST');
      await page.locator('#submit-enquiry').click();
      if ((await response).status() !== 200) throw new Error('Fixture request failed');
      await page.waitForFunction(() => document.querySelector('#form-status')?.textContent.includes('No email was sent.'));
    } else {
      await page.waitForFunction(() => document.querySelector('#form-feedback')?.dataset.state === 'unavailable');
      if (!(await page.locator('form button[type="submit"]').isDisabled())) throw new Error('Unconfigured receiver should be disabled');
      if (!(await page.locator('a[href="mailto:info@artifactory.tech"]').first().isVisible())) throw new Error('Missing email alternative');
    }
    if (errors.length) throw new Error(JSON.stringify({ variant, errors }));
    const result = { variant, desktop_home: true, mobile_home: true, language_switch: true, contact_flow: true, browser_errors: errors };
    writeFileSync(new URL(`./artifacts/${variant}/browser-verification.json`, import.meta.url), JSON.stringify(result, null, 2) + '\n');
    console.log(JSON.stringify(result));
    await context.close();
  }
} finally {
  await browser.close();
}
