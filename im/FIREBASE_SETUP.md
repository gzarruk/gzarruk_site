# Training planner — cloud sync setup

The planner at `im/index.html` works fully on its own: edits save to the
browser's `localStorage`, and you can Export/Import plans as JSON files. **Cloud
sync is optional** and adds cross-device saving via Firebase (Google sign-in +
Cloud Firestore).

The Firebase project (`local-terminus-467316-m8`) and web config are already
wired into the page. You only need to do the three console steps below once so
sign-in and reads/writes are allowed and secured.

## 1. Enable Google sign-in
Firebase console → **Authentication** → **Sign-in method** → enable the
**Google** provider → Save.

## 2. Authorize your domains
Authentication → **Settings** → **Authorized domains** → add:
- `www.gzarruk.com` (and `gzarruk.com` if you serve the bare domain)
- `localhost` is already there for local testing

## 3. Publish the security rules
Firestore Database → **Rules** → paste the contents of
[`../firestore.rules`](../firestore.rules) → **Publish**.

These rules let each signed-in Google account read/write only its own plans at
`users/{uid}/plans/{planId}`, and deny everything else.

## That's it
Reload the page and click **Sign in to sync**. Your plans then save to Firestore
and follow you across devices/browsers. Signed out, everything still works
locally.

### Notes
- **The API key in the page is not a secret.** Firebase web API keys are public
  identifiers; access is enforced by the rules above, not the key. Committing it
  is expected and safe.
- **Data model:** each plan is stored as a single document —
  `{ name, updatedAt, data: <plan-as-JSON-string> }`. Conflict handling is
  last-write-wins by `updatedAt`.
- **Legacy:** the old `trainingPlan` collection (the Google-Sheets mirror) and
  `import-to-firestore.js` are no longer used by this page. The new rules deny
  access to that collection; you can delete it and the import script whenever
  you like.
- The Firebase JS SDK loads from the gstatic CDN at runtime — no build step, so
  this all still works on GitHub Pages.
