# 🔐 **ADMIN USER ASSIGNMENT GUIDE**

## 📋 **USER DETAILS**
- **User ID**: `021d44cd-c355-4a36-b985-2ee6f779b46e`
- **Email**: `prachishri005@gmail.com`
- **Status**: ✅ Exists in Supabase Auth
- **Issue**: ❌ Not in `admin_users` table

---

## 🚀 **STEP-BY-STEP ASSIGNMENT PROCESS**

### **Step 1: Run the Assignment Script**

1. **Go to Supabase Dashboard** → SQL Editor
2. **Copy and paste** the contents of `assign-admin-user.sql`
3. **Click "Run"** to execute the script
4. **Verify** the success message appears

### **Step 2: Verify the Assignment**

1. **Run the verification script** `verify-admin-status.sql`
2. **Check** that all tests pass
3. **Confirm** user appears in admin_users table

### **Step 3: Test Admin Access**

1. **Go to**: `http://localhost:5173/admin/login`
2. **Login** with: `prachishri005@gmail.com`
3. **Verify** you're redirected to admin dashboard
4. **Test** all admin features

---

## 📊 **ASSIGNED PERMISSIONS**

The user will have **full admin access** with these permissions:

```json
{
  "dashboard": true,
  "audit": true,
  "users": true,
  "leads": true,
  "submissions": true,
  "content": true,
  "video_manager": true,
  "analytics": true,
  "reports": true,
  "settings": true
}
```

---

## 🔍 **VERIFICATION CHECKLIST**

### **✅ Database Verification**
- [ ] User exists in `auth.users` table
- [ ] User exists in `admin_users` table
- [ ] User has `admin` role
- [ ] User is `active`
- [ ] All permissions are set to `true`

### **✅ Function Verification**
- [ ] `is_admin()` returns `true`
- [ ] `get_admin_info()` returns user data
- [ ] Audit logs are created

### **✅ Frontend Verification**
- [ ] Can login to admin panel
- [ ] Can access admin dashboard
- [ ] Can view form submissions
- [ ] Can view leads
- [ ] Can access video manager
- [ ] Can view audit logs

---

## 🛠️ **TROUBLESHOOTING**

### **If Assignment Fails:**

1. **Check User Exists in Auth:**
   ```sql
   SELECT * FROM auth.users WHERE id = '021d44cd-c355-4a36-b985-2ee6f779b46e';
   ```

2. **Check Current Admin Users:**
   ```sql
   SELECT * FROM admin_users;
   ```

3. **Manual Insert (if needed):**
   ```sql
   INSERT INTO admin_users (user_id, email, role, permissions, is_active)
   VALUES (
     '021d44cd-c355-4a36-b985-2ee6f779b46e'::uuid,
     'prachishri005@gmail.com',
     'admin',
     '{"dashboard": true, "audit": true, "users": true, "leads": true, "submissions": true, "content": true, "video_manager": true, "analytics": true, "reports": true, "settings": true}'::jsonb,
     true
   );
   ```

### **If Login Fails:**

1. **Check RLS Policies:**
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'admin_users';
   ```

2. **Verify Admin Functions:**
   ```sql
   SELECT is_admin();
   SELECT get_admin_info();
   ```

3. **Check Environment Variables:**
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

---

## 📝 **SQL SCRIPTS**

### **Assignment Script** (`assign-admin-user.sql`)
- Inserts admin user record
- Sets full permissions
- Creates audit log entry
- Verifies assignment

### **Verification Script** (`verify-admin-status.sql`)
- Checks current admin users
- Verifies specific user status
- Tests admin functions
- Shows permissions

---

## 🎯 **EXPECTED RESULTS**

After running the scripts, you should see:

### **✅ Assignment Success:**
```
✅ ADMIN USER ASSIGNMENT COMPLETE
User ID: 021d44cd-c355-4a36-b985-2ee6f779b46e
Email: prachishri005@gmail.com
Role: admin
Permissions: full_access
Status: active
```

### **✅ Verification Success:**
```
Target User Status: ✅ FOUND IN ADMIN_USERS TABLE
Auth Status: ✅ FOUND IN AUTH.USERS TABLE
```

---

## 🔒 **SECURITY NOTES**

- ✅ **Database-based authentication** (primary method)
- ✅ **Session validation** for all admin routes
- ✅ **Audit logging** for admin actions
- ✅ **RLS policies** protect admin data
- ✅ **Permission-based access** control

---

## 📞 **SUPPORT**

If you encounter any issues:

1. **Check the verification script** for detailed diagnostics
2. **Review audit logs** for error information
3. **Verify environment variables** are correctly set
4. **Test admin functions** individually

---

## 🚀 **READY TO USE**

Once the assignment is complete, the user will have **full admin access** to:

- ✅ Admin Dashboard
- ✅ Form Submission Management
- ✅ Lead Tracking & Analytics
- ✅ Video Content Management
- ✅ Audit Logs
- ✅ User Management
- ✅ Content Management
- ✅ Analytics & Reporting

**Status**: 🎯 **READY FOR ASSIGNMENT** 