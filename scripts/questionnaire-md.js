"use strict";
const Q = require("../src/questions.js");
module.exports = function () {
  const L = [`# AI-Aware WISP Builder questionnaire (v${Q.version})`, ``,
    `Answer each question with **yes** (no gap), **partial** (half gap), **no** (full gap), or **na** (excluded). Severity weights: critical = 3, high = 2, moderate = 1. Questions marked *small-firm exempt* are advisory (not scored) for firms with customer information on fewer than 5,000 consumers (16 CFR 314.6).`, ``];
  Q.sections.forEach(s => {
    L.push(`## ${s.title}`, ``, `*${s.ref}*`, ``, `| ID | Question | Citation | Severity | Small-firm exempt |`, `|---|---|---|---|---|`);
    Q.questions.filter(q => q.section === s.id).forEach(q =>
      L.push(`| ${q.id} | ${q.text.replace(/\|/g, "\\|")} | ${q.ref} | ${q.severity} (${q.weight}) | ${q.exemptSmall ? "yes" : "no"} |`));
    L.push(``);
  });
  return L.join("\n");
};
