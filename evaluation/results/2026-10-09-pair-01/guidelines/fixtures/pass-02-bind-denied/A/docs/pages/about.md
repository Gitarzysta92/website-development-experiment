# about

Owns content/pages/{en,pl}/about.json and src/templates/about/Page.astro. Original HTML/CSS concept graphics are explanatory, with captions in both languages. Source is the supplied HP-1.1 context; no numerical funding, team, IP ownership or partnership facts are invented. Records remain draft with all reviews unset.

Edit through the content review-invalidation API; facts invalidate both locales. Restore from a saved source copy and rebuild. The seeding script refuses overwrites. Run PAGE_IDS=about npm run test:e2e -- --project=chromium --grep 'route integrity' and inspect its wide/narrow screenshots. Final observed results are indexed in docs/acceptance-report.md.
