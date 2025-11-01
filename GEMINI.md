# GEMINI.md

## Project Overview

This repository contains the source code for the Lockard LLC website, a static web presence for a technology studio focused on advocacy-driven software. The project is built with HTML, CSS, and JavaScript, and it utilizes Firebase for hosting, database, and other backend services.

The website serves as a central hub for information about the company, its mission, and its projects. It includes sections detailing the company's principles, focus areas, and contact information. A significant portion of the site is dedicated to "SafePaws," a project aimed at providing technology solutions for animal shelters and survivors of domestic violence.

## Building and Running

The project uses `yarn` as its package manager. The following commands are available in `package.json`:

*   **`yarn install`**: Installs the project dependencies.
*   **`yarn dev`**: Starts a local development server using the Firebase emulators. This is the recommended way to work on the project locally.
*   **`yarn deploy`**: Deploys the website to Firebase Hosting.
*   **`yarn deploy:all`**: Deploys the website and all Firebase configurations (hosting, Firestore rules, etc.).

### Prerequisites

*   Node.js 18+
*   Yarn package manager
*   Firebase CLI (`npm install -g firebase-tools`)

## Development Conventions

*   **Code Style:** The code is well-formatted and follows standard conventions for HTML, CSS, and JavaScript.
*   **File Structure:** The project is organized into logical directories:
    *   `assets/`: Contains CSS, JavaScript, and image files.
    *   `docs/`: Contains documentation for the project.
    *   `firebase/`: Contains Firebase configuration files (Firestore rules, storage rules, etc.).
    *   `safepaws/`: Contains the assets for the SafePaws microsite.
*   **Firebase:** The project is heavily integrated with Firebase. The `firebase.json` file configures hosting for three different sites: the main business site, the SafePaws microsite, and the documentation site.
*   **Dependencies:** The project uses `firebase` for interacting with Firebase services and `firebase-tools` for deployment and local development.
