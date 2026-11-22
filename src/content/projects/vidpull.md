---
title: VidPull
summary: A desktop video downloader with a Godot UI and a Python/FastAPI backend bundled into one .exe. Paste a URL, pick a quality, get the file. No Python install needed.
kind: Custom Tool
stack: [Godot 4.6, Python, FastAPI, yt-dlp, ffmpeg, PyInstaller]
status: released
order: 3
color: lime
link: https://github.com/irvinlemusdiaz/vidpull-releases
linkLabel: Get it on GitHub
---

Downloading a video sounds simple. Shipping it as an app that a non-technical user can just run, without installing Python or ffmpeg, turned out to be a deep engineering problem.

## How it works

- **Godot** draws the window and handles the UI.
- A **Python + FastAPI** backend runs alongside it and does the heavy lifting with **yt-dlp** and **ffmpeg**: fetching metadata and thumbnails, downloading, merging audio and video, and embedding thumbnails and metadata.
- The two talk over a small HTTP API on localhost, so the backend can be tested on its own.
- **PyInstaller** bundles Python and its dependencies, so the user gets one file.

## Features

- Best quality, 1080p, 720p, 480p, or audio-only (M4A)
- A download queue that runs in the background, with a concurrency limit
- Settings that persist between sessions

The single-executable goal drove almost every decision, especially how the backend is packaged and how Godot finds and starts it at runtime.
