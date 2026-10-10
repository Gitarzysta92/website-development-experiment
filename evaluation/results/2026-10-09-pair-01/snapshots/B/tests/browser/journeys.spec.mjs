import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { pages, legacyRoutes } from "../../src/content.mjs";

test("34 routes render with no external requests, broken assets or browser errors", async ({
  page,
}) => {
  const errors = [];
  const external = [];
  const failed = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1:4317"))
      external.push(request.url());
  });
  page.on("response", (response) => {
    if (response.status() >= 400) failed.push(response.url());
  });
  for (const record of pages)
    for (const lang of ["en", "pl"]) {
      const response = await page.goto(record.paths[lang]);
      expect(response.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
        "href",
        `http://127.0.0.1:4317${record.paths[lang]}`,
      );
    }
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
  expect(failed).toEqual([]);
});

test("investor journey and equivalent language routes preserve context", async ({
  page,
}) => {
  await page.goto("/en/");
  await page
    .getByRole("link", { name: "Explore the investment case", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/investors\/$/);
  await page
    .getByRole("link", { name: "Discuss an investment", exact: true })
    .first()
    .click();
  await expect(page.locator("#intent")).toHaveValue("investment");
  await page.getByRole("link", { name: "Przełącz na polski" }).click();
  await expect(page).toHaveURL(/\/pl\/kontakt\/\?intent=investment$/);
  await expect(page.locator("#intent")).toHaveValue("investment");
  await page.goto("/en/projects/aifield/neural-field-research/#conditions");
  await page.getByRole("link", { name: "Przełącz na polski" }).click();
  await expect(page).toHaveURL(
    /\/pl\/projekty\/aifield\/badania-modeli-pola\/#conditions$/,
  );
  await expect(page.locator("#conditions")).toBeVisible();
});

test("contact validates, preserves, edits and copies a draft without sending or persisting data", async ({
  page,
  context,
}) => {
  const writes = [];
  page.on("request", (request) => {
    if (request.method() !== "GET") writes.push(request.url());
  });
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/en/contact/?intent=demo&project=aifield");
  await expect(page.locator("#intent")).toHaveValue("demo");
  await expect(page.locator("#project")).toHaveValue("aifield");
  await page.getByRole("button", { name: "Prepare email enquiry" }).click();
  await expect(page.locator("#email")).toBeFocused();
  await expect(page.locator("#email")).toHaveAttribute("aria-invalid", "true");
  await page.locator("#email").fill("tester@example.invalid");
  await page
    .locator("#message")
    .fill("Please show a photonic design workflow and its limitations.");
  await page.locator("#name").fill("Local test only");
  await page.getByRole("button", { name: "Prepare email enquiry" }).click();
  await expect(page.locator("[data-draft]")).toBeVisible();
  await expect(page.locator("#draft-text")).toHaveValue(
    /tester@example.invalid/,
  );
  await page.getByRole("button", { name: "Copy draft", exact: true }).click();
  await expect(page.locator("[data-copy-status]")).toContainText("Copied.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "Local test only",
  );
  await page.getByRole("button", { name: "Edit your enquiry" }).click();
  await expect(page.locator("#message")).toHaveValue(
    "Please show a photonic design workflow and its limitations.",
  );
  await expect(page).toHaveURL(/intent=demo&project=aifield$/);
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
      cookie: document.cookie,
    })),
  ).toEqual({ local: 0, session: 0, cookie: "" });
  expect(writes).toEqual([]);
  await page.reload();
  await expect(page.locator("#message")).toHaveValue("");
  await page.goto("/pl/kontakt/");
  await page
    .getByRole("button", { name: "Przygotuj zapytanie e-mail" })
    .click();
  await expect(page.locator("#email-error")).toContainText(
    "Podaj poprawny adres",
  );
});

