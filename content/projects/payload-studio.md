# Payload Studio

<p><span class="badge">#websec</span> <span class="badge">#cli</span> <span class="badge">#fuzzing</span></p>

Toolkit for crafting, mutating, and safely testing web vulnerability payloads.

## Overview

Payload Studio helps researchers assemble and mutate payloads for XSS, SQLi, path traversal, and SSRF, then validate them against sandboxed targets. It focuses on repeatability, safety, and exportable corpora for fuzzing.

## Features

- Library of curated payload families (XSS, SQLi, LFI/RFI, SSTI, SSRF)
- Mutators: percent/Unicode/base encodings, case-toggle, padding, delimiters, comment injection
- Target profiles to reflect framework quirks (templating, filters, WAFs)
- Safe harness: dockerized echo/reflector endpoints for local validation
- Export wordlists/corpora (txt, JSON, Burp intruder)

## Stack

- Node.js + TypeScript (CLI)
- Optional minimal UI in Vue for composing batches
- Docker Compose for local harness

## Getting Started

```bash
# 1) Install (local project)
npm create payload-studio@latest my-lab && cd my-lab
npm run build

# 2) Start the local harness
docker compose up -d

# 3) Generate an XSS corpus
npx payload-studio generate --type xss \
  --mutate encode,case,pad --profile generic-web \
  --out out/xss-wordlist.txt

# 4) Send a test batch against local echo
npx payload-studio send --wordlist out/xss-wordlist.txt --url http://localhost:8080/echo?q=
```

## Usage

```bash
# Generate an XSS set with encoders and save to a wordlist
payload-studio generate --type xss \
  --mutate encode,case,pad --profile generic-web \
  --out xss-wordlist.txt

# Spin up local harness (echo endpoints)
payload-studio harness up

# Fuzz a local endpoint with generated corpus
payload-studio send --wordlist xss-wordlist.txt --url http://localhost:8080/echo?q=
```

## Status

Alpha — interfaces and formats may change.

## Roadmap

- Plugin API for new payload families and mutators
- Browser helper and Burp Suite extension
- Built-in detection heuristics and result scoring
- Corpus deduplication and minimization

## Notes

For educational and lawful testing of systems you own or have explicit permission to assess.
