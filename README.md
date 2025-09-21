# Sidebar Highlights — Scavengah Fork

This fork builds on **trevware/obsidian-sidebar-highlights** and adds targeted features, UI polish, and fixes tailored to my workflow—while keeping parity with upstream.

---

## What’s Different from Upstream

### 1) Reading View navigation
- Click items in the sidebar to navigate **in Reading View**. Clunky, but works.

### 2) Nested highlights support
- Reliable handling and navigation for highlights nested within other highlights.

### 3) New comment option: inline/span comments
- **Inline tooltip comments (footnote-free)**: Keep footnotes for references and add quick notes as tooltips that work in **Reading View**. Create via **Insert Comment Anchor** (command palette). Implemented with a `span` that auto-attaches to the preceding highlight when placed immediately after it (or with a single space); otherwise it’s treated separately and gets its own card.

### 4) Color system enhancements
- Separate color logic for **document highlights** vs **sidebar cards** (brighter in the sidebar without overwhelming the document).
- Support for **additional colors**.

### 5) Highlight name on cards
- Cards display the highlight’s name for quicker scanning and navigation.

### 6) Create highlights + per-highlight commands
- **Create highlights directly** from selections via the command palette.
- **Each highlight gets its own Obsidian command**, registered dynamically.
- **Bind a hotkey per highlight** for instant jumping/focusing via **Settings → Hotkeys**.

---

## Credits & License
- Original author: **@trevware**
- Fork maintainer: **@Scavengah**

---

*All original features should continue to work. If you spot a regression, please open an issue in this fork.*