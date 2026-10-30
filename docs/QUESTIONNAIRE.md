# AI-Aware WISP Builder questionnaire (v0.1.2)

Answer each question with **yes** (no gap), **partial** (half gap), **no** (full gap), or **na** (excluded). Severity weights: critical = 3, high = 2, moderate = 1. Questions marked *small-firm exempt* are advisory (not scored) for firms with customer information on fewer than 5,000 consumers (16 CFR 314.6).

## Governance and Qualified Individual

*16 CFR 314.4(a)*

| ID | Question | Citation | Severity | Small-firm exempt |
|---|---|---|---|---|
| GOV-1 | Has the firm designated one Qualified Individual to oversee the information security program, and does that person's role explicitly include AI tools? | 314.4(a) | critical (3) | no |
| GOV-2 | If an outside provider serves as Qualified Individual, does a named senior member of the firm oversee that provider? | 314.4(a)(2) | high (2) | no |

## Risk assessment

*16 CFR 314.4(b)*

| ID | Question | Citation | Severity | Small-firm exempt |
|---|---|---|---|---|
| RISK-1 | Does the firm's written risk assessment include AI-specific risks (data entering AI tools, AI-written phishing, deepfake requests, prompt injection, agent access)? | 314.4(b)(1) | high (2) | yes |
| RISK-2 | Is the risk assessment re-run when an AI tool is added, or when a vendor changes its model or features? | 314.4(b)(2) | moderate (1) | no |

## Access controls

*16 CFR 314.4(c)(1)*

| ID | Question | Citation | Severity | Small-firm exempt |
|---|---|---|---|---|
| ACC-1 | Is access to each AI tool limited by role to the staff who need it? | 314.4(c)(1) | critical (3) | no |
| ACC-2 | Do AI agents, plugins, and integrations run under least-privilege accounts (not an administrator's or partner's credentials)? | 314.4(c)(1) | critical (3) | no |
| ACC-3 | Do sensitive agent actions (sending email externally, changing or deleting client records) require human approval? | 314.4(c)(1) | high (2) | no |

## Asset management and AI inventory

*16 CFR 314.4(c)(2)*

| ID | Question | Citation | Severity | Small-firm exempt |
|---|---|---|---|---|
| AST-1 | Does the firm keep an inventory of every AI tool, plugin, and AI feature embedded in existing software? | 314.4(c)(2) | critical (3) | no |
| AST-2 | Does the inventory record, for each tool, the data classes it processes and whether it can take actions? | 314.4(c)(2) | high (2) | no |
| AST-3 | Is the inventory reviewed at least quarterly and whenever a vendor announces a new AI feature? | 314.4(c)(2) | moderate (1) | no |

## Encryption

*16 CFR 314.4(c)(3)*

| ID | Question | Citation | Severity | Small-firm exempt |
|---|---|---|---|---|
| ENC-1 | Is client information encrypted in transit and at rest in every AI tool and API integration that handles it (or are compensating controls approved in writing by the Qualified Individual)? | 314.4(c)(3) | critical (3) | no |

## Secure development and external applications

*16 CFR 314.4(c)(4)*

| ID | Question | Citation | Severity | Small-firm exempt |
|---|---|---|---|---|
| DEV-1 | Are in-house scripts, prompts, and integrations built by staff (for example automations that call an AI API) reviewed before use? | 314.4(c)(4) | high (2) | no |
| DEV-2 | Are external AI applications evaluated for security before use (not just purchased)? | 314.4(c)(4) | high (2) | no |

## Multifactor authentication

*16 CFR 314.4(c)(5)*

| ID | Question | Citation | Severity | Small-firm exempt |
|---|---|---|---|---|
| MFA-1 | Is multifactor authentication enforced on every AI tool and every system an AI integration connects to? | 314.4(c)(5) | critical (3) | no |

## Data disposal and retention

*16 CFR 314.4(c)(6)*

| ID | Question | Citation | Severity | Small-firm exempt |
|---|---|---|---|---|
| DSP-1 | Does the firm delete chat histories, transcripts, uploads, and vendor-retained data no later than two years after last use (subject to the rule's listed exceptions)? | 314.4(c)(6) | high (2) | no |
| DSP-2 | Can the firm request and confirm deletion of its data from each AI vendor, including at contract end? | 314.4(c)(6) | moderate (1) | no |

## Change management

*16 CFR 314.4(c)(7)*

| ID | Question | Citation | Severity | Small-firm exempt |
|---|---|---|---|---|
| CHG-1 | Does the firm have a procedure for reviewing vendor model changes and newly enabled AI features before they go live for client data? | 314.4(c)(7) | high (2) | no |

## Monitoring and logging

*16 CFR 314.4(c)(8)*

| ID | Question | Citation | Severity | Small-firm exempt |
|---|---|---|---|---|
| LOG-1 | Can the firm see and export logs of who used each AI tool and what each agent or integration did? | 314.4(c)(8) | high (2) | no |

## Testing and monitoring

*16 CFR 314.4(d)*

| ID | Question | Citation | Severity | Small-firm exempt |
|---|---|---|---|---|
| TST-1 | Are key controls for AI tools (MFA, access, logging) checked on a regular schedule? | 314.4(d)(1) | moderate (1) | no |
| TST-2 | Does the firm perform annual penetration testing and vulnerability assessments at least every six months (or continuous monitoring) that include its AI integrations? | 314.4(d)(2) | moderate (1) | yes |

## Training

*16 CFR 314.4(e)*

| ID | Question | Citation | Severity | Small-firm exempt |
|---|---|---|---|---|
| TRN-1 | Has every staff member been trained on approved AI tools, prohibited uses, and what client data may never enter an AI tool? | 314.4(e) | critical (3) | no |
| TRN-2 | Does training cover AI-written phishing and cloned-voice or video requests? | 314.4(e) | high (2) | no |

## Service providers (AI vendors)

*16 CFR 314.4(f)*

| ID | Question | Citation | Severity | Small-firm exempt |
|---|---|---|---|---|
| VEN-1 | Does the firm assess each AI vendor's security before approval using a documented screen? | 314.4(f)(1) | critical (3) | no |
| VEN-2 | Do AI vendor contracts prohibit training on client data (in writing) and require safeguards, confidentiality, and breach notice? | 314.4(f)(2) | critical (3) | no |
| VEN-3 | Does the firm know where each AI vendor stores and processes data, and which subprocessors or model providers receive it? | 314.4(f)(2) | high (2) | no |
| VEN-4 | Is each AI vendor reassessed periodically (at least annually) and recorded in the WISP? | 314.4(f)(3) | high (2) | no |

## Keeping the program current

*16 CFR 314.4(g)*

| ID | Question | Citation | Severity | Small-firm exempt |
|---|---|---|---|---|
| CUR-1 | Does the firm update the WISP when AI tools, threats, or guidance change? | 314.4(g) | moderate (1) | no |

## Incident response

*16 CFR 314.4(h)*

| ID | Question | Citation | Severity | Small-firm exempt |
|---|---|---|---|---|
| IR-1 | Does the written incident response plan include playbooks for an AI data leak, a deepfake fraud request, and a compromised AI integration? | 314.4(h) | high (2) | yes |
| IR-2 | Has the firm run a tabletop exercise on an AI scenario in the past year? | 314.4(h) | moderate (1) | yes |

## Report to leadership

*16 CFR 314.4(i)*

| ID | Question | Citation | Severity | Small-firm exempt |
|---|---|---|---|---|
| RPT-1 | Does the Qualified Individual's annual written report to leadership cover AI (inventory, incidents, vendor reviews)? | 314.4(i) | moderate (1) | yes |

## FTC notification

*16 CFR 314.4(j)*

| ID | Question | Citation | Severity | Small-firm exempt |
|---|---|---|---|---|
| FTC-1 | Does the firm know that an incident involving unencrypted information of 500 or more consumers requires notice to the FTC as soon as possible and within 30 days of discovery? | 314.4(j) | critical (3) | no |
| FTC-2 | Do AI vendor contracts require breach notice fast enough for the firm to meet the 30-day FTC deadline? | 314.4(j) | high (2) | no |

## Tax return information (Section 7216)

*IRC 6713, 7216; Treas. Reg. 301.7216-1 to -3*

| ID | Question | Citation | Severity | Small-firm exempt |
|---|---|---|---|---|
| T7216-1 | For each AI tool that touches tax return information, has the firm documented what data is sent, what the vendor does with it, where it is processed, and the basis for concluding the disclosure is permitted? | IRC 7216; Reg. 301.7216-2 | critical (3) | no |
| T7216-2 | Where a tool's use or disclosure of return information needs taxpayer consent, does the firm obtain a compliant consent (see Rev. Proc. 2013-14) before using the tool? | Reg. 301.7216-3 | critical (3) | no |
| T7216-3 | Does the firm ensure that no return information goes to a recipient outside the United States (including remote viewing from abroad of data stored in the U.S.) without the required taxpayer consent? | Reg. 301.7216-2(d), Example 3; 301.7216-3 | critical (3) | no |
| T7216-4 | Does the firm ensure that the Social Security number of a Form 1040-series filer never goes to a recipient outside the United States, even with the taxpayer's consent? | Reg. 301.7216-3(b)(4) | critical (3) | no |
| T7216-5 | Where a software contractor receives return information, does the firm give the recipient written notice of the applicability of sections 6713 and 7216? | Treas. Reg. 301.7216-2(d)(2) | high (2) | no |

## Professional duties (OPR Issue 2026-19)

*Circular 230 10.22, 10.27(a), 10.35, 10.36, 10.37, 10.51(a)(15)*

| ID | Question | Citation | Severity | Small-firm exempt |
|---|---|---|---|---|
| OPR-1 | Is all AI-generated text treated as a draft, with a named person verifying facts, citations, and calculations before anything goes to a client or the IRS? | Circ. 230 10.22; 10.37 | critical (3) | no |
| OPR-2 | Do the practitioners who use AI understand each tool's limits, risks, and potential for bias or error? | Circ. 230 10.35 | high (2) | no |
| OPR-3 | Does the firm have written AI policies and procedures, including data handling and accuracy monitoring, covering all members and staff? | Circ. 230 10.36 | high (2) | no |
| OPR-4 | Does the firm bill fairly for AI-assisted work (no billing for time not spent) and address AI use and efficiencies in engagement terms? | Circ. 230 10.27(a) | moderate (1) | no |
| OPR-5 | Does the firm record how AI was used and verified on each engagement, and keep a log of AI errors and their correction? | OPR 2026-19 (documentation) | high (2) | no |
| OPR-6 | Does the acceptable-use rule forbid entering client data into consumer or unapproved AI tools, and is that rule enforced? | Circ. 230 10.51(a)(15); IRC 6713, 7216 | critical (3) | no |

## AI-enabled threats

*16 CFR 314.4(c)(1), (e); OWASP LLM Top 10 (2025)*

| ID | Question | Citation | Severity | Small-firm exempt |
|---|---|---|---|---|
| THR-1 | Is there a call-back verification and two-person approval rule for any change to bank details, refund destination, or payment instructions, whatever the channel? | 314.4(c)(1), (e) | critical (3) | no |
| THR-2 | Is content from clients (documents, emails, attachments) treated as untrusted input by AI tools, with no tool allowed to act on instructions found inside it? | OWASP LLM01 | high (2) | no |
| THR-3 | Does the firm have a way to detect unapproved ('shadow') AI use, such as periodic surveys, browser or network controls, or expense review? | 314.4(c)(2), (e) | high (2) | no |

