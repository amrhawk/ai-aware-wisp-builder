"use strict";
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const E = require("../src/engine.js");
const Q = require("../src/questions.js");
const T = require("../src/templates.js");

const sample = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "examples", "sample-answers-5-person-firm.json"), "utf8"));
const all = (val, consumers) => ({ profile: { firmName: "X", consumers: consumers || "gte5000", headcount: 3, date: "2026-01-01" },
  answers: Object.fromEntries(Q.questions.map(q => [q.id, val])) });

test("question data is well formed", () => {
  const ids = new Set();
  Q.questions.forEach(q => {
    assert.ok(!ids.has(q.id), "duplicate id " + q.id); ids.add(q.id);
    assert.ok(Q.sections.some(s => s.id === q.section), "bad section " + q.id);
    assert.ok(["critical", "high", "moderate"].includes(q.severity));
    assert.strictEqual(q.weight, Q.weights[q.severity]);
    assert.ok(q.ref && q.text && q.why && q.fix);
    assert.ok(T[q.template], "missing template " + q.template + " for " + q.id);
  });
});

test("small-firm exemption flags match 16 CFR 314.6 (314.4(b)(1), (d)(2), (h), (i))", () => {
  const flagged = Q.questions.filter(q => q.exemptSmall).map(q => q.ref);
  flagged.forEach(r => assert.ok(/^314\.4\((b\)\(1|d\)\(2|h|i)\)/.test(r), "unexpected exempt ref " + r));
  Q.questions.filter(q => /^314\.4\((h|i)\)/.test(q.ref) || q.ref === "314.4(b)(1)" || q.ref === "314.4(d)(2)")
    .forEach(q => assert.strictEqual(q.exemptSmall, true, q.id + " should be exempt-flagged"));
  Q.questions.filter(q => q.exemptSmall).forEach(q => assert.ok(["RISK-1", "TST-2", "IR-1", "IR-2", "RPT-1"].includes(q.id)));
});

test("all yes scores 100 with no gaps", () => {
  const r = E.evaluate(all("yes"));
  assert.strictEqual(r.overall, 100); assert.strictEqual(r.gaps.length, 0); assert.strictEqual(r.criticalGaps, 0);
});

test("all no scores 0 and counts critical gaps", () => {
  const r = E.evaluate(all("no"));
  assert.strictEqual(r.overall, 0);
  assert.strictEqual(r.criticalGaps, Q.questions.filter(q => q.severity === "critical").length);
});

test("partial is half a gap", () => {
  const r = E.evaluate(all("partial"));
  assert.strictEqual(r.overall, 50);
});

test("na is excluded from scoring", () => {
  const input = all("yes"); input.answers["GOV-1"] = "na";
  const r = E.evaluate(input);
  assert.strictEqual(r.overall, 100);
  const gov = r.sections.find(s => s.id === "GOV");
  assert.strictEqual(gov.scored, 1);
});

test("exempt questions become advisory for firms with fewer than 5,000 consumers", () => {
  const small = E.evaluate(all("no", "lt5000"));
  const big = E.evaluate(all("no", "gte5000"));
  assert.strictEqual(small.advisory.length, 5);
  assert.strictEqual(big.advisory.length, 0);
  assert.strictEqual(small.gaps.length, big.gaps.length - 5);
  assert.strictEqual(small.sections.find(s => s.id === "IR").score, null);
  assert.strictEqual(small.sections.find(s => s.id === "RPT").score, null);
});

test("unknown consumer count is scored conservatively (not exempt)", () => {
  assert.strictEqual(E.evaluate(all("no", "unknown")).advisory.length, 0);
});

test("unanswered questions are listed and not scored", () => {
  const input = all("yes"); delete input.answers["MFA-1"]; input.answers["ACC-1"] = "";
  const r = E.evaluate(input);
  assert.deepStrictEqual(r.unanswered.map(q => q.id).sort(), ["ACC-1", "MFA-1"]);
  assert.strictEqual(r.answered, Q.questions.length - 2);
});

test("gaps are ordered by severity, then full gaps before partial", () => {
  const r = E.evaluate(sample);
  const order = { critical: 0, high: 1, moderate: 2 };
  for (let i = 1; i < r.gaps.length; i++) {
    const a = r.gaps[i - 1], b = r.gaps[i];
    assert.ok(order[a.q.severity] <= order[b.q.severity]);
    if (a.q.severity === b.q.severity) assert.ok(a.gap >= b.gap);
  }
});

test("validation catches bad input", () => {
  assert.ok(E.validate({ profile: {}, answers: {} }).length >= 2);
  const bad = all("yes"); bad.answers["ZZZ-9"] = "yes"; bad.answers["GOV-1"] = "maybe";
  const errs = E.validate(bad);
  assert.ok(errs.some(e => /unknown question id/.test(e)) && errs.some(e => /invalid answer/.test(e)));
  assert.deepStrictEqual(E.validate(sample), []);
});

