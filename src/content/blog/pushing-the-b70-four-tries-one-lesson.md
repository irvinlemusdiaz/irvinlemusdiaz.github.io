---
title: "Pushing the B70: Four Tries, One Lesson"
description: "I spent two days trying to squeeze more speed out of my Intel Arc Pro B70. A newer llama.cpp, a bigger memory, a smaller model, more power. Almost all of it fell flat, and that's exactly why it was worth doing."
date: 2026-11-25
tags: [homelab, intel-arc, llama.cpp, rune-ai, beginners]
draft: true
---

After [Rune Fast came back](/blog/ten-for-ten-bios-update-brought-vllm-back/) at about 60 tokens per second, I got greedy. If one firmware update could do that, what else was this card hiding? So I spent two days trying to push my Intel Arc Pro B70 harder.

Spoiler: almost nothing worked. But every failure taught me something, and if you're buying a budget card to start your own AI journey, these are the lessons I wish someone had handed me first.

Quick refresher on my setup: **Rune** is my self-hosted AI assistant. It runs a 27-billion-parameter model (Qwen3.8-27B) on the B70, which has 32 GB of its own memory, connected to a small Linux server over Thunderbolt. All the numbers below are on the [benchmarks page](/benchmarks/), with the exact settings for each test.

## Try #1: a bigger memory (Rune Deep)

Every AI model has a **context window**. Think of it as how much the model can hold in its head at once: your question, the files you've shown it, and the conversation so far. Bigger means it can work with whole projects instead of single files.

I had a second setup called **Rune Deep** with a 256K-token window, twice Rune's 128K. (A token is roughly three-quarters of a word, so 256K tokens is a few novels' worth.) It was going to be my flagship: the model I'd use for big coding jobs and deep research once I had an agent tool like Qwen Code running properly.

The problem was that Deep was slow, about 20 tokens per second. Rune uses a trick called **MTP** (multi-token prediction): a tiny built-in "guesser" drafts the next few words, and the main model just checks them. Deep didn't have it turned on, so I tried to add it.

- At **256K**, it didn't fit. The guesser needs its own memory, and that memory grows with the context size.
- At **224K**, still no.
- At **192K**, it fit, and Deep jumped to about **35 tokens per second**. That's 80% faster on long answers.

I gave up the last 64K for the speed. Then I tested whether it could actually *use* all that memory.

### The needle test

A **needle-in-a-haystack test** hides one specific fact deep inside a huge document, then asks the model to find it. Mine buries a code number about two-thirds of the way into a giant made-up auction ledger.

Deep **crashed at 92,000 tokens.** I tweaked a setting and tried again. It **crashed at 115,000.** Each time the card ran out of working memory, fell back to a slower method, took too long, and the driver reset the GPU. Deep only had about **1 GB** of the card's memory left over.

Then I ran the same test on plain Rune, which has about **2.9 GB** left over. It read **113,000 tokens**, found the needle, and didn't crash once. It took about 15 minutes just to read that much, but it got there.

Retiring Deep felt like watching my flagship go down in flames. But I'll say what I said that day: *high context without speed is not ideal, and high context that crashes is even less useful.* I won't trade speed or accuracy for big-number hype.

What breaks can be fixed later. What falls can rise again. When the software improves, or my budget does, I'll try again.

**Beginner lesson:** the context size on a model's spec sheet isn't what you can actually use. **Free memory on your card decides how deep you can go.** Leave yourself headroom.

## Try #2: a newer llama.cpp

**llama.cpp** is the engine that actually runs the model on my card. My copy was from July, and a lot has changed since then. So I built the newest version (called b12716) and benchmarked it.

The first result was worse: it read prompts at **363 tokens/s**, versus 840 on my July build. After some digging I found the cause. My July build had been compiled with one extra setting (`GGML_SYCL_F16`) that turns on Intel's fast math paths, and I'd left it out of the new one. One missing switch, and prompt reading ran less than half as fast.

