# GitHub Pages Setup Instructions

To enable the automatic deployment of the presentation to GitHub Pages, follow these steps:

## 1. Enable GitHub Pages

1. Go to your repository on GitHub: https://github.com/gordonkeenan/wordle_extention
2. Click on **Settings** (top navigation bar)
3. In the left sidebar, click **Pages** (under "Code and automation")
4. Under **Source**, select **GitHub Actions** from the dropdown

## 2. Verify Workflow Permissions

1. In the repository Settings, click **Actions** in the left sidebar
2. Click on **General**
3. Scroll down to **Workflow permissions**
4. Ensure that **Read and write permissions** is selected
5. Make sure **Allow GitHub Actions to create and approve pull requests** is checked

## 3. Trigger the Deployment

The workflow will automatically run when:
- Changes are pushed to the `main` branch that affect:
  - Any files in the `presentation/` folder
  - The `vite.config.presentation.js` file
  - The workflow file itself (`.github/workflows/deploy-presentation.yml`)
- Or manually via the "Actions" tab (workflow_dispatch)

## 4. Access the Presentation

Once the workflow completes successfully:
- The presentation will be available at: `https://gordonkeenan.github.io/wordle_extention/`
- The deployment URL will be shown in the workflow run output

## Troubleshooting

### Workflow fails with "pages build and deployment" error
- Make sure GitHub Pages is enabled in repository settings
- Ensure the Source is set to "GitHub Actions" (not Deploy from a branch)

### Workflow fails with "Permission denied" error
- Check that workflow permissions include "Read and write permissions"
- Verify that the `pages: write` and `id-token: write` permissions are set in the workflow

### Build fails with npm errors
- The workflow uses `npm ci --legacy-peer-deps` to handle dependency conflicts
- Check that `package.json` and `package-lock.json` are in sync

### Assets not loading (404 errors)
- Verify that the `base` path in `vite.config.presentation.js` is set to `'./'`
- Check that all referenced files exist in the `presentation/` folder

## Local Testing

To test the build locally before pushing:

```bash
# Build the presentation
npm run build:presentation

# Preview the built presentation
npm run preview:presentation
```

Then open http://localhost:4173/ in your browser.
