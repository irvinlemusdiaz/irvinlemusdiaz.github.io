---
title: Rune AI
summary: A self-hosted AI assistant on an Intel Arc Pro B70, with a Godot Android app, image generation, monitoring, and phone alerts. Built as a private fallback for coding when cloud rate limits hit.
kind: Homelab + Android App
stack: [llama.cpp, SYCL, Ubuntu, llama-swap, ComfyUI, Godot 4.7, Tailscale]
status: in-progress
order: 1
color: ink
link: /benchmarks/
linkLabel: See the benchmarks
---

Rune is my own AI assistant, running entirely on my hardware: a small headless Ubuntu server (Intel Core Ultra 7, 64 GB RAM) with an **Intel Arc Pro B70 (32 GB)** in a Thunderbolt eGPU enclosure. It runs a 27B model at 128K context and is reachable from my PC, my phone, and from outside the house, without anything leaving my network.

It started as a fallback for game-dev coding when cloud rate limits hit. It grew into a generalist assistant with its own phone app.

## What's in it

- **Model serving:** llama.cpp built for Intel's SYCL / Level Zero backend, behind **llama-swap**, so one port serves several model configurations (quick, thinking, and a 256K "deep" mode) and swaps them on demand.
- **Speed work:** flash attention, multi-token prediction, an 8-bit KV cache and GPU vision, each one measured before it was kept. The numbers are on the [benchmarks page](/benchmarks/).
- **Image generation:** ComfyUI + Z-Image Turbo on the same card, about 6.5 s per 1024×1024 image, swapped in automatically when an image is requested.
- **Self-healing:** a start gate and watchdog make sure the model never silently loads on the wrong GPU, plus a fix for the driver power-management bug that caused the card to drop off Thunderbolt.
- **Operations:** a status dashboard with a one-button diagnostic report, nightly config backups to an external SSD, self-hosted ntfy alerts to my phone, key-only SSH, and a LAN-only firewall with Tailscale for remote access.

## The RuneAI phone app

Instead of installing a third-party client, I built **RuneAI** in Godot 4.7 for Android:

- Streaming chat with visible "thinking", Markdown answers and copyable code blocks
- Send photos for Rune to read, generate images, and restyle a photo from a prompt
- A live server-status dot and panel fed by the dashboard's API
- Saved chats, and pictures saved straight to the phone's gallery

Each feature was tested in Godot against stand-in servers before going onto the phone.

## What I learned

The hardest problems weren't AI problems. They were drivers, device selection, and power management: three separate faults that disguised each other until a model "ran" at 2 tok/s on the integrated GPU. Measure everything, change one thing at a time, and keep a rollback for every config change.
