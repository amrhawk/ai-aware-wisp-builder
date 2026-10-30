# AI-Aware WISP Gap Report

**Firm:** Harbor Lane Tax & Accounting LLC (fictional)  
**Qualified Individual:** Jordan Ellis (fictional)  
**Date:** 2026-10-27  
**Size tier:** solo (1-5)  
**Builder version:** 0.1.2

## Summary

- Overall readiness score: **30/100** (significant gaps).
- Questions answered: 46 of 46.
- Critical gaps (full): **5**. Total scored gaps: 35. Advisory items: 5.
- The firm reports customer information on fewer than 5,000 consumers. Under 16 CFR 314.6, 314.4(b)(1), (d)(2), (h), and (i) do not apply; questions tied to those provisions are shown as advisory and are not scored.

## Scores by element

| Element | Citation | Score | Status |
|---|---|---|---|
| Governance and Qualified Individual | 16 CFR 314.4(a) | 100 | strong |
| Risk assessment | 16 CFR 314.4(b) | 0 | significant gaps |
| Access controls | 16 CFR 314.4(c)(1) | 19 | significant gaps |
| Asset management and AI inventory | 16 CFR 314.4(c)(2) | 25 | significant gaps |
| Encryption | 16 CFR 314.4(c)(3) | 100 | strong |
| Secure development and external applications | 16 CFR 314.4(c)(4) | 0 | significant gaps |
| Multifactor authentication | 16 CFR 314.4(c)(5) | 50 | significant gaps |
| Data disposal and retention | 16 CFR 314.4(c)(6) | 17 | significant gaps |
| Change management | 16 CFR 314.4(c)(7) | 0 | significant gaps |
| Monitoring and logging | 16 CFR 314.4(c)(8) | 50 | significant gaps |
| Testing and monitoring | 16 CFR 314.4(d) | 0 | significant gaps |
| Training | 16 CFR 314.4(e) | 30 | significant gaps |
| Service providers (AI vendors) | 16 CFR 314.4(f) | 15 | significant gaps |
| Keeping the program current | 16 CFR 314.4(g) | 50 | significant gaps |
| Incident response | 16 CFR 314.4(h) | n/a | not scored |
| Report to leadership | 16 CFR 314.4(i) | n/a | not scored |
| FTC notification | 16 CFR 314.4(j) | 30 | significant gaps |
| Tax return information (Section 7216) | IRC 6713, 7216; Treas. Reg. 301.7216-1 to -3 | 13 | significant gaps |
| Professional duties (OPR Issue 2026-19) | Circular 230 10.22, 10.27(a), 10.35, 10.36, 10.37, 10.51(a)(15) | 46 | significant gaps |
| AI-enabled threats | 16 CFR 314.4(c)(1), (e); OWASP LLM Top 10 (2025) | 21 | significant gaps |

## Gaps, most severe first

### 1. [CRITICAL] ACC-2: Gap

**Question:** Do AI agents, plugins, and integrations run under least-privilege accounts (not an administrator's or partner's credentials)?  
**Citation:** 314.4(c)(1)  
**Why it matters:** Excessive agency (OWASP LLM06) lets one hijacked or mistaken agent reach everything the account can reach.  
**Fix:** Create dedicated service accounts with the minimum scope; document them in the agent permission matrix.  
**Template:** AI agent permission matrix

### 2. [CRITICAL] T7216-1: Gap

**Question:** For each AI tool that touches tax return information, has the firm documented what data is sent, what the vendor does with it, where it is processed, and the basis for concluding the disclosure is permitted?  
**Citation:** IRC 7216; Reg. 301.7216-2  
**Why it matters:** Sending return information to an AI vendor can be a disclosure or use restricted by Section 7216. Whether an exception applies is a legal question.  
**Fix:** Complete the Section 7216 analysis for each tool and have a tax attorney or 7216-experienced CPA review it.  
**Template:** Vendor screen (required items and scoring)

### 3. [CRITICAL] T7216-3: Gap

