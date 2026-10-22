/**
 * Auth + suggest-edit config.
 *
 * Leave AUTH_WORKER empty to disable login and suggest/edit UI.
 * When set, AuthGate redirects unauthenticated visitors to the Worker login,
 * and SuggestEdit talks to that Worker.
 *
 * Fill these in when you enable auth for a campaign:
 *   AUTH_WORKER      — Cloudflare Worker origin (no trailing slash)
 *   WIKI_BASE_PATH   — GitHub Pages path prefix, e.g. "/my-campaign-wiki"
 *                      ("" if the site is at username.github.io/)
 *   CONTENT_RAW_BASE — raw.githubusercontent.com URL to content/ on the deploy branch
 */
export const AUTH_WORKER = ""

export const WIKI_BASE_PATH = "/obsidian-quartz-wiki-template"

export const CONTENT_RAW_BASE =
  "https://raw.githubusercontent.com/YOUR_GITHUB_USER/YOUR_REPO/live/content/"

export const SESSION_KEY = "wiki_session"

export const TOKEN_HASH_PARAM = "wiki_token"

/** Inlined into AuthGate / SuggestEdit afterDOMLoaded scripts. */
export const LOGIN_HELPER_JS = `
function wikiTheme() {
  var saved = document.documentElement.getAttribute("saved-theme");
  if (saved === "dark" || saved === "light") return saved;
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch (e) {
    return "light";
  }
}
function wikiLoginUrl(returnUrl) {
  return ${JSON.stringify(AUTH_WORKER)} + "/login?return=" +
    encodeURIComponent(String(returnUrl || location.href).split("#")[0]) +
    "&theme=" + wikiTheme();
}
`
