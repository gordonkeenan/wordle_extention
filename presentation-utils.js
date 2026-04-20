/* Shared Presentation JavaScript Utilities - Source of Truth */

// Global variables that can be overridden by specific presentations
window.presentationConfig = {
    totalSlides: 21, // Default for full presentation
    finalSlideIndex: 20, // Default for full presentation (0-indexed)
    slidesVersion: 'full', // Default version
    imageSource: "IMG_5384.jpg" // Default image source
};

// Global state
let currentSlideIndex = 0;
let isPresentationStarted = false;

// Utility function to get tile color based on position
function getTileColor(letter, index, word) {
    // Simple coloring logic for visual appeal based on position (for non-final slides)
    if (index === 0 || index === 4) return 'wordle-green';
    if (index === 1 || index === 3) return 'wordle-yellow';
    return 'wordle-gray';
}

// Render tracker with dynamic configurations
function renderTracker(word, slideIndex) {
    const isFinalSlide = word === 'QUESTIONS';
    const isPurpleSlide = word === "PAST" || (Array.isArray(word) && word.includes("PAST"));
    const isBlueSlide = word === "VALID" || (Array.isArray(word) && word.includes("VALID"));
    const isInvalidSlide = word === "INVALID" || (Array.isArray(word) && word.includes("INVALID"));

    // Handle array of trackers (for slide 5)
    if (Array.isArray(word)) {
        const trackerRows = word.map((trackerWord, trackerIndex) => {
            const trackerHtml = Array.from(trackerWord).map((letter, letterIndex) => {
                const colorClass = isFinalSlide ? 'wordle-green' : getTileColor(letter, letterIndex, trackerWord);
                
                let outline = '';
                if (trackerWord === "PAST") {
                    outline = 'border-2 border-purple-500';
                } else if (trackerWord === "VALID") {
                    outline = 'border-2 border-blue-500';
                } else if (trackerWord === "INVALID") {
                    outline = 'border-2 border-red-500';
                }
                
                const delay = (trackerIndex * trackerWord.length + letterIndex) * 0.1;
                let animationClass = '';

                if (slideIndex === 0) {
                    if (isPresentationStarted) {
                        animationClass = 'animated-tile';
                    }
                } else {
                    animationClass = 'animated-tile';
                }

                return `<div class="tracker-tile ${colorClass} ${animationClass} ${outline}" style="animation-delay: ${delay}s;">${letter}</div>`;
            }).join('');
            
            return `<div class="flex justify-center">${trackerHtml}</div>`;
        }).join('');
        
        return `<div class="grid grid-rows-2 gap-8 justify-items-center">${trackerRows}</div>`;
    }

    return Array.from(word).map((letter, index) => {
        // If it's the final slide, force all tiles to be green as requested.
        const colorClass = isFinalSlide ? 'wordle-green' : getTileColor(letter, index, word);
        
        // Add outlines for specific slides/trackers
        let outline = '';
        if (isPurpleSlide) {
            outline = 'border-2 border-purple-500';
        } else if (isBlueSlide) {
            outline = 'border-2 border-blue-500';
        } else if (isInvalidSlide) {
            outline = 'border-2 border-red-500';
        }
        
        const delay = index * 0.1;
        let animationClass = ''; // Start empty

        // Logic to control animation based on presentation start state
        if (slideIndex === 0) {
            if (isPresentationStarted) {
                animationClass = 'animated-tile';
            }
        } else if (isFinalSlide) {
            // Logic for final slide bounce animation
            animationClass = 'animated-tile bounce-animation';
            return `<div class="tracker-tile ${colorClass} ${animationClass} ${outline}" style="animation-delay: ${delay}s; animation-iteration-count: infinite;">${letter}</div>`;
        } else {
            // Logic for all other slides: animation runs on load (navigation)
            animationClass = 'animated-tile';
        }

        return `<div class="tracker-tile ${colorClass} ${animationClass} ${outline}" style="animation-delay: ${delay}s;">${letter}</div>`;
    }).join('');
}

