---
title: "Ten for Ten: How a BIOS Update Brought vLLM Back"
description: "A week ago I parked vLLM on my Intel Arc Pro B70 because it kept crashing on start-up. One firmware update later it went 15 for 15 and now writes at ~60 tokens/s, almost double my old setup."
date: 2026-11-22
tags: [homelab, intel-arc, vllm, rune-ai]
draft: true
---

A week ago I gave up on vLLM. Not forever, just "parked" it, which is homelab-speak for *I'm tired and this isn't working*.

It was fast. Ridiculously fast. On my Intel Arc Pro B70 it nearly doubled how quickly Rune, my self-hosted assistant, could write code. But 3 out of 14 times it simply didn't start. The GPU hit a fault while loading the model, vLLM hung, and I'd come back ten minutes later to an error. A fast assistant that might not show up isn't an assistant. So I went back to llama.cpp and wrote myself a rule: **try again when something changes, and only bring it back if it starts cleanly 5 times in a row.**

Then something changed.

## The setup (and what it cost)

For anyone who lands here trying to build something similar, here's the hardware, with prices:

| Part | What I use | What I paid |
|---|---|---|
| GPU | **Intel Arc Pro B70**, 32 GB | **$999** at Micro Center (around July, after a discount) |
| Enclosure | **AOOSTAR AG03** eGPU dock: built-in 800 W power supply, Thunderbolt 5 and OCuLink ports | **$279** (still about that price as I write this) |
| Host | Headless Ubuntu server, Intel Core Ultra 7 165U, 64 GB RAM, connected over Thunderbolt | already owned |

About that card price: Intel launched the B70 in March at $949, and listings have since climbed to roughly double that. I got lucky with my timing. If you're shopping now, check a few stores before you buy.

About the enclosure: the AG03 also has an **OCuLink** port, which is a more direct PCIe connection than Thunderbolt. I tried to use it with an M.2-to-OCuLink adapter in my daily desktop. It didn't work: the desktop is a prebuilt, and its BIOS locked me out. Anyone semi-serious about this hobby already knows the rule: prebuilt machines come with proprietary limits. So Thunderbolt it is.

## What changed: a firmware update

On November 18 I updated the host's firmware with `fwupdmgr`, Linux's firmware updater. The BIOS went from version 1.49 to 1.51, and the next day I updated the Intel Management Engine firmware too.

The 1.51 release notes from the manufacturer include one line that caught my eye:

> Fixed a potential power negotiation issue with certain Thunderbolt™ 4 docking station.

It says *docking station*, not *eGPU*. But an eGPU enclosure is a Thunderbolt dock with a graphics card in it, so close enough. My thinking was basically: **what good are system updates if they don't patch some issues with the hardware here and there?** Might as well try.

Quick tip, since I learned it the careful way: **do BIOS and Thunderbolt firmware updates with the eGPU unplugged and the host on its own charger.** My enclosure also powers the host over Thunderbolt, and a port reset halfway through a firmware write is the last thing you want.

## The re-test: ten for ten

Same kernel. Same Intel GPU drivers. Same vLLM container. The only thing that changed was firmware.

I ran 10 cold starts back to back: start vLLM, wait for it to say it's healthy, check the kernel log for GPU faults, shut it down, repeat.

**10 out of 10 started cleanly. Zero GPU faults.** Each one was ready in 165–170 seconds.

Could that be luck? I did the math. Before the update, 3 of 14 starts failed. At that rate, the chance of getting 10 clean starts in a row by pure luck is about **9%**. Not impossible, but not likely either. Then I ran 5 more rounds of swapping between models (more on that below). Every one of those was clean too. That's **15 for 15**.

One honest caveat: the BIOS update also included a CPU microcode update, and the Intel ME firmware changed the next day. I can't prove *which* piece fixed it. The Thunderbolt power fix is my best guess, but what I can say for sure is that nothing in my AI software changed, only the firmware.

## Meet Rune Fast

My server runs **llama-swap**, which lets one address serve several models and swap between them on demand. vLLM went back in as a new model called **Rune Fast**. I tested it the way I'd actually use it: 5 rounds of switching from Rune (llama.cpp) to Rune Fast (vLLM) and back, asking the same 400-token coding question each time.

