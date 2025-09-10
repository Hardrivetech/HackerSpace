# AirScout

<p><span class="badge">#sdr</span> <span class="badge">#scan</span> <span class="badge">#iq</span></p>

Passive wideband scanning and recording for SDR workflows.

## Overview

AirScout automates frequency sweeps, recordings, and basic demodulation for analysis. It is receive-only and designed for offline study and visualization.

## Features

- Configurable sweeps (ranges, step size, dwell)
- Record IQ or demodulate AM/FM/FSK to audio
- Waterfall plots and peak detection reports
- Band presets and stationization helpers

## Stack

- Python, pyrtlsdr/SoapySDR, numpy, matplotlib

## Getting Started

```bash
# 1) Install dependencies
python -m venv .venv && source .venv/bin/activate
pip install airscout pyrtlsdr soapy_power numpy matplotlib

# 2) Run a quick sweep
airscout sweep 88M-108M --waterfall out/fm.png --peaks out/peaks.json
```

## Usage

```bash
# Sweep FM band, save waterfall and peaks
airscout sweep 88M-108M --gain 35 --ppm 1 \
  --waterfall out/fm.png --peaks out/peaks.json

# Record IQ for later offline work
airscout record 433.92M --samp-rate 2.4M --secs 60 --out out/433M.iq

# Basic FM demodulation to WAV
airscout demod --file out/433M.iq --mode fm --out out/433M.wav
```

## Status

Research — interfaces subject to change.

## Roadmap

- Scheduler and multi-range orchestration
- Local web UI for monitoring
- Device auto-detection and calibration helpers

## Notes

Receive-only. Comply with all local laws and spectrum regulations. Do not transmit.
