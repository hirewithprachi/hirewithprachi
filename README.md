# Prachi Shrivastava Virtual HR Services

## Project Vision
Transform the HR services website into a cutting-edge, AI-powered, interactive platform with stunning visual appeal, advanced functionality, and exceptional user experience, fully compatible with Hostinger static hosting.

## Tech Stack & Hosting Requirements
- **Framework:** Vite + React (static build)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion, AOS, GSAP (CDN), Lottie Web
- **Routing:** React Router (client-side)
- **Forms:** Formspree, EmailJS, Calendly (embedded)
- **Auth:** Firebase Auth (client-side, optional)
- **Data:** Static JSON, Airtable API, Local Storage
- **Payments:** Stripe Checkout, PayPal Smart Buttons
- **Analytics:** Google Analytics 4, Facebook Pixel, LinkedIn Insight Tag, Hotjar, Microsoft Clarity
- **PWA:** Service Worker, manifest.json
- **Output:** /dist folder for Hostinger upload

## Site Map & Page Structure

- `/` (Home)
  - Hero Section (3D background, dynamic text, avatar, CTAs, trust carousel, video)
  - Services Overview
  - About Preview
  - Portfolio/Case Studies Preview
  - Lead Capture/Contact Preview
  - Footer
- `/about` (About)
  - Personal Branding (photo, info cards, timeline, skills, badges, testimonials, stats)
- `/services` (All Services)
  - Service Cards Grid
  - Interactive Service Builder
  - AI Service Matcher (quiz)
  - Service Comparison Table
  - Process Visualization
  - Each service links to detail page
- `/services/[service]` (Service Detail Pages)
  - e.g. `/services/recruitment-hiring`, `/services/payroll-compliance`, etc.
- `/portfolio` (Portfolio & Case Studies)
  - Project Gallery
  - Before/After Showcases
  - Success Metrics
  - Downloadable Case Studies
  - Video Testimonials
- `/resources` (HR Tools & Resources Hub)
  - Free Tools (calculators, generators)
  - Resource Library (searchable)
  - Interactive Templates
  - HR News Feed
- `/contact` (Contact & Lead Generation)
  - Contact Form (Formspree/EmailJS)
  - Calendly Booking
  - Embedded Map/Location
- `/client-portal` (Client Dashboard, optional, static-auth/Firebase)
  - Project Timeline
  - Document Repository
  - Communication Center
  - Invoice/Payment History
  - Analytics, Scheduler, File Sharing, Reports, Feedback, Downloads
- `/blog` (HR Blog, optional)
  - Articles (from static JSON or Airtable API)
- `/privacy-policy`, `/terms-of-service` (Legal)

## Key Features (Static-Compatible)
- Animations, micro-interactions, parallax, 3D effects
- Static data for services, blog, resources
- Third-party integrations for forms, chat, analytics, payments
- PWA support for offline and mobile
- SEO: sitemap.xml, schema markup, meta tags
- Security: HTTPS, CSP, cookie consent

## Folder Structure (for /dist or public_html)
- index.html
- about.html
- services.html
- contact.html
- portfolio.html
- resources.html
- blog.html
- client-portal.html (optional)
- services/[service].html
- assets/
  - css/
  - js/
  - images/
- .htaccess
- sitemap.xml
- manifest.json

---

This README serves as the implementation blueprint. Each page/component will be built to match the design and feature requirements, using static-compatible solutions as outlined above. 