import React from 'react';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: 'https://linkedin.com', icon: 'linkedin' },
  { href: 'https://facebook.com', icon: 'facebook' },
  { href: 'mailto:info@hirewithprachi.com', icon: 'mail' },
];

function SocialIcon({ icon }) {
  if (icon === 'linkedin') return (
    <svg width="24" height="24" fill="currentColor" className="text-primary" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.845-1.563 3.043 0 3.604 2.004 3.604 4.609v5.587z"/></svg>
  );
  if (icon === 'facebook') return (
    <svg width="24" height="24" fill="currentColor" className="text-primary" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.733 0 1.325-.593 1.325-1.326v-21.349c0-.733-.592-1.326-1.325-1.326z"/></svg>
  );
  if (icon === 'mail') return (
    <svg width="24" height="24" fill="currentColor" className="text-primary" viewBox="0 0 24 24"><path d="M12 13.065l-11.985-8.065h23.97l-11.985 8.065zm-12-7.065v14h24v-14l-12 8.065-12-8.065z"/></svg>
  );
  return null;
}

export default function Footer() {
  return (
    <footer className="bg-gradient-primary text-white font-heading py-12 px-4 mt-16">
      <div className="container mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <img src="/assets/images/logo.png" alt="Logo" className="h-12 w-auto mb-3" loading="lazy" />
          <h3 className="font-bold text-lg mb-3">Prachi HR</h3>
          <p className="text-white/80 text-sm mb-4">Virtual HR services for modern businesses. Transform your HR, amplify your success.</p>
          <div className="flex gap-3">
            {socialLinks.map(link => (
              <a key={link.icon} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <SocialIcon icon={link.icon} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {quickLinks.map(link => (
              <li key={link.href}><a href={link.href} className="hover:text-accent transition-colors">{link.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li><span className="font-semibold">Email:</span> <a href="mailto:info@hirewithprachi.com" className="hover:text-accent">info@hirewithprachi.com</a></li>
            <li><span className="font-semibold">Phone:</span> <a href="tel:+1234567890" className="hover:text-accent">+1 234 567 890</a></li>
            <li><span className="font-semibold">Location:</span> Remote / India</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/privacy-policy" className="hover:text-accent">Privacy Policy</a></li>
            <li><a href="/terms-of-service" className="hover:text-accent">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-white/70 mt-8">&copy; {new Date().getFullYear()} Prachi Shrivastava Virtual HR Services. All rights reserved.</div>
    </footer>
  );
}