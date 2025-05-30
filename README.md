# ![PortFlow Banner](https://raw.githubusercontent.com/ShawnN24/TabStack-ChromeExtension/refs/heads/main/icon.png) TabStack Chrome Extension

**TabStack** is a Chrome extension that lets you save, view, and manage groups of browser tabs ("tab stacks") for easy retrieval later. Quickly save your current open tabs as a named stack, reopen saved stacks, and keep your browsing organized.

---

## Features

- Save all current tabs in the active window as a named "TabStack".
- View saved TabStacks with their tab titles and favicons.
- Reopen all tabs in a saved TabStack with one click.
- Remove saved TabStacks.
- Keyboard shortcut support to save tabs quickly (default: `Ctrl+Shift+Z`).
- Prevent duplicate stack names.
- Clean, minimal popup UI for easy interaction.

---

## Installation

1. Clone or download this repository.
2. Go to `chrome://extensions/` in your Chrome browser.
3. Enable **Developer mode** (toggle in the top-right).
4. Click **Load unpacked** and select this repository folder.
5. The extension icon should appear in your toolbar.

---

## Usage

- Click the extension icon to open the popup.
- Enter a unique stack name and click **Save TabStack** to save all current tabs.
- Switch to the **View Saved Tabs** tab to see your saved stacks.
- Click on a stack name to toggle its saved tabs.
- Use the **Reopen** button (🡆) next to each tab to open it in a new tab.
- Use the **Remove** button (✕) to delete an entire saved stack.
- Use the keyboard shortcut `Ctrl+Shift+Y` (default) to quickly save your current tabs with an automatic timestamp name.

---

## Development

- `popup.html` contains the extension popup UI.
- `popup.js` handles UI logic and Chrome tabs/storage APIs.
- `background.js` listens for keyboard shortcut commands.
- `manifest.json` defines permissions, commands, and extension metadata.

---

## Permissions

- `"tabs"`: To access the current tabs and their info.
- `"storage"`: To save and retrieve TabStacks.
- `"commands"`: To enable keyboard shortcut support.

---

## Keyboard Shortcuts

- **Save current tabs:** `Ctrl+Shift+Z` (default, customizable in `chrome://extensions/shortcuts`).
