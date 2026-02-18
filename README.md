# Privacy Shield Chrome Extension

Privacy Shield helps prevent accidental credential leaks during screen sharing or recording by automatically blurring sensitive fields on webpages.

## Features

- **Automatic Blurring**: Blurs `input[type="password"]` fields and detects password fields disguised as text inputs.
- **Username Protection**: Optionally blurs fields likely to be usernames or emails based on heuristics.
- **Sharing Mode**: Global toggle to enable/disable protection.
- **Site Control**: Enable or disable protection on specific websites.
- **Presenter Window**: Opens the current tab in a minimalist popup window to reduce browser UI clutter during presentations.
- **Keyboard Shortcut**: Toggle Sharing Mode globally with `Ctrl+Shift+H` (or `Command+Shift+H` on Mac).

## Installation

1.  Download or clone this repository.
2.  Open Chrome and navigate to `chrome://extensions`.
3.  Enable **Developer mode** in the top right corner.
4.  Click **Load unpacked**.
5.  Select the `privacy-shield` directory from this project.

## Usage

1.  Click the extension icon in the toolbar to open the popup.
2.  Toggle **Sharing Mode** to ON.
3.  Customize options:
    - **Blur password fields**: Enabled by default.
    - **Blur likely username/email fields**: Enabled by default.
    - **Presenter Window (minimal UI)**: Enable this option to show the "Open Presenter Window" button.
4.  **Per-site control**: Use the "Disable on this site" button to whitelist safe sites.
5.  **Keyboard Shortcut**: Press `Ctrl+Shift+H` to quickly toggle Sharing Mode on/off.

## Limitations

- **Screen Share Detection**: The extension cannot automatically detect when you start screen sharing in Zoom, Teams, or other apps due to browser privacy restrictions. You must manually toggle Sharing Mode.
- **OS-Level Capture**: This extension only blurs content within the web page. It cannot hide the browser address bar (except in Presenter Window mode) or other OS-level elements.
- **Presenter Window**: The Presenter Window removes the browser address bar and tabs, but window controls (minimize, close) and OS borders will still be visible.

## Development

- **Manifest V3**: Built using the latest Chrome Extension manifest version.
- **Privacy**: No data is collected. All settings are stored locally in your browser (`chrome.storage.sync`).
