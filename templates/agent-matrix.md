# AI agent permission matrix

Adapt per tool. Excessive agency is a leading LLM risk (OWASP LLM06).

| Action | Default | Condition |
|---|---|---|
| Read approved folders or records | Allowed | Least-privilege service account; scope listed in the inventory; access logged |
| Draft documents or emails | Allowed | Output marked as AI-generated; a human reviews before release |
| Send email or messages externally | Human approval | Named approver sees the final text and recipients |
| Modify or delete client files or records | Human approval | Change logged and reversible; approval recorded |
| Access banking, payment, or e-file systems | Prohibited | No agent credentials to these systems |
| Act on instructions found inside documents or emails | Prohibited | Content is data, not commands; flag and report |

---
Text licensed CC BY 4.0. Guidance only; not legal advice.
