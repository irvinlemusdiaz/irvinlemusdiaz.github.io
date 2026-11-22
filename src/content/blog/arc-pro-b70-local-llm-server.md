---
title: "Running a 27B model on an Intel Arc Pro B70 over Thunderbolt: what actually mattered"
description: "How I turned a small Linux box and an Arc Pro B70 eGPU into a private AI server, the three bugs that hid behind each other, and which tuning changes were worth it."
date: 2026-11-22
tags: [homelab, intel-arc, llama.cpp, rune-ai]
draft: true
---

I wanted a local model I could fall back on for game-dev coding when cloud rate limits hit. The result is **Rune**: Qwen3.8-27B running on an **Intel Arc Pro B70** (32 GB) in a Thunderbolt eGPU enclosure, hosted on a headless Ubuntu machine (Core Ultra 7 165U, 64 GB RAM). It now writes at **~34 tokens/s** on short coding answers with a 128K context.

There aren't many write-ups for this card yet, so here's what mattered, in the order I learned it. Every number below has its full setup on the [benchmarks page](/benchmarks/).

## 1. Three problems wearing one costume

My first working setup produced about **2 tokens/s**. That turned out to be three separate problems, each hiding the next:

1. **Garbage output** came from a real optimization bug for Xe2 GPUs. The fix was to build llama.cpp from current `master` instead of patching an old base.
2. **The B70 was invisible to SYCL** because the build was missing the Level Zero *development headers* (`libze-dev`). Without them, cmake quietly disables Level Zero and SYCL only sees the integrated GPU. Check that cmake prints `Level Zero loader found`.
3. **The real 2 tok/s killer:** work was running on the host CPU's integrated Meteor Lake GPU. Pinning the device with `--main-gpu 0 -sm none` took it from **1.9 to 20 tok/s**.

**Lesson:** "active (running)" doesn't mean it's on the right GPU. I now check `lspci` and `llama-server --list-devices` before trusting anything.

## 2. The card kept falling off Thunderbolt

For months the B70 would occasionally vanish from the PCI bus, usually right after a model was stopped. The kernel log showed runtime power-management faults in the `xe` driver: the idle card would suspend, the driver's accounting would underflow, and the card dropped off the bus.

The fix was to keep the card and its two PCIe bridges out of runtime power saving (`power/control = on`, set by a udev rule and again by a start-up gate), plus a small guard in front of every model that refuses to start unless the B70 is present. It works around a driver bug rather than fixing it, at the cost of slightly higher idle power, but the drops stopped.

## 3. Tuning that was worth it

| Change | Effect | Kept? |
|---|---|---|
| Flash attention + ubatch 2048 | Prompt reading +50% in real use, ~2.2 GB less VRAM | Yes |
| Multi-token prediction (2 draft tokens) | Writing +40–60% | Yes |
| 8-bit KV cache + vision on the GPU | Pictures ~5× faster, prompt reading −23% | Yes |
| Q4_0 instead of Q6_K | Writing ~+40%, but couldn't finish a hard task | No |
| vLLM with a 4-bit model + MTP | Writing nearly 2× faster | Parked: 3 of 14 cold starts failed |

Two of these surprised me:

- **Faster isn't better if it can't finish.** Q4_0 was the fastest llama.cpp option on this card, but on a hard coding prompt it thought for ~32,000 tokens twice and never wrote the answer. Q6 finished with every one of its own tests passing.
- **vLLM is really fast on the B70**, but GPU faults during weight loading made it unreliable over my Thunderbolt link. I'll re-test when Intel ships a newer driver.

## 4. Things I'd tell someone starting out

- Hold your oneAPI packages (`apt-mark hold`) once things work. An unplanned `apt upgrade` broke GPU inference for me and meant rebuilding llama.cpp against the new runtime.
- Benchmark with **long prompts**. My early "45 tok/s prompt" figure came from a tiny prompt; a 7,680-token prompt showed the real number.
- Keep a dated backup of every config change. Every experiment above was one `cp` away from rolling back.

Next up: a needle-in-a-haystack test at ~200K context, and another vLLM attempt once the drivers move.
