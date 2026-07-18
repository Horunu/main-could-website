#!/usr/bin/env bash
#
# Deploy the site to drinkcould.co.uk (Krystal cPanel host).
#
#   ./deploy.sh              dry run — shows exactly what would change, touches nothing
#   ./deploy.sh --live       actually push
#   ./deploy.sh --live -y    push without the confirmation prompt
#
# Options:
#   --skip-optimise   don't regenerate assets/optimised/ before deploying
#   --clean-junk      also delete stray macOS files (.DS_Store, ._*) from the server
#
# The repo root mirrors the server docroot 1:1. Anything not meant to ship
# (raw assets, node_modules, archive/, tooling) is filtered out below.
#
set -euo pipefail

HOST="drinkcou@s94.lon.krystal.io"
PORT=722
KEY="$HOME/.ssh/nick"
REMOTE="public_html/"
SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/"

LIVE=0; ASSUME_YES=0; OPTIMISE=1; CLEAN_JUNK=0
for arg in "$@"; do
  case "$arg" in
    --live)         LIVE=1 ;;
    -y|--yes)       ASSUME_YES=1 ;;
    --skip-optimise) OPTIMISE=0 ;;
    --clean-junk)   CLEAN_JUNK=1 ;;
    -h|--help)      sed -n '2,20p' "${BASH_SOURCE[0]}"; exit 0 ;;
    *) echo "unknown option: $arg" >&2; exit 2 ;;
  esac
done

# macOS ships openrsync, which doesn't handle these filters reliably. Insist on real rsync.
RSYNC=""
for candidate in /opt/homebrew/bin/rsync /usr/local/bin/rsync; do
  [ -x "$candidate" ] && { RSYNC="$candidate"; break; }
done
if [ -z "$RSYNC" ]; then
  echo "error: need GNU rsync 3.x (the system openrsync mishandles the delete filters)." >&2
  echo "       install it with:  brew install rsync" >&2
  exit 1
fi

if ! ssh-add -l >/dev/null 2>&1; then
  echo "error: no keys in ssh-agent. The deploy key is passphrase-protected — load it with:" >&2
  echo "         ssh-add $KEY" >&2
  exit 1
fi

SSH_CMD="ssh -p $PORT -i $KEY -o BatchMode=yes"

# Deliberately NOT using -a. Some local files carry mode 700 (they came down via
# Finder), and pushing that to the server makes them unreadable to Apache -> 403.
# -rltz leaves existing server permissions alone; --chmod gives new files 755/644.
RSYNC_OPTS=(-rltz --chmod=D755,F644)

# --- what ships -------------------------------------------------------------
# First matching rule wins, so the assets/optimised include precedes the
# blanket assets/ exclude.
FILTERS=(
  # server-managed — never overwrite, never delete
  --filter='P /.well-known/***'
  --filter='P /.htaccess'
  --exclude='/.well-known/'
  --exclude='/.htaccess'

  # Empty directories that exist only on the server. git cannot track empty
  # dirs, so without these a deploy from a fresh clone would delete them.
  # cgi-bin is cPanel-standard; the other two are harmless but not ours to bin.
  --filter='P /nicky/'
  --filter='P /old-website/docs/'
  --filter='P /old-website/cgi-bin/'
  --exclude='/nicky/'
  --exclude='/old-website/docs/'
  --exclude='/old-website/cgi-bin/'

  # build output ships; the raw sources it's generated from do not
  --include='/assets/optimised/***'
  --exclude='/assets/*'

  # repo/tooling, not website content
  --exclude='/.git/'
  --exclude='/.gitignore'
  --exclude='/.claude/'
  --exclude='/node_modules/'
  --exclude='/archive/'
  --exclude='/deploy.sh'
  --exclude='/README.md'
  --exclude='/optimise-assets.mjs'
  --exclude='/package.json'
  --exclude='/package-lock.json'
  --exclude='/.nojekyll'

  # macOS cruft
  --exclude='.DS_Store'
  --exclude='._*'
  --exclude='.__*'
)

if [ "$OPTIMISE" -eq 1 ]; then
  if [ -d "${SRC}node_modules/sharp" ]; then
    echo "==> regenerating assets/optimised/"
    (cd "$SRC" && node optimise-assets.mjs >/dev/null) && echo "    done"
  else
    echo "==> skipping asset optimisation (node_modules missing — run: npm install)"
  fi
fi

if [ "$LIVE" -eq 0 ]; then
  echo "==> DRY RUN against $HOST:$REMOTE  (nothing will be written)"
  echo
  "$RSYNC" "${RSYNC_OPTS[@]}" -v --delete --itemize-changes --dry-run \
    "${FILTERS[@]}" -e "$SSH_CMD" "$SRC" "$HOST:$REMOTE"
  echo
  echo "Nothing was changed. Re-run with --live to apply."
  exit 0
fi

if [ "$ASSUME_YES" -eq 0 ]; then
  echo "About to push to the LIVE site (https://drinkcould.co.uk) with --delete enabled."
  printf "Type 'deploy' to continue: "
  read -r reply
  [ "$reply" = "deploy" ] || { echo "aborted."; exit 1; }
fi

echo "==> deploying to $HOST:$REMOTE"
"$RSYNC" "${RSYNC_OPTS[@]}" -v --delete --itemize-changes \
  "${FILTERS[@]}" -e "$SSH_CMD" "$SRC" "$HOST:$REMOTE"

if [ "$CLEAN_JUNK" -eq 1 ]; then
  echo "==> removing stray macOS files from the server"
  # Scoped to public_html and to these three patterns only.
  $SSH_CMD "$HOST" \
    'find public_html \( -name "._*" -o -name ".DS_Store" -o -name ".__*" \) -type f -print -delete' \
    || echo "    (cleanup reported an error; deploy itself succeeded)"
fi

echo
echo "==> verifying live homepage"
code=$(curl -sS -o /dev/null -w '%{http_code}' -L https://drinkcould.co.uk/)
echo "    https://drinkcould.co.uk/ -> HTTP $code"
[ "$code" = "200" ] || { echo "    WARNING: expected 200"; exit 1; }
echo "==> done"
