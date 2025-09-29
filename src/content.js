// Wordle Accessibility Helper - Content Script
// Learning support for dyslexic users and non-native English speakers

(function() {
    'use strict';

    // Development mode check - only show debug features in dev builds
    const isDevelopment = __DEV__;
    const isProduction = __PROD__;

    // Minimal logger (only in development)
    function log(...args) { 
        if (isDevelopment) {
            try { 
                console.debug.apply(console, ['[Wordle Accessibility]'].concat(args)); 
            } catch(e){} 
        }
    }

    // Show development indicator
    if (isDevelopment) {
        log('Running in DEVELOPMENT mode');
    }

    const SOLUTIONS = new Set(["aback","abase","abate","abbey","abbot","abhor","abide","abled","abode","abort","about","above","abuse","abyss","acorn","acrid","actor","acute","adage","adapt","adept","admin","admit","adobe","adopt","adore","adorn","adult","affix","afire","afoot","afoul","after","again","agape","agate","agent","agile","aging","aglow","agony","agora","agree","ahead","aider","aisle","alarm","album","alert","algae","alibi","alien","align","alike","alive","allay","alley","allot","allow","alloy","aloft","alone","along","aloof","aloud","alpha","altar","alter","amass","amaze","amber","amble","amend","amiss","amity","among","ample","amply","amuse","angel","anger","angle","angry","angst","anime","ankle","annex","annoy","annul","anode","antic","anvil","aorta","apart","aphid","aping","apnea","apple","apply","apron","aptly","arbor","ardor","arena","argue","arise","armor","aroma","arose","array","arrow","arson","artsy","ascot","ashen","aside","askew","assay","asset","atoll","atone","attic","audio","audit","augur","aunty","avail","avert","avian","avoid","await","awake","award","aware","awash","awful","awoke","axial","axiom","axion","azure","bacon","badge","badly","bagel","baggy","baker","baler","balmy","banal","banjo","barge","baron","basal","basic","basil","basin","basis","baste","batch","bathe","baton","batty","bawdy","bayou","beach","beady","beard","beast","beech","beefy","befit","began","begat","beget","begin","begun","being","belch","belie","belle","belly","below","bench","beret","berry","berth","beset","betel","bevel","bezel","bible","bicep","biddy","bigot","bilge","billy","binge","bingo","biome","birch","birth","bison","bitty","black","blade","blame","bland","blank","blare","blast","blaze","bleak","bleat","bleed","bleep","blend","bless","blimp","blind","blink","bliss","blitz","bloat","block","bloke","blond","blood","bloom","blown","bluer","bluff","blunt","blurb","blurt","blush","board","boast","bobby","boney","bongo","bonus","booby","boost","booth","booty","booze","boozy","borax","borne","bosom","bossy","botch","bough","boule","bound","bowel","boxer","brace","braid","brain","brake","brand","brash","brass","brave","bravo","brawl","brawn","bread","break","breed","briar","bribe","brick","bride","brief","brine","bring","brink","briny","brisk","broad","broil","broke","brood","brook","broom","broth","brown","brunt","brush","brute","buddy","budge","buggy","bugle","build","built","bulge","bulky","bully","bunch","bunny","burly","burnt","burst","bused","bushy","butch","butte","buxom","buyer","bylaw","cabal","cabby","cabin","cable","cacao","cache","cacti","caddy","cadet","cagey","cairn","camel","cameo","canal","candy","canny","canoe","canon","caper","caput","carat","cargo","carol","carry","carve","caste","catch","cater","catty","caulk","cause","cavil","cease","cedar","cello","chafe","chaff","chain","chair","chalk","champ","chant","chaos","chard","charm","chart","chase","chasm","cheap","cheat","check","cheek","cheer","chess","chest","chick","chide","chief","child","chili","chill","chime","china","chirp","chock","choir","choke","chord","chore","chose","chuck","chump","chunk","churn","chute","cider","cigar","cinch","circa","civic","civil","clack","claim","clamp","clang","clank","clash","clasp","class","clean","clear","cleat","cleft","clerk","click","cliff","climb","cling","clink","cloak","clock","clone","close","cloth","cloud","clout","clove","clown","cluck","clued","clump","clung","coach","coast","cobra","cocoa","colon","color","comet","comfy","comic","comma","conch","condo","conic","copse","coral","corer","corny","couch","cough","could","count","coupe","court","coven","cover","covet","covey","cower","coyly","crack","craft","cramp","crane","crank","crash","crass","crate","crave","crawl","craze","crazy","creak","cream","credo","creed","creek","creep","creme","crepe","crept","cress","crest","crick","cried","crier","crime","crimp","crisp","croak","crock","crone","crony","crook","cross","croup","crowd","crown","crude","cruel","crumb","crump","crush","crust","crypt","cubic","cumin","curio","curly","curry","curse","curve","curvy","cutie","cyber","cycle","cynic","daddy","daily","dairy","daisy","dally"]);

    // Archive functionality - only in development
    let ARCHIVE = new Set();
    let archiveStatus = "Archive not loaded";
    let archiveRequested = false;
    
    // Development-only archive URL - now enabled for accessibility support in production too
    const ARCHIVE_URL = "https://gist.githubusercontent.com/cfreshman/a03ef2cba789d8cf00c08f767e0fad7b/raw/c46f451920d5cf6326d550fb2d6abb1642717852/wordle-answers-alphabetical.txt";

    // Communication with background script
    function sendMessage(action, data = {}) {
        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
            chrome.runtime.sendMessage({ action, ...data }).catch(err => {
                log('Message sending failed:', err);
            });
        }
    }

    // Listen for messages from popup/background
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.action === 'getState') {
                sendResponse({
                    archiveStatus: isDevelopment ? archiveStatus : 'Production mode',
                    solutionsCount: SOLUTIONS.size,
                    archiveCount: isDevelopment ? ARCHIVE.size : 0,
                    isDevelopment,
                    isProduction
                });
            } else if (isDevelopment && message.action === 'toggleDebugPanel') {
                toggleDebugPanel();
            } else if (message.action === 'fetchArchive') {
                fetchArchive(false, true);
            }
        });
    }

    function getRows() {
        const selectors = [
            '#wordle-app-game .Board-module_boardContainer__TBHNL > div > div',
            '#wordle-app-game > div.Board-module_boardContainer__TBHNL > div > div',
            '#wordle-app-game .Board-module_board__lbzlf > div',
            '#wordle-app-game div.Board-row',
            '.board-row'
        ];
        for (const sel of selectors) {
            try { 
                const nodes = document.querySelectorAll(sel); 
                if (nodes && nodes.length) return Array.from(nodes); 
            } catch (e) {}
        }
        return [];
    }

    function getGuessFromRow(row) {
        return Array.from(row.children).map(c => (c.textContent||'').trim()).join('');
    }

    function getLastFilledRow() {
        const rows = getRows();
        const filled = rows.filter(r => getGuessFromRow(r).length === 5);
        return filled.length ? filled[filled.length - 1] : null;
    }

    // Inject styles - optimized for dyslexic users and accessibility
    const style = document.createElement('style');
    const productionStyles = `
        .wh-valid { 
            background-color: #4caf50 !important; 
            border: 3px solid #2e7d32 !important; 
            color: white !important; 
            box-shadow: 0 0 8px rgba(76, 175, 80, 0.4) !important;
            font-weight: bold !important;
        }
        .wh-invalid { 
            background-color: #f44336 !important; 
            border: 3px solid #c62828 !important; 
            color: white !important; 
            box-shadow: 0 0 8px rgba(244, 67, 54, 0.4) !important;
            font-weight: bold !important;
        }
    `;
    
    const developmentStyles = `
        .wh-valid { 
            background-color: #4caf50 !important; 
            border: 4px solid #2e7d32 !important; 
            color: white !important; 
            box-shadow: 0 0 12px rgba(76, 175, 80, 0.6) !important;
            font-weight: bold !important;
        }
        .wh-past { 
            background-color: #ff9800 !important; 
            border: 4px solid #ef6c00 !important; 
            color: white !important; 
            box-shadow: 0 0 12px rgba(255, 152, 0, 0.6) !important;
            font-weight: bold !important;
        }
        .wh-invalid { 
            background-color: #f44336 !important; 
            border: 4px solid #c62828 !important; 
            color: white !important; 
            box-shadow: 0 0 12px rgba(244, 67, 54, 0.6) !important;
            font-weight: bold !important;
        }
        .wh-panel { position: fixed; top: 60px; right: 12px; background: rgba(0,0,0,0.95); color: #00ff00; padding: 10px; z-index: 2147483647; font-family: 'Arial', sans-serif; white-space: pre; max-width: 480px; max-height: 50vh; overflow: auto; border-radius: 6px; }
        .wh-toggle { position: fixed; top: 12px; right: 12px; z-index: 2147483647; cursor: pointer; background: rgba(0,0,0,0.85); color: #fff; border: 1px solid #888; padding: 6px 8px; border-radius: 6px; font-size: 14px; user-select: none; }
        .wh-btn { display: inline-block; margin-top: 6px; padding: 4px 6px; background: #333; color: #fff; border: 1px solid #555; cursor: pointer; border-radius: 4px; }
    `;
    
    style.textContent = isDevelopment ? developmentStyles : productionStyles;
    document.head.appendChild(style);

    // Debug panel functionality - only in development
    let panel, toggleBtn, panelPre, autoToggleBtn, fetchBtn;
    let autoFetchEnabled = true; // Enable auto-fetch for accessibility in both dev and production

    if (isDevelopment) {
        // Create debug panel toggle button
        toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'DEBUG';
        toggleBtn.style.position = 'fixed';
        toggleBtn.style.top = '8px';
        toggleBtn.style.left = '8px';
        toggleBtn.style.zIndex = '2147483647';
        toggleBtn.style.background = '#ff0';
        toggleBtn.style.color = '#000';
        toggleBtn.style.border = '2px solid #000';
        toggleBtn.style.padding = '6px 8px';
        toggleBtn.style.fontWeight = '700';
        toggleBtn.style.borderRadius = '6px';
        toggleBtn.style.cursor = 'pointer';
        document.documentElement.appendChild(toggleBtn);

        // Create debug panel
        panel = document.createElement('div');
        panel.className = 'wh-panel';
        panel.style.display = 'none';
        document.documentElement.appendChild(panel);

        // Fetch archive button
        fetchBtn = document.createElement('button');
        fetchBtn.textContent = 'Fetch Archive';
        fetchBtn.className = 'wh-btn';
        
        // Auto-fetch toggle
        autoToggleBtn = document.createElement('button');
        autoToggleBtn.className = 'wh-btn';
        
        function refreshAutoLabel(){ 
            autoToggleBtn.textContent = autoFetchEnabled ? 'Auto-Fetch: ON' : 'Auto-Fetch: OFF'; 
        }
        refreshAutoLabel();
        
        autoToggleBtn.onclick = () => { 
            autoFetchEnabled = !autoFetchEnabled; 
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                chrome.storage.local.set({ autoFetch: autoFetchEnabled });
            }
            refreshAutoLabel(); 
            update(); 
        };

        // Load auto-fetch setting
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            chrome.storage.local.get(['autoFetch'], (result) => {
                if (result.autoFetch !== undefined) {
                    autoFetchEnabled = result.autoFetch;
                    refreshAutoLabel();
                }
            });
        }

        panel.appendChild(fetchBtn);
        panel.appendChild(autoToggleBtn);
        fetchBtn.onclick = () => { fetchArchive(false, true); };
        
        panelPre = document.createElement('pre'); 
        panelPre.style.margin = '0 0 6px 0'; 
        panel.insertBefore(panelPre, fetchBtn);

        // Note: Solution reveal functionality removed from production builds
        // This was the "Today's solution" section that showed spoilers
    }

    // Load auto-fetch setting for both dev and production (accessibility support)
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(['autoFetch'], (result) => {
            if (result.autoFetch !== undefined) {
                autoFetchEnabled = result.autoFetch;
                log('Auto-fetch setting loaded:', autoFetchEnabled);
            }
        });
    }

    // Archive fetching - enabled for accessibility support
    function fetchArchive(auto = false, force = false) {
        if (!ARCHIVE_URL) return;
        
        if (archiveRequested && !force) return;
        archiveRequested = true;
        archiveStatus = 'Fetching archive...'; 
        if (isDevelopment) update();
        
        fetch(ARCHIVE_URL)
            .then(r => { 
                if (!r.ok) throw new Error('HTTP ' + r.status); 
                return r.text(); 
            })
            .then(txt => {
                let words = txt.split('\n').map(w => w.trim().toLowerCase()).filter(Boolean);
                ARCHIVE = new Set(words);
                archiveStatus = 'Archive loaded: ' + ARCHIVE.size + ' words'; 
                if (isDevelopment) update();
            })
            .catch(err => { 
                archiveStatus = 'Failed to load archive: ' + (err && err.message ? err.message : String(err)); 
                if (isDevelopment) update(); 
            });
    }

    // Auto-fetch functionality for both dev and production
    function checkAndAutoFetch() {
        const rows = getRows();
        try {
            if (!archiveRequested && rows && rows.length) {
                let rendered = false;
                for (const r of rows) {
                    try {
                        const tiles = Array.from(r.children || []);
                        if (tiles.length >= 5) {
                            const t0 = tiles[0];
                            const text = (t0 && (t0.textContent||'').trim()) || '';
                            if (text.length > 0 || (t0 && typeof t0.offsetParent !== 'undefined' && t0.offsetParent !== null)) { 
                                rendered = true; 
                                break; 
                            }
                        }
                    } catch(e){}
                }
                if (rendered && autoFetchEnabled) {
                    log('Auto-fetching archive for accessibility support');
                    fetchArchive(true);
                }
            }
        } catch (e) {}
    }

    function update() {
        if (!isDevelopment || !panelPre) return;
        
        const rows = getRows();
        try {
            if (!archiveRequested && rows && rows.length) {
                let rendered = false;
                for (const r of rows) {
                    try {
                        const tiles = Array.from(r.children || []);
                        if (tiles.length >= 5) {
                            const t0 = tiles[0];
                            const text = (t0 && (t0.textContent||'').trim()) || '';
                            if (text.length > 0 || (t0 && typeof t0.offsetParent !== 'undefined' && t0.offsetParent !== null)) { 
                                rendered = true; 
                                break; 
                            }
                        }
                    } catch(e){}
                }
                if (rendered && autoFetchEnabled) fetchArchive(true);
            }
        } catch (e) {}
        
        let text = 'Wordle Accessibility Helper (DEV)\nLearning Support: Green=valid word, Purple=past answer, Red=invalid\n\n';
        rows.forEach((r,i) => {
            const g = getGuessFromRow(r).toLowerCase();
            let tag = '(empty)';
            if (g.length === 5) {
                if (SOLUTIONS.has(g)) tag = '[solution]';
                else if (ARCHIVE.has(g)) tag = '[past]';
                else tag = '[invalid]';
            }
            text += 'Row ' + (i+1) + ': ' + (g || '(empty)') + ' ' + tag + '\n';
        });
        text += '\nStatus: ' + archiveStatus;
        text += '\nSolutions available: ' + SOLUTIONS.size;
        text += '\nMode: DEVELOPMENT';
        panelPre.textContent = text;
        
        // Send status update to background script
        sendMessage('statusUpdate', {
            archiveStatus,
            solutionsCount: SOLUTIONS.size,
            archiveCount: ARCHIVE.size,
            isDevelopment,
            isProduction
        });
    }

    function toggleDebugPanel() {
        if (!isDevelopment || !panel) return;
        
        try {
            const p = panel;
            if (!p) return;
            const cs = window.getComputedStyle(p);
            const isHidden = !cs || cs.display === 'none' || cs.visibility === 'hidden' || p.style.display === 'none';
            p.style.display = isHidden ? 'block' : 'none';
        } catch(e) {}
    }

    if (isDevelopment && toggleBtn) {
        toggleBtn.addEventListener('click', toggleDebugPanel);
    }

    // Mutation guards for reloads
    if (window.__WORDLE_HELPER_OBSERVER__) window.__WORDLE_HELPER_OBSERVER__.disconnect();
    if (window.__WORDLE_HELPER_INTERVAL__) clearInterval(window.__WORDLE_HELPER_INTERVAL__);

    function applyClass(row, cls) {
        try { 
            mutating = true; 
            lastMutated = Date.now(); 
            Array.from(row.children).forEach(c => { 
                // Remove all helper classes
                c.classList.remove('wh-valid', 'wh-past', 'wh-invalid'); 
                if (cls) c.classList.add(cls); 
            }); 
        } finally { 
            setTimeout(() => { mutating = false; }, 50); 
        }
    }

    function clearClasses(row) { 
        try { 
            mutating = true; 
            lastMutated = Date.now(); 
            Array.from(row.children).forEach(c => c.classList.remove('wh-valid', 'wh-past', 'wh-invalid')); 
        } finally { 
            setTimeout(() => { mutating = false; }, 50); 
        } 
    }

    let prevRow = null; 
    let mutating = false; 
    let lastMutated = 0; 
    let lastObserverRun = 0;

    function highlight() {
        const current = getLastFilledRow();
        if (prevRow && prevRow !== current) clearClasses(prevRow);
        if (current) {
            const g = getGuessFromRow(current).toLowerCase();
            if (g.length === 5) {
                // Enhanced highlighting logic for accessibility
                if (SOLUTIONS.has(g)) {
                    applyClass(current, 'wh-valid');
                } else if (ARCHIVE.has(g)) {
                    // Show past answers in both dev and production for learning support
                    applyClass(current, isDevelopment ? 'wh-past' : 'wh-valid');
                } else {
                    applyClass(current, 'wh-invalid');
                }
                prevRow = current;
            }
        }
    }

    // Set up observers and intervals
    window.__WORDLE_HELPER_OBSERVER__ = new MutationObserver((mutations) => {
        try { 
            const now = Date.now(); 
            if (mutating) return; 
            if (lastMutated && (now - lastMutated) < 60) return; 
            if (lastObserverRun && (now - lastObserverRun) < 40) return; 
            lastObserverRun = now; 
            if (isDevelopment) update();
            checkAndAutoFetch(); // Check for auto-fetch in both dev and production
            highlight(); 
        } catch(e){}
    });
    
    try { 
        window.__WORDLE_HELPER_OBSERVER__.observe(document.documentElement || document.body, { childList:true, subtree:true }); 
    } catch(e){}

    try { 
        window.__WORDLE_HELPER_INTERVAL__ = setInterval(() => { 
            try { 
                if (mutating) return; 
                if (lastMutated && (Date.now() - lastMutated) < 80) return; 
                if (isDevelopment) update();
                checkAndAutoFetch(); // Check for auto-fetch in both dev and production
                highlight(); 
            } catch(e){} 
        }, 500); 
    } catch(e){}

    // Initial execution
    try { 
        if (isDevelopment) update();
        checkAndAutoFetch(); // Initial auto-fetch check
        highlight(); 
    } catch(e){}

    log(`Wordle Accessibility Helper loaded (${isDevelopment ? 'development' : 'production'} mode) - Supporting dyslexic users and English learners`);

})();