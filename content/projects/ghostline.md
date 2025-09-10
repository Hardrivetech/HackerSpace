# Ghostline

<p><span class="badge">#privacy</span> <span class="badge">#metadata</span> <span class="badge">#scrub</span></p>

Privacy and metadata hygiene toolkit for safe sharing.

## Overview

Ghostline streamlines metadata scrubbing for common file types, file name normalization, and creation of encrypted bundles for distribution.

## Features

- EXIF removal for images and videos
- PDF sanitization (content streams cleaned, metadata reset)
- Filename normalization (ASCII, timestamps)
- Encrypted archives with modern ciphers

## Stack

- Go (single static binary) or Python alternative
- Integrations: exiftool, qpdf/ghostscript (optional)

## Getting Started

```bash
# 1) Install
brew install exiftool qpdf  # (or your OS equivalent)
pip install ghostline

# 2) Quick scrub
ghostline scrub ./photos --out ./photos_clean
```

## Usage

```bash
# Scrub a folder of photos
ghostline scrub ./photos --out ./photos_clean

# Sanitize PDFs and write to a target folder
ghostline pdf --sanitize ./reports/*.pdf --out ./sanitized

# Create an encrypted archive for sharing
ghostline zip --encrypt ./sanitized --out share.zip
```

## Status

Beta — core features stable; UI pending.

## Roadmap

- Minimal desktop UI
- Watch-folder automation
- Client-side encrypted paste/share helper

## Notes

Use responsibly and in compliance with organizational policies and laws.
