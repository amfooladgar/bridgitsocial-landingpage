# Architecture Documentation

Technical architecture and design decisions for the Bridgit Social landing page.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Design Patterns](#design-patterns)
- [Performance Optimizations](#performance-optimizations)
- [Future Architecture](#future-architecture)

## Overview

The Bridgit Social landing page is a static website built with modern web technologies, designed to be:
- **Fast**: Optimized for performance
- **Responsive**: Mobile-first design
- **Maintainable**: Clean, documented code
- **Scalable**: Ready for future expansion

### Architecture Principles

1. **Progressive Enhancement** - Core content works without JavaScript
2. **Mobile-First** - Designed for mobile, enhanced for desktop
3. **Performance-First** - Optimized load times and interactions
4. **Accessibility** - WCAG 2.1 AA compliant
5. **SEO Optimized** - Structured data and meta tags

## Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| HTML5 | - | Semantic markup |
| CSS3 | - | Styling and animations |
| JavaScript | ES6+ | Client-side logic |
| Vite | 5.0+ | Build tool and dev server |
| Node.js | 18.0+ | Build environment |

### Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| jQuery | 3.x | DOM manipulation, animations |
| Poptrox | - | Image lightbox |
| ScrollEx | - | Scroll-based animations |
| ScrollY | - | Smooth scrolling |
| Marked | 11.0+ | Markdown to HTML (blog) |
| Gray Matter | 4.0+ | Frontmatter parsing (blog) |

## Project Structure

```
bridgitsocial-landingpage/
│
├── assets/                 # Static assets
│   ├── css/               # Stylesheets
│   │   ├── main.css      # Main stylesheet
│   │   ├── fontawesome-all.min.css
│   │   └── noscript.css  # No-JS fallback
│   ├── js/                # JavaScript files
│   │   ├── main.js       # Main application logic
│   │   ├── jquery.*.js   # jQuery plugins
│   │   ├── browser.min.js
│   │   ├── breakpoints.min.js
│   │   └── util.js
│   ├── sass/              # Sass source files (optional)
│   └── webfonts/          # Font files
│
├── blog/                  # Blog system
│   ├── posts/            # Markdown blog posts
│   │   ├── *.md          # Individual posts
│   │   └── ...
│   ├── index.html        # Blog listing page
│   └── template.html     # Blog post template
│
├── docs/                  # Documentation
│   ├── DEPLOYMENT.md     # Deployment guide
│   └── ARCHITECTURE.md   # This file
│
├── images/                # Image assets
│   ├── fulls/            # Full-size images (gallery)
│   ├── thumbs/           # Thumbnails
│   ├── intro.jpg         # Hero background
│   ├── one.jpg           # Section backgrounds
│   └── two.jpg
│
├── src/                   # Future web app (modular)
│   ├── api/              # API integration layer
│   │   ├── client.js     # API client
│   │   ├── auth.js       # Authentication
│   │   └── endpoints.js  # API endpoints
│   ├── components/        # Reusable UI components
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── LoginModal.js
│   │   └── UserMenu.js
│   └── utils/             # Utility functions
│       ├── auth.js
│       ├── storage.js
│       └── router.js
│
├── scripts/               # Build and deployment scripts
│   ├── build-blog.js     # Blog builder
│   └── deploy.sh         # Deployment script
│
├── PrivacyPolicy/         # Legal pages
│   ├── PrivacyPolicyBridgitSocial.html
│   └── TermsofUse_TOU_BridgitSocial.html
│
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── .editorconfig          # Editor configuration
├── .prettierrc            # Code formatting rules
├── CHANGELOG.md           # Version history
├── CONTRIBUTING.md        # Contribution guidelines
├── DISCLAIMER.md          # Repository scope
├── LICENSE                # MIT License
├── README.md              # Project overview
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── index.html             # Main landing page
```

## Design Patterns

### CSS Architecture

**CSS Custom Properties** (CSS Variables)
```css
:root {
  --color-primary: #6366f1;
  --spacing-md: 2rem;
  --transition-base: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

Benefits:
- Consistent theming
- Easy to maintain
- Runtime value changes
- Browser support is excellent

**Mobile-First Responsive Design**
```css
/* Base styles for mobile */
.element { ... }

/* Tablet and larger */
@media (min-width: 768px) { ... }

/* Desktop */
@media (min-width: 1280px) { ... }
```

**BEM Naming Convention** (where applicable)
```css
.block { }
.block__element { }
.block--modifier { }
```

### JavaScript Patterns

**Modular Structure**
- Separate concerns (main.js, utils.js, etc.)
- Each plugin in its own file
- Clear dependencies

**Progressive Enhancement**
- Site works without JavaScript
- JavaScript enhances the experience
- Graceful degradation

**Event Delegation**
```javascript
// Efficient event handling
document.addEventListener('click', (e) => {
  if (e.target.matches('.button')) {
    // Handle click
  }
});
```

## Performance Optimizations

### Load Performance

1. **Critical CSS Inlining**
   - Above-the-fold CSS inlined
   - Rest loaded asynchronously

2. **Lazy Loading**
   - Images load on scroll
   - Deferred non-critical scripts

3. **Image Optimization**
   - WebP format with fallbacks
   - Responsive images
   - Proper sizing and compression

4. **Minification**
   - CSS and JS minified
   - HTML whitespace removed
   - Gzip compression

### Runtime Performance

1. **CSS Animations**
   - Use `transform` and `opacity`
   - Hardware-accelerated properties
   - `will-change` for known animations

2. **Debouncing/Throttling**
   - Scroll event handlers
   - Resize listeners

3. **Efficient Selectors**
   - ID and class selectors
   - Avoid complex combinators

### Caching Strategy

```javascript
// Browser caching via headers
Cache-Control: public, max-age=31536000, immutable
```

Assets are versioned for cache busting.

## Future Architecture

### Web App Integration

The architecture is designed to support future web app features:

**API Layer** (`src/api/`)
- Centralized API client
- Authentication handling
- Request/response interceptors
- Error handling

**Component System** (`src/components/`)
- Reusable UI components
- State management ready
- Props-based customization

**Routing**
- Client-side routing
- Deep linking support
- SEO-friendly URLs

**Authentication Flow**
```
┌────────────┐
│ Landing    │
│  Page      │
└─────┬──────┘
      │
      │ Click Login
      ▼
┌────────────┐
│ Login      │
│  Modal     │
└─────┬──────┘
      │
      │ Auth Success
      ▼
┌────────────┐
│ Web App    │
│  Dashboard │
└────────────┘
```

### Blog System

**Architecture**
- Markdown source files
- Build-time HTML generation
- RSS feed generation
- SEO optimization

**Build Process**
```
Markdown (.md) → Parser → Template → HTML
                    ↓
                RSS Feed
```

**Future Enhancements**
- CMS integration (Contentful, Strapi)
- Comment system (Disqus, etc.)
- Search functionality
- Categories and tags
- Author pages

### Scalability Considerations

1. **Code Splitting**
   - Separate bundles for different sections
   - Lazy load routes

2. **CDN Integration**
   - Static assets on CDN
   - Global distribution

3. **Progressive Web App**
   - Service worker
   - Offline support
   - App install prompt

4. **Build Optimization**
   - Tree shaking
   - Dead code elimination
   - Bundle size monitoring

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Last 2 versions |
| Firefox | Last 2 versions |
| Safari | Last 2 versions |
| Edge | Last 2 versions |
| Mobile Safari | iOS 13+ |
| Chrome Mobile | Android 8+ |

## Security Considerations

1. **Content Security Policy**
   - Restrict script sources
   - Prevent XSS attacks

2. **HTTPS Only**
   - All traffic encrypted
   - HSTS enabled

3. **Input Validation**
   - Form validation
   - Sanitize user input

4. **Dependencies**
   - Regular updates
   - Security audits (`npm audit`)

## Monitoring and Analytics

### Performance Monitoring

- Google Lighthouse CI
- Core Web Vitals tracking
- Performance budgets

### Analytics (Optional)

- Google Analytics 4
- Event tracking
- Conversion tracking

### Error Tracking

- Browser console errors
- Failed network requests
- JavaScript exceptions

## Development Workflow

1. **Local Development**
   ```bash
   npm run dev  # Hot reload server
   ```

2. **Testing**
   - Manual browser testing
   - Lighthouse audits
   - Accessibility checks

3. **Build**
   ```bash
   npm run build  # Production build
   ```

4. **Deploy**
   ```bash
   npm run deploy  # Automated deployment
   ```

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web.dev](https://web.dev/)
- [CSS-Tricks](https://css-tricks.com/)

---

**Questions?** Open an issue or contact us at support@bridgitsocial.com
