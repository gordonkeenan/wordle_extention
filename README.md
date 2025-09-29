# 🟨 Wordle Debug Extension

A powerful browser extension and userscript for debugging and analyzing Wordle games. Features intelligent guess highlighting, solution detection, and comprehensive word validation.

## ✨ Features

- **Smart Guess Highlighting**: Color-coded feedback for your guesses
  - 🟦 **Blue**: Valid solution words
  - 🟣 **Purple**: Past Wordle answers  
  - 🔴 **Red**: Invalid words
- **Solution Detection**: Automatically detects today's Wordle solution
- **Archive Integration**: Fetches historical Wordle answers for validation
- **Debug Panel**: Real-time information about your game state
- **Multi-Platform**: Supports Chrome, Firefox, and userscript formats

## 🚀 Installation

### Chrome Extension

1. **Build the extension:**
   ```bash
   npm install
   npm run build:chrome
   ```

2. **Load in Chrome:**
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder

### Firefox Extension

1. **Build the extension:**
   ```bash
   npm install
   npm run build:firefox
   ```

2. **Load in Firefox:**
   - Open `about:debugging`
   - Click "This Firefox"
   - Click "Load Temporary Add-on"
   - Select `dist/manifest.json`

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

### Common Issues

**Extension not working:**
- Refresh the Wordle page
- Check if extension is enabled
- Verify you're on the correct Wordle URL

**Colors not showing:**
- Make sure you've made at least one guess
- Check that debug panel shows correct status
- Try toggling the extension off and on

**Archive not loading:**
- Check network connectivity
- Try manual fetch from popup
- Look for error messages in debug panel

### Support

1. Check console for error messages (look for `[WDP]` prefix)
2. Verify extension permissions are granted
3. Ensure you're on the official Wordle page
4. Try rebuilding and reloading the extension

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across all platforms
5. Submit a pull request

## 📝 Changelog

### v1.0.0
- Initial release
- Chrome, Firefox, and userscript support
- Real-time guess highlighting
- Solution detection system
- Archive integration
- Debug panel interface