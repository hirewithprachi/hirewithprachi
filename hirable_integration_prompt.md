# 🎨 HIRABLE TEMPLATE INTEGRATION PROMPT
## Transform Current Website Using Hirable Design Language

### 🎯 OBJECTIVE
Integrate the Hirable HTML template design aesthetics, layout structure, and UI components into the existing Prachi Shrivastava HR Services website while maintaining current functionality and adding Phase 1 business features.

---

## 📋 TASK OVERVIEW

**Primary Goal**: Use the downloaded Hirable template as design reference to recreate the visual style, color scheme, typography, and layout patterns while adapting content for Prachi's HR services.

**Key Requirement**: Maintain current React architecture and Hostinger compatibility while adopting Hirable's professional HR-focused design language.

---

## 🎨 DESIGN ADAPTATION INSTRUCTIONS

### 1. **Visual Style Transfer**
```css
/* Extract and adapt Hirable's design system */
- Color palette: Use Hirable's professional blue/purple gradient scheme
- Typography: Adopt Hirable's font choices and text hierarchy
- Spacing: Match Hirable's section padding, margins, and grid system
- Component styling: Recreate buttons, cards, forms, and navigation styles
- Icons: Use similar icon style and positioning as Hirable
- Image treatments: Apply Hirable's image overlays, borders, and effects
```

### 2. **Layout Structure Conversion**
```javascript
// Recreate Hirable's layout patterns:
- Header/Navigation: Copy Hirable's navigation style and structure
- Hero Section: Adapt Hirable's hero layout with background and CTAs
- Services Grid: Use Hirable's service card design and grid layout
- About Section: Match Hirable's about section layout and styling
- Contact Forms: Replicate Hirable's form styling and placement
- Footer: Adopt Hirable's footer structure and link organization
```

### 3. **Component Recreation**
```jsx
// Convert Hirable HTML components to React:
- Navigation menu with dropdown styles
- Hero banner with background effects
- Service cards with hover animations
- Feature sections with icon placements
- Testimonial/client sections design
- Call-to-action buttons and sections
- Form styling and validation display
```

---

## 🔧 IMPLEMENTATION APPROACH

### **Step 1: Design System Setup**
```javascript
// Create design tokens matching Hirable:
const hirabledTheme = {
  colors: {
    primary: '#4F46E5', // Extract from Hirable
    secondary: '#7C3AED', // Extract from Hirable
    accent: '#06B6D4', // Extract from Hirable
    neutral: '#64748B', // Extract from Hirable
    background: '#F8FAFC', // Extract from Hirable
    surface: '#FFFFFF'
  },
  typography: {
    // Match Hirable's font system
    fontFamily: 'Inter, system-ui, sans-serif',
    headings: 'Poppins, sans-serif'
  },
  spacing: {
    // Match Hirable's spacing scale
    sections: '80px',
    containers: '120px',
    cards: '24px'
  }
}
```

### **Step 2: Layout Conversion**
```jsx
// Recreate Hirable's page structure:
<Layout>
  <Header /> {/* Style matching Hirable navigation */}
  <HeroSection /> {/* Hirable hero layout */}
  <ServicesGrid /> {/* Hirable service cards */}
  <AboutSection /> {/* Hirable about layout */}
  <TestimonialSection /> {/* If present in Hirable */}
  <ContactSection /> {/* Hirable contact styling */}
  <Footer /> {/* Hirable footer design */}
</Layout>
```

### **Step 3: Content Adaptation**
```javascript
// Keep existing content structure but apply Hirable styling:
- Hero: "Streamline Your HR, Amplify Your Success" with Hirable hero design
- Services: Current 9 HR services with Hirable card styling
- About: Prachi's information with Hirable about section layout
- Contact: Existing forms with Hirable form styling
- All CTAs: Style buttons to match Hirable's design
```

---

## 🚀 INTEGRATION WITH PHASE 1 FEATURES

### **Enhanced Components with Hirable Design**
```jsx
// Apply Hirable styling to new features:
1. HR Assessment Quiz: Use Hirable's form and progress bar styling
2. Client Portal Login: Style authentication forms like Hirable
3. Payment Integration: Apply Hirable's button and card styling
4. Resource Downloads: Use Hirable's document/resource card design
5. Lead Capture Forms: Match Hirable's form styling and layout
```