**Question:** Does the firm ensure that no return information goes to a recipient outside the United States (including remote viewing from abroad of data stored in the U.S.) without the required taxpayer consent?  
**Citation:** Reg. 301.7216-2(d), Example 3; 301.7216-3  
**Why it matters:** Disclosure outside the U.S., including a contractor abroad viewing data on a U.S. server, requires taxpayer consent first.  
**Fix:** Require vendors to disclose non-U.S. processing and support access; block tools that send return information abroad unless consent is obtained and documented.  
**Template:** Vendor screen (required items and scoring)

### 4. [CRITICAL] T7216-4: Gap

**Question:** Does the firm ensure that the Social Security number of a Form 1040-series filer never goes to a recipient outside the United States, even with the taxpayer's consent?  
**Citation:** Reg. 301.7216-3(b)(4)  
**Why it matters:** The regulations provide that consent cannot be obtained to disclose the SSN of a Form 1040-series filer to a return preparer located outside the United States.  
**Fix:** Block non-U.S. recipients (including offshore support and remote viewing) from any field or file containing SSNs of Form 1040-series filers; do not rely on consent for this.  
**Template:** Vendor screen (required items and scoring)

### 5. [CRITICAL] VEN-1: Gap

**Question:** Does the firm assess each AI vendor's security before approval using a documented screen?  
**Citation:** 314.4(f)(1)  
**Why it matters:** The firm must take reasonable steps to select service providers that can maintain appropriate safeguards. OPR recommends vetting third parties' AI offerings when or before purchasing.  
**Fix:** Use the vendor screen; any 'no' on a required item means do not buy.  
**Template:** Vendor screen (required items and scoring)

### 6. [CRITICAL] ACC-1: Partial

**Question:** Is access to each AI tool limited by role to the staff who need it?  
**Citation:** 314.4(c)(1)  
**Why it matters:** Access controls must authenticate users and limit access to what each person needs.  
**Fix:** Configure role-based access in each tool; remove shared logins; review access quarterly.  
**Template:** General addendum practice

### 7. [CRITICAL] AST-1: Partial

**Question:** Does the firm keep an inventory of every AI tool, plugin, and AI feature embedded in existing software?  
**Citation:** 314.4(c)(2)  
**Why it matters:** You cannot protect or assess what you have not identified. OPR notes that virtually all tax firms use some form of AI, aware of it or not.  
**Fix:** Build the AI use-case inventory from the template; include features inside existing software and anything staff use personally.  
**Template:** AI use-case inventory

### 8. [CRITICAL] FTC-1: Partial

**Question:** Does the firm know that an incident involving unencrypted information of 500 or more consumers requires notice to the FTC as soon as possible and within 30 days of discovery?  
**Citation:** 314.4(j)  
**Why it matters:** Notification is required for a notification event involving at least 500 consumers.  
**Fix:** Document the 30-day FTC notice step in the incident procedure with a named person responsible.  
**Template:** AI incident playbooks

### 9. [CRITICAL] MFA-1: Partial

**Question:** Is multifactor authentication enforced on every AI tool and every system an AI integration connects to?  
**Citation:** 314.4(c)(5)  
**Why it matters:** MFA is required for any individual accessing any information system, unless the Qualified Individual approves an equivalent control in writing.  
**Fix:** Enable MFA on all accounts in the inventory; record any written exception approved by the Qualified Individual.  
**Template:** General addendum practice

### 10. [CRITICAL] OPR-6: Partial

**Question:** Does the acceptable-use rule forbid entering client data into consumer or unapproved AI tools, and is that rule enforced?  
**Citation:** Circ. 230 10.51(a)(15); IRC 6713, 7216  
**Why it matters:** OPR: use only secure, enterprise-approved AI for client data; never upload sensitive data to unsecured sites.  
**Fix:** Adopt the acceptable-use rule and data classes; block unapproved tools where possible.  
**Template:** AI acceptable-use rule

### 11. [CRITICAL] T7216-2: Partial

