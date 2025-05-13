# Assets Directory

This directory contains images, logos, and other static assets for the blog.

## Usage

1. Place your image files in this directory
2. Reference them in markdown posts using relative paths:

```markdown
![Image Alt Text](/assets/image-name.jpg)
```

3. For post cover images, specify the path in the frontmatter:

```markdown
---
title: My Post Title
coverImage: /assets/cover-image.jpg
---
```

## Recommended File Types

- Use `.jpg` for photos and complex images
- Use `.png` for images with transparency
- Use `.svg` for logos and icons

## Image Optimization

Consider optimizing your images before adding them to reduce load times:
- Resize images to appropriate dimensions
- Compress images using tools like TinyPNG or ImageOptim
- Consider using WebP format for better compression