# Deployment Guide

This guide covers deploying the Bridgit Social landing page to various platforms.

## Table of Contents

- [GitHub Pages](#github-pages)
- [Custom Domain Setup](#custom-domain-setup)
- [Environment Variables](#environment-variables)
- [Build Process](#build-process)
- [Troubleshooting](#troubleshooting)

## GitHub Pages

### Automatic Deployment

The easiest way to deploy is using the included deployment script:

```bash
npm run deploy
```

This script will:
1. Build the production bundle
2. Generate blog posts
3. Deploy to the `gh-pages` branch
4. Push to GitHub

### Manual Deployment

1. **Build the site**
   ```bash
   npm run build
   npm run build:blog
   ```

2. **Deploy to gh-pages**
   ```bash
   git checkout --orphan gh-pages
   git --work-tree dist add --all
   git --work-tree dist commit -m 'Deploy'
   git push origin HEAD:gh-pages --force
   git checkout main
   ```

### Enable GitHub Pages

1. Go to your repository settings
2. Navigate to **Pages** section
3. Set source to `gh-pages` branch
4. Click **Save**

Your site will be available at `https://yourusername.github.io/bridgitsocial-landingpage`

## Custom Domain Setup

### DNS Configuration

1. **Add CNAME record**
   ```
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   ```

2. **Add A records** (for apex domain bridgitsocial.com)
   ```
   Type: A
   Name: @
   Values:
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
   ```

### GitHub Configuration

1. Create a `CNAME` file in the root directory:
   ```
   bridgitsocial.com
   ```

2. In GitHub Pages settings:
   - Enter your custom domain (e.g., `bridgitsocial.com`)
   - Enable **Enforce HTTPS**

### SSL/HTTPS

GitHub Pages automatically provides SSL/HTTPS for custom domains. It may take up to 24 hours for the certificate to be issued.

## Environment Variables

### Development

Create a `.env` file from the template:

```bash
cp .env.example .env
```

Edit values as needed:
```env
VITE_API_BASE_URL=https://api.bridgitsocial.com
VITE_ENABLE_WEB_APP=false
VITE_ENVIRONMENT=development
```

### Production

For GitHub Pages, environment variables are not typically used since it's a static site. However, if you need them:

1. Use GitHub Secrets in your repository
2. Configure GitHub Actions to inject them during build
3. Prefix with `VITE_` for Vite to expose them to client code

## Build Process

### Production Build

```bash
npm run build
```

This creates optimized files in `dist/`:
- Minified HTML, CSS, JS
- Optimized images
- Source maps (for debugging)

### Build the Blog

```bash
npm run build:blog
```

This:
- Converts markdown files to HTML
- Generates blog index
- Creates RSS feed

### Preview Production Build

```bash
npm run preview
```

View the production build locally at `http://localhost:4173`

## Deployment Checklist

Before deploying, verify:

- [ ] All links work (internal and external)
- [ ] Images are optimized
- [ ] Meta tags are correct
- [ ] Social media cards work
- [ ] Forms submit correctly
- [ ] Mobile responsive
- [ ] Performance score > 90 (Lighthouse)
- [ ] SEO score > 90 (Lighthouse)
- [ ] Accessibility score > 90 (Lighthouse)
- [ ] CHANGELOG.md is updated
- [ ] Version number bumped in package.json

## Troubleshooting

### 404 on Page Refresh

**Problem**: Refreshing a page (like `/blog`) gives a 404 error.

**Solution**: GitHub Pages doesn't support client-side routing by default. Options:
1. Use hash-based routing (`/#/blog`)
2. Add a custom 404.html that redirects
3. Use a service like Netlify instead

### Custom Domain Not Working

**Problem**: Custom domain shows "404 - Not Found"

**Solutions**:
1. Wait 24-48 hours for DNS propagation
2. Verify CNAME file is in the root of gh-pages branch
3. Check DNS records are correct
4. Clear browser cache

### SSL Certificate Error

**Problem**: "Your connection is not private" warning

**Solutions**:
1. Wait up to 24 hours for certificate issuance
2. Ensure HTTPS is enabled in GitHub Pages settings
3. Check that DNS records are pointed correctly

### Build Fails

**Problem**: `npm run build` fails

**Solutions**:
1. Delete `node_modules` and run `npm install` again
2. Check Node.js version (must be >= 18.0.0)
3. Review error messages for specific issues
4. Ensure all dependencies are installed

## Alternative Deployment Platforms

### Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build && npm run build:blog`
3. Set publish directory: `dist`
4. Deploy!

Netlify handles routing better than GitHub Pages.

### Vercel

1. Import your GitHub repository
2. Framework preset: Vite
3. Build command: `npm run build && npm run build:blog`
4. Output directory: `dist`
5. Deploy!

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - run: npm run build:blog
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Now every push to `main` automatically deploys!

## Support

For deployment issues:
- Open an issue on GitHub
- Email: ali.fouladgar@bridgitsocial.com

---

**Next Steps:** [Architecture Documentation](ARCHITECTURE.md)
