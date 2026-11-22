---
title: File Organizer
summary: A Python CLI that sorts messy folders into category subfolders. Dry-run by default, never overwrites, safe to run on a schedule, and covered by 18 pytest cases.
kind: Automation
stack: [Python, click, rich, PyYAML, pytest]
status: released
order: 5
color: ink
link: https://github.com/irvinlemusdiaz/file-organizer
linkLabel: View on GitHub
---

A tool that rearranges someone's files is a tool nobody trusts, unless it's careful. File Organizer sorts a folder into Images, Documents, Audio, Video, Code, Archives, Installers and Other, optionally grouped by month.

## Built to be trusted

1. **Dry run by default:** it shows exactly what it would do; `--apply` actually moves files.
2. **Never overwrites:** if `note.txt` exists, the incoming file becomes `note (1).txt`.
3. **Idempotent:** running it again on an organized folder does nothing, so it's safe on a schedule.
4. **Configurable:** category rules can be overridden in YAML, layered on top of the defaults.

## Architecture

Planning is split from execution: `plan_moves()` returns a list of actions and `execute_moves()` either simulates or performs them. That makes dry-run mode trivial, and lets the test suite check the *plan* without touching the filesystem. The 18 tests cover classification, hidden files and subfolders, collision renaming, idempotency, and config merging.
