# Security policy

AI-Aware WISP Builder is a small tool that helps firms assess their own security controls, so we take its security seriously.

## Reporting a vulnerability (please do not open a public issue)

Use **GitHub private vulnerability reporting**: on the repository page, open the **Security** tab and choose **Report a vulnerability**. This creates a private advisory visible only to you and the maintainer.

If you cannot use GitHub, email **Araza7@hawk.iit.edu** with the subject line "AI-Aware WISP Builder security". Please do not include real firm or client data in a report.

Include, where you can: the version (shown in the page header and `package.json`), the browser and operating system, steps to reproduce, and what you expected to happen. A short proof of concept helps.

## What to expect

This is a volunteer, non-commercial project. The maintainer aims to acknowledge a report within 7 days and to tell you what will be done within 30 days. These are goals, not guarantees. Please allow a reasonable time to fix a problem before disclosing it publicly; we will credit you in the release notes if you wish.

## Supported versions

Only the latest release receives fixes.

## What counts as a vulnerability

- Any way for the web app to send answers or generated documents to another party (network request, form submission, outside resource load), or to store them without the user's action.
- Weaknesses in the Content-Security-Policy (`web/index.html`, `web/csp-selftest.html`) or a self-test that reports PASS when the policy is not enforced.
- Cross-site scripting or HTML injection: for example, content in a firm name, an imported answers file, or a template that runs script or changes the page when rendered.
- Markdown or file-output injection that could mislead a reader of a generated document (for example, forged table rows).
- Path traversal or unsafe file writes in the command-line tool, or an unsafe change that a helper script could make to files outside the project.
- Tampering risks in the build, release, or Pages workflow (for example, an action that can be abused).

## What does not count

- Regulatory or legal accuracy of the questions and templates. Please report these as ordinary issues, citing the primary source (see `CONTRIBUTING.md`).
- Scores or advice you disagree with. Scores summarize self-reported answers and are not a compliance determination.
- Browsers that do not enforce Content-Security-Policy, or attacks that need control of the user's device, browser extensions, or network.
- A tampered copy of the page obtained from somewhere other than the official repository. (A content-security policy cannot protect against a modified page; see `docs/PRIVACY.md`.)

## Design notes useful to researchers

- No dependencies; no build step at run time; no network requests by design.
- The web app escapes HTML before rendering generated Markdown (`md()` in `web/app.js`).
- `npm test` includes checks that the page references no outside addresses and carries the exact policy.
