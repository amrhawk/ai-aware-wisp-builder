# Contributing

Contributions are welcome, especially from practicing Qualified Individuals, tax attorneys, and CPAs.

- **Questions and wording:** edit `src/questions.js`. Every question needs a citation to a rule, guidance, or standard, a "why it matters", and a "fix". Cite the original source, not a summary.
- **Run** `npm run build` (regenerates `docs/QUESTIONNAIRE.md`, `templates/`, `web/sample.js`), `npm run sample` (regenerates `examples/`), and `npm test` before opening a pull request.
- **Privacy:** the browser app must never make network requests or store data. Pull requests that add analytics, remote fonts, or storage will not be merged.
- **Do not** include real firm data, policies, or incident details, even anonymized, in issues or pull requests.
- Regulatory claims are checked against primary sources; if a rule changes, open an issue with the citation.
