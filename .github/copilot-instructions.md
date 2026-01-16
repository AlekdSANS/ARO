# ARO Project - AI Coding Agent Instructions

## Project Overview

**ARO** is an interactive desktop-style web application featuring a visual interface with draggable windows, media players, and animated UI elements. It mimics a desktop environment with folders, files, and a user profile system, built for a 1920x1080 desktop display.

## Architecture & Key Components

### Frontend Stack

- **HTML/CSS**: Static markup with media overlays (video, audio, PDF viewers)
- **SCSS Architecture** ([main.scss](../main.scss), [sass/](../sass/)): Component-based organization
  - `base/_common.scss` - Global styles, resets, z-index stacking
  - `components/` - Modular styles for header, main content, footer
- **JavaScript**: jQuery-based (v3.7.1) with ES6 modules for individual features
- **Files served**: Media (MP4, MP3, PDF) from `files/` directory structure

### Module Pattern

Each interactive feature is a separate ES6 module in [js/scripts/](../js/scripts/). Each module:

- Targets a specific DOM element or button group
- Uses jQuery for DOM manipulation
- Implements fade/animate effects with jQuery `.animate()`
- Loads with `defer` or `type="module"` in [index.html](../index.html) (line 31-41)

**Key modules**:

- `intro.js` - Intro video with sessionStorage caching to play only once
- `user_app.js`, `folder1.js`, `folder2.js` - Window animations (scale, opacity, z-index transitions)
- `video.js`, `audio.js`, `pdf.js` - Media overlay players with double-click triggers
- `selection.js`, `folder_drag.js`, `aplication_pick.js` - Interactive features

## Critical Patterns & Conventions

### UI Animation Pattern

All window/folder animations follow this pattern (see [folder1.js](../js/scripts/folder1.js), [user_app.js](../js/scripts/user_app.js)):

```javascript
const element = $(".target-class");
element.css({ initial_state }); // Hidden state
$("#trigger").on("click", () => {
  if (element.css("opacity") == 0) {
    element.animate({ final_state }, 400); // Show
  } else {
    element.animate({ initial_state }, 400, () => {
      /* cleanup */
    }); // Hide
  }
});
```

Uses `scale`, `opacity`, `pointer-events`, and `z-index` for layering. Timing is 400ms.

### Media Playback Pattern

Media overlays use data attributes and ID-based mappings (see [video.js](../js/scripts/video.js), [audio.js](../js/scripts/audio.js)):

- Buttons with `id^="preview"` or `id^="sound"` trigger `dblclick` events
- Static object maps IDs to file paths
- Overlay appears, media loads, user can close by clicking overlay or close button

### Styling Constraints

- Fixed 1920x1080 viewport (hardcoded in [\_common.scss](../sass/base/_common.scss))
- Dark theme: `background-color: #121212` with Montserrat font
- Z-index management: Intro video (9000), overlays (8000), UI windows (9998/9997)
- All positions use absolute positioning relative to viewport

## Development Workflow

### Modifying Styles

1. Edit SCSS in `sass/components/` or `sass/base/`
2. SCSS compiles to `main.css` (do NOT edit main.css directly)
3. Use `@import` in [main.scss](../main.scss) to include partials

### Adding New Interactive Features

1. Create module file in [js/scripts/](../js/scripts/) with `.js` extension
2. Use jQuery `$(function() {})` or ES6 module pattern
3. Add `<script type="module" src="./js/scripts/yourfile.js" defer></script>` in [index.html](../index.html)
4. Follow existing naming: `id^="prefix"` for element selection

### Media & Assets

- MP4 files: `files/mp4/`
- MP3 files: `files/mp3/`
- PDFs: Referenced via data attributes (see `pdf.js`)
- Images: `files/img/` with SVG subfolder

## Integration Points

### jQuery Dependency

All modules depend on jQuery 3.7.1 loaded before module scripts. Newer code should consider migrating to vanilla JS.

### Session Storage

Intro video caches playback state in `sessionStorage.introPlayed` to prevent replaying within session.

### Font Loading

Critical fonts (Montserrat) preload via Google Fonts with async fallbacks for non-critical fonts (Caveat Brush, Cinzel).

## Common Issues & Gotchas

1. **Fixed Viewport**: Hardcoded 1920x1080 - responsive redesign would require major layout changes
2. **jQuery Animations**: Not GPU-accelerated; consider CSS animations for performance-critical features
3. **Double-click Requirements**: Media buttons require double-click (not single click) - intentional for desktop metaphor
4. **Z-index Stacking**: Document carefully to avoid overlap issues with new features

## Project Structure Reference

```
index.html          # Main entry point
main.scss          # SCSS compiler entry
main.css           # Compiled stylesheet (auto-generated)
sass/              # SCSS component partials
js/scripts/        # Feature modules (jQuery-based)
files/             # Media assets (mp4, mp3, pdf, img)
```
