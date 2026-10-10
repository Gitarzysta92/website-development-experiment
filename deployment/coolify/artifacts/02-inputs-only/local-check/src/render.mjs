import {
  pages,
  pageById,
  pathFor,
  labelFor,
  ui,
  projects,
  detailContent,
} from "./content.mjs";
import { arrow, mark, lightVisual } from "./visuals.mjs";

export const escapeHtml = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const e = escapeHtml;
const choose = (lang, en, pl) => (lang === "pl" ? pl : en);
const href = (id, lang, intent, project) =>
  `${pathFor(id, lang)}${intent ? `?intent=${intent}${project ? `&project=${project}` : ""}` : ""}`;
const link = (id, lang, text, cls = "text-link", intent, project) =>
  `<a class="${cls}" href="${e(href(id, lang, intent, project))}">${e(text || labelFor(id, lang))}${arrow()}</a>`;
const eyebrow = (text) =>
  `<p class="eyebrow"><span class="status-dot" aria-hidden="true"></span>${e(text)}</p>`;
const pill = (text) =>
  `<span class="pill"><span class="status-dot" aria-hidden="true"></span>${e(text)}</span>`;
const visual = (type, lang, cls = "") =>
  `<figure class="visual ${cls}">${lightVisual(type, lang)}<figcaption>${e(ui[lang].conceptual)}</figcaption></figure>`;

function header(id, lang) {
  const t = ui[lang];
  const alt = lang === "en" ? "pl" : "en";
  const isProject = id === "projects" || pageById[id]?.parent;
  return `<a class="skip-link" href="#main">${e(t.skip)}</a>
  <div class="preview-strip"><div class="container"><span><i aria-hidden="true"></i>${e(t.preview)}</span><span>${e(t.draft)}</span></div></div>
  <header class="site-header"><div class="container header-inner">
    <a class="brand" href="${pathFor("home", lang)}" aria-label="Artifactory — ${e(labelFor("home", lang))}">${mark()}<span>artifactory<span class="brand-dot">.</span></span></a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="main-nav" data-menu-toggle><span>${e(t.menu)}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button>
    <nav class="main-nav" id="main-nav" aria-label="${e(t.nav)}">
      <details class="projects-dropdown"><summary class="${isProject ? "active" : ""}">${e(labelFor("projects", lang))}<span class="chevron" aria-hidden="true"></span></summary><div class="dropdown-panel">${link("projects", lang, t.allProjects)}${["artisense", "aifield"].map((p) => `<a href="${pathFor(p, lang)}"><span><strong>${labelFor(p, lang)}</strong><small>${e(projects[p][lang].category)}</small></span>${arrow()}</a>`).join("")}</div></details>
      ${["investors", "approach", "about"].map((p) => `<a class="nav-link" href="${pathFor(p, lang)}" ${id === p ? 'aria-current="page"' : ""}>${e(labelFor(p, lang))}</a>`).join("")}
      <div class="mobile-utility">${link("partnerships", lang)}${link("contact", lang)}</div>
      <div class="header-actions"><div class="language-switch" aria-label="${choose(lang, "Language", "Język")}"><span aria-current="true">${lang.toUpperCase()}</span><span class="language-divider" aria-hidden="true">/</span><a href="${pathFor(pageById[id] ? id : "home", alt)}" lang="${alt}" hreflang="${alt}" data-language-switch aria-label="${alt === "pl" ? "Przełącz na polski" : "Switch to English"}">${alt.toUpperCase()}</a></div>${link("contact", lang, t.invest, "button button-small", "investment")}</div>
    </nav>
  </div></header>`;
}

function footer(lang) {
  const t = ui[lang];
  return `<footer class="site-footer"><div class="container"><div class="footer-main"><div class="footer-brand"><a class="brand" href="${pathFor("home", lang)}">${mark()}<span>artifactory.</span></a><p>${e(t.footerLine)}</p><small>${e(t.footerDesc)}</small></div><div class="footer-links"><h2>${e(labelFor("projects", lang))}</h2>${["projects", "artisense", "aifield"].map((p) => `<a href="${pathFor(p, lang)}">${e(p === "projects" ? t.allProjects : labelFor(p, lang))}</a>`).join("")}</div><div class="footer-links"><h2>${e(t.company)}</h2>${["home", "investors", "approach", "about", "partnerships"].map((p) => `<a href="${pathFor(p, lang)}">${e(labelFor(p, lang))}</a>`).join("")}</div><div class="footer-links"><h2>${e(t.connect)}</h2><a href="mailto:info@artifactory.tech">info@artifactory.tech</a><a href="${pathFor("contact", lang)}">${e(labelFor("contact", lang))}</a><a href="${pathFor("privacy", lang)}">${e(labelFor("privacy", lang))}</a></div></div><div class="footer-bottom"><span>${e(t.copyright)}</span><span>${e(t.footerNote)}</span><a href="#top">${choose(lang, "Back to top", "Na górę")} ↑</a></div></div></footer>`;
}

function breadcrumbs(id, lang) {
  if (id === "home") return "";
  const ancestors = [];
  let current = pageById[id];
  while (current) {
    ancestors.unshift(current);
    current = pageById[current.parent];
  }
  ancestors.unshift(pageById.home);
  return `<nav class="breadcrumbs container" aria-label="${choose(lang, "Breadcrumb", "Ścieżka strony")}"><ol>${ancestors.map((p, i) => `<li>${i === ancestors.length - 1 ? `<span aria-current="page">${e(p.labels[lang])}</span>` : `<a href="${p.paths[lang]}">${e(p.labels[lang])}</a>`}</li>`).join("")}</ol></nav>`;
}

function projectNav(id, lang) {
  const root = ["artisense", "aifield"].includes(id)
    ? id
    : pageById[id]?.parent;
  if (!["artisense", "aifield"].includes(root)) return "";
  const siblings = [pageById[root], ...pages.filter((p) => p.parent === root)];
  return `<div class="project-nav-wrap"><div class="container"><details class="project-menu" open><summary>${e(labelFor(root, lang))}<span>${e(id === root ? ui[lang].overview : labelFor(id, lang))}<span class="chevron" aria-hidden="true"></span></span></summary><nav aria-label="${e(ui[lang].projectNav)}"><a class="project-name" href="${pathFor(root, lang)}">${e(labelFor(root, lang))}</a>${siblings.map((p) => `<a href="${p.paths[lang]}" ${p.id === id ? 'aria-current="page"' : ""}>${e(p.id === root ? ui[lang].overview : p.labels[lang])}</a>`).join("")}</nav></details></div></div>`;
}