| | Writing speed | Time to swap in | GPU faults |
|---|---|---|---|
| **Rune** (llama.cpp, Q6 model) | 32–33 tokens/s | ~28 s | 0 of 5 |
| **Rune Fast** (vLLM, 4-bit model) | **59–62 tokens/s** | ~165 s | 0 of 5 |

That's about **1.85× faster**.

If "tokens per second" doesn't mean much to you yet: a token is roughly three-quarters of a word. At 60 tokens/s, Rune Fast **writes faster than I can read.** I wasn't expecting nearly double the speed, and the first time I watched it stream an answer I just sat there.

Its first real job was a small one from my Godot work: shuffle an array in GDScript. It wrote a correct Fisher–Yates shuffle, then pointed out that Godot already has a built-in `Array.shuffle()` I could use instead. Fast *and* helpful.

<!-- Screen recording goes here: Rune Fast answering the GDScript shuffle prompt in Qwen Code. -->

## Why speed is the whole game

Here's my take after months of running models at home: **the biggest challenge with local LLMs isn't how accurate they are.** Most decent models are good enough for day-to-day tasks. The challenge is speed.

The faster I get an answer, the faster I can move on to the next task, the next plan, the next obstacle. Doubling the speed doesn't just save seconds. It changes how often I'm willing to ask.

## What about the 3-minute swap?

Rune Fast takes about 165 seconds to load, compared with about 28 for Rune. Honestly? It doesn't bother me. Once the swap finishes, all that's left is speed and precision, and so far Rune Fast delivers both.

When I'm coding I rarely swap at all. The only reason I switch back is for **vision and image work**: Rune can read pictures and generate images, but Rune Fast is text-only for now. Long contexts and "thinking" mode are also still untested on vLLM. That's the next mountain. Hardware limits which software tricks I can use, so I'll adapt to what I have and plan around it.

## Watch out for these

Getting Rune Fast into my coding tools hit a few bumps. If you're setting up the same thing, learn from mine:

- **Continue:** I copied my existing model entry to add Rune Fast and got "No models configured." The new `- name:` line had 4 spaces instead of 2. YAML files care about every single space.
- **Qwen Code's "fast model" slot:** Qwen Code lets you pick a separate *fast model* for background jobs like summaries. Don't put a slow-loading model there. Every background job would force a 3-minute swap.
- **Qwen Code updated itself into auto-approve.** After an automatic update it came back in **Auto mode**, where it approves "safe-looking" actions on its own. It searched my PC and ran a command I never asked for. I switched it back so the bottom bar says **Ask permissions**. Now I check that after every update.

About the two tools: I started with **Continue**, and it's a great on-ramp. It has an agent mode and supports custom rules files. I'm moving more of my building into **Qwen Code** for its **sub-agents**, specialised helpers you create for specific jobs and hand tasks to. I haven't built any yet. That's my next project, and the tools I need will decide which ones I make.

## The wishlist: one box

Maybe half of the challenges I've faced come from running a GPU over Thunderbolt: power negotiation, hot-plugging, the card dropping off the bus. The fix is obvious and expensive: put the B70 in a real PCIe slot.

My dream build is one desktop that holds both my **RTX 5060** (for my monitors and daily use) and the **B70** (for AI). That means a motherboard with two full-size slots, a power supply with headroom (the B70 alone is rated at 230 W), and a case with room for both cards. It also means replacing my prebuilt, because its proprietary parts can't be reused for that kind of upgrade.

Right now it's a dream. One day it'll be reality. For now, the eGPU works, and after this week it works better than ever.

## Got a B70? Send me your numbers

There still aren't many people publishing results for this card. If you're running an Arc Pro B70, especially over Thunderbolt or OCuLink, **email me your build and your numbers** at [irvin.lemus.diaz@gmail.com](mailto:irvin.lemus.diaz@gmail.com). I'll add them to this post, with credit.

All my measurements, with the exact setup for each run, are on the [benchmarks page](/benchmarks/).
