# 🛡️ Privacy Shield – Chrome Extension

**Privacy Shield** protects your sensitive information during screen sharing, live demos, and recordings by automatically blurring credential fields on web pages.

Whether you're presenting in Zoom, recording tutorials, or sharing your screen in meetings, Privacy Shield ensures passwords and usernames don’t get exposed accidentally.

---

## 🚀 Why Privacy Shield?

Accidentally revealing login credentials during screen sharing is more common than you think. Privacy Shield helps prevent this by:

- Automatically detecting and blurring password fields  
- Optionally blurring username/email inputs  
- Allowing per-site control  
- Providing a minimalist Presenter Window  
- Offering a quick keyboard shortcut toggle  

---

## ✨ Features

### 🔒 1. Automatic Password Blurring

- Blurs all `input[type="password"]` fields instantly.
- Detects password fields disguised as text inputs.
- Activates automatically when **Sharing Mode** is enabled.

#### 📸 Demo – Before & After

**Normal Login Page (No Protection):**

![Before Blur](./7e01a2a6-4fff-4021-a471-4abe00f57fe7.png)

**With Privacy Shield Enabled (Sensitive Fields Blurred):**

![After Blur](./03763e1b-3957-45bb-b1ad-8beabb9ee691.png)

---

### 👤 2. Username & Email Protection

- Uses smart heuristics to detect likely username/email fields.
- Automatically blurs them (optional setting).
- Prevents accidental exposure of login emails during demos.

---

### 🎛️ 3. Sharing Mode (Global Toggle)

Privacy Shield works only when **Sharing Mode** is ON.

You can toggle it:

- From the extension popup  
- Using the keyboard shortcut:
  - `Ctrl + Shift + H` (Windows/Linux)  
  - `Command + Shift + H` (Mac)

Quickly enable protection before starting screen sharing.

---

### 🌍 4. Per-Site Control

Not every site needs protection.

- Disable Privacy Shield on trusted websites.
- Re-enable protection anytime.
- Gives you full control without disrupting workflow.

---

### 🖥️ 5. Presenter Window (Minimal UI Mode)

For cleaner presentations, the **Presenter Window**:

- Opens the current tab in a minimalist popup window.
- Removes browser tabs and address bar.
- Reduces UI distractions during demos.

> ⚠️ Note: OS-level window controls (minimize/close) will still be visible.

---

## 🛠 Installation

1. Download or clone this repository.
2. Open Chrome and navigate to:
3. Enable **Developer Mode** (top right).
4. Click **Load unpacked**.
5. Select the `privacy-shield` directory.

You're ready to go 🎉

---

## 📖 Usage

1. Click the Privacy Shield icon in your Chrome toolbar.
2. Toggle **Sharing Mode** to ON.
3. Customize options:
- ✅ Blur password fields (enabled by default)
- ✅ Blur likely username/email fields
- ✅ Enable Presenter Window option
4. Start screen sharing safely.

---

## ⚠️ Limitations

- Cannot automatically detect when Zoom, Teams, or other apps start screen sharing.
- Only blurs content inside web pages.
- Cannot hide OS-level UI elements.
- Address bar remains visible unless using Presenter Window.

You must manually enable Sharing Mode before presenting.

---

## 🔐 Privacy & Security

- No data collection
- No tracking
- No external servers
- All settings stored locally using `chrome.storage.sync`
- Built with **Manifest V3**

Your data stays in your browser — always.

---

## 👨‍💻 Development

- Built with Chrome Extension Manifest V3
- Lightweight and performance-focused
- Fully client-side logic
- No background data processing

---

## 🎯 Ideal For

- Developers doing live demos  
- Content creators recording tutorials  
- Teachers sharing screens  
- SaaS product walkthroughs  
- Security-conscious professionals  

---

If you find this project useful, consider giving it a ⭐ on GitHub!
