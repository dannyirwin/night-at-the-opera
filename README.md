# Obsidian Quartz Wiki Template

Private template for D&D (or any) campaign wikis: Obsidian notes → Quartz static site → GitHub Pages.

Fork or use **Use this template** for each campaign. Auth / suggest-edit is optional.

## Quick start

1. Create a repo from this template (GitHub → Use this template)
2. Clone it and install:

```bash
npm ci
npx quartz plugin install
```

3. Edit `quartz.config.yaml`:
   - `configuration.pageTitle`
   - `configuration.baseUrl` → `YOUR_USER.github.io/YOUR_REPO`

4. Point sync at your Obsidian vault:

```bash
export VAULT_DIR="/path/to/your/obsidian/vault"
npm run sync
npx quartz build --serve
```

5. Enable GitHub Pages: **Settings → Pages → Source: GitHub Actions**

6. Publish (must be on branch `live`):

```bash
git checkout live
export VAULT_DIR="/path/to/your/obsidian/vault"
export SITE_URL="https://YOUR_USER.github.io/YOUR_REPO/"
npm run publish
```

Notes need frontmatter `publish: true` to be copied into `content/`.

## Deploy branch

Pushes to **`live`** trigger [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds Quartz and deploys to GitHub Pages.

## Optional: player login + suggest edit

By default there is no login and no suggest/edit UI.

To enable:

1. Deploy [`oauth-proxy/`](oauth-proxy/) (Cloudflare Worker) — see that README
2. Set `AUTH_WORKER`, `WIKI_BASE_PATH`, and `CONTENT_RAW_BASE` in [`quartz/components/wikiAuth.ts`](quartz/components/wikiAuth.ts)
3. Republish the wiki

Without those, visitors can only read the published Pages site.

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run sync` | Vault → `content/` (`publish: true` only) |
| `npm run preview` | Sync + local Quartz server |
| `npm run publish` | Sync, commit, push `live` |
| `npm run build` | Quartz build only |

## Stack

- [Quartz v5](https://quartz.jzhao.xyz/) — static site generator
- Obsidian — source of truth for notes
- GitHub Pages + Actions — hosting
- Cloudflare Worker (optional) — soft login + GitHub issue suggestions
