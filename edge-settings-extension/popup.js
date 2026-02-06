// Edge Settings Export/Import Extension v1.3
// Debug version with detailed logging and verification

// Human-readable descriptions for settings with Edge settings paths
const SETTINGS_INFO = {
  // Content Settings
  content: {
    cookies: { 
      label: 'Cookies', 
      description: 'Allow websites to store cookies',
      path: 'edge://settings/content/cookies'
    },
    images: { 
      label: 'Images', 
      description: 'Show images on websites',
      path: 'edge://settings/content/images'
    },
    javascript: { 
      label: 'JavaScript', 
      description: 'Allow JavaScript to run on websites',
      path: 'edge://settings/content/javascript'
    },
    notifications: { 
      label: 'Notifications', 
      description: 'Allow websites to send notifications',
      path: 'edge://settings/content/notifications'
    },
    popups: { 
      label: 'Pop-ups and redirects', 
      description: 'Allow pop-up windows and redirects',
      path: 'edge://settings/content/popups'
    },
    location: { 
      label: 'Location', 
      description: 'Allow websites to access your location',
      path: 'edge://settings/content/location'
    },
    camera: { 
      label: 'Camera', 
      description: 'Allow websites to access your camera',
      path: 'edge://settings/content/camera'
    },
    microphone: { 
      label: 'Microphone', 
      description: 'Allow websites to access your microphone',
      path: 'edge://settings/content/microphone'
    },
    automaticDownloads: { 
      label: 'Automatic downloads', 
      description: 'Allow websites to download multiple files',
      path: 'edge://settings/content/automaticDownloads'
    },
    fullscreen: { 
      label: 'Fullscreen', 
      description: 'Allow websites to enter fullscreen mode',
      path: 'edge://settings/content'
    },
    mouselock: { 
      label: 'Mouse lock', 
      description: 'Allow websites to lock your mouse pointer',
      path: 'edge://settings/content'
    }
  },
  // Privacy Settings
  privacy: {
    'network.networkPredictionEnabled': { 
      label: 'Preload pages', 
      description: 'Preload pages for faster browsing and searching',
      path: 'edge://settings/privacy/services'
    },
    'network.webRTCIPHandlingPolicy': { 
      label: 'WebRTC IP handling', 
      description: 'Control how WebRTC exposes your IP address',
      path: 'edge://settings/privacy/webRTC'
    },
    'websites.doNotTrackEnabled': { 
      label: 'Do Not Track', 
      description: 'Send "Do Not Track" requests to websites',
      path: 'edge://settings/privacy/doNotTrack'
    },
    'websites.hyperlinkAuditingEnabled': { 
      label: 'Hyperlink auditing', 
      description: 'Allow websites to track which links you click',
      path: 'edge://settings/privacy/hyperlinkAuditing'
    },
    'websites.referrersEnabled': { 
      label: 'Referrers', 
      description: 'Send page address info when you click links',
      path: 'edge://settings/privacy/referrers'
    },
    'websites.protectedContentEnabled': { 
      label: 'Protected content', 
      description: 'Allow sites to play protected content (DRM)',
      path: 'edge://settings/content/protectedContent'
    },
    'websites.thirdPartyCookiesAllowed': { 
      label: 'Third-party cookies', 
      description: 'Allow third-party cookies from other websites',
      path: 'edge://settings/content/cookies'
    },
    'services.safeBrowsingEnabled': { 
      label: 'Microsoft Defender SmartScreen', 
      description: 'Protect against dangerous sites and downloads',
      path: 'edge://settings/privacy/smartScreen'
    },
    'services.safeBrowsingExtendedReportingEnabled': { 
      label: 'Enhanced security reporting', 
      description: 'Help improve security by sending additional info',
      path: 'edge://settings/privacy/smartScreen'
    },
    'services.searchSuggestEnabled': { 
      label: 'Search suggestions', 
      description: 'Show search and site suggestions as you type',
      path: 'edge://settings/search/searchSuggestions'
    },
    'services.spellingServiceEnabled': { 
      label: 'Spelling service', 
      description: 'Use Microsoft Editor for spelling assistance',
      path: 'edge://settings/languages/spellCheck'
    },
    'services.translationServiceEnabled': { 
      label: 'Translation', 
      description: 'Offer to translate pages in other languages',
      path: 'edge://settings/languages/translate'
    },
    'services.autofillEnabled': { 
      label: 'Autofill (general)', 
      description: 'Automatically fill in form fields',
      path: 'edge://settings/personalInfo/autofill'
    },
    'services.autofillAddressEnabled': { 
      label: 'Autofill addresses', 
      description: 'Save and fill addresses in forms',
      path: 'edge://settings/addresses/autofillAddresses'
    },
    'services.autofillCreditCardEnabled': { 
      label: 'Autofill payment methods', 
      description: 'Save and fill payment information',
      path: 'edge://settings/paymentMethods/autofillPayment'
    },
    'services.passwordSavingEnabled': { 
      label: 'Save passwords', 
      description: 'Offer to save passwords when signing in',
      path: 'edge://settings/passwords/passwordSaving'
    }
  },
  // Font Settings
  font: {
    defaultFontSize: { 
      label: 'Default font size', 
      description: 'Default size for text on web pages',
      path: 'edge://settings/appearance/fonts'
    },
    defaultFixedFontSize: { 
      label: 'Fixed-width font size', 
      description: 'Size for code and fixed-width text',
      path: 'edge://settings/appearance/fonts'
    },
    minimumFontSize: { 
      label: 'Minimum font size', 
      description: 'Smallest text size allowed on pages',
      path: 'edge://settings/appearance/fonts'
    }
  }
};

