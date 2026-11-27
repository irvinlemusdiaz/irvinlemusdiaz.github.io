---
title: FreeCalc
summary: A free, offline graphing calculator for Windows, for students who can't afford a $130 calculator. No account, no ads, no internet. Version 1.0 adds inequalities, best-fit lines, integrals and saved graphs.
kind: Desktop App
stack: [Godot 4, GDScript, Windows]
status: released
order: 2
color: blue
link: https://freeeducationaltools.itch.io/free-graphing-calculator
linkLabel: Download free on itch.io
screenshots:
  - { src: /images/01_inequalities.png, alt: "Two inequalities graphed in FreeCalc with the overlapping solution region shaded", caption: "Inequalities with shaded solutions" }
  - { src: /images/04_best_fit.png, alt: "Lab data points with a linear best-fit line and r squared in FreeCalc", caption: "Best-fit lines with r²" }
  - { src: /images/05_integral_roots.png, alt: "The integral of x squared minus 4 shaded in FreeCalc, with roots marked", caption: "Integrals and roots" }
---

A graphing calculator costs over $130, the price has barely moved in decades, and schools still require one. FreeCalc won't pass a proctored exam, but for homework, studying, and understanding the math, it does what a handheld graphing calculator does: free, offline, no account, no ads, and a single `.exe` with nothing to install.

**Version 1.0** is out now on [itch.io](https://freeeducationaltools.itch.io/free-graphing-calculator). Read the [launch post](/blog/freecalc-1-0-free-graphing-calculator/) for the full story.

## Features

- Scientific calculator with history, DEG/RAD, memory registers and ANS
- Graph up to **6 color-coded functions**, with scroll-to-zoom and drag-to-pan
- **Trace**, **tangent line** (shows dy/dx and the line's equation), **roots**, **intersections** and **Zoom Fit**
- Table of values with CSV export, and PNG graph export
- Statistics: mean, median, min/max, sum, population and sample standard deviation
- Unit converter (8 categories) and an equation solver that works out the equation type for you

## New in 1.0

- **Inequalities** with shaded regions (dashed or solid boundary lines)
- **Minimum, maximum and integrals**
- **Data points and best-fit lines** (linear, quadratic, exponential) with r²
- **Save and open graphs**, with example graphs included
- Keyboard workflow, copy and paste, and settings that are remembered between sessions
- A **24-page PDF user guide**
- Fixes: negative numbers (`-5+3` now correctly gives -2), graphs follow DEG/RAD, a more accurate solver, and a cleaner table

## Getting it

Download **FreeCalc-1.0-windows.zip** from itch.io (enter $0 to get it free), unzip it, and double-click **FreeCalc.exe**. If Windows shows "Windows protected your PC", click **More info → Run anyway**. Runs on Windows 10 and 11 (64-bit) with no install and no admin rights, so it works on most school laptops. MIT licensed.

## How it's built

It started as a prototype, *GodotCalc*, to prove the expression parser and grapher worked. FreeCalc was then rebuilt from scratch with the whole UI generated in GDScript at runtime, which made adding tabs and analysis tools far easier than rewiring a scene tree each time. The math runs through a hand-written expression parser and a custom graphing engine. Version 1.0 was built with Claude Code.
