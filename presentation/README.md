# Presentation

This folder contains the presentation slides for "Couch Developer: Building with ChatGPT on your phone".

## Files

- `index.html` - Landing page with links to both presentation versions
- `presentation.html` - Full presentation with all slides
- `presentation-7min.html` - Condensed 7-minute version
- `slides-data.js` - Slide content and data
- `IMG_5384.jpg` - Couch developer image
- `demo.mov` - Demo video

## Building

To build the presentation for deployment:

```bash
npm run build:presentation
```

This will generate a production build in the `dist-presentation` folder.

## Local Development

To preview the presentation locally:

```bash
npm run build:presentation
npm run preview:presentation
```

Then open http://localhost:4173/ in your browser.
adding debugging line
## Deployment

The presentation is automatically deployed to GitHub Pages when changes are pushed to the `main` branch. The deployment is handled by the `.github/workflows/deploy-presentation.yml` workflow.

The presentation will be available at: `https://gordonkeenan.github.io/wordle_extention/`

## Customization

To customize the slides:

1. Edit `slides-data.js` to modify slide content
2. The `getSlides()` function returns different slide sets based on the version parameter
3. Each slide has the following structure:
   ```javascript
   {
     title: "Slide Title",
     tracker: "WORD", // or ["WORD1", "WORD2"] for multiple trackers
     content: `<p>HTML content</p>`,
     notes: ["Speaker note 1", "Speaker note 2"]
   }
   ```

## Navigation

- Click the start button (couch image) on the first slide to begin
- Use "Previous" and "Next" buttons to navigate
- Speaker notes are visible at the bottom (hidden from audience view)
- Press arrow keys to navigate (if implemented)

## Features

- Wordle-style animated tiles for visual branding
- Responsive design using Tailwind CSS
- Speaker notes support
- Multiple presentation versions (full and 7-minute)
- Dark theme optimized for presentations