test("blank answers file validates once a firm name is given and evaluates as all unanswered", () => {
  const b = E.blankAnswers(); b.profile.firmName = "X";
  assert.deepStrictEqual(E.validate(b), []);
  const r = E.evaluate(b);
  assert.strictEqual(r.overall, null); assert.strictEqual(r.unanswered.length, Q.questions.length);
});

test("generated documents contain required parts", () => {
  const r = E.evaluate(sample);
  const gap = E.gapReport(sample, r), add = E.addendum(sample, r);
  assert.match(gap, /# AI-Aware WISP Gap Report/);
  assert.match(gap, /16 CFR 314\.6/);
  assert.match(gap, /not legal, tax, or financial advice/);
  assert.match(add, /# AI-Aware WISP Addendum/);
  assert.match(add, /Appendix A\. AI use-case inventory/);
  assert.match(add, /advisory, 314\.6/);
  Q.sections.forEach(s => assert.ok(add.includes(s.title), "addendum missing " + s.title));
});

test("sample outputs in examples/ are up to date", () => {
  const r = E.evaluate(sample);
  assert.strictEqual(fs.readFileSync(path.join(__dirname, "..", "examples", "gap-report.md"), "utf8"), E.gapReport(sample, r));
  assert.strictEqual(fs.readFileSync(path.join(__dirname, "..", "examples", "addendum.md"), "utf8"), E.addendum(sample, r));
});

// ---- v0.1.1 additions ----
const { execFileSync } = require("child_process");
const os = require("os");
const root = path.join(__dirname, "..");

test("local date helper uses the local calendar date, not UTC", () => {
  assert.strictEqual(E.localDate(new Date(2026, 9, 28, 22, 30)), "2026-10-28");
  assert.strictEqual(E.localDate(new Date(2026, 0, 1, 0, 5)), "2026-01-01");
  assert.match(E.localDate(), /^\d{4}-\d{2}-\d{2}$/);
});

test("size tier labels", () => {
  assert.strictEqual(E.tier(1), "solo (1-5)");
  assert.strictEqual(E.tier(5), "solo (1-5)");
  assert.strictEqual(E.tier(6), "small (6-25)");
  assert.strictEqual(E.tier(25), "small (6-25)");
  assert.strictEqual(E.tier(26), "midsize (26+)");
});

test("Section 7216 outside-the-U.S. questions do not contradict each other", () => {
  const q3 = Q.questions.find(q => q.id === "T7216-3"), q4 = Q.questions.find(q => q.id === "T7216-4");
  assert.ok(!/social security|SSN/i.test(q3.text), "T7216-3 must not mention SSNs (consent can apply there)");
  assert.match(q3.text, /remote viewing/);
  assert.match(q4.text, /Social Security/);
  assert.match(q4.text, /even with the taxpayer's consent/);
  assert.match(q4.ref, /301\.7216-3\(b\)\(4\)/);
});

test("web page carries the exact tightened Content-Security-Policy", () => {
  const html = fs.readFileSync(path.join(root, "web", "index.html"), "utf8");
  const m = /http-equiv="Content-Security-Policy" content="([^"]+)"/.exec(html);
  assert.ok(m, "CSP meta tag missing");
  assert.strictEqual(m[1], "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; form-action 'none'; base-uri 'none'");
});

test("web page and scripts reference no outside addresses", () => {
  const files = ["web/index.html", "web/app.js", "web/style.css", "src/engine.js", "src/questions.js", "src/templates.js"];
  files.forEach(f => {
    const s = fs.readFileSync(path.join(root, f), "utf8").replace(/<!--[\s\S]*?-->/g, "");
    const urls = (s.match(/(?:src|href|action)\s*=\s*["']https?:/gi) || []).concat(s.match(/url\(\s*["']?https?:/gi) || [], s.match(/@import[^;]*https?:/gi) || [], s.match(/\b(?:fetch|XMLHttpRequest|WebSocket|sendBeacon|EventSource)\b/g) || []);
    assert.deepStrictEqual(urls, [], f + " references the network: " + urls.join(", "));
  });
});

test("generated documentation is up to date", () => {
  assert.strictEqual(fs.readFileSync(path.join(root, "docs", "QUESTIONNAIRE.md"), "utf8"), require("../scripts/questionnaire-md.js")() + "\n");
  Object.keys(T).filter(k => k !== "addendum").forEach(k =>
    assert.ok(fs.readFileSync(path.join(root, "templates", k + ".md"), "utf8").includes(T[k].body), "template out of date: " + k));
  assert.ok(fs.readFileSync(path.join(root, "web", "sample.js"), "utf8").includes('"T7216-4"'));
});

test("GitHub Pages build rewrites paths and works as a single folder", () => {
  execFileSync(process.execPath, [path.join(root, "scripts", "build-site.js")], { stdio: "pipe" });
  const html = fs.readFileSync(path.join(root, "site", "index.html"), "utf8");
  assert.ok(!html.includes("../src/") && html.includes('src="src/engine.js"'));
  ["app.js", "style.css", "sample.js", "src/questions.js", "src/templates.js", "src/engine.js", ".nojekyll"].forEach(f =>
    assert.ok(fs.existsSync(path.join(root, "site", f)), "missing site/" + f));
  assert.ok(html.includes("default-src 'none'"));
});

test("placeholder helpers: set-placeholders fills fixture files, check-placeholders detects and then passes", () => {
  // Uses its own fixture project, so the result does not depend on whether the real repository
  // has already had its placeholders filled in.
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "wisp-"));
  const proj = path.join(tmp, "proj");
  fs.mkdirSync(path.join(proj, "scripts"), { recursive: true });
  fs.mkdirSync(path.join(proj, ".github", "workflows"), { recursive: true });
  fs.mkdirSync(path.join(proj, "docs"), { recursive: true });
  ["set-placeholders.js", "check-placeholders.js"].forEach(f => fs.copyFileSync(path.join(root, "scripts", f), path.join(proj, "scripts", f)));
  fs.writeFileSync(path.join(proj, "README.md"), "Use it: https://YOUR-USERNAME.github.io/ai-aware-wisp-builder/\nContact: [email]\nCite: https://github.com/YOUR-USERNAME/ai-aware-wisp-builder (add DOI after the Zenodo release)\n");
  fs.writeFileSync(path.join(proj, "SECURITY.md"), "Email [email]\n");
  fs.writeFileSync(path.join(proj, "CITATION.cff"), "title: x\n# doi: 10.5281/zenodo.XXXXXXX\n# repository-code: \"https://github.com/YOUR-USERNAME/ai-aware-wisp-builder\"\n");
  fs.writeFileSync(path.join(proj, ".github", "workflows", "pages.yml"), "#   https://YOUR-USERNAME.github.io/ai-aware-wisp-builder/\n");
  fs.writeFileSync(path.join(proj, "docs", "RELEASE_CHECKLIST.md"), "https://YOUR-USERNAME.github.io/x\n");
  const run = (script, args) => { try { return { code: 0, out: execFileSync(process.execPath, [path.join(proj, "scripts", script), ...args], { stdio: "pipe" }).toString() }; } catch (e) { return { code: e.status, out: (e.stderr || "").toString() }; } };
  assert.strictEqual(run("check-placeholders.js", []).code, 1, "fixture has placeholders, so the check must fail");
  assert.strictEqual(run("set-placeholders.js", ["--username", "bad name", "--email", "a@b.co"]).code, 2);
  assert.strictEqual(run("set-placeholders.js", ["--username", "octo-cat", "--email", "not-an-email"]).code, 2);
  assert.strictEqual(run("set-placeholders.js", ["--username", "octo-cat", "--email", "me@example.org", "--doi", "10.5281/zenodo.1234567"]).code, 0);
  assert.strictEqual(run("check-placeholders.js", []).code, 0);
  const readme = fs.readFileSync(path.join(proj, "README.md"), "utf8");
  assert.ok(readme.includes("https://octo-cat.github.io/ai-aware-wisp-builder/") && readme.includes("me@example.org"));
  assert.ok(fs.readFileSync(path.join(proj, "SECURITY.md"), "utf8").includes("me@example.org"));
  const cff = fs.readFileSync(path.join(proj, "CITATION.cff"), "utf8");
  assert.ok(cff.includes("doi: 10.5281/zenodo.1234567") && /^repository-code: "https:\/\/github\.com\/octo-cat\//m.test(cff));
  fs.rmSync(tmp, { recursive: true, force: true });
});

test("self-test page uses the same policy and is part of the Pages build", () => {
  const csp = h => /http-equiv="Content-Security-Policy" content="([^"]+)"/.exec(h)[1];
  const a = fs.readFileSync(path.join(root, "web", "index.html"), "utf8"), b = fs.readFileSync(path.join(root, "web", "csp-selftest.html"), "utf8");
  assert.strictEqual(csp(a), csp(b));
  assert.ok(fs.existsSync(path.join(root, "site", "csp-selftest.html")) && fs.existsSync(path.join(root, "site", "csp-selftest.js")));
  assert.ok(/example\.invalid/.test(fs.readFileSync(path.join(root, "web", "csp-selftest.js"), "utf8")), "probes must target an unresolvable host");
});

test("blank answers file records the builder version", () => {
  assert.strictEqual(E.blankAnswers().builderVersion, Q.version);
  assert.strictEqual(Q.version, JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8")).version);
});

// ---- v0.1.2 additions ----
test("migrate: unstamped file moves T7216-4 to T7216-5 and flags the new questions", () => {
  const old = { profile: { firmName: "Old", consumers: "unknown" }, answers: { "T7216-3": "yes", "T7216-4": "partial", "GOV-1": "yes" } };
  const snapshot = JSON.stringify(old);
  const m = E.migrate(old);
  assert.strictEqual(JSON.stringify(old), snapshot, "must not mutate the input");
  assert.strictEqual(m.input.answers["T7216-5"], "partial");
  assert.strictEqual(m.input.answers["T7216-4"], undefined);
  assert.strictEqual(m.input.answers["GOV-1"], "yes");
  assert.deepStrictEqual(m.needsAnswer, ["T7216-4"]);
  assert.deepStrictEqual(m.needsReview, ["T7216-3"]);
  assert.strictEqual(m.input.builderVersion, Q.version);
  assert.ok(m.notes.length >= 2);
  assert.deepStrictEqual(E.validate(m.input), []);
  const r = E.evaluate(m.input);
  assert.ok(r.unanswered.some(q => q.id === "T7216-4"), "new SSN question must be unanswered after migration");
});

test("migrate: 0.1.0 stamp behaves like no stamp; empty T7216-4 is not moved", () => {
  const m = E.migrate({ builderVersion: "0.1.0", profile: { firmName: "X", consumers: "lt5000" }, answers: { "T7216-4": "" } });
  assert.strictEqual(m.input.answers["T7216-5"], undefined);
  assert.deepStrictEqual(m.needsAnswer, ["T7216-4"]);
});

test("migrate: file that already has both T7216-4 and T7216-5 is left alone and flagged", () => {
  const m = E.migrate({ profile: { firmName: "X", consumers: "unknown" }, answers: { "T7216-4": "yes", "T7216-5": "no" } });
  assert.strictEqual(m.input.answers["T7216-4"], "yes");
  assert.strictEqual(m.input.answers["T7216-5"], "no");
  assert.ok(m.needsReview.includes("T7216-4"));
  assert.deepStrictEqual(m.needsAnswer, []);
});

test("migrate: current-version file is untouched; other versions only produce a note", () => {
  const cur = { builderVersion: Q.version, profile: { firmName: "X", consumers: "unknown" }, answers: { "T7216-4": "yes" } };
  const m = E.migrate(cur);
  assert.deepStrictEqual(m.input.answers, cur.answers);
  assert.deepStrictEqual([m.notes, m.needsAnswer, m.needsReview], [[], [], []]);
  const o = E.migrate({ builderVersion: "9.9.9", profile: { firmName: "X", consumers: "unknown" }, answers: { "T7216-4": "yes" } });
  assert.strictEqual(o.input.answers["T7216-4"], "yes");
  assert.strictEqual(o.notes.length, 1);
});

test("command line --migrate and generation migrate old files", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "wispm-"));
  const f = path.join(tmp, "old.json");
  const oldAnswers = JSON.parse(fs.readFileSync(path.join(root, "examples", "sample-answers-5-person-firm.json"), "utf8"));
  delete oldAnswers.builderVersion; oldAnswers.answers["T7216-4"] = "partial"; delete oldAnswers.answers["T7216-5"];
  fs.writeFileSync(f, JSON.stringify(oldAnswers));
  const out = execFileSync(process.execPath, [path.join(root, "bin", "wisp-builder.js"), "--migrate", f], { stdio: ["ignore", "pipe", "pipe"] }).toString();
  const mig = JSON.parse(out);
  assert.strictEqual(mig.answers["T7216-5"], "partial");
  assert.strictEqual(mig.answers["T7216-4"], undefined);
  let strictCode = 0;
  try { execFileSync(process.execPath, [path.join(root, "bin", "wisp-builder.js"), "--answers", f, "--out", path.join(tmp, "o"), "--strict"], { stdio: "pipe" }); } catch (e) { strictCode = e.status; }
  assert.strictEqual(strictCode, 3, "strict mode must stop on the new unanswered SSN question");
  fs.rmSync(tmp, { recursive: true, force: true });
});

test("answer groups are labeled by the question text, not just the ID", () => {
  const js = fs.readFileSync(path.join(root, "web", "app.js"), "utf8");
  assert.match(js, /"aria-labelledby": "qt-" \+ q\.id/);
  assert.match(js, /id: "qt-" \+ q\.id/);
  assert.ok(!/"aria-label": q\.id/.test(js), "radio group must not be labeled by the bare ID");
});

test("SECURITY.md exists and explains private reporting", () => {
  const s = fs.readFileSync(path.join(root, "SECURITY.md"), "utf8");
  assert.match(s, /private vulnerability reporting/i);
  assert.match(s, /Report a vulnerability/);
  assert.match(s, /do not open a public issue/i);
});
