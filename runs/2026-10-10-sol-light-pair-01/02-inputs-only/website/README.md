# Artifactory local website

Run with Node.js 18 or newer; no install is needed:

```sh
cd website
npm start
```

Open <http://localhost:3000/en/> (or `/pl/`). Set `PORT` to change the port. `npm run check` verifies that every proposed route has English and Polish copy.

This is a local, noindex draft. It implements 17 page IDs / 34 localized routes, paired language links, project navigation, proposed legacy redirects, responsive layouts, and a contact form that validates entries and opens a populated draft in the visitor's mail client. The visitor must send that email; delivery is not confirmed by this website. The public address `info@artifactory.tech` comes from the supplied materials, but mailbox operation is unverified. The form does not send or store message data on the server.

Before publication: approve all public copy and project claims, confirm mailbox ownership and enquiry operations, implement a receiving service if server-side form receipt is required, replace the draft privacy notice with a reviewed production notice, confirm company/team/funding details, approve real brand and project assets, choose hosting and check production redirects and metadata. No reference screenshots or research PDFs are published in the website.
