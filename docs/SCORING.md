# Scoring and gap logic

The logic is deliberately simple so anyone can check it. It lives in `evaluate()` in `src/engine.js`.

## Answers

| Answer | Gap value |
|---|---|
| yes | 0 (no gap) |
| partial | 0.5 |
| no | 1 |
| na | excluded from scoring |
| (blank) | not scored; listed as unanswered |

## Severity weights

| Severity | Weight |
|---|---|
| critical | 3 |
| high | 2 |
| moderate | 1 |

Severity reflects the consequence of the gap for client-data protection and for the firm's legal duties, as judged by the author. It is a prioritization aid, not a legal classification. Weights are a starting judgment and are expected to change after pilot data.

## Calculation

For each scored question: `gap points = weight x gap value`. For each element (section): `score = round(100 x (1 - sum of gap points / sum of weights of scored questions))`. The overall score uses the same formula across all scored questions. Bands: 90 and above "strong"; 70-89 "developing"; below 70 "significant gaps". Bands are a communication aid, not a compliance finding.

## Small-firm exemption (16 CFR 314.6)

If the firm selects "Fewer than 5,000 consumers", questions tied to 314.4(b)(1), (d)(2), (h), and (i) (RISK-1, TST-2, IR-1, IR-2, RPT-1) are not scored; their gaps appear in the report as advisory. If the consumer count is unknown, every question is scored. All other controls, including vendor oversight, encryption, MFA, disposal, Section 7216, and Circular 230 duties, remain scored.

## Ordering of the gap list

Gaps are sorted by severity (critical, high, moderate), then full gaps before partial gaps, then by question ID.

## Limits

Scores summarize self-reported answers. They do not measure actual security, and they are not a determination of compliance with any law or regulation.
