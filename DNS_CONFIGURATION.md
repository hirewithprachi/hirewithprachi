# DNS Configuration for SEO and Email Security

## Required DNS Records for hirewithprachi.com

### 1. SPF Record (TXT Record)
**Host/Name:** @ (root domain)
**Type:** TXT
**Value:** `v=spf1 include:_spf.google.com ~all`

This SPF record allows Google Workspace/Gmail to send emails on behalf of your domain and softly fails other sources.

### 2. DMARC Record (TXT Record)
**Host/Name:** _dmarc
**Type:** TXT
**Value:** `v=DMARC1; p=quarantine; rua=mailto:info@hirewithprachi.com; ruf=mailto:info@hirewithprachi.com; fo=1`

This DMARC record:
- Sets policy to quarantine suspicious emails
- Sends aggregate reports to info@hirewithprachi.com
- Sends forensic reports to info@hirewithprachi.com
- Generates reports for all failure types

### 3. DKIM Record (TXT Record)
**Host/Name:** default._domainkey (or as provided by your email provider)
**Type:** TXT
**Value:** (This will be provided by your email service provider - Google Workspace, etc.)

### 4. Additional Security Records

#### CAA Record (Optional but recommended)
**Host/Name:** @
**Type:** CAA
**Value:** `0 issue "letsencrypt.org"`

This restricts which Certificate Authorities can issue SSL certificates for your domain.

### 5. Performance Optimization

#### AAAA Record (IPv6 - if supported by hosting)
**Host/Name:** @
**Type:** AAAA
**Value:** (IPv6 address from your hosting provider)

#### CNAME Records for CDN (if using)
**Host/Name:** www
**Type:** CNAME
**Value:** hirewithprachi.com

### Implementation Steps:

1. **Access your domain registrar's DNS management panel**
2. **Add the SPF record first** - This prevents email delivery issues
3. **Add the DMARC record** - Wait 24-48 hours after SPF
4. **Configure DKIM through your email provider** (Google Workspace, etc.)
5. **Test email authentication** using tools like:
   - https://mxtoolbox.com/spf.aspx
   - https://dmarcanalyzer.com/
   - https://www.mail-tester.com/

### Verification:

After adding these records, verify them using:
```bash
# Check SPF
nslookup -type=TXT hirewithprachi.com

# Check DMARC
nslookup -type=TXT _dmarc.hirewithprachi.com

# Check DKIM (replace 'selector' with your actual DKIM selector)
nslookup -type=TXT selector._domainkey.hirewithprachi.com
```

### Notes:
- DNS changes can take 24-48 hours to propagate globally
- Start with SPF, then add DMARC after SPF is working
- Monitor DMARC reports for the first few weeks
- Consider professional email security services for advanced protection

### HTTP/2+ Support:
- Vercel automatically provides HTTP/2 support
- The updated vercel.json includes performance optimizations
- Security headers are configured for better SEO scores
