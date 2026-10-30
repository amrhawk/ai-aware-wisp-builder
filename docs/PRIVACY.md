# Privacy

**Short version:** the web app runs in your browser, sends nothing anywhere, and stores nothing. This page states exactly what is enforced and what is not.

## What the browser enforces

`web/index.html` carries this Content-Security-Policy (CSP):

```
default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; form-action 'none'; base-uri 'none'
```

In practice, a browser that honors the policy will:

| Blocked | By |
|---|---|
| `fetch`, XHR, WebSocket, EventSource, beacons (any outbound connection) | `connect-src 'none'` |
| Scripts and stylesheets from anywhere except this app's own files | `script-src 'self'`, `style-src 'self'` |
| Images from any outside address (only the app's own files and `data:` images) | `img-src 'self' data:` |
| Fonts, audio/video, frames, plug-in objects, web workers, manifests | `default-src 'none'` |
| Form submission to any address | `form-action 'none'` |
| Changing the page's base address | `base-uri 'none'` |

The app uses system fonts and has no images, so none of these are needed.

## What it does not (and cannot) enforce

- A CSP is a browser feature. It protects you if the page's own code is unmodified; it does not protect against a tampered copy of the app. Download the ZIP from the official repository, or use the official GitHub Pages link, and compare against the repository if in doubt.
- A CSP does not stop *you* from leaving the page, for example by clicking a link. The app contains no outbound links.
- Browser extensions, your device, your network, and GitHub (which serves the page when you use the Pages link) are outside the app's control. GitHub can see that your browser requested the page, as with any web page; it does not receive your answers, because none are ever sent.
- Old or unusual browsers may not enforce CSP. Use a current version of Chrome, Edge, Firefox, or Safari.

## Storage

- No cookies, localStorage, sessionStorage, or IndexedDB are used.
- Answers exist only in the open tab. They are written to a file only when you click **Download answers** or **Download this document**, and they leave the tab only that way.

## Do not enter client data

The questionnaire asks about your firm's controls, not about clients. Free-text fields are limited to the firm name and the Qualified Individual's name, which appear in the generated documents.

## Command-line tool

It reads one local file and writes local files. It makes no network requests and has no dependencies.

## Check your own browser

Open `web/csp-selftest.html` (or `csp-selftest.html` on the Pages site) in the browser you use. It tries eleven things (outbound connections of four kinds, and images, scripts, stylesheets, frames, plug-in objects, media, and fonts from an address that can never resolve) and reports whether the browser blocked each by policy. It should say **PASS: this browser blocked all 11 attempts.** If it says NOT CONFIRMED, do not rely on the privacy claim in that browser. The author has run the self-test and the full app in Chromium; run it yourself in Firefox and Safari, because browsers differ (especially for files opened from your own computer).

## How to verify yourself

1. Run the self-test above. 2. Open the page with your browser's developer tools (Network tab) and use the tool: no requests other than loading the page's own files appear.
3. Read the source: it is a few small JavaScript files with no dependencies (`src/`, `web/`).
4. Run `npm test`: the test suite checks the CSP text and that the page references no outside addresses.
