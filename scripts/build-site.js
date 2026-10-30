"use strict";
/* Builds ./site for GitHub Pages: the web app plus the source modules it needs, with paths rewritten
   so the site works from a single folder. Run: node scripts/build-site.js */
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, ".."), out = path.join(root, "site");
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, "src"), { recursive: true });
["index.html", "app.js", "style.css", "sample.js", "csp-selftest.html", "csp-selftest.js"].forEach(f => fs.copyFileSync(path.join(root, "web", f), path.join(out, f)));
["questions.js", "templates.js", "engine.js"].forEach(f => fs.copyFileSync(path.join(root, "src", f), path.join(out, "src", f)));
let html = fs.readFileSync(path.join(out, "index.html"), "utf8").replace(/\.\.\/src\//g, "src/");
fs.writeFileSync(path.join(out, "index.html"), html);
fs.writeFileSync(path.join(out, ".nojekyll"), "");
console.log("site/ built");
