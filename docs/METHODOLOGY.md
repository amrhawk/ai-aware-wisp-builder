# Methodology (v0.1.2)

The questionnaire was derived in three steps.

1. **Rule-by-rule analysis.** Each element of 16 CFR 314.4 (a) through (j), including (c)(1) through (c)(8), was read together with 314.2-314.6, Treas. Reg. 301.7216-1 through -3, IRC 6713 and 7216, Circular 230 sections 10.22, 10.27(a), 10.35, 10.36, 10.37, and 10.51(a)(15), and the text of IRS OPR Issue Number 2026-19, "Introductory Guidelines for Responsible AI Use in Federal Tax Practice" (June 24, 2026). For each, the author identified how an AI-tool decision can satisfy or violate the provision and wrote a question that tests it.
2. **Threat modeling.** The tax-firm workflow (intake, preparation, review, filing, client communication, payments) was examined against the OWASP Top 10 for LLM Applications (2025) and MITRE ATLAS, yielding five threat classes: AI-written phishing, deepfake requests, poisoned documents and prompt injection, agent misuse, and data leakage through unapproved tools.
3. **Standards alignment.** Controls were checked for consistency with the NIST AI Risk Management Framework (AI 100-1), the Generative AI Profile (NIST AI 600-1), and NIST Cybersecurity Framework 2.0.

## Status and limitations

- The questionnaire has not been validated in a large study. See `docs/PILOT_PROTOCOL.md` for the small field test protocol.
- Severity weights are the author's judgment.
- Regulatory text changes. Citations were checked against primary sources on the release date; verify before relying on them.
- Questions on Section 7216 identify what to ask. They do not decide whether a particular arrangement is permitted; that requires professional review.

## Primary sources

- FTC, Standards for Safeguarding Customer Information, 16 CFR Part 314; 88 Fed. Reg. 77499 (Nov. 13, 2023).
- IRC 6713, 7216; Treas. Reg. 301.7216-1, -2, -3; Rev. Proc. 2013-14.
- Treasury Department Circular No. 230, 31 CFR Part 10.
- IRS OPR Issue 2026-19 (June 24, 2026); IRS OPR Issue 2026-22 (July 22, 2026).
- IRS Publications 4557, 5708, 1345.
- NIST AI 100-1; NIST AI 600-1; NIST CSF 2.0; OWASP Top 10 for LLM Applications 2025; MITRE ATLAS.
