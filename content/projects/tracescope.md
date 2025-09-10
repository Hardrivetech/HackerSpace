# TraceScope

<p><span class="badge">#osint</span> <span class="badge">#discovery</span> <span class="badge">#graphs</span></p>

Unified OSINT and asset discovery for domains, organizations, and IP ranges.

## Overview

TraceScope builds a quick situational picture by aggregating passive data: DNS, WHOIS, cert transparency, favicon hashes, HTTP fingerprints, and passive subdomains — then emits timelines and graphs.

## Features

- DNS/WHOIS enrichment and HTTP fingerprinting
- crt.sh and transparency logs for subdomain certs
- Favicon hash matching and title banner extraction
- Passive subdomain enumeration and basic dedup/merge
- Export GraphML/JSON for Gephi/Maltego

## Stack

- Python 3, aiohttp, uvloop
- SQLite for local caching

## Getting Started

```bash
# 1) Install
docker pull ghcr.io/quantum-collective/tracescope:latest

# 2) Quick run (domain)
docker run --rm ghcr.io/quantum-collective/tracescope \
  domain example.com --save graph.graphml --json out.json

# 3) Switch to org mode
docker run --rm -v $PWD/out:/out ghcr.io/quantum-collective/tracescope \
  org "Acme Corp" --max-age 90d --out /out/acme.graphml
```

## Usage

```bash
# Org-focused sweep
tracescope org "Acme Corp" --max-age 90d --out acme.graphml

# Domain walk with graph export
tracescope domain example.com --save graph.graphml --json out.json

# IP range enrichment
tracescope ip 203.0.113.0/24 --whois --http --out ip-report.json
```

## Status

Alpha — source modules and schemas may change.

## Roadmap

- Rate limiters and backoff per source
- Source plugin system and config profiles
- Signed evidence bundles and provenance
- Simple web UI for reviewing finds

## Notes

Only use with public, passive data and within applicable terms and laws.
