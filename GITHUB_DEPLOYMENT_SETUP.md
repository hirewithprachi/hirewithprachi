# 🚀 GitHub + Hostinger Auto-Deployment Setup

## 📋 **Overview**
This setup enables automatic deployment to Hostinger whenever you push code to your GitHub repository. No more manual uploads!

## 🎯 **Setup Steps**

### **Step 1: Get Hostinger FTP Credentials**

1. **Login to Hostinger:** [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. **Go to Files → FTP Accounts**
3. **Create new FTP account:**
   - **Username:** `hirewithprachi_deploy`
   - **Password:** Generate a strong password
   - **Directory:** `/public_html/`
4. **Note down the credentials**

### **Step 2: Configure GitHub Secrets**

1. **Go to your GitHub repository**
2. **Navigate to:** Settings → Secrets and variables → Actions
3. **Add these repository secrets:**

#### **Required Secrets:**
```
FTP_SERVER = your-server.hostinger.com
FTP_USERNAME = hirewithprachi_deploy
FTP_PASSWORD = your-ftp-password
```

#### **How to find FTP Server:**
- In Hostinger control panel → Files → FTP Accounts
- Look for "FTP Host" or "Server" field
- Usually format: `server123.hostinger.com`

### **Step 3: Test the Deployment**

1. **Make a small change** to your code
2. **Commit and push** to main branch
3. **Check GitHub Actions** tab for deployment status
4. **Visit your website** to verify changes

## 🔧 **Alternative: Hostinger Git Integration**

### **Method A: Direct Git Integration (Recommended)**

1. **In Hostinger Control Panel:**
   - Go to "Git" section
   - Click "Connect Repository"
   - Select your GitHub repository
   - Choose branch (main/master)
   - Set deployment directory: `/public_html/`

2. **Configure Auto-Deploy:**
   - Enable "Auto-deploy on push"
   - Set build command: `npm run build`
   - Set output directory: `dist`

### **Method B: Manual Git Deployment**

1. **In Hostinger Control Panel:**
   - Go to "Git" section
   - Connect your GitHub repository
   - Click "Deploy" when ready

## 📁 **File Structure for Git Deployment**

Your repository should have this structure:
```
your-repo/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
├── public/
├── dist/ (auto-generated)
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 **Deployment Workflow**

### **Automatic Deployment (GitHub Actions)**
1. **Push code** to main branch
2. **GitHub Actions** automatically:
   - Installs dependencies
   - Builds the project
   - Deploys to Hostinger via FTP
3. **Website updates** automatically

### **Manual Deployment (Hostinger Git)**
1. **Push code** to main branch
2. **Go to Hostinger** Git section
3. **Click "Deploy"** button
4. **Website updates** after build

## ⚙️ **Configuration Options**

### **Environment Variables**
Add these to your repository secrets if needed:
```
NODE_ENV = production
VITE_API_URL = https://your-api.com
VITE_GOOGLE_ANALYTICS = GA_MEASUREMENT_ID
```

### **Build Optimization**
The workflow automatically:
- ✅ Installs production dependencies
- ✅ Builds optimized assets
- ✅ Excludes unnecessary files
- ✅ Deploys only dist/ folder

## 🔍 **Monitoring Deployment**

### **GitHub Actions Tab**
- **View deployment status**
- **Check build logs**
- **Monitor deployment time**
- **Debug any issues**

### **Hostinger Git Tab**
- **View deployment history**
- **Check build status**
- **Redeploy if needed**
- **Rollback to previous version**

## 🛠️ **Troubleshooting**

### **Common Issues:**

#### **1. FTP Connection Failed**
- **Check FTP credentials** in GitHub secrets
- **Verify FTP account** is active in Hostinger
- **Ensure correct server** address

#### **2. Build Failed**
- **Check Node.js version** compatibility
- **Verify package.json** dependencies
- **Review build logs** in GitHub Actions

#### **3. Files Not Updated**
- **Check deployment logs**
- **Verify server directory** path
- **Ensure .htaccess** is included

#### **4. SSL/HTTPS Issues**
- **Enable SSL** in Hostinger control panel
- **Force HTTPS** after deployment
- **Wait 24-48 hours** for SSL activation

## 📊 **Benefits of Git Deployment**

### **Advantages:**
- ✅ **Automatic deployment** on code push
- ✅ **Version control** and rollback capability
- ✅ **Team collaboration** support
- ✅ **No manual uploads** required
- ✅ **Deployment history** tracking
- ✅ **Easy rollback** to previous versions

### **Best Practices:**
- 🔄 **Test on development branch** first
- 📝 **Use meaningful commit messages**
- 🏷️ **Tag important releases**
- 📋 **Review deployment logs**
- 🔒 **Keep secrets secure**

## 🎉 **Post-Setup Tasks**

1. **Test deployment** with a small change
2. **Verify website** functionality
3. **Check SSL certificate** activation
4. **Set up monitoring** for deployments
5. **Configure backup** strategy
6. **Document deployment** process

## 📞 **Support Resources**

### **GitHub Actions:**
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [FTP Deploy Action](https://github.com/SamKirkland/FTP-Deploy-Action)

### **Hostinger Support:**
- [Hostinger Git Integration](https://www.hostinger.com/tutorials/git)
- [FTP Setup Guide](https://www.hostinger.com/tutorials/ftp)

Your website will now automatically deploy whenever you push code to GitHub! 🚀 