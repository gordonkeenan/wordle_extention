# AI-Powered Test Failure Fix Workflow

This GitHub Actions workflow automatically detects test failures and uses AI to suggest or create fixes.

## Overview

The workflow provides two modes of operation:

1. **Comment Mode** (default): When tests fail on a PR, the AI analyzes the failures and posts suggestions as a comment
2. **Fix Mode**: When manually triggered, the AI analyzes failures, creates fixes, and submits a new PR with the changes

## How It Works

### Automatic Trigger (Comment Mode)

When you create a PR to the `main` branch:

1. The workflow automatically runs all tests
2. If tests fail, it captures the test results
3. Creates a GitHub issue with an AI task
4. The AI agent analyzes the failures and comments on your PR with suggestions

### Manual Trigger (Fix or Comment Mode)

You can manually trigger the workflow from the Actions tab:

1. Go to **Actions** → **AI-Powered Test Failure Fix**
2. Click **Run workflow**
3. Select your desired mode:
   - `comment`: AI will analyze and suggest fixes via PR comment
   - `fix`: AI will create a new PR with actual code fixes
4. Click **Run workflow**

## Workflow Steps

### 1. Test Job
- Checks out the code
- Sets up Node.js environment
- Installs dependencies
- Runs the test suite
- Saves and uploads test results if tests fail

### 2. AI Suggest Fix (Comment Mode)
Runs when tests fail on a PR:
- Downloads test results
- Creates an AI task issue
- AI agent analyzes failures and posts suggestions to the PR

### 3. AI Create Fix PR (Fix Mode)
Runs when manually triggered with `fix` mode:
- Downloads test results
- Creates an AI task issue
- AI agent analyzes failures, makes code changes, and creates a new PR

## Usage Examples

### Example 1: Automatic Fix Suggestions

When you push changes to a PR:
```bash
git push origin feature-branch
```

If tests fail, check your PR for an AI-generated comment with fix suggestions.

### Example 2: Manual Fix Request

1. Navigate to the **Actions** tab in your repository
2. Select **AI-Powered Test Failure Fix**
3. Click **Run workflow**
4. Choose `comment` mode to get suggestions or `fix` mode to get an automated PR
5. Review the AI-generated issue for status updates

## Requirements

- Node.js 20+
- npm with legacy peer deps support
- Tests configured via `npm run test:run`
- GitHub Actions enabled
- Appropriate permissions for creating issues and PRs

## Permissions

The workflow requires:
- `contents: write` - To checkout code and create branches
- `pull-requests: write` - To comment on and create PRs
- `issues: write` - To create AI task issues

## Integration with GitHub Copilot

The workflow creates GitHub issues with specific instructions for AI agents. These issues:
- Are tagged with `ai-task` and `test-failure` labels
- Include detailed test failure information
- Provide clear instructions for the AI agent
- Reference the specific PR and commit

## Troubleshooting

### Tests pass locally but fail in CI
- Ensure all dependencies are properly installed with `--legacy-peer-deps`
- Check for environment-specific issues
- Review the test results artifact for detailed failure information

### AI agent doesn't respond
- Ensure GitHub Copilot is enabled for your repository
- Check that the AI task issue was created successfully
- Verify the issue has the correct labels and mentions

### Wrong mode triggered
- Check the workflow trigger conditions
- For manual runs, verify you selected the correct mode
- Review the workflow logs in the Actions tab

## Customization

You can customize the workflow by:

1. **Adjusting test commands**: Modify the `npm run test:run` command in the `test` job
2. **Changing triggers**: Update the `on:` section to add more trigger events
3. **Modifying AI instructions**: Edit the issue body templates to change what the AI does
4. **Adding more modes**: Extend the workflow with additional fix strategies

## Files

- `.github/workflows/ai-test-fix.yml` - Main workflow file
- `test-results.txt` - Artifact containing test failure details (generated on failure)

## Contributing

When modifying this workflow:
1. Test changes on a feature branch first
2. Validate YAML syntax before committing
3. Review workflow logs after running
4. Update this documentation if adding new features
