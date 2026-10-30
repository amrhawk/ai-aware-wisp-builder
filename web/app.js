/* AI-Aware WISP Builder UI (v0.1.2). Makes no network requests; no persistent storage. MIT License. */
(function () {
  "use strict";
  var Q = window.WISP_QUESTIONS, E = window.WISPEngine;
  var answers = {};
  var current = "report";
  var last = { report: "", addendum: "" };
  var $ = function (id) { return document.getElementById(id); };

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === "text") n.textContent = attrs[k]; else n.setAttribute(k, attrs[k]); });
    (children || []).forEach(function (c) { n.appendChild(c); });
    return n;
  }

  var flags = {};

  function renderQuestions() {
    var host = $("questions"); host.textContent = "";
    Q.sections.forEach(function (s) {
      var fs = el("fieldset", { "class": "sec" }, [el("legend", {}, [document.createTextNode(s.title + " "), el("span", { "class": "ref", text: s.ref })])]);
      Q.questions.filter(function (q) { return q.section === s.id; }).forEach(function (q) {
        var box = el("div", { "class": "q" + (flags[q.id] ? " flagged" : ""), id: "q-" + q.id });
        box.appendChild(el("div", { "class": "qtext", id: "qt-" + q.id, text: q.id + ": " + q.text }));
        if (flags[q.id]) box.appendChild(el("div", { "class": "flag", role: "note", text: flags[q.id] === "answer" ? "Please answer: this question is new or has moved since your saved file." : "Please review: the wording of this question changed since your saved file." }));
        var meta = el("div", { "class": "meta", id: "qm-" + q.id });
        meta.appendChild(el("span", { "class": "badge " + q.severity, text: q.severity }));
        meta.appendChild(document.createTextNode(q.ref + (q.exemptSmall ? " · small-firm exempt (advisory if under 5,000 consumers)" : "")));
        box.appendChild(meta);
        var opts = el("div", { "class": "opts", role: "radiogroup", "aria-labelledby": "qt-" + q.id, "aria-describedby": "qm-" + q.id });
        [["yes", "Yes"], ["partial", "Partly"], ["no", "No"], ["na", "Not applicable"]].forEach(function (o) {
          var id = q.id + "-" + o[0];
          var inp = el("input", { type: "radio", name: q.id, value: o[0], id: id });
          if (answers[q.id] === o[0]) inp.checked = true;
          inp.addEventListener("change", function () { answers[q.id] = o[0]; progress(); });
          opts.appendChild(el("label", { "for": id }, [inp, document.createTextNode(o[1])]));
        });
        box.appendChild(opts);
        fs.appendChild(box);
      });
      host.appendChild(fs);
    });
    progress();
  }

  function progress() {
    var n = Object.keys(answers).filter(function (k) { return answers[k]; }).length;
    $("bar").style.width = (100 * n / Q.questions.length) + "%";
    $("progressText").textContent = n + " of " + Q.questions.length + " answered";
  }

  function profile() {
    return { firmName: $("firmName").value.trim(), qualifiedIndividual: $("qi").value.trim(), consumers: $("consumers").value,
      headcount: Number($("headcount").value) || 1, date: $("date").value || E.localDate() };
  }
  function setProfile(p) {
    $("firmName").value = p.firmName || ""; $("qi").value = p.qualifiedIndividual || "";
    $("consumers").value = p.consumers || "unknown"; $("headcount").value = p.headcount || 1; $("date").value = p.date || "";
  }

  function md(text) {
    function inline(s) {
      s = s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
    }
    var out = [], lines = text.split("\n"), i = 0;
    while (i < lines.length) {
      var l = lines[i];
      if (/^\|/.test(l) && /^\|[-| ]+\|$/.test(lines[i + 1] || "")) {
        var cells = function (r) { return r.replace(/^\||\|$/g, "").split(/(?<!\\)\|/).map(function (c) { return c.trim().replace(/\\\|/g, "|"); }); };
        var t = "<table><thead><tr>" + cells(l).map(function (c) { return "<th>" + inline(c) + "</th>"; }).join("") + "</tr></thead><tbody>";
        i += 2;
        while (i < lines.length && /^\|/.test(lines[i])) { t += "<tr>" + cells(lines[i]).map(function (c) { return "<td>" + inline(c) + "</td>"; }).join("") + "</tr>"; i++; }
        out.push(t + "</tbody></table>"); continue;
      }
      var h = /^(#{1,3}) (.*)/.exec(l);
      if (h) { out.push("<h" + (h[1].length + 1) + ">" + inline(h[2]) + "</h" + (h[1].length + 1) + ">"); i++; continue; }
      if (/^- /.test(l)) { var u = "<ul>"; while (i < lines.length && /^- /.test(lines[i])) { u += "<li>" + inline(lines[i].slice(2)) + "</li>"; i++; } out.push(u + "</ul>"); continue; }
      if (/^\d+\. /.test(l)) { var o = "<ol>"; while (i < lines.length && /^\d+\. /.test(lines[i])) { o += "<li>" + inline(lines[i].replace(/^\d+\. /, "")) + "</li>"; i++; } out.push(o + "</ol>"); continue; }
      if (l.trim() === "") { i++; continue; }
      var p = [l]; i++;
      while (i < lines.length && lines[i].trim() !== "" && !/^(#|\||- |\d+\. )/.test(lines[i])) { p.push(lines[i]); i++; }
      out.push("<p>" + p.map(function (x) { return inline(x.replace(/\s+$/, "")) + (/  $/.test(x) ? "<br>" : ""); }).join(" ") + "</p>");
    }
    return out.join("\n");
  }

  function show() {
    $("doc").innerHTML = md(last[current]);
    $("tabReport").setAttribute("aria-selected", current === "report");
    $("tabAddendum").setAttribute("aria-selected", current === "addendum");
  }

  function generate() {
    var input = { profile: profile(), answers: answers };
    if (!input.profile.firmName) { alert("Enter the firm name first."); $("firmName").focus(); return; }
    var errs = E.validate(input);
    if (errs.length) { alert(errs.join("\n")); return; }
    var res = E.evaluate(input);
    if (res.unanswered.length && !confirm(res.unanswered.length + " question(s) are unanswered and will not be scored. Generate anyway?")) return;
    last.report = E.gapReport(input, res); last.addendum = E.addendum(input, res);
    $("output").hidden = false; show(); $("output").scrollIntoView({ behavior: "smooth" });
  }

  function download(name, text, type) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: type || "text/markdown" }));
    a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  $("generate").addEventListener("click", generate);
  $("tabReport").addEventListener("click", function () { current = "report"; show(); });
  $("tabAddendum").addEventListener("click", function () { current = "addendum"; show(); });
  $("dl").addEventListener("click", function () { download(current === "report" ? "gap-report.md" : "addendum.md", last[current]); });
  $("print").addEventListener("click", function () { window.print(); });
  $("saveAnswers").addEventListener("click", function () { download("wisp-answers.json", JSON.stringify({ builderVersion: Q.version, profile: profile(), answers: answers }, null, 2), "application/json"); });
  $("loadSample").addEventListener("click", function () { flags = {}; setProfile(window.WISP_SAMPLE.profile); answers = Object.assign({}, window.WISP_SAMPLE.answers); renderQuestions(); });
  $("loadFile").addEventListener("change", function (e) {
    var f = e.target.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      try {
        var d = JSON.parse(r.result); var errs = E.validate(d);
        if (errs.length) { alert("Invalid file:\n" + errs.join("\n")); return; }
        var m = E.migrate(d);
        flags = {};
        m.needsReview.forEach(function (id) { flags[id] = "review"; });
        m.needsAnswer.forEach(function (id) { flags[id] = "answer"; });
        setProfile(m.input.profile); answers = Object.assign({}, m.input.answers); renderQuestions();
        if (m.notes.length) alert(m.notes.join("\n\n"));
        var first = Object.keys(flags)[0];
        if (first) { var t = $("q-" + first); if (t) t.scrollIntoView({ block: "center" }); }
        return;
      } catch (x) { alert("Could not read that file."); }
    };
    r.readAsText(f);
  });
  $("date").value = E.localDate();
  renderQuestions();
})();
