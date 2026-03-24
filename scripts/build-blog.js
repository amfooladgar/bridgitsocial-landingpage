/**
 * Blog Build Script
 * 
 * Converts markdown blog posts to HTML pages
 * Generates blog index and RSS feed
 */

import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import matter from 'gray-matter';

const POSTS_DIR = './blog/posts';
const OUTPUT_DIR = './dist/blog/posts';
const BLOG_URL = 'https://bridgitsocial.com/blog';

/**
 * Ensure directory exists
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Read all markdown files
 */
function readMarkdownFiles() {
  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
  
  return files.map(file => {
    const filepath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filepath, 'utf-8');
    const { data, content: markdown } = matter(content);
    
    return {
      slug: file.replace('.md', ''),
      frontmatter: data,
      markdown,
      html: marked(markdown),
    };
  });
}

/**
 * Generate HTML page for a blog post
 */
function generatePostHTML(post) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${post.frontmatter.title} - Bridgit Social Blog</title>
  <meta name="description" content="${post.frontmatter.excerpt}" />
  <meta name="author" content="${post.frontmatter.author}" />
  ${post.frontmatter.tags ? `<meta name="keywords" content="${post.frontmatter.tags.join(', ')}" />` : ''}
  <link rel="stylesheet" href="../../assets/css/main.css" />
  <link rel="icon" href="../../images/icons/facicon.png" type="image/png" />
  <style>
    .blog-post {
      max-width: 800px;
      margin: 0 auto;
      padding: 120px 20px 60px;
    }
    .blog-post h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: var(--color-accent);
    }
    .blog-meta {
      color: var(--color-text-light);
      margin-bottom: 3rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .blog-content h2 {
      color: var(--color-accent-light);
      font-size: 1.8rem;
      margin-top: 3rem;
      margin-bottom: 1rem;
    }
    .blog-content h3 {
      color: var(--color-white);
      font-size: 1.4rem;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
    .blog-content p {
      line-height: 1.8;
      margin-bottom: 1.5rem;
    }
    .blog-content ul, .blog-content ol {
      margin: 1.5rem 0;
      padding-left: 2rem;
      line-height: 1.8;
    }
    .blog-content li {
      margin-bottom: 0.5rem;
    }
    .blog-content strong {
      color: var(--color-accent-light);
    }
    @media screen and (max-width: 768px) {
      .blog-post {
        padding-top: 100px;
      }
      .blog-post h1 {
        font-size: 2rem;
      }
    }
  </style>
</head>
<body class="is-preload">
  <!-- Header -->
  <header id="header">
    <a href="../../index.html">
      <img src="../../images/icons/facicon.png" alt="Bridgit Social Logo" style="height: 40px; vertical-align: middle; margin-right: 10px" />
    </a>
    <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <nav>
      <ul id="navMenu">
        <li><a href="../../index.html#intro">Home</a></li>
        <li><a href="../../index.html#one">Features</a></li>
        <li><a href="../../index.html#work">Screenshots</a></li>
        <li><a href="../index.html">Blog</a></li>
        <li><a href="../../instructions.html">How To Use</a></li>
        <li><a href="../../waitListPage.html">Join the Club</a></li>
        <li><a href="../../support/support.html">Support</a></li>
        <li><a href="../../index.html#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <!-- Article -->
  <article class="blog-post">
    <h1>${post.frontmatter.title}</h1>
    
    <div class="blog-meta">
      <span>${post.frontmatter.date}</span> • <span>${post.frontmatter.author}</span>
      ${post.frontmatter.tags ? ` • <span>${post.frontmatter.tags.map(tag => `#${tag}`).join(' ')}</span>` : ''}
    </div>

    <div class="blog-content">
      ${post.html}
    </div>

    <footer style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1);">
      <a href="../index.html" class="button style2">← Back to Blog</a>
    </footer>
  </article>

  <!-- Footer -->
  <footer id="footer">
    <ul class="icons">
      <li>
        <a href="https://www.linkedin.com/company/bridgit-social" class="icon brands">
          <i class="fab fa-linkedin-in"></i>
          <span class="label">LinkedIn</span>
        </a>
      </li>
      <li>
        <a href="https://www.instagram.com/bridgit.social/" class="icon brands">
          <i class="fab fa-instagram"></i>
          <span class="label">Instagram</span>
        </a>
      </li>
      <li>
        <a href="https://apps.apple.com/us/app/bridgit-social/id6743941115" class="icon brands">
          <i class="fab fa-apple"></i>
          <span class="label">App Store</span>
        </a>
      </li>
      <li>
        <a href="https://play.google.com/store/apps/details?id=com.bridgitsocial.android_prod" class="icon brands">
          <i class="fab fa-google-play"></i>
          <span class="label">Google Play</span>
        </a>
      </li>
    </ul>
    <ul class="menu">
      <li>&copy;Copyright Bridgit Social 2025</li>
    </ul>
    <ul class="menu">
      <li>
        <a href="../../PrivacyPolicy/PrivacyPolicyBridgitSocial.html">Privacy Policy</a>
        |
        <a href="../../PrivacyPolicy/TermsofUse_TOU_BridgitSocial.html">Terms of Service</a>
      </li>
    </ul>
  </footer>

  <!-- Scripts -->
  <script src="../../assets/js/jquery.min.js"></script>
  <script src="../../assets/js/jquery.scrolly.min.js"></script>
  <script src="../../assets/js/browser.min.js"></script>
  <script src="../../assets/js/breakpoints.min.js"></script>
  <script src="../../assets/js/util.js"></script>
  <script src="../../assets/js/main.js"></script>

  <!-- Nav Toggle Script -->
  <script>
    (function() {
      const navToggle = document.getElementById('navToggle');
      const navMenu = document.getElementById('navMenu');
      
      if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
          navToggle.classList.toggle('active');
          navMenu.classList.toggle('nav-open');
        });
        
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
          link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('nav-open');
          });
        });
        
        document.addEventListener('click', function(event) {
          const isClickInside = navToggle.contains(event.target) || navMenu.contains(event.target);
          if (!isClickInside && navMenu.classList.contains('nav-open')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('nav-open');
          }
        });
      }
    })();
  </script>
</body>
</html>`;
}

/**
 * Generate RSS feed
 */
function generateRSS(posts) {
  const items = posts.map(post => `
    <item>
      <title>${post.frontmatter.title}</title>
      <link>${BLOG_URL}/posts/${post.slug}.html</link>
      <guid>${BLOG_URL}/posts/${post.slug}.html</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description>${post.frontmatter.excerpt}</description>
      <author>${post.frontmatter.author}</author>
    </item>
  `).join('\n');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Bridgit Social Blog</title>
    <link>${BLOG_URL}</link>
    <description>Networking tips, app updates, and community stories from Bridgit Social</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;
}

/**
 * Main build function
 */
function buildBlog() {
  console.log('📝 Building blog...');

  // Ensure output directory exists
  ensureDir(OUTPUT_DIR);

  // Read all posts
  const posts = readMarkdownFiles();
  console.log(`Found ${posts.length} blog posts`);

  // Generate HTML for each post
  posts.forEach(post => {
    const html = generatePostHTML(post);
    const outputPath = path.join(OUTPUT_DIR, `${post.slug}.html`);
    fs.writeFileSync(outputPath, html);
    console.log(`  ✓ Generated ${post.slug}.html`);
  });

  // Generate RSS feed
  const rss = generateRSS(posts);
  fs.writeFileSync('./dist/blog/feed.xml', rss);
  console.log('  ✓ Generated RSS feed');

  console.log('✅ Blog build complete!');
}

// Run the build
buildBlog();
