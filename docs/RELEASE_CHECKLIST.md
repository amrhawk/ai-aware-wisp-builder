# Release checklist

Complete these before announcing the project or citing it in a paper.

1. **Create the repository** on GitHub named `ai-aware-wisp-builder` (public) and push this folder's contents to the `main` branch.
2. **Fill in the placeholders** (your GitHub username, your contact email, and later the DOI):
   ```bash
   node scripts/set-placeholders.js --username YOUR_GITHUB_NAME --email you@example.com
   npm run build && npm test && node scripts/check-placeholders.js
   ```
   Commit and push.
3a. **Turn on private vulnerability reporting** (Settings > Code security > Private vulnerability reporting: Enable), so `SECURITY.md` works as written. Also set the email address in `SECURITY.md` through step 2.
3. **Turn on GitHub Pages:** repository Settings > Pages > Build and deployment > Source: **GitHub Actions**. After the `pages` workflow runs, the app is live at `https://YOUR_GITHUB_NAME.github.io/ai-aware-wisp-builder/`. Open that link and run the sample firm to confirm.
4. **Check the live page**: open `csp-selftest.html` on the live site in Chrome, Firefox, and Safari (it should say PASS), then open the browser's developer tools, Network tab, load the page, click "Load fictional sample firm" and "Generate", and confirm there are no requests other than the page's own files.
5. **Zenodo DOI:** link the GitHub repository at zenodo.org, create a GitHub release `v0.1.2`, then add the DOI:
   ```bash
   node scripts/set-placeholders.js --username YOUR_GITHUB_NAME --email you@example.com --doi 10.5281/zenodo.NNNNNNN
   ```
6. **Paper:** insert the repository link (or the Pages link) where the manuscript has the repository-URL placeholder; update the sentence saying the tool has not been released.
7. **Employer and IP:** confirm in writing that your firm approves how your role is described and that this work is yours to publish; build only on personal time and equipment; no firm data, policies, or incidents.
8. **Pilot:** run `docs/PILOT_PROTOCOL.md` with 3-5 outside firms before filling in results anywhere. Publish only real numbers.
9. **Expert review:** ask a tax attorney or a CPA who specializes in Section 7216 to review the Section 7216 questions, and a practicing Qualified Individual to review the wording and severity weights.
