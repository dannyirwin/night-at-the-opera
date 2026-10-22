import { QuartzComponent, QuartzComponentConstructor } from "./types"
import { AUTH_WORKER, LOGIN_HELPER_JS, SESSION_KEY, TOKEN_HASH_PARAM } from "./wikiAuth"

export default (() => {
  const AuthGate: QuartzComponent = () => null

  AuthGate.displayName = "AuthGate"

  // Only hide the page while checking session when auth is enabled.
  AuthGate.beforeDOMLoaded = AUTH_WORKER
    ? `
document.documentElement.classList.add("wiki-auth-pending");
`
    : ``

  AuthGate.css = `
html.wiki-auth-pending body {
  visibility: hidden;
}
`

  AuthGate.afterDOMLoaded = AUTH_WORKER
    ? `
(function () {
  var KEY = ${JSON.stringify(SESSION_KEY)};
  var TOKEN_PARAM = ${JSON.stringify(TOKEN_HASH_PARAM)};
  ${LOGIN_HELPER_JS}

  function clearPending() {
    document.documentElement.classList.remove("wiki-auth-pending");
  }

  function readSession() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "null");
    } catch (e) {
      return null;
    }
  }

  // Capture token from login redirect (#wiki_token=...)
  var hash = location.hash || "";
  if (hash.indexOf(TOKEN_PARAM + "=") === 1 || hash.indexOf(TOKEN_PARAM + "=") === 0) {
    var raw = hash.replace(/^#/, "");
    var params = new URLSearchParams(raw.indexOf(TOKEN_PARAM + "=") === 0 ? raw : raw);
    var token = params.get(TOKEN_PARAM);
    if (!token && raw.indexOf(TOKEN_PARAM + "=") === 0) {
      token = decodeURIComponent(raw.slice((TOKEN_PARAM + "=").length));
    }
    if (token) {
      var exp = null;
      try {
        var payload = token.split(".")[1];
        var pad = payload.length % 4 === 0 ? "" : "=".repeat(4 - (payload.length % 4));
        var json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/") + pad));
        exp = json.exp || null;
      } catch (e) {}
      localStorage.setItem(KEY, JSON.stringify({ token: token, exp: exp }));
      history.replaceState(null, "", location.pathname + location.search);
    }
  }

  var session = readSession();
  if (!session || !session.token || (session.exp && session.exp * 1000 < Date.now())) {
    localStorage.removeItem(KEY);
    location.href = wikiLoginUrl(location.href);
    return;
  }

  clearPending();
})();
`
    : `
(function () {
  document.documentElement.classList.remove("wiki-auth-pending");
})();
`

  return AuthGate
}) satisfies QuartzComponentConstructor
