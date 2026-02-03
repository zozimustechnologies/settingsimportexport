// Edge Settings Side Panel v1.6
// Shows export results + fixed restart

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const exportBtn = document.getElementById('exportBtn');
  const importBtn = document.getElementById('importBtn');
  const fileInput = document.getElementById('fileInput');
  const statusMessage = document.getElementById('statusMessage');
  const statusIcon = document.getElementById('statusIcon');
  const statusText = document.getElementById('statusText');
  const loadingOverlay = document.getElementById('loadingOverlay');
  const loadingText = document.getElementById('loadingText');
  
  // Export results elements
  const exportResultsSection = document.getElementById('exportResultsSection');
  const exportSummary = document.getElementById('exportSummary');
  const contentSettingsList = document.getElementById('contentSettingsList');
  const privacySettingsList = document.getElementById('privacySettingsList');
  const exportedFontList = document.getElementById('exportedFontList');
  const fontSettingsList = document.getElementById('fontSettingsList');
  const closeExportResultsBtn = document.getElementById('closeExportResultsBtn');
  
  // Import results elements
  const importResultsSection = document.getElementById('importResultsSection');
  const changedSection = document.getElementById('changedSection');
  const changedList = document.getElementById('changedList');
  const unchangedSection = document.getElementById('unchangedSection');
  const unchangedList = document.getElementById('unchangedList');
  const skippedSection = document.getElementById('skippedSection');
  const skippedList = document.getElementById('skippedList');
  const failedSection = document.getElementById('failedSection');
  const failedList = document.getElementById('failedList');
  const closeResultsBtn = document.getElementById('closeResultsBtn');
  
  // Modal elements
  const showDetailsLink = document.getElementById('showDetailsLink');
  const detailsModal = document.getElementById('detailsModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  // Event listeners
  exportBtn.addEventListener('click', handleExport);
  importBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', handleImport);
  closeResultsBtn.addEventListener('click', () => importResultsSection.classList.add('hidden'));
  closeExportResultsBtn.addEventListener('click', () => exportResultsSection.classList.add('hidden'));
  showDetailsLink.addEventListener('click', (e) => {
    e.preventDefault();
    detailsModal.classList.remove('hidden');
  });
  closeModalBtn.addEventListener('click', () => detailsModal.classList.add('hidden'));
  detailsModal.addEventListener('click', (e) => {
    if (e.target === detailsModal) detailsModal.classList.add('hidden');
  });

  function showLoading(message) {
    loadingText.textContent = message;
    loadingOverlay.classList.remove('hidden');
  }

  function hideLoading() {
    loadingOverlay.classList.add('hidden');
  }

  function showStatus(type, message) {
    statusMessage.className = `status-message ${type}`;
    statusIcon.textContent = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
    statusText.textContent = message;
    statusMessage.classList.remove('hidden');
    setTimeout(() => statusMessage.classList.add('hidden'), 6000);
  }

  function log(cat, msg, data) {
    const prefix = `[Settings:${cat}]`;
    data !== undefined ? console.log(prefix, msg, data) : console.log(prefix, msg);
  }

  function formatValue(val) {
    if (val === true) return 'On';
    if (val === false) return 'Off';
    if (val === null || val === undefined) return 'Not set';
    return String(val);
  }

  /**
   * Display export results
   */
  function displayExportResults(settings) {
    // Hide import results if showing
    importResultsSection.classList.add('hidden');
    
    const contentCount = Object.keys(settings.contentSettings).length;
    const privacyCount = settings.privacySettings.length;
    const fontCount = Object.keys(settings.fontSettings || {}).filter(k => settings.fontSettings[k]).length;
    
    exportSummary.textContent = `Exported ${contentCount} content settings, ${privacyCount} privacy settings` + 
      (fontCount > 0 ? `, ${fontCount} font settings` : '');
    
    // Content settings list
    contentSettingsList.innerHTML = Object.entries(settings.contentSettings)
      .map(([name, value]) => `
        <div class="setting-item">
          <span class="setting-name">${name}</span>
          <span class="setting-value">${formatValue(value)}</span>
        </div>
      `).join('');
    
    // Privacy settings list
    privacySettingsList.innerHTML = settings.privacySettings
      .map(s => `
        <div class="setting-item">
          <span class="setting-name">${s.category}.${s.name}</span>
          <span class="setting-value">${formatValue(s.value)}</span>
        </div>
      `).join('');
    
    // Font settings
    if (fontCount > 0) {
      exportedFontList.classList.remove('hidden');
      fontSettingsList.innerHTML = Object.entries(settings.fontSettings)
        .filter(([, v]) => v)
        .map(([name, value]) => `
          <div class="setting-item">
            <span class="setting-name">${name}</span>
            <span class="setting-value">${value}px</span>
          </div>
        `).join('');
    } else {
      exportedFontList.classList.add('hidden');
    }
    
    exportResultsSection.classList.remove('hidden');
  }

  /**
   * Display import results with detailed before/after values
   */
  function displayImportResults(results) {
    // Hide export results if showing
    exportResultsSection.classList.add('hidden');
    
    // Reset all sections
    changedSection.classList.add('hidden');
    unchangedSection.classList.add('hidden');
    skippedSection.classList.add('hidden');
    failedSection.classList.add('hidden');
    changedList.innerHTML = '';
    unchangedList.innerHTML = '';
    skippedList.innerHTML = '';
    failedList.innerHTML = '';

    // Changed settings
    if (results.changed.length > 0) {
      changedSection.classList.remove('hidden');
      changedList.innerHTML = results.changed.map(item => `
        <div class="setting-item">
          <span class="setting-name">${item.name}</span>
          <span class="setting-change">
            <span class="old-value">${formatValue(item.oldValue)}</span>
            → <span class="new-value">${formatValue(item.newValue)}</span>
          </span>
        </div>
      `).join('');
    }

    // Unchanged settings
    if (results.unchanged.length > 0) {
      unchangedSection.classList.remove('hidden');
      unchangedList.innerHTML = results.unchanged.map(item => `
        <div class="setting-item">
          <span class="setting-name">${item.name}</span>
          <span class="setting-change">Value: ${formatValue(item.value)}</span>
        </div>
      `).join('');
    }

    // Skipped settings
    if (results.skipped.length > 0) {
      skippedSection.classList.remove('hidden');
      skippedList.innerHTML = results.skipped.map(item => `
        <div class="setting-item">
          <span class="setting-name">${item.name}</span>
          <span class="setting-change">${item.reason}</span>
        </div>
      `).join('');
    }

    // Failed settings
    if (results.failed.length > 0) {
      failedSection.classList.remove('hidden');
      failedList.innerHTML = results.failed.map(item => `
        <div class="setting-item">
          <span class="setting-name">${item.name}</span>
          <span class="setting-change">${item.error}</span>
        </div>
      `).join('');
    }

    importResultsSection.classList.remove('hidden');
  }

  // =====================================================
  // COLLECT SETTINGS
  // =====================================================
  async function collectSettings() {
    log('EXPORT', 'Collecting settings...');
    
    const settings = {
      exportDate: new Date().toISOString(),
      exportVersion: '1.6',
      contentSettings: {},
      privacySettings: [],
      fontSettings: {}
    };

    // Content Settings (removed deprecated: fullscreen, mouselock)
    const contentTypes = ['cookies', 'images', 'javascript', 'notifications', 'popups',
      'location', 'camera', 'microphone', 'automaticDownloads'];

    for (const type of contentTypes) {
      try {
        if (chrome.contentSettings?.[type]) {
          const result = await new Promise((resolve, reject) => {
            chrome.contentSettings[type].get({ primaryUrl: 'https://example.com/' }, (d) => {
              chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve(d);
            });
          });
          settings.contentSettings[type] = result?.setting || 'default';
        }
      } catch (e) { log('EXPORT', `Content ${type} error:`, e.message); }
    }

    // Privacy Settings
    const privacyAPIs = [
      { c: 'network', n: 'networkPredictionEnabled' },
      { c: 'network', n: 'webRTCIPHandlingPolicy' },
      { c: 'websites', n: 'doNotTrackEnabled' },
      { c: 'websites', n: 'hyperlinkAuditingEnabled' },
      { c: 'websites', n: 'referrersEnabled' },
      { c: 'websites', n: 'protectedContentEnabled' },
      { c: 'websites', n: 'thirdPartyCookiesAllowed' },
      { c: 'services', n: 'safeBrowsingEnabled' },
      { c: 'services', n: 'safeBrowsingExtendedReportingEnabled' },
      { c: 'services', n: 'searchSuggestEnabled' },
      { c: 'services', n: 'spellingServiceEnabled' },
      { c: 'services', n: 'translationServiceEnabled' },
      { c: 'services', n: 'autofillEnabled' },
      { c: 'services', n: 'autofillAddressEnabled' },
      { c: 'services', n: 'autofillCreditCardEnabled' },
      { c: 'services', n: 'passwordSavingEnabled' }
    ];

    for (const api of privacyAPIs) {
      try {
        const privacyObj = chrome.privacy?.[api.c]?.[api.n];
        if (privacyObj) {
          const result = await new Promise((resolve, reject) => {
            privacyObj.get({}, (d) => {
              chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve(d);
            });
          });
          if (result) {
            settings.privacySettings.push({
              category: api.c,
              name: api.n,
              value: result.value,
              levelOfControl: result.levelOfControl
            });
          }
        }
      } catch (e) { log('EXPORT', `Privacy ${api.c}.${api.n} error:`, e.message); }
    }

    // Font Settings
    try {
      if (chrome.fontSettings) {
        const [d, f, m] = await Promise.all([
          new Promise(r => chrome.fontSettings.getDefaultFontSize({}, r)),
          new Promise(r => chrome.fontSettings.getDefaultFixedFontSize({}, r)),
          new Promise(r => chrome.fontSettings.getMinimumFontSize({}, r))
        ]);
        settings.fontSettings = {
          defaultFontSize: d?.pixelSize,
          defaultFixedFontSize: f?.pixelSize,
          minimumFontSize: m?.pixelSize
        };
      }
    } catch (e) { log('EXPORT', 'Font error:', e.message); }

    log('EXPORT', 'Complete:', settings);
    return settings;
  }

  // =====================================================
  // SETTINGS TO XML
  // =====================================================
  function settingsToXML(settings) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<EdgeSettings>\n';
    xml += `  <ExportDate>${esc(settings.exportDate)}</ExportDate>\n`;
    xml += `  <ExportVersion>${esc(settings.exportVersion)}</ExportVersion>\n`;
    
    xml += '  <ContentSettings>\n';
    for (const [k, v] of Object.entries(settings.contentSettings)) {
      xml += `    <Setting name="${esc(k)}" value="${esc(String(v))}" />\n`;
    }
    xml += '  </ContentSettings>\n';

    xml += '  <PrivacySettings>\n';
    for (const s of settings.privacySettings) {
      xml += `    <Setting category="${esc(s.category)}" name="${esc(s.name)}" `;
      xml += `value="${esc(String(s.value))}" levelOfControl="${esc(s.levelOfControl)}" />\n`;
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

  function esc(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  }

  // =====================================================
  // PARSE XML
  // =====================================================
  function parseXML(xmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, 'text/xml');
    
    if (doc.querySelector('parsererror')) {
      throw new Error('Invalid XML format');
    }

    const root = doc.querySelector('EdgeSettings');
    if (!root) throw new Error('Missing EdgeSettings element');

    const settings = { contentSettings: {}, privacySettings: [], fontSettings: {} };

    // Content
    for (const el of root.querySelectorAll('ContentSettings > Setting')) {
      const name = el.getAttribute('name');
      const value = el.getAttribute('value');
      if (name && value) settings.contentSettings[name] = value;
    }

    // Privacy
    for (const el of root.querySelectorAll('PrivacySettings > Setting')) {
      const category = el.getAttribute('category');
      const name = el.getAttribute('name');
      const valueStr = el.getAttribute('value');
      const levelOfControl = el.getAttribute('levelOfControl');
      
      if (category && name && valueStr !== null) {
        let value = valueStr === 'true' ? true : valueStr === 'false' ? false : valueStr;
        settings.privacySettings.push({ category, name, value, levelOfControl });
      }
    }

    // Fonts
    const fonts = root.querySelector('FontSettings');
    if (fonts) {
      const d = fonts.querySelector('DefaultFontSize')?.textContent;
      const f = fonts.querySelector('DefaultFixedFontSize')?.textContent;
      const m = fonts.querySelector('MinimumFontSize')?.textContent;
      if (d) settings.fontSettings.defaultFontSize = parseInt(d, 10);
      if (f) settings.fontSettings.defaultFixedFontSize = parseInt(f, 10);
      if (m) settings.fontSettings.minimumFontSize = parseInt(m, 10);
    }

    log('PARSE', 'Parsed:', settings);
    return settings;
  }

  // =====================================================
  // APPLY SETTINGS
  // =====================================================
  async function applySettings(settings) {
    const results = { 
      changed: [],
      unchanged: [],
      skipped: [],
      failed: []
    };

    // Apply Content Settings
    for (const [type, targetValue] of Object.entries(settings.contentSettings)) {
      const displayName = `Content: ${type}`;
      
      if (!targetValue || targetValue === 'default') {
        results.skipped.push({ name: displayName, reason: 'Default/empty value' });
        continue;
      }
      
      if (!chrome.contentSettings?.[type]) {
        results.skipped.push({ name: displayName, reason: 'API not available' });
        continue;
      }
      
      try {
        const current = await new Promise((resolve, reject) => {
          chrome.contentSettings[type].get({ primaryUrl: 'https://example.com/' }, (d) => {
            chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve(d);
          });
        });
        
        const oldValue = current?.setting;
        
        if (oldValue === targetValue) {
          results.unchanged.push({ name: displayName, value: targetValue });
          continue;
        }
        
        await new Promise((resolve, reject) => {
          chrome.contentSettings[type].set({ primaryPattern: '<all_urls>', setting: targetValue }, () => {
            chrome.runtime.lastError ? reject(new Error(chrome.runtime.lastError.message)) : resolve();
          });
        });
        
        const verify = await new Promise((resolve, reject) => {
          chrome.contentSettings[type].get({ primaryUrl: 'https://example.com/' }, (d) => {
            chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve(d);
          });
        });
        
        if (verify?.setting === targetValue) {
          results.changed.push({ name: displayName, oldValue, newValue: targetValue });
        } else {
          results.failed.push({ name: displayName, error: `Still ${verify?.setting}` });
        }
        
      } catch (e) {
        results.failed.push({ name: displayName, error: e.message });
      }
    }

    // Apply Privacy Settings
    for (const setting of settings.privacySettings) {
      const { category, name, value: targetValue, levelOfControl } = setting;
      const displayName = `${category}: ${name}`;
      
      if (levelOfControl === 'not_controllable') {
        results.skipped.push({ name: displayName, reason: 'Policy controlled' });
        continue;
      }
      
      const api = chrome.privacy?.[category]?.[name];
      if (!api) {
        results.skipped.push({ name: displayName, reason: 'API not available' });
        continue;
      }
      
      try {
        const current = await new Promise((resolve, reject) => {
          api.get({}, (d) => chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve(d));
        });
        
        const oldValue = current?.value;
        const currentControl = current?.levelOfControl;
        
        if (currentControl === 'not_controllable') {
          results.skipped.push({ name: displayName, reason: 'Locked by policy' });
          continue;
        }
        
        if (oldValue === targetValue) {
          results.unchanged.push({ name: displayName, value: targetValue });
          continue;
        }
        
        await new Promise((resolve, reject) => {
          api.set({ value: targetValue }, () => {
            chrome.runtime.lastError ? reject(new Error(chrome.runtime.lastError.message)) : resolve();
          });
        });
        
        const verify = await new Promise((resolve, reject) => {
          api.get({}, (d) => chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve(d));
        });
        
        if (verify?.value === targetValue) {
          results.changed.push({ name: displayName, oldValue, newValue: targetValue });
        } else {
          results.failed.push({ name: displayName, error: `Value unchanged` });
        }
        
      } catch (e) {
        results.failed.push({ name: displayName, error: e.message });
      }
    }

    // Apply Font Settings
    if (chrome.fontSettings && Object.keys(settings.fontSettings).length > 0) {
      const fs = settings.fontSettings;
      
      if (fs.defaultFontSize) {
        try {
          const current = await new Promise(r => chrome.fontSettings.getDefaultFontSize({}, r));
          const oldValue = current?.pixelSize;
          
          if (oldValue === fs.defaultFontSize) {
            results.unchanged.push({ name: 'Font: Default Size', value: fs.defaultFontSize });
          } else {
            await new Promise(r => chrome.fontSettings.setDefaultFontSize({ pixelSize: fs.defaultFontSize }, r));
            results.changed.push({ name: 'Font: Default Size', oldValue, newValue: fs.defaultFontSize });
          }
        } catch (e) {
          results.failed.push({ name: 'Font: Default Size', error: e.message });
        }
      }
      
      if (fs.minimumFontSize) {
        try {
          const current = await new Promise(r => chrome.fontSettings.getMinimumFontSize({}, r));
          const oldValue = current?.pixelSize;
          
          if (oldValue === fs.minimumFontSize) {
            results.unchanged.push({ name: 'Font: Minimum Size', value: fs.minimumFontSize });
          } else {
            await new Promise(r => chrome.fontSettings.setMinimumFontSize({ pixelSize: fs.minimumFontSize }, r));
            results.changed.push({ name: 'Font: Minimum Size', oldValue, newValue: fs.minimumFontSize });
          }
        } catch (e) {
          results.failed.push({ name: 'Font: Minimum Size', error: e.message });
        }
      }
    }

    log('APPLY', 'Final results:', results);
    return results;
  }

  // =====================================================
  // HANDLERS
  // =====================================================
  async function handleExport() {
    try {
      // Hide any previous results
      exportResultsSection.classList.add('hidden');
      importResultsSection.classList.add('hidden');
      
      showLoading('Collecting settings...');
      const settings = await collectSettings();
      
      showLoading('Creating XML...');
      const xml = settingsToXML(settings);
      
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      
      showLoading('Downloading...');
      
      chrome.downloads.download({
        url: url,
        filename: `edge-settings-${timestamp}.xml`,
        saveAs: true
      }, (downloadId) => {
        hideLoading();
        URL.revokeObjectURL(url);
        
        if (chrome.runtime.lastError) {
          showStatus('error', chrome.runtime.lastError.message);
        } else if (downloadId) {
          showStatus('success', 'Settings exported!');
          // Display export results
          displayExportResults(settings);
        } else {
          showStatus('info', 'Download cancelled');
        }
      });
    } catch (e) {
      hideLoading();
      showStatus('error', e.message);
    }
  }

  async function handleImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    event.target.value = '';
    
    // Hide any previous results
    exportResultsSection.classList.add('hidden');
    importResultsSection.classList.add('hidden');
    
    try {
      showLoading('Reading file...');
      
      const xmlString = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Failed to read'));
        reader.readAsText(file);
      });
      
      showLoading('Parsing...');
      const settings = parseXML(xmlString);
      
      showLoading('Applying settings...');
      const results = await applySettings(settings);
      
      hideLoading();
      
      // Display detailed results
      displayImportResults(results);
      
      // Show summary status
      if (results.changed.length > 0) {
        showStatus('success', `Changed ${results.changed.length} settings!`);
      } else if (results.unchanged.length > 0) {
        showStatus('info', `Settings already match (${results.unchanged.length} unchanged)`);
      } else {
        showStatus('info', 'No settings were changed');
      }
      
    } catch (e) {
      hideLoading();
      showStatus('error', e.message);
    }
  }
});
