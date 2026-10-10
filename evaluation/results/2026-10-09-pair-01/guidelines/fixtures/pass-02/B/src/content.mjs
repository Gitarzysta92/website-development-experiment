export const languages = ["en", "pl"];
export const snapshotDate = "2026-10-09";
const route = (id, en, pl, enLabel, plLabel, parent = null) => ({
  id,
  paths: { en, pl },
  labels: { en: enLabel, pl: plLabel },
  parent,
});

export const pages = [
  route("home", "/en/", "/pl/", "Home", "Strona główna"),
  route("projects", "/en/projects/", "/pl/projekty/", "Projects", "Projekty"),
  route(
    "artisense",
    "/en/projects/artisense/",
    "/pl/projekty/artisense/",
    "ArtiSense",
    "ArtiSense",
    "projects",
  ),
  route(
    "artisense-technology",
    "/en/projects/artisense/technology/",
    "/pl/projekty/artisense/technologia/",
    "Technology",
    "Technologia",
    "artisense",
  ),
  route(
    "artisense-applications",
    "/en/projects/artisense/applications/",
    "/pl/projekty/artisense/zastosowania/",
    "Applications",
    "Zastosowania",
    "artisense",
  ),
  route(
    "artisense-validation",
    "/en/projects/artisense/research-validation/",
    "/pl/projekty/artisense/badania-walidacja/",
    "Research & validation",
    "Badania i walidacja",
    "artisense",
  ),
  route(
    "aifield",
    "/en/projects/aifield/",
    "/pl/projekty/aifield/",
    "AIFIELD",
    "AIFIELD",
    "projects",
  ),
  route(
    "aifield-design",
    "/en/projects/aifield/design-simulation/",
    "/pl/projekty/aifield/projektowanie-symulacja/",
    "Design & simulation",
    "Projektowanie i symulacja",
    "aifield",
  ),
  route(
    "aifield-ai",
    "/en/projects/aifield/ai-workflows/",
    "/pl/projekty/aifield/praca-z-ai/",
    "AI workflows",
    "Praca z AI",
    "aifield",
  ),
  route(
    "aifield-neural",
    "/en/projects/aifield/neural-field-research/",
    "/pl/projekty/aifield/badania-modeli-pola/",
    "Neural field research",
    "Badania modeli pola",
    "aifield",
  ),
  route(
    "aifield-validation",
    "/en/projects/aifield/examples-validation/",
    "/pl/projekty/aifield/przyklady-walidacja/",
    "Examples & validation",
    "Przykłady i walidacja",
    "aifield",
  ),
  route(
    "investors",
    "/en/investors/",
    "/pl/inwestorzy/",
    "Investors",
    "Dla inwestorów",
  ),
  route(
    "approach",
    "/en/approach/",
    "/pl/jak-pracujemy/",
    "Our approach",
    "Jak pracujemy",
  ),
  route("about", "/en/about/", "/pl/o-nas/", "About", "O nas"),
  route(
    "partnerships",
    "/en/partnerships/",
    "/pl/wspolpraca/",
    "Partnerships",
    "Współpraca",
  ),
  route("contact", "/en/contact/", "/pl/kontakt/", "Contact", "Kontakt"),
  route("privacy", "/en/privacy/", "/pl/prywatnosc/", "Privacy", "Prywatność"),
];

export const pageById = Object.fromEntries(pages.map((p) => [p.id, p]));
export const pathFor = (id, lang = "en") => pageById[id].paths[lang];
export const labelFor = (id, lang = "en") => pageById[id].labels[lang];
export const legacyRoutes = {
  "/": "/en/",
  "/artisense-module/": "/pl/projekty/artisense/",
  "/about/": "/pl/o-nas/",
  "/partners/": "/pl/wspolpraca/",
  "/contact/": "/pl/kontakt/",
};

export const ui = {
  en: {
    skip: "Skip to content",
    menu: "Menu",
    close: "Close menu",
    nav: "Main navigation",
    allProjects: "All projects",
    invest: "Let’s talk",
    investment: "Discuss an investment",
    investmentCase: "Explore the investment case",
    explore: "Explore our projects",
    overview: "Overview",
    onPage: "On this page",
    related: "Continue exploring",
    demo: "Request a demo",
    partner: "Discuss a partnership",
    projectNav: "Project navigation",
    preview: "Local preview",
    draft: "Draft content · 9 October 2026",
    evidence: "Evidence snapshot",
    conceptual:
      "Conceptual illustration · not a product image or measured result",
    footerLine: "Engineering light. Creating possibility.",
    footerDesc: "Sensing technology and tools for designing photonic systems.",
    company: "Company",
    connect: "Get in touch",
    email: "Email Artifactory",
    copyright: "Artifactory · 2026",
    footerNote:
      "Local review edition. Content and Polish translations await owner review.",
    homeTitle: "Engineering light. Creating possibility.",
    homeDesc:
      "Explore Artifactory, the company developing ArtiSense sensing technology and AIFIELD photonic engineering tools.",
    noResults: "This page is outside our field.",
    notFound:
      "The address may have changed. Find your way back to our projects or start a conversation.",
    backHome: "Back to home",
    date: "9 October 2026",
    researchDate: "September 2026 material",
  },
  pl: {
    skip: "Przejdź do treści",
    menu: "Menu",
    close: "Zamknij menu",
    nav: "Nawigacja główna",
    allProjects: "Wszystkie projekty",
    invest: "Porozmawiajmy",
    investment: "Porozmawiajmy o inwestycji",
    investmentCase: "Poznaj potencjał inwestycyjny",
    explore: "Poznaj nasze projekty",
    overview: "Przegląd",
    onPage: "Na tej stronie",
    related: "Poznaj więcej",
    demo: "Poproś o demo",
    partner: "Porozmawiajmy o współpracy",
    projectNav: "Nawigacja projektu",
    preview: "Podgląd lokalny",
    draft: "Treści robocze · 9 października 2026",
    evidence: "Stan wiedzy",
    conceptual:
      "Ilustracja koncepcyjna · nie przedstawia produktu ani wyników pomiarów",
    footerLine: "Projektujemy ze światłem. Otwieramy możliwości.",
    footerDesc:
      "Technologie pomiarowe i narzędzia do projektowania układów fotonicznych.",
    company: "Firma",
    connect: "Kontakt",
    email: "Napisz do Artifactory",
    copyright: "Artifactory · 2026",
    footerNote:
      "Lokalna wersja do przeglądu. Treści i polskie tłumaczenia wymagają zatwierdzenia.",
    homeTitle: "Projektujemy ze światłem. Otwieramy możliwości.",
    homeDesc:
      "Poznaj Artifactory, firmę rozwijającą technologię pomiarową ArtiSense i narzędzia inżynierii fotonicznej AIFIELD.",
    noResults: "Ta strona jest poza naszym zasięgiem.",
    notFound:
      "Adres mógł się zmienić. Wróć do naszych projektów lub rozpocznij rozmowę.",
    backHome: "Wróć na stronę główną",
    date: "9 października 2026",
    researchDate: "Materiały z września 2026",
  },
};

