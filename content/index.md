---
title: Campaign Wiki
publish: true
---

# Campaign Wiki

Starter home page for a new D&D campaign wiki.

## How this works

1. Keep your notes in an Obsidian vault
2. Set `publish: true` on notes that should appear on the site
3. Run `npm run publish` (syncs vault → `content/`, commits, pushes `live`)
4. GitHub Actions builds Quartz and deploys to GitHub Pages

## Folders

Suggested structure (match these in your vault if you like):

- `People/` — NPCs and PCs
- `Locations/` — places
- `Lore/` — world background
- `Events/` — sessions, timelines, festivals
- `Factions/` — organizations
- `media/` — images (commit manually; sync only copies markdown)

## Auth (optional)

Login and suggest-edit are **off** until you set `AUTH_WORKER` in `quartz/components/wikiAuth.ts` and deploy `oauth-proxy/`. Without that, the wiki is read-only for visitors.