### **Hirable-Inspired New Sections**
```javascript
// Add sections that complement Hirable's design:
- "Why Choose Our HR Services" (using Hirable's feature grid)
- "Client Success Stories" (using Hirable's testimonial layout)
- "HR Resources Library" (using Hirable's resource card design)
- "Free Consultation Booking" (using Hirable's contact section style)
```

---

## 📱 RESPONSIVE ADAPTATION

### **Mobile-First Approach**
```css
/* Ensure Hirable's responsive behavior is maintained */
- Navigation: Mobile hamburger menu styled like Hirable
- Hero: Stack elements vertically on mobile like Hirable
- Service Cards: Single column layout on mobile
- Forms: Full-width styling on smaller screens
- Typography: Maintain Hirable's responsive font scaling
```

---

## 🎯 SPECIFIC IMPLEMENTATION TASKS

### **Immediate Actions**
1. **Extract Hirable's CSS**: Copy color variables, fonts, and spacing
2. **Recreate Hero Section**: Use Hirable's hero layout with Prachi's content
3. **Style Service Cards**: Apply Hirable's card design to current services
4. **Update Navigation**: Match Hirable's header and menu styling
5. **Form Styling**: Apply Hirable's form design to contact and lead forms

### **Content Customization**
```javascript
// Adapt Hirable elements for HR services:
- Job posting sections → HR service offerings
- Candidate profiles → Client testimonials
- Recruitment process → HR service delivery process
- Company listings → Service packages/pricing
- Application forms → HR consultation requests
```

### **Color Scheme Adjustment**
```css
/* Modify Hirable colors for Prachi's brand */
:root {
  --primary: #4F46E5; /* Professional blue from Hirable */
  --secondary: #7C3AED; /* Purple accent from Hirable */
  --accent: #06B6D4; /* Cyan highlight from Hirable */
  --success: #10B981; /* Green for success states */
  --warning: #F59E0B; /* Amber for warnings */
  --neutral: #64748B; /* Gray for text */
}
```

---

## ⚙️ TECHNICAL REQUIREMENTS

### **Framework Compatibility**
```javascript
// Ensure Hirable integration works with current stack:
- Convert HTML to React components
- Maintain Tailwind CSS classes where possible
- Add custom CSS for Hirable-specific styling
- Keep all animations and interactions functional
- Preserve current routing and state management
```

### **Performance Optimization**
```javascript
// Optimize Hirable assets for Hostinger:
- Compress Hirable images and optimize formats
- Inline critical CSS for above-fold content
- Lazy load non-critical Hirable components
- Minimize bundle size while adding Hirable styling
```

---

## 📋 TESTING CHECKLIST

### **Visual Consistency**
- [ ] Header matches Hirable navigation design
- [ ] Hero section uses Hirable layout and styling
- [ ] Service cards replicate Hirable card design
- [ ] Forms styled to match Hirable form components
- [ ] Footer follows Hirable footer structure
- [ ] Color scheme consistent throughout
- [ ] Typography matches Hirable font choices

### **Functionality Preservation**
- [ ] All existing features work with new styling
- [ ] Contact forms submit successfully
- [ ] Navigation links work correctly
- [ ] Mobile responsiveness maintained
- [ ] Load times remain optimal
- [ ] All animations and interactions functional

---

## 🎨 FINAL DELIVERABLE

**Expected Outcome**: A professionally designed website that combines:
- Hirable's sophisticated HR-focused visual design
- Prachi's existing content and business focus
- Phase 1 business features (quiz, portal, payments)
- Optimized performance for Hostinger hosting
- Mobile-responsive and modern user experience

**Timeline**: Complete design integration within 2-3 days while maintaining all current functionality and adding the high-priority business features from Phase 1.

---

## 🚀 CURSOR EXECUTION COMMAND

**Copy this exact instruction to Cursor:**

> "Use the downloaded Hirable HTML template as design reference. Extract the color scheme, typography, layout patterns, and component styling from Hirable. Recreate the visual design in our React components while keeping all existing functionality. Focus on: 1) Hero section with Hirable's layout, 2) Service cards with Hirable styling, 3) Navigation matching Hirable design, 4) Forms styled like Hirable, 5) Overall color scheme and typography from Hirable. Maintain current content but apply Hirable's professional HR template aesthetics. Ensure mobile responsiveness and Hostinger compatibility."