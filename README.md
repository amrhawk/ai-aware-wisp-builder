# AI-Aware WISP Builder

**Version 0.1.2** · Free and open source · Runs in your browser · Your answers are never uploaded

A questionnaire that generates an **AI addendum to your firm's Written Information Security Plan (WISP)** and a **gap report**. It maps each element of the FTC Safeguards Rule (16 CFR 314.4) to AI-specific controls, and adds IRC Section 7216 and Circular 230 duties as applied in IRS Office of Professional Responsibility Issue 2026-19, *Introductory Guidelines for Responsible AI Use in Federal Tax Practice* (June 24, 2026).

> A WISP is the written information security plan that tax preparers and accounting firms must maintain under the FTC Safeguards Rule. See IRS Publication 5708 for a template.

**Guidance only. Not legal, tax, or financial advice.** Confirm requirements with your own advisors. Scores summarize your answers and are not a determination of compliance.

## Quick start (no technical skills)

**Use it online (one link):** https://amrhawk.github.io/ai-aware-wisp-builder/

1. Open the link. Fill in the firm profile and answer the 46 questions (or click **Load fictional sample firm** to see how it works).
2. Click **Generate**. Download the **Addendum** and **Gap report** (`.md` files, which open in any text editor or Word) or use **Print or save as PDF**.
3. Click **Download answers (.json)** to save your work and **Load saved answers** to resume later.

**Prefer to keep a copy offline?** Download this repository as a ZIP (green **Code** button, then **Download ZIP**), unzip it, and double-click `web/index.html`.

**Privacy.** The page runs in your browser and your answers are never sent anywhere; nothing is stored in the browser. A Content-Security-Policy tells the browser to block outbound connections (fetch, XHR, WebSocket), outside images, fonts, frames, scripts and styles, and form submission. `docs/PRIVACY.md` states exactly what is blocked and what no web page can guarantee, and `web/csp-selftest.html` lets you confirm that your own browser enforces the policy. **Do not enter client data**; the questions are about your firm's controls.

If you prefer paper, `docs/QUESTIONNAIRE.md` lists every question with its citation and can be printed.

## Command line (optional, Node 18+, no dependencies)

```bash
node bin/wisp-builder.js --blank > my-answers.json          # blank answers file
# edit my-answers.json: set profile and answer each question yes | partial | no | na
node bin/wisp-builder.js --answers my-answers.json --out my-output --strict
npm test                                                     # automated tests
```

## What you get

- **Gap report** (`examples/gap-report.md`): overall and per-element scores, gaps ranked by severity with the citation, why it matters, the fix, and the template to use; advisory items for the small-firm exemption; unanswered questions; suggested metrics.
- **Addendum** (`examples/addendum.md`): a ready-to-edit AI addendum with a control statement and status table for every element, owner and date fields, an approval block, and eight appendices (AI inventory, acceptable-use rule, payment-change verification, agent permission matrix, incident playbooks and tabletop exercises, training outline, vendor screen, threat classes).

Both examples were generated from `examples/sample-answers-5-person-firm.json`, a **fictional** five-person firm whose answers were written to show the report; they are not findings about any real firm.

## How it works

- 46 questions across 20 elements, each with a citation, severity (critical 3, high 2, moderate 1), a "why it matters", and a "fix" (`src/questions.js`, listed in `docs/QUESTIONNAIRE.md`).
- Answers: yes (no gap), partial (half gap), no (full gap), na (excluded). Section score = 100 x (1 - gap points / maximum points). Details in `docs/SCORING.md`.
- **Small-firm exemption (16 CFR 314.6):** firms with customer information on fewer than 5,000 consumers are exempt from 314.4(b)(1), (d)(2), (h), and (i). Those questions become advisory and are not scored. Vendor oversight, encryption, MFA, disposal, Section 7216, and Circular 230 duties still apply.
- Method and limitations: `docs/METHODOLOGY.md`. Pilot protocol for small field tests: `docs/PILOT_PROTOCOL.md`.

## Repository layout

```
web/            browser app (index.html, app.js, style.css)
index.html is built for GitHub Pages by scripts/build-site.js (output folder site/)
src/            questions.js, templates.js, engine.js (scoring and document generation)
bin/            command-line tool
templates/      copy-ready templates (Markdown)
docs/           questionnaire, scoring, methodology, pilot protocol, privacy
examples/       fictional sample answers and generated outputs
tests/          automated tests
scripts/        regenerates docs, templates, and sample data
```

## Status and roadmap

v0.1.x is an early release. It has not been validated in a large study.

- v0.2: results of a small field test (see `docs/PILOT_PROTOCOL.md`; testimonials only with separate written consent, `docs/TESTIMONIAL_CONSENT.md`); revised severity weights; fillable PDF/Word version for firms that will not use a browser.
- Later: translations, more vendor-screen depth, state-law add-ons.

## Cite

See `CITATION.cff`. Suggested: Raza, A. (2026). *AI-Aware WISP Builder*, version 0.1.2. https://github.com/amrhawk/ai-aware-wisp-builder .

## License

Code: MIT (`LICENSE`). Text and templates: CC BY 4.0 (`LICENSE-CONTENT.md`). Regulatory and standards sources belong to their publishers.

## Security

To report a vulnerability privately, see `SECURITY.md`.

## Before you publish this repository

See `docs/RELEASE_CHECKLIST.md` .

## Author

Aamir Raza, MS, Cyberforensics and security . Contact: araza7@hawk.iit.edu. This is an independent, non-commercial project; it does not contain or represent any employer's or client's data, policies, or incidents.
