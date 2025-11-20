# Contributing to Bridgit Social Landing Page

Thank you for your interest in contributing to the Bridgit Social landing page! This document provides guidelines for contributing to this repository.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [What Can I Contribute?](#what-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## What Can I Contribute?

### Scope

**This repository is for the landing page ONLY.** Please note:

✅ **You CAN contribute:**
- Landing page improvements and bug fixes
- Blog posts and content
- Design enhancements
- Performance optimizations
- Documentation improvements
- Accessibility features
- SEO improvements

❌ **You CANNOT contribute:**
- Mobile app features (proprietary)
- Backend API changes (proprietary)
- Authentication logic (not yet implemented)

### Types of Contributions

1. **Bug Reports** - Found a bug? Let us know!
2. **Feature Requests** - Have an idea? Share it!
3. **Code Contributions** - Submit a pull request
4. **Documentation** - Improve our docs
5. **Blog Content** - Write about networking, tech, or Bridgit

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/bridgitsocial-landingpage.git
   cd bridgitsocial-landingpage
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## Development Workflow

1. **Make your changes**
   - Write clean, readable code
   - Follow the style guidelines below
   - Add comments for complex logic

2. **Test your changes**
   - Test in multiple browsers (Chrome, Firefox, Safari)
   - Test on mobile devices
   - Verify responsive design

3. **Format your code**
   ```bash
   npm run format
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

### Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## Pull Request Process

1. **Update documentation** if needed
2. **Update CHANGELOG.md** with your changes
3. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
4. **Create a Pull Request** on GitHub
5. **Describe your changes** clearly in the PR description
6. **Link any related issues**
7. **Wait for review** - we'll review as soon as possible!

### PR Review Criteria

- Code quality and readability
- Functionality works as expected
- No breaking changes (or clearly documented)
- Tests pass (when we add them)
- Documentation is updated
- Follows style guidelines

## Style Guidelines

### HTML

- Use semantic HTML5 elements
- Maintain proper indentation (2 spaces)
- Add aria labels for accessibility
- Keep attributes in consistent order

### CSS

- Follow BEM naming convention when possible
- Use CSS variables for colors and spacing
- Write mobile-first responsive styles
- Keep specificity low

### JavaScript

- Use modern ES6+ syntax
- Prefer const/let over var
- Write descriptive function and variable names
- Add JSDoc comments for functions
- Keep functions small and focused

### File Organization

```
bridgitsocial-landingpage/
├── assets/
│   ├── css/          # Stylesheets
│   ├── js/           # JavaScript files
│   └── webfonts/     # Font files
├── blog/             # Blog system
├── images/           # Image assets
├── src/              # Future web app components
└── index.html        # Main landing page
```

## Questions?

- Open an issue for discussion
- Email: ali.fouladgar@bridgitsocial.com
- Check existing issues and PRs first

## License

By contributing, you agree that your contributions will be licensed under the MIT License (see LICENSE file).

---

Thank you for contributing to Bridgit Social! 🎉