**Question:** Where a tool's use or disclosure of return information needs taxpayer consent, does the firm obtain a compliant consent (see Rev. Proc. 2013-14) before using the tool?  
**Citation:** Reg. 301.7216-3  
**Why it matters:** Consent must meet the regulations' form and content rules.  
**Fix:** Use compliant consent language, obtain it before use, and retain it.  
**Template:** Vendor screen (required items and scoring)

### 12. [CRITICAL] THR-1: Partial

**Question:** Is there a call-back verification and two-person approval rule for any change to bank details, refund destination, or payment instructions, whatever the channel?  
**Citation:** 314.4(c)(1), (e)  
**Why it matters:** Voice and video can be cloned; recognizing a voice no longer authenticates a person.  
**Fix:** Adopt the payment-change verification procedure; train all staff.  
**Template:** Deepfake and payment-change verification procedure

### 13. [CRITICAL] TRN-1: Partial

**Question:** Has every staff member been trained on approved AI tools, prohibited uses, and what client data may never enter an AI tool?  
**Citation:** 314.4(e)  
**Why it matters:** Staff action is the most common route for client data into AI tools. OPR recommends training all staff on AI risks and requirements.  
**Fix:** Run the 30-minute training outline; keep the attendance roster; repeat annually and at onboarding.  
**Template:** 30-minute staff training outline

### 14. [CRITICAL] VEN-2: Partial

**Question:** Do AI vendor contracts prohibit training on client data (in writing) and require safeguards, confidentiality, and breach notice?  
**Citation:** 314.4(f)(2)  
**Why it matters:** Safeguards must be required by contract.  
**Fix:** Add no-training, confidentiality, security, and breach-notice clauses; refuse vendors that will not commit in writing.  
**Template:** Vendor screen (required items and scoring)

### 15. [HIGH] ACC-3: Gap

**Question:** Do sensitive agent actions (sending email externally, changing or deleting client records) require human approval?  
**Citation:** 314.4(c)(1)  
**Why it matters:** Human approval limits the damage from prompt injection and agent mistakes.  
**Fix:** Adopt the agent permission matrix; require named human approval for external sends and record changes.  
**Template:** AI agent permission matrix

### 16. [HIGH] AST-2: Gap

**Question:** Does the inventory record, for each tool, the data classes it processes and whether it can take actions?  
**Citation:** 314.4(c)(2)  
**Why it matters:** Data class and action capability drive the controls each tool needs.  
**Fix:** Add data-class and action-capability fields to the inventory.  
**Template:** AI use-case inventory

### 17. [HIGH] CHG-1: Gap

**Question:** Does the firm have a procedure for reviewing vendor model changes and newly enabled AI features before they go live for client data?  
**Citation:** 314.4(c)(7)  
**Why it matters:** Change management is a required safeguard; AI vendors can change models and features without a firm decision.  
**Fix:** Require vendor notice of model changes; disable new AI features by default until reviewed.  
**Template:** General addendum practice

### 18. [HIGH] DEV-2: Gap

**Question:** Are external AI applications evaluated for security before use (not just purchased)?  
**Citation:** 314.4(c)(4)  
**Why it matters:** The rule requires procedures for evaluating the security of externally developed applications used with customer information.  
**Fix:** Run the vendor screen before approval and record the result in the inventory.  
**Template:** Vendor screen (required items and scoring)

### 19. [HIGH] DSP-1: Gap

