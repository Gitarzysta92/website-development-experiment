import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from '../../runs/2026-10-09-pair-01/02-inputs-only/website/node_modules/@playwright/test/index.mjs';

const values = Object.fromEntries(readFileSync(process.argv[2], 'utf8').split('\n').filter((line) => line.trim() && !line.trimStart().startsWith('#') && line.includes('=')).map((line) => {
  const index = line.indexOf('=');
  return [line.slice(0, index).trim(), line.slice(index + 1).trim().replace(/^['"]|['"]$/g, '')];
}));
const state = JSON.parse(readFileSync(new URL('./artifacts/deployment.json', import.meta.url), 'utf8'));
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const [variant, entry] of Object.entries(state.applications)) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, extraHTTPHeaders: {
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
    await page.locator('[data-language], [data-language-switch]').first().click();
    await page.waitForURL('**/pl/');
    if (await page.locator('html').getAttribute('lang') !== 'pl') throw new Error('Language switch failed');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: fileURLToPath(new URL(`./artifacts/${variant}/mobile.png`, import.meta.url)), fullPage: true });
    if (await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)) throw new Error('Mobile overflow: ' + variant);
    await page.goto(entry.origin + '/en/contact/?intent=investment&project=artisense', { waitUntil: 'networkidle' });
    await page.locator('#email').fill('coolify-browser@example.test');
    await page.locator('#message').fill('Synthetic browser verification of the Coolify preview. No email delivery expected.');
    await page.locator('form button[type="submit"], [data-submit]').first().click();
    if (variant === '01-detailed') {
      await page.locator('.form-status[data-state="accepted"]').waitFor();
      if (!(await page.locator('.form-status').textContent()).includes('No email was sent.')) throw new Error('Missing fixture notice');
    } else {
      await page.locator('[data-draft]').waitFor({ state: 'visible' });
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
