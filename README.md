<div align="center">
  <img src="assets/images/favicon.svg" alt="Lockard LLC" width="96"/>

  # Lockard LLC

  **A parent company dedicated to advocacy-driven technology — restoring stability, safety, and dignity through lived experience**

  [![Website](https://img.shields.io/badge/website-lockard.llc-blue)](https://lockard.llc)
  [![Docs](https://img.shields.io/badge/docs-documentation-lightgrey)](https://docs.lockard.llc)
  [![License](https://img.shields.io/badge/license-Business-green)](LICENSE)
</div>

---

## About

I founded **Lockard LLC** after surviving more than a decade of domestic violence, systemic neglect, and the long, unseen process of rebuilding from the ground up.  
What began as a personal act of survival has become a parent company dedicated to transforming lived experience into accessible, ethical technology for people in crisis.

**Lockard LLC** serves as an umbrella organization that develops and incubates specialized companies and projects, each bringing empathy, structure, and transparency to systems that too often fail those they're meant to protect.  
Headquartered in Kentucky, our work blends **social innovation**, **human-centered design**, and **ethical engineering** to build technology that restores trust — not just efficiency.

**Our mission:** Transform lived experience into infrastructure for dignity through purpose-built companies and projects.

---

## Mission & Vision

**Mission:**  
To build and incubate technology companies that survivors of crisis can trust — trauma-informed, transparent, and designed to empower recovery, not just interrupt harm.

**Vision:**  
A world where no one faces trauma, legal systems, or recovery alone — where digital infrastructure becomes a bridge to connection, safety, and renewal through purpose-built companies and projects.

---

## Our Approach

**Lockard LLC** operates as a parent company that develops and launches specialized ventures, each addressing specific needs within the survivor and crisis support ecosystem. Rather than building everything under one roof, we create focused companies that can deeply understand and serve their particular communities.

### **Company Structure**
Each project and company under the Lockard LLC umbrella operates as a distinct entity with its own:
- Specialized focus area and target community
- Dedicated team and resources
- Customized technology stack and approach
- Independent development roadmap

### **Current Portfolio**
Our portfolio includes companies and projects in development across various domains:
- **Crisis Support Technology** - AI-powered assistance and resource navigation
- **Trauma-Informed Care** - Veterinary and pet welfare services for survivors
- **Integrated Care Platforms** - Unified systems connecting multiple support services
- **Community Infrastructure** - Tools and platforms for advocacy organizations

*Individual company details and project information will be available in their respective directories as they are developed and launched.*

---

## Core Principles

Lockard LLC isn't about scale for scale's sake. We measure success by **trust, transparency, and tangible impact** across all our companies and projects.

**Lived-Experience Design**  
Every company and project begins with empathy and ends with clarity. We build tools informed by personal experience, survivor feedback, and trauma psychology — not guesswork.

**Ethical Infrastructure**  
Data privacy, security, and informed consent are non-negotiable across all ventures. Our systems are auditable, transparent, and designed to protect users even in high-risk situations.

**Trauma-Informed UX**  
We design calm, focused interfaces for people under stress. Clarity replaces noise; compassion replaces friction in every product we develop.

**Community Partnership**  
We co-develop with shelters, legal aid teams, social service agencies, and advocacy partners — because solving real problems means building with the community, not for it.

**Purposeful Incubation**  
Each company we develop serves a specific, well-defined need within the survivor support ecosystem, ensuring focused impact rather than diluted efforts.

---

## Technical Overview

This repository hosts Lockard LLC's parent company web presence, documentation portal, and backend infrastructure.  
It serves as the central hub for information about our umbrella organization and provides the foundation for individual company directories as they are developed.

### Repository Structure

```
lockard-llc/
├── index.html              # Parent company landing page
├── assets/                 # Global styles, icons, scripts, imagery
├── docs/                   # Documentation portal for parent company
├── firebase/               # Firestore rules, Remote Config, hosting setup
├── firebase.json           # Environment and emulator configuration
├── package.json            # Dependencies and workflow scripts
└── [future company directories] # Individual company/project directories
    ├── dvoGPT/             # Future: AI assistant company
    ├── safePaws/           # Future: Veterinary care company
    ├── carePlatform/       # Future: Integrated care platform
    └── [additional companies] # Future: Other specialized ventures
```

### Individual Company Structure
As companies are developed, each will have its own directory with:
- Independent documentation and README files
- Company-specific assets and branding
- Dedicated development workflows
- Custom Firebase configurations (if needed)

### Firebase Configuration

1. Copy `firebase/config.template.js` → `firebase/config.js`  
2. Add your Firebase Web App credentials (Console → Project Settings → General)  
3. Confirm `window.__FIREBASE_CONFIG__` matches your environment  
4. Run `yarn dev` to preview locally with Firebase emulators  
5. Deploy with `yarn deploy` or `yarn deploy:all` (site + config updates)

Keep `config.template.js` untouched to preserve contributor clarity.  
When rotating credentials, update and redeploy without exposing sensitive data.

---

## Development

### Prerequisites
- Node.js 18+  
- Yarn package manager  
- Firebase CLI (`npm install -g firebase-tools`)

### Commands

```bash
yarn install      # Install dependencies
yarn dev          # Run local server with Firebase emulators
yarn deploy       # Deploy production site
yarn deploy:all   # Deploy site + Firebase configurations
````

### Workflow

1. Branch from `main` (e.g., `feature/care-platform`, `update/docs`)
2. Test locally with `yarn dev`
3. Validate responsiveness, accessibility, and error-free builds
4. Submit a pull request with clear notes
5. Merge after review and deploy to production

---

## Contributing

Contributions should advance our core mission: **technology built with empathy, precision, and survivor safety in mind.**

**We welcome:**

* Accessibility improvements (WCAG, keyboard navigation, screen reader support)
* Security and privacy enhancements
* Documentation clarity or technical refinements
* Performance and infrastructure optimizations

**Guidelines:**

* Keep commits focused and descriptive
* Document any dependency or configuration changes
* Verify all builds locally before submitting PRs
* Prioritize user dignity, safety, and trust above all else

---

## Roadmap

### Near-Term Goals

* Develop and launch first specialized company under the Lockard LLC umbrella
* Establish individual company directories and documentation frameworks
* Create standardized development and deployment workflows for subsidiary companies
* Publish the **Trauma-Informed Tech Framework** for open adoption across all ventures

### Long-Term Vision

* Build a portfolio of focused companies addressing different aspects of survivor support
* Establish cross-agency data-sharing models grounded in privacy and ethics
* Integrate care coordination systems across legal, housing, and health sectors
* Scale Lockard's ecosystem regionally through mission-aligned partnerships and subsidiary companies

---

## Why It Matters

Lockard LLC is more than a company — it's a personal declaration of survival turned systemic redesign.
Every system that once failed me now informs what we build across all our ventures, ensuring others don't face the same isolation, fear, or uncertainty.

Technology cannot erase trauma — but it can make recovery navigable, accessible, and dignified.
That is what we build for, across every company and project we develop.

By creating focused, specialized companies rather than trying to solve everything under one roof, we can ensure that each venture deeply understands and serves its specific community, leading to more meaningful impact and sustainable solutions.

---

## Contact

**Email:** [hello@lockard.llc](mailto:hello@lockard.llc)
**Website:** [https://lockard.llc](https://lockard.llc)
**Documentation:** [https://docs.lockard.llc](https://docs.lockard.llc)

---

<div align="center">

🕊️ *Built from survival. Designed for recovery. Engineered for dignity across every venture.*

</div>
