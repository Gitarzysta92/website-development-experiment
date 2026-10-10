import fs from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const root = path.dirname(new URL(import.meta.url).pathname);
const require = createRequire(path.join(root, 'snapshots/A/package.json'));
const { chromium } = require('@playwright/test');
const { default: lighthouse } = await import(pathToFileURL(require.resolve('lighthouse')));
const pages = JSON.parse(fs.readFileSync(path.join(root, 'scorecard-template.json'))).page_purposes;
const out = path.join(root, 'evidence/performance'); fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--remote-debugging-port=9223'] });
const options = { port: 9223, output: 'json', onlyCategories: ['performance'], logLevel: 'error', formFactor: 'mobile', screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 1, disabled: false }, throttlingMethod: 'simulate', throttling: { rttMs: 150, throughputKbps: 1638.4, requestLatencyMs: 562.5, downloadThroughputKbps: 1474.56, uploadThroughputKbps: 675, cpuSlowdownMultiplier: 4 }, disableStorageReset: false };
fs.writeFileSync(path.join(out, 'conditions.json'), JSON.stringify({ options, chromium: browser.version(), node: process.version, repetitions: 3, cache: 'Lighthouse storage/cache reset enabled on each run', order: 'alternating A/B by repetition', longestEvidenceSelection: 'artisense-validation is longest rendered validation page in each site by English word count' }, null, 2));
const records = [];
try {
  for (const id of ['home', 'artisense', 'aifield', 'artisense-validation', 'contact']) {
    for (const locale of ['en', 'pl']) {
      for (let repetition = 1; repetition <= 3; repetition++) {
        for (const label of repetition % 2 ? ['A', 'B'] : ['B', 'A']) {
          const base = label === 'A' ? 'http://127.0.0.1:4501' : 'http://127.0.0.1:4511';
          const url = base + pages.find(p => p.page_id === id)[`proposed_${locale}`];
          const name = `${label}-${locale}-${id}-${repetition}`;
          try {
            const result = await lighthouse(url, options);
            fs.writeFileSync(path.join(out, `${name}.json.gz`), gzipSync(JSON.stringify(result.lhr)));
            const audits = result.lhr.audits;
            records.push({ name, label, locale, pageId: id, repetition, url, lighthouseVersion: result.lhr.lighthouseVersion, score: result.lhr.categories.performance.score, lcp_ms: audits['largest-contentful-paint'].numericValue, fcp_ms: audits['first-contentful-paint'].numericValue, cls: audits['cumulative-layout-shift'].numericValue, tbt_ms: audits['total-blocking-time'].numericValue, speed_index_ms: audits['speed-index'].numericValue, transfer_bytes: audits['total-byte-weight'].numericValue, warnings: result.lhr.runWarnings, runtimeError: result.lhr.runtimeError || null });
          } catch (e) { records.push({ name, label, locale, pageId: id, repetition, error: e.message }); }
          fs.writeFileSync(path.join(out, 'measurements.json'), JSON.stringify(records, null, 2));
          console.log(`${records.length}/60 ${name}: ${records.at(-1).error || records.at(-1).score}`);
        }
      }
    }
  }
} finally { await browser.close(); }