I rebuilt it with the switch, and the benchmark looked incredible:

- **Reading prompts: 1,415 tokens/s**, against 840 before
- **Writing: 23.1 tokens/s**, against 19.9 before (without the MTP guesser)

So I switched Rune over to it. And Rune **crawled at about 14 tokens per second.**

It was like standing in front of a huge ocean, only to find out it was as deep as a puddle.

I tested piece by piece and found the problem: in this new version, **MTP is broken on Intel cards.** With the guesser turned on it got *slower*, and even prompt reading dropped by about 8 times. Without MTP the new build writes at about 23 tokens/s. My July build *with* MTP does about 35. So the new version would have traded a third of Rune's talking speed for faster reading. Not worth it.

I put the July build back and kept the new one on disk. When a future release fixes MTP on Intel, I'll re-test it, the same way I re-tested vLLM.

## Try #3: more power

Maybe the card was being held back? I wrote a small script to watch its clock speed, power and temperature while Rune worked.

- It runs at **2.25–2.55 GHz** under load (its top speed is 2.8 GHz).
- It draws about **235 W**, which is its rated power.
- It stays at **51–66 °C**, which is cool.
- The driver doesn't offer any setting to raise the power limit.

So nothing was holding it back. The card already gives everything it's allowed to give. And honestly, writing speed on cards like this depends mostly on **memory speed**, not clock speed, so even more power would mainly help with reading prompts.

## Try #4: a smaller model file

Models come in different **quantizations**, levels of compression. Rune uses **Q6**, a good balance of size and quality. **Q5** is smaller, so in theory the card has less to read per word and should write faster.

I downloaded the Q5 version of the same model (19.9 GB instead of 22 GB) and tested both in the same session. Q5 came out **about 5% *slower***.

The reason is that Intel's software is better tuned for some formats than others, and Q6 happens to be one of the well-tuned ones. Smaller doesn't automatically mean faster. The only thing Q5 gained me was 1.6 GB more free memory, at slightly lower quality. I deleted it.

## The one lesson: test everything

Four tries. One short-lived win (MTP on Deep, before Deep itself retired) and three dead ends. And Rune ended the week exactly where it started: as fast as this card goes with llama.cpp today.

So was it a waste of two days? No. Here's the lesson that ties it all together:

**A benchmark is a promise. Real use is the truth.**

The new llama.cpp read prompts about 70% faster on paper, then wrote about 60% slower in real use. Q5 *should* have been faster and wasn't. Deep *said* 256K and could only safely do 192K, then crashed well before that.

If we don't test what we find, as well as we possibly can, what we build will fail exactly when we need it most. That isn't a small mistake. It's a cardinal sin, and devs and hobbyists must never commit it.

If you're just starting out with a budget card, here's what I'd take from this:

1. **Test on your own card, with your own tasks.** Other people's numbers, and even the benchmark tools, can't tell you how *your* setup behaves.
2. **Change one thing at a time** and keep a backup of your settings, so you can always go back.
3. **Leave memory headroom.** A setup that barely fits will crash when you push it.
4. **Bigger and newer aren't automatically better.** Bigger context, newer versions and smaller files all have trade-offs.
5. **A failed test is still a result.** It's one less mystery, and one more thing you know about your card.

## What's next

Rune's raw speed is maxed out for now, so the next gains come from *how* I use it. Next up is upgrading how Rune works as an **agent**: not just answering questions, but planning and carrying out multi-step jobs on its own.

Then the big test: having Rune **build a web app entirely by itself.** Local models aren't just a hobby or bragging rights. I want to prove that a dev pushed hard enough knows no limits, and that even a budget card can do real work.

If you're running a B70 or another budget card and want to compare notes, [send me your numbers](mailto:irvin.lemus.diaz@gmail.com). I'll add them to the benchmarks with credit.
