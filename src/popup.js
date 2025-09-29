// Popup script for Wordle extension
console.log('Wordle extension popup script loaded');

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Popup DOM loaded');
    
    // Get DOM elements
    const extensionStatusEl = document.getElementById('extensionStatus');
    const solutionsCountEl = document.getElementById('solutionsCount');
    const archiveStatusEl = document.getElementById('archiveStatus');
    const lastUpdateEl = document.getElementById('lastUpdate');
    const loadingEl = document.getElementById('loading');
    
    const togglePanelBtn = document.getElementById('togglePanel');
    const fetchArchiveBtn = document.getElementById('fetchArchive');
    const toggleAutoFetchBtn = document.getElementById('toggleAutoFetch');
    const toggleExtensionBtn = document.getElementById('toggleExtension');

    // State management
    let extensionState = {
        isActive: true,
        autoFetch: true,
        archiveStatus: 'Not loaded',
        solutionsCount: 0,
        archiveCount: 0,
        lastUpdate: null
    };

    // Utility functions
    function showLoading(show = true) {
        loadingEl.style.display = show ? 'block' : 'none';
    }

    function formatTimestamp(timestamp) {
        if (!timestamp) return 'Never';
        try {
            const date = new Date(timestamp);
            return date.toLocaleTimeString();
        } catch (e) {
            return 'Invalid';
        }
    }

    function updateUI() {
        extensionStatusEl.textContent = extensionState.isActive ? 'Active' : 'Disabled';
        extensionStatusEl.style.color = extensionState.isActive ? '#4CAF50' : '#f44336';
        
        solutionsCountEl.textContent = extensionState.solutionsCount || '-';
        archiveStatusEl.textContent = extensionState.archiveStatus || 'Not loaded';
        lastUpdateEl.textContent = formatTimestamp(extensionState.lastUpdate);
        
        toggleAutoFetchBtn.textContent = extensionState.autoFetch ? 'Auto-Fetch: ON' : 'Auto-Fetch: OFF';
        toggleAutoFetchBtn.className = extensionState.autoFetch ? 'btn btn-secondary' : 'btn btn-secondary';
        
        toggleExtensionBtn.textContent = extensionState.isActive ? 'Disable' : 'Enable';
        toggleExtensionBtn.className = extensionState.isActive ? 'btn btn-danger' : 'btn btn-primary';
        
        // Update button states based on extension status
        const buttonsToDisable = [togglePanelBtn, fetchArchiveBtn, toggleAutoFetchBtn];
        buttonsToDisable.forEach(btn => {
            btn.disabled = !extensionState.isActive;
            btn.style.opacity = extensionState.isActive ? '1' : '0.5';
        });
    }

    // Get current tab and check if it's a Wordle page
    async function getCurrentTab() {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        return tab;
    }

    async function isWordlePage() {
        const tab = await getCurrentTab();
        return tab && tab.url && tab.url.includes('nytimes.com/games/wordle');
    }

    // Load initial state
    async function loadState() {
        showLoading(true);
        
        try {
            // Get state from background script
            const bgState = await chrome.runtime.sendMessage({ action: 'getState' });
            if (bgState) {
                extensionState = { ...extensionState, ...bgState };
            }

            // Get settings from storage
            const settings = await chrome.storage.local.get(['autoFetch', 'extensionEnabled']);
            if (settings.autoFetch !== undefined) {
                extensionState.autoFetch = settings.autoFetch;
            }
            if (settings.extensionEnabled !== undefined) {
                extensionState.isActive = settings.extensionEnabled;
            }

            // Try to get content script state if on Wordle page
            if (await isWordlePage()) {
                try {
                    const tab = await getCurrentTab();
                    const contentState = await chrome.tabs.sendMessage(tab.id, { action: 'getState' });
                    if (contentState) {
                        extensionState = { ...extensionState, ...contentState };
                    }
                } catch (e) {
                    console.log('Could not reach content script:', e);
                }
            }
        } catch (error) {
            console.error('Error loading state:', error);
        } finally {
            showLoading(false);
            updateUI();
        }
    }

    // Send message to content script
    async function sendToContentScript(action, data = {}) {
        if (!(await isWordlePage())) {
            alert('Please navigate to a Wordle page first!');
            return;
        }

        try {
            const tab = await getCurrentTab();
            return await chrome.tabs.sendMessage(tab.id, { action, ...data });
        } catch (error) {
            console.error('Error sending message to content script:', error);
            alert('Could not communicate with Wordle page. Please refresh the page and try again.');
        }
    }

    // Event handlers
    togglePanelBtn.addEventListener('click', async () => {
        showLoading(true);
        await sendToContentScript('toggleDebugPanel');
        showLoading(false);
    });

    fetchArchiveBtn.addEventListener('click', async () => {
        showLoading(true);
        await sendToContentScript('fetchArchive');
        
        // Wait a moment then refresh state
        setTimeout(async () => {
            await loadState();
            showLoading(false);
        }, 1000);
    });

    toggleAutoFetchBtn.addEventListener('click', async () => {
        extensionState.autoFetch = !extensionState.autoFetch;
        
        try {
            await chrome.storage.local.set({ autoFetch: extensionState.autoFetch });
            
            // Notify content script if on Wordle page
            if (await isWordlePage()) {
                await sendToContentScript('setAutoFetch', { autoFetch: extensionState.autoFetch });
            }
            
            updateUI();
        } catch (error) {
            console.error('Error toggling auto-fetch:', error);
        }
    });

    toggleExtensionBtn.addEventListener('click', async () => {
        showLoading(true);
        
        try {
            const response = await chrome.runtime.sendMessage({ action: 'toggleExtension' });
            if (response && response.isActive !== undefined) {
                extensionState.isActive = response.isActive;
                updateUI();
            }
        } catch (error) {
            console.error('Error toggling extension:', error);
        } finally {
            showLoading(false);
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'd':
                    e.preventDefault();
                    togglePanelBtn.click();
                    break;
                case 'f':
                    e.preventDefault();
                    fetchArchiveBtn.click();
                    break;
                case 'e':
                    e.preventDefault();
                    toggleExtensionBtn.click();
                    break;
            }
        }
    });

    // Periodic state refresh
    const refreshInterval = setInterval(async () => {
        if (await isWordlePage()) {
            await loadState();
        }
    }, 5000);

    // Cleanup on popup close
    window.addEventListener('beforeunload', () => {
        clearInterval(refreshInterval);
    });

    // Initial load
    await loadState();

    // Show keyboard shortcuts hint
    console.log('Keyboard shortcuts: Ctrl+D (toggle panel), Ctrl+F (fetch archive), Ctrl+E (toggle extension)');
});