export const projects = {
  artisense: {
    en: {
      category: "Photonic sensing",
      headline: "A new perspective on sensing.",
      summary:
        "Exploring how light can reveal chemical information, with a miniaturized sensing system at the heart of the research.",
      short:
        "Light-based chemical sensing, from optical feasibility to system design.",
      stage: "Research & concept development",
      scope: "Sensing systems",
      intro:
        "ArtiSense investigates a photonic approach to chemical measurement. The intended system brings illumination, optical response and signal interpretation together in a compact architecture.",
      audience:
        "For researchers and engineering partners exploring optical sensing and its integration into future measurement systems.",
      evidence:
        "The supplied material describes optical feasibility work and a photonic glucose chip-design example.",
      limit:
        "Design and simulation do not establish a fabricated sensor, glucose accuracy or clinical performance. Non-invasive and wearable uses remain intended directions.",
      next: "A proposed next step is to define the physical experiment and calibration conditions needed to test the optical design. Timing and responsibility require project confirmation.",
      question: "From optical response to useful information.",
      areas: [
        "Sensing architecture",
        "Intended applications",
        "Research & validation",
      ],
    },
    pl: {
      category: "Czujniki fotoniczne",
      headline: "Nowe spojrzenie na pomiary.",
      summary:
        "Badamy, jak światło może ujawniać informacje o składzie chemicznym. Punktem wyjścia jest koncepcja zminiaturyzowanego układu pomiarowego.",
      short:
        "Pomiary chemiczne oparte na świetle: od analizy wykonalności do projektu układu.",
      stage: "Badania i rozwój koncepcji",
      scope: "Układy pomiarowe",
      intro:
        "ArtiSense bada fotoniczne podejście do pomiarów chemicznych. Docelowy system ma łączyć oświetlenie próbki, rejestrację odpowiedzi optycznej i interpretację sygnału w kompaktowej architekturze.",
      audience:
        "Dla badaczy i partnerów inżynieryjnych zajmujących się pomiarami optycznymi i ich integracją w przyszłych systemach.",
      evidence:
        "Dostarczone materiały opisują prace nad wykonalnością optyczną i przykład projektu fotonicznego układu do pomiaru glukozy.",
      limit:
        "Projekt i symulacja nie potwierdzają istnienia wykonanego czujnika, dokładności pomiaru glukozy ani skuteczności klinicznej. Pomiary nieinwazyjne i forma ubieralna pozostają kierunkami rozwoju.",
      next: "Proponowany kolejny krok to określenie eksperymentu fizycznego i warunków kalibracji do sprawdzenia projektu optycznego. Termin i odpowiedzialność wymagają potwierdzenia.",
      question: "Od odpowiedzi optycznej do użytecznej informacji.",
      areas: [
        "Architektura pomiarowa",
        "Planowane zastosowania",
        "Badania i walidacja",
      ],
    },
  },
  aifield: {
    en: {
      category: "Photonic engineering",
      headline: "Give photonic ideas room to develop.",
      summary:
        "A design and simulation environment for exploring photonic systems, with AI-assisted workflows and a distinct neural field research direction.",
      short: "Tools to design, simulate and investigate photonic systems.",
      stage: "Development & internal demonstrations",
      scope: "Design & simulation tools",
      intro:
        "AIFIELD brings photonic design and simulation tasks into an engineering workflow. September 2026 material describes geometry, layer and process handling alongside mode, circuit, field and thermal simulation work.",
      audience:
        "For photonic engineers, researchers and potential design partners evaluating how to move from a design question to an inspectable simulation.",
      evidence:
        "The supplied snapshot includes internal simulation comparisons, an optical chip-design example and partially assisted engineering workflows.",
      limit:
        "Internal comparisons are not measurements on fabricated chips. Neural field prediction remains research, with boundary conditions and open questions attached.",
      next: "Proposed priorities include a reproducible demonstration, clearer capability boundaries and documented comparison conditions. Demo scope and access are arranged through an enquiry.",
      question: "From a design question to an inspectable result.",
      areas: [
        "Design & simulation",
        "AI workflows",
        "Neural field research",
        "Examples & validation",
      ],
    },
    pl: {
      category: "Inżynieria fotoniczna",
      headline: "Przestrzeń dla fotonicznych pomysłów.",
      summary:
        "Środowisko projektowania i symulacji układów fotonicznych, z procesami wspieranymi przez AI oraz odrębnym kierunkiem badań nad neuronowymi modelami pola.",
      short:
        "Narzędzia do projektowania, symulacji i badania układów fotonicznych.",
      stage: "Rozwój i demonstracje wewnętrzne",
      scope: "Projektowanie i symulacja",
      intro:
        "AIFIELD łączy zadania projektowania i symulacji w proces inżynierii fotonicznej. Materiały z września 2026 opisują obsługę geometrii, warstw i procesów oraz prace nad symulacją modów, obwodów, pól i zjawisk cieplnych.",
      audience:
        "Dla inżynierów fotoniki, badaczy i potencjalnych partnerów projektowych szukających drogi od pytania projektowego do wyniku symulacji, który można przeanalizować.",
      evidence:
        "Dostarczone materiały obejmują wewnętrzne porównania symulacji, przykład projektu układu optycznego i częściowo wspomagane procesy inżynieryjne.",
      limit:
        "Porównania wewnętrzne nie są pomiarami na wykonanych układach. Predykcja pola przez modele neuronowe pozostaje badaniem, z określonymi warunkami brzegowymi i otwartymi pytaniami.",
      next: "Proponowane priorytety to powtarzalna demonstracja, doprecyzowanie zakresu funkcji i udokumentowanie warunków porównań. Zakres demo i dostęp wymagają kontaktu.",
      question: "Od pytania projektowego do analizy wyniku.",
      areas: [
        "Projektowanie i symulacja",
        "Praca z AI",
        "Badania modeli pola",
        "Przykłady i walidacja",
      ],
    },
  },
};

