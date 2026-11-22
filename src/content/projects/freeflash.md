---
title: FreeFlash
summary: A spaced-repetition flashcard app using the SM-2 algorithm, the same one Anki uses. Simple enough to open, study and close in under a minute.
kind: Desktop App
stack: [Godot 4.6, GDScript, JSON]
status: coming-soon
order: 4
color: coral
---

Instead of reviewing every card every time, FreeFlash tracks how well you know each card and shows it just before you'd forget it. You study less and remember more.

## Features

- Unlimited decks and cards, with search across everything
- **SM-2** scheduling and four ratings: Again, Hard, Good, Easy
- Session summaries and deck statistics (activity, rating distribution, retention)
- JSON import/export for sharing decks
- A warm cream-and-orange theme built entirely in code, chosen for long reading sessions

## Design notes

The scheduling math (`SRSEngine`) and saving (`DataManager`) are separate autoloads, so the algorithm knows nothing about files and each part can be tested on its own. Godot's built-in dialogs didn't render cleanly as embedded popups, so the app uses its own dialog system. Data is plain JSON: the data model is simple, and users can export, version or share it.
