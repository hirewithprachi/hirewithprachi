# 🚀 Hire With Prachi - HR Services Website

A modern, professional HR services website built with React, featuring comprehensive HR solutions, interactive tools, and a blog system.

## 🌟 **Features**

### **Core Pages**
- 🏠 **Homepage** - Hero section with services overview
- 📋 **Services** - 36 comprehensive HR services
- 📝 **Blog** - 10 SEO-optimized articles with enhanced UI/UX
- 📞 **Contact** - Contact form with Calendly integration
- ℹ️ **About** - Company information and team details

### **Interactive Tools**
- 🧮 **HR Calculators** - 8 interactive tools for HR calculations
- 📊 **Assessment Tools** - HR needs assessment and compliance checkers
- 💰 **Salary Tools** - Salary benchmarking and calculation tools
- 📈 **ROI Calculator** - HR investment return calculator

### **Technical Features**
- ⚡ **Fast Performance** - Optimized for speed and Core Web Vitals
- 📱 **Mobile Responsive** - Perfect on all devices
- 🔍 **SEO Optimized** - Meta tags, schema markup, sitemap
- 🔒 **Security** - Security headers and best practices
- 🚀 **Auto-Deployment** - GitHub Actions to Hostinger

## 🛠️ **Tech Stack**

- **Frontend:** React 18, Vite, Tailwind CSS
- **Animations:** Framer Motion
- **Routing:** React Router DOM
- **SEO:** React Helmet Async
- **Forms:** Formspree integration
- **Deployment:** GitHub Actions + Hostinger

## 🚀 **Quick Start**

### **Local Development**
```bash
# Clone the repository
git clone https://github.com/yourusername/hirewithprachi-website.git

# Navigate to project directory
cd hirewithprachi-website

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### **Deployment**

#### **Option 1: GitHub Actions (Recommended)**
1. **Set up GitHub Secrets:**
   ```
   FTP_SERVER = your-server.hostinger.com
   FTP_USERNAME = your-ftp-username
   FTP_PASSWORD = your-ftp-password
   ```

2. **Push to main branch** - Automatic deployment!

#### **Option 2: Hostinger Git Integration**
1. **Connect repository** in Hostinger control panel
2. **Set build command:** `npm run build`
3. **Set output directory:** `dist`
4. **Enable auto-deploy** on push

#### **Option 3: Manual Upload**
1. **Build the project:** `npm run build`
2. **Upload dist/ folder** to Hostinger public_html/
3. **Include .htaccess** file for React Router

## 📁 **Project Structure**

```
src/
├── components/          # Reusable React components
├── pages/              # Page components
├── data/               # Static data (services, blog posts)
├── config/             # Configuration files
├── utils/              # Utility functions
└── assets/             # Images and static assets

public/                 # Public assets
dist/                   # Build output (auto-generated)
.github/workflows/      # GitHub Actions
```

## 🔧 **Configuration**

### **Environment Variables**
Create `.env` file for local development:
```env
VITE_SITE_URL=https://hirewithprachi.com
VITE_CONTACT_EMAIL=info@hirewithprachi.com
VITE_PHONE_NUMBER=+91 8740889927
```

### **Build Configuration**
- **Base URL:** Configured for root domain
- **Asset Optimization:** Automatic compression
- **Code Splitting:** Optimized bundle sizes

## 📊 **Performance**

### **Build Statistics**
- **Total Size:** ~2.3 MB (compressed)
- **JavaScript:** 832 KB (main bundle)
- **CSS:** 146 KB (main styles)
- **Images:** Optimized and compressed

### **Performance Metrics**
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **First Input Delay:** < 100ms

## 🔒 **Security**

### **Security Headers**
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### **File Protection**
- Sensitive files blocked (.htaccess, logs)
- Directory listing disabled
- Error pages customized

## 📱 **Mobile Optimization**

- **Mobile-first** responsive design
- **Touch-friendly** navigation
- **Optimized images** for mobile
- **Fast loading** on mobile networks
- **PWA ready** structure

## 🎯 **SEO Features**

- **Meta tags** for all pages
- **Schema markup** for rich snippets
- **Sitemap.xml** with 40+ pages
- **Robots.txt** for search engines
- **Open Graph** and Twitter Cards
- **Internal linking** strategy

## 🚀 **Deployment**

### **Automatic Deployment (GitHub Actions)**
- **Trigger:** Push to main branch
- **Process:** Install → Build → Deploy
- **Target:** Hostinger via FTP
- **Duration:** ~3-5 minutes

### **Manual Deployment**
- **Build:** `npm run build`
- **Upload:** dist/ folder to public_html/
- **Include:** .htaccess, robots.txt, sitemap.xml

## 📞 **Support**

### **Documentation**
- [Deployment Guide](HOSTINGER_DEPLOYMENT_GUIDE.md)
- [GitHub Setup](GITHUB_DEPLOYMENT_SETUP.md)
- [Blog Enhancement Summary](BLOG_POST_UI_UX_ENHANCEMENT_SUMMARY.md)

### **Contact**
- **Email:** info@hirewithprachi.com
- **Phone:** +91 8740889927
- **Website:** https://hirewithprachi.com

## 📄 **License**

This project is proprietary and confidential. All rights reserved.

## 🎉 **Contributing**

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

---

**Built with ❤️ for Hire With Prachi**

*Professional HR Services & Solutions* 