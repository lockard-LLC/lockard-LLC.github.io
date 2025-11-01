# Firebase Configuration

This directory holds the `Firebase Hosting`, `Firestore`, `Storage`, `Remote Config`, and `AI Logic` assets that ship with the project. Everything here is safe to commit because it only contains rules, templates, or placeholder values.

## Files

- `config.js` – Browser-facing config shim with environment-variable fallbacks and obvious placeholders.
- `ai.rules` – Firebase AI Logic security rules.
- `firestore.rules` / `firestore.indexes.json` – `Firestore` access policy and composite indexes.
- `remoteconfig.json` – `Remote Config` template used by `yarn deploy:all`.
- `storage.rules` – Firebase Storage security rules.

## Using `config.js`

`config.js` intentionally keeps dummy values such as `your-api-key`. During local development, load real credentials from a private `.env` (copy `.env.example` → `.env`) and inject them at build or serve time. Do not replace the placeholders in this file with production secrets.

If you need to inspect runtime values in the browser, expose only the public Firebase settings and rotate them through `.env`/`Firebase Hosting` environment config instead of editing this file.

## Project Selection

The Firebase CLI is configured to use the `lockard-llc-business` project by default (see `.firebaserc`). Run `firebase use <project-id>` if you need to flip to a sandbox.

## Security Checklist

- Keep `.env` files local and out of version control.
- Rotate Firebase API keys and reCAPTCHA site keys when onboarding new environments.
- Run `firebase deploy --only hosting --project lockard-llc-business --debug` after updating rules or config to confirm there are no warnings.
