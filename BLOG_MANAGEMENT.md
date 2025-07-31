# 📝 Blog Management Guide

## How to Add New Blog Posts

### 🎯 **Quick Start**
To add a new blog post, simply edit the file: `src/data/blogPosts.js`

### 📋 **Blog Post Structure**
Each blog post should follow this structure:

```javascript
{
  id: 6, // Unique ID (increment from last post)
  title: "Your Blog Post Title",
  excerpt: "Short description (2-3 sentences)",
  content: "Full blog content...",
  image: "/path/to/image.jpg", // or external URL
  date: "2024-03-20", // YYYY-MM-DD format
  category: "HR Strategy", // Must match existing categories
  readTime: "5 min read",
  author: "Prachi Shrivastava",
  authorImage: "/path/to/author-image.jpg",
  featured: true, // true = shows on homepage, false = only on blog page
  slug: "your-blog-post-slug", // URL-friendly version of title
  tags: ["Tag1", "Tag2", "Tag3"] // For search functionality
}
```

### 🏷️ **Available Categories**
- HR Strategy
- Cost Analysis  
- Employee Engagement
- Remote Work
- HR Tech

### 📍 **Where New Posts Appear**
When you add a new blog post, it will automatically appear in:

1. **Blog Page** (`/blog`) - Main listing with all posts
2. **Homepage** - If `featured: true`, shows in blog section
3. **Services Page** - If `featured: true`, shows in blog section
4. **Search Results** - Searchable by title, excerpt, and tags

### 🔄 **Automatic Updates**
- No need to restart the server
- Changes appear immediately
- All pages using blog data update automatically

### 📊 **Helper Functions Available**
```javascript
// Get featured posts (for homepage/services)
getFeaturedPosts(3) // Returns 3 featured posts

// Get latest posts
getLatestPosts(5) // Returns 5 most recent posts

// Get posts by category
getPostsByCategory("HR Strategy", 6) // Returns 6 posts from HR Strategy

// Get single post by slug
getPostBySlug("your-blog-post-slug")
```

### 🎨 **Blog Card Variants**
The `BlogCard` component supports different styles:

- `variant="default"` - Standard blog card
- `variant="compact"` - Smaller card for sidebars
- `variant="featured"` - Larger card with tags

### 📝 **Example: Adding a New Post**

1. Open `src/data/blogPosts.js`
2. Add your new post to the `blogPosts` array
3. Save the file
4. Your post is now live! 🎉

### 🔍 **Search & Filtering**
- Posts are automatically searchable
- Category filtering works instantly
- Tags help with content discovery

### 📱 **Responsive Design**
All blog cards are fully responsive and work on:
- Desktop
- Tablet  
- Mobile

### 🚀 **Performance**
- Images are lazy-loaded
- Smooth animations with Framer Motion
- Optimized for fast loading

---

**Need Help?** The blog system is designed to be simple and automatic. Just add your post data and everything else updates automatically! 