# COULD — drinkcould.co.uk

Source for the live site. **The repo root mirrors the server docroot 1:1**, so a
deploy is a straight rsync of this directory into `public_html/`.

## Deploying

The SSH key is passphrase-protected, so load it into the agent once per session:

```sh
ssh-add ~/.ssh/nick          # add --apple-use-keychain to persist across reboots
```

Then:

```sh
./deploy.sh                  # dry run — prints exactly what would change, writes nothing
./deploy.sh --live           # push (prompts for confirmation)
./deploy.sh --live -y        # push without the prompt
```

Useful flags: `--skip-optimise` (don't regenerate images first), `--clean-junk`
(also delete stray `.DS_Store` / `._*` files from the server).

**Always dry-run first.** `deploy.sh` uses `--delete`, so anything not in this
repo gets removed from the docroot.

## Layout

| Path | Ships? | What it is |
|---|---|---|
| `index.html`, `could.html`, `wholesale.html`, `could.css`, `site.js` | yes | the live teaser site |
| `assets/optimised/` | yes | webp/svg build output — this is what the pages reference |
| `assets/*.png`, `*.jpg`, `assets/logo/`, `assets/illustrations/` | no | raw sources the optimiser reads |
| `_ds/` | yes | design-system bundle |
| `old-website/` | yes | previous site, still served at `/old-website` |
| `favicon.ico`, `favicon.webp` | yes | left over from the old site, still referenced |
| `archive/redesign/` | no | design workspace (mockups, screenshots, JSX experiments) |
| `optimise-assets.mjs`, `package.json` | no | tooling |
| `.htaccess` | no | **cPanel-generated. Committed for reference only.** |

## Images

Pages reference `assets/optimised/`, never the raw files. After adding or
changing anything under `assets/`, regenerate:

```sh
npm install        # first time only (sharp + svgo)
node optimise-assets.mjs
```

`deploy.sh` runs this automatically unless you pass `--skip-optimise`. Output is
deterministic — re-running produces byte-identical files.

## Things the deploy deliberately never touches

- `.htaccess` — cPanel manages the PHP handler block; the deploy excludes it so
  it can't be clobbered.
- `.well-known/` — Let's Encrypt ACME challenges live here. Overwriting or
  deleting this directory breaks SSL certificate renewal.

Both are excluded *and* explicitly protected from `--delete` in `deploy.sh`.

## Server

Krystal shared hosting (cPanel):

```
host  s94.lon.krystal.io    port 722    user drinkcou
docroot  ~/public_html    (~/www is a symlink to it)
```

`deploy.sh` requires GNU rsync 3.x (`brew install rsync`) — the `openrsync` that
ships with macOS mishandles the delete/protect filters this setup relies on.

Note: local permissions are **not** propagated. Some files carry mode `700` from
an earlier Finder download; pushing that would make them unreadable to Apache
and 403 the site. The deploy leaves existing server permissions alone and
creates new files as 755/644.
