"use strict";
/* Run before publishing: fails if any release placeholder remains. node scripts/check-placeholders.js */
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const patterns = [/YOUR-USERNAME/, /<your-username>/, /\[email\]/];
const doiPattern = /zenodo\.XXXXXXX/; // reminder only: the DOI exists only after the first Zenodo release
const skip = new Set(["node_modules", ".git", "site"]);
const bad = [];
(function walk(d) {
  fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
    if (skip.has(e.name)) return;
    const p = path.join(d, e.name);
    if (e.isDirectory()) return walk(p);
    if (/set-placeholders|check-placeholders|RELEASE_CHECKLIST/.test(p)) return;
    const s = fs.readFileSync(p, "utf8");
    patterns.forEach(re => { if (re.test(s)) bad.push(path.relative(root, p) + ": " + re); });
  });
})(root);
if (bad.length) { console.error("Placeholders remain:\n - " + bad.join("\n - ")); process.exit(1); }
console.log("No placeholders remain.");
let doiPending = false;
(function walk(d) { fs.readdirSync(d, { withFileTypes: true }).forEach(e => { if (skip.has(e.name)) return; const p = path.join(d, e.name); if (e.isDirectory()) return walk(p); if (/set-placeholders|check-placeholders|RELEASE_CHECKLIST/.test(p)) return; if (doiPattern.test(fs.readFileSync(p, "utf8"))) doiPending = true; }); })(root);
if (doiPending) console.log("Reminder: add the Zenodo DOI after your first release (docs/RELEASE_CHECKLIST.md, step 5).");
