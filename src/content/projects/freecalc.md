---
title: FreeCalc
summary: A free TI-84-style graphing calculator for Windows, for students who can't afford a $130 calculator. Scientific calculator, 6-function grapher, unit converter and equation solver.
kind: Desktop App
stack: [Godot 4, GDScript, Windows]
status: released
order: 2
color: blue
link: https://github.com/irvinlemusdiaz/freecalc-releases/releases
linkLabel: Download from GitHub
---

A TI-84 costs over $130, the price has barely moved in decades, and schools still require one. FreeCalc won't pass a proctored exam, but for homework, studying, and understanding the math, it does what a TI-84 does: free, offline, no account, and a single `.exe` with no installer.

## Features

- Scientific calculator with history, DEG/RAD, memory registers and ANS
- Graph up to **6 color-coded functions**, with scroll-to-zoom and drag-to-pan
- **Trace**, **tangent line** (shows dy/dx and the line's equation), **roots** and **intersections**
- Table of values with CSV export, and PNG graph export
- Statistics: mean, median, min/max, sum, population and sample standard deviation
- Unit converter (8 categories, ~55 units) and an equation solver

## How it's built

It started as a prototype, *GodotCalc*, to prove the expression parser and grapher worked. FreeCalc was then rebuilt from scratch with the whole UI generated in GDScript at runtime, which made adding tabs and analysis tools far easier than rewiring a scene tree each time. The math runs through a hand-written expression parser and a custom graphing engine.
