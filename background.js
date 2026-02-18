// background.js

// Initialize default settings on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['sharingMode', 'blurPassword', 'blurUsername', 'siteList', 'presenterWindow'], (result) => {
    if (result.sharingMode === undefined) {
      chrome.storage.sync.set({
        sharingMode: false, // Default OFF
        blurPassword: true,
        blurUsername: true,
        siteList: {}, // Map of hostname -> boolean (true=enabled, false=disabled). If missing, default to enabled? Requirement says "Enable on this site" / "Disable on this site", implies default is enabled or disabled. Usually extensions are enabled by default. Let's assume enabled by default unless in denylist. Or maybe "allowlist/denylist" implies one or the other.
        // Let's use a simple map: hostname -> enabled (boolean). If not in map, default is enabled.
        presenterWindow: false
      });
    }
  });
});

// Handle keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-sharing-mode') {
    chrome.storage.sync.get(['sharingMode'], (result) => {
      const newStatus = !result.sharingMode;
      chrome.storage.sync.set({ sharingMode: newStatus }, () => {
        console.log(`Sharing Mode toggled to: ${newStatus}`);
        
        // Optionally notify active tab directly if needed, but storage.onChanged should handle it.
        // We can send a message to show a visual indicator if we wanted, but requirement just says "update the active tab".
      });
    });
  }
});
