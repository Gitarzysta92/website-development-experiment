let nextId = 0;
export const arrow = (direction = "right") =>
  `<svg class="icon arrow-${direction}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export const mark = () =>
  `<svg class="brand-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="m20 3 16 9v16l-16 9L4 28V12L20 3Z" stroke="currentColor" stroke-width="2.4"/><path d="m20 10 10 18H10l10-18Z" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M15 22h10" stroke="currentColor" stroke-width="2.4"/></svg>`;

export function lightVisual(type = "hero", lang = "en") {
  const id = `light-${++nextId}`;
  const pl = lang === "pl";
  const title =
    type === "field"
      ? pl
        ? "Koncepcyjne pole optyczne"
        : "Conceptual optical field"
      : pl
        ? "Koncepcyjna ilustracja fotoniki"
        : "Conceptual photonics illustration";
  const defs = `<defs>
    <linearGradient id="${id}-line" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#087F8C"/><stop offset=".48" stop-color="#37b8b0"/><stop offset="1" stop-color="#662483"/></linearGradient>
    <linearGradient id="${id}-surface" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".94"/><stop offset="1" stop-color="#cfdee1" stop-opacity=".8"/></linearGradient>
    <linearGradient id="${id}-edge"><stop stop-color="#662483"/><stop offset="1" stop-color="#087F8C"/></linearGradient>
    <radialGradient id="${id}-glow"><stop stop-color="#a8dad7" stop-opacity=".65"/><stop offset="1" stop-color="#e9f3f2" stop-opacity="0"/></radialGradient>
    <radialGradient id="${id}-beam"><stop stop-color="#bffbf0"/><stop offset=".2" stop-color="#31c7b6"/><stop offset=".6" stop-color="#087f8c" stop-opacity=".35"/><stop offset="1" stop-color="#087f8c" stop-opacity="0"/></radialGradient>
    <pattern id="${id}-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0v32" fill="none" stroke="${type === "field" ? "#95c5c2" : "#087F8C"}" stroke-opacity=".09" stroke-width=".6"/></pattern>
    <filter id="${id}-shadow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="15"/></filter>
  </defs>`;
  if (type === "field") {
    const bands = Array.from({ length: 28 }, (_, i) => {
      const y = 250 + (i - 14) * 4.7;
      return `<path d="M-20 ${y + 50}C110 ${y + 50} 140 ${y - 6} 230 ${y - 6}S360 ${y + 18} 415 ${y + 18} 485 ${y - 70} 650 ${y - 70}" fill="none" stroke="url(#${id}-line)" stroke-width="1.2" opacity="${0.2 + (14 - Math.abs(i - 14)) / 25}"/>`;
    }).join("");
    return `<svg viewBox="0 0 640 450" preserveAspectRatio="xMidYMid slice" role="img" aria-labelledby="${id}-title" class="technical-svg field-svg"><title id="${id}-title">${title}</title>${defs}<rect width="640" height="450" fill="#202438"/><rect width="640" height="450" fill="url(#${id}-grid)"/><ellipse cx="330" cy="245" rx="220" ry="110" fill="url(#${id}-beam)" opacity=".35"/>${bands}<path d="M-20 324h145q45 0 75-36t85-36h92q55 0 78-55t78-55h107M-20 344h153q48 0 79-36t83-36h82q68 0 97-67t68-43h98" fill="none" stroke="#d7f7ef" stroke-opacity=".8" stroke-width="2"/><path d="M270 210h130v65H270z" fill="url(#${id}-beam)" opacity=".8"/><path d="M60 90h35m-17-17v34M545 345h35m-17-17v34" stroke="#80bbb5" opacity=".7"/><g fill="#b2c8cd" font-family="monospace" font-size="10" letter-spacing="2"><text x="35" y="35">${pl ? "POLE OPTYCZNE" : "OPTICAL FIELD"}</text><text x="35" y="420">${pl ? "ILUSTRACJA KONCEPCYJNA" : "CONCEPTUAL ILLUSTRATION"}</text><text x="525" y="35">AIFIELD</text></g></svg>`;
  }
  if (type === "workflow") {
    return `<svg viewBox="0 0 640 350" role="img" aria-labelledby="${id}-title" class="technical-svg"><title id="${id}-title">${pl ? "Koncepcyjny proces wspomagania z kontrolą człowieka" : "Conceptual assisted workflow with human review"}</title>${defs}<rect width="640" height="350" fill="#f2f7f7"/><rect width="640" height="350" fill="url(#${id}-grid)"/><path d="M90 170h460M180 180v95h290v-95" stroke="url(#${id}-edge)" stroke-width="1.5" fill="none" stroke-dasharray="5 5"/>${["01", "02", "03", "04"].map((n, i) => `<rect x="${40 + i * 152}" y="116" width="104" height="104" rx="20" fill="${i === 2 ? "#662483" : "white"}" stroke="${i === 2 ? "#662483" : "#a7c9c9"}"/><text x="${92 + i * 152}" y="160" text-anchor="middle" fill="${i === 2 ? "white" : "#087f8c"}" font-family="monospace" font-size="18">${n}</text><text x="${92 + i * 152}" y="191" text-anchor="middle" fill="${i === 2 ? "white" : "#202438"}" font-family="sans-serif" font-size="13">${(pl ? ["Polecenie", "Propozycja", "Kontrola", "Analiza"] : ["Instruction", "Proposal", "Review", "Inspect"])[i]}</text>`).join("")}<text x="320" y="303" text-anchor="middle" fill="#662483" font-family="monospace" font-size="11" letter-spacing="2">${pl ? "CZŁOWIEK KONTROLUJE ZASTOSOWANIE" : "HUMAN-CONTROLLED APPLICATION"}</text></svg>`;
  }
  const contourLines = Array.from({ length: 46 }, (_, i) => {
    const points = [];
    for (let j = 0; j <= 100; j++) {
      const t = (j / 100) * Math.PI * 2;
      const phi = (i / 46) * Math.PI;
      const x = Math.cos(t) * (165 + 21 * Math.cos(phi));
      const y = Math.sin(t) * (122 + 39 * Math.sin(phi));
      const z = Math.sin(phi) * Math.cos(t) * 93;
      points.push(
        `${(350 + x * 0.87 - y * 0.5).toFixed(1)},${(228 + x * 0.42 + y * 0.55 + z).toFixed(1)}`,
      );
    }
    return `<path d="M${points.join("L")}Z" fill="none" stroke="url(#${id}-line)" opacity="${0.2 + (i / 46) * 0.48}" stroke-width=".8"/>`;
  }).join("");
  const chip = `<ellipse cx="335" cy="456" rx="175" ry="30" fill="#4d6470" opacity=".13" filter="url(#${id}-shadow)"/>
    <path d="m128 368 194-89 223 97-198 111Z" fill="#c1d3d9" opacity=".45" stroke="#adbec6"/>
    <path d="m128 344 194-89 223 97-198 111Z" fill="url(#${id}-surface)" stroke="#9bbec3"/>
    <path d="m128 338 194-89 223 97-198 111Z" fill="url(#${id}-surface)" stroke="#c4d4d9"/>
    <path d="m211 334 115-53 129 56-114 62Z" fill="#202438"/><path d="m211 327 115-53 129 56-114 62Z" fill="url(#${id}-edge)"/>
    <path d="m226 329 102-45 108 47-96 51Z" fill="#24283d"/><g fill="none" stroke="#93e5d8" stroke-width="1.1"><path d="m250 331 69-32 80 34-62 33-41-17 43-21 28 12-25 13-18-8"/><path d="m272 329 52-25 58 26M256 340l71 31 83-39"/></g>
    ${Array.from({ length: 10 }, (_, i) => `<path d="m${151 + i * 10} ${331 - i * 4.5} 36 16M${374 + i * 11} ${379 - i * 6} 30 13" stroke="#8babaf" stroke-width="2"/>`).join("")}`;
  return `<svg viewBox="0 0 640 ${type === "hero" ? "580" : "500"}" role="img" aria-labelledby="${id}-title" class="technical-svg sense-svg"><title id="${id}-title">${title}</title>${defs}<rect width="640" height="580" fill="url(#${id}-grid)"/><ellipse cx="345" cy="260" rx="280" ry="230" fill="url(#${id}-glow)"/>${chip}<g class="light-contours">${contourLines}</g><path d="M57 380h82M514 167h66M350 55v38" stroke="#759d9f" stroke-width=".8"/><circle cx="139" cy="380" r="3" fill="#087f8c"/><circle cx="514" cy="167" r="3" fill="#662483"/><g fill="#5c6470" font-family="monospace" font-size="10" letter-spacing="1.7"><text x="35" y="40">${type === "hero" ? "ARTIFACTORY / 01" : "ARTISENSE / 01"}</text><text x="484" y="40">${pl ? "FOTONIKA" : "PHOTONICS"}</text><text x="42" y="409">${pl ? "SYGNAŁ" : "SIGNAL"}</text><text x="474" y="146">${pl ? "ŚWIATŁO" : "LIGHT"}</text>${type === "hero" ? `<text x="35" y="549">${pl ? "OD POMYSŁU DO ŚWIATŁA" : "FROM POSSIBILITY TO LIGHT"}</text>` : ""}</g></svg>`;
}
