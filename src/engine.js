/*
 * AI-Aware WISP Builder: scoring, gap logic, and document generation (v0.1.2)
 * MIT License. Pure functions; makes no network requests. Works in browsers and Node.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory(require("./questions.js"), require("./templates.js"));
  } else {
    root.WISPEngine = factory(root.WISP_QUESTIONS, root.WISP_TEMPLATES);
  }
})(typeof self !== "undefined" ? self : this, function (Q, TPL) {
  "use strict";

  const GAP_VALUE = { yes: 0, partial: 0.5, no: 1 };
  const STATUS_LABEL = { yes: "In place", partial: "Partial", no: "Gap", na: "Not applicable" };
  const SEV_ORDER = { critical: 0, high: 1, moderate: 2 };

  // Policy statements for each element of the AI addendum.
  const CONTROL = {
    GOV: "The Qualified Individual owns AI governance: approves each AI tool, reviews the AI inventory, and signs off on vendor screens.",
    RISK: "The written risk assessment includes AI-specific risks (data leakage, AI-written phishing, deepfake requests, poisoned documents and prompt injection, agent misuse) and is revisited when an AI tool or model changes.",
    ACC: "Access to AI tools is role-based and least-privilege. Agents and integrations use dedicated low-privilege accounts, and sensitive actions require human approval.",
    AST: "The firm maintains an inventory of every AI tool, plugin, and embedded AI feature, with data classes, action capability, owner, and reassessment date.",
    ENC: "Client information is encrypted in transit and at rest in every AI tool and API integration; exceptions need the Qualified Individual's written approval of compensating controls.",
    DEV: "In-house scripts, prompts, and integrations are reviewed before use; external AI applications are evaluated before approval.",
    MFA: "Multifactor authentication is required on every AI tool and every system an AI integration connects to; exceptions need the Qualified Individual's written approval.",
    DSP: "Chat histories, transcripts, uploads, and vendor-retained data are deleted no later than two years after last use, subject to the rule's listed exceptions; deletion is confirmed in writing.",
    CHG: "Vendor model changes and newly enabled AI features are reviewed before they apply to client data; new AI features are off by default until reviewed.",
    LOG: "User and agent activity in AI tools is logged, exportable, and reviewed for unauthorized access or tampering.",
    TST: "AI tools and integrations are included in regular control testing and, where required, penetration testing and vulnerability assessments.",
    TRN: "All staff are trained on approved tools, prohibited uses, AI-written phishing, and cloned-voice and video requests at onboarding and at least annually.",
    VEN: "Every AI vendor passes the vendor screen before approval, is bound by contract (no training on client data, security, confidentiality, breach notice), and is reassessed at least annually.",
    CUR: "This addendum is versioned and reviewed at least annually and after any AI incident, new tool, or new guidance.",
    IR: "The incident response plan includes playbooks for an AI data leak, a deepfake fraud request, and a compromised AI integration, and is exercised annually.",
    RPT: "The Qualified Individual's annual written report to firm leadership covers the AI inventory, incidents, vendor reviews, and program metrics.",
    FTC: "An incident involving unencrypted information of 500 or more consumers is reported to the FTC as soon as possible and no later than 30 days after discovery; vendor contracts require notice in time to meet that deadline.",
    T7216: "For each AI tool that touches tax return information, the firm documents what is sent, what the vendor does with it, where it is processed, and the basis for its Section 7216 conclusion; consent is obtained where required.",
    OPR: "AI output is treated as a draft and verified by a named person; the firm understands each tool's limits, maintains written AI procedures, documents AI use and verification, bills fairly, and uses only secure, enterprise-approved AI for client data.",
    THR: "Payment and bank-detail changes require call-back verification and two-person approval; client content is treated as untrusted input; unapproved AI use is actively detected."
  };

  const DISCLAIMER = "This output is guidance generated from the firm's own answers. It is not legal, tax, or financial advice and is not a determination of compliance. Firms should confirm their obligations under the FTC Safeguards Rule, IRC Section 7216, and Circular 230 with their own legal and professional advisors, and should read the primary sources. Scores summarize questionnaire answers only and do not measure actual security.";

  // Local calendar date (not UTC), so evening users in the Americas do not get tomorrow's date.
  function localDate(d) {
    d = d || new Date();
    const p = n => String(n).padStart(2, "0");
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
  }

  function qById(id) { return Q.questions.find(q => q.id === id); }

  function isExempt(profile, q) {
    return profile && profile.consumers === "lt5000" && q.exemptSmall === true;
  }

  function validate(input) {
    const errors = [];
    const profile = (input && input.profile) || {};
    const answers = (input && input.answers) || {};
    if (!profile.firmName) errors.push("profile.firmName is required");
    if (!["lt5000", "gte5000", "unknown"].includes(profile.consumers)) {
      errors.push('profile.consumers must be "lt5000", "gte5000", or "unknown"');
    }
    Object.keys(answers).forEach(id => {
      if (answers[id] === "" || answers[id] === null) return;
      if (!qById(id)) errors.push("unknown question id: " + id);
      else if (!Q.answers.includes(answers[id])) errors.push(id + ': invalid answer "' + answers[id] + '"');
    });
    return errors;
  }

  function tier(headcount) {
    const n = Number(headcount);
    if (!n || n < 1) return "unspecified";
    if (n <= 5) return "solo (1-5)";
    if (n <= 25) return "small (6-25)";
    return "midsize (26+)";
  }

  function band(score) {
    if (score === null) return "not scored";
    if (score >= 90) return "strong";
    if (score >= 70) return "developing";
    return "significant gaps";
  }

  /**
   * Gap logic.
   * - "yes" = no gap; "partial" = half gap; "no" = full gap; "na" = excluded.
   * - Each question contributes weight (critical 3, high 2, moderate 1) x gap value.
   * - Exempt questions (16 CFR 314.6, firms with <5,000 consumers) are reported as advisory,
   *   not scored. Unanswered questions are not scored and are listed.
   * - Section score = 100 x (1 - gap points / maximum points) over scored questions.
   */
  function evaluate(input) {
    const profile = input.profile || {};
    const answers = input.answers || {};
    const sections = Q.sections.map(s => ({ id: s.id, title: s.title, ref: s.ref, gapPts: 0, maxPts: 0, scored: 0, total: 0, score: null, band: "not scored" }));
    const secMap = Object.fromEntries(sections.map(s => [s.id, s]));
    const gaps = [], advisory = [], unanswered = [], items = [];

    Q.questions.forEach(q => {
      const sec = secMap[q.section];
      sec.total++;
      const a = answers[q.id] || undefined;
      const exempt = isExempt(profile, q);
      let status;
      if (a === undefined) { status = "unanswered"; unanswered.push(q); }
      else status = a;
      items.push({ q, answer: a, status, exempt });
      if (a === undefined || a === "na") return;
      const g = GAP_VALUE[a];
      if (exempt) { if (g > 0) advisory.push({ q, answer: a, gap: g }); return; }
      sec.scored++;
      sec.maxPts += q.weight;
      sec.gapPts += q.weight * g;
      if (g > 0) gaps.push({ q, answer: a, gap: g, points: q.weight * g });
    });

    let totalGap = 0, totalMax = 0;
    sections.forEach(s => {
      if (s.maxPts > 0) { s.score = Math.round(100 * (1 - s.gapPts / s.maxPts)); s.band = band(s.score); }
      totalGap += s.gapPts; totalMax += s.maxPts;
    });
    gaps.sort((a, b) => SEV_ORDER[a.q.severity] - SEV_ORDER[b.q.severity] || b.gap - a.gap || a.q.id.localeCompare(b.q.id));
    advisory.sort((a, b) => SEV_ORDER[a.q.severity] - SEV_ORDER[b.q.severity] || a.q.id.localeCompare(b.q.id));
    const overall = totalMax > 0 ? Math.round(100 * (1 - totalGap / totalMax)) : null;
    return {
      sections, items, gaps, advisory, unanswered, overall, overallBand: band(overall),
      criticalGaps: gaps.filter(g => g.q.severity === "critical" && g.gap === 1).length,
      answered: Q.questions.length - unanswered.length, total: Q.questions.length
    };
  }

  const esc = s => String(s).replace(/\|/g, "\\|");

  function gapReport(input, res) {
    const p = input.profile || {};
    const date = p.date || localDate();
    const exemptNote = p.consumers === "lt5000"
      ? "The firm reports customer information on fewer than 5,000 consumers. Under 16 CFR 314.6, 314.4(b)(1), (d)(2), (h), and (i) do not apply; questions tied to those provisions are shown as advisory and are not scored."
      : p.consumers === "gte5000"
        ? "The firm reports customer information on 5,000 or more consumers; all provisions are scored."
        : "The firm did not report its consumer count, so all provisions are scored (conservative).";
    const L = [];
    L.push(`# AI-Aware WISP Gap Report`, ``, `**Firm:** ${p.firmName}  `, `**Qualified Individual:** ${p.qualifiedIndividual || "[not provided]"}  `, `**Date:** ${date}  `, `**Size tier:** ${tier(p.headcount)}  `, `**Builder version:** ${Q.version}`, ``);
    L.push(`## Summary`, ``);
    L.push(`- Overall readiness score: **${res.overall === null ? "n/a" : res.overall + "/100"}** (${res.overallBand}).`);
    L.push(`- Questions answered: ${res.answered} of ${res.total}.` + (res.unanswered.length ? ` **${res.unanswered.length} unanswered and not scored; the score is incomplete.**` : ""));
    L.push(`- Critical gaps (full): **${res.criticalGaps}**. Total scored gaps: ${res.gaps.length}. Advisory items: ${res.advisory.length}.`);
    L.push(`- ${exemptNote}`, ``);
    L.push(`## Scores by element`, ``, `| Element | Citation | Score | Status |`, `|---|---|---|---|`);
    res.sections.forEach(s => L.push(`| ${esc(s.title)} | ${esc(s.ref)} | ${s.score === null ? "n/a" : s.score} | ${s.band} |`));
    L.push(``, `## Gaps, most severe first`, ``);
    if (!res.gaps.length) L.push(`No scored gaps.`, ``);
    res.gaps.forEach((g, i) => {
      L.push(`### ${i + 1}. [${g.q.severity.toUpperCase()}] ${g.q.id}: ${g.answer === "partial" ? "Partial" : "Gap"}`, ``,
        `**Question:** ${g.q.text}  `, `**Citation:** ${g.q.ref}  `, `**Why it matters:** ${g.q.why}  `, `**Fix:** ${g.q.fix}  `,
        `**Template:** ${TPL[g.q.template] ? TPL[g.q.template].title : g.q.template}`, ``);
    });
    if (res.advisory.length) {
      L.push(`## Advisory items (not scored for this firm under 16 CFR 314.6)`, ``);
      res.advisory.forEach(a => L.push(`- **${a.q.id}** (${a.q.ref}; ${a.q.severity}): ${a.q.fix}`));
      L.push(``);
    }
    if (res.unanswered.length) {
      L.push(`## Unanswered questions`, ``);
      res.unanswered.forEach(q => L.push(`- ${q.id}: ${q.text}`));
      L.push(``);
    }
    L.push(`## Suggested metrics to track`, ``,
      `Percentage of AI tools inventoried; MFA coverage across AI tools; percentage of vendors that completed the vendor screen; vendors with written no-training commitments; payment-change verifications completed as a share of requests; staff completing AI training; AI-related incidents and near-misses per quarter; AI-assisted work products with documented human review.`, ``,
      `## Disclaimer`, ``, DISCLAIMER, ``);
    return L.join("\n");
  }

  function addendum(input, res) {
    const p = input.profile || {};
    const date = p.date || localDate();
    const L = [];
    L.push(`# AI-Aware WISP Addendum`, ``, `**Firm:** ${p.firmName}  `, `**Qualified Individual:** ${p.qualifiedIndividual || "[name]"}  `, `**Version:** 1.0 (draft)  `, `**Date:** ${date}  `, `**Next review due:** [date, at least annually]`, ``);
    L.push(`## Purpose and scope`, ``,
      `This addendum supplements the firm's Written Information Security Plan (WISP) under the FTC Safeguards Rule (16 CFR Part 314). It applies to every AI tool, plugin, agent, and embedded AI feature that processes, stores, or can reach client information, and to all partners, employees, and contractors. It also records how the firm applies IRC Section 7216 and Circular 230 (as discussed in IRS OPR Issue 2026-19) to its use of AI.`, ``);
    if (p.consumers === "lt5000") {
      L.push(`**Small-firm note.** The firm reports customer information on fewer than 5,000 consumers. 16 CFR 314.6 exempts the firm from 314.4(b)(1), (d)(2), (h), and (i). Controls tied to those provisions are marked *advisory*; the firm adopts them voluntarily where noted.`, ``);
    }
    res.sections.forEach((s, idx) => {
      const rows = res.items.filter(i => i.q.section === s.id);
      L.push(`## ${idx + 1}. ${s.title}`, ``, `*Citation: ${s.ref}*`, ``, `**Control:** ${CONTROL[s.id]}`, ``,
        `| ID | Requirement | Status | Owner | Target date |`, `|---|---|---|---|---|`);
      rows.forEach(r => {
        let st = r.status === "unanswered" ? "Not yet assessed" : STATUS_LABEL[r.status];
        if (r.exempt) st += " (advisory, 314.6)";
        const own = (r.status === "no" || r.status === "partial" || r.status === "unanswered") ? "[owner]" : "";
        const tgt = own ? "[date]" : "";
        L.push(`| ${r.q.id} | ${esc(r.q.text)} | ${st} | ${own} | ${tgt} |`);
      });
      L.push(``);
    });
    L.push(`## Approval`, ``, `Approved by the Qualified Individual: ____________________  Date: ____________`, ``, `Approved by firm leadership: ____________________  Date: ____________`, ``);
    const order = ["ai-inventory", "acceptable-use", "payment-verification", "agent-matrix", "playbooks", "training", "vendor-screen", "threat-table"];
    order.forEach((k, i) => {
      L.push(`## Appendix ${String.fromCharCode(65 + i)}. ${TPL[k].title}`, ``, TPL[k].body, ``);
    });
    L.push(`## Disclaimer`, ``, DISCLAIMER, ``);
    return L.join("\n");
  }

  /**
   * Migrates an answers file from an earlier version without changing the original object.
   * Files with no version stamp (0.1.0 and earlier) used T7216-4 for the contractor-notice question;
   * since 0.1.2 that question is T7216-5 and T7216-4 is the new SSN question. The old answer moves
   * to T7216-5, T7216-4 is left unanswered, and T7216-3 (reworded) is flagged for review.
   * Returns { input, notes, needsAnswer, needsReview }.
   */
  function migrate(input) {
    const src = input || {};
    const out = { builderVersion: Q.version, profile: Object.assign({}, src.profile), answers: Object.assign({}, src.answers) };
    const notes = [], needsAnswer = [], needsReview = [];
    const v = src.builderVersion;
    const legacy = !v || v === "0.1.0";
    if (legacy) {
      const a = out.answers;
      if (a["T7216-4"] !== undefined && a["T7216-4"] !== "" && (a["T7216-5"] === undefined || a["T7216-5"] === "")) {
        a["T7216-5"] = a["T7216-4"];
        delete a["T7216-4"];
        notes.push("Your earlier answer to T7216-4 (contractor notice of sections 6713 and 7216) was moved to T7216-5, where that question now lives.");
      } else if (a["T7216-4"] !== undefined && a["T7216-4"] !== "") {
        notes.push("This file already has both T7216-4 and T7216-5; nothing was moved. Please check both answers.");
        needsReview.push("T7216-4");
      }
      if (!a["T7216-4"]) needsAnswer.push("T7216-4");
      if (a["T7216-3"]) needsReview.push("T7216-3");
      notes.push("Please answer the new question T7216-4 (Social Security numbers of Form 1040-series filers never go outside the United States, even with consent)" + (a["T7216-3"] ? ", and re-check T7216-3, whose wording changed (it no longer covers SSNs)." : "."));
    } else if (v !== Q.version) {
      notes.push("This file was saved by version " + v + "; this is version " + Q.version + ". It was loaded as is; please review your answers.");
    }
    return { input: out, notes, needsAnswer, needsReview };
  }

  function blankAnswers() {
    const answers = {};
    Q.questions.forEach(q => { answers[q.id] = ""; });
    return { builderVersion: Q.version, profile: { firmName: "", qualifiedIndividual: "", consumers: "unknown", headcount: 1, date: "" }, answers };
  }

  return { localDate, evaluate, validate, migrate, gapReport, addendum, blankAnswers, tier, band, DISCLAIMER, CONTROL, STATUS_LABEL };
});