function cta(lang, compact = false, project) {
  return `<section class="cta-section ${compact ? "compact" : ""}"><div class="container cta-inner"><div>${eyebrow(choose(lang, "The next conversation", "Kolejna rozmowa"))}<h2>${choose(lang, "Let’s explore what<br>comes next.", "Porozmawiajmy<br>o kolejnym kroku.")}</h2></div><div class="cta-copy"><p>${choose(lang, "Invest in the company. Explore the science. Bring a question worth working on.", "Porozmawiajmy o inwestycji w firmę, badaniach i pytaniach, nad którymi warto pracować.")}</p><div class="button-row">${link("contact", lang, ui[lang].investment, "button", "investment", project)}${link("partnerships", lang, choose(lang, "Explore partnerships", "Poznaj możliwości współpracy"), "text-link")}</div></div></div></section>`;
}

function projectCard(id, lang, index, full = false) {
  const p = projects[id][lang];
  return `<article class="project-card ${full ? "full" : ""}"><a class="project-image-link" href="${pathFor(id, lang)}" aria-label="${choose(lang, "Explore", "Poznaj")} ${labelFor(id, lang)}">${lightVisual(id === "artisense" ? "sense" : "field", lang)}<span class="image-link-arrow">${arrow("diagonal")}</span></a><div class="project-card-content"><div class="card-topline"><span class="mono">0${index} / ${e(p.category)}</span>${pill(p.stage)}</div><h3><a href="${pathFor(id, lang)}">${e(labelFor(id, lang))}</a></h3><p>${e(p.summary)}</p><div class="card-bottom">${link(id, lang, choose(lang, `Explore ${labelFor(id, lang)}`, `Poznaj ${labelFor(id, lang)}`))}<span class="mono">${choose(lang, "Research snapshot · 2026", "Stan badań · 2026")}</span></div></div></article>`;
}

function home(lang) {
  const t = ui[lang];
  return `<section class="home-hero"><div class="container hero-grid"><div class="hero-copy">${eyebrow(choose(lang, "Photonics. With purpose.", "Fotonika. Z konkretnym celem."))}<h1>${choose(lang, "Engineering<br><span>light.</span> Creating<br>possibility.", "Projektujemy<br>ze <span>światłem.</span><br>Otwieramy<br>możliwości.")}</h1><p class="hero-description">${choose(lang, "We’re developing sensing technology and photonic engineering tools. Two projects. One company exploring what light can do.", "Rozwijamy technologie pomiarowe i narzędzia inżynierii fotonicznej. Dwa projekty. Jedna firma badająca możliwości światła.")}</p><div class="button-row">${link("investors", lang, t.investmentCase, "button")}${link("projects", lang, t.explore, "text-link")}</div></div>${visual("hero", lang, "hero-visual")}</div><div class="container hero-bottom"><span class="mono">${choose(lang, "From optical research to engineering possibility", "Od badań optycznych do możliwości inżynieryjnych")}</span><a href="#projects" class="scroll-cue">${choose(lang, "Discover the work", "Poznaj nasze prace")}${arrow("down")}</a></div></section>
  <section class="project-intro container" id="projects"><div class="section-heading">${eyebrow(choose(lang, "Our projects / 01—02", "Nasze projekty / 01—02"))}<div class="split-heading"><h2>${choose(lang, "One focus.<br>Two ways forward.", "Jeden obszar.<br>Dwie drogi rozwoju.")}</h2><p>${choose(lang, "From the systems that sense the world to the tools that help design them. Explore the work, its current stage and the questions ahead.", "Od systemów badających otoczenie po narzędzia pomagające je projektować. Poznaj nasze prace, ich obecny etap i otwarte pytania.")}</p></div></div><div class="project-grid">${projectCard("artisense", lang, 1)}${projectCard("aifield", lang, 2)}</div><p class="asset-note">${e(t.conceptual)}</p></section>
  <section class="connection-section"><div class="container connection-grid"><div>${eyebrow(choose(lang, "The connection", "Wspólny obszar"))}<h2>${choose(lang, "Better questions.<br>Deeper understanding.", "Lepsze pytania.<br>Głębsze zrozumienie.")}</h2><p>${choose(lang, "A sensing challenge gives photonic design a concrete problem. Design and simulation help explore possible answers. Physical validation determines what those answers mean.", "Wyzwanie pomiarowe daje projektowaniu fotonicznemu konkretny problem. Projekt i symulacja pomagają szukać odpowiedzi. Walidacja fizyczna określa ich znaczenie.")}</p>${link("approach", lang, choose(lang, "Explore our approach", "Poznaj nasze podejście"))}</div><div class="connection-diagram" aria-label="${choose(lang, "Relationship between the projects", "Związek między projektami")}"><div class="connection-node"><span class="mono">01 / ${choose(lang, "THE QUESTION", "PYTANIE")}</span><strong>ArtiSense</strong><span>${choose(lang, "What can light measure?", "Co można zmierzyć światłem?")}</span></div><div class="connection-line"><span>${choose(lang, "Design ↔ insight", "Projekt ↔ wiedza")}</span></div><div class="connection-node"><span class="mono">02 / ${choose(lang, "THE TOOL", "NARZĘDZIE")}</span><strong>AIFIELD</strong><span>${choose(lang, "How can we model it?", "Jak możemy to modelować?")}</span></div><p>${choose(lang, "Progress in design does not automatically validate a sensing system.", "Postęp w projektowaniu nie oznacza automatycznej walidacji systemu pomiarowego.")}</p></div></div></section>
  <section class="evidence-section container"><div class="section-heading"><div class="split-heading"><div>${eyebrow(choose(lang, "Clarity at every stage", "Jasność na każdym etapie"))}<h2>${choose(lang, "See the work.<br>Understand the evidence.", "Poznaj prace.<br>Zrozum dowody.")}</h2></div><p>${choose(lang, "Concepts, simulations and physical measurements answer different questions. We keep those distinctions visible.", "Koncepcje, symulacje i pomiary fizyczne odpowiadają na różne pytania. Zachowujemy te rozróżnienia.")}</p></div></div><div class="evidence-links">${evidenceRow("artisense-validation", lang, "01", choose(lang, "Optical feasibility & sensing", "Wykonalność optyczna i pomiary"), choose(lang, "What the current design work supports.", "Co wynika z obecnych prac projektowych."))}${evidenceRow("aifield-validation", lang, "02", choose(lang, "Design examples & comparisons", "Przykłady projektów i porównania"), choose(lang, "The context behind the engineering outputs.", "Kontekst wyników prac inżynieryjnych."))}${evidenceRow("aifield-neural", lang, "03", choose(lang, "Neural field research", "Badania neuronowych modeli pola"), choose(lang, "Research conditions and the questions still open.", "Warunki badań i wciąż otwarte pytania."))}</div></section>
  ${cta(lang)}`;
}

function evidenceRow(id, lang, n, title, desc) {
  return `<a class="evidence-row" href="${pathFor(id, lang)}"><span class="mono">${n}</span><h3>${e(title)}</h3><p>${e(desc)}</p>${arrow("diagonal")}</a>`;
}

function titleBlock(lang, kicker, title, description, cls = "") {
  return `<section class="page-title container ${cls}">${eyebrow(kicker)}<h1>${e(title)}</h1><p class="lead">${e(description)}</p></section>`;
}

