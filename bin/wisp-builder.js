#!/usr/bin/env node
/* AI-Aware WISP Builder CLI (v0.1.2). Local files only; makes no network requests. MIT License. */
"use strict";
const fs = require("fs");
const path = require("path");
const E = require("../src/engine.js");
const Q = require("../src/questions.js");

function usage() {
  console.log(`AI-Aware WISP Builder ${Q.version}

Usage:
  wisp-builder --blank > answers.json            Write a blank answers file
  wisp-builder --answers answers.json --out dir  Generate addendum.md and gap-report.md in dir
  wisp-builder --answers answers.json --out dir --strict   Fail if any question is unanswered
  wisp-builder --migrate old-answers.json > new.json   Upgrade an answers file from an earlier version
  wisp-builder --questions                       Print the questionnaire as Markdown

answers.json: { "profile": { "firmName", "qualifiedIndividual", "consumers": "lt5000"|"gte5000"|"unknown", "headcount", "date" },
                "answers": { "GOV-1": "yes"|"partial"|"no"|"na", ... } }`);
}

const args = process.argv.slice(2);
const get = f => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : undefined; };
const has = f => args.includes(f);

if (has("--help") || args.length === 0) { usage(); process.exit(0); }
if (has("--blank")) { console.log(JSON.stringify(E.blankAnswers(), null, 2)); process.exit(0); }
if (has("--questions")) { console.log(require("../scripts/questionnaire-md.js")()); process.exit(0); }

if (has("--migrate")) {
  const f = get("--migrate");
  let d; try { d = JSON.parse(fs.readFileSync(f, "utf8")); } catch (e) { console.error("Could not read file: " + e.message); process.exit(2); }
  const e0 = E.validate(d); if (e0.length) { console.error("Invalid answers file:\n - " + e0.join("\n - ")); process.exit(2); }
  const m = E.migrate(d); m.notes.forEach(n => console.error("Note: " + n));
  console.log(JSON.stringify(m.input, null, 2)); process.exit(0);
}

const file = get("--answers"), out = get("--out");
if (!file || !out) { usage(); process.exit(2); }
let input;
try { input = JSON.parse(fs.readFileSync(file, "utf8")); }
catch (e) { console.error("Could not read answers file: " + e.message); process.exit(2); }
const errors = E.validate(input);
if (errors.length) { console.error("Invalid answers file:\n - " + errors.join("\n - ")); process.exit(2); }
{ const m = E.migrate(input); m.notes.forEach(n => console.error("Note: " + n)); input = m.input; }
const res = E.evaluate(input);
if (has("--strict") && res.unanswered.length) {
  console.error(res.unanswered.length + " unanswered question(s): " + res.unanswered.map(q => q.id).join(", "));
  process.exit(3);
}
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, "addendum.md"), E.addendum(input, res));
fs.writeFileSync(path.join(out, "gap-report.md"), E.gapReport(input, res));
console.log(`Wrote ${path.join(out, "addendum.md")} and ${path.join(out, "gap-report.md")}`);
console.log(`Overall: ${res.overall === null ? "n/a" : res.overall + "/100"} (${res.overallBand}); critical gaps: ${res.criticalGaps}; unanswered: ${res.unanswered.length}`);
