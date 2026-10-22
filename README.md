# Night at the Opera

Campaign wiki: Obsidian notes in-repo → Quartz → GitHub Pages.

Based on [obsidian-quartz-wiki-template](https://github.com/dannyirwin/obsidian-quartz-wiki-template). Clone on any machine — no Obsidian Sync required.

## Layout

| Path | Role |
|------|------|
| `vault/` | **Open this folder in Obsidian** — all notes |
| `content/` | Auto-filled by sync — only `publish: true` notes |
| repo root | Quartz / npm — do not open as a vault |

`vault/private/` is gitignored — use it for secrets that must not leave your machine. Other notes in `vault/` are in git (visible on GitHub while the repo is public).

## Setup

```bash
npm ci
npx quartz plugin install
```

In Obsidian: **Open folder as vault** → `vault/`

## Publish

```bash
git checkout live
export SITE_URL="https://dannyirwin.github.io/night-at-the-opera/"
npm run publish
```

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run sync` | `vault/` → `content/` |
| `npm run preview` | Sync + local Quartz server |
| `npm run publish` | Sync, commit, push `live` |

Site: https://dannyirwin.github.io/night-at-the-opera/