function projectsPage(lang) {
  return `${titleBlock(lang, choose(lang, "Our projects", "Nasze projekty"), choose(lang, "Two projects. Shared curiosity.", "Dwa projekty. Wspólna ciekawość."), choose(lang, "Sensing technology and photonic engineering tools, each with its own development path and evidence.", "Technologie pomiarowe i narzędzia inżynierii fotonicznej. Każdy projekt ma własną drogę rozwoju i dowody."))}<section class="container projects-page-grid"><div class="project-grid">${projectCard("artisense", lang, 1, true)}${projectCard("aifield", lang, 2, true)}</div><p class="asset-note">${e(ui[lang].conceptual)}</p></section><section class="container compare-section"><div class="section-heading">${eyebrow(choose(lang, "At a glance", "W skrócie"))}<h2>${choose(lang, "Different questions. Connected work.", "Różne pytania. Powiązane prace.")}</h2></div>${table(
    {
      headers: [
        choose(lang, "Perspective", "Perspektywa"),
        "ArtiSense",
        "AIFIELD",
      ],
      rows: [
        [
          choose(lang, "Focus", "Obszar"),
          projects.artisense[lang].scope,
          projects.aifield[lang].scope,
        ],
        [
          choose(lang, "Intended output", "Docelowy wynik"),
          choose(
            lang,
            "A miniaturized chemical-sensing system",
            "Zminiaturyzowany system pomiarów chemicznych",
          ),
          choose(
            lang,
            "A photonic design and simulation workflow",
            "Proces projektowania i symulacji fotonicznej",
          ),
        ],
        [
          choose(
            lang,
            "Stage in supplied material",
            "Etap opisany w materiałach",
          ),
          projects.artisense[lang].stage,
          projects.aifield[lang].stage,
        ],
        [
          choose(lang, "Evidence boundary", "Granica dowodów"),
          choose(
            lang,
            "Design work does not validate sensing performance",
            "Projekt nie potwierdza skuteczności pomiarowej",
          ),
          choose(
            lang,
            "Simulation comparisons do not establish fabricated-device results",
            "Porównania symulacji nie potwierdzają wyników wykonanych układów",
          ),
        ],
      ],
    },
  )}<div class="button-row">${link("artisense-validation", lang)}${link("aifield-validation", lang)}</div></section>${cta(lang, true)}`;
}

function overview(id, lang) {
  const p = projects[id][lang];
  const t = ui[lang];
  const children = pages.filter((x) => x.parent === id);
  return `<section class="project-hero container"><div>${eyebrow(`${labelFor(id, lang)} / ${p.category}`)}<h1>${e(p.headline)}</h1><p class="lead">${e(p.summary)}</p>${pill(p.stage)}<div class="button-row">${id === "aifield" ? link("contact", lang, t.demo, "button", "demo", id) : link("artisense-technology", lang, choose(lang, "Explore the technology", "Poznaj technologię"), "button")}${link("investors", lang, choose(lang, "For investors", "Dla inwestorów"))}</div></div>${visual(id === "artisense" ? "sense" : "field", lang)}</section>
  <section class="overview-intro container" id="o-module"><div>${eyebrow(choose(lang, "The project", "O projekcie"))}<h2>${e(p.question)}</h2></div><div><p class="large-copy">${e(p.intro)}</p><p>${e(p.audience)}</p></div></section>
  <section class="status-section"><div class="container"><div class="section-heading">${eyebrow(t.evidence)}<h2>${choose(lang, "A clear view of the current work.", "Jasny obraz obecnych prac.")}</h2><p class="mono">${e(t.researchDate)} · ${choose(lang, "Context reviewed 9 October 2026", "Przegląd kontekstu: 9 października 2026")}</p></div><div class="status-grid"><article><span class="mono">01 / ${choose(lang, "DESCRIBED WORK", "OPISANE PRACE")}</span><h3>${choose(lang, "What the material shows", "Co opisują materiały")}</h3><p>${e(p.evidence)}</p></article><article><span class="mono">02 / ${choose(lang, "THE BOUNDARY", "OGRANICZENIE")}</span><h3>${choose(lang, "What remains to be established", "Co wymaga potwierdzenia")}</h3><p>${e(p.limit)}</p></article><article><span class="mono">03 / ${choose(lang, "PROPOSED NEXT STEP", "PROPONOWANY KROK")}</span><h3>${choose(lang, "Where the work can go next", "Możliwy dalszy kierunek")}</h3><p>${e(p.next)}</p></article></div></div></section>
  <section class="container deeper-section" id="technologie"><div class="section-heading">${eyebrow(choose(lang, "Go deeper", "Poznaj szczegóły"))}<h2>${choose(lang, "The detail behind the direction.", "Szczegóły wybranego kierunku.")}</h2></div><div class="detail-link-grid">${children.map((child, i) => `<a class="detail-link-card" href="${child.paths[lang]}" ${id === "artisense" && i < 2 ? `id="${i === 0 ? "fotonika" : "elektronika"}"` : ""}><span class="mono">0${i + 1} / ${e(labelFor(id, lang))}</span><h3>${e(child.labels[lang])}</h3><p>${e(detailContent[child.id][lang].description)}</p>${arrow("diagonal")}</a>`).join("")}</div>${id === "artisense" ? `<p class="legacy-context">${choose(lang, "Photonics and proposed electronics are explained together in the system architecture.", "Fotonika i proponowana elektronika są opisane wspólnie w architekturze systemu.")} ${link("artisense-technology", lang)}</p>` : ""}</section>${cta(lang, true, id)}`;
}

