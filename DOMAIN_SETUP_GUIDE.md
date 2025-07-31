# 🌐 Domain Setup Guide for Hostinger

## ✅ **Domain Configuration Steps**

### **Step 1: Access Hostinger Control Panel**
1. **Login to**: https://hpanel.hostinger.com
2. **Select your domain**: `hirewithprachi.com` (or your domain)
3. **Navigate to**: "Domains" section

### **Step 2: Configure Domain Settings**

#### **A. DNS Configuration**
1. **Go to**: "DNS Zone Editor" or "DNS Management"
2. **Verify these records exist**:
   ```
   Type    Name    Value
   A       @       185.199.108.153 (or your server IP)
   CNAME   www     hirewithprachi.com
   ```

#### **B. SSL Certificate**
1. **Go to**: "SSL" section
2. **Enable**: "Free SSL Certificate"
3. **Force HTTPS**: Enable this option
4. **Wait**: 24-48 hours for SSL to activate

### **Step 3: Configure Website Settings**

#### **A. Document Root**
1. **Go to**: "File Manager"
2. **Verify**: `public_html` is your document root
3. **Check**: All website files are in `public_html/`

#### **B. Error Pages**
1. **Create**: Custom 404 page
2. **Create**: Custom 500 page
3. **Test**: Error page functionality

### **Step 4: Test Domain Configuration**

#### **A. Basic Tests**
- [ ] **Homepage loads**: https://hirewithprachi.com
- [ ] **HTTPS works**: https://hirewithprachi.com
- [ ] **WWW redirects**: http://www.hirewithprachi.com → https://hirewithprachi.com
- [ ] **All pages work**: /services, /blog, /contact, /about

#### **B. Advanced Tests**
- [ ] **React Router**: Direct URLs work
- [ ] **Assets load**: CSS, JS, images
- [ ] **Forms work**: Contact forms functional
- [ ] **Mobile responsive**: Test on mobile devices

## 🔧 **Troubleshooting Common Issues**

### **Issue 1: Domain Not Loading**
**Solution:**
1. Check DNS propagation (can take 24-48 hours)
2. Verify DNS records are correct
3. Contact Hostinger support if needed

### **Issue 2: SSL Certificate Not Working**
**Solution:**
1. Wait 24-48 hours for SSL activation
2. Clear browser cache
3. Check SSL status in Hostinger panel

### **Issue 3: WWW Not Redirecting**
**Solution:**
1. Add CNAME record: `www` → `hirewithprachi.com`
2. Enable "Force HTTPS" in SSL settings
3. Add redirect rule in .htaccess

### **Issue 4: React Router Not Working**
**Solution:**
1. Ensure .htaccess file is in public_html
2. Check .htaccess contains React Router rules
3. Verify mod_rewrite is enabled

## 📞 **Support Resources**

### **Hostinger Support**
- **Live Chat**: Available 24/7
- **Knowledge Base**: help.hostinger.com
- **Community**: community.hostinger.com

### **DNS Tools**
- **DNS Checker**: whatsmydns.net
- **SSL Checker**: sslshopper.com
- **Website Speed**: pagespeed.web.dev

## 🎯 **Next Steps After Domain Setup**

### **Priority 1: SEO Configuration**
1. **Google Search Console**: Add and verify domain
2. **Submit Sitemap**: https://hirewithprachi.com/sitemap.xml
3. **Google Analytics**: Set up tracking

### **Priority 2: Email Configuration**
1. **Set up email**: info@hirewithprachi.com
2. **Configure email client**: Outlook, Gmail, etc.
3. **Test email functionality**

### **Priority 3: Performance Optimization**
1. **Enable caching**: LiteSpeed Cache
2. **Optimize images**: Compress and convert to WebP
3. **Monitor performance**: Use Google PageSpeed Insights

---

## 📋 **Domain Setup Checklist**

- [ ] DNS records configured correctly
- [ ] SSL certificate enabled
- [ ] HTTPS forced
- [ ] WWW redirects to non-WWW
- [ ] All pages load correctly
- [ ] React Router works
- [ ] Mobile responsive
- [ ] Contact forms functional
- [ ] Google Search Console configured
- [ ] Google Analytics installed
- [ ] Sitemap submitted
- [ ] Performance optimized

---

*Domain setup guide created on $(date)*
*Next review: After domain configuration* 