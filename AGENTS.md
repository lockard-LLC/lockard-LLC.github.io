# Repository Guidelines

## Project Structure & Module Organization
The site is served statically from the repository root; `index.html` and `/assets` drive the public landing page. The `docs/` tree currently contains a placeholder microsite. All Firebase artifacts now live under `/firebase` (`firestore.rules`, `storage.rules`, `remoteconfig.json`, and the runtime `config.js` shim) with `firebase.json` staying at the repository root.

## Build, Test, and Development Commands
- `yarn dev` (or `firebase serve --only hosting`): run a local preview at `http://localhost:5000`.
- `yarn build`: placeholder command; use it to verify no build steps are required for your change.
- `yarn deploy`: deploy only hosting assets once changes are reviewed.
- `yarn deploy:all`: push hosting, Firestore, Remote Config, and Storage rules in one batch—run only when all configs are ready.

## Coding Style & Naming Conventions
Use two-space indentation for HTML, inline CSS, and JSON. Favor semantic HTML tags and descriptive `aria-*` attributes to preserve accessibility across docs pages. Asset filenames remain lowercase with hyphen separators (for example, `brand-lockup.svg`); reference them with relative paths so the Firebase hosting structure stays portable.

## Testing Guidelines
Because no automated tests exist, run a full manual sweep: load the Firebase preview, confirm navigation across `index.html` and key `docs/` routes, and validate responsive layouts in browser dev tools. Check for broken links with your editor’s link checker or by running `firebase serve` and inspecting the console for 404s. When touching configuration files, dry-run the deployment with `firebase deploy --only hosting --debug` and confirm expected rewrites.

## Commit & Pull Request Guidelines
Write short, imperative commit subjects consistent with the history (`Update hero copy`, `Delete legacy CNAME`). Squash work-in-progress commits before opening the PR, and summarize the change, affected paths, and manual validation steps in the description. Attach before/after screenshots for visual tweaks and reference the relevant issue or doc URL so reviewers can trace context quickly.

## Security & Configuration Tips
Never commit Firebase service account keys or `.env` files; rely on project-level secrets managed in Firebase. Keep `firebase/config.js` scoped to the public web app settings only—rotate the API key in that file when needed and document the change in your PR. When editing rules or Remote Config, note the version in the PR description and tag a maintainer for review, as these changes propagate immediately on deploy. After any config update, capture logs from `firebase serve --only hosting` to ensure no new warnings appear.
