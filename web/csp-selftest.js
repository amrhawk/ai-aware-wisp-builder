/* Browser privacy self-test (v0.1.2). Every probe targets example.invalid, which can never resolve. MIT License. */
(function () {
  "use strict";
  var HOST = "https://example.invalid/";
  var seen = {};
  document.addEventListener("securitypolicyviolation", function (e) {
    var m = /[?&]probe=([a-z]+)/.exec(e.blockedURI || "");
    if (m) seen[m[1]] = e.violatedDirective;
    // Browsers strip the query from cross-origin frame and object URLs, so match those by directive.
    if (/^example\.invalid$/.test((e.blockedURI || "").replace(/^https?:\/\//, "").replace(/\/.*$/, ""))) {
      if (/^frame-src/.test(e.violatedDirective)) seen.frame = e.violatedDirective;
      if (/^object-src/.test(e.violatedDirective)) seen.object = e.violatedDirective;
    }
  });
  var probes = [
    ["fetch", "Outbound connection (fetch)", "connect-src", function () { fetch(HOST + "?probe=fetch").catch(function () {}); }],
    ["xhr", "Outbound connection (XMLHttpRequest)", "connect-src", function () { var x = new XMLHttpRequest(); x.open("GET", HOST + "?probe=xhr"); try { x.send(); } catch (e) {} }],
    ["ws", "Outbound connection (WebSocket)", "connect-src", function () { try { new WebSocket("wss://example.invalid/?probe=ws"); } catch (e) {} }],
    ["beacon", "Outbound connection (sendBeacon)", "connect-src", function () { if (navigator.sendBeacon) navigator.sendBeacon(HOST + "?probe=beacon", "x"); }],
    ["img", "Image from an outside address", "img-src", function () { var i = new Image(); i.src = HOST + "x.png?probe=img"; }],
    ["script", "Script from an outside address", "script-src", function () { var s = document.createElement("script"); s.src = HOST + "x.js?probe=script"; document.head.appendChild(s); }],
    ["css", "Stylesheet from an outside address", "style-src", function () { var l = document.createElement("link"); l.rel = "stylesheet"; l.href = HOST + "x.css?probe=css"; document.head.appendChild(l); }],
    ["frame", "Frame from an outside address", "default-src", function () { var f = document.createElement("iframe"); f.src = HOST + "?probe=frame"; document.body.appendChild(f); }],
    ["object", "Plug-in object from an outside address", "default-src", function () { var o = document.createElement("object"); o.data = HOST + "?probe=object"; document.body.appendChild(o); }],
    ["media", "Audio or video from an outside address", "default-src", function () { var a = document.createElement("audio"); a.src = HOST + "?probe=media"; document.body.appendChild(a); a.load(); }],
    ["font", "Font from an outside address", "default-src", function () { var l = document.createElement("link"); l.rel = "preload"; l.as = "font"; l.crossOrigin = "anonymous"; l.href = HOST + "x.woff2?probe=font"; document.head.appendChild(l); }]
  ];
  probes.forEach(function (p) { try { p[3](); } catch (e) {} });
  setTimeout(function () {
    var rows = document.getElementById("rows"), pass = 0;
    probes.forEach(function (p) {
      var ok = !!seen[p[0]], tr = document.createElement("tr");
      var a = document.createElement("td"), b = document.createElement("td");
      a.textContent = p[1];
      b.textContent = ok ? "PASS (blocked by " + seen[p[0]] + ")" : "NO REPORT (not confirmed blocked)";
      if (ok) pass++;
      tr.appendChild(a); tr.appendChild(b); rows.appendChild(tr);
    });
    var st = document.getElementById("status");
    st.textContent = pass === probes.length ? "PASS: this browser blocked all " + probes.length + " attempts." : "NOT CONFIRMED: " + pass + " of " + probes.length + " attempts were reported blocked.";
    document.getElementById("ua").textContent = "Browser: " + navigator.userAgent;
    document.title = (pass === probes.length ? "PASS" : "NOT CONFIRMED") + ": browser privacy self-test";
  }, 2500);
})();
