#!/bin/bash

# Deployment script for GitHub Pages
# This script builds the site and deploys it to the gh-pages branch

set -e

echo "🚀 Starting deployment process..."

# Build the site
echo "📦 Building production bundle..."
npm run build

# Build blog
echo "📝 Generating blog posts..."
npm run build:blog

# Copy additional static files that Vite doesn't handle
echo "📋 Copying static files..."
cp -r PrivacyPolicy dist/
cp -r email-templates dist/
cp CNAME dist/ 2>/dev/null || echo "No CNAME file found, skipping..."
cp app-ads.txt dist/ 2>/dev/null || echo "No app-ads.txt file found, skipping..."

# Create a temporary directory
TEMP_DIR=$(mktemp -d)
echo "📁 Created temporary directory: $TEMP_DIR"

# Copy dist contents to temp directory
echo "📋 Copying built files..."
cp -r dist/* "$TEMP_DIR/"

# Navigate to temp directory
cd "$TEMP_DIR"

# Initialize git (if not already a repo)
if [ ! -d ".git" ]; then
  git init
  git checkout -b gh-pages
fi

# Add the correct remote
git remote add origin https://github.com/amfooladgar/bridgitsocial-landingpage.git 2>/dev/null || echo "Remote already exists"

# Add all files
git add -A

# Commit
echo "💾 Committing changes..."
git commit -m "Deploy to GitHub Pages - $(date)"

# Push to gh-pages branch
echo "🌐 Pushing to GitHub Pages..."
git push -f origin gh-pages

# Cleanup
echo "🧹 Cleaning up..."
cd -
rm -rf "$TEMP_DIR"

echo "✅ Deployment complete!"
echo "🌍 Your site should be live at: https://bridgitsocial.com"
