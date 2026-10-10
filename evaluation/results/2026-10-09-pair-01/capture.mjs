import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const root = path.dirname(new URL(import.meta.url).pathname);
const require = createRequire(path.join(root, 'snapshots/A/package.json'));
const { chromium } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const pages = JSON.parse(fs.readFileSync(path.join(root, 'scorecard-template.json'))).page_purposes;
const out = path.join(root, 'evidence/browser');
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ deviceScaleFactor: 1 });
await context.route('**/*', route => /^https?:\/\/127\.0\.0\.1:/.test(route.request().url()) ? route.continue() : route.abort());
const page = await context.newPage();
const environment = { chromium: browser.version(), node: process.version, platform: process.platform, architecture: process.arch, playwright: require('@playwright/test/package.json').version, axe: JSON.parse(fs.readFileSync(path.join(root, 'snapshots/A/node_modules/@axe-core/playwright/package.json'))).version, deviceScaleFactor: 1, externalRequests: 'blocked', startedAt: new Date().toISOString() };
fs.writeFileSync(path.join(out, 'environment.json'), JSON.stringify(environment, null, 2));
const records = [];
for (const [index, record] of pages.entries()) {
  for (const locale of ['en', 'pl']) {
    for (const label of index % 2 ? ['B', 'A'] : ['A', 'B']) {
      const base = label === 'A' ? 'http://127.0.0.1:4501' : 'http://127.0.0.1:4511';
      for (const [view, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
        const id = `${label}-${locale}-${record.page_id}-${view}`;
        const errors = [];
        const collectError = e => errors.push(e.message);
        page.on('pageerror', collectError);
        try {
          await page.setViewportSize({ width, height });
          const response = await page.goto(base + record[`proposed_${locale}`], { waitUntil: 'networkidle' });
          await page.evaluate(() => document.fonts.ready);
          const dom = await page.evaluate(() => ({
            title: document.title, language: document.documentElement.lang,
            h1: [...document.querySelectorAll('h1')].map(x => x.innerText),
            headings: [...document.querySelectorAll('h1,h2,h3')].map(x => ({ level: x.tagName, text: x.innerText })),
            text: document.body.innerText,
            links: [...document.querySelectorAll('a[href]')].map(a => ({ text: a.innerText, href: a.getAttribute('href'), lang: a.hreflang })),
            metadata: [...document.querySelectorAll('meta[name],meta[property],link[rel="canonical"],link[rel="alternate"]')].map(e => Object.fromEntries([...e.attributes].map(a => [a.name, a.value]))),
            forms: [...document.forms].map(f => ({ action: f.getAttribute('action'), method: f.method, controls: [...f.elements].map(e => ({ tag: e.tagName, name: e.name, type: e.type, required: e.required, label: e.labels?.[0]?.innerText })) })),
            images: [...document.images].map(e => ({ src: e.getAttribute('src'), alt: e.alt, loaded: e.complete && e.naturalWidth > 0 })),
            viewport: { width: innerWidth, height: innerHeight, scrollWidth: document.documentElement.scrollWidth },
            overflowing: [...document.querySelectorAll('main *,header *,footer *')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.right > innerWidth + 2 || r.left < -2) && getComputedStyle(e).position !== 'absolute'; }).slice(0, 20).map(e => ({ tag: e.tagName, class: e.className, text: e.innerText?.slice(0, 100) }))
          }));
          await page.screenshot({ path: path.join(out, `${id}.png`), fullPage: true, animations: 'disabled' });
          const axe = await new AxeBuilder({ page }).analyze();
          const item = { id, label, locale, pageId: record.page_id, view, url: page.url(), status: response?.status(), errors, ...dom, axe: { violations: axe.violations, incomplete: axe.incomplete.map(i => ({ id: i.id, impact: i.impact, nodeCount: i.nodes.length })), passes: axe.passes.length } };
          fs.writeFileSync(path.join(out, `${id}.json`), JSON.stringify(item, null, 2));
          records.push({ id, status: item.status, overflow: dom.viewport.scrollWidth > width, violations: axe.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })), errors });
        } catch (error) {
          records.push({ id, error: error.message });
        } finally { page.off('pageerror', collectError); }
        fs.writeFileSync(path.join(out, 'index.json'), JSON.stringify(records, null, 2));
      }
    }
  }
  console.log(`${index + 1}/${pages.length} page purposes captured; ${records.length} viewport checks`);
}
await browser.close();
console.log('Capture and accessibility audit complete.');
