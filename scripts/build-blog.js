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
  <meta name="keywords" content="${post.frontmatter.tags.join(', ')}" />
  <link rel="stylesheet" href="../../assets/css/main.css" />
  <link rel="icon" href="../../facicon.png" type="image/png" />
</head>
<body>
  <!-- Header -->
  <header id="header">
    <a href="../../index.html">
      <img src="../../facicon.png" alt="Bridgit Social Logo" style="height: 40px; vertical-align: middle; margin-right: 10px" />
    </a>
    <nav>
      <ul>
        <li><a href="../../index.html#intro">Home</a></li>
        <li><a href="../../index.html#one">How It Works</a></li>
        <li><a href="../../index.html#work">Screenshots</a></li>
        <li><a href="../index.html">Blog</a></li>
        <li><a href="../../index.html#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <!-- Article -->
  <article id="blog-post" class="main style2" style="padding-top: 120px;">
    <div class="content" style="max-width: 800px;">
      <header style="margin-bottom: 2rem;">
        <h1>${post.frontmatter.title}</h1>
        <p class="meta">
          ${post.frontmatter.date} • ${post.frontmatter.author}
          ${post.frontmatter.tags ? ` • ${post.frontmatter.tags.map(tag => `#${tag}`).join(' ')}` : ''}
        </p>
      </header>

      <div class="blog-content">
        ${post.html}
      </div>

      <footer style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1);">
        <a href="../index.html" class="button">← Back to Blog</a>
      </footer>
    </div>
  </article>

  <!-- Footer -->
  <footer id="footer">
    <ul class="icons">
      <li><a href="https://www.linkedin.com/company/bridgit-social" class="icon brands fa-linkedin-in"><span class="label">LinkedIn</span></a></li>
      <li><a href="https://www.instagram.com/bridgit.social/" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
      <li><a href="https://apps.apple.com/us/app/bridgit-social/id6743941115" class="icon brands fa-apple"><span class="label">App Store</span></a></li>
    </ul>
    <ul class="menu">
      <li>&copy;Copyright Bridgit Social 2025</li>
    </ul>
  </footer>

  <!-- Scripts -->
  <script src="../../assets/js/jquery.min.js"></script>
  <script src="../../assets/js/browser.min.js"></script>
  <script src="../../assets/js/breakpoints.min.js"></script>
  <script src="../../assets/js/util.js"></script>
  <script src="../../assets/js/main.js"></script>
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
