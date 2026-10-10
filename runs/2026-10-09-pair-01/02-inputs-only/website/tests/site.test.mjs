import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { pages, detailContent, legacyRoutes } from "../src/content.mjs";
import { renderPage } from "../src/render.mjs";

const origin = "http://127.0.0.1:4317";
const rendered = new Map(
  pages.flatMap((page) =>
    ["en", "pl"].map((lang) => [
      page.paths[lang],
      renderPage(page.id, lang, { origin }),
    ]),
  ),
);
test("the page manifest contains 17 identities with 34 unique, paired routes", () => {
  assert.equal(pages.length, 17);
  assert.equal(rendered.size, 34);
  for (const page of pages)
    for (const lang of ["en", "pl"])
      assert.match(page.paths[lang], new RegExp(`^/${lang}/(?:[a-z0-9-]+/)*$`));
});
test("all editorial routes have localized metadata, one main heading, reciprocal alternatives and unique IDs", () => {
  const titles = new Set();
  for (const [path, html] of rendered) {
    const lang = path.split("/")[1];
    assert.ok(html.includes(`<html lang="${lang}"`), path);
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, path);
    assert.ok(html.includes(`rel="canonical" href="${origin}${path}"`), path);
    assert.ok(
      html.includes('hreflang="en"') &&
        html.includes('hreflang="pl"') &&
        html.includes('hreflang="x-default"'),
      path,
    );
    assert.ok(html.includes('content="noindex,nofollow"'), path);
    assert.ok(!html.includes("undefined"), path);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((x) => x[1]);
    assert.equal(
      ids.length,
      new Set(ids).size,
      `${path} has duplicate HTML IDs`,
    );
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    assert.ok(!titles.has(title), `Duplicate localized title: ${title}`);
    titles.add(title);
  }
});
test("all internal links and their target fragments resolve", () => {
  for (const [path, html] of rendered) {
    for (const [, raw] of html.matchAll(/href="([^"]+)"/g)) {
      const value = raw.replaceAll("&amp;", "&");
      if (!value.startsWith("/") && !value.startsWith("#")) continue;
      if (value.startsWith("/assets/")) continue;
      const url = new URL(value, origin + path);
      assert.ok(
        rendered.has(url.pathname),
        `${path} links to missing ${url.pathname}`,
      );
      if (url.hash)
        assert.ok(
          rendered.get(url.pathname).includes(`id="${url.hash.slice(1)}"`),
          `${path} links to missing ${url.hash}`,
        );
    }
  }
});
test("every technical child has its own complete content in both languages", () => {
  assert.equal(Object.keys(detailContent).length, 7);
  for (const data of Object.values(detailContent)) {
    assert.deepEqual(
      data.en.sections.map((s) => s.id),
      data.pl.sections.map((s) => s.id),
    );
    for (const lang of ["en", "pl"]) {
      assert.ok(data[lang].intro.length > 100);
      assert.ok(data[lang].sections.length >= 4);
    }
  }
});
test("legacy Polish sensor fragments exist at the redirect destination", () => {
  const html = rendered.get(legacyRoutes["/artisense-module/"]);
  for (const fragment of ["o-module", "fotonika", "elektronika", "technologie"])
    assert.ok(html.includes(`id="${fragment}"`));
  assert.equal(legacyRoutes["/"], "/en/");
});
test("preview output excludes publication inputs and prevents search indexing", async () => {
  const robots = await readFile(
    new URL("../dist/robots.txt", import.meta.url),
    "utf8",
  );
  const sitemap = await readFile(
    new URL("../dist/sitemap.xml", import.meta.url),
    "utf8",
  );
  assert.ok(robots.includes("Disallow: /"));
  assert.ok(!sitemap.includes("<loc>"));
  for (const html of rendered.values())
    assert.ok(!/inputs\/|\.pdf["?]|mockup-references/.test(html));
});
test("contact never embeds personal data in URLs or persistence APIs", async () => {
  const client = await readFile(
    new URL("../public/client.js", import.meta.url),
    "utf8",
  );
  assert.ok(
    !/localStorage|sessionStorage|document\.cookie|fetch\(/.test(client),
  );
  const html = rendered.get("/en/contact/");
  assert.ok(html.includes("Nothing has been sent."));
  assert.ok(html.includes("mailto:info@artifactory.tech"));
  assert.ok(!html.includes("mailto:info@artifactory.tech?"));
});