function table(data) {
  return `<div class="table-scroll" role="region" tabindex="0" aria-label="${e(data.headers.join(", "))}"><table><thead><tr>${data.headers.map((h) => `<th scope="col">${e(h)}</th>`).join("")}</tr></thead><tbody>${data.rows.map((row) => `<tr>${row.map((cell, i) => (i === 0 ? `<th scope="row">${e(cell)}</th>` : `<td>${e(cell)}</td>`)).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function articleSection(section, lang) {
  return `<section class="article-section" id="${section.id}"><h2>${e(section.title)}</h2>${section.body ? `<p>${e(section.body)}</p>` : ""}${section.steps ? `<ol class="process-list">${section.steps.map(([title, body], i) => `<li><span class="step-number">0${i + 1}</span><div><h3>${e(title)}</h3><p>${e(body)}</p></div></li>`).join("")}</ol>` : ""}${section.cards ? `<div class="article-card-grid">${section.cards.map(([title, body]) => `<article><h3>${e(title)}</h3><p>${e(body)}</p></article>`).join("")}</div>` : ""}${section.table ? table(section.table) : ""}${section.note ? `<aside class="evidence-note"><span class="note-icon" aria-hidden="true">i</span><p>${e(section.note)}</p></aside>` : ""}${section.link ? link(section.link, lang, section.intent === "demo" ? ui[lang].demo : labelFor(section.link, lang), "text-link", section.intent, section.project) : ""}</section>`;
}

function detail(id, lang) {
  const data = detailContent[id];
  const c = data[lang];
  const parent = pageById[id].parent;
  return `${titleBlock(lang, c.eyebrow, c.title, c.intro, "detail-title")}<div class="container article-layout"><aside class="article-toc"><span class="mono">${e(ui[lang].onPage)}</span><nav aria-label="${e(ui[lang].onPage)}">${c.sections.map((s, i) => `<a href="#${s.id}"><span>0${i + 1}</span>${e(s.title)}</a>`).join("")}</nav><div class="toc-status">${pill(choose(lang, "Research snapshot", "Stan badań"))}<p>${choose(lang, "September 2026 source context. Draft reviewed 9 October 2026.", "Kontekst źródeł: wrzesień 2026. Przegląd wersji roboczej: 9 października 2026.")}</p></div></aside><div class="article-body">${visual(data.visual, lang, "article-visual")}${c.sections.map((s) => articleSection(s, lang)).join("")}<section class="article-section related-links"><span class="mono">${e(ui[lang].related)}</span>${pages
    .filter((p) => p.parent === parent && p.id !== id)
    .map((p) => link(p.id, lang))
    .join(
      "",
    )}${link("investors", lang)}</section></div></div>${cta(lang, true, parent)}`;
}

function investors(lang) {
  const pl = lang === "pl";
  return `<section class="investor-hero container"><div>${eyebrow(choose(lang, "Invest in Artifactory", "Inwestycja w Artifactory"))}<h1>${choose(lang, "The company.<br>The science.<br><span>The possibility.</span>", "Firma.<br>Nauka.<br><span>Możliwości.</span>")}</h1><p class="lead">${choose(lang, "Explore a company developing sensing technology and the tools to design photonic systems. Start with the work, its evidence and the milestones ahead.", "Poznaj firmę rozwijającą technologie pomiarowe i narzędzia do projektowania układów fotonicznych. Zacznij od prac, dowodów i kolejnych etapów.")}</p>${link("contact", lang, ui[lang].investment, "button", "investment")}</div><div class="investment-panel"><span class="mono">ARTIFACTORY / ${pl ? "PERSPEKTYWA FIRMY" : "COMPANY PERSPECTIVE"}</span><h2>${pl ? "Dwa projekty.<br>Jedna rozmowa." : "Two projects.<br>One conversation."}</h2>${["artisense", "aifield"].map((id) => `<a href="${pathFor(id, lang)}"><div><strong>${labelFor(id, lang)}</strong><span>${e(projects[id][lang].category)}</span></div>${arrow()}</a>`).join("")}<p>${pl ? "Przedmiotem rozmowy inwestycyjnej jest Artifactory jako firma." : "The investment conversation concerns Artifactory as a company."}</p></div></section>
  <section class="container overview-intro"><div>${eyebrow(choose(lang, "The investment perspective", "Perspektywa inwestycyjna"))}<h2>${choose(lang, "Understand the opportunity through the work.", "Zrozum potencjał przez prowadzone prace.")}</h2></div><div><p class="large-copy">${choose(lang, "Sensing and photonic design address connected engineering questions. The company proposition brings these two directions into the same conversation, while preserving the distinct risks and maturity of each project.", "Pomiary i projektowanie fotoniczne dotyczą powiązanych pytań inżynieryjnych. Propozycja firmy łączy te dwa kierunki, zachowując odrębność ryzyka i stopnia rozwoju każdego projektu.")}</p><p>${choose(lang, "Current company funding terms, ownership and IP positions, revenue, customer commitments and capital allocation are not established in the supplied material. Those topics belong in a company-level discussion supported by current information.", "Dostarczone materiały nie potwierdzają aktualnych warunków finansowania firmy, praw własności i IP, przychodów, zobowiązań klientów ani alokacji kapitału. Te tematy wymagają rozmowy o firmie opartej na aktualnych danych.")}</p></div></section>
  <section class="status-section"><div class="container"><div class="section-heading">${eyebrow(choose(lang, "A useful investment conversation", "Wartościowa rozmowa inwestycyjna"))}<h2>${choose(lang, "Three areas to examine.", "Trzy obszary do przeanalizowania.")}</h2></div><div class="status-grid">${(pl
    ? [
        [
          "01 / TECHNOLOGIA",
          "Co zostało zbadane?",
          "Oddziel prace projektowe i symulacyjne od wyników pomiarów fizycznych. Sprawdź warunki i ograniczenia każdego twierdzenia.",
        ],
        [
          "02 / ROZWÓJ",
          "Co powinien wykazać kolejny etap?",
          "Powiąż proponowane etapy z dowodami, które zmniejszą niepewność. Zakres, terminy i zasoby wymagają potwierdzenia.",
        ],
        [
          "03 / FIRMA",
          "Jak prace przekładają się na wartość?",
          "Omów zamierzonych użytkowników, założenia komercyjne, kompetencje zespołu oraz pozycję własnościową i finansowanie.",
        ],
      ]
    : [
        [
          "01 / TECHNOLOGY",
          "What has been investigated?",
          "Separate design and simulation work from physical measurement outcomes. Review the conditions and limits of each claim.",
        ],
        [
          "02 / DEVELOPMENT",
          "What should the next stage prove?",
          "Connect proposed milestones to evidence that reduces uncertainty. Scope, timing and resources need current confirmation.",
        ],
        [
          "03 / COMPANY",
          "How does the work create value?",
          "Discuss intended users, commercial assumptions, team capabilities, ownership positions and financing at company level.",
        ],
      ]
  )
    .map(
      ([n, title, body]) =>
        `<article><span class="mono">${n}</span><h3>${title}</h3><p>${body}</p></article>`,
    )
    .join("")}</div></div></section>
  <section class="container evidence-section"><div class="section-heading">${eyebrow(choose(lang, "Start your review", "Zacznij analizę"))}<h2>${choose(lang, "Go directly to the evidence.", "Przejdź bezpośrednio do dowodów.")}</h2></div><div class="evidence-links">${evidenceRow("artisense-validation", lang, "01", "ArtiSense", projects.artisense[lang].stage)}${evidenceRow("aifield-validation", lang, "02", "AIFIELD", projects.aifield[lang].stage)}${evidenceRow("aifield-neural", lang, "03", choose(lang, "Neural field research", "Badania modeli pola"), choose(lang, "Conditions, limitations and open questions", "Warunki, ograniczenia i otwarte pytania"))}</div><aside class="evidence-note"><span class="note-icon" aria-hidden="true">i</span><p>${choose(lang, "No current funding round, investment amount or return is represented here. Historical project proposals are not the company’s current funding ask. Materials are shared only after their scope and permissions are confirmed.", "Nie przedstawiamy tu aktualnej rundy finansowania, kwoty inwestycji ani stopy zwrotu. Historyczne propozycje projektowe nie określają obecnego zapotrzebowania firmy na kapitał. Udostępnienie materiałów wymaga potwierdzenia zakresu i uprawnień.")}</p></aside></section>${cta(lang, true)}`;
}

function approach(lang) {
  const pl = lang === "pl";
  const sections = pl
    ? [
        {
          id: "question",
          title: "Zacznij od pytania, które można sprawdzić",
          body: "Cel pomiarowy lub projektowy określa, co powinno zostać zbadane. W przykładzie fotonicznego układu do pomiaru glukozy ArtiSense wnosi cel pomiarowy, a AIFIELD proces projektowy.",
        },
        {
          id: "model",
          title: "Zapisz założenia przed interpretacją",
          body: "Geometria, warunki materiałowe, kalibracja i warunki brzegowe kształtują wynik symulacji. Model pomaga analizować pytanie w tych warunkach. Jego wartość zależy od zachowania kontekstu przy przedstawianiu wyniku.",
        },
        {
          id: "inspect",
          title: "Analizuj wyniki z kontrolą człowieka",
          body: "Opisane procesy wspomagane przez AI obejmują propozycje i ocenę człowieka. Założenia i interpretacja inżynieryjna pozostają odpowiedzialnością osoby prowadzącej zadanie.",
          link: "aifield-ai",
        },
        {
          id: "validate",
          title: "Dobieraj dowody do twierdzenia",
          body: "Koncepcja opisuje kierunek. Symulacja bada model. Prototyp umożliwia badanie sprzętu. Pomiary fizyczne muszą dopiero wykazać zachowanie urządzenia. Kolejny eksperyment powinien odpowiadać na konkretną niepewność.",
          note: "To robocze ujęcie podejścia oparte na dostarczonych materiałach. Nie stanowi deklaracji certyfikowanego procesu ani ukończenia wszystkich etapów.",
        },
      ]
    : [
        {
          id: "question",
          title: "Start with a question that can be tested",
          body: "A measurement or design objective establishes what needs investigation. In the photonic glucose chip-design example, ArtiSense provides the sensing objective and AIFIELD the engineering workflow.",
        },
        {
          id: "model",
          title: "Keep assumptions attached to the model",
          body: "Geometry, material conditions, calibration and boundary information shape a simulation result. A model helps investigate the question within those conditions. Its value depends on preserving that context when presenting the result.",
        },
        {
          id: "inspect",
          title: "Inspect the output with human judgment",
          body: "The described AI-assisted workflows include proposals and human review. Engineering assumptions and interpretation remain the responsibility of the person conducting the work.",
          link: "aifield-ai",
        },
        {
          id: "validate",
          title: "Match the evidence to the claim",
          body: "A concept describes a direction. A simulation investigates a model. A prototype enables hardware testing. Physical measurement must establish device behavior. The next experiment should address a specific uncertainty.",
          note: "This is a draft explanation based on the supplied work. It does not claim a certified process or completion of every development stage.",
        },
      ];
  return `${titleBlock(lang, choose(lang, "Our approach", "Jak pracujemy"), choose(lang, "From a good question to better evidence.", "Od dobrego pytania do lepszych dowodów."), choose(lang, "An engineering perspective grounded in the work: define the problem, model the system, inspect the result and identify what needs a physical test.", "Perspektywa inżynieryjna oparta na opisanych pracach: zdefiniuj problem, opracuj model, przeanalizuj wynik i określ, co wymaga testu fizycznego."))}<div class="container approach-layout"><div class="approach-graphic">${visual("workflow", lang)}<div class="approach-quote">${choose(lang, "Every result should make the next question clearer.", "Każdy wynik powinien pomagać lepiej sformułować kolejne pytanie.")}</div></div><div>${sections.map((s) => articleSection(s, lang)).join("")}</div></div><section class="container example-band"><div>${eyebrow(choose(lang, "A connected example", "Powiązany przykład"))}<h2>${choose(lang, "One design. Two evidence questions.", "Jeden projekt. Dwa pytania o dowody.")}</h2><p>${choose(lang, "How does the design workflow perform? Can the physical system achieve the sensing objective? Explore each in its own context.", "Jak działa proces projektowy? Czy układ fizyczny może osiągnąć cel pomiarowy? Poznaj każde zagadnienie w jego kontekście.")}</p></div><div>${link("aifield-validation", lang)}${link("artisense-validation", lang)}</div></section>${cta(lang, true)}`;
}

function about(lang) {
  return `${titleBlock(lang, choose(lang, "About Artifactory", "O Artifactory"), choose(lang, "Curiosity, translated into engineering.", "Ciekawość przełożona na inżynierię."), choose(lang, "Artifactory is the company behind the ArtiSense and AIFIELD project directions: sensing technology and tools for designing photonic systems.", "Artifactory to firma rozwijająca kierunki ArtiSense i AIFIELD: technologie pomiarowe i narzędzia do projektowania układów fotonicznych."))}<section class="container about-feature">${visual("hero", lang)}<div>${eyebrow(choose(lang, "Our focus", "Nasz obszar"))}<h2>${choose(lang, "Working with the possibilities of light.", "Pracujemy nad możliwościami światła.")}</h2><p>${choose(lang, "Light is central to both project directions. ArtiSense investigates how an optical response can inform chemical measurement. AIFIELD explores the engineering tools used to design and simulate photonic systems.", "Światło jest kluczowe dla obu kierunków. ArtiSense bada wykorzystanie odpowiedzi optycznej w pomiarach chemicznych. AIFIELD rozwija narzędzia do projektowania i symulacji układów fotonicznych.")}</p><p>${choose(lang, "The company story brings these related efforts together. Each keeps its own development stage, limitations and validation needs.", "Historia firmy łączy te powiązane działania. Każde zachowuje własny etap rozwoju, ograniczenia i potrzeby walidacyjne.")}</p>${link("projects", lang)}</div></section><section class="container about-information"><article><span class="mono">01 / ${choose(lang, "PEOPLE", "LUDZIE")}</span><h2>${choose(lang, "Meet the work first.", "Zacznij od naszych prac.")}</h2><p>${choose(lang, "A current company team roster, biographies and approved portraits were not supplied for this draft. We have not inferred company roles from project descriptions. Start a conversation to ask about the people and expertise behind each direction.", "Do tej wersji nie dostarczono aktualnego składu zespołu, biografii ani zatwierdzonych portretów. Nie wywodzimy ról w firmie z opisów projektów. Rozpocznij rozmowę o osobach i kompetencjach stojących za każdym kierunkiem.")}</p>${link("contact", lang, choose(lang, "Contact the company", "Skontaktuj się z firmą"), "text-link", "general")}</article><article><span class="mono">02 / ${choose(lang, "COMPANY CONTEXT", "KONTEKST FIRMY")}</span><h2>${choose(lang, "A company-level conversation.", "Rozmowa na poziomie firmy.")}</h2><p>${choose(lang, "Investment enquiries concern Artifactory as a company. Current legal identity, leadership roles, ownership and IP statements require confirmation before public release. This local edition makes no unverified claims about those details.", "Zapytania inwestycyjne dotyczą Artifactory jako firmy. Aktualna tożsamość prawna, role kierownicze oraz informacje o własności i IP wymagają potwierdzenia przed publikacją. Wersja lokalna nie przedstawia niezweryfikowanych twierdzeń w tych obszarach.")}</p>${link("investors", lang)}</article></section>${cta(lang, true)}`;
}

function partnerships(lang) {
  const pl = lang === "pl";
  const opportunities = pl
    ? [
        [
          "01",
          "ArtiSense",
          "Pomiary i metody odniesienia",
          "Jak sprawdzić hipotezę optyczną w warunkach fizycznych?",
          "Wiedza z zakresu pomiarów optycznych, kalibracji i projektowania eksperymentów.",
          "Rozmowa o hipotezie, wymaganym odniesieniu i kryteriach oceny.",
          "artisense",
        ],
        [
          "02",
          "ArtiSense / AIFIELD",
          "Wykonanie i testowanie",
          "Co byłoby potrzebne, by przenieść projekt do eksperymentu?",
          "Kompetencje w wytwarzaniu układów fotonicznych, integracji i charakterystyce.",
          "Rozmowa o wykonalności, ograniczeniach projektowych i pomiarach.",
          "artisense",
        ],
        [
          "03",
          "AIFIELD",
          "Ocena narzędzi inżynieryjnych",
          "Które zadanie najlepiej sprawdzi proces projektowy?",
          "Doświadczenie w projektowaniu fotonicznym i porównywaniu symulacji.",
          "Określenie zadania, danych wejściowych i wyników do wspólnego przeglądu.",
          "aifield",
        ],
      ]
    : [
        [
          "01",
          "ArtiSense",
          "Measurement & reference methods",
          "How can an optical hypothesis be tested physically?",
          "Expertise in optical measurement, calibration and experiment design.",
          "Discuss the hypothesis, the required reference and evaluation criteria.",
          "artisense",
        ],
        [
          "02",
          "ArtiSense / AIFIELD",
          "Fabrication & testing",
          "What would it take to move a design into an experiment?",
          "Experience with photonic fabrication, integration and characterization.",
          "Discuss feasibility, design constraints and the measurements needed.",
          "artisense",
        ],
        [
          "03",
          "AIFIELD",
          "Engineering-tool evaluation",
          "Which task would meaningfully test the design workflow?",
          "Experience in photonic design and simulation comparison.",
          "Define a task, its inputs and the outputs for a shared review.",
          "aifield",
        ],
      ];
  return `${titleBlock(lang, choose(lang, "Partnerships", "Współpraca"), choose(lang, "Bring a question.<br>Build understanding.", "Zacznij od pytania.<br>Rozwijaj wiedzę.").replaceAll("<br>", " "), choose(lang, "Explore possible collaboration around sensing, physical validation and photonic engineering tools.", "Poznaj możliwe obszary współpracy przy pomiarach, walidacji fizycznej i narzędziach inżynierii fotonicznej."))}<section class="container opportunities">${opportunities.map(([n, project, title, q, expertise, next, p]) => `<article class="opportunity"><div class="opportunity-number mono">${n} /</div><div class="opportunity-main"><span class="mono">${project}</span><h2>${title}</h2><p class="large-copy">${q}</p></div><div class="opportunity-detail"><h3>${pl ? "Przydatne kompetencje" : "Relevant expertise"}</h3><p>${expertise}</p><h3>${pl ? "Punkt wyjścia" : "A starting point"}</h3><p>${next}</p>${link("contact", lang, ui[lang].partner, "text-link", "partnership", p)}</div></article>`).join("")}<aside class="evidence-note"><span class="note-icon" aria-hidden="true">i</span><p>${choose(lang, "These are proposed discussion areas, not confirmed open programmes or existing partner relationships. Active needs, project owners and the scope of any collaboration must be agreed before work begins. No partner logos or customer commitments are implied.", "To proponowane tematy rozmów, a nie potwierdzone programy współpracy ani istniejące relacje partnerskie. Aktywne potrzeby, osoby odpowiedzialne i zakres współpracy należy uzgodnić przed rozpoczęciem prac. Nie sugerujemy zobowiązań partnerów ani klientów.")}</p></aside></section>${cta(lang, true)}`;
}

function contact(lang) {
  const pl = lang === "pl";
  const types = pl
    ? [
        "Inwestycja w Artifactory",
        "Współpraca",
        "Demo AIFIELD",
        "Zapytanie ogólne",
      ]
    : [
        "Investment in Artifactory",
        "Partnership",
        "AIFIELD demo",
        "General enquiry",
      ];
  const field = (name, label, type = "text", required = false, max = 120) =>
    `<div class="form-field"><label for="${name}">${label}${required ? '<span aria-hidden="true"> *</span>' : ` <span class="optional">(${pl ? "opcjonalnie" : "optional"})</span>`}</label><input type="${type}" id="${name}" name="${name}" ${required ? "required" : ""} maxlength="${max}" autocomplete="${name === "name" ? "name" : name === "organization" ? "organization" : name === "email" ? "email" : "off"}" aria-describedby="${name}-error"><p class="field-error" id="${name}-error"></p></div>`;
  return `<section class="contact-layout container"><div class="contact-intro">${eyebrow(choose(lang, "Start a conversation", "Zacznijmy rozmowę"))}<h1>${choose(lang, "Good things start<br>with a question.", "Dobre rzeczy<br>zaczynają się<br>od pytania.")}</h1><p class="lead">${choose(lang, "Tell us what you would like to explore. Investment, collaboration or a closer look at the work.", "Powiedz, co Cię interesuje. Inwestycja, współpraca lub bliższe poznanie naszych prac.")}</p><a class="contact-email" href="mailto:info@artifactory.tech">info@artifactory.tech ${arrow("diagonal")}</a><div class="contact-context"><span class="mono">${choose(lang, "A clear next step", "Jasny kolejny krok")}</span><p>${choose(lang, "This local form prepares an email draft. It does not submit to a receiver. Copy your draft, open your email app and send it when you are ready.", "Ten lokalny formularz przygotowuje treść wiadomości. Nie wysyła jej do odbiorcy. Skopiuj treść, otwórz program pocztowy i wyślij wiadomość, gdy będzie gotowa.")}</p><p>${choose(lang, "Please avoid confidential, financial-account or health information. The public mailbox is supplied in the brief; its operator has not been verified.", "Nie podawaj informacji poufnych, danych rachunków ani danych o zdrowiu. Publiczny adres pochodzi z briefu; jego operator nie został zweryfikowany.")}</p></div></div><div class="contact-form-panel"><form data-enquiry novalidate><h2>${choose(lang, "What would you like to discuss?", "O czym chcesz porozmawiać?")}</h2><p class="form-intro">${choose(lang, "Fields marked * are required.", "Pola oznaczone * są wymagane.")}</p><div class="form-error-summary" role="alert" hidden></div><div class="form-field"><label for="intent">${choose(lang, "Enquiry type", "Rodzaj zapytania")} <span aria-hidden="true">*</span></label><select id="intent" name="intent" required>${["investment", "partnership", "demo", "general"].map((v, i) => `<option value="${v}">${types[i]}</option>`).join("")}</select></div><div class="form-field"><label for="project">${choose(lang, "Project context", "Kontekst projektu")} <span class="optional">(${pl ? "opcjonalnie" : "optional"})</span></label><select id="project" name="project"><option value="">${choose(lang, "Artifactory / no specific project", "Artifactory / bez konkretnego projektu")}</option><option value="artisense">ArtiSense</option><option value="aifield">AIFIELD</option></select></div><div class="form-row">${field("name", choose(lang, "Your name", "Imię i nazwisko"))}${field("organization", choose(lang, "Organization", "Organizacja"))}</div>${field("email", choose(lang, "Reply email", "Adres e-mail do odpowiedzi"), "email", true, 254)}<div class="form-field"><label for="message">${choose(lang, "Your message", "Twoja wiadomość")} <span aria-hidden="true">*</span></label><textarea id="message" name="message" rows="5" required minlength="20" maxlength="4000" placeholder="${choose(lang, "A little context makes for a better conversation…", "Krótki opis ułatwi rozpoczęcie rozmowy…")}" aria-describedby="message-hint message-error"></textarea><div class="field-meta"><span id="message-hint">${choose(lang, "20–4,000 characters", "20–4000 znaków")}</span><span data-count aria-hidden="true">0 / 4,000</span></div><p class="field-error" id="message-error"></p></div><p class="form-privacy">${choose(lang, "Your draft stays in this page’s memory. Nothing is stored or sent by this site.", "Treść pozostaje w pamięci tej strony. Witryna niczego nie zapisuje ani nie wysyła.")} <a href="${pathFor("privacy", lang)}">${choose(lang, "How this preview handles data", "Jak podgląd przetwarza dane")}</a>.</p><button class="button form-submit" type="submit">${choose(lang, "Prepare email enquiry", "Przygotuj zapytanie e-mail")}${arrow()}</button></form><noscript><p>${choose(lang, "JavaScript is needed to prepare a draft. You can contact Artifactory directly by email.", "Przygotowanie wiadomości wymaga JavaScript. Możesz napisać bezpośrednio na adres e-mail.")}</p><a href="mailto:info@artifactory.tech">info@artifactory.tech</a></noscript><section class="enquiry-draft" data-draft hidden tabindex="-1" aria-labelledby="draft-heading"><span class="draft-icon" aria-hidden="true">↗</span><h2 id="draft-heading">${choose(lang, "Your enquiry is ready to copy.", "Zapytanie jest gotowe do skopiowania.")}</h2><p>${choose(lang, "Nothing has been sent. Copy the text, then paste it into your email app and send to info@artifactory.tech.", "Nic nie zostało wysłane. Skopiuj tekst, wklej do programu pocztowego i wyślij na info@artifactory.tech.")}</p><label for="draft-text">${choose(lang, "Your email draft", "Treść wiadomości")}</label><textarea id="draft-text" readonly rows="11"></textarea><div class="button-row"><button type="button" class="button" data-copy>${choose(lang, "Copy draft", "Skopiuj treść")}${arrow()}</button><a class="text-link" href="mailto:info@artifactory.tech">${choose(lang, "Open email app", "Otwórz pocztę")}${arrow("diagonal")}</a></div><p role="status" data-copy-status></p><button type="button" class="text-button" data-edit>${choose(lang, "Edit your enquiry", "Edytuj zapytanie")}</button></section></div></section>`;
}

function privacy(lang) {
  const sections =
    lang === "pl"
      ? [
          {
            id: "scope",
            title: "Zakres tego podglądu",
            body: "To lokalna wersja strony Artifactory do przeglądu. Nie została opublikowana. Informacja opisuje zachowanie tej implementacji; nie zastępuje zatwierdzonej polityki prywatności przyszłej publicznej witryny.",
          },
          {
            id: "form",
            title: "Treść formularza pozostaje w przeglądarce",
            body: "Formularz przygotowuje wiadomość z rodzaju zapytania, adresu e-mail, treści oraz opcjonalnego imienia i nazwiska, organizacji i kontekstu projektu. Dane pozostają w pamięci bieżącej strony. Witryna nie wysyła ich na serwer i nie zapisuje w plikach cookie, localStorage ani bazie danych. Zmiana strony lub jej odświeżenie może usunąć treść.",
          },
          {
            id: "email",
            title: "Kopiowanie i wysłanie wiadomości",
            body: "Przycisk kopiowania umieszcza przygotowaną treść w schowku urządzenia. Link do poczty otwiera program pocztowy z adresem info@artifactory.tech. Dane osobowe i treść nie są umieszczane w adresach stron ani linku pocztowym. Wysyłka następuje dopiero w programie pocztowym i podlega zasadom jego dostawcy oraz odbiorcy. Operator skrzynki i okres przechowywania wiadomości wymagają potwierdzenia.",
          },
          {
            id: "services",
            title: "Pliki lokalne i brak śledzenia",
            body: "Czcionki, style, skrypty i ilustracje są obsługiwane lokalnie. Ta implementacja nie zawiera analityki, zewnętrznych osadzeń, reklam ani plików cookie. Lokalny serwer nie zapisuje dziennika żądań ani treści formularzy. Dane techniczne przeglądarki i urządzenia pozostają pod kontrolą ich oprogramowania.",
          },
          {
            id: "publication",
            title: "Co trzeba ustalić przed publikacją",
            body: "Przed uruchomieniem formularza wysyłającego dane należy potwierdzić administratora danych, odbiorcę, dostawców, cele przetwarzania, zasady dostępu, retencję i usuwanie danych oraz kanał obsługi praw użytkowników. Potrzebny jest także przegląd zasad wybranego hostingu. Niniejszy tekst wymaga wtedy aktualizacji i zatwierdzenia.",
          },
          {
            id: "contact",
            title: "Kontakt",
            body: "Adres podany w briefie to info@artifactory.tech. Nie zweryfikowano operatora tej skrzynki. Nie przesyłaj danych o zdrowiu ani informacji poufnych przez formularz lub zwykłą wiadomość e-mail.",
            link: "contact",
          },
        ]
      : [
          {
            id: "scope",
            title: "Scope of this preview",
            body: "This is a local Artifactory website review edition. It has not been published. This notice describes the behavior of this implementation; it is not an approved privacy policy for a future public website.",
          },
          {
            id: "form",
            title: "Form contents stay in your browser",
            body: "The form prepares an email from the enquiry type, reply email, message and optional name, organization and project context. Information remains in the current page’s memory. The site does not send it to a server or save it in cookies, localStorage or a database. Navigating away or refreshing may clear the draft.",
          },
          {
            id: "email",
            title: "Copying and sending an email",
            body: "The copy button places the prepared text on your device’s clipboard. The email link opens your email app addressed to info@artifactory.tech. Personal information and message contents are not included in page URLs or the email link. Sending happens only in your email app and is subject to its provider’s and the recipient’s handling practices. The mailbox operator and message-retention arrangements need confirmation.",
          },
          {
            id: "services",
            title: "Local assets and no tracking",
            body: "Fonts, styles, scripts and illustrations are served locally. This implementation has no analytics, third-party embeds, advertising or cookies. The local server does not keep a request log or log form contents. Browser and device-level technical data remain under the control of that software.",
          },
          {
            id: "publication",
            title: "What must be defined before publication",
            body: "Before a form begins transmitting data, the data controller, receiver, service providers, processing purposes, access, retention, deletion and rights-request contact must be confirmed. The chosen hosting practices also need review. This notice must then be updated and approved.",
          },
          {
            id: "contact",
            title: "Contact",
            body: "The brief supplies info@artifactory.tech as the public email address. Its operator has not been verified. Please do not include health data or confidential information in this form or ordinary email.",
            link: "contact",
          },
        ];
  return `${titleBlock(lang, choose(lang, "Privacy / Local preview", "Prywatność / Podgląd lokalny"), choose(lang, "A clear account of your data.", "Jasny opis przetwarzania danych."), choose(lang, "This preview prepares drafts in your browser. It does not collect or send enquiries. Updated 9 October 2026.", "Podgląd przygotowuje treść w przeglądarce. Nie zbiera ani nie wysyła zapytań. Aktualizacja: 9 października 2026."))}<div class="container narrow-article">${sections.map((s) => articleSection(s, lang)).join("")}</div>`;
}

const descriptions = {
  projects: [
    "Meet ArtiSense and AIFIELD: sensing research and photonic design tools, with current stages and evidence boundaries.",
    "Poznaj ArtiSense i AIFIELD: badania pomiarowe i narzędzia projektowania fotonicznego, ich etapy rozwoju i ograniczenia dowodów.",
  ],
  investors: [
    "Explore Artifactory as a company investment opportunity through its projects, evidence and proposed next milestones.",
    "Poznaj Artifactory jako firmę do rozmowy inwestycyjnej: projekty, dowody i proponowane kolejne etapy.",
  ],
  approach: [
    "From an engineering question to a model, human review and physical validation: a qualified account of the work.",
    "Od pytania inżynieryjnego do modelu, oceny człowieka i walidacji fizycznej: opis podejścia do prac.",
  ],
  about: [
    "Artifactory develops sensing technology and photonic engineering tools through ArtiSense and AIFIELD.",
    "Artifactory rozwija technologie pomiarowe i narzędzia inżynierii fotonicznej w ramach ArtiSense i AIFIELD.",
  ],
  partnerships: [
    "Explore proposed discussion areas in optical measurement, fabrication, testing and photonic engineering tools.",
    "Poznaj proponowane obszary rozmów o pomiarach optycznych, wytwarzaniu, testowaniu i narzędziach fotonicznych.",
  ],
  contact: [
    "Prepare an investment, partnership, demo or general enquiry for Artifactory. Local email drafting with a public email fallback.",
    "Przygotuj zapytanie o inwestycję, współpracę, demo lub inne zagadnienia. Lokalny formularz i publiczny adres e-mail.",
  ],
  privacy: [
    "How the local Artifactory preview handles draft enquiries, clipboard copying, email and technical data.",
    "Jak lokalny podgląd Artifactory obsługuje treść zapytań, schowek, pocztę e-mail i dane techniczne.",
  ],
};

export function renderPage(id, lang = "en", config = {}) {
  const t = ui[lang];
  const data = detailContent[id]?.[lang];
  const description =
    id === "home"
      ? t.homeDesc
      : data?.description ||
        projects[id]?.[lang].summary ||
        descriptions[id]?.[lang === "en" ? 0 : 1] ||
        t.notFound;
  const title =
    id === "home"
      ? `${t.homeTitle} | Artifactory`
      : data
        ? `${labelFor(pageById[id].parent, lang)}: ${labelFor(id, lang)} | Artifactory`
        : projects[id]
          ? `${labelFor(id, lang)}: ${projects[id][lang].category} | Artifactory`
          : `${pageById[id] ? labelFor(id, lang) : "404"} | Artifactory`;
  const origin = config.origin || "http://127.0.0.1:4317";
  const indexable = Boolean(config.indexable) && !!pageById[id];
  let content;
  if (id === "home") content = home(lang);
  else if (id === "projects") content = projectsPage(lang);
  else if (projects[id]) content = overview(id, lang);
  else if (data) content = detail(id, lang);
  else if (id === "investors") content = investors(lang);
  else if (id === "approach") content = approach(lang);
  else if (id === "about") content = about(lang);
  else if (id === "partnerships") content = partnerships(lang);
  else if (id === "contact") content = contact(lang);
  else if (id === "privacy") content = privacy(lang);
  else
    content = `<section class="container not-found">${eyebrow("404")}<h1>${e(t.noResults)}</h1><p class="lead">${e(t.notFound)}</p><div class="button-row">${link("home", lang, t.backHome, "button")}${link("projects", lang)}${link("contact", lang)}</div></section>`;
  return `<!doctype html><html lang="${lang}" class="no-js"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${e(title)}</title><meta name="description" content="${e(description)}"><meta name="robots" content="${indexable ? "index,follow" : "noindex,nofollow"}"><meta name="theme-color" content="#662483">${pageById[id] ? `<link rel="canonical" href="${origin}${pathFor(id, lang)}">${["en", "pl"].map((l) => `<link rel="alternate" hreflang="${l}" href="${origin}${pathFor(id, l)}">`).join("")}<link rel="alternate" hreflang="x-default" href="${origin}${pathFor(id, "en")}">` : ""}<meta property="og:type" content="website"><meta property="og:site_name" content="Artifactory"><meta property="og:title" content="${e(title)}"><meta property="og:description" content="${e(description)}"><meta property="og:locale" content="${lang === "pl" ? "pl_PL" : "en_GB"}"><meta property="og:locale:alternate" content="${lang === "pl" ? "en_GB" : "pl_PL"}">${pageById[id] ? `<meta property="og:url" content="${origin}${pathFor(id, lang)}">` : ""}<meta property="og:image" content="${origin}/assets/share-${lang}.svg"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="preload" href="/assets/fonts/manrope-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/assets/styles.css"><script src="/assets/client.js" defer></script></head><body id="top" data-page="${id}">${header(id, lang)}${pageById[id] ? projectNav(id, lang) : ""}<main id="main">${pageById[id] ? breadcrumbs(id, lang) : ""}${content}</main>${footer(lang)}</body></html>`;
}
