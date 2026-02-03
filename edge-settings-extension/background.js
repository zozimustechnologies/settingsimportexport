// Background service worker for Edge Settings Extension
// Handles side panel opening and browser restart

// Open side panel when extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId });
});

// Set side panel behavior - open on action click
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// Listen for restart request from side panel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'restartBrowser') {
    performRestart();
    sendResponse({ status: 'restarting' });
  }
  return true;
});

// Perform browser restart
async function performRestart() {
  try {
    // Method 1: Try the restart API (works on some platforms)
    if (chrome.runtime.restart) {
      chrome.runtime.restart();
      return;
    }
  } catch (e) {
    console.log('runtime.restart not available');
  }

  // Method 2: Navigate current tab to edge://restart
  try {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (activeTab) {
      await chrome.tabs.update(activeTab.id, { url: 'edge://restart' });
    }
  } catch (e) {
    console.log('Tab update failed, creating new tab');
    // Method 3: Create a new tab with edge://restart
    chrome.tabs.create({ url: 'edge://restart' });
  }
}
