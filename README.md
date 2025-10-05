# Wordle Accessibility Helper

**An accessibility-focused browser extension designed to support dyslexic users and non-native English speakers playing Wordle.**

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue?logo=google-chrome)](https://chrome.google.com/webstore)
[![Firefox Addon](https://img.shields.io/badge/Firefox-Addon-orange?logo=firefox)](https://addons.mozilla.org/firefox)
[![Userscript](https://img.shields.io/badge/Userscript-Tampermonkey-green)](https://tampermonkey.net/)

## 🎯 **Purpose & Accessibility Focus**

This extension helps players identify valid English words in Wordle, making the game more accessible and educational for:

- **🧠 Dyslexic users** - Clear visual indicators help distinguish valid words from typos
- **🌍 Non-native English speakers** - Learning tool to identify real English vocabulary
- **📚 English learners** - Educational support for vocabulary building
- **♿ Accessibility needs** - High contrast colors and clear visual feedback

## ✨ **Key Features**

### 🎨 **Visual Learning Support**
- **Green highlighting** ✅ - Valid English words that are possible Wordle solutions
- **Red highlighting** ❌ - Invalid words or typing errors  
- **Orange highlighting** 🟠 - Previously used Wordle answers (development mode)
- **High contrast colors** - Designed for users with dyslexia and visual processing differences
- **Bold text** - Enhanced readability for all users

### 🚀 **Real-time Feedback**
- Instant validation as you type
- No spoilers or cheating - only validates if words are real English words
- Educational support without giving away answers
- Works seamlessly with the official Wordle interface

### 🔧 **Technical Features**
- Compatible with Chrome, Firefox, and userscript managers
- Lightweight and fast performance
- Privacy-focused - no data collection
- Production builds optimized for Chrome Web Store compliance

## � **Installation**

### Chrome Extension
1. Download from Chrome Web Store (coming soon)
2. Or install from releases: `npm run build:chrome`
3. Load unpacked extension in Chrome Developer Mode

### Firefox Addon  
1. Download from Firefox Addons (coming soon)
2. Or build locally: `npm run build:firefox`
3. Install as temporary addon in Firefox

### Userscript (Tampermonkey/Greasemonkey)
1. Install a userscript manager like [Tampermonkey](https://tampermonkey.net/)
2. Build userscript: `npm run build:userscript`
3. Install the generated `.user.js` file

## 🛠️ **Development**

### Testing

The project includes comprehensive unit tests:

```bash
# Run all tests
npm test

# Run tests once (CI mode)
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

**AI-Powered Test Failure Handling**: This repository includes an automated workflow that uses AI to analyze and fix test failures. When tests fail on a PR, the AI can automatically suggest fixes or create a PR with corrections. See [`.github/workflows/README.md`](.github/workflows/README.md) for details.

### Build Commands
```bash
# Production builds (Chrome Web Store ready)
npm run build:chrome        # Chrome extension (production)
npm run build:firefox       # Firefox addon (production)  
npm run build:userscript    # Userscript (production)
npm run build:all          # All platforms (production)

# Development builds (with debugging features)
npm run build:chrome-dev    # Chrome extension (development)
npm run build:firefox-dev   # Firefox addon (development)
npm run build:userscript-dev # Userscript (development) 
npm run build:all-dev       # All platforms (development)
```

### Project Structure
```
src/
├── content.js      # Main accessibility logic
├── background.js   # Extension lifecycle management
├── popup.js        # User interface controls
├── popup.html      # Extension popup interface
└── styles/         # CSS for mobile and responsive design

dist/               # Built extensions (generated)
├── manifest.json   # Extension manifest
├── content.js      # Compiled content script
├── background.js   # Compiled background script
└── popup.*         # Compiled popup files
```

## 🎨 **Accessibility Design Principles**

### Color Choices
- **Green (#4caf50)** - Universal "correct" indicator, colorblind-friendly
- **Red (#f44336)** - Clear "error" indicator, high contrast
- **Orange (#ff9800)** - "Information" color for past answers
- **High contrast borders** - Enhanced visibility for users with visual processing needs

### Typography & Visual Design
- **Bold font weights** - Improved readability for dyslexic users
- **Clear borders** - Distinct visual separation
- **Subtle shadows** - Enhanced depth perception
- **Sans-serif fonts** - Better readability for dyslexic users

## 🔒 **Privacy & Security**

- **No data collection** - Extension works entirely locally
- **No tracking** - Your game data stays private  
- **Minimal permissions** - Only requests necessary access to Wordle pages
- **Open source** - Full transparency in functionality
- **Chrome Web Store compliant** - Meets all store policies

## 🎓 **Educational Benefits**

### For Dyslexic Users
- Reduces anxiety about word validity
- Provides immediate visual feedback
- Helps distinguish real words from letter jumbles
- Supports pattern recognition learning

### For Non-Native English Speakers
- Vocabulary building through real-time validation
- Learning tool for English word patterns
- Confidence building in English language skills
- Educational support without revealing answers

### Userscript (Tampermonkey/Greasemonkey)

1. **Build the userscript:**
   ```bash
   npm install
   npm run build:userscript
   ```

2. **Install userscript:**
   - Install [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/)
   - Copy the contents of `dist/wordle-debug-extension.user.js`
   - Create a new userscript and paste the code

## 🎮 Usage

### Basic Usage

1. Navigate to [Wordle](https://www.nytimes.com/games/wordle/)
2. The extension automatically activates
3. Start playing - your guesses will be highlighted in real-time
4. Click the "DEBUG" button to toggle the debug panel

### Extension Controls

#### Chrome/Firefox Extension
- Click the extension icon to open the control panel
- Toggle features on/off
- View extension status and statistics
- Manual archive fetching

#### Debug Panel Features
- **Toggle Debug Panel**: Show/hide the debug information overlay
- **Fetch Archive**: Manually download historical Wordle answers
- **Auto-Fetch**: Automatically fetch archive when game loads
- **Solution Reveal**: Show today's solution (spoiler alert!)

### Keyboard Shortcuts (Extension Popup)
- `Ctrl+D`: Toggle debug panel
- `Ctrl+F`: Fetch archive
- `Ctrl+E`: Toggle extension on/off

## 🔧 Development

### Project Structure

```
src/
├── background.js     # Extension background script
├── content.js        # Main content script (Wordle page injection)
├── popup.js          # Extension popup logic
├── popup.html        # Extension popup interface
└── styles/           # CSS files
    ├── mobile.css
    └── wordle-responsive.css

dist/                 # Built extension files
├── background.js
├── content.js
├── popup.js
├── popup.html
├── manifest.json
└── icons/

manifest.json         # Chrome extension manifest
vite.config.js        # Build configuration
package.json          # Dependencies and scripts
```

### Build Commands

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Build specific platforms
npm run build:chrome      # Chrome extension
npm run build:firefox     # Firefox extension  
npm run build:userscript  # Tampermonkey userscript

# Build all platforms
npm run build:all

# Preview built extension
npm run preview
```

### Development Workflow

1. **Make changes** to source files in `src/`
2. **Build** using appropriate command
3. **Reload extension** in browser
4. **Test** on Wordle page

### Debugging

- **Chrome**: Use DevTools on Wordle page and extension popup
- **Firefox**: Use about:debugging and Browser Console
- **Console logs**: Check for `[WDP]` prefixed messages

## 🔍 How It Works

### Word Validation
1. **Solutions Database**: Contains all valid Wordle solution words
2. **Archive Fetching**: Downloads historical answers from trusted source
3. **Real-time Analysis**: Compares guesses against databases

### Solution Detection
The extension uses multiple methods to detect today's solution:
1. **NYT API**: Attempts to fetch from official endpoint
2. **Storage Scanning**: Searches browser storage for solution data
3. **Script Analysis**: Analyzes page scripts for solution references
4. **Heuristic Detection**: Pattern matching and frequency analysis

### Visual Highlighting
- **Mutation Observer**: Watches for DOM changes in Wordle grid
- **CSS Injection**: Applies color-coded styling to guess tiles
- **State Management**: Tracks previous guesses to avoid conflicts

## 📦 Browser Compatibility

### Chrome Extension
- **Manifest V3** compatible
- Chrome 88+ required
- Uses Service Worker background script

### Firefox Extension  
- **Manifest V2** compatible
- Firefox 78+ required
- Traditional background script

### Userscript
- Compatible with Tampermonkey, Greasemonkey
- Vanilla JavaScript (no extension APIs)
- Cross-browser support

## 🛠️ Configuration

### Storage Settings
The extension stores preferences using browser storage:

- `autoFetch`: Automatically fetch archive on page load
- `extensionEnabled`: Extension enabled/disabled state
- `debugPanelVisible`: Debug panel visibility preference

### Customization
You can modify behavior by editing:
- `src/content.js`: Core functionality and styling
- `src/popup.html`: Extension interface
- `vite.config.js`: Build configuration

## 🐛 Troubleshooting

## 🤝 **Contributing**

We welcome contributions that improve accessibility! Areas of focus:

- Additional language support
- Enhanced dyslexia-friendly features  
- Improved color schemes for different types of colorblindness
- Mobile accessibility improvements
- Screen reader compatibility

## � **License**

MIT License - See [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- Inspired by the need for more accessible gaming experiences
- Built with consideration for dyslexic users and English language learners
- Designed to complement, not replace, the educational value of Wordle

---

**Made with ♿ accessibility in mind for the dyslexic and English learning communities.**