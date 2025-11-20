# Changelog

All notable changes to the Bridgit Social landing page will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-11-20

### Changed
- **Major project reorganization** for production-ready structure
- Reorganized images into categorized subfolders:
  - `images/backgrounds/` - Main site background images
  - `images/banners/` - Banner images for waitlist page
  - `images/icons/` - Logos and favicons
  - `images/screenshots/` - App screenshot gallery (renamed from thumbs/)
  - `images/email/` - Email template assets
- Consolidated email templates into `email-templates/` folder
  - `email-templates/welcome/` - Welcome email template
  - `email-templates/next-steps/` - Next steps email template
- Updated all file references across HTML and CSS files
- Improved folder structure clarity for future development

### Removed
- Duplicate backup images (`*_0.jpg` files)
- .DS_Store Mac system files
- Redundant root-level image files

### Fixed
- Footer icon display issues across all pages
- Background image sizing for better display
- Navigation menu consistency
- Blog post "Read More" button functionality

### Added
- Comprehensive blog post content
  - "Welcome to Bridgit Social Blog" - Full introduction
  - "5 Tips for Effective Networking in 2025" - Detailed networking guide
- HTML versions of blog posts for proper display
- Production-ready folder structure documentation

## [1.0.0] - 2025-01-20

### Added
- Initial release of production-grade landing page
- Modern responsive design with glassmorphism effects
- Hero section with call-to-action
- Features sections: How It Works, Privacy & Safety
- Screenshots gallery with lightbox functionality
- Contact form with FormSubmit integration
- Blog system with markdown-based content
- Multi-page architecture supporting future web app
- Professional documentation (README, CONTRIBUTING, LICENSE)
- Build system with Vite
- Deployment automation for GitHub Pages
- SEO optimizations and meta tags
- Social media integration (LinkedIn, Instagram, App Store)
- Environment configuration for future backend integration
- Comprehensive .gitignore and editor configs

### Technical
- Vite build system for fast development
- jQuery for animations and interactions
- Responsive grid layout
- Fixed parallax backgrounds
- Smooth scroll navigation
- Form validation
- Icon font integration (FontAwesome)
- Mobile-first responsive design

---

## Future Releases

### Planned Features
- Web-based app version with login
- Backend API integration
- User authentication system
- Enhanced blog with CMS
- Commenting system
- Newsletter subscription
- Analytics integration
- A/B testing framework
