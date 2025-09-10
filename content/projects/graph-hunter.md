# Graph Hunter

<p><span class="badge">#osint</span> <span class="badge">#graphs</span> <span class="badge">#networkx</span></p>

Entity and relationship explorer for OSINT datasets.

## Overview

Graph Hunter ingests CSV/JSON sources, resolves entities (e.g., email → domain → IP), scores links, and exports clean graphs for analysis.

## Features

- Ingest pipelines with field mapping and normalization
- Resolver rules (emails, domains, certs, IPs, fingerprints)
- Scoring and deduplication for noisy datasets
- Export to GraphML/CSV for Gephi, Cytoscape, or Neo4j import

## Stack

- Python, NetworkX
- Optional FastAPI for a lightweight viewer

## Getting Started

```bash
# 1) Create a virtual environment
python -m venv .venv && source .venv/bin/activate
pip install graph-hunter

# 2) Prepare mappings and rules
echo "mappings..." > config/map.yml
echo "rules..." > config/rules.yml

# 3) Run a quick pipeline
graph-hunter ingest data/*.csv --map config/map.yml
graph-hunter link --rules config/rules.yml --min-score 0.6
graph-hunter export out/graph.graphml
```

## Usage

```bash
# Ingest multiple sources
graph-hunter ingest data/*.csv --map config/map.yml

# Link entities using rules
graph-hunter link --rules config/rules.yml --min-score 0.6

# Export final graph
graph-hunter export out/graph.graphml
```

## Status

Experimental — APIs may shift as rules mature.

## Roadmap

- Neo4j writer and Cypher recipe library
- Temporal graph support and diffing
- Minimal UI for rule testing and link inspection

## Notes

Respect privacy and data handling policies for any datasets processed.
