# 🚀 Hostinger Shared Hosting Deployment Guide

## 📋 **Prerequisites**
- Hostinger shared hosting account
- Domain name (hirewithprachi.com)
- File Manager access or FTP credentials
- cPanel access

## 🎯 **Deployment Steps**

### **Step 1: Prepare Your Files**
✅ **Completed:** Production build is ready in the `dist/` folder
✅ **Completed:** .htaccess file created for React Router
✅ **Completed:** robots.txt created for SEO
✅ **Completed:** sitemap.xml created for search engines

### **Step 2: Access Hostinger Control Panel**
1. **Login to Hostinger:** Go to [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. **Select your domain:** Choose `hirewithprachi.com`
3. **Access File Manager:** Click on "File Manager" in the left sidebar

### **Step 3: Upload Files to Hostinger**

#### **Method A: Using File Manager (Recommended)**
1. **Navigate to public_html:** Open the `public_html` folder
2. **Delete existing files:** Remove any default files (index.html, etc.)
3. **Upload dist folder contents:**
   - Select all files from your local `dist/` folder
   - Upload them directly to `public_html/`
   - **Important:** Upload the CONTENTS of dist folder, not the folder itself

#### **Method B: Using FTP (Alternative)**
1. **Get FTP credentials** from Hostinger control panel
2. **Use FTP client** (FileZilla, WinSCP, etc.)
3. **Connect to your server** using the provided credentials
4. **Navigate to public_html** folder
5. **Upload all files** from your local `dist/` folder

### **Step 4: Verify File Structure**
Your `public_html` folder should contain:
```
public_html/
├── index.html
├── .htaccess
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── index-B_YGKJNC.js
│   ├── index-Di4FgiCF.css
│   ├── BlogPostPage-C-PDkgXN.js
│   ├── vendor-BRaCMJ4j.js
│   └── [other asset files]
└── [other build files]
```

### **Step 5: Configure Domain Settings**

#### **A. DNS Configuration**
1. **Go to Domain Settings** in Hostinger control panel
2. **Verify DNS records:**
   - A Record: `@` → Your server IP
   - CNAME Record: `www` → `hirewithprachi.com`
   - MX Records: For email (if needed)

#### **B. SSL Certificate**
1. **Enable SSL:** Go to "SSL" section in control panel
2. **Install SSL Certificate:** Choose "Free SSL Certificate"
3. **Force HTTPS:** Enable "Force HTTPS" option

### **Step 6: Test Your Website**

#### **A. Basic Functionality Test**
1. **Visit your domain:** https://hirewithprachi.com
2. **Check homepage:** Should load without errors
3. **Test navigation:** All menu items should work
4. **Test React Router:** Direct URLs should work (e.g., /services, /blog)

#### **B. Advanced Testing**
1. **Test all pages:**
   - Homepage: https://hirewithprachi.com
   - Services: https://hirewithprachi.com/services
   - Blog: https://hirewithprachi.com/blog
   - Contact: https://hirewithprachi.com/contact
   - About: https://hirewithprachi.com/about

2. **Test blog posts:**
   - https://hirewithprachi.com/blog/employee-experience-culture-building
   - https://hirewithprachi.com/blog/virtual-hr-manager
   - https://hirewithprachi.com/blog/posh-compliance

3. **Test service pages:**
   - https://hirewithprachi.com/services/virtual-hr-management
   - https://hirewithprachi.com/services/posh-training
   - https://hirewithprachi.com/services/employee-relations

### **Step 7: SEO Configuration**

#### **A. Google Search Console**
1. **Add your property:** https://search.google.com/search-console
2. **Verify ownership:** Use HTML tag or DNS record
3. **Submit sitemap:** Add https://hirewithprachi.com/sitemap.xml

#### **B. Google Analytics**
1. **Create property:** https://analytics.google.com
2. **Get tracking code:** Add to your website
3. **Verify tracking:** Check real-time data

### **Step 8: Performance Optimization**

#### **A. Enable Caching**
1. **Go to Hostinger control panel**
2. **Find "LiteSpeed Cache" or similar**
3. **Enable caching** for better performance

#### **B. Image Optimization**
1. **Compress images** before uploading
2. **Use WebP format** where possible
3. **Enable lazy loading** (already implemented)

### **Step 9: Security Configuration**

#### **A. Security Headers**
✅ **Already configured** in .htaccess file:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy

#### **B. File Permissions**
1. **Set correct permissions:**
   - Files: 644
   - Directories: 755
   - .htaccess: 644

### **Step 10: Monitoring & Maintenance**

#### **A. Regular Backups**
1. **Enable automatic backups** in Hostinger
2. **Download backup** before major updates
3. **Test backup restoration** periodically

#### **B. Performance Monitoring**
1. **Use Google PageSpeed Insights**
2. **Monitor Core Web Vitals**
3. **Check uptime** regularly

## 🔧 **Troubleshooting Common Issues**

### **Issue 1: 404 Errors on Direct URLs**
**Solution:** Ensure .htaccess file is uploaded correctly

### **Issue 2: Assets Not Loading**
**Solution:** Check file permissions and paths

### **Issue 3: SSL Certificate Issues**
**Solution:** Contact Hostinger support or wait 24-48 hours

### **Issue 4: Slow Loading**
**Solution:** Enable caching and optimize images

## 📞 **Support Resources**

### **Hostinger Support**
- **Live Chat:** Available 24/7
- **Knowledge Base:** help.hostinger.com
- **Community Forum:** community.hostinger.com

### **Technical Support**
- **Email:** support@hostinger.com
- **Phone:** Available in your region
- **Ticket System:** Through control panel

## ✅ **Deployment Checklist**

- [ ] Production build completed
- [ ] Files uploaded to public_html
- [ ] .htaccess file in place
- [ ] robots.txt uploaded
- [ ] sitemap.xml uploaded
- [ ] SSL certificate enabled
- [ ] Domain DNS configured
- [ ] All pages tested
- [ ] React Router working
- [ ] Google Search Console configured
- [ ] Google Analytics installed
- [ ] Performance optimized
- [ ] Security headers active
- [ ] Backup system enabled

## 🎉 **Post-Deployment Tasks**

1. **Submit sitemap** to search engines
2. **Set up monitoring** tools
3. **Configure email** (if needed)
4. **Test contact forms**
5. **Monitor performance** for 24-48 hours
6. **Update DNS** if using external services

## 📈 **Performance Expectations**

- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **First Input Delay:** < 100ms

Your website should now be live and fully functional on Hostinger shared hosting! 🚀 