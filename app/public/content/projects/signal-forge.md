# Signal Forge

<p><span class="badge">#sdr</span> <span class="badge">#iq</span> <span class="badge">#gnuradio</span></p>

Offline IQ analysis and protocol prototyping lab (receive-only).

## Overview

Signal Forge focuses on experimenting with demodulation chains and frame parsing using recorded IQ samples. It supports modular pipelines and visualization for learning and research.

## Features

- Load IQ captures and chain modular processing blocks
- Demod primitives (AM/FM/FSK/ASK) and basic framing helpers
- Export bitstreams and annotated timelines
- Notebook examples for step-by-step experiments

## Stack

- GNU Radio (flowgraphs)
- Python toolkit (scipy, numpy, matplotlib)

## Getting Started

```bash
# 1) Install base deps
python -m venv .venv && source .venv/bin/activate
pip install signal-forge scipy numpy matplotlib

# 2) Launch a notebook demo
jupyter notebook notebooks/Intro.ipynb
```

## Usage

```bash
# Demodulate a sample IQ file with FSK and visualize
signal-forge demod --file samples/telemetry.iq --mod fsk --symbol-rate 4800 \
  --out out/bits.bin

# Plot spectrogram and annotate bursts
signal-forge viz samples/telemetry.iq --out out/spectrogram.png
```

## Status

Research — educational focus; interfaces evolving.

## Roadmap

- Plugin blocks for additional modulations and filters
- Project templates and reproducible notebooks
- Export to SigMF and standardized metadata

## Notes

Receive-only. Research and education purposes; do not transmit.
