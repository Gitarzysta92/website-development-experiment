import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const root = path.dirname(new URL(import.meta.url).pathname);
const require = createRequire(path.join(root, '../snapshots/A/package.json'));
const { chromium } = require('@playwright/test');
const out = path.join(root, 'evidence');
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];
for (const [label, port] of [['A', 4501], ['B', 4511]]) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.route('**/*', r => new URL(r.request().url()).hostname === '127.0.0.1' ? r.continue() : r.abort());
  await page.goto(`http://127.0.0.1:${port}/en/projects/`);
  const cards = await page.locator('main article').evaluateAll(nodes => nodes.map(n => ({
    class: n.className,
    links: [...n.querySelectorAll('a[href]')].filter(a => a.getBoundingClientRect().height > 0).map(a => ({ href: a.getAttribute('href'), text: a.textContent.trim(), tabIndex: a.tabIndex })),
  })));
  results.push({ id: `${label}-NAV-11`, cards });
  for (const route of ['/pl/projekty/artisense/technologia/', '/pl/projekty/aifield/badania-modeli-pola/', '/pl/jak-pracujemy/']) {
    for (const height of [480, 720]) {
    await page.setViewportSize({ width: 1280, height });
    await page.goto(`http://127.0.0.1:${port}${route}`);
    const selector = label === 'A' ? '.reading-aside-inner' : route.includes('jak-pracujemy') ? '.approach-graphic' : '.article-toc';
    const panel = page.locator(selector);
    if (!(await panel.count())) continue;
    await panel.evaluate(n => window.scrollTo(0, window.scrollY + n.getBoundingClientRect().top + 150));
    const measurement = await panel.evaluate(n => {
      const style = getComputedStyle(n), rect = n.getBoundingClientRect();
      const links = [...n.querySelectorAll('a')].map(a => ({text:a.textContent.trim(),top:a.getBoundingClientRect().top,bottom:a.getBoundingClientRect().bottom}));
      return { position:style.position, declaredTop:style.top, top:rect.top, bottom:rect.bottom, height:rect.height, viewport:innerHeight, overflowY:style.overflowY, links };
    });
    const id = `${label}-LAY-08-${height}-${route.split('/').filter(Boolean).at(-1)}`;
    await page.screenshot({ path: path.join(out, `${id}.png`) });
    results.push({ id, route, measurement, violatesFitContract: measurement.position === 'sticky' && measurement.height + parseFloat(measurement.declaredTop) > measurement.viewport && !['auto','scroll'].includes(measurement.overflowY) });
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`http://127.0.0.1:${port}/pl/projekty/aifield/praca-z-ai/`);
  const toggle = page.locator(label === 'A' ? '[data-menu]' : '[data-menu-toggle]');
  await toggle.click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForFunction(selector => document.querySelector(selector).getAttribute('aria-expanded') === 'false', label === 'A' ? '[data-menu]' : '[data-menu-toggle]');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(100);
  results.push({ id: `${label}-RWD-08`, menuExpandedAfterResize:await toggle.getAttribute('aria-expanded'), overflow:await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth) });
  const response = await page.request.get(`http://127.0.0.1:${port}/en/`);
  results.push({ id:`${label}-SEC-07`, status:response.status(), headers:response.headers() });
  await context.close();
}
const resultPath = path.join(out, 'browser-probes.json');
if (fs.existsSync(resultPath) && !fs.existsSync(path.join(out, 'browser-probes-initial.json'))) fs.copyFileSync(resultPath, path.join(out, 'browser-probes-initial.json'));
fs.writeFileSync(resultPath, JSON.stringify({ chromium:browser.version(), results, correction:'Resize probe now waits for the desktop media-query state before resizing back; the initial rapidly coalesced resize result is not an application failure.' }, null, 2));
await browser.close();
console.log(JSON.stringify(results, null, 2));
