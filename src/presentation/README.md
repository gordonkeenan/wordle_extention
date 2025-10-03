# Presentation - React Refactor

This directory contains the React-based presentation application, refactored from vanilla HTML/JavaScript to a modern React app with Tailwind CSS.

## Structure

```
src/presentation/
├── components/          # React components
│   ├── Navigation.jsx   # Previous/Next navigation buttons
│   ├── PropagandaOverlay.jsx  # Red "PROPAGANDA" overlay
│   ├── Slide.jsx        # Individual slide renderer
│   ├── SnarkOverlay.jsx # Terminal-style snark overlay with typing animation
│   ├── Tracker.jsx      # Wordle tracker display
│   └── TrackerTile.jsx  # Individual Wordle tile
├── hooks/               # Custom React hooks
│   ├── usePresentation.js  # Manage presentation state, overlays, keyboard shortcuts
│   └── useSlides.js     # Manage slide navigation
├── utils/               # Utilities
│   └── slidesData.js    # Presentation slides data (ES module format)
├── styles/              # Styles
│   └── index.css        # Tailwind imports and custom CSS
├── assets/              # Assets
│   └── IMG_5384.jpg     # Couch coder image
├── App.jsx              # Main presentation component
└── main.jsx             # Entry point

## Development

Start the development server:

```bash
npm run dev:presentation
```

The presentation will be available at `http://localhost:5173/presentation-react.html`

You can specify different presentation configurations via URL parameter:
- `?config=full` - Full presentation (default)
- `?config=7min` - 7-minute version

## Building

Build for production:

```bash
npm run build:presentation
```

The build output will be in `dist/presentation/`.

Preview the production build:

```bash
npm run preview:presentation
```

## Features

### Components
- **TrackerTile**: Renders individual Wordle tiles with animations
- **Tracker**: Displays Wordle tracker words with proper coloring
- **Slide**: Renders slide content with title and tracker
- **Navigation**: Previous/Next navigation buttons
- **PropagandaOverlay**: Full-screen red overlay with pulsing text
- **SnarkOverlay**: Terminal-style typing animation overlay

### Hooks
- **useSlides**: Manages slide state and navigation (previous, next, goto)
- **usePresentation**: Handles presentation features (keyboard shortcuts, overlays)

### Keyboard Shortcuts
- `Space` - Next slide (or trigger propaganda on specific slide)
- `Arrow Right` - Next slide
- `Arrow Left` - Previous slide

## Tests

Tests are located in `tests/presentation/` and use Vitest with React Testing Library.

Run tests:

```bash
npm run test:run
```

Watch mode:

```bash
npm test
```

## Technology Stack

- React 19.2.0
- Tailwind CSS 4.1.14 (with @tailwindcss/postcss)
- Vite 7.1.7
- Vitest 1.6.1
- @testing-library/react

## Migration Notes

The original `presentation.html` and `presentation-7min.html` files are preserved. The new React-based presentation maintains feature parity with:
- ✅ Wordle tile animations
- ✅ Slide navigation
- ✅ Keyboard shortcuts
- ✅ Propaganda overlay
- ✅ Snark overlay with typing animation
- ✅ Start screen with couch image
- ✅ Multiple presentation configurations (full, 7min)