/**
 * Get human-readable info for a setting
 */
function getSettingInfo(type, key) {
  let info;
  if (type === 'content') {
    info = SETTINGS_INFO.content[key];
  } else if (type === 'privacy') {
    info = SETTINGS_INFO.privacy[key];
  } else if (type === 'font') {
    info = SETTINGS_INFO.font[key];
  }
  
  return info || { 
    label: key, 
    description: key, 
    path: 'edge://settings' 
  };
}

/**
 * Get setting info from import result name
 */
function getImportSettingInfo(name) {
  // Check if it's a content setting (e.g., "content:cookies")
  if (name.startsWith('content:')) {
    const key = name.replace('content:', '');
    return getSettingInfo('content', key);
  }
  // Check if it's a privacy setting (e.g., "privacy:services.passwordSavingEnabled")
  if (name.startsWith('privacy:')) {
    const key = name.replace('privacy:', '');
    return getSettingInfo('privacy', key);
  }
  // Check if it's a font setting
  if (name.startsWith('font:')) {
    const key = name.replace('font:', '');
    return getSettingInfo('font', key);
  }
  // Try to match directly
  if (SETTINGS_INFO.content[name]) {
    return getSettingInfo('content', name);
  }
  if (SETTINGS_INFO.privacy[name]) {
    return getSettingInfo('privacy', name);
  }
  if (SETTINGS_INFO.font[name]) {
    return getSettingInfo('font', name);
  }
  // Default fallback
  return { label: name, description: name, path: 'edge://settings' };
}

