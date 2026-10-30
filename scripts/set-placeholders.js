"use strict";
/* Fills in the release placeholders in one step.
   Usage: node scripts/set-placeholders.js --username YOUR_GITHUB_NAME --email you@example.com [--doi 10.5281/zenodo.1234567]
   Then run: npm run build && npm test */
const fs = require("fs"), path = require("path");
const args = process.argv.slice(2);
const get = f => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : undefined; };
const username = get("--username"), email = get("--email"), doi = get("--doi");
if (!username || !email) { console.error("Usage: node scripts/set-placeholders.js --username NAME --email ADDRESS [--doi DOI]"); process.exit(2); }
if (!/^[A-Za-z0-9-]+$/.test(username)) { console.error("GitHub usernames contain only letters, digits and hyphens."); process.exit(2); }
if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { console.error("That does not look like an email address."); process.exit(2); }
const root = path.join(__dirname, "..");
const files = ["README.md", "SECURITY.md", "CITATION.cff", ".github/workflows/pages.yml", "docs/RELEASE_CHECKLIST.md"];
files.forEach(f => {
  const p = path.join(root, f); if (!fs.existsSync(p)) return;
  let s = fs.readFileSync(p, "utf8");
  s = s.replace(/YOUR-USERNAME/g, username).replace(/\[email\]/g, email);
  if (f === "CITATION.cff") {
    s = s.replace('# repository-code: "https://github.com/' + username + '/ai-aware-wisp-builder"', 'repository-code: "https://github.com/' + username + '/ai-aware-wisp-builder"');
    if (doi) s = s.replace("# doi: 10.5281/zenodo.XXXXXXX", "doi: " + doi);
  }
  if (f === "README.md" && doi) s = s.replace("(add DOI after the Zenodo release)", "https://doi.org/" + doi);
  fs.writeFileSync(p, s);
});
console.log("Placeholders filled. Now run: npm run build && npm test && node scripts/check-placeholders.js");
