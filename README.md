# Sidebar Highlights — Scavengah Fork

This fork builds on **trevware/obsidian-sidebar-highlights** and adds some features tailored to my workflow. It focuses on comment anchors in the following format: 

```
<mark date-highlight="20251110-192659" class="sbh-keyhighlight" style="background: #876E00;">Friedrich Wilhelm Nietzsche</mark>[^51] <span class="comment-anchor"><span class="comment-text" date-comment="20251110-162719">Comment1</span></span> <span class="comment-anchor"><span class="comment-text" date-comment="20251115-194632">Comment2</span></span> <span class="comment-anchor"><span class="comment-text" date-comment="20251116-201452">Comment3</span></span> (October 15, 1844 – August 25, 1900) was a German philosopher.
```

For some, it might seem like too much code in source mode. But it helps me get what I love about Acrobat into Obsidian—giving me all the great things like the ability to link notes, where in Acrobat they would be kinda stuck in that PDF document.

There is commands for both adding highlights and adding comment anchors.

---

## What's Different from trevware upstream

### 1) Reading View Navigation
Click items in the sidebar to navigate in **Reading View**. Clunky, but it works.

### 2) Nested Highlights Support
Reliable handling and navigation for highlights nested within other highlights.

### 3) Comment Anchor Option: Inline/Span Comments
**Inline tooltip comments (footnote-free)**: Keep footnotes for references and add quick notes as tooltips that work in **Reading View**. Create them via the **Insert Comment Anchor** command (command palette). 

Implemented with a `<span>` that auto-attaches to the preceding highlight when placed immediately after it (or with a single space). Otherwise, it's treated separately and gets its own card.

### 4) Color System Enhancements
- Separate color logic for **document highlights** vs **sidebar cards** (brighter in the sidebar without overwhelming the document)
- Support for **additional colors**
- Possible to add my default colours

### 5) Highlight Names on Cards
Cards display the highlight's name for quicker scanning and navigation.

### 6) Create Highlights + Per-Highlight Commands
- **Create highlights directly** from selections via the command palette
- **Each highlight gets its own Obsidian command**, registered dynamically

### 7) Datetime Stamps in Markdown
- **Automatic timestamps**: Highlights and anchor comments automatically get `date-highlight` and `date-comment` attributes in the markdown file (format: `YYYYMMDD-HHMMSS`)
- **Visible in sidebar**: Anchor comment timestamps are displayed in the sidebar for chronological tracking
- **Smart sorting**: Comments are displayed with footnotes first, then anchor comments sorted by timestamp (oldest to newest)

### 8) Comment Categories with Visual Icons
- **Anchor comments** (span comments with `date-comment`): Displayed with a message-square icon
- **Standard footnotes** (traditional `[^1]` style): Displayed with a file-text icon
- Icons appear inline with timestamps to distinguish comment types at a glance

### 9) Navigate from Markdown to Sidebar
- **Command**: "Sidebar Highlights: Go to highlight in sidebar" — Place your cursor in any highlight and trigger this to reveal it in the sidebar
- Automatically scrolls to and flashes the highlight card for easy locating

### 10) Copyable Text in Sidebar
- All text in highlight cards is **user-selectable** for easy copying
- Quote text, comments, and metadata can be selected and copied directly from the sidebar

---

## Credits & License
- Original author: **@trevware**
- Forker: **@Scavengah**