**Question:** Does the firm delete chat histories, transcripts, uploads, and vendor-retained data no later than two years after last use (subject to the rule's listed exceptions)?  
**Citation:** 314.4(c)(6)  
**Why it matters:** Customer information must be securely disposed of no later than two years after last use, with exceptions. AI tools create new copies (chats, transcripts, embeddings).  
**Fix:** Set retention in each tool; request vendor deletion in writing; add AI-generated records to the retention policy.  
**Template:** General addendum practice

### 20. [HIGH] FTC-2: Gap

**Question:** Do AI vendor contracts require breach notice fast enough for the firm to meet the 30-day FTC deadline?  
**Citation:** 314.4(j)  
**Why it matters:** A vendor that notifies late can make the firm miss its own deadline.  
**Fix:** Add a defined, short notification period and an information-sharing clause to vendor contracts.  
**Template:** Vendor screen (required items and scoring)

### 21. [HIGH] OPR-3: Gap

**Question:** Does the firm have written AI policies and procedures, including data handling and accuracy monitoring, covering all members and staff?  
**Citation:** Circ. 230 10.36  
**Why it matters:** Firm leaders must take reasonable steps to ensure adequate compliance procedures.  
**Fix:** Adopt the AI addendum and acceptable-use rule; assign an owner; review annually.  
**Template:** AI acceptable-use rule

### 22. [HIGH] OPR-5: Gap

**Question:** Does the firm record how AI was used and verified on each engagement, and keep a log of AI errors and their correction?  
**Citation:** OPR 2026-19 (documentation)  
**Why it matters:** OPR recommends documenting AI use and verification and having procedures for errors.  
**Fix:** Add an AI-use line to the engagement file and keep an AI error log.  
**Template:** General addendum practice

### 23. [HIGH] THR-2: Gap

**Question:** Is content from clients (documents, emails, attachments) treated as untrusted input by AI tools, with no tool allowed to act on instructions found inside it?  
**Citation:** OWASP LLM01  
**Why it matters:** Prompt injection (OWASP LLM01) hides instructions in documents that AI tools may follow.  
**Fix:** Disable autonomous actions from untrusted content; test approved tools with a benign injection document.  
**Template:** AI agent permission matrix

### 24. [HIGH] THR-3: Gap

**Question:** Does the firm have a way to detect unapproved ('shadow') AI use, such as periodic surveys, browser or network controls, or expense review?  
**Citation:** 314.4(c)(2), (e)  
**Why it matters:** Staff using consumer AI accounts is a leading route for client data leakage.  
**Fix:** Run an anonymous staff survey quarterly; add approved alternatives so staff do not need shadow tools.  
**Template:** AI acceptable-use rule

### 25. [HIGH] TRN-2: Gap

**Question:** Does training cover AI-written phishing and cloned-voice or video requests?  
**Citation:** 314.4(e)  
**Why it matters:** AI removes the typos and awkward phrasing staff used to rely on to spot phishing.  
**Fix:** Add current AI phishing and deepfake examples to training; practice with the tabletop scenarios.  
**Template:** 30-minute staff training outline

### 26. [HIGH] VEN-3: Gap

**Question:** Does the firm know where each AI vendor stores and processes data, and which subprocessors or model providers receive it?  
**Citation:** 314.4(f)(2)  
**Why it matters:** Location and subprocessors determine Section 7216 consent needs and vendor risk.  
**Fix:** Obtain a subprocessor list and data-location statement for each vendor; record them in the inventory.  
**Template:** Vendor screen (required items and scoring)

### 27. [HIGH] VEN-4: Gap

**Question:** Is each AI vendor reassessed periodically (at least annually) and recorded in the WISP?  
**Citation:** 314.4(f)(3)  
**Why it matters:** The firm must periodically assess service providers based on risk.  
**Fix:** Set an annual vendor reassessment date in the inventory; the Qualified Individual owns the review.  
**Template:** Vendor screen (required items and scoring)

### 28. [HIGH] LOG-1: Partial

**Question:** Can the firm see and export logs of who used each AI tool and what each agent or integration did?  
**Citation:** 314.4(c)(8)  
**Why it matters:** The rule requires monitoring and logging of authorized users' activity and detecting unauthorized access or tampering.  
**Fix:** Enable audit logging; confirm export rights with each vendor; retain logs per the retention policy.  
**Template:** Vendor screen (required items and scoring)

### 29. [HIGH] OPR-2: Partial

**Question:** Do the practitioners who use AI understand each tool's limits, risks, and potential for bias or error?  
**Citation:** Circ. 230 10.35  
**Why it matters:** Competence includes understanding the technology used.  
**Fix:** Brief users on each approved tool's limits; record approved uses in the inventory.  
**Template:** 30-minute staff training outline

### 30. [MODERATE] AST-3: Gap

**Question:** Is the inventory reviewed at least quarterly and whenever a vendor announces a new AI feature?  
**Citation:** 314.4(c)(2)  
**Why it matters:** Vendors often switch on AI features through updates rather than firm decisions.  
**Fix:** Schedule a quarterly inventory review and subscribe to vendor release notes.  
**Template:** AI use-case inventory

### 31. [MODERATE] RISK-2: Gap

**Question:** Is the risk assessment re-run when an AI tool is added, or when a vendor changes its model or features?  
**Citation:** 314.4(b)(2)  
**Why it matters:** Risk assessments must be reassessed periodically as conditions change.  
**Fix:** Add 'new or changed AI tool' as a trigger for reassessment in the WISP change procedure.  
**Template:** General addendum practice

### 32. [MODERATE] TST-1: Gap

**Question:** Are key controls for AI tools (MFA, access, logging) checked on a regular schedule?  
**Citation:** 314.4(d)(1)  
**Why it matters:** Key controls must be regularly tested or monitored.  
**Fix:** Add AI tools to the periodic control check; sample two tools per quarter.  
**Template:** General addendum practice

### 33. [MODERATE] CUR-1: Partial

**Question:** Does the firm update the WISP when AI tools, threats, or guidance change?  
**Citation:** 314.4(g)  
**Why it matters:** The program must be evaluated and adjusted as circumstances change.  
**Fix:** Version the AI addendum; review it at least annually and after any AI incident or new OPR guidance.  
**Template:** General addendum practice

### 34. [MODERATE] DSP-2: Partial

**Question:** Can the firm request and confirm deletion of its data from each AI vendor, including at contract end?  
**Citation:** 314.4(c)(6)  
**Why it matters:** Deletion rights must be usable in practice.  
**Fix:** Add deletion on request and deletion at exit, with written confirmation, to every AI vendor contract.  
**Template:** Vendor screen (required items and scoring)

### 35. [MODERATE] OPR-4: Partial

**Question:** Does the firm bill fairly for AI-assisted work (no billing for time not spent) and address AI use and efficiencies in engagement terms?  
**Citation:** Circ. 230 10.27(a)  
**Why it matters:** OPR: unconscionable fees violate 10.27(a); efficiency gains should be passed on openly.  
**Fix:** Review billing practice for AI-assisted work; add AI language to engagement letters.  
**Template:** General addendum practice

## Advisory items (not scored for this firm under 16 CFR 314.6)

- **IR-1** (314.4(h); high): Add the three AI playbooks to the incident response plan and assign a lead for each.
- **RISK-1** (314.4(b)(1); high): Add the five AI threat classes (data leakage, AI phishing, deepfakes, poisoned documents, agent misuse) to the written risk assessment with a mitigate-or-accept decision for each.
- **IR-2** (314.4(h); moderate): Run one 30-minute tabletop from the templates and record lessons learned.
- **RPT-1** (314.4(i); moderate): Add an AI section to the annual report using the program metrics.
- **TST-2** (314.4(d)(2); moderate): Include AI integrations and exposed endpoints in the testing scope; request vendors' penetration-test summaries.

## Suggested metrics to track

Percentage of AI tools inventoried; MFA coverage across AI tools; percentage of vendors that completed the vendor screen; vendors with written no-training commitments; payment-change verifications completed as a share of requests; staff completing AI training; AI-related incidents and near-misses per quarter; AI-assisted work products with documented human review.

## Disclaimer

This output is guidance generated from the firm's own answers. It is not legal, tax, or financial advice and is not a determination of compliance. Firms should confirm their obligations under the FTC Safeguards Rule, IRC Section 7216, and Circular 230 with their own legal and professional advisors, and should read the primary sources. Scores summarize questionnaire answers only and do not measure actual security.
