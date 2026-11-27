---
title: "FreeCalc 1.0: A Free Graphing Calculator for Every Student"
description: "FreeCalc 1.0 is out: a free, offline graphing calculator for Windows. No account, no ads, no internet. Here's what it does, what's new, and how to get it on a school laptop in two minutes."
date: 2026-11-27
tags: [freecalc, students, teachers, godot, windows]
draft: true
---

A graphing calculator can cost over $130. That price has barely moved in decades, and schools still require one for class. For a lot of families, that's a real problem.

So I built **FreeCalc**: a graphing calculator for Windows that's **completely free**. No account to sign up for. No ads. No internet connection needed. You download it, open it, and do math.

Today, **version 1.0** is out on itch.io.

**[Download FreeCalc 1.0 for free](https://freeeducationaltools.itch.io/free-graphing-calculator)**

<!-- Screenshot: the calculator tab -->

## Why I made it

Every student deserves a calculator that works, whether or not their family can afford the expensive one, and whether or not they have reliable internet at home.

FreeCalc won't replace a physical calculator on a proctored exam. But for homework, studying, and actually *understanding* the math, it does the job, for free, forever, on the computer you already have.

## What it can do

**Calculator.** Type full expressions like `sin(45) + sqrt(16)` and get the answer instantly. It handles parentheses, order of operations, trig, logs and square roots. Your history stays on screen so you can scroll back through your work, and **ANS** and memory buttons (M+, MR, MC) work just like on a handheld calculator.

**Graphing.** Plot up to **6 functions at once**, each in its own color. Type `sin(x)` in Y1 and `x^2-3` in Y2, hit Graph, and there they are. Scroll to zoom, click and drag to move around.

**Analysis tools.** Click your way to the answers you'd normally hunt for:

- **Trace:** follow a curve and read the x and y values as you go
- **Tangent:** draw the tangent line at any point, with its slope and equation
- **Intersect:** find where two curves cross
- **Roots:** find where a curve crosses the x-axis
- **Zoom Fit:** frame all your curves automatically

**Table of values.** Pick a start, an end and a step, and get a table of x and y values. You can export it to a spreadsheet.

**Statistics.** Paste in a list of numbers and get the mean, median, min, max, sum and both kinds of standard deviation.

**Unit converter.** Length, weight, temperature, volume, area, speed, time and data, updating as you type.

**Equation solver.** Type an equation and hit Solve. FreeCalc figures out what kind it is on its own: linear, quadratic (including complex answers), higher-degree polynomials, and even ones like `sin(x) = 0.5`. There's also a mode for solving two equations with two unknowns.

<!-- Screenshot: equation solver -->

## What's new in 1.0

This is the biggest update yet:

- **Inequalities.** Type `y > 2x + 1` and FreeCalc shades the region. It uses a dashed line for < and > and a solid line for ≤ and ≥. Graph two, and the overlap is your solution.
- **Minimum, maximum and integrals.** Find the vertex of a parabola or the area under a curve in a few clicks.
- **Data points and best-fit lines.** Paste in your lab data, plot it, and fit a linear, quadratic or exponential model. You get the equation and r², and one click copies the equation into Y= so you can graph it.
- **Save and open graphs.** Your functions, window and data points are all saved. The download comes with example graphs to try.
- **A real keyboard workflow.** Type `sin(`, `sqrt(`, `pi` and `ans` straight from your keyboard. `2x4` means 2 × 4. Enter calculates.
- **Copy and paste.** Ctrl+C copies your answer and Ctrl+V pastes an expression. Right-click the display or your history for more.
- **It remembers you.** DEG/RAD, memory, your last tab and your window size are still there next time.
- **A 24-page user guide** with step-by-step how-tos and screenshots, included in the download.

<!-- Screenshot: inequality shading -->

<!-- Screenshot: best-fit line with r² -->

## The bug that disappointed me

Here's an honest one. While testing, I found that some expressions with a minus sign came out wrong. `-5 + 3` gave **-8** instead of **-2**.

In a *calculator*. That was disappointing to find. But it's exactly why testing matters, and I'm glad I found it before more students ran into it. It's fixed everywhere now: the calculator, the graphs, the table and the solver. **If you downloaded an earlier version, please update.**

Testing also caught a few other things that are fixed in 1.0:

- The graph now follows **DEG/RAD** mode like the rest of the app. It used to stay in degrees.
- The **graphing window** behaves correctly, and some awkward layout glitches that got in the way of real use are gone.
- The **solver** is more accurate. For example, `sin(x) = 0.5` in degrees now gives 30 and 150, and cubic equations no longer show a fake extra answer.
- The **table of values** is bigger and easier to read.

I hope I've caught most of them. If you find another, please tell me (see below).

## How to get it (two minutes)

1. Go to the **[FreeCalc page on itch.io](https://freeeducationaltools.itch.io/free-graphing-calculator)** and click **Download Now**. It asks you to "name your own price," but you can enter **$0** and download it for free.
2. Unzip **FreeCalc-1.0-windows.zip** anywhere.
3. Double-click **FreeCalc.exe**.

The first time, Windows might show a blue box saying **"Windows protected your PC."** That's because FreeCalc isn't signed with a paid security certificate. Click **More info**, then **Run anyway**. You'll only see it once.

It works on **Windows 10 and 11** (64-bit). There's **nothing to install and no admin rights needed**, so it runs on most school laptops too.

## For teachers

If you have students who have a laptop or PC at home but can't afford a graphing calculator, please share FreeCalc with them. It's free to use, share and modify (MIT license), and it always will be.

And if you have ideas that would make it better for your class, I really want to hear them. Nothing is ever perfect, but we can always make things better for our students.

## Behind the scenes

FreeCalc took longer to reach 1.0 than I wanted. Life and my main job got busy, and the stress kept me from updating, and even from publishing the updates I *had* made, as often as I'd hoped.

I built it with **Claude Code**, an AI coding assistant, and **Godot**, a free game engine that also makes great desktop apps. I'm still learning how to build apps with AI, and FreeCalc is my test: if it works out, the lessons I learned here (including the failures) will shape everything I build next.

## Feedback

Found a bug? Have an idea for a feature? Leave a comment on the **[itch.io page](https://freeeducationaltools.itch.io/free-graphing-calculator)** or email me at [irvin.lemus.diaz@gmail.com](mailto:irvin.lemus.diaz@gmail.com). FreeCalc is free, and if it helps you, an optional donation on the download page helps me keep improving it.

Thanks for trying FreeCalc!
