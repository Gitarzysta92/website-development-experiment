document.documentElement.classList.replace("no-js", "js");

const lang = document.documentElement.lang;
const pl = lang === "pl";
const menuButton = document.querySelector("[data-menu-toggle]");
const mainNav = document.querySelector("#main-nav");
const projectMenu = document.querySelector(".project-menu");
const dropdown = document.querySelector(".projects-dropdown");
const mobile = window.matchMedia("(max-width: 960px)");

function closeMenu(restoreFocus = false) {
  mainNav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.querySelector("span").textContent = "Menu";
  if (restoreFocus) menuButton.focus();
}

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  mainNav.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.querySelector("span").textContent = open
    ? pl
      ? "Zamknij menu"
      : "Close menu"
    : "Menu";
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (dropdown?.open) {
    dropdown.open = false;
    dropdown.querySelector("summary").focus();
  }
  if (menuButton.getAttribute("aria-expanded") === "true") closeMenu(true);
  if (projectMenu?.open && mobile.matches) {
    projectMenu.open = false;
    projectMenu.querySelector("summary").focus();
  }
});
document.addEventListener("click", (event) => {
  if (!dropdown?.contains(event.target)) dropdown?.removeAttribute("open");
  if (
    mobile.matches &&
    !mainNav.contains(event.target) &&
    !menuButton.contains(event.target)
  )
    closeMenu();
});
function syncLayout() {
  if (!mobile.matches) closeMenu();
  if (projectMenu) projectMenu.open = !mobile.matches;
}
mobile.addEventListener("change", syncLayout);
syncLayout();

// Preserve only public navigation context across equivalent language routes.
const languageSwitch = document.querySelector("[data-language-switch]");
function syncLanguageLink() {
  if (!languageSwitch) return;
  const destination = new URL(languageSwitch.href);
  const current = new URL(location.href);
  const intents = ["investment", "partnership", "demo", "general"];
  const projects = ["artisense", "aifield"];
  destination.search = "";
  if (intents.includes(current.searchParams.get("intent")))
    destination.searchParams.set("intent", current.searchParams.get("intent"));
  if (projects.includes(current.searchParams.get("project")))
    destination.searchParams.set(
      "project",
      current.searchParams.get("project"),
    );
  destination.hash = /^#[a-z0-9-]+$/.test(location.hash) ? location.hash : "";
  languageSwitch.href =
    destination.pathname + destination.search + destination.hash;
}
syncLanguageLink();
window.addEventListener("hashchange", syncLanguageLink);

const form = document.querySelector("[data-enquiry]");
if (form) {
  const draftPanel = document.querySelector("[data-draft]");
  const draftText = document.querySelector("#draft-text");
  const copyStatus = document.querySelector("[data-copy-status]");
  const errorSummary = form.querySelector(".form-error-summary");
  const query = new URLSearchParams(location.search);
  if (
    ["investment", "partnership", "demo", "general"].includes(
      query.get("intent"),
    )
  )
    form.elements.intent.value = query.get("intent");
  if (["artisense", "aifield"].includes(query.get("project")))
    form.elements.project.value = query.get("project");
  let changed = false;
  form.addEventListener("input", () => {
    changed = true;
  });
  languageSwitch?.addEventListener("click", (event) => {
    if (
      changed &&
      !window.confirm(
        pl
          ? "Zmiana języka usunie niewysłaną treść formularza. Kontynuować?"
          : "Changing language will clear your unsent form contents. Continue?",
      )
    )
      event.preventDefault();
  });
  const updateCount = () => {
    form.querySelector("[data-count]").textContent =
      `${form.elements.message.value.length} / ${pl ? "4000" : "4,000"}`;
  };
  form.elements.message.addEventListener("input", updateCount);
  updateCount();
  const messageFor = (name) =>
    name === "email"
      ? pl
        ? "Podaj poprawny adres e-mail do odpowiedzi."
        : "Enter a valid reply email address."
      : pl
        ? "Wpisz wiadomość o długości od 20 do 4000 znaków."
        : "Enter a message between 20 and 4,000 characters.";
  function clearError(field) {
    field.removeAttribute("aria-invalid");
    const error = document.querySelector(`#${field.name}-error`);
    if (error) error.textContent = "";
  }
  ["email", "message"].forEach((name) =>
    form.elements[name].addEventListener("input", () =>
      clearError(form.elements[name]),
    ),
  );
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = [form.elements.email, form.elements.message];
    fields.forEach(clearError);
    const invalid = fields.filter(
      (field) =>
        !field.checkValidity() ||
        (field.name === "message" && field.value.trim().length < 20),
    );
    if (invalid.length) {
      invalid.forEach((field) => {
        field.setAttribute("aria-invalid", "true");
        document.querySelector(`#${field.name}-error`).textContent = messageFor(
          field.name,
        );
      });
      errorSummary.textContent = pl
        ? "Sprawdź zaznaczone pola. Treść formularza została zachowana."
        : "Check the highlighted fields. Your form contents have been kept.";
      errorSummary.hidden = false;
      invalid[0].focus();
      return;
    }
    errorSummary.hidden = true;
    const selected = form.elements.intent.selectedOptions[0].textContent;
    const project = form.elements.project.selectedOptions[0].textContent;
    const lines = [
      `${pl ? "Do" : "To"}: info@artifactory.tech`,
      `${pl ? "Temat" : "Subject"}: Artifactory — ${selected}`,
      "",
      `${pl ? "Rodzaj zapytania" : "Enquiry type"}: ${selected}`,
      `${pl ? "Projekt" : "Project"}: ${project}`,
      `${pl ? "E-mail do odpowiedzi" : "Reply email"}: ${form.elements.email.value.trim()}`,
    ];
    if (form.elements.name.value.trim())
      lines.push(
        `${pl ? "Imię i nazwisko" : "Name"}: ${form.elements.name.value.trim()}`,
      );
    if (form.elements.organization.value.trim())
      lines.push(
        `${pl ? "Organizacja" : "Organization"}: ${form.elements.organization.value.trim()}`,
      );
    lines.push("", form.elements.message.value.trim());
    draftText.value = lines.join("\n");
    copyStatus.textContent = "";
    form.hidden = true;
    draftPanel.hidden = false;
    draftPanel.focus({ preventScroll: true });
    draftPanel.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "center",
    });
  });
  document.querySelector("[data-edit]").addEventListener("click", () => {
    draftPanel.hidden = true;
    form.hidden = false;
    form.elements.message.focus();
  });
  document
    .querySelector("[data-copy]")
    .addEventListener("click", async (event) => {
      event.currentTarget.disabled = true;
      try {
        if (!navigator.clipboard?.writeText)
          throw new Error("Clipboard unavailable");
        await navigator.clipboard.writeText(draftText.value);
        copyStatus.textContent = pl
          ? "Skopiowano. Wklej treść do programu pocztowego. Nic nie zostało wysłane."
          : "Copied. Paste the text into your email app. Nothing has been sent.";
      } catch {
        draftText.focus();
        draftText.select();
        copyStatus.textContent = pl
          ? "Automatyczne kopiowanie jest niedostępne. Tekst zaznaczono — skopiuj go ręcznie."
          : "Automatic copying is unavailable. The text is selected for you to copy manually.";
      } finally {
        document.querySelector("[data-copy]").disabled = false;
      }
    });
}