document.addEventListener('DOMContentLoaded', () => {
  const exportBtn = document.getElementById('exportBtn');
  const importBtn = document.getElementById('importBtn');
  const fileInput = document.getElementById('fileInput');
  const statusMessage = document.getElementById('statusMessage');
  const statusIcon = document.getElementById('statusIcon');
  const statusText = document.getElementById('statusText');
  const loadingOverlay = document.getElementById('loadingOverlay');
  const loadingText = document.getElementById('loadingText');
  const restartNotice = document.getElementById('restartNotice');
  const restartBtn = document.getElementById('restartBtn');
  const showDetailsLink = document.getElementById('showDetailsLink');
  const detailsModal = document.getElementById('detailsModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  // Bind event listeners
  exportBtn.addEventListener('click', handleExport);
  importBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', handleImport);
  restartBtn.addEventListener('click', handleRestartBrowser);
  showDetailsLink.addEventListener('click', (e) => {
    e.preventDefault();
    detailsModal.classList.remove('hidden');
  });
  closeModalBtn.addEventListener('click', () => {
    detailsModal.classList.add('hidden');
  });
  detailsModal.addEventListener('click', (e) => {
    if (e.target === detailsModal) {
      detailsModal.classList.add('hidden');
    }
  });

  /**
   * Handle browser restart
   */
  function handleRestartBrowser() {
    chrome.tabs.create({ url: 'edge://restart' });
  }

  /**
   * Show loading overlay
   */
  function showLoading(message) {
    loadingText.textContent = message;
    loadingOverlay.classList.remove('hidden');
  }

  /**
   * Hide loading overlay
   */
  function hideLoading() {
    loadingOverlay.classList.add('hidden');
  }

  /**
   * Show status message
   */
  function showStatus(type, message, showRestart = false) {
    statusMessage.className = `status-message ${type}`;
    statusIcon.textContent = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
    statusText.textContent = message;
    statusMessage.classList.remove('hidden');

    if (showRestart) {
      restartNotice.classList.remove('hidden');
    }

    setTimeout(() => {
      statusMessage.classList.add('hidden');
    }, 10000);
  }

  /**
   * Log to console with prefix
   */
  function log(category, message, data) {
    const prefix = `[EdgeSettings:${category}]`;
    if (data !== undefined) {
      console.log(prefix, message, data);
    } else {
      console.log(prefix, message);
    }
  }

  /**
   * Test if privacy API is available and working
   */
  async function testPrivacyAPI() {
    log('TEST', 'Testing privacy API availability...');
    
    const tests = [];
    
    // Test a few key APIs
    const apisToTest = [
      { category: 'services', name: 'safeBrowsingEnabled' },
      { category: 'websites', name: 'doNotTrackEnabled' },
      { category: 'network', name: 'networkPredictionEnabled' }
    ];
    
    for (const api of apisToTest) {
      try {
        if (chrome.privacy?.[api.category]?.[api.name]) {
          const result = await new Promise((resolve, reject) => {
            chrome.privacy[api.category][api.name].get({}, (details) => {
              if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
              } else {
                resolve(details);
              }
            });
          });
          tests.push({ 
            api: `${api.category}.${api.name}`, 
            available: true, 
            value: result.value,
            levelOfControl: result.levelOfControl 
          });
        } else {
          tests.push({ api: `${api.category}.${api.name}`, available: false });
        }
      } catch (e) {
        tests.push({ api: `${api.category}.${api.name}`, available: false, error: e.message });
      }
    }
    
    log('TEST', 'Privacy API test results:', tests);
    return tests;
  }

  /**
   * Collect ALL accessible browser settings
   */
  async function collectSettings() {
    log('EXPORT', 'Starting settings collection...');
    
    const settings = {
      exportDate: new Date().toISOString(),
      exportVersion: '1.3',
      browserInfo: {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language
      },
      contentSettings: {},
      privacySettings: [],
      fontSettings: {},
      extensionStorage: {}
    };

    // Test API first
    await testPrivacyAPI();

    // ============================================
    // CONTENT SETTINGS
    // ============================================
    const contentSettingTypes = [
      'cookies', 'images', 'javascript', 'notifications', 'popups',
      'location', 'camera', 'microphone', 'automaticDownloads',
      'fullscreen', 'mouselock'
    ];

    for (const type of contentSettingTypes) {
      try {
        if (chrome.contentSettings?.[type]) {
          const result = await new Promise((resolve, reject) => {
            chrome.contentSettings[type].get({ primaryUrl: 'https://example.com/' }, (details) => {
              if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
              } else {
                resolve(details);
              }
            });
          });
          settings.contentSettings[type] = result?.setting || 'default';
          log('EXPORT', `Content setting ${type}:`, result?.setting);
        }
      } catch (e) {
        log('EXPORT', `Failed to get content setting ${type}:`, e.message);
      }
    }

    // ============================================
    // PRIVACY SETTINGS - Get ALL of them
    // ============================================
    const privacyAPIs = [
      { category: 'network', name: 'networkPredictionEnabled' },
      { category: 'network', name: 'webRTCIPHandlingPolicy' },
      { category: 'websites', name: 'doNotTrackEnabled' },
      { category: 'websites', name: 'hyperlinkAuditingEnabled' },
      { category: 'websites', name: 'referrersEnabled' },
      { category: 'websites', name: 'protectedContentEnabled' },
      { category: 'websites', name: 'thirdPartyCookiesAllowed' },
      { category: 'services', name: 'safeBrowsingEnabled' },
      { category: 'services', name: 'safeBrowsingExtendedReportingEnabled' },
      { category: 'services', name: 'searchSuggestEnabled' },
      { category: 'services', name: 'spellingServiceEnabled' },
      { category: 'services', name: 'translationServiceEnabled' },
      { category: 'services', name: 'autofillEnabled' },
      { category: 'services', name: 'autofillAddressEnabled' },
      { category: 'services', name: 'autofillCreditCardEnabled' },
      { category: 'services', name: 'passwordSavingEnabled' }
    ];

    for (const api of privacyAPIs) {
      try {
        const privacyObj = chrome.privacy?.[api.category]?.[api.name];
        if (privacyObj) {
          const result = await new Promise((resolve, reject) => {
            privacyObj.get({}, (details) => {
              if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
              } else {
                resolve(details);
              }
            });
          });
          
          if (result) {
            settings.privacySettings.push({
              category: api.category,
              name: api.name,
              value: result.value,
              levelOfControl: result.levelOfControl
            });
            log('EXPORT', `Privacy ${api.category}.${api.name}:`, result);
          }
        } else {
          log('EXPORT', `Privacy API not found: ${api.category}.${api.name}`);
        }
      } catch (e) {
        log('EXPORT', `Failed to get ${api.category}.${api.name}:`, e.message);
      }
    }

    // ============================================
    // FONT SETTINGS
    // ============================================
    try {
      if (chrome.fontSettings) {
        const [defaultSize, fixedSize, minSize] = await Promise.all([
          new Promise(r => chrome.fontSettings.getDefaultFontSize({}, r)),
          new Promise(r => chrome.fontSettings.getDefaultFixedFontSize({}, r)),
          new Promise(r => chrome.fontSettings.getMinimumFontSize({}, r))
        ]);
        
        settings.fontSettings = {
          defaultFontSize: defaultSize?.pixelSize,
          defaultFixedFontSize: fixedSize?.pixelSize,
          minimumFontSize: minSize?.pixelSize
        };
        log('EXPORT', 'Font settings:', settings.fontSettings);
      }
    } catch (e) {
      log('EXPORT', 'Font settings error:', e.message);
    }

    log('EXPORT', 'Collection complete. Total privacy settings:', settings.privacySettings.length);
    return settings;
  }

  /**
   * Convert settings to XML
   */
  function settingsToXML(settings) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<!-- Edge Settings Export v1.3 -->\n';
    xml += '<EdgeSettings>\n';
    xml += `  <ExportDate>${escapeXML(settings.exportDate)}</ExportDate>\n`;
    xml += `  <ExportVersion>${escapeXML(settings.exportVersion)}</ExportVersion>\n`;
    
    xml += '  <BrowserInfo>\n';
    xml += `    <UserAgent>${escapeXML(settings.browserInfo.userAgent)}</UserAgent>\n`;
    xml += `    <Platform>${escapeXML(settings.browserInfo.platform)}</Platform>\n`;
    xml += `    <Language>${escapeXML(settings.browserInfo.language)}</Language>\n`;
    xml += '  </BrowserInfo>\n';

    xml += '  <ContentSettings>\n';
    for (const [key, value] of Object.entries(settings.contentSettings)) {
      xml += `    <Setting name="${escapeXML(key)}" value="${escapeXML(String(value))}" />\n`;
    }
    xml += '  </ContentSettings>\n';

    xml += '  <PrivacySettings>\n';
    for (const setting of settings.privacySettings) {
      xml += `    <Setting `;
      xml += `category="${escapeXML(setting.category)}" `;
      xml += `name="${escapeXML(setting.name)}" `;
      xml += `value="${escapeXML(String(setting.value))}" `;
      xml += `levelOfControl="${escapeXML(setting.levelOfControl)}" />\n`;
    }
    xml += '  </PrivacySettings>\n';

    if (settings.fontSettings) {
      xml += '  <FontSettings>\n';
      xml += `    <DefaultFontSize>${settings.fontSettings.defaultFontSize || ''}</DefaultFontSize>\n`;
      xml += `    <DefaultFixedFontSize>${settings.fontSettings.defaultFixedFontSize || ''}</DefaultFixedFontSize>\n`;
      xml += `    <MinimumFontSize>${settings.fontSettings.minimumFontSize || ''}</MinimumFontSize>\n`;
      xml += '  </FontSettings>\n';
    }

    xml += '</EdgeSettings>';
    return xml;
  }

  function escapeXML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  /**
   * Parse XML - returns raw parsed data
   */
  function parseXML(xmlString) {
    log('IMPORT', 'Parsing XML...');
    
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      throw new Error('Invalid XML: ' + parserError.textContent);
    }

    const root = xmlDoc.querySelector('EdgeSettings');
    if (!root) {
      throw new Error('Missing EdgeSettings root element');
    }

    const settings = {
      contentSettings: {},
      privacySettings: [],
      fontSettings: {}
    };

    // Parse Content Settings
    const contentElements = root.querySelectorAll('ContentSettings > Setting');
    log('IMPORT', `Found ${contentElements.length} content settings`);
    for (const el of contentElements) {
      const name = el.getAttribute('name');
      const value = el.getAttribute('value');
      if (name && value) {
        settings.contentSettings[name] = value;
        log('IMPORT', `Content: ${name} = ${value}`);
      }
    }

    // Parse Privacy Settings
    const privacyElements = root.querySelectorAll('PrivacySettings > Setting');
    log('IMPORT', `Found ${privacyElements.length} privacy settings`);
    for (const el of privacyElements) {
      const category = el.getAttribute('category');
      const name = el.getAttribute('name');
      const valueStr = el.getAttribute('value');
      const levelOfControl = el.getAttribute('levelOfControl');
      
      if (category && name && valueStr !== null) {
        // Parse boolean values
        let value;
        if (valueStr === 'true') value = true;
        else if (valueStr === 'false') value = false;
        else value = valueStr;
        
        settings.privacySettings.push({ category, name, value, levelOfControl });
        log('IMPORT', `Privacy: ${category}.${name} = ${value} (${typeof value})`);
      }
    }

    // Parse Font Settings
    const fontSettings = root.querySelector('FontSettings');
    if (fontSettings) {
      const defaultSize = fontSettings.querySelector('DefaultFontSize')?.textContent;
      const fixedSize = fontSettings.querySelector('DefaultFixedFontSize')?.textContent;
      const minSize = fontSettings.querySelector('MinimumFontSize')?.textContent;
      
      if (defaultSize) settings.fontSettings.defaultFontSize = parseInt(defaultSize, 10);
      if (fixedSize) settings.fontSettings.defaultFixedFontSize = parseInt(fixedSize, 10);
      if (minSize) settings.fontSettings.minimumFontSize = parseInt(minSize, 10);
      
      log('IMPORT', 'Font settings:', settings.fontSettings);
    }

    log('IMPORT', 'Parse complete:', settings);
    return settings;
  }

  /**
   * Apply settings with detailed error reporting
   */
  async function applySettings(settings) {
    log('APPLY', 'Starting to apply settings...');
    
    const results = { 
      success: [], 
      failed: [], 
      skipped: [],
      details: []
    };

    // ============================================
    // Apply Content Settings
    // ============================================
    log('APPLY', 'Applying content settings...');
    for (const [type, value] of Object.entries(settings.contentSettings)) {
      if (!value || value === 'default') {
        results.skipped.push(`Content:${type} (default/empty)`);
        continue;
      }
      
      try {
        if (!chrome.contentSettings?.[type]) {
          results.skipped.push(`Content:${type} (API unavailable)`);
          continue;
        }
        
        await new Promise((resolve, reject) => {
          chrome.contentSettings[type].set({
            primaryPattern: '<all_urls>',
            setting: value
          }, () => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              resolve();
            }
          });
        });
        
        results.success.push(`Content:${type}`);
        results.details.push({ type: 'content', name: type, value, status: 'success' });
        log('APPLY', `✓ Content ${type} = ${value}`);
        
      } catch (e) {
        results.failed.push(`Content:${type}`);
        results.details.push({ type: 'content', name: type, value, status: 'failed', error: e.message });
        log('APPLY', `✗ Content ${type} failed:`, e.message);
      }
    }

    // ============================================
    // Apply Privacy Settings - THE KEY PART
    // ============================================
    log('APPLY', `Applying ${settings.privacySettings.length} privacy settings...`);
    
    for (const setting of settings.privacySettings) {
      const { category, name, value, levelOfControl } = setting;
      const fullName = `${category}.${name}`;
      
      log('APPLY', `Processing privacy: ${fullName} = ${value} (${typeof value})`);
      
      // Check if controllable
      if (levelOfControl === 'not_controllable') {
        results.skipped.push(`Privacy:${fullName} (policy locked)`);
        results.details.push({ type: 'privacy', name: fullName, value, status: 'skipped', reason: 'policy locked' });
        log('APPLY', `⊘ Privacy ${fullName} skipped - controlled by policy`);
        continue;
      }
      
      // Check API exists
      const privacyAPI = chrome.privacy?.[category]?.[name];
      if (!privacyAPI) {
        results.skipped.push(`Privacy:${fullName} (API unavailable)`);
        results.details.push({ type: 'privacy', name: fullName, value, status: 'skipped', reason: 'API unavailable' });
        log('APPLY', `⊘ Privacy ${fullName} skipped - API not found`);
        continue;
      }
      
      try {
        // First, get current value to compare
        const currentValue = await new Promise((resolve, reject) => {
          privacyAPI.get({}, (details) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              resolve(details);
            }
          });
        });
        
        log('APPLY', `Current value of ${fullName}:`, currentValue);
        
        // Check if we can control it
        if (currentValue.levelOfControl === 'not_controllable') {
          results.skipped.push(`Privacy:${fullName} (not controllable)`);
          results.details.push({ type: 'privacy', name: fullName, value, status: 'skipped', reason: 'not controllable' });
          log('APPLY', `⊘ Privacy ${fullName} skipped - not controllable`);
          continue;
        }
        
        // Now try to set the value
        log('APPLY', `Setting ${fullName} to:`, value);
        
        await new Promise((resolve, reject) => {
          privacyAPI.set({ value: value }, () => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              resolve();
            }
          });
        });
        
        // Verify it was set
        const verifyValue = await new Promise((resolve, reject) => {
          privacyAPI.get({}, (details) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              resolve(details);
            }
          });
        });
        
        log('APPLY', `Verify ${fullName}:`, verifyValue);
        
        if (verifyValue.value === value) {
          results.success.push(`Privacy:${fullName}`);
          results.details.push({ type: 'privacy', name: fullName, value, status: 'success', verified: true });
          log('APPLY', `✓ Privacy ${fullName} = ${value} (VERIFIED)`);
        } else {
          results.failed.push(`Privacy:${fullName} (not applied)`);
          results.details.push({ 
            type: 'privacy', name: fullName, value, status: 'failed', 
            reason: `Value is still ${verifyValue.value}`,
            currentControl: verifyValue.levelOfControl
          });
          log('APPLY', `✗ Privacy ${fullName} - value did not change! Current:`, verifyValue);
        }
        
      } catch (e) {
        results.failed.push(`Privacy:${fullName}`);
        results.details.push({ type: 'privacy', name: fullName, value, status: 'failed', error: e.message });
        log('APPLY', `✗ Privacy ${fullName} failed:`, e.message);
      }
    }

    // ============================================
    // Apply Font Settings
    // ============================================
    if (chrome.fontSettings && Object.keys(settings.fontSettings).length > 0) {
      log('APPLY', 'Applying font settings...');
      try {
        if (settings.fontSettings.defaultFontSize) {
          await new Promise(r => chrome.fontSettings.setDefaultFontSize({ pixelSize: settings.fontSettings.defaultFontSize }, r));
          results.success.push('Font:defaultSize');
          log('APPLY', `✓ Font defaultSize = ${settings.fontSettings.defaultFontSize}`);
        }
        if (settings.fontSettings.defaultFixedFontSize) {
          await new Promise(r => chrome.fontSettings.setDefaultFixedFontSize({ pixelSize: settings.fontSettings.defaultFixedFontSize }, r));
          results.success.push('Font:fixedSize');
        }
        if (settings.fontSettings.minimumFontSize) {
          await new Promise(r => chrome.fontSettings.setMinimumFontSize({ pixelSize: settings.fontSettings.minimumFontSize }, r));
          results.success.push('Font:minSize');
        }
      } catch (e) {
        results.failed.push('Font settings');
        log('APPLY', 'Font settings error:', e.message);
      }
    }

    log('APPLY', '=== FINAL RESULTS ===');
    log('APPLY', `Success: ${results.success.length}`, results.success);
    log('APPLY', `Failed: ${results.failed.length}`, results.failed);
    log('APPLY', `Skipped: ${results.skipped.length}`, results.skipped);
    log('APPLY', 'Details:', results.details);
    
    return results;
  }

  /**
   * Handle Export
   */
  async function handleExport() {
    try {
      showLoading('Collecting settings...');
      const settings = await collectSettings();
      
      showLoading('Generating XML...');
      const xml = settingsToXML(settings);
      
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const filename = `edge-settings-${timestamp}.xml`;
      
      showLoading('Downloading...');
      
      chrome.downloads.download({
        url: url,
        filename: filename,
        saveAs: true
      }, (downloadId) => {
        hideLoading();
        URL.revokeObjectURL(url);
        
        if (chrome.runtime.lastError) {
          showStatus('error', 'Download failed: ' + chrome.runtime.lastError.message);
        } else if (downloadId) {
          const count = Object.keys(settings.contentSettings).length + settings.privacySettings.length;
          showStatus('success', `Exported ${count} settings! Open DevTools (F12) for details.`);
        } else {
          showStatus('error', 'Download cancelled');
        }
      });
      
    } catch (error) {
      hideLoading();
      showStatus('error', 'Export failed: ' + error.message);
      console.error('Export error:', error);
    }
  }

  /**
   * Handle Import
   */
  async function handleImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    event.target.value = '';
    
    try {
      showLoading('Reading file...');
      
      const xmlString = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
      });
      
      showLoading('Parsing...');
      const settings = parseXML(xmlString);
      
      showLoading('Applying settings...');
      const results = await applySettings(settings);
      
      hideLoading();
      
      // Build detailed message
      let message = '';
      if (results.success.length > 0) {
        message += `✓ ${results.success.length} applied. `;
      }
      if (results.failed.length > 0) {
        message += `✗ ${results.failed.length} failed. `;
      }
      if (results.skipped.length > 0) {
        message += `⊘ ${results.skipped.length} skipped. `;
      }
      message += 'Check DevTools (F12) for full details.';
      
      if (results.success.length > 0) {
        showStatus('success', message, true);
      } else if (results.failed.length > 0) {
        showStatus('error', message, false);
      } else {
        showStatus('info', 'No settings could be applied. ' + message, false);
      }
      
      // Also alert with details for visibility
      const detailMsg = [
        `=== IMPORT RESULTS ===`,
        ``,
        `SUCCESS (${results.success.length}):`,
        results.success.join('\n') || '(none)',
        ``,
        `FAILED (${results.failed.length}):`,
        results.failed.join('\n') || '(none)',
        ``,
        `SKIPPED (${results.skipped.length}):`,
        results.skipped.join('\n') || '(none)',
        ``,
        `See DevTools Console (F12) for complete details.`
      ].join('\n');
      
      console.log(detailMsg);
      
    } catch (error) {
      hideLoading();
      showStatus('error', 'Import failed: ' + error.message);
      console.error('Import error:', error);
    }
  }
});
