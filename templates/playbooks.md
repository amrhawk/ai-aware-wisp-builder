# AI incident playbooks

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

---
Text licensed CC BY 4.0. Guidance only; not legal advice.