// Start presentation function
function startPresentation() {
    if (currentSlideIndex === 0 && !isPresentationStarted) {
        isPresentationStarted = true;
        // Transition from Blank Screen to Full Content (with animation)
        renderSlide(0); 
    }
}

// Main slide rendering function
function renderSlide(index) {
    // Get slides from global variable (should be set by individual presentations)
    const slides = window.presentationSlides || [];
    const slide = slides[index];
    
    if (!slide) {
        console.error('Slide not found at index:', index);
        return;
    }
    
    const contentDiv = document.getElementById('slide-content');
    const notesList = document.getElementById('speaker-notes'); 
    const slideNumSpan = document.getElementById('slide-number');
    const header = document.querySelector('header');

    // Clear any existing snark overlay
    const snarkOverlay = document.getElementById('snark-overlay');
    if (snarkOverlay) {
        snarkOverlay.classList.remove('active');
        const snarkContent = document.getElementById('snark-content');
        snarkContent.innerHTML = '<span class="snark-cursor" id="snark-cursor"></span>';
        // Clear any ongoing typing intervals
        if (window.snarkTypeInterval) {
            clearInterval(window.snarkTypeInterval);
            window.snarkTypeInterval = null;
        }
    }

    // Update UI State
    slideNumSpan.textContent = index + 1;
    document.getElementById('prev-btn').disabled = index === 0;
    document.getElementById('next-btn').disabled = index === slides.length - 1;
    currentSlideIndex = index;

    // --- Logic for Blank Start Screen (Slide 1) ---
    if (index === 0 && !isPresentationStarted) {
        // Phase 1: Blank Screen with Icon/Button
        
        // Hide the main header elements for a truly blank start
        header.querySelector('h1').style.opacity = 0;
        header.querySelector('p').style.opacity = 0;
        header.style.borderBottom = 'none';

        // Hide the footer and navigation buttons
        const footer = document.querySelector('footer');
        footer.style.display = 'none';

        contentDiv.innerHTML = `
            <div class="h-blank-start w-full text-center flex flex-col items-center justify-center">
                <div id="start-button" onclick="startPresentation()"
                     class="start-icon w-[35.8rem] h-[35.8rem] bg-transparent border-green-500 border-4 rounded-full flex items-center justify-center 
                            text-white shadow-2xl transition-all duration-300 overflow-hidden">
                    <img src="${window.presentationConfig.imageSource}" alt="Couch Coder (AI Development)" 
                         class="w-full h-full object-cover">
                </div>
                <p class="mt-6 text-gray-400 text-4xl text-center">The trials and tribulations of being a couch developer</p>
            </div>
        `;
        return;

    } else {
        // Phase 2: Full Content Render (all other slides, or Slide 1 after start)
        
        // Show the main header elements
        header.querySelector('h1').style.opacity = 1;
        header.querySelector('p').style.opacity = 1;
        header.style.borderBottom = '1px solid rgb(55 65 81)'; // Restore border-gray-700

        // Show the footer and navigation buttons
        const footer = document.querySelector('footer');
        footer.style.display = 'block';

        // Slide Title and Tracker
        contentDiv.innerHTML = `
            <div class="flex flex-col items-center">
                <h2 class="text-4xl md:text-5xl font-bold text-center text-white mb-6 leading-tight">${slide.title}</h2>
                <div class="flex justify-center" id="tracker-display">${renderTracker(slide.tracker, index)}</div>
            </div>
            <div class="flex-grow text-center">
                ${slide.content}
            </div>
        `;
        
        // Re-enable navigation if not on the first slide
        document.getElementById('prev-btn').disabled = index === 0;
    }
    
    // Notes are updated in the background
    if (notesList && slide.notes) {
        notesList.innerHTML = slide.notes.map(note => `<li>${note}</li>`).join('');
    }
    
    // Check if this slide has snark and trigger it after 3 seconds
    if (slide.snark) {
        setTimeout(() => {
            showSnarkOverlay(slide.snark);
        }, 3000);
    }
}

