// Background script for Wordle extension
console.log('Wordle extension background script loaded');

// Extension state management
let extensionState = {
    isActive: true,
    archiveStatus: 'Not loaded',
    solutionsCount: 0,
    archiveCount: 0,
    lastUpdate: null
};

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
    console.log('Wordle extension installed:', details.reason);
    
    // Set default settings
    chrome.storage.local.set({
        autoFetch: true,
        debugPanelVisible: false,
        extensionEnabled: true
    });
    
    // Create context menu items
    chrome.contextMenus.create({
        id: 'toggleDebugPanel',
        title: 'Toggle Wordle Debug Panel',
        contexts: ['page'],
        documentUrlPatterns: ['*://www.nytimes.com/games/wordle/*']
    });
    
    chrome.contextMenus.create({
        id: 'fetchArchive',
        title: 'Fetch Wordle Archive',
        contexts: ['page'],
        documentUrlPatterns: ['*://www.nytimes.com/games/wordle/*']
    });
});

// Handle messages from content script and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.action) {
        case 'getState':
            sendResponse(extensionState);
            break;
            
        case 'statusUpdate':
            extensionState = {
                ...extensionState,
                archiveStatus: message.archiveStatus || extensionState.archiveStatus,
                solutionsCount: message.solutionsCount || extensionState.solutionsCount,
                archiveCount: message.archiveCount || extensionState.archiveCount,
                lastUpdate: new Date().toISOString()
            };
            
            // Update badge text with solutions count
            if (message.solutionsCount) {
                chrome.action.setBadgeText({
                    text: message.solutionsCount.toString(),
                    tabId: sender.tab?.id
                });
                chrome.action.setBadgeBackgroundColor({color: '#4CAF50'});
            }
            break;
            
        case 'toggleExtension':
            extensionState.isActive = !extensionState.isActive;
            chrome.storage.local.set({extensionEnabled: extensionState.isActive});
            
            // Update icon based on state
            chrome.action.setIcon({
                path: extensionState.isActive ? {
                    "16": "icons/icon16.png",
                    "48": "icons/icon48.png",
                    "128": "icons/icon128.png"
                } : {
                    "16": "icons/icon16-disabled.png",
                    "48": "icons/icon48-disabled.png", 
                    "128": "icons/icon128-disabled.png"
                }
            });
            sendResponse({isActive: extensionState.isActive});
            break;
            
        default:
            sendResponse({error: 'Unknown action'});
    }
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case 'toggleDebugPanel':
            chrome.tabs.sendMessage(tab.id, {action: 'toggleDebugPanel'});
            break;
            
        case 'fetchArchive':
            chrome.tabs.sendMessage(tab.id, {action: 'fetchArchive'});
            break;
    }
});

// Handle tab updates to inject content script if needed
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.includes('nytimes.com/games/wordle')) {
        // Reset badge for new Wordle page
        chrome.action.setBadgeText({text: '', tabId: tabId});
    }
});

// Load saved settings on startup
chrome.storage.local.get(['extensionEnabled'], (result) => {
    if (result.extensionEnabled !== undefined) {
        extensionState.isActive = result.extensionEnabled;
    }
});

// Periodic cleanup of old data
setInterval(() => {
    chrome.storage.local.get(null, (items) => {
        const now = Date.now();
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        
        for (const [key, value] of Object.entries(items)) {
            if (key.startsWith('wdp_cache_') && typeof value === 'object' && value.timestamp) {
                if (now - value.timestamp > oneWeek) {
                    chrome.storage.local.remove(key);
                }
            }
        }
    });
}, 24 * 60 * 60 * 1000); // Run daily