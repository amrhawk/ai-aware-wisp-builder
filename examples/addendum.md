# AI-Aware WISP Addendum

**Firm:** Harbor Lane Tax & Accounting LLC (fictional)  
**Qualified Individual:** Jordan Ellis (fictional)  
**Version:** 1.0 (draft)  
**Date:** 2026-10-27  
**Next review due:** [date, at least annually]

## Purpose and scope

This addendum supplements the firm's Written Information Security Plan (WISP) under the FTC Safeguards Rule (16 CFR Part 314). It applies to every AI tool, plugin, agent, and embedded AI feature that processes, stores, or can reach client information, and to all partners, employees, and contractors. It also records how the firm applies IRC Section 7216 and Circular 230 (as discussed in IRS OPR Issue 2026-19) to its use of AI.

**Small-firm note.** The firm reports customer information on fewer than 5,000 consumers. 16 CFR 314.6 exempts the firm from 314.4(b)(1), (d)(2), (h), and (i). Controls tied to those provisions are marked *advisory*; the firm adopts them voluntarily where noted.

## 1. Governance and Qualified Individual

*Citation: 16 CFR 314.4(a)*

**Control:** The Qualified Individual owns AI governance: approves each AI tool, reviews the AI inventory, and signs off on vendor screens.

| ID | Requirement | Status | Owner | Target date |
|---|---|---|---|---|
| GOV-1 | Has the firm designated one Qualified Individual to oversee the information security program, and does that person's role explicitly include AI tools? | In place |  |  |
| GOV-2 | If an outside provider serves as Qualified Individual, does a named senior member of the firm oversee that provider? | Not applicable |  |  |

## 2. Risk assessment

*Citation: 16 CFR 314.4(b)*

**Control:** The written risk assessment includes AI-specific risks (data leakage, AI-written phishing, deepfake requests, poisoned documents and prompt injection, agent misuse) and is revisited when an AI tool or model changes.

| ID | Requirement | Status | Owner | Target date |
|---|---|---|---|---|
| RISK-1 | Does the firm's written risk assessment include AI-specific risks (data entering AI tools, AI-written phishing, deepfake requests, prompt injection, agent access)? | Gap (advisory, 314.6) | [owner] | [date] |
| RISK-2 | Is the risk assessment re-run when an AI tool is added, or when a vendor changes its model or features? | Gap | [owner] | [date] |

## 3. Access controls

*Citation: 16 CFR 314.4(c)(1)*

**Control:** Access to AI tools is role-based and least-privilege. Agents and integrations use dedicated low-privilege accounts, and sensitive actions require human approval.

| ID | Requirement | Status | Owner | Target date |
|---|---|---|---|---|
| ACC-1 | Is access to each AI tool limited by role to the staff who need it? | Partial | [owner] | [date] |
| ACC-2 | Do AI agents, plugins, and integrations run under least-privilege accounts (not an administrator's or partner's credentials)? | Gap | [owner] | [date] |
| ACC-3 | Do sensitive agent actions (sending email externally, changing or deleting client records) require human approval? | Gap | [owner] | [date] |

## 4. Asset management and AI inventory

*Citation: 16 CFR 314.4(c)(2)*

**Control:** The firm maintains an inventory of every AI tool, plugin, and embedded AI feature, with data classes, action capability, owner, and reassessment date.

| ID | Requirement | Status | Owner | Target date |
|---|---|---|---|---|
| AST-1 | Does the firm keep an inventory of every AI tool, plugin, and AI feature embedded in existing software? | Partial | [owner] | [date] |
| AST-2 | Does the inventory record, for each tool, the data classes it processes and whether it can take actions? | Gap | [owner] | [date] |
| AST-3 | Is the inventory reviewed at least quarterly and whenever a vendor announces a new AI feature? | Gap | [owner] | [date] |

## 5. Encryption

*Citation: 16 CFR 314.4(c)(3)*

**Control:** Client information is encrypted in transit and at rest in every AI tool and API integration; exceptions need the Qualified Individual's written approval of compensating controls.

| ID | Requirement | Status | Owner | Target date |
|---|---|---|---|---|
| ENC-1 | Is client information encrypted in transit and at rest in every AI tool and API integration that handles it (or are compensating controls approved in writing by the Qualified Individual)? | In place |  |  |

## 6. Secure development and external applications

*Citation: 16 CFR 314.4(c)(4)*

**Control:** In-house scripts, prompts, and integrations are reviewed before use; external AI applications are evaluated before approval.

| ID | Requirement | Status | Owner | Target date |
|---|---|---|---|---|
| DEV-1 | Are in-house scripts, prompts, and integrations built by staff (for example automations that call an AI API) reviewed before use? | Not applicable |  |  |
| DEV-2 | Are external AI applications evaluated for security before use (not just purchased)? | Gap | [owner] | [date] |

## 7. Multifactor authentication

*Citation: 16 CFR 314.4(c)(5)*

**Control:** Multifactor authentication is required on every AI tool and every system an AI integration connects to; exceptions need the Qualified Individual's written approval.

| ID | Requirement | Status | Owner | Target date |
|---|---|---|---|---|
| MFA-1 | Is multifactor authentication enforced on every AI tool and every system an AI integration connects to? | Partial | [owner] | [date] |

## 8. Data disposal and retention

*Citation: 16 CFR 314.4(c)(6)*

**Control:** Chat histories, transcripts, uploads, and vendor-retained data are deleted no later than two years after last use, subject to the rule's listed exceptions; deletion is confirmed in writing.

| ID | Requirement | Status | Owner | Target date |
|---|---|---|---|---|
| DSP-1 | Does the firm delete chat histories, transcripts, uploads, and vendor-retained data no later than two years after last use (subject to the rule's listed exceptions)? | Gap | [owner] | [date] |
| DSP-2 | Can the firm request and confirm deletion of its data from each AI vendor, including at contract end? | Partial | [owner] | [date] |

## 9. Change management

*Citation: 16 CFR 314.4(c)(7)*

**Control:** Vendor model changes and newly enabled AI features are reviewed before they apply to client data; new AI features are off by default until reviewed.

| ID | Requirement | Status | Owner | Target date |
|---|---|---|---|---|
| CHG-1 | Does the firm have a procedure for reviewing vendor model changes and newly enabled AI features before they go live for client data? | Gap | [owner] | [date] |

## 10. Monitoring and logging

*Citation: 16 CFR 314.4(c)(8)*

**Control:** User and agent activity in AI tools is logged, exportable, and reviewed for unauthorized access or tampering.

| ID | Requirement | Status | Owner | Target date |
|---|---|---|---|---|
| LOG-1 | Can the firm see and export logs of who used each AI tool and what each agent or integration did? | Partial | [owner] | [date] |

## 11. Testing and monitoring

*Citation: 16 CFR 314.4(d)*

**Control:** AI tools and integrations are included in regular control testing and, where required, penetration testing and vulnerability assessments.

| ID | Requirement | Status | Owner | Target date |
|---|---|---|---|---|
| TST-1 | Are key controls for AI tools (MFA, access, logging) checked on a regular schedule? | Gap | [owner] | [date] |
| TST-2 | Does the firm perform annual penetration testing and vulnerability assessments at least every six months (or continuous monitoring) that include its AI integrations? | Gap (advisory, 314.6) | [owner] | [date] |

## 12. Training

*Citation: 16 CFR 314.4(e)*

**Control:** All staff are trained on approved tools, prohibited uses, AI-written phishing, and cloned-voice and video requests at onboarding and at least annually.

| ID | Requirement | Status | Owner | Target date |
|---|---|---|---|---|
| TRN-1 | Has every staff member been trained on approved AI tools, prohibited uses, and what client data may never enter an AI tool? | Partial | [owner] | [date] |
| TRN-2 | Does training cover AI-written phishing and cloned-voice or video requests? | Gap | [owner] | [date] |

## 13. Service providers (AI vendors)

*Citation: 16 CFR 314.4(f)*

**Control:** Every AI vendor passes the vendor screen before approval, is bound by contract (no training on client data, security, confidentiality, breach notice), and is reassessed at least annually.

| ID | Requirement | Status | Owner | Target date |
|---|---|---|---|---|
| VEN-1 | Does the firm assess each AI vendor's security before approval using a documented screen? | Gap | [owner] | [date] |
| VEN-2 | Do AI vendor contracts prohibit training on client data (in writing) and require safeguards, confidentiality, and breach notice? | Partial | [owner] | [date] |
| VEN-3 | Does the firm know where each AI vendor stores and processes data, and which subprocessors or model providers receive it? | Gap | [owner] | [date] |
| VEN-4 | Is each AI vendor reassessed periodically (at least annually) and recorded in the WISP? | Gap | [owner] | [date] |

## 14. Keeping the program current

*Citation: 16 CFR 314.4(g)*

**Control:** This addendum is versioned and reviewed at least annually and after any AI incident, new tool, or new guidance.

| ID | Requirement | Status | Owner | Target date |
|---|---|---|---|---|
| CUR-1 | Does the firm update the WISP when AI tools, threats, or guidance change? | Partial | [owner] | [date] |

## 15. Incident response

*Citation: 16 CFR 314.4(h)*

**Control:** The incident response plan includes playbooks for an AI data leak, a deepfake fraud request, and a compromised AI integration, and is exercised annually.

| ID | Requirement | Status | Owner | Target date |
|---|---|---|---|---|
| IR-1 | Does the written incident response plan include playbooks for an AI data leak, a deepfake fraud request, and a compromised AI integration? | Gap (advisory, 314.6) | [owner] | [date] |
| IR-2 | Has the firm run a tabletop exercise on an AI scenario in the past year? | Gap (advisory, 314.6) | [owner] | [date] |

## 16. Report to leadership

*Citation: 16 CFR 314.4(i)*

**Control:** The Qualified Individual's annual written report to firm leadership covers the AI inventory, incidents, vendor reviews, and program metrics.

| ID | Requirement | Status | Owner | Target date |
|---|---|---|---|---|
| RPT-1 | Does the Qualified Individual's annual written report to leadership cover AI (inventory, incidents, vendor reviews)? | Gap (advisory, 314.6) | [owner] | [date] |

## 17. FTC notification

*Citation: 16 CFR 314.4(j)*

**Control:** An incident involving unencrypted information of 500 or more consumers is reported to the FTC as soon as possible and no later than 30 days after discovery; vendor contracts require notice in time to meet that deadline.

| ID | Requirement | Status | Owner | Target date |
|---|---|---|---|---|
| FTC-1 | Does the firm know that an incident involving unencrypted information of 500 or more consumers requires notice to the FTC as soon as possible and within 30 days of discovery? | Partial | [owner] | [date] |
| FTC-2 | Do AI vendor contracts require breach notice fast enough for the firm to meet the 30-day FTC deadline? | Gap | [owner] | [date] |

## 18. Tax return information (Section 7216)

*Citation: IRC 6713, 7216; Treas. Reg. 301.7216-1 to -3*

**Control:** For each AI tool that touches tax return information, the firm documents what is sent, what the vendor does with it, where it is processed, and the basis for its Section 7216 conclusion; consent is obtained where required.

| ID | Requirement | Status | Owner | Target date |
|---|---|---|---|---|
| T7216-1 | For each AI tool that touches tax return information, has the firm documented what data is sent, what the vendor does with it, where it is processed, and the basis for concluding the disclosure is permitted? | Gap | [owner] | [date] |
| T7216-2 | Where a tool's use or disclosure of return information needs taxpayer consent, does the firm obtain a compliant consent (see Rev. Proc. 2013-14) before using the tool? | Partial | [owner] | [date] |
| T7216-3 | Does the firm ensure that no return information goes to a recipient outside the United States (including remote viewing from abroad of data stored in the U.S.) without the required taxpayer consent? | Gap | [owner] | [date] |
| T7216-4 | Does the firm ensure that the Social Security number of a Form 1040-series filer never goes to a recipient outside the United States, even with the taxpayer's consent? | Gap | [owner] | [date] |
| T7216-5 | Where a software contractor receives return information, does the firm give the recipient written notice of the applicability of sections 6713 and 7216? | Not applicable |  |  |

## 19. Professional duties (OPR Issue 2026-19)

*Citation: Circular 230 10.22, 10.27(a), 10.35, 10.36, 10.37, 10.51(a)(15)*

**Control:** AI output is treated as a draft and verified by a named person; the firm understands each tool's limits, maintains written AI procedures, documents AI use and verification, bills fairly, and uses only secure, enterprise-approved AI for client data.

| ID | Requirement | Status | Owner | Target date |
|---|---|---|---|---|
| OPR-1 | Is all AI-generated text treated as a draft, with a named person verifying facts, citations, and calculations before anything goes to a client or the IRS? | In place |  |  |
| OPR-2 | Do the practitioners who use AI understand each tool's limits, risks, and potential for bias or error? | Partial | [owner] | [date] |
| OPR-3 | Does the firm have written AI policies and procedures, including data handling and accuracy monitoring, covering all members and staff? | Gap | [owner] | [date] |
| OPR-4 | Does the firm bill fairly for AI-assisted work (no billing for time not spent) and address AI use and efficiencies in engagement terms? | Partial | [owner] | [date] |
| OPR-5 | Does the firm record how AI was used and verified on each engagement, and keep a log of AI errors and their correction? | Gap | [owner] | [date] |
| OPR-6 | Does the acceptable-use rule forbid entering client data into consumer or unapproved AI tools, and is that rule enforced? | Partial | [owner] | [date] |

## 20. AI-enabled threats

*Citation: 16 CFR 314.4(c)(1), (e); OWASP LLM Top 10 (2025)*

**Control:** Payment and bank-detail changes require call-back verification and two-person approval; client content is treated as untrusted input; unapproved AI use is actively detected.

| ID | Requirement | Status | Owner | Target date |
|---|---|---|---|---|
| THR-1 | Is there a call-back verification and two-person approval rule for any change to bank details, refund destination, or payment instructions, whatever the channel? | Partial | [owner] | [date] |
| THR-2 | Is content from clients (documents, emails, attachments) treated as untrusted input by AI tools, with no tool allowed to act on instructions found inside it? | Gap | [owner] | [date] |
| THR-3 | Does the firm have a way to detect unapproved ('shadow') AI use, such as periodic surveys, browser or network controls, or expense review? | Gap | [owner] | [date] |

## Approval

Approved by the Qualified Individual: ____________________  Date: ____________

Approved by firm leadership: ____________________  Date: ____________

## Appendix A. AI use-case inventory

One row per AI tool, plugin, or embedded AI feature. The Qualified Individual reviews the inventory at least quarterly and whenever a vendor announces a new feature. (16 CFR 314.4(c)(2))

| Field | Entry |
|---|---|
| Tool and vendor; version or model | |
| Business owner and approver (date) | |
| Workflow and purpose | |
| Data classes processed (public / internal / client confidential / return information) | |
| Can it take actions or access other systems? (no / read-only / read-write) | |
| Vendor screen result and date | |
| Retention period, data location, subprocessors | |
| Section 7216 basis (memo reference; consent form if required) | |
| MFA enforced? Logs exportable? | |
| Next reassessment date | |

## Appendix B. AI acceptable-use rule

**Data classes and permitted AI use**

| Data class | Examples | AI rule |
|---|---|---|
| Public | Published IRS guidance, firm marketing copy | Any approved tool |
| Internal | Procedures, templates, non-client workpaper formats | Approved tools only |
| Client confidential | Engagement terms, financial statements, correspondence | Enterprise-approved tools that passed the vendor screen; no consumer AI accounts |
| Return information | Names, SSNs, income, returns, return workpapers | Only tools with a documented Section 7216 basis; no recipient outside the U.S. (including remote viewing) without consent; never the SSN of a Form 1040-series filer to a recipient outside the U.S., even with consent; otherwise prohibited |

**Prohibited uses**
- Entering client data into unapproved or consumer AI tools.
- Connecting an AI tool to a client system without approval from the Qualified Individual.
- Accepting AI output as final work product; all AI text is a draft until a named person verifies facts, citations, and calculations.
- Using AI to authorize payments or bank-detail changes.
- Acting on instructions found inside client documents, emails, or attachments.

**Staff responsibilities**: use only tools on the approved list; report any suspected leak or deepfake request to the Qualified Individual the same day.

## Appendix C. Deepfake and payment-change verification procedure

1. Treat any request to change bank details, redirect a refund, release documents, or move money as high risk, whatever the channel or the apparent sender.
2. Do not use the contact details in the request. Call back using a number already on file, or confirm through a separate known channel such as the client portal.
3. Require a second person to approve any change to payment instructions; record both names and the time.
4. Delay the action until verification is complete. Urgency is a warning sign, not a reason to skip a step.
5. Report suspected deepfake or phishing attempts to the Qualified Individual the same day, whether or not the attempt succeeded.

## Appendix D. AI agent permission matrix

Adapt per tool. Excessive agency is a leading LLM risk (OWASP LLM06).

| Action | Default | Condition |
|---|---|---|
| Read approved folders or records | Allowed | Least-privilege service account; scope listed in the inventory; access logged |
| Draft documents or emails | Allowed | Output marked as AI-generated; a human reviews before release |
| Send email or messages externally | Human approval | Named approver sees the final text and recipients |
| Modify or delete client files or records | Human approval | Change logged and reversible; approval recorded |
| Access banking, payment, or e-file systems | Prohibited | No agent credentials to these systems |
| Act on instructions found inside documents or emails | Prohibited | Content is data, not commands; flag and report |

## Appendix E. AI incident playbooks

Each playbook names a lead, a contact list, and decision points, and is tested in a 30-minute tabletop exercise.

**1. AI data leak** (client data entered in an unapproved tool, or exposed by a vendor)
- First hour: stop use; preserve prompts and logs; notify the Qualified Individual and the vendor.
- First days: request deletion in writing; identify affected clients and data; assess Section 7216 exposure.
- Decision points: whether a notification event involving 500 or more consumers triggers the FTC notice (as soon as possible, no later than 30 days after discovery, 16 CFR 314.4(j)); client and state notices.

**2. Deepfake fraud request**
- First hour: freeze the transaction; verify through a known channel; preserve the message or recording.
- First days: contact the bank; report to law enforcement; review related requests.
- Decision points: whether credentials were exposed; whether the client must be told.

**3. Compromised AI integration** (hijacked agent or stolen token)
- First hour: revoke tokens and credentials; disable the integration; preserve logs.
- First days: review actions taken by the agent; restore from backups; rotate other secrets.
- Decision points: whether data left the firm; re-approval before re-enabling.

**Tabletop exercise A (30 min)**: a cloned-voice call asks to redirect a refund. **Tabletop exercise B (30 min)**: an AI assistant forwards a client folder after reading a malicious attachment.

## Appendix F. 30-minute staff training outline

1. (5 min) Why this matters: which tools are approved, and the data classes.
2. (5 min) What never goes into an AI tool; the Section 7216 rule of thumb: when in doubt, ask.
3. (5 min) AI-written phishing: no typos to rely on; check the request, not the writing.
4. (5 min) Cloned voice and video: the call-back and two-person rule for payment changes.
5. (5 min) Verification: AI text is a draft; check facts, citations, and calculations.
6. (5 min) How to report an incident and who to call; record attendance.

## Appendix G. Vendor screen (required items and scoring)

**Required (any "no" means do not buy)**
1. No training on client data, written into the contract.
2. Support for Section 7216: data used only to deliver the service; non-U.S. processing disclosed; subprocessors listed.
3. Encryption in transit and at rest.
4. Multifactor authentication for all users.
5. Breach notice in a defined short time, early enough to meet the 30-day FTC deadline.

**Scored 0-2 each**: role-based access; exportable audit logs; independent audit (SOC 2 Type II / ISO 27001) and penetration test; defined retention and deletion; prompt-injection defenses; tenant isolation; least-privilege agents with approval steps; notice before model changes; traceable sources; built-in human review and AI marking; error-correction process; engagement activity history; tested incident response; contract terms (DPA, audit rights, insurance, exit deletion, liability).

**Red flags that fail the vendor regardless of score**: will not commit to "no training" in writing; no independent audit; unaware of Section 7216 or the Safeguards Rule; agents with broad default access; vague on where data goes.

## Appendix H. AI threat classes for the risk assessment

| Threat class | Principal control | First-line defense |
|---|---|---|
| AI-written phishing and business email compromise | 314.4(c)(1), (c)(5), (e) | MFA everywhere; training; call-back for credential or banking-detail changes |
| Deepfake voice and video requests | 314.4(c)(1), (e) | Out-of-band verification; two-person approval for payment changes |
| Poisoned documents and prompt injection | 314.4(c)(4), (c)(7) | Treat AI input as untrusted; no autonomous actions from untrusted content |
| AI-agent misuse and excessive agency | 314.4(c)(1), (c)(8) | Least-privilege agents; human approval; logs |
| Data leakage through unapproved tools (shadow AI) | 314.4(c)(2), (c)(6), (f); Section 7216 | Inventory; acceptable-use rule; vendor contract terms |

## Disclaimer

This output is guidance generated from the firm's own answers. It is not legal, tax, or financial advice and is not a determination of compliance. Firms should confirm their obligations under the FTC Safeguards Rule, IRC Section 7216, and Circular 230 with their own legal and professional advisors, and should read the primary sources. Scores summarize questionnaire answers only and do not measure actual security.