// Function to make question tiles fall and pile up
function triggerFallingTiles() {
    // Try multiple selectors to find the tracker
    const trackerContainer = document.querySelector('#tracker-display') || 
                            document.querySelector('.tracker-container') ||
                            document.querySelector('[id*="tracker"]');
    
    if (!trackerContainer) {
        console.warn('Tracker container not found');
        return;
    }
    
    const tiles = trackerContainer.querySelectorAll('.tracker-tile');
    if (tiles.length === 0) {
        console.warn('No tracker tiles found');
        return;
    }
    
    console.log(`Triggering fall animation for ${tiles.length} tiles`);
    
    // Get the position of each tile before making them fixed
    tiles.forEach((tile, index) => {
        const rect = tile.getBoundingClientRect();
        
        // Clone the tile styling and position it at its current location
        tile.style.left = rect.left + 'px';
        tile.style.top = rect.top + 'px';
        tile.style.width = rect.width + 'px';
        tile.style.height = rect.height + 'px';
        
        // Add falling class with a slight delay for stagger effect
        setTimeout(() => {
            tile.classList.add('falling');
        }, 50); // Small delay to ensure position is set
    });
}

// Snark overlay function
function showSnarkOverlay(snarkText, isLarge = false) {
    const overlay = document.getElementById('snark-overlay');
    const contentElement = document.getElementById('snark-content');
    const staticCursor = document.getElementById('snark-cursor');
    
    // Clear any existing typing interval
    if (window.snarkTypeInterval) {
        clearInterval(window.snarkTypeInterval);
        window.snarkTypeInterval = null;
    }
    
    // Split text into lines (support for \n or array of lines)
    let lines = [];
    if (Array.isArray(snarkText)) {
        lines = snarkText;
    } else {
        lines = snarkText.split('\n');
    }
    
    // Check if this is the meta-workflow slide for special glitch effect
    const isMetaWorkflow = Array.isArray(snarkText) && 
                         snarkText.some(line => line.includes('half crazy'));
    
    // Reset any prior lock
    overlay.style.minHeight = '';
    overlay.style.height = '';
    overlay.removeAttribute('data-max-height');

    // Pre-measure full rendered height (without animation) in a hidden clone
    const measureContainer = document.createElement('div');
    measureContainer.style.position = 'absolute';
    measureContainer.style.visibility = 'hidden';
    measureContainer.style.pointerEvents = 'none';
    measureContainer.style.left = '-9999px';
    measureContainer.style.top = '-9999px';
    measureContainer.className = 'snark-overlay active';

    // Build full static content to measure
    let fullLines = Array.isArray(snarkText) ? snarkText : snarkText.split('\n');
    const tempContent = document.createElement('div');
    tempContent.className = 'snark-content';
    fullLines.forEach(line => {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'snark-line' + (isLarge ? ' large' : '');
        lineDiv.textContent = line;
        tempContent.appendChild(lineDiv);
    });
    measureContainer.appendChild(tempContent);
    document.body.appendChild(measureContainer);
    const measuredHeight = measureContainer.offsetHeight;
    measureContainer.remove();

    // Lock height from the start to prevent post-type shift
    overlay.style.height = measuredHeight + 'px';
    overlay.style.minHeight = measuredHeight + 'px';
    overlay.setAttribute('data-max-height', String(measuredHeight));

    // Reserve cursor space with a fixed-width spacer to prevent horizontal shift
    contentElement.innerHTML = '<span class="snark-cursor" id="snark-cursor"></span><span id="snark-cursor-reserve" style="display:inline-block;width:6px;height:1em;"></span>';
    overlay.classList.remove('glitching'); // Remove any previous glitch class
    overlay.classList.add('active');
    staticCursor.classList.remove('show'); // Hide static cursor during typing
    
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let currentLineElement = null;
    let pauseCounter = 0;
    
    window.snarkTypeInterval = setInterval(() => {
        // Track the largest height observed to prevent end-shrink flicker
        const currentH = overlay.offsetHeight;
        const prevMax = parseInt(overlay.getAttribute('data-max-height') || '0', 10);
        if (currentH > prevMax) {
            overlay.setAttribute('data-max-height', String(currentH));
        }
        // Handle pause between lines
        if (pauseCounter > 0) {
            pauseCounter--;
            return;
        }
        
        // If we've finished all lines, stop and show static cursor
        if (currentLineIndex >= lines.length) {
            clearInterval(window.snarkTypeInterval);
            window.snarkTypeInterval = null;
            
            // Remove typing cursor from last line
            if (currentLineElement) {
                currentLineElement.classList.remove('typing');
            }

            // Height already locked; ensure cursor appears without layout shift
            
            // Special glitch effect for meta-workflow
            if (isMetaWorkflow) {
                setTimeout(() => {
                    overlay.classList.add('glitching');
                    // Remove overlay completely after glitch animation
                    setTimeout(() => {
                        overlay.classList.remove('active', 'glitching');
                    }, 2200); // Match the glitch animation duration (2.2s)
                }, 1000); // Wait 1 second after typing completes
            } else {
                staticCursor.classList.add('show');
                // Keep reserve spacer so width doesn't collapse
            }
            return;
        }
        
        // If starting a new line, create the line element
        if (currentCharIndex === 0) {
            // Remove typing cursor from previous line
            if (currentLineElement) {
                currentLineElement.classList.remove('typing');
            }
            
            currentLineElement = document.createElement('div');
            currentLineElement.className = 'snark-line' + (isLarge ? ' large' : '') + ' typing';
            currentLineElement.textContent = '';
            const cursorNode = document.getElementById('snark-cursor');
            contentElement.insertBefore(currentLineElement, cursorNode);
        }
        
        const currentLine = lines[currentLineIndex];
        
        // If we've finished the current line
        if (currentCharIndex >= currentLine.length) {
            currentLineIndex++;
            currentCharIndex = 0;
            pauseCounter = 7; // Pause for 7 intervals between lines
            return;
        }
        
        // Add the next character
        currentLineElement.textContent += currentLine[currentCharIndex];
        currentCharIndex++;
        
    }, isLarge ? 20 : 30);
}

// Navigation function
function navigateSlide(direction) {
    const slides = window.presentationSlides || [];
    const newIndex = currentSlideIndex + direction;
    if (newIndex >= 0 && newIndex < slides.length) {
        renderSlide(newIndex);
    }
}

// Setup keyboard event listeners
function setupKeyboardListeners() {
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            event.preventDefault(); // Prevent spacebar from scrolling the page
            
            console.log('Spacebar pressed, currentSlideIndex:', currentSlideIndex, 'Slide title:', window.presentationSlides[currentSlideIndex]?.title);
            
            // Special behavior for propaganda overlay slide  
            const propagandaSlideIndex = (typeof getPropagandaSlideIndex === 'function') ? 
                getPropagandaSlideIndex(window.presentationConfig.slidesVersion) : -1;
            if (currentSlideIndex === propagandaSlideIndex) {
                console.log('Triggering propaganda overlay for slide at index:', propagandaSlideIndex);
                const overlay = document.getElementById('propaganda-overlay');
                overlay.classList.add('active');
                
                // Show special snark message when propaganda appears
                setTimeout(() => {
                    showSnarkOverlay([
                        "// ALERT!",
                        "// Activating counter-narrative protocol...",
                        "// Pay no attention to the man behind the curtain!"
                    ], true);
                }, 500);
                
                // Hide overlay after 3 seconds
                setTimeout(() => {
                    overlay.classList.remove('active');
                }, 3000);
                return; // Don't advance slide on this specific slide
            }
            
            // Handle presentation start only
            if (currentSlideIndex === 0 && !isPresentationStarted) {
                startPresentation();
                return;
            }
            
            // Remove normal slide advancement with spacebar - only arrows now
        } else if (event.key === 'ArrowRight') {
            navigateSlide(1);
        } else if (event.key === 'ArrowLeft') {
            navigateSlide(-1);
        }
    });
}

// Initialize presentation
function initializePresentation() {
    // Setup event listeners
    setupKeyboardListeners();
    
    // Render the initial blank state
    renderSlide(0);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePresentation);