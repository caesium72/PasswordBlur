// content.js

let settings = {
  sharingMode: false,
  blurPassword: true,
  blurUsername: true,
  siteList: {} // host -> boolean (true=enabled, false=disabled)
};

const BLUR_CLASS = 'privacy-shield-blur';
let debounceTimer;

// Utility: Check if site is enabled
function isSiteEnabled() {
  const host = window.location.hostname;
  // Default to enabled if not explicitly disabled
  if (settings.siteList && settings.siteList[host] === false) {
    return false;
  }
  return true;
}

// Utility: Debounce function
function debounce(func, delay) {
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}

// Core: Scan and Apply Blur
function scanAndBlur() {
  if (!settings.sharingMode || !isSiteEnabled()) {
    removeBlur();
    return;
  }

  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    let shouldBlur = false;

    const type = input.getAttribute('type') ? input.getAttribute('type').toLowerCase() : (input.type ? input.type.toLowerCase() : '');
    const name = input.name ? input.name.toLowerCase() : '';
    const id = input.id ? input.id.toLowerCase() : '';
    const autocomplete = input.autocomplete ? input.autocomplete.toLowerCase() : '';

    // Check Password Fields
    if (settings.blurPassword) {
      if (type === 'password') {
        shouldBlur = true;
      } else if (type === 'text') {
        // Heuristics for password fields shown as text
        if (autocomplete.includes('current-password') || autocomplete.includes('new-password')) {
          shouldBlur = true;
        } else if (name.includes('pass') || name.includes('pwd') || name.includes('password')) {
           // careful with 'passport' or 'compass' but 'pass', 'pwd', 'password' are strong indicators
           // Let's be strictly matching 'pass' or 'pwd' or 'password' as whole words or parts?
           // 'contains' is broad. 'user_password', 'password_field'.
           // 'compass' -> contains 'pass'. This might be a false positive.
           // However, requirement says "name/id contains pass|pwd|password". So I follow requirement.
           shouldBlur = true;
        } else if (id.includes('pass') || id.includes('pwd') || id.includes('password')) {
            shouldBlur = true;
        }
      }
    }

    // Check Username/Email Fields
    if (settings.blurUsername && !shouldBlur) { 
      if (type === 'email') {
        shouldBlur = true;
      } else if (autocomplete === 'username') {
        shouldBlur = true;
      } else if (name.includes('user') || name.includes('login') || name.includes('email')) {
        shouldBlur = true;
      } else if (id.includes('user') || id.includes('login') || id.includes('email')) {
        shouldBlur = true;
      }
    }

    if (shouldBlur) {
      if (!input.classList.contains(BLUR_CLASS)) {
        input.classList.add(BLUR_CLASS);
      }
    } else {
      if (input.classList.contains(BLUR_CLASS)) {
        input.classList.remove(BLUR_CLASS);
      }
    }
  });
}

// Remove blur from all elements
function removeBlur() {
  const blurredElements = document.querySelectorAll(`.${BLUR_CLASS}`);
  blurredElements.forEach(el => el.classList.remove(BLUR_CLASS));
}

// Initialize Observer
function initObserver() {
  const observer = new MutationObserver(debounce(() => {
    scanAndBlur();
  }, 200)); 

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['type', 'class', 'autocomplete', 'name', 'id']
  });
}

// Load settings and start
chrome.storage.sync.get(['sharingMode', 'blurPassword', 'blurUsername', 'siteList'], (result) => {
  // Merge defaults
  settings = { ...settings, ...result };
  
  // Initial scan
  scanAndBlur();
  
  // Start observing
  initObserver();
});

// Listen for changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync') {
    if (changes.sharingMode) settings.sharingMode = changes.sharingMode.newValue;
    if (changes.blurPassword) settings.blurPassword = changes.blurPassword.newValue;
    if (changes.blurUsername) settings.blurUsername = changes.blurUsername.newValue;
    if (changes.siteList) settings.siteList = changes.siteList.newValue;
    
    // Immediate update on setting change
    scanAndBlur();
  }
});
