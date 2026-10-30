# Changelog

## 0.1.2 (2026-10-29)
- Loading an answers file saved by 0.1.0 (no version stamp) now migrates it automatically: the old T7216-4 answer moves to T7216-5, the new SSN question T7216-4 is left unanswered and highlighted, and T7216-3 (reworded) is flagged for review. The command line has `--migrate` and applies the same migration when generating documents.
- Accessibility: each answer group is now labeled by its question text (not just the ID) for screen readers, and the question's citation and severity are attached as its description.
- Added `SECURITY.md` (private vulnerability reporting) and a release-checklist step to enable it.

## 0.1.1 (2026-10-28)
- Privacy: tightened the Content-Security-Policy to `default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; form-action 'none'; base-uri 'none'` (the 0.1.0 policy blocked fetch/XHR but not outside images); `docs/PRIVACY.md` and the README now state exactly what is blocked and what cannot be guaranteed.
- Questionnaire: split the Section 7216 outside-the-U.S. question into separate questions (consent for return information, including remote viewing from abroad; and SSNs of Form 1040-series filers never leaving the U.S., even with consent); now 46 questions.
- Saved answers now record the builder version; loading a file from another version asks you to review it, because question IDs T7216-4 and T7216-5 changed meaning in 0.1.1.
- Fixed: default date now uses the local calendar date, not UTC; size tier label reads "solo (1-5)"; typo in the pilot protocol.
- Added: one-link publishing via GitHub Pages (`scripts/build-site.js`, `.github/workflows/pages.yml`); placeholder helpers (`scripts/set-placeholders.js`, `scripts/check-placeholders.js`); release checklist; optional testimonial consent template and pilot-protocol step; more tests.

## 0.1.0 (2026-10-27)
- First release: 45-question questionnaire mapped to every element of 16 CFR 314.4, IRC Sections 6713 and 7216, and Circular 230 as applied in IRS OPR Issue 2026-19.
- Gap logic with severity weights, partial answers, and the 16 CFR 314.6 small-firm exemption handled as advisory.
- Browser-only app (no network access), command-line tool, addendum and gap-report generators.
- Eight copy-ready templates; sample outputs for a fictional five-person firm.
- 14 automated tests.
