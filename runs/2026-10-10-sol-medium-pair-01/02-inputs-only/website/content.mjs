export const routes = {
  home: ['', ''], projects: ['projects', 'projekty'],
  artisense: ['projects/artisense', 'projekty/artisense'],
  'artisense-technology': ['projects/artisense/technology', 'projekty/artisense/technologia'],
  'artisense-applications': ['projects/artisense/applications', 'projekty/artisense/zastosowania'],
  'artisense-validation': ['projects/artisense/research-validation', 'projekty/artisense/badania-walidacja'],
  aifield: ['projects/aifield', 'projekty/aifield'],
  'aifield-design': ['projects/aifield/design-simulation', 'projekty/aifield/projektowanie-symulacja'],
  'aifield-ai': ['projects/aifield/ai-workflows', 'projekty/aifield/praca-z-ai'],
  'aifield-neural': ['projects/aifield/neural-field-research', 'projekty/aifield/badania-modeli-pola'],
  'aifield-validation': ['projects/aifield/examples-validation', 'projekty/aifield/przyklady-walidacja'],
  investors: ['investors', 'inwestorzy'], approach: ['approach', 'jak-pracujemy'],
  about: ['about', 'o-nas'], partnerships: ['partnerships', 'wspolpraca'],
  contact: ['contact', 'kontakt'], privacy: ['privacy', 'prywatnosc']
};
export const pathFor = (id, lang) => `/${lang}/${routes[id][lang === 'en' ? 0 : 1]}${id === 'home' ? '' : '/'}`;
const S = (title, body, points = []) => ({ title, body, points });
export const copy = {
  en: {
    common: {
      nav: { projects: 'Projects', investors: 'Investors', approach: 'Our approach', about: 'About', partnerships: 'Partnerships', contact: 'Contact' },
      explore: 'Explore project', evidence: 'Explore the evidence', investment: 'Discuss an investment', partnership: 'Discuss a partnership', demo: 'Request a demo',
      overview: 'Overview', status: 'Status', next: 'Next to explore', note: 'Evidence note', draft: 'Editorial draft · facts and release rights require review',
      allProjects: 'All projects', pageNotFound: 'This page could not be found.', backHome: 'Return home', menu: 'Menu', close: 'Close menu',
      footer: 'Artifactory explores photonic sensing and the tools used to design photonic systems.',
      contactLine: 'An investment or collaboration starts with a conversation.',
      process: 'Concept → model → design → validation',
      form: { type: 'Enquiry type', investment: 'Investment', partnership: 'Partnership', demo: 'AIFIELD demo', general: 'General', project: 'Project context', none: 'No project selected', name: 'Name', organization: 'Organization', email: 'Reply email', message: 'Message', send: 'Send enquiry', sending: 'Sending…', unavailable: 'Online submission is not yet connected. Please use the public email below.', error: 'We could not confirm delivery. Your message remains here; please retry or use email.', success: 'Your enquiry was accepted by the configured receiver.', privacy: 'Please read how this form handles information.' }
    },
    pages: {
      home: { label: 'Home', eyebrow: 'Artifactory / Company perspective', title: 'The next frontier is built at the intersection.', deck: 'We explore photonic sensing and the engineering tools that can move ideas toward testable systems. Meet the two projects shaping Artifactory’s direction.', sections: [
        S('One company. Two connected lines of work.', 'ArtiSense investigates a miniaturized chemical-sensing concept. AIFIELD develops tooling for photonic design and simulation. A design example can connect the projects; progress in one does not validate the other.'),
        S('The questions worth asking', 'For an investor, the opportunity depends on more than an ambitious idea.', ['What has been designed or simulated?', 'What remains to be demonstrated in hardware or use?', 'Which milestones and resources would move each project forward?'])
      ], links: ['investors', 'projects', 'partnerships'] },
      projects: { label: 'Projects', eyebrow: 'Portfolio / 02 projects', title: 'Two projects. Different evidence. A shared direction.', deck: 'Explore the sensing proposition and the photonic engineering workflow separately, then see where their work intersects.', sections: [
        S('ArtiSense', 'A research-stage concept for photonic chemical sensing. The intended measurement context includes non-invasive approaches; validated performance has not been established in the supplied material.', ['Focus: sensing architecture and interpretation', 'Evidence in handoff: optical feasibility and design work', 'Next: confirm component status and validation plan']),
        S('AIFIELD', 'Photonic CAD and simulation tooling described in September 2026 material, alongside distinct neural optical-field research. Current demonstrable capabilities and access require confirmation.', ['Focus: design, simulation and review', 'Evidence in handoff: internal workflows and comparisons', 'Next: verify current tool state and benchmark scope'])
      ], links: ['artisense', 'aifield', 'investors'] },
      artisense: { label: 'ArtiSense', eyebrow: 'Project 01 / Sensing', title: 'Sensing, brought into sharper focus.', deck: 'ArtiSense is a proposed miniaturized chemical-sensing system using photonics and signal interpretation. Its intended applications are compelling; the evidence boundary matters just as much.', sections: [
        S('The intended system', 'The described architecture follows light interacting with a sample, detection of an optical response, and interpretation against references. Proposed processing, software and connectivity components still need an agreed implementation status.'),
        S('What the material supports', 'Background research discusses optical feasibility and photonic glucose chip design. It does not establish a fabricated device, validated glucose accuracy or a clinical outcome.'),
        S('What needs to happen next', 'The project needs confirmed component status, a reviewed system diagram, calibrated test conditions and a staged validation plan before stronger performance or use claims can be made.')
      ], links: ['artisense-technology', 'artisense-applications', 'artisense-validation', 'investors'] },
      'artisense-technology': { label: 'Technology', eyebrow: 'ArtiSense / System architecture', title: 'From optical response to an interpretable signal.', deck: 'A clear account of the proposed sensing path, with design intentions separated from demonstrated components.', sections: [
        S('01 / Illuminate and interact', 'The concept uses visible or infrared light interacting with a sample. Wavelength selection, source geometry and sample conditions influence the optical response; public design parameters are not yet confirmed.'),
        S('02 / Detect and compare', 'A detector would capture a response for comparison with references. Useful interpretation depends on calibration, repeatability and control of environmental variation.'),
        S('03 / Interpret and connect', 'The described architecture includes a proposed reprogrammable analog neuromorphic processor, supporting software and connectivity. Their implementation and integration status need technical review. This processor is distinct from AIFIELD’s neural optical-field research.')
      ], links: ['artisense-validation', 'artisense-applications', 'partnerships'] },
      'artisense-applications': { label: 'Applications', eyebrow: 'ArtiSense / Intended uses', title: 'A sensing ambition with real-world requirements.', deck: 'The research direction includes non-invasive chemical measurement and wearable form factors. These are intended contexts, not available medical products.', sections: [
        S('Glucose as a research example', 'Photonic glucose sensing is the most substantial application example in the supplied background. The work describes optical feasibility and chip design; clinical or analytical accuracy has not been demonstrated by that description.'),
        S('From concept to use', 'A wearable measurement system would need a stable optical interface, calibration across people and conditions, reliable interpretation, safe integration and appropriate validation. Each step changes the strength of any eventual claim.'),
        S('Scope for collaboration', 'Measurement expertise, optical engineering and test design could help define the path from research concept to reproducible evidence. Specific opportunities should be confirmed with the team.')
      ], links: ['artisense-technology', 'artisense-validation', 'partnerships'] },
      'artisense-validation': { label: 'Research and Validation', eyebrow: 'ArtiSense / Evidence', title: 'What is known. What still needs a test.', deck: 'A dated research summary can inform questions, but does not substitute for approved methods, results and current project status.', sections: [
        S('Research and design', 'The handoff describes optical feasibility work and photonic chip design. No approved figure set, measurement conditions or current result table was supplied for publication.'),
        S('Validation sequence', 'A responsible path would distinguish modeled behavior, fabricated-device testing, calibrated measurements and any later human-use validation. These are different thresholds of evidence, not interchangeable milestones.'),
        S('Open questions', 'Current component maturity, repeatability, reference methods, measurement conditions and the next experiment require confirmation from the technical owner. Until then, performance figures are intentionally absent.')
      ], links: ['artisense-technology', 'investors', 'partnerships'] },
      aifield: { label: 'AIFIELD', eyebrow: 'Project 02 / Engineering software', title: 'A more legible path from photonic idea to design.', deck: 'AIFIELD is described as photonic CAD and simulation tooling, with a separate neural field research direction. The September 2026 material is a dated snapshot, not a statement of present availability.', sections: [
        S('Design and simulation', 'The reviewed material covers geometry, layer and process handling alongside mode, circuit, field and thermal simulation work. Current supported inputs, outputs and constraints need a current product review.'),
        S('Assistance with human control', 'Command-line and MCP workflows explored agent-assisted engineering through proposals, application and review. The material does not support autonomous end-to-end chip design.'),
        S('Research beyond classical solvers', 'Neural optical-field prediction is a distinct research track. Its reported experiments have conditions and open questions; they should not be presented as an established replacement for classical simulation.')
      ], links: ['aifield-design', 'aifield-ai', 'aifield-neural', 'aifield-validation', 'contact'] },
      'aifield-design': { label: 'Design and Simulation', eyebrow: 'AIFIELD / Engineering workflow', title: 'Structure the design. Inspect the result.', deck: 'The project material describes an engineering workflow across design setup and classical simulation. Specific present-day support awaits verification.', sections: [
        S('Set up a photonic design', 'The September 2026 overview describes design geometry together with layer and process information. A current, reviewed capability matrix is needed before naming supported formats or fabrication paths.'),
        S('Explore behavior', 'Mode, circuit, field and thermal simulation work appears in the supplied material. Solver configuration, supported domains, accuracy and performance depend on the problem and must be attached to any quantitative claim.'),
        S('Review before release', 'Simulation output can guide design decisions. It is not a measurement on a fabricated chip. Approved interface captures and a worked example would make this workflow more concrete.')
      ], links: ['aifield-validation', 'aifield-ai', 'contact'] },
      'aifield-ai': { label: 'AI Workflows', eyebrow: 'AIFIELD / Assisted engineering', title: 'A proposal is a starting point. Review is part of the workflow.', deck: 'Agent-assisted design can help orchestrate engineering tasks, while a person remains responsible for applying and checking changes.', sections: [
        S('Instruction to proposal', 'The reviewed command-line and MCP material explores actions an assistant can propose in a photonic workflow. Which actions are available today requires confirmation.'),
        S('Review to execution', 'The described flow includes human application and inspection of results, with partial automation. It does not substantiate a fully autonomous design loop.'),
        S('Data boundary', 'A local solver and an external assistant may handle different information. The actual data flow, retention and service boundary need review before any confidentiality promise is published.')
      ], links: ['aifield-design', 'aifield-validation', 'contact'] },
      'aifield-neural': { label: 'Neural Field Research', eyebrow: 'AIFIELD / Research track', title: 'Exploring learned optical-field prediction.', deck: 'This is research into neural prediction of optical fields, separate from the classical design and simulation functions described for AIFIELD.', sections: [
        S('The research question', 'Can a learned model help predict optical fields under useful engineering conditions? The reviewed experiments use supplied boundary information; the result is conditional on that input.'),
        S('What remains unresolved', 'From-scratch prediction, larger stitched domains, generalization and practical speed advantage remain research questions. Public figures need their methods, comparison baselines and limitations.'),
        S('A measured next step', 'A reviewed experiment record would clarify test cases, reference solver, error measure and conditions before this work is characterized as a usable engineering capability.')
      ], links: ['aifield-design', 'aifield-validation', 'investors'] },
      'aifield-validation': { label: 'Examples and Validation', eyebrow: 'AIFIELD / Evidence', title: 'Examples need provenance to mean something.', deck: 'The supplied material includes internal comparisons and a photonic glucose chip-design example. Neither is evidence of fabricated-chip sensing performance.', sections: [
        S('A sensing-design example', 'A photonic glucose design example connects AIFIELD’s engineering work to ArtiSense’s measurement objective. The design output belongs to the tooling story; it does not validate the sensing outcome.'),
        S('How to read comparisons', 'Benchmarks should state the reference tool, test conditions, successful and missed cases, date and interpretation. These details were not supplied as publishable tables in this handoff.'),
        S('What comes next', 'Approved interface screenshots, worked outputs and reviewed comparison data would turn this page into an auditable evidence record. Until then, no numerical performance claim is made.')
      ], links: ['aifield-design', 'aifield-neural', 'artisense-validation', 'investors'] },
      investors: { label: 'Investors', eyebrow: 'Company / Investment conversation', title: 'Invest in the questions we are working to answer.', deck: 'Artifactory’s company-level opportunity connects a sensing ambition with the tools for photonic engineering. An informed conversation starts with the stage, evidence and remaining work of each project.', sections: [
        S('The company proposition', 'ArtiSense and AIFIELD address different parts of a possible photonic development chain. Their relationship is a useful design narrative, while shared ownership, commercial model and defensibility need company confirmation.'),
        S('Evidence before extrapolation', 'The material supports discussion of sensing feasibility and design work, software workflows, internal simulation comparisons and neural-field research. It does not establish clinical validation, revenue, committed pilots or a current company funding round.'),
        S('A conversation about milestones', 'Funding amount, instrument, capital use, team, commercial path and approved materials have not been supplied. Contact Artifactory to request the current company information and discuss what evidence the next milestones require.')
      ], links: ['artisense-validation', 'aifield-validation', 'about', 'contact'] },
      approach: { label: 'Our Approach', eyebrow: 'Method / From question to evidence', title: 'Make the next claim earn its place.', deck: 'A useful development story identifies the problem, models a possible answer and tests the assumptions that matter. This is the method proposed for describing the work, pending team review.', sections: [
        S('Define the question', 'State the intended user, measurement or engineering task and the conditions under which a solution would matter.'),
        S('Model and design', 'Use photonic design and simulation to explore behavior and expose choices. Simulated behavior remains a model result, even when it informs a physical design.'),
        S('Build the evidence', 'A concept, a simulation, a prototype measurement and validation in intended use answer progressively different questions. The project pages identify where this distinction is material.')
      ], links: ['artisense-validation', 'aifield-validation', 'projects'] },
      about: { label: 'About', eyebrow: 'Company / Artifactory', title: 'A company exploring what photonics can make possible.', deck: 'Artifactory is the company presented behind ArtiSense and AIFIELD. The website centers these two projects and the evidence needed to advance them.', sections: [
        S('Where we focus', 'ArtiSense investigates a photonic sensing system. AIFIELD explores photonic design and simulation tooling. The company story is strongest when each project is presented at its actual stage.'),
        S('People and company details', 'A current public roster, roles, biographies, legal identity and approved portraits were not included in this handoff. These details should be added after company review; project-level founder references cannot establish the whole company structure.'),
        S('Start a conversation', 'Investors and prospective collaborators can contact Artifactory through the public email while form delivery and ownership are being configured.')
      ], links: ['investors', 'approach', 'partnerships', 'contact'] },
      partnerships: { label: 'Partnerships', eyebrow: 'Collaboration / Areas to explore', title: 'Progress takes the right questions—and the right collaborators.', deck: 'These are potential collaboration directions derived from the two projects. Specific active opportunities and named relationships need confirmation.', sections: [
        S('Sensing and measurement', 'Optical measurement expertise could help define repeatable experiments, calibration methods and the evidence needed for ArtiSense’s intended applications.'),
        S('Fabrication and testing', 'Photonic component and prototype work could clarify which modeled behaviors survive implementation and controlled measurement.'),
        S('Engineering-tool evaluation', 'Design partners could help assess AIFIELD workflows and compare simulation outputs against well-defined reference tasks. No current partnership or pilot is implied here.')
      ], links: ['artisense', 'aifield', 'contact'] },
      contact: { label: 'Contact', eyebrow: 'Enquiries / Artifactory', title: 'Tell us what you would like to explore.', deck: 'For investment, collaboration or AIFIELD demonstration questions, use the public email below. The form becomes available when a receiving service and data handling are confirmed.', sections: [], links: ['privacy', 'projects'] },
      privacy: { label: 'Privacy', eyebrow: 'Information / This website', title: 'How this local website handles information.', deck: 'This implementation is a local draft. The following describes its actual behavior and the decisions required before public release.', sections: [
        S('Browsing', 'The site does not install analytics, advertising trackers or cookies. Its pages are generated as static HTML. A production host may create access logs under its own policy; hosting has not been selected.'),
        S('Contact form', 'The form validates data in the browser and sends it to this application’s server only when a receiving endpoint is configured. Without one, it does not submit personal data. Once configured, the server forwards name, organization, reply email, enquiry type, project context and message to the endpoint selected by the operator; it does not store them in a database.'),
        S('Email and operator', 'Email sent to info@artifactory.tech is handled outside this website. The receiving operator, provider, location, retention, deletion process and final legal notice need confirmation before production use.')
      ], links: ['contact'] }
    }
  },
  pl: {
    common: {
      nav: { projects: 'Projekty', investors: 'Dla inwestorów', approach: 'Jak pracujemy', about: 'O nas', partnerships: 'Współpraca', contact: 'Kontakt' },
      explore: 'Poznaj projekt', evidence: 'Sprawdź podstawy', investment: 'Porozmawiajmy o inwestycji', partnership: 'Porozmawiajmy o współpracy', demo: 'Poproś o demo',
      overview: 'Przegląd', status: 'Status', next: 'Odkryj dalej', note: 'O dowodach', draft: 'Wersja redakcyjna · fakty i prawa do publikacji wymagają weryfikacji',
      allProjects: 'Wszystkie projekty', pageNotFound: 'Nie znaleziono tej strony.', backHome: 'Wróć na stronę główną', menu: 'Menu', close: 'Zamknij menu',
      footer: 'Artifactory bada sensorykę fotoniczną i narzędzia do projektowania układów fotonicznych.',
      contactLine: 'Rozmowa może być początkiem inwestycji lub współpracy.',
      process: 'Koncepcja → model → projekt → walidacja',
      form: { type: 'Rodzaj zapytania', investment: 'Inwestycja', partnership: 'Współpraca', demo: 'Demo AIFIELD', general: 'Inne', project: 'Projekt', none: 'Bez wyboru projektu', name: 'Imię i nazwisko', organization: 'Organizacja', email: 'Adres e-mail do odpowiedzi', message: 'Wiadomość', send: 'Wyślij zapytanie', sending: 'Wysyłanie…', unavailable: 'Formularz nie jest jeszcze połączony z odbiorcą. Skorzystaj z publicznego adresu e-mail poniżej.', error: 'Nie mogliśmy potwierdzić dostarczenia. Wiadomość pozostała w formularzu; spróbuj ponownie lub wyślij e-mail.', success: 'Skonfigurowany odbiorca przyjął zapytanie.', privacy: 'Sprawdź, jak formularz przetwarza dane.' }
    },
    pages: {
      home: { label: 'Strona główna', eyebrow: 'Artifactory / Perspektywa firmy', title: 'Nowe możliwości powstają na styku dziedzin.', deck: 'Badamy sensorykę fotoniczną i narzędzia inżynierskie, które mogą pomóc przejść od pomysłu do rozwiązania możliwego do przetestowania. Poznaj dwa projekty wyznaczające kierunek Artifactory.', sections: [
        S('Jedna firma. Dwa powiązane obszary.', 'ArtiSense bada koncepcję zminiaturyzowanego sensora chemicznego. AIFIELD rozwija narzędzia do projektowania i symulacji fotonicznej. Przykład projektowy może łączyć oba przedsięwzięcia, ale postęp jednego nie dowodzi skuteczności drugiego.'),
        S('Pytania, które warto zadać', 'Dla inwestora szansa oznacza więcej niż ambitny pomysł.', ['Co zostało zaprojektowane lub zasymulowane?', 'Co należy jeszcze wykazać w sprzęcie lub praktycznym użyciu?', 'Jakie etapy i zasoby pozwolą rozwijać oba projekty?'])
      ], links: ['investors', 'projects', 'partnerships'] },
      projects: { label: 'Projekty', eyebrow: 'Portfolio / 02 projekty', title: 'Dwa projekty. Różne dowody. Wspólny kierunek.', deck: 'Poznaj osobno koncepcję sensora i narzędzia inżynierii fotonicznej, a potem zobacz, gdzie te prace się spotykają.', sections: [
        S('ArtiSense', 'Koncepcja fotonicznego sensora chemicznego na etapie badań. Przewidywane zastosowania obejmują pomiar nieinwazyjny; przekazane materiały nie potwierdzają zwalidowanych parametrów.', ['Obszar: architektura sensora i interpretacja sygnału', 'Materiały: badania wykonalności optycznej i projekt', 'Następny krok: potwierdzenie stanu komponentów i planu walidacji']),
        S('AIFIELD', 'Narzędzia CAD i symulacji fotonicznej opisane w materiałach z września 2026 roku, wraz z odrębnymi badaniami nad neuronowym przewidywaniem pola. Obecne możliwości i dostęp wymagają potwierdzenia.', ['Obszar: projektowanie, symulacja i ocena', 'Materiały: wewnętrzne przepływy pracy i porównania', 'Następny krok: weryfikacja aktualnego narzędzia i zakresu testów'])
      ], links: ['artisense', 'aifield', 'investors'] },
      artisense: { label: 'ArtiSense', eyebrow: 'Projekt 01 / Sensoryka', title: 'Sensoryka widziana wyraźniej.', deck: 'ArtiSense to proponowany zminiaturyzowany system wykrywania substancji chemicznych z użyciem fotoniki i interpretacji sygnału. Zamierzone zastosowania są obiecujące, lecz granice dostępnych dowodów są równie ważne.', sections: [
        S('Planowany system', 'Opisana architektura obejmuje oddziaływanie światła z próbką, wykrycie odpowiedzi optycznej i interpretację względem wartości odniesienia. Status proponowanych elementów przetwarzania, oprogramowania i łączności wymaga uzgodnienia.'),
        S('Co wynika z materiałów', 'Materiały opisują badania wykonalności optycznej i projekt fotonicznego układu do badań glukozy. Nie dowodzą wytworzenia urządzenia, zwalidowanej dokładności pomiaru glukozy ani wyników klinicznych.'),
        S('Kolejny krok', 'Potrzebne są: potwierdzony status komponentów, zweryfikowany schemat systemu, warunki kalibracji i etapowy plan walidacji. Dopiero wtedy można formułować silniejsze twierdzenia.')
      ], links: ['artisense-technology', 'artisense-applications', 'artisense-validation', 'investors'] },
      'artisense-technology': { label: 'Technologia', eyebrow: 'ArtiSense / Architektura systemu', title: 'Od odpowiedzi optycznej do interpretacji sygnału.', deck: 'Opis planowanego toru pomiarowego, który odróżnia zamierzenia projektowe od potwierdzonych elementów.', sections: [
        S('01 / Oświetlenie i oddziaływanie', 'Koncepcja zakłada oddziaływanie światła widzialnego lub podczerwonego z próbką. Długość fali, geometria źródła i warunki próbki wpływają na odpowiedź; publiczne parametry projektu nie zostały potwierdzone.'),
        S('02 / Detekcja i porównanie', 'Detektor miałby rejestrować odpowiedź porównywaną z odniesieniem. Wiarygodna interpretacja wymaga kalibracji, powtarzalności i kontroli zmienności otoczenia.'),
        S('03 / Interpretacja i łączność', 'Opisana architektura obejmuje proponowany rekonfigurowalny analogowy procesor neuromorficzny, oprogramowanie i łączność. Status ich realizacji i integracji wymaga przeglądu technicznego. Procesor ten nie jest tym samym co badania AIFIELD nad neuronowymi modelami pola.')
      ], links: ['artisense-validation', 'artisense-applications', 'partnerships'] },
      'artisense-applications': { label: 'Zastosowania', eyebrow: 'ArtiSense / Zamierzone użycie', title: 'Ambicja pomiarowa z konkretnymi wymaganiami.', deck: 'Kierunek badań obejmuje nieinwazyjny pomiar chemiczny i urządzenia ubieralne. To planowane zastosowania, nie dostępne wyroby medyczne.', sections: [
        S('Glukoza jako przykład badań', 'Fotoniczny pomiar glukozy jest najpełniej opisanym przykładem. Materiały dotyczą wykonalności optycznej i projektu układu; nie potwierdzają dokładności analitycznej ani klinicznej.'),
        S('Od koncepcji do użycia', 'System ubieralny wymagałby stabilnego toru optycznego, kalibracji w różnych warunkach i u różnych osób, niezawodnej interpretacji, bezpiecznej integracji oraz odpowiedniej walidacji.'),
        S('Możliwości współpracy', 'Eksperci od pomiarów, optyki i planowania testów mogliby pomóc wyznaczyć drogę od koncepcji do powtarzalnych dowodów. Konkretne potrzeby należy potwierdzić z zespołem.')
      ], links: ['artisense-technology', 'artisense-validation', 'partnerships'] },
      'artisense-validation': { label: 'Badania i walidacja', eyebrow: 'ArtiSense / Dowody', title: 'Co wiadomo. Co nadal wymaga testu.', deck: 'Datowany opis badań pomaga sformułować pytania, ale nie zastępuje zatwierdzonych metod, wyników i aktualnego statusu.', sections: [
        S('Badania i projekt', 'Pakiet opisuje badania wykonalności optycznej i projekt układu fotonicznego. Nie zawiera dopuszczonych do publikacji wykresów, warunków pomiarów ani aktualnej tabeli wyników.'),
        S('Kolejność walidacji', 'Odpowiedzialny plan rozróżnia zachowanie modelu, badanie wytworzonego układu, skalibrowane pomiary i ewentualną późniejszą walidację w zamierzonym użyciu. To różne poziomy dowodów.'),
        S('Pytania otwarte', 'Aktualna dojrzałość komponentów, powtarzalność, metody odniesienia, warunki pomiarów i następny eksperyment wymagają potwierdzenia przez osobę odpowiedzialną technicznie.')
      ], links: ['artisense-technology', 'investors', 'partnerships'] },
      aifield: { label: 'AIFIELD', eyebrow: 'Projekt 02 / Oprogramowanie inżynierskie', title: 'Czytelniejsza droga od pomysłu do projektu fotonicznego.', deck: 'AIFIELD jest opisywany jako narzędzie CAD i symulacji fotonicznej z osobnym nurtem badań nad polem optycznym. Materiał z września 2026 roku jest datowanym obrazem prac, nie deklaracją obecnej dostępności.', sections: [
        S('Projekt i symulacja', 'Materiały obejmują geometrię, warstwy i procesy oraz prace nad symulacjami modów, obwodów, pola i temperatury. Aktualne wejścia, wyjścia i ograniczenia wymagają przeglądu produktu.'),
        S('Wsparcie pod kontrolą człowieka', 'Przepływy pracy w wierszu poleceń i przez MCP badały wsparcie inżyniera przez agenta: propozycje, zastosowanie i ocenę. Nie potwierdzają autonomicznego projektowania układu od początku do końca.'),
        S('Badania poza klasycznymi solverami', 'Neuronowe przewidywanie pola optycznego to odrębny kierunek badań. Opisane eksperymenty miały określone warunki i pytania otwarte; nie należy przedstawiać ich jako gotowego zamiennika klasycznej symulacji.')
      ], links: ['aifield-design', 'aifield-ai', 'aifield-neural', 'aifield-validation', 'contact'] },
      'aifield-design': { label: 'Projektowanie i symulacja', eyebrow: 'AIFIELD / Przepływ inżynierski', title: 'Zbuduj projekt. Oceń wynik.', deck: 'Materiały opisują pracę od przygotowania projektu do klasycznej symulacji. Obecnie obsługiwane funkcje wymagają weryfikacji.', sections: [
        S('Przygotowanie projektu', 'Opis z września 2026 roku obejmuje geometrię wraz z danymi o warstwach i procesie. Przed wskazaniem formatów lub ścieżek wytwarzania potrzebna jest aktualna macierz możliwości.'),
        S('Analiza zachowania', 'W przekazanych materiałach występują prace nad symulacjami modów, obwodów, pola i temperatury. Konfiguracja solvera, zakres, dokładność i wydajność zależą od zadania.'),
        S('Ocena przed wdrożeniem', 'Wynik symulacji może pomagać w decyzjach projektowych. Nie jest pomiarem wytworzonego układu. Zatwierdzone zrzuty interfejsu i przykład uczyniłyby ten opis bardziej konkretnym.')
      ], links: ['aifield-validation', 'aifield-ai', 'contact'] },
      'aifield-ai': { label: 'Praca z AI', eyebrow: 'AIFIELD / Wspomagana inżynieria', title: 'Propozycja jest początkiem. Ocena należy do procesu.', deck: 'Agent może pomagać organizować zadania inżynierskie, a człowiek pozostaje odpowiedzialny za zastosowanie zmian i sprawdzenie wyników.', sections: [
        S('Od polecenia do propozycji', 'Materiały o wierszu poleceń i MCP opisują działania, które asystent może proponować w pracy fotonicznej. Dostępne dziś działania wymagają potwierdzenia.'),
        S('Od oceny do wykonania', 'Opisany przepływ obejmuje zastosowanie zmian przez człowieka i ocenę wyników, przy częściowej automatyzacji. Nie potwierdza w pełni autonomicznego projektowania.'),
        S('Granica przepływu danych', 'Lokalny solver i zewnętrzny asystent mogą przetwarzać różne informacje. Faktyczny przepływ, okres przechowywania i zakres usług wymagają przeglądu przed deklaracjami poufności.')
      ], links: ['aifield-design', 'aifield-validation', 'contact'] },
      'aifield-neural': { label: 'Badania neuronowych modeli pola', eyebrow: 'AIFIELD / Nurt badawczy', title: 'Badania nad przewidywaniem pola optycznego.', deck: 'To badania nad neuronowym przewidywaniem pola, odrębne od opisanych klasycznych funkcji projektowych i symulacyjnych AIFIELD.', sections: [
        S('Pytanie badawcze', 'Czy model uczony może pomagać w przewidywaniu pola optycznego w użytecznych warunkach inżynierskich? Opisane eksperymenty korzystają z zadanych warunków brzegowych; od nich zależy wynik.'),
        S('Co pozostaje otwarte', 'Przewidywanie od podstaw, większe łączone obszary, uogólnianie i praktyczna przewaga szybkości pozostają pytaniami badawczymi. Publiczne wykresy wymagają metod, punktu odniesienia i ograniczeń.'),
        S('Następny etap', 'Zweryfikowany zapis eksperymentu powinien określać przypadki testowe, solver odniesienia, miarę błędu i warunki, zanim pracę będzie można nazwać użyteczną funkcją inżynierską.')
      ], links: ['aifield-design', 'aifield-validation', 'investors'] },
      'aifield-validation': { label: 'Przykłady i walidacja', eyebrow: 'AIFIELD / Dowody', title: 'Przykład ma wartość, gdy znamy jego pochodzenie.', deck: 'Materiały zawierają wewnętrzne porównania i przykład projektu fotonicznego układu do badań glukozy. Żaden z nich nie dowodzi parametrów pomiarowych wytworzonego układu.', sections: [
        S('Przykład projektu sensora', 'Fotoniczny przykład glukozowy łączy pracę inżynierską AIFIELD z celem pomiarowym ArtiSense. Wynik projektu należy do historii narzędzia; nie waliduje pomiaru.'),
        S('Jak czytać porównania', 'Testy porównawcze powinny wskazywać narzędzie odniesienia, warunki, przypadki udane i nieudane, datę oraz interpretację. W tym pakiecie nie przekazano takich tabel zatwierdzonych do publikacji.'),
        S('Dalszy krok', 'Zatwierdzone zrzuty interfejsu, wyniki przykładów i sprawdzone dane porównawcze pozwoliłyby stworzyć weryfikowalny opis dowodów. Na razie nie podajemy wartości wydajności.')
      ], links: ['aifield-design', 'aifield-neural', 'artisense-validation', 'investors'] },
      investors: { label: 'Dla inwestorów', eyebrow: 'Firma / Rozmowa o inwestycji', title: 'Inwestycja zaczyna się od właściwych pytań.', deck: 'Możliwość inwestycji w Artifactory jako firmę łączy ambicję sensoryczną z narzędziami inżynierii fotonicznej. Rzetelna rozmowa uwzględnia etap, dowody i pozostałą pracę w każdym projekcie.', sections: [
        S('Propozycja firmy', 'ArtiSense i AIFIELD dotyczą różnych ogniw możliwego procesu rozwoju fotoniki. Ich relacja pomaga wyjaśnić kierunek; wspólne prawa własności, model biznesowy i przewaga wymagają potwierdzenia przez firmę.'),
        S('Dowody bez nadinterpretacji', 'Materiały pozwalają rozmawiać o wykonalności i projekcie sensora, przepływach pracy oprogramowania, wewnętrznych porównaniach symulacji i badaniach neuronowych. Nie potwierdzają walidacji klinicznej, przychodów, uzgodnionych pilotaży ani aktualnej rundy finansowania.'),
        S('Rozmowa o etapach', 'Nie przekazano kwoty finansowania firmy, formy inwestycji, wykorzystania kapitału, składu zespołu, ścieżki komercyjnej ani zatwierdzonych materiałów. Skontaktuj się z Artifactory, aby omówić aktualne informacje i dowody potrzebne na kolejnych etapach.')
      ], links: ['artisense-validation', 'aifield-validation', 'about', 'contact'] },
      approach: { label: 'Jak pracujemy', eyebrow: 'Metoda / Od pytania do dowodu', title: 'Każde mocniejsze twierdzenie wymaga mocniejszego dowodu.', deck: 'Opis rozwoju zaczyna się od problemu, modeluje możliwą odpowiedź i sprawdza ważne założenia. To proponowany sposób przedstawienia prac, wymagający przeglądu zespołu.', sections: [
        S('Zdefiniuj pytanie', 'Określ odbiorcę, zadanie pomiarowe lub inżynierskie i warunki, w których rozwiązanie miałoby znaczenie.'),
        S('Modeluj i projektuj', 'Wykorzystuj projektowanie i symulację fotoniczną do badania zachowania i wyborów. Nawet jeśli wynik pomaga stworzyć układ fizyczny, pozostaje wynikiem modelu.'),
        S('Buduj dowody', 'Koncepcja, symulacja, pomiar prototypu i walidacja w zamierzonym użyciu odpowiadają na coraz inne pytania. Strony projektowe wskazują, gdzie to rozróżnienie jest szczególnie ważne.')
      ], links: ['artisense-validation', 'aifield-validation', 'projects'] },
      about: { label: 'O nas', eyebrow: 'Firma / Artifactory', title: 'Firma badająca możliwości fotoniki.', deck: 'Artifactory to firma przedstawiana jako podmiot stojący za ArtiSense i AIFIELD. Strona koncentruje się na tych dwóch projektach i dowodach potrzebnych do ich rozwoju.', sections: [
        S('Na czym się skupiamy', 'ArtiSense bada system sensora fotonicznego. AIFIELD rozwija narzędzia projektowania i symulacji fotonicznej. Historię firmy warto budować na rzeczywistym etapie każdego projektu.'),
        S('Ludzie i dane firmy', 'W pakiecie nie ma aktualnego publicznego składu zespołu, ról, biogramów, danych prawnych ani zatwierdzonych portretów. Informacje te należy dodać po weryfikacji; wzmianka o założycielu projektu nie określa struktury całej firmy.'),
        S('Porozmawiajmy', 'Inwestorzy i potencjalni współpracownicy mogą skorzystać z publicznego adresu e-mail, zanim zostanie skonfigurowane dostarczanie zapytań i wskazany odbiorca.')
      ], links: ['investors', 'approach', 'partnerships', 'contact'] },
      partnerships: { label: 'Współpraca', eyebrow: 'Możliwości / Obszary do omówienia', title: 'Postęp wymaga właściwych pytań i współpracowników.', deck: 'To możliwe kierunki współpracy wynikające z dwóch projektów. Konkretne aktywne potrzeby i nazwane relacje wymagają potwierdzenia.', sections: [
        S('Sensoryka i pomiary', 'Wiedza o pomiarach optycznych mogłaby pomóc zaplanować powtarzalne eksperymenty, kalibrację i dowody potrzebne do zamierzonych zastosowań ArtiSense.'),
        S('Wytwarzanie i testy', 'Prace nad komponentami fotonicznymi i prototypami mogłyby pokazać, które wyniki modeli utrzymują się po realizacji i kontrolowanym pomiarze.'),
        S('Ocena narzędzi inżynierskich', 'Partnerzy projektowi mogliby oceniać przepływy pracy AIFIELD i porównywać symulacje z dobrze zdefiniowanymi zadaniami odniesienia. Nie oznacza to istnienia pilotażu ani obecnej współpracy.')
      ], links: ['artisense', 'aifield', 'contact'] },
      contact: { label: 'Kontakt', eyebrow: 'Zapytania / Artifactory', title: 'Powiedz nam, co chcesz zbadać.', deck: 'W sprawach inwestycji, współpracy lub demonstracji AIFIELD skorzystaj z publicznego adresu e-mail. Formularz będzie dostępny po wskazaniu odbiorcy i ustaleniu zasad przetwarzania danych.', sections: [], links: ['privacy', 'projects'] },
      privacy: { label: 'Polityka prywatności', eyebrow: 'Informacje / Ta strona', title: 'Jak lokalna wersja strony przetwarza informacje.', deck: 'To lokalny szkic strony. Poniższy opis obejmuje faktyczne działanie i decyzje potrzebne przed publikacją.', sections: [
        S('Przeglądanie', 'Strona nie instaluje narzędzi analitycznych, śledzących reklam ani plików cookie. Strony są generowane jako statyczny HTML. Przyszły dostawca hostingu może tworzyć logi dostępu według własnych zasad; hostingu jeszcze nie wybrano.'),
        S('Formularz kontaktowy', 'Formularz sprawdza dane w przeglądarce i przesyła je do serwera tej aplikacji tylko wtedy, gdy skonfigurowano odbiorcę. Bez niego nie wysyła danych osobowych. Po konfiguracji serwer przekazuje imię i nazwisko, organizację, e-mail, rodzaj zapytania, projekt i wiadomość do wybranego przez operatora odbiorcy; nie przechowuje ich w bazie.'),
        S('E-mail i operator', 'Wiadomości wysyłane na info@artifactory.tech są obsługiwane poza tą stroną. Odbiorca, dostawca, lokalizacja, okres przechowywania, procedura usuwania i końcowa informacja prawna wymagają potwierdzenia przed uruchomieniem produkcyjnym.')
      ], links: ['contact'] }
    }
  }
};
