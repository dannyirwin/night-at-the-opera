# Optional wiki auth + suggest-edit

Thin gate for the published wiki and suggest-edit flow. Players sign in with **their name** + **a shared password** (no GitHub). Disabled by default — leave undeployed and keep `AUTH_WORKER` empty in [`quartz/components/wikiAuth.ts`](../quartz/components/wikiAuth.ts).

## When enabled

1. Open the wiki → redirected to Worker `/login` if not signed in
2. After login, return to the wiki with a session token (`localStorage`)
3. **Suggest an edit** opens the Worker form (optional: select text first to quote it)
4. Worker opens a GitHub issue via bot `GITHUB_TOKEN`

This is a soft client-side gate (HTML is still on public Pages). Suggest API always verifies the signed token.

## Setup

1. Edit `wrangler.toml` vars: `GITHUB_REPO`, `WIKI_ORIGIN`, `WIKI_BASE`
2. Deploy:

```bash
cd oauth-proxy
npm install
npx wrangler secret put GITHUB_TOKEN
npx wrangler secret put PLAYER_PASSWORDS   # {"Alice":"password",...}
npx wrangler secret put SESSION_SECRET     # openssl rand -hex 32
npx wrangler deploy
```

3. Set `AUTH_WORKER`, `WIKI_BASE_PATH`, and `CONTENT_RAW_BASE` in `quartz/components/wikiAuth.ts`, then publish the wiki.

## Canon

Issues are suggestions. Apply text in Obsidian, then `npm run publish`.
