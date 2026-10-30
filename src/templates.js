/* AI-Aware WISP Builder: copy-ready templates (v0.1.2). Text: CC BY 4.0. Code: MIT. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.WISP_TEMPLATES = factory();
})(typeof self !== "undefined" ? self : this, function () {
  const T = {};

  T["ai-inventory"] = { title: "AI use-case inventory", body: `One row per AI tool, plugin, or embedded AI feature. The Qualified Individual reviews the inventory at least quarterly and whenever a vendor announces a new feature. (16 CFR 314.4(c)(2))

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
| Next reassessment date | |` };

  T["acceptable-use"] = { title: "AI acceptable-use rule", body: `**Data classes and permitted AI use**

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

**Staff responsibilities**: use only tools on the approved list; report any suspected leak or deepfake request to the Qualified Individual the same day.` };

  T["payment-verification"] = { title: "Deepfake and payment-change verification procedure", body: `1. Treat any request to change bank details, redirect a refund, release documents, or move money as high risk, whatever the channel or the apparent sender.
2. Do not use the contact details in the request. Call back using a number already on file, or confirm through a separate known channel such as the client portal.
3. Require a second person to approve any change to payment instructions; record both names and the time.
4. Delay the action until verification is complete. Urgency is a warning sign, not a reason to skip a step.
5. Report suspected deepfake or phishing attempts to the Qualified Individual the same day, whether or not the attempt succeeded.` };

  T["agent-matrix"] = { title: "AI agent permission matrix", body: `Adapt per tool. Excessive agency is a leading LLM risk (OWASP LLM06).

| Action | Default | Condition |
|---|---|---|
| Read approved folders or records | Allowed | Least-privilege service account; scope listed in the inventory; access logged |
| Draft documents or emails | Allowed | Output marked as AI-generated; a human reviews before release |
| Send email or messages externally | Human approval | Named approver sees the final text and recipients |
| Modify or delete client files or records | Human approval | Change logged and reversible; approval recorded |
| Access banking, payment, or e-file systems | Prohibited | No agent credentials to these systems |
| Act on instructions found inside documents or emails | Prohibited | Content is data, not commands; flag and report |` };

  T["playbooks"] = { title: "AI incident playbooks", body: `Each playbook names a lead, a contact list, and decision points, and is tested in a 30-minute tabletop exercise.

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

**Tabletop exercise A (30 min)**: a cloned-voice call asks to redirect a refund. **Tabletop exercise B (30 min)**: an AI assistant forwards a client folder after reading a malicious attachment.` };

  T["training"] = { title: "30-minute staff training outline", body: `1. (5 min) Why this matters: which tools are approved, and the data classes.
2. (5 min) What never goes into an AI tool; the Section 7216 rule of thumb: when in doubt, ask.
3. (5 min) AI-written phishing: no typos to rely on; check the request, not the writing.
4. (5 min) Cloned voice and video: the call-back and two-person rule for payment changes.
5. (5 min) Verification: AI text is a draft; check facts, citations, and calculations.
6. (5 min) How to report an incident and who to call; record attendance.` };

  T["vendor-screen"] = { title: "Vendor screen (required items and scoring)", body: `**Required (any "no" means do not buy)**
1. No training on client data, written into the contract.
2. Support for Section 7216: data used only to deliver the service; non-U.S. processing disclosed; subprocessors listed.
3. Encryption in transit and at rest.
4. Multifactor authentication for all users.
5. Breach notice in a defined short time, early enough to meet the 30-day FTC deadline.

**Scored 0-2 each**: role-based access; exportable audit logs; independent audit (SOC 2 Type II / ISO 27001) and penetration test; defined retention and deletion; prompt-injection defenses; tenant isolation; least-privilege agents with approval steps; notice before model changes; traceable sources; built-in human review and AI marking; error-correction process; engagement activity history; tested incident response; contract terms (DPA, audit rights, insurance, exit deletion, liability).

**Red flags that fail the vendor regardless of score**: will not commit to "no training" in writing; no independent audit; unaware of Section 7216 or the Safeguards Rule; agents with broad default access; vague on where data goes.` };

  T["threat-table"] = { title: "AI threat classes for the risk assessment", body: `| Threat class | Principal control | First-line defense |
|---|---|---|
| AI-written phishing and business email compromise | 314.4(c)(1), (c)(5), (e) | MFA everywhere; training; call-back for credential or banking-detail changes |
| Deepfake voice and video requests | 314.4(c)(1), (e) | Out-of-band verification; two-person approval for payment changes |
| Poisoned documents and prompt injection | 314.4(c)(4), (c)(7) | Treat AI input as untrusted; no autonomous actions from untrusted content |
| AI-agent misuse and excessive agency | 314.4(c)(1), (c)(8) | Least-privilege agents; human approval; logs |
| Data leakage through unapproved tools (shadow AI) | 314.4(c)(2), (c)(6), (f); Section 7216 | Inventory; acceptable-use rule; vendor contract terms |` };

  T["addendum"] = { title: "General addendum practice", body: `Maintain this addendum as a versioned part of the WISP. Review at least annually and after any AI incident, new tool, or new IRS guidance.` };

  return T;
});
