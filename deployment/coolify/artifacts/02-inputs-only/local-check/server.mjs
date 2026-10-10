import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { watch } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { dirname, extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { legacyRoutes, pages } from "./src/content.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "dist");
const args = process.argv.slice(2);
const portIndex = args.indexOf("--port");
const port = Number(
  portIndex >= 0 ? args[portIndex + 1] : process.env.PORT || 4317,
);
if (!Number.isInteger(port) || port < 1 || port > 65535)
  throw new Error("Use a valid port between 1 and 65535.");
const dev = args.includes("--dev");
const run = promisify(execFile);
async function build() {
  const result = await run(process.execPath, ["build.mjs"], {
    cwd: root,
    env: { ...process.env, PORT: String(port) },
  });
  process.stdout.write(result.stdout);
}
if (dev) await build();
else {
  try {
    await stat(join(dist, "en", "index.html"));
  } catch {
    await build();
  }
}
const canonicalPaths = new Set(pages.flatMap((p) => Object.values(p.paths)));
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

const server = createServer(async (request, response) => {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "no-referrer");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("X-Robots-Tag", "noindex, nofollow");
  response.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  response.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; form-action 'none'; base-uri 'none'; object-src 'none'",
  );
  response.setHeader("Cache-Control", "no-store");
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, {
      "Content-Type": "text/plain; charset=utf-8",
      Allow: "GET, HEAD",
    });
    response.end("This local preview does not accept or store enquiries.");
    return;
  }
  let pathname;
  let url;
  try {
    url = new URL(request.url, "http://localhost");
    pathname = decodeURIComponent(url.pathname);
    if (pathname.includes("\0") || pathname.includes("\\"))
      throw new Error("Invalid path");
  } catch {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Bad request");
    return;
  }
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const redirect =
    legacyRoutes[normalized] ||
    (canonicalPaths.has(normalized) && pathname !== normalized
      ? normalized
      : null);
  if (redirect) {
    response.writeHead(308, { Location: redirect + url.search });
    response.end();
    return;
  }
  // Serve only generated page routes and the deliberate public asset set.
  let file;
  if (canonicalPaths.has(pathname)) file = join(dist, pathname, "index.html");
  else if (
    pathname.startsWith("/assets/") ||
    ["/robots.txt", "/sitemap.xml"].includes(pathname)
  )
    file = resolve(dist, `.${pathname}`);
  const allowed =
    file &&
    file.startsWith(dist + sep) &&
    !pathname.split("/").some((part) => part.startsWith("."));
  try {
    if (!allowed)
      throw Object.assign(new Error("Not found"), { code: "ENOENT" });
    const data = await readFile(file);
    const type = types[extname(file)];
    if (!type) throw Object.assign(new Error("Not found"), { code: "ENOENT" });
    response.writeHead(200, {
      "Content-Type": type,
      "Content-Length": data.length,
    });
    response.end(request.method === "HEAD" ? undefined : data);
  } catch (error) {
    if (!["ENOENT", "EISDIR"].includes(error.code)) {
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end(
        "The local preview is temporarily unavailable. Please retry.",
      );
      return;
    }
    const lang =
      pathname === "/pl" || pathname.startsWith("/pl/") ? "pl" : "en";
    const page = await readFile(join(dist, `${lang}-404.html`));
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end(request.method === "HEAD" ? undefined : page);
  }
});
server.listen(port, "127.0.0.1", () =>
  console.log(
    `Artifactory local preview: http://127.0.0.1:${port}/en/\n${dev ? "Watching src/ and public/. Refresh the browser after changes." : "Serving the built website."}`,
  ),
);
server.on("error", (error) => {
  console.error(`Cannot start local preview: ${error.message}`);
  process.exit(1);
});

if (dev) {
  let timeout;
  let active = false;
  let queued = false;
  const rebuild = async () => {
    if (active) {
      queued = true;
      return;
    }
    active = true;
    try {
      await build();
    } catch (error) {
      console.error(error.stderr || error.message);
    } finally {
      active = false;
      if (queued) {
        queued = false;
        await rebuild();
      }
    }
  };
  for (const folder of ["src", "public"])
    watch(join(root, folder), () => {
      clearTimeout(timeout);
      timeout = setTimeout(rebuild, 180);
    });
}
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => server.close(() => process.exit(0)));
