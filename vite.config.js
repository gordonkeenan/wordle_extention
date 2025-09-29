import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';

export default defineConfig(({ mode }) => {
  const isChrome = mode === 'chrome' || mode === 'chrome-dev';
  const isFirefox = mode === 'firefox' || mode === 'firefox-dev';
  const isUserscript = mode === 'userscript' || mode === 'userscript-dev';
  const isDevelopment = mode.includes('-dev') || mode === 'development';
  
  console.log(`Building for: ${mode} (${isDevelopment ? 'development' : 'production'})`);

  return {
    build: {
      rollupOptions: {
        input: isUserscript ? {
          userscript: resolve(__dirname, 'src/userscript.js'),
        } : {
          background: resolve(__dirname, 'src/background.js'),
          content: resolve(__dirname, 'src/content.js'),
          popup: resolve(__dirname, 'src/popup.js'),
        },
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: '[name]-[hash].js',
          assetFileNames: '[name].[ext]',
          dir: 'dist'
        }
      },
      outDir: 'dist',
      emptyOutDir: true,
      target: 'es2020',
      minify: !isDevelopment,
      sourcemap: isDevelopment
    },
    plugins: [
      {
        name: 'build-extension',
        writeBundle() {
          if (isUserscript) {
            buildUserscript(isDevelopment);
          } else if (isFirefox) {
            buildFirefoxExtension(isDevelopment);
          } else {
            buildChromeExtension(isDevelopment);
          }
        }
      }
    ],
    define: {
      __BROWSER__: JSON.stringify(isChrome ? 'chrome' : isFirefox ? 'firefox' : 'userscript'),
      __VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
      __DEV__: JSON.stringify(isDevelopment),
      __PROD__: JSON.stringify(!isDevelopment)
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  };
});

function buildChromeExtension(isDevelopment) {
  console.log(`Building Chrome extension (${isDevelopment ? 'development' : 'production'})...`);
  
  // Chrome extension manifest
  const manifest = {
    "manifest_version": 3,
    "name": isDevelopment ? "Wordle Debug Extension (DEV)" : "Wordle Helper",
    "version": "1.0.0",
    "description": isDevelopment 
      ? "Development version of Wordle extension with debugging features"
      : "Enhance your Wordle experience with smart word validation and helpful hints",
    "permissions": [
      "activeTab",
      "storage"
    ],
    "background": {
      "service_worker": "background.js"
    },
    "content_scripts": [
      {
        "matches": [
          "https://www.nytimes.com/games/wordle/*"
        ],
        "js": ["content.js"],
        "run_at": "document_end"
      }
    ],
    "action": {
      "default_popup": "popup.html",
      "default_title": isDevelopment ? "Wordle Debug Extension (DEV)" : "Wordle Helper",
      "default_icon": {
        "16": "icons/icon16.png",
        "48": "icons/icon48.png",
        "128": "icons/icon128.png"
      }
    },
    "icons": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    },
    "web_accessible_resources": [
      {
        "resources": ["*.js", "*.css"],
        "matches": ["https://www.nytimes.com/*"]
      }
    ]
  };

  // Add development-only permissions
  if (isDevelopment) {
    manifest.permissions.push("contextMenus");
    manifest.host_permissions = ["https://gist.githubusercontent.com/*"];
  }
  
  writeFileSync('dist/manifest.json', JSON.stringify(manifest, null, 2));
  copyFileSync('src/popup.html', 'dist/popup.html');
  
  // Create icons directory and placeholder icons
  createIcons(isDevelopment);
  
  console.log(`Chrome extension built successfully (${isDevelopment ? 'development' : 'production'})!`);
}

function buildFirefoxExtension(isDevelopment) {
  console.log(`Building Firefox extension (${isDevelopment ? 'development' : 'production'})...`);
  
  // Firefox extension manifest (Manifest V2)
  const manifest = {
    "manifest_version": 2,
    "name": isDevelopment ? "Wordle Debug Extension (DEV)" : "Wordle Helper",
    "version": "1.0.0",
    "description": isDevelopment 
      ? "Development version of Wordle extension with debugging features"
      : "Enhance your Wordle experience with smart word validation and helpful hints",
    "permissions": [
      "activeTab",
      "storage",
      "https://www.nytimes.com/*"
    ],
    "background": {
      "scripts": ["background.js"],
      "persistent": false
    },
    "content_scripts": [
      {
        "matches": [
          "https://www.nytimes.com/games/wordle/*"
        ],
        "js": ["content.js"],
        "run_at": "document_end"
      }
    ],
    "browser_action": {
      "default_popup": "popup.html",
      "default_title": isDevelopment ? "Wordle Debug Extension (DEV)" : "Wordle Helper",
      "default_icon": {
        "16": "icons/icon16.png",
        "48": "icons/icon48.png",
        "128": "icons/icon128.png"
      }
    },
    "icons": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    },
    "web_accessible_resources": ["*.js", "*.css"]
  };

  // Add development-only permissions
  if (isDevelopment) {
    manifest.permissions.push("contextMenus");
    manifest.permissions.push("https://gist.githubusercontent.com/*");
  }
  
  writeFileSync('dist/manifest.json', JSON.stringify(manifest, null, 2));
  copyFileSync('src/popup.html', 'dist/popup.html');
  
  // Create icons directory and placeholder icons
  createIcons(isDevelopment);
  
  console.log(`Firefox extension built successfully (${isDevelopment ? 'development' : 'production'})!`);
}

function buildUserscript(isDevelopment) {
  console.log(`Building userscript (${isDevelopment ? 'development' : 'production'})...`);
  
  // Read the original userscript or create one from content script
  let userscriptContent;
  
  if (existsSync('wordle-debug-production.user.js')) {
    userscriptContent = readFileSync('wordle-debug-production.user.js', 'utf8');
  } else {
    // Create userscript from content script
    const contentScript = readFileSync('src/content.js', 'utf8');
    
    userscriptContent = `// ==UserScript==
// @name         ${isDevelopment ? 'Wordle Debug Extension (DEV)' : 'Wordle Helper'}
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  ${isDevelopment ? 'Development version with debugging features' : 'Enhance your Wordle experience'}
// @match        https://www.nytimes.com/games/wordle/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

${contentScript.replace(/chrome\.(runtime|storage|tabs)/g, '// $&')}`;
  }
  
  const filename = isDevelopment ? 'wordle-debug-extension-dev.user.js' : 'wordle-helper.user.js';
  writeFileSync(`dist/${filename}`, userscriptContent);
  
  console.log(`Userscript built successfully (${isDevelopment ? 'development' : 'production'})!`);
}

function createIcons(isDevelopment) {
  const iconsDir = 'dist/icons';
  if (!existsSync(iconsDir)) {
    mkdirSync(iconsDir, { recursive: true });
  }
  
  // Create simple SVG icons as placeholders
  const iconSizes = [16, 48, 128];
  const iconColor = isDevelopment ? '#FF9800' : '#4CAF50'; // Orange for dev, green for prod
  const iconLetter = isDevelopment ? 'D' : 'W'; // D for dev, W for production
  
  iconSizes.forEach(size => {
    const svgContent = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="${iconColor}" rx="${size/8}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${Math.floor(size/2.5)}" font-weight="bold" fill="white" text-anchor="middle" dy=".35em">${iconLetter}</text>
</svg>`;
    
    writeFileSync(`${iconsDir}/icon${size}.svg`, svgContent);
    
    // For now, copy SVG as PNG placeholder (in real scenario, you'd convert to PNG)
    copyFileSync(`${iconsDir}/icon${size}.svg`, `${iconsDir}/icon${size}.png`);
  });
}