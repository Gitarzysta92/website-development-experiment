import { mkdir, cp, readFile, writeFile, rm, rename } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { pages } from "./src/content.mjs";
import { renderPage } from "./src/render.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 4317;
const origin = (process.env.SITE_ORIGIN || `http://127.0.0.1:${port}`).replace(
  /\/$/,
  "",
);
const parsedOrigin = new URL(origin);
if (
  !["http:", "https:"].includes(parsedOrigin.protocol) ||
  parsedOrigin.pathname !== "/" ||
  parsedOrigin.search ||
  parsedOrigin.hash ||
  parsedOrigin.username
)
  throw new Error(
    "SITE_ORIGIN must be an HTTP(S) origin without a path, credentials or query.",
  );
const indexable =
  process.env.CONTENT_APPROVED === "true" &&
  process.env.SITE_INDEXABLE === "true";
if (
  indexable &&
  (!process.env.SITE_ORIGIN || parsedOrigin.protocol !== "https:")
)
  throw new Error(
    "An indexable build requires an explicit HTTPS SITE_ORIGIN and approved content.",
  );
const config = { origin, indexable };
const output = join(root, ".build-temp");
const dist = join(root, "dist");
await rm(output, { recursive: true, force: true });
await mkdir(join(output, "assets", "fonts"), { recursive: true });
await cp(
  join(root, "public", "styles.css"),
  join(output, "assets", "styles.css"),
);
await cp(
  join(root, "public", "client.js"),
  join(output, "assets", "client.js"),
);
for (const [packageName, files] of [
  [
    "@fontsource-variable/manrope",
    ["manrope-latin-wght-normal.woff2", "manrope-latin-ext-wght-normal.woff2"],
  ],
  [
    "@fontsource/ibm-plex-mono",
    [
      "ibm-plex-mono-latin-400-normal.woff2",
      "ibm-plex-mono-latin-ext-400-normal.woff2",
    ],
  ],
]) {
  for (const file of files)
    await cp(
      join(root, "node_modules", packageName, "files", file),
      join(output, "assets", "fonts", file),
    );
  await cp(
    join(root, "node_modules", packageName, "LICENSE"),
    join(output, "assets", "fonts", `${packageName.split("/")[1]}-LICENSE.txt`),
  );
}
for (const page of pages) {
  for (const lang of ["en", "pl"]) {
    const destination = join(output, page.paths[lang]);
    await mkdir(destination, { recursive: true });
    await writeFile(
      join(destination, "index.html"),
      renderPage(page.id, lang, config),
    );
  }
}
for (const lang of ["en", "pl"])
  await writeFile(
    join(output, `${lang}-404.html`),
    renderPage("404", lang, config),
  );
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#662483"/><path d="m32 12 19 35H13l19-35ZM22 37h20" fill="none" stroke="white" stroke-width="3" stroke-linejoin="round"/></svg>`;
await writeFile(join(output, "assets", "favicon.svg"), favicon);
for (const lang of ["en", "pl"]) {
  const line1 =
    lang === "pl" ? "Projektujemy ze światłem." : "Engineering light.";
  const line2 =
    lang === "pl" ? "Otwieramy możliwości." : "Creating possibility.";
  const share = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630"><defs><linearGradient id="g"><stop stop-color="#f5edf8"/><stop offset="1" stop-color="#eff8f6"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/><g fill="none" stroke="#087f8c" opacity=".22">${Array.from({ length: 15 }, (_, i) => `<ellipse cx="1030" cy="360" rx="${120 + i * 17}" ry="${170 + i * 8}" transform="rotate(-25 1030 360)"/>`).join("")}</g><text x="80" y="112" font-family="sans-serif" font-size="34" font-weight="bold" fill="#202438">artifactory.</text><text x="80" y="310" font-family="sans-serif" font-size="65" font-weight="bold" fill="#202438">${line1}</text><text x="80" y="400" font-family="sans-serif" font-size="65" font-weight="bold" fill="#662483">${line2}</text><text x="80" y="548" font-family="monospace" font-size="20" fill="#087f8c">ARTISENSE / AIFIELD</text></svg>`;
  await writeFile(join(output, "assets", `share-${lang}.svg`), share);
}
const urls = indexable
  ? pages
      .flatMap((p) =>
        ["en", "pl"].map(
          (lang) => `  <url><loc>${origin}${p.paths[lang]}</loc></url>`,
        ),
      )
      .join("\n")
  : "";
await writeFile(
  join(output, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
await writeFile(
  join(output, "robots.txt"),
  indexable
    ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n",
);
await writeFile(join(output, "build-config.json"), JSON.stringify(config));
await rm(join(root, ".dist-old"), { recursive: true, force: true });
try {
  await rename(dist, join(root, ".dist-old"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
await rename(output, dist);
await rm(join(root, ".dist-old"), { recursive: true, force: true });
console.log(
  `Built ${pages.length * 2} localized pages. ${indexable ? "Indexable release build." : "Local review: noindex, empty public sitemap."}`,
);
