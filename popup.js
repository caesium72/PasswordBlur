// popup.js

document.addEventListener('DOMContentLoaded', () => {
  const sharingModeToggle = document.getElementById('sharing-mode-toggle');
  const blurPasswordCheckbox = document.getElementById('blur-password');
  const blurUsernameCheckbox = document.getElementById('blur-username');
  const presenterWindowOption = document.getElementById('presenter-window-option');
  
  const siteControls = document.querySelector('.site-controls');
  const hostnameSpan = document.getElementById('hostname');
  const toggleSiteBtn = document.getElementById('toggle-site-btn');
  
  const presenterSection = document.getElementById('presenter-section');
  const openPresenterBtn = document.getElementById('open-presenter-btn');

  let currentHostname = '';

  // Load settings
  chrome.storage.sync.get(['sharingMode', 'blurPassword', 'blurUsername', 'presenterWindow', 'siteList'], (result) => {
    sharingModeToggle.checked = !!result.sharingMode;
    blurPasswordCheckbox.checked = result.blurPassword !== false; // Default true
    blurUsernameCheckbox.checked = result.blurUsername !== false; // Default true
    presenterWindowOption.checked = !!result.presenterWindow;

    // Show/hide presenter section
    togglePresenterSection(result.presenterWindow);
    
    // Get current tab info
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const url = new URL(tabs[0].url);
        // Only show site controls for http/https
        if (url.protocol.startsWith('http')) {
          currentHostname = url.hostname;
          hostnameSpan.textContent = currentHostname;
          
          const siteList = result.siteList || {};
          const isEnabled = siteList[currentHostname] !== false; // Default true
          updateSiteButton(isEnabled);
        } else {
          siteControls.style.display = 'none';
          hostnameSpan.textContent = 'System/Extension Page';
        }
      }
    });
  });

  // Event Listeners
  sharingModeToggle.addEventListener('change', () => {
    chrome.storage.sync.set({ sharingMode: sharingModeToggle.checked });
  });

  blurPasswordCheckbox.addEventListener('change', () => {
    chrome.storage.sync.set({ blurPassword: blurPasswordCheckbox.checked });
  });

  blurUsernameCheckbox.addEventListener('change', () => {
    chrome.storage.sync.set({ blurUsername: blurUsernameCheckbox.checked });
  });

  presenterWindowOption.addEventListener('change', () => {
    const isChecked = presenterWindowOption.checked;
    chrome.storage.sync.set({ presenterWindow: isChecked });
    togglePresenterSection(isChecked);
  });

  toggleSiteBtn.addEventListener('click', () => {
    if (!currentHostname) return;
    
    chrome.storage.sync.get(['siteList'], (result) => {
      const siteList = result.siteList || {};
      const currentlyEnabled = siteList[currentHostname] !== false;
      
      // Toggle
      siteList[currentHostname] = !currentlyEnabled;
      
      chrome.storage.sync.set({ siteList }, () => {
        updateSiteButton(!currentlyEnabled);
      });
    });
  });

  openPresenterBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const tab = tabs[0];
        // Create new popup window
        chrome.windows.create({
          url: tab.url,
          type: 'popup',
          // Optionally maximize? Requirement says "optionally maximized".
          // 'state' property in create is not fully supported in all contexts or might need 'state' update after creation.
          // Let's try setting state: 'maximized' if supported, or update it after.
          // chrome.windows.create options: focused, height, width, left, top, type, url, incognito, setSelfAsOpener, state.
          state: 'maximized' 
        });
      }
    });
  });

  function togglePresenterSection(show) {
    if (show) {
      presenterSection.classList.remove('hidden');
    } else {
      presenterSection.classList.add('hidden');
    }
  }

  function updateSiteButton(isEnabled) {
    if (isEnabled) {
      toggleSiteBtn.textContent = 'Disable on this site';
      toggleSiteBtn.classList.remove('primary-btn');
      toggleSiteBtn.classList.add('secondary-btn');
    } else {
      toggleSiteBtn.textContent = 'Enable on this site';
      toggleSiteBtn.classList.remove('secondary-btn');
      toggleSiteBtn.classList.add('primary-btn'); // Highlight to enable
    }
  }
});