test("clipboard failure keeps a selectable draft and reports an honest fallback", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: async () => {
          throw new Error("Denied");
        },
      },
    });
  });
  await page.goto("/en/contact/");
  await page.locator("#email").fill("tester@example.invalid");
  await page
    .locator("#message")
    .fill("Local-only verification of clipboard fallback behavior.");
  await page.getByRole("button", { name: "Prepare email enquiry" }).click();
  await page.getByRole("button", { name: "Copy draft", exact: true }).click();
  await expect(page.locator("[data-copy-status]")).toContainText(
    "copy manually",
  );
  await expect(page.locator("#draft-text")).toBeFocused();
});

test("all pages fit narrow English and Polish screens", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  for (const record of pages)
    for (const lang of ["en", "pl"]) {
      await page.goto(record.paths[lang]);
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      expect(overflow, record.paths[lang]).toBe(false);
    }
});

test("mobile global and project menus work by keyboard and touch", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/pl/projekty/aifield/badania-modeli-pola/");
  const toggle = page.locator("[data-menu-toggle]");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#main-nav")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await page.locator(".project-menu summary").click();
  await page
    .getByRole("navigation", { name: "Nawigacja projektu" })
    .getByRole("link", { name: "Projektowanie i symulacja", exact: true })
    .click();
  await expect(page).toHaveURL(/projektowanie-symulacja/);
  await page.screenshot({
    path: "test-results/mobile-polish-detail.png",
    fullPage: true,
  });
  await page.goto("/en/");
  await page.evaluate(() =>
    Promise.all(document.getAnimations().map((a) => a.finished)),
  );
  await page.screenshot({
    path: "test-results/mobile-home.png",
    fullPage: true,
  });
});

test("representative templates pass automated WCAG 2.2 AA checks", async ({
  page,
}) => {
  for (const path of [
    "/en/",
    "/en/investors/",
    "/en/projects/artisense/",
    "/en/projects/aifield/neural-field-research/",
    "/en/contact/",
    "/pl/",
    "/pl/kontakt/",
    "/pl/projekty/aifield/projektowanie-symulacja/",
  ]) {
    await page.goto(path);
    await page.evaluate(() =>
      Promise.all([
        document.fonts.ready,
        ...document.getAnimations().map((a) => a.finished),
      ]),
    );
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
      path,
    ).toEqual([]);
  }
  await page.goto("/en/");
  await page.evaluate(() =>
    Promise.all([
      document.fonts.ready,
      ...document.getAnimations().map((a) => a.finished),
    ]),
  );
  await page.screenshot({
    path: "test-results/desktop-home.png",
    fullPage: true,
  });
  await page.goto("/en/investors/");
  await page.screenshot({
    path: "test-results/desktop-investors.png",
    fullPage: true,
  });
});

test("legacy redirects, fragment arrivals and real localized 404s work", async ({
  page,
  request,
}) => {
  for (const [from, to] of Object.entries(legacyRoutes)) {
    const response = await request.get(from, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(to);
  }
  await page.goto("/artisense-module/#elektronika");
  await expect(page).toHaveURL(/\/pl\/projekty\/artisense\/#elektronika$/);
  await expect(page.locator("#elektronika")).toBeVisible();
  expect((await page.goto("/pl/nie-ma-takiej-strony/")).status()).toBe(404);
  await expect(page.locator("html")).toHaveAttribute("lang", "pl");
  expect((await request.get("/inputs/docs/project-brief.md")).status()).toBe(
    404,
  );
  expect(
    (
      await request.post("/api/enquiries", { data: { message: "Local test" } })
    ).status(),
  ).toBe(405);
});

test("content remains usable without JavaScript and with reduced motion", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4317/pl/kontakt/");
  await expect(page.locator("noscript")).toBeVisible();
  await expect(page.locator("form")).toBeHidden();
  await expect(page.locator(".main-nav")).toBeVisible();
  await context.close();
  const reduced = await browser.newContext({ reducedMotion: "reduce" });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto("http://127.0.0.1:4317/en/");
  expect(
    await reducedPage
      .locator(".hero-copy")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await reduced.close();
});