export const detailContent = {
  "artisense-technology": {
    visual: "sense",
    en: {
      eyebrow: "ArtiSense / Technology",
      title: "A system designed around light.",
      description:
        "Explore the proposed path from illumination to optical response, signal processing and interpretation in ArtiSense.",
      intro:
        "ArtiSense is a chemical-sensing research project. Its proposed architecture connects photonic components with signal interpretation; the components below describe a system concept, not a validated device.",
      sections: [
        {
          id: "signal-path",
          title: "The proposed signal path",
          body: "Visible or infrared light interacts with a sample. The resulting optical response is detected and compared with a reference. Interpretation then seeks to connect changes in the spectrum with chemical information.",
          steps: [
            ["Illuminate", "Introduce light under controlled conditions."],
            [
              "Interact",
              "Observe how the sample changes the optical response.",
            ],
            ["Detect", "Capture a signal suitable for reference comparison."],
            [
              "Interpret",
              "Evaluate spectral information within a calibration model.",
            ],
          ],
        },
        {
          id: "processing",
          title: "Photonics and signal interpretation",
          body: "The reviewed architecture describes a proposed reprogrammable analog neuromorphic processor, software support and connectivity. These are architectural directions. The supplied context does not establish which blocks have been implemented or integrated.",
          note: "The proposed ArtiSense analog processor is distinct from AIFIELD’s research into neural prediction of optical fields.",
        },
        {
          id: "integration",
          title: "What integration needs to resolve",
          cards: [
            [
              "Calibration",
              "Define the reference, operating conditions and sensitivity to variations in the sample.",
            ],
            [
              "Optical coupling",
              "Characterize the path between the light source, sample and detector in a physical setup.",
            ],
            [
              "System constraints",
              "Establish power, packaging, stability and signal-processing requirements through experiments.",
            ],
          ],
        },
        {
          id: "design-link",
          title: "Where AIFIELD contributes",
          body: "The supplied material includes a photonic glucose chip-design example associated with this sensing direction. AIFIELD pages explain the design activity; ArtiSense validation pages explain what must be established by measurement. A simulated design is one input to that work.",
          link: "aifield-design",
        },
      ],
    },
    pl: {
      eyebrow: "ArtiSense / Technologia",
      title: "Układ zaprojektowany wokół światła.",
      description:
        "Poznaj proponowaną drogę od oświetlenia próbki, przez odpowiedź optyczną i przetwarzanie sygnału, do interpretacji w ArtiSense.",
      intro:
        "ArtiSense to projekt badawczy dotyczący pomiarów chemicznych. Proponowana architektura łączy elementy fotoniczne z interpretacją sygnału. Opisane bloki przedstawiają koncepcję systemu, a nie zwalidowane urządzenie.",
      sections: [
        {
          id: "signal-path",
          title: "Proponowana droga sygnału",
          body: "Światło widzialne lub podczerwone oddziałuje z próbką. Odpowiedź optyczna jest rejestrowana i porównywana z odniesieniem. Interpretacja ma powiązać zmiany w widmie z informacją chemiczną.",
          steps: [
            ["Oświetlenie", "Wprowadzenie światła w kontrolowanych warunkach."],
            [
              "Oddziaływanie",
              "Obserwacja wpływu próbki na odpowiedź optyczną.",
            ],
            [
              "Detekcja",
              "Rejestracja sygnału umożliwiającego porównanie z odniesieniem.",
            ],
            [
              "Interpretacja",
              "Ocena informacji widmowej w ramach modelu kalibracji.",
            ],
          ],
        },
        {
          id: "processing",
          title: "Fotonika i interpretacja sygnału",
          body: "Opisana architektura obejmuje proponowany reprogramowalny analogowy procesor neuromorficzny, oprogramowanie i łączność. To kierunki rozwoju architektury. Dostarczony opis nie potwierdza, które bloki zostały wykonane lub zintegrowane.",
          note: "Proponowany procesor analogowy ArtiSense jest odrębnym zagadnieniem od badań AIFIELD nad neuronową predykcją pól optycznych.",
        },
        {
          id: "integration",
          title: "Co wymaga rozstrzygnięcia przy integracji",
          cards: [
            [
              "Kalibracja",
              "Określenie odniesienia, warunków pracy i wrażliwości na zmienność próbki.",
            ],
            [
              "Sprzężenie optyczne",
              "Charakterystyka drogi między źródłem światła, próbką i detektorem w układzie fizycznym.",
            ],
            [
              "Ograniczenia systemowe",
              "Eksperymentalne określenie wymagań dotyczących zasilania, obudowy, stabilności i przetwarzania sygnału.",
            ],
          ],
        },
        {
          id: "design-link",
          title: "Rola AIFIELD",
          body: "Materiały obejmują przykład projektu fotonicznego układu do pomiaru glukozy związanego z tym kierunkiem badań. Strony AIFIELD opisują projektowanie, a strony walidacji ArtiSense wyjaśniają, co należy wykazać w pomiarach. Projekt symulacyjny to jeden z punktów wyjścia.",
          link: "aifield-design",
        },
      ],
    },
  },
  "artisense-applications": {
    visual: "sense",
    en: {
      eyebrow: "ArtiSense / Applications",
      title: "A measurement ambition. A clear research path.",
      description:
        "Understand the intended glucose-sensing application, proposed form factors and the evidence needed before use.",
      intro:
        "ArtiSense explores chemical information through optical sensing. Photonic glucose sensing is the substantial application example in the supplied research; intended uses must be evaluated against physical measurement evidence.",
      sections: [
        {
          id: "glucose",
          title: "Investigating photonic glucose sensing",
          body: "The research asks whether an optical approach can contribute to glucose measurement. Work described in the source context concerns optical feasibility and chip design. The measurement objective gives engineering work a concrete question without establishing a working glucose monitor.",
          note: "No validated glucose accuracy, clinical outcome or medical-use readiness is established by the supplied material.",
        },
        {
          id: "form-factor",
          title: "Compact by intention",
          body: "Miniaturization, non-invasive measurement and wearable formats are intended directions. Reaching them would require evidence about sample interaction, signal stability, calibration, power and integration. The illustrations on this site are concepts, not photographs of available hardware.",
        },
        {
          id: "requirements",
          title: "From intended use to testable requirements",
          cards: [
            [
              "Measurement context",
              "Define the sample, operating environment and relevant sources of variation.",
            ],
            [
              "Reference measurement",
              "Specify how an optical estimate would be compared with a suitable reference under stated conditions.",
            ],
            [
              "Repeatability",
              "Evaluate stability across repeated measurements before extending claims to a wider use context.",
            ],
          ],
        },
        {
          id: "collaborate",
          title: "Bring a measurement question",
          body: "A useful technical discussion starts with the intended measurement, the required reference and the experiment that could challenge the hypothesis. Application priorities and collaboration ownership still need confirmation.",
          link: "partnerships",
        },
      ],
    },
    pl: {
      eyebrow: "ArtiSense / Zastosowania",
      title: "Cel pomiarowy. Jasna ścieżka badań.",
      description:
        "Poznaj planowany pomiar glukozy, proponowane formy urządzenia i dowody potrzebne przed zastosowaniem.",
      intro:
        "ArtiSense bada informacje chemiczne za pomocą pomiarów optycznych. Fotoniczny pomiar glukozy jest głównym przykładem zastosowania w materiałach badawczych. Zamierzone użycie wymaga oceny na podstawie rzeczywistych pomiarów.",
      sections: [
        {
          id: "glucose",
          title: "Badania nad fotonicznym pomiarem glukozy",
          body: "Pytanie badawcze dotyczy przydatności podejścia optycznego w pomiarach glukozy. Prace opisane w materiałach obejmują wykonalność optyczną i projektowanie układu. Cel pomiarowy nadaje pracy inżynieryjnej konkretny kierunek, lecz nie potwierdza działania glukometru.",
          note: "Dostarczone materiały nie potwierdzają zwalidowanej dokładności pomiaru glukozy, wyników klinicznych ani gotowości do użytku medycznego.",
        },
        {
          id: "form-factor",
          title: "Kompaktowość jako kierunek",
          body: "Miniaturyzacja, pomiary nieinwazyjne i urządzenia ubieralne to zamierzone kierunki. Ich osiągnięcie wymaga dowodów dotyczących oddziaływania z próbką, stabilności sygnału, kalibracji, zasilania i integracji. Ilustracje na stronie pokazują koncepcje, a nie dostępny sprzęt.",
        },
        {
          id: "requirements",
          title: "Od zamierzonego użycia do sprawdzalnych wymagań",
          cards: [
            [
              "Kontekst pomiaru",
              "Określenie próbki, środowiska pracy i istotnych źródeł zmienności.",
            ],
            [
              "Pomiar odniesienia",
              "Określenie sposobu porównania estymacji optycznej z odpowiednim odniesieniem w ustalonych warunkach.",
            ],
            [
              "Powtarzalność",
              "Ocena stabilności w kolejnych pomiarach przed rozszerzeniem wniosków na szerszy kontekst użycia.",
            ],
          ],
        },
        {
          id: "collaborate",
          title: "Zacznij od pytania pomiarowego",
          body: "Wartościowa rozmowa techniczna zaczyna się od celu pomiaru, wymaganego odniesienia i eksperymentu sprawdzającego hipotezę. Priorytety zastosowań i odpowiedzialność za współpracę wymagają potwierdzenia.",
          link: "partnerships",
        },
      ],
    },
  },
  "artisense-validation": {
    visual: "sense",
    en: {
      eyebrow: "ArtiSense / Research & validation",
      title: "What the evidence can tell us.",
      description:
        "A qualified account of ArtiSense optical feasibility and design work, with the gaps to physical and clinical validation.",
      intro:
        "The supplied September 2026 research describes optical feasibility and chip-design work. This page separates that engineering evidence from the further measurements an eventual sensing system would require.",
      sections: [
        {
          id: "evidence",
          title: "An evidence snapshot",
          table: {
            headers: [
              "Work described",
              "What it supports",
              "What it does not establish",
            ],
            rows: [
              [
                "Optical feasibility",
                "Investigation of a candidate sensing approach",
                "Validated chemical measurement",
              ],
              [
                "Photonic chip design",
                "An engineering design and simulation example",
                "A fabricated and tested sensor",
              ],
              [
                "Intended wearable use",
                "A direction for future integration",
                "A finished or clinically validated product",
              ],
            ],
          },
          note: "Based on supplied research context, reviewed for this local draft on 9 October 2026. Original figures, experimental conditions and numerical results are not included in the input package.",
        },
        {
          id: "validation-path",
          title: "The proposed validation sequence",
          steps: [
            [
              "Define the experiment",
              "Specify a hypothesis, optical setup, sample and reference measurement.",
            ],
            [
              "Characterize the physical system",
              "Test fabricated components and document operating conditions.",
            ],
            [
              "Evaluate measurement behavior",
              "Investigate calibration, repeatability and sources of interference.",
            ],
            [
              "Assess the intended use",
              "Plan any further validation required for the eventual application.",
            ],
          ],
        },
        {
          id: "questions",
          title: "Questions that determine the next step",
          body: "Which optical response is robust enough to measure? How does the result change with sample conditions? What calibration assumptions survive a physical test? Answers to these questions should define the next milestone; no completion dates are confirmed here.",
        },
        {
          id: "design-evidence",
          title: "Keep design evidence in context",
          body: "AIFIELD’s chip-design example explains an engineering workflow. It does not establish sensing accuracy. Reviewing both evidence records helps distinguish progress in the design tools from progress toward a physical measurement system.",
          link: "aifield-validation",
        },
      ],
    },
    pl: {
      eyebrow: "ArtiSense / Badania i walidacja",
      title: "Co mówią dostępne dowody.",
      description:
        "Opis prac nad wykonalnością optyczną i projektem ArtiSense oraz różnic między nimi a walidacją fizyczną i kliniczną.",
      intro:
        "Materiały badawcze z września 2026 opisują prace nad wykonalnością optyczną i projektowaniem układu. Ta strona oddziela te dowody inżynieryjne od dalszych pomiarów potrzebnych docelowemu systemowi.",
      sections: [
        {
          id: "evidence",
          title: "Przegląd dostępnych dowodów",
          table: {
            headers: [
              "Opisane prace",
              "Co wspierają",
              "Czego nie potwierdzają",
            ],
            rows: [
              [
                "Wykonalność optyczna",
                "Badanie potencjalnej metody pomiarowej",
                "Zwalidowanego pomiaru chemicznego",
              ],
              [
                "Projekt układu fotonicznego",
                "Przykład projektu i symulacji inżynieryjnej",
                "Wykonanego i przetestowanego czujnika",
              ],
              [
                "Planowane użycie ubieralne",
                "Kierunek przyszłej integracji",
                "Gotowego lub klinicznie zwalidowanego produktu",
              ],
            ],
          },
          note: "Na podstawie dostarczonego kontekstu badawczego, przejrzanego na potrzeby lokalnej wersji 9 października 2026. Pakiet nie zawiera oryginalnych wykresów, warunków eksperymentów ani wyników liczbowych.",
        },
        {
          id: "validation-path",
          title: "Proponowana sekwencja walidacji",
          steps: [
            [
              "Definicja eksperymentu",
              "Określenie hipotezy, układu optycznego, próbki i pomiaru odniesienia.",
            ],
            [
              "Charakterystyka układu fizycznego",
              "Badanie wykonanych elementów i dokumentowanie warunków pracy.",
            ],
            [
              "Ocena zachowania pomiarowego",
              "Badanie kalibracji, powtarzalności i źródeł zakłóceń.",
            ],
            [
              "Ocena zamierzonego użycia",
              "Plan dalszej walidacji wymaganej dla docelowego zastosowania.",
            ],
          ],
        },
        {
          id: "questions",
          title: "Pytania wyznaczające kolejny krok",
          body: "Która odpowiedź optyczna jest wystarczająco stabilna do pomiaru? Jak wynik zależy od warunków próbki? Które założenia kalibracji potwierdzi test fizyczny? Odpowiedzi powinny określić kolejny etap. Nie potwierdzono terminów jego ukończenia.",
        },
        {
          id: "design-evidence",
          title: "Kontekst dowodów projektowych",
          body: "Przykład projektu układu w AIFIELD przedstawia proces inżynieryjny. Nie potwierdza dokładności pomiarowej. Przegląd obu obszarów pozwala odróżnić postęp narzędzi projektowych od rozwoju fizycznego systemu pomiarowego.",
          link: "aifield-validation",
        },
      ],
    },
  },
  "aifield-design": {
    visual: "field",
    en: {
      eyebrow: "AIFIELD / Design & simulation",
      title: "Shape the design. Inspect the physics.",
      description:
        "Explore the AIFIELD design workflow, geometry and process handling, and the classical simulation work described in September 2026.",
      intro:
        "AIFIELD is a photonic CAD and simulation project. Its September 2026 material describes an engineering environment for setting up designs and investigating their behavior through classical simulation.",
      sections: [
        {
          id: "workflow",
          title: "An engineering workflow",
          steps: [
            [
              "Define",
              "Describe the engineering question and relevant geometry.",
            ],
            [
              "Configure",
              "Set up layers, process information and simulation conditions.",
            ],
            [
              "Simulate",
              "Apply the appropriate classical calculation to the design.",
            ],
            [
              "Inspect",
              "Review results, assumptions and comparison evidence before iterating.",
            ],
          ],
        },
        {
          id: "capabilities",
          title: "What the supplied snapshot describes",
          table: {
            headers: ["Area", "Described work", "Review boundary"],
            rows: [
              [
                "Design setup",
                "Geometry, layers and process handling",
                "Exact supported formats need confirmation",
              ],
              [
                "Optical simulation",
                "Mode, circuit and field work",
                "Scope and solver conditions vary by task",
              ],
              [
                "Thermal simulation",
                "Investigation of thermal behavior",
                "Current implementation coverage needs review",
              ],
              [
                "Results",
                "Internal comparisons and worked designs",
                "No fabricated-device measurement implied",
              ],
            ],
          },
        },
        {
          id: "example",
          title: "A sensing question becomes a design",
          body: "The photonic glucose chip-design example connects a measurement objective to optical design and simulation. The engineering output belongs to the tool’s evidence record. Whether a physical system can deliver the intended measurement is a separate ArtiSense question.",
          link: "aifield-validation",
        },
        {
          id: "demo",
          title: "A demo with a defined scope",
          body: "A useful evaluation starts with your engineering task, expected inputs and the result you need to inspect. Current access, supported formats and demonstrable functions must be agreed with the project team; no downloadable release or open account service is offered here.",
          link: "contact",
          intent: "demo",
          project: "aifield",
        },
      ],
    },
    pl: {
      eyebrow: "AIFIELD / Projektowanie i symulacja",
      title: "Zaprojektuj układ. Zbadaj fizykę.",
      description:
        "Poznaj proces projektowania AIFIELD, obsługę geometrii i procesów oraz klasyczne symulacje opisane we wrześniu 2026.",
      intro:
        "AIFIELD to projekt narzędzia CAD i symulacji fotonicznych. Materiały z września 2026 opisują środowisko inżynieryjne do tworzenia projektów i badania ich zachowania za pomocą klasycznych symulacji.",
      sections: [
        {
          id: "workflow",
          title: "Proces inżynieryjny",
          steps: [
            [
              "Definicja",
              "Opis pytania inżynieryjnego i odpowiedniej geometrii.",
            ],
            [
              "Konfiguracja",
              "Ustawienie warstw, informacji procesowych i warunków symulacji.",
            ],
            [
              "Symulacja",
              "Zastosowanie odpowiednich obliczeń klasycznych do projektu.",
            ],
            [
              "Analiza",
              "Przegląd wyników, założeń i porównań przed kolejną iteracją.",
            ],
          ],
        },
        {
          id: "capabilities",
          title: "Zakres opisany w materiałach",
          table: {
            headers: ["Obszar", "Opisane prace", "Ograniczenia oceny"],
            rows: [
              [
                "Przygotowanie projektu",
                "Geometria, warstwy i obsługa procesów",
                "Dokładne obsługiwane formaty wymagają potwierdzenia",
              ],
              [
                "Symulacje optyczne",
                "Mody, obwody i pola",
                "Zakres i warunki zależą od zadania",
              ],
              [
                "Symulacje cieplne",
                "Badanie zachowania termicznego",
                "Aktualny zakres implementacji wymaga przeglądu",
              ],
              [
                "Wyniki",
                "Porównania wewnętrzne i przykłady projektowe",
                "Nie oznacza pomiarów na wykonanych układach",
              ],
            ],
          },
        },
        {
          id: "example",
          title: "Od pytania pomiarowego do projektu",
          body: "Przykład fotonicznego układu do pomiaru glukozy łączy cel pomiarowy z projektem optycznym i symulacją. Wynik inżynieryjny należy do zbioru dowodów dotyczących narzędzia. Możliwość uzyskania docelowego pomiaru w układzie fizycznym to odrębne pytanie ArtiSense.",
          link: "aifield-validation",
        },
        {
          id: "demo",
          title: "Demo o określonym zakresie",
          body: "Wartościowa ocena zaczyna się od zadania inżynieryjnego, oczekiwanych danych wejściowych i wyniku do analizy. Dostęp, obsługiwane formaty i zakres demonstracji trzeba uzgodnić z zespołem. Strona nie oferuje wersji do pobrania ani otwartej rejestracji.",
          link: "contact",
          intent: "demo",
          project: "aifield",
        },
      ],
    },
  },
  "aifield-ai": {
    visual: "workflow",
    en: {
      eyebrow: "AIFIELD / AI workflows",
      title: "Assistance for the engineer. Review at every step.",
      description:
        "How command-line and MCP interactions can assist photonic engineering, with explicit human review and data boundaries.",
      intro:
        "AIFIELD’s supplied material explores agent-assisted engineering through command-line and Model Context Protocol (MCP) interactions. The described work is partial assistance; it does not establish autonomous end-to-end chip design.",
      sections: [
        {
          id: "review-loop",
          title: "The human review loop",
          steps: [
            [
              "Ask",
              "The engineer describes a design task and its constraints.",
            ],
            ["Propose", "An assistant prepares a candidate change or action."],
            [
              "Review & apply",
              "A person inspects the proposal and controls its application.",
            ],
            [
              "Run & inspect",
              "Tools execute the selected work; the engineer reviews results and limitations.",
            ],
          ],
        },
        {
          id: "responsibility",
          title: "Engineering judgment stays visible",
          body: "An assistant can help express a task and prepare actions, but a plausible proposal is not proof of a correct design. The engineer remains responsible for assumptions, setup, result interpretation and deciding whether further checks are required.",
          cards: [
            [
              "Before execution",
              "Check the geometry, parameters and intended action.",
            ],
            [
              "After execution",
              "Inspect results and compare against a suitable reference.",
            ],
          ],
        },
        {
          id: "data-boundary",
          title: "Local tools and external assistance",
          body: "The context distinguishes local solver work from information that may be processed by an external assistant. The exact tool actions and data flow need current verification. No claim that every part of the workflow is local or confidential can be made from this material.",
          note: "A demonstration should identify what information leaves the machine, the service receiving it and the person authorizing that step.",
        },
        {
          id: "limits",
          title: "What to inspect in a demonstration",
          body: "Ask to see a concrete task, the proposed action, the human intervention point, a solver result and a failure or limitation. A recorded sequence and available-action list would make the actual automation boundary reviewable.",
          link: "contact",
          intent: "demo",
          project: "aifield",
        },
      ],
    },
    pl: {
      eyebrow: "AIFIELD / Praca z AI",
      title: "Wsparcie inżyniera. Kontrola na każdym etapie.",
      description:
        "Jak interfejs wiersza poleceń i MCP mogą wspierać inżynierię fotoniczną, z kontrolą człowieka i jawnymi granicami przepływu danych.",
      intro:
        "Materiały AIFIELD opisują wspomaganie pracy inżynieryjnej przez agentów za pomocą wiersza poleceń i Model Context Protocol (MCP). To częściowa pomoc, która nie potwierdza autonomicznego projektowania układów od początku do końca.",
      sections: [
        {
          id: "review-loop",
          title: "Pętla kontroli człowieka",
          steps: [
            [
              "Polecenie",
              "Inżynier opisuje zadanie projektowe i ograniczenia.",
            ],
            [
              "Propozycja",
              "Asystent przygotowuje możliwą zmianę lub działanie.",
            ],
            [
              "Ocena i zastosowanie",
              "Człowiek sprawdza propozycję i kontroluje jej zastosowanie.",
            ],
            [
              "Wykonanie i analiza",
              "Narzędzia wykonują wybrane działania, a inżynier ocenia wyniki i ograniczenia.",
            ],
          ],
        },
        {
          id: "responsibility",
          title: "Ocena inżynieryjna pozostaje niezbędna",
          body: "Asystent może pomóc sformułować zadanie i przygotować działania, ale wiarygodnie brzmiąca propozycja nie dowodzi poprawności projektu. Inżynier odpowiada za założenia, konfigurację, interpretację i decyzję o dalszych testach.",
          cards: [
            [
              "Przed wykonaniem",
              "Sprawdź geometrię, parametry i planowane działanie.",
            ],
            [
              "Po wykonaniu",
              "Przeanalizuj wyniki i porównaj je z odpowiednim odniesieniem.",
            ],
          ],
        },
        {
          id: "data-boundary",
          title: "Lokalne narzędzia i zewnętrzny asystent",
          body: "Opis rozróżnia lokalne obliczenia solvera od informacji, które może przetwarzać zewnętrzny asystent. Dokładne działania narzędzi i przepływ danych wymagają weryfikacji. Materiały nie pozwalają twierdzić, że cały proces jest lokalny lub poufny.",
          note: "Demonstracja powinna wskazywać, jakie informacje opuszczają komputer, jaka usługa je otrzymuje i kto zatwierdza ten krok.",
        },
        {
          id: "limits",
          title: "Co sprawdzić podczas demonstracji",
          body: "Warto zobaczyć konkretne zadanie, proponowaną czynność, moment interwencji człowieka, wynik solvera oraz błąd lub ograniczenie. Nagranie procesu i lista dostępnych działań pozwoliłyby ocenić rzeczywisty zakres automatyzacji.",
          link: "contact",
          intent: "demo",
          project: "aifield",
        },
      ],
    },
  },
  "aifield-neural": {
    visual: "field",
    en: {
      eyebrow: "AIFIELD / Neural field research",
      title: "A research frontier in optical fields.",
      description:
        "Explore neural optical-field prediction as a research direction, including boundary conditions, generalization and unresolved speed comparisons.",
      intro:
        "This branch investigates neural prediction of optical fields. It is distinct from AIFIELD’s classical simulation functionality and from the proposed analog interpretation processor in ArtiSense.",
      sections: [
        {
          id: "question",
          title: "The research question",
          body: "Can a learned model predict optical-field behavior usefully within a photonic engineering workflow? The supplied material describes experiments under specific conditions. It does not establish a generally applicable replacement for classical solvers.",
        },
        {
          id: "conditions",
          title: "Conditions belong with the result",
          cards: [
            [
              "Boundary information",
              "Reviewed results include supplied boundary information. This condition must travel with any comparison.",
            ],
            [
              "Generalization",
              "Performance on one setup does not establish reliable prediction from scratch on a different geometry.",
            ],
            [
              "Domain size",
              "Larger stitched domains remain a research question rather than an assumed capability.",
            ],
            [
              "Practical speed",
              "Any speed claim must include preparation, inference and comparison conditions; a practical advantage remains unresolved.",
            ],
          ],
        },
        {
          id: "comparison",
          title: "What a useful comparison needs",
          body: "A reviewable experiment would identify its geometry, input and boundary information, reference solution, error measure and full runtime conditions. Both successful and unsuccessful cases matter. The input package does not provide a publishable numerical benchmark or approved experiment figure.",
          note: "The field illustration is a visual explanation of the research topic. Its colors and contours are not simulation output.",
        },
        {
          id: "next",
          title: "The next research questions",
          body: "Proposed next investigations concern prediction with less supplied information, behavior across different geometries, larger domains and an end-to-end speed comparison. These are research directions, with no confirmed completion schedule.",
          link: "aifield-validation",
        },
      ],
    },
    pl: {
      eyebrow: "AIFIELD / Badania modeli pola",
      title: "Nowy kierunek badań nad polami optycznymi.",
      description:
        "Poznaj neuronową predykcję pól optycznych jako kierunek badań, z warunkami brzegowymi, generalizacją i otwartym pytaniem o szybkość.",
      intro:
        "Ten obszar dotyczy neuronowej predykcji pól optycznych. Jest odrębny od klasycznych symulacji AIFIELD i od proponowanego analogowego procesora interpretacyjnego ArtiSense.",
      sections: [
        {
          id: "question",
          title: "Pytanie badawcze",
          body: "Czy wyuczony model może przewidywać zachowanie pola optycznego w sposób przydatny w pracy inżynieryjnej? Materiały opisują eksperymenty w określonych warunkach. Nie potwierdzają uniwersalnego zastąpienia klasycznych solverów.",
        },
        {
          id: "conditions",
          title: "Warunki są częścią wyniku",
          cards: [
            [
              "Informacja brzegowa",
              "Opisane wyniki obejmują dostarczoną informację brzegową. Ten warunek musi towarzyszyć każdemu porównaniu.",
            ],
            [
              "Generalizacja",
              "Wynik dla jednego układu nie potwierdza wiarygodnej predykcji od podstaw dla innej geometrii.",
            ],
            [
              "Rozmiar domeny",
              "Większe, łączone domeny pozostają pytaniem badawczym, a nie potwierdzoną funkcją.",
            ],
            [
              "Szybkość w praktyce",
              "Ocena szybkości musi uwzględniać przygotowanie, inferencję i warunki porównania. Praktyczna przewaga pozostaje nierozstrzygnięta.",
            ],
          ],
        },
        {
          id: "comparison",
          title: "Co jest potrzebne do wartościowego porównania",
          body: "Eksperyment możliwy do oceny powinien określać geometrię, dane wejściowe i brzegowe, rozwiązanie odniesienia, miarę błędu i pełne warunki czasowe. Ważne są przypadki udane i nieudane. Pakiet nie zawiera benchmarku liczbowego ani zatwierdzonego wykresu do publikacji.",
          note: "Ilustracja pola wyjaśnia temat badań. Jej kolory i kontury nie przedstawiają wyników symulacji.",
        },
        {
          id: "next",
          title: "Kolejne pytania badawcze",
          body: "Proponowane dalsze badania dotyczą predykcji z mniejszą ilością informacji wejściowej, różnych geometrii, większych domen i porównania pełnego czasu obliczeń. To kierunki badań bez potwierdzonego harmonogramu.",
          link: "aifield-validation",
        },
      ],
    },
  },
  "aifield-validation": {
    visual: "field",
    en: {
      eyebrow: "AIFIELD / Examples & validation",
      title: "Engineering evidence, with its context intact.",
      description:
        "Understand the photonic glucose design example, internal simulation comparisons and the limits of AIFIELD’s supplied evidence.",
      intro:
        "AIFIELD’s September 2026 material includes internal comparisons and a photonic glucose chip-design example. These illustrate design and simulation work. They are not external customer case studies or fabricated-device measurements.",
      sections: [
        {
          id: "worked-example",
          title: "A photonic glucose chip-design example",
          body: "The engineering question connects an optical sensing objective to a photonic design. AIFIELD contributes the design and simulation workflow; the intended measurement belongs to ArtiSense. A design output is useful evidence of engineering activity, while physical sensing remains a separate validation task.",
          link: "artisense-validation",
        },
        {
          id: "record",
          title: "Reading the evidence record",
          table: {
            headers: ["Evidence area", "Supplied context", "Boundary"],
            rows: [
              [
                "Worked design",
                "Photonic glucose chip-design example",
                "Design activity, not sensing validation",
              ],
              [
                "Classical simulation",
                "Internal comparisons described in September 2026",
                "Reference, conditions and misses need publication review",
              ],
              [
                "Assisted workflow",
                "Command-line and MCP interactions",
                "Partial assistance with human review",
              ],
              [
                "Neural prediction",
                "Research experiments with supplied boundary information",
                "Generalization and practical speed remain open",
              ],
            ],
          },
        },
        {
          id: "benchmarks",
          title: "A benchmark is more than a number",
          body: "A publishable comparison needs the reference tool or method, geometry, materials, boundary conditions, numerical settings, evaluation measure, runtime environment and date. It must include misses as well as successes. No unsupported accuracy or acceleration figure is added to this draft.",
        },
        {
          id: "next",
          title: "Make the next result reproducible",
          body: "A proposed next milestone is a reviewable demonstration and evidence package: design inputs, relevant settings, outputs and interpretation. The project team needs to confirm the scope and release permissions before those materials can be shared.",
          link: "contact",
          intent: "demo",
          project: "aifield",
        },
      ],
    },
    pl: {
      eyebrow: "AIFIELD / Przykłady i walidacja",
      title: "Dowody inżynieryjne w pełnym kontekście.",
      description:
        "Poznaj przykład projektu układu do pomiaru glukozy, wewnętrzne porównania symulacji i ograniczenia dostępnych dowodów AIFIELD.",
      intro:
        "Materiały AIFIELD z września 2026 obejmują porównania wewnętrzne i przykład projektu fotonicznego układu do pomiaru glukozy. Ilustrują prace projektowe i symulacyjne. Nie są studiami wdrożeń u klientów ani pomiarami na wykonanych układach.",
      sections: [
        {
          id: "worked-example",
          title: "Przykład fotonicznego układu do pomiaru glukozy",
          body: "Pytanie inżynieryjne łączy cel pomiaru optycznego z projektem fotonicznym. AIFIELD wnosi proces projektowania i symulacji, a zamierzony pomiar należy do ArtiSense. Wynik projektowy potwierdza pracę inżynieryjną, podczas gdy pomiar fizyczny pozostaje odrębnym zadaniem walidacyjnym.",
          link: "artisense-validation",
        },
        {
          id: "record",
          title: "Jak czytać dostępne dowody",
          table: {
            headers: ["Obszar dowodów", "Dostarczony kontekst", "Ograniczenie"],
            rows: [
              [
                "Przykład projektowy",
                "Fotoniczny układ do pomiaru glukozy",
                "Projektowanie, nie walidacja pomiarów",
              ],
              [
                "Symulacja klasyczna",
                "Porównania wewnętrzne opisane we wrześniu 2026",
                "Odniesienie, warunki i nieudane przypadki wymagają przeglądu",
              ],
              [
                "Proces wspomagany",
                "Interakcje przez wiersz poleceń i MCP",
                "Częściowa pomoc z kontrolą człowieka",
              ],
              [
                "Predykcja neuronowa",
                "Eksperymenty z dostarczoną informacją brzegową",
                "Generalizacja i praktyczna szybkość pozostają otwarte",
              ],
            ],
          },
        },
        {
          id: "benchmarks",
          title: "Benchmark to więcej niż liczba",
          body: "Porównanie do publikacji wymaga wskazania narzędzia lub metody odniesienia, geometrii, materiałów, warunków brzegowych, ustawień numerycznych, miary oceny, środowiska wykonania i daty. Powinno obejmować przypadki udane i nieudane. W tej wersji nie dodajemy nieudokumentowanych wartości dokładności ani przyspieszenia.",
        },
        {
          id: "next",
          title: "Powtarzalność kolejnego wyniku",
          body: "Proponowany następny etap to demonstracja i zestaw dowodów możliwych do oceny: dane projektu, istotne ustawienia, wyniki i interpretacja. Zespół musi potwierdzić zakres i prawa do udostępnienia materiałów.",
          link: "contact",
          intent: "demo",
          project: "aifield",
        },
      ],
    },
  },
};
