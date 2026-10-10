# Local route recovery

Known 308 single-hop redirects: `/` → `/en/`; `/artisense-module/` → `/pl/projekty/artisense/`; `/about/` → `/pl/o-nas/`; `/partners/` → `/pl/wspolpraca/`; `/contact/` → `/pl/kontakt/`. Unknown English/Polish paths return a real 404 in their language; other unknown paths return English recovery. No blanket Home redirect is used.

The Polish ArtiSense overview preserves `#o-module`, `#fotonika`, `#elektronika`, and `#technologie` as short explanatory anchors with onward links. URL fragments are browser-only, so the old path redirect preserves the fragment and the destination resolves it. These five routes and four fragments are the supplied inventory, not proof that all historic backlinks were discovered. The domain operator must supply a full migration inventory and confirm the public canonical origin before publication.
