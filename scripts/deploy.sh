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
