import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

// SEO Configuration for 2025
const SEO_CONFIG = {
  // Default meta tags
  default: {
    title: 'Hire With Prachi - Leading Virtual HR Consultant in India',
    description: 'Expert virtual HR services for startups and SMEs across India. HR compliance, recruitment, employee engagement, payroll management, and performance management.',
    keywords: 'HR consultant, virtual HR services, HR compliance, recruitment, employee engagement, payroll management, performance management, India',
    author: 'Prachi Shrivastava',
    siteName: 'Hire With Prachi',
    url: 'https://hirewithprachi.com',
    image: 'https://hirewithprachi.com/assets/images/og-image.jpg',
    twitterHandle: '@hirewithprachi',
    facebookAppId: '123456789012345'
  },
  
  // Social media image dimensions (2025 standards)
  socialImages: {
    facebook: {
      width: 1200,
      height: 630
    },
    twitter: {
      width: 1200,
      height: 600
    }
  }
};

// Generate schema markup for different page types
const generateSchemaMarkup = (pageType, pageData = {}) => {
  const baseUrl = SEO_CONFIG.default.url;
  
  switch (pageType) {
    case 'homepage':
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Hire With Prachi",
        "url": baseUrl,
        "description": SEO_CONFIG.default.description,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      };
      
    case 'organization':
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Hire With Prachi",
        "url": baseUrl,
        "logo": `${baseUrl}/assets/images/hirewithprachi_navbar_logo.png`,
        "description": SEO_CONFIG.default.description,
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN",
          "addressRegion": "India"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "info@hirewithprachi.com",
          "availableLanguage": "English"
        },
        "sameAs": [
          "https://www.linkedin.com/company/hirewithprachi",
          "https://twitter.com/hirewithprachi",
          "https://www.facebook.com/hirewithprachi"
        ]
      };
      
    case 'person':
      return {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Prachi Shrivastava",
        "jobTitle": "Virtual HR Consultant",
        "worksFor": {
          "@type": "Organization",
          "name": "Hire With Prachi"
        },
        "description": "Leading virtual HR consultant and POSH expert in India",
        "url": `${baseUrl}/prachi-shrivastava`,
        "image": `${baseUrl}/assets/images/about-img-1.jpg`,
        "sameAs": [
          "https://www.linkedin.com/in/prachishrivastava",
          "https://twitter.com/prachishrivastava"
        ]
      };
      
    case 'service':
      return {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": pageData.title || "HR Services",
        "description": pageData.description || SEO_CONFIG.default.description,
        "provider": {
          "@type": "Organization",
          "name": "Hire With Prachi"
        },
        "areaServed": {
          "@type": "Country",
          "name": "India"
        },
        "serviceType": "HR Consulting",
        "url": `${baseUrl}${pageData.path || ''}`
      };
      
    case 'localBusiness':
      return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `Hire With Prachi - ${pageData.city || 'HR Services'}`,
        "description": pageData.description || `Expert HR services in ${pageData.city || 'India'}`,
        "url": `${baseUrl}${pageData.path || ''}`,
        "telephone": "+91-8740889927",
        "email": "info@hirewithprachi.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": pageData.city || "India",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": pageData.latitude || "",
          "longitude": pageData.longitude || ""
        },
        "openingHours": "Mo-Fr 09:00-18:00",
        "priceRange": "₹₹",
        "serviceArea": {
          "@type": "City",
          "name": pageData.city || "India"
        }
      };
      
    case 'article':
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": pageData.title || "HR Blog Post",
        "description": pageData.description || "Expert HR insights and best practices",
        "image": pageData.image || `${baseUrl}/assets/images/blog-default.jpg`,
        "author": {
          "@type": "Person",
          "name": "Prachi Shrivastava"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Hire With Prachi",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/assets/images/hirewithprachi_navbar_logo.png`
          }
        },
        "datePublished": pageData.publishedDate || new Date().toISOString(),
        "dateModified": pageData.modifiedDate || new Date().toISOString(),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${baseUrl}${pageData.path || ''}`
        }
      };
      
    case 'breadcrumb':
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": pageData.breadcrumbs || [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": baseUrl
          }
        ]
      };
      
    case 'faq':
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": pageData.faqs || []
      };
      
    default:
      return null;
  }
};

// Generate breadcrumb schema
const generateBreadcrumbSchema = (pathname) => {
  const baseUrl = SEO_CONFIG.default.url;
  const pathSegments = pathname.split('/').filter(segment => segment);
  
  const breadcrumbs = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": baseUrl
    }
  ];
  
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const name = segment.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    breadcrumbs.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": name,
      "item": `${baseUrl}${currentPath}`
    });
  });
  
  return generateSchemaMarkup('breadcrumb', { breadcrumbs });
};

// SEO Optimizer Component
const SEOOptimizer = ({ 
  title, 
  description, 
  keywords, 
  image, 
  pageType = 'page',
  pageData = {},
  noIndex = false,
  canonical = null
}) => {
  const location = useLocation();
  const currentUrl = `${SEO_CONFIG.default.url}${location.pathname}`;
  
  // Generate page-specific data
  const pageTitle = title || SEO_CONFIG.default.title;
  const pageDescription = description || SEO_CONFIG.default.description;
  const pageKeywords = keywords || SEO_CONFIG.default.keywords;
  const pageImage = image || SEO_CONFIG.default.image;
  
  // Generate schema markup
  const schemaMarkup = generateSchemaMarkup(pageType, {
    ...pageData,
    path: location.pathname,
    title: pageTitle,
    description: pageDescription
  });
  
  const breadcrumbSchema = generateBreadcrumbSchema(location.pathname);
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content={SEO_CONFIG.default.author} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      {!canonical && <link rel="canonical" href={currentUrl} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content={SEO_CONFIG.socialImages.facebook.width} />
      <meta property="og:image:height" content={SEO_CONFIG.socialImages.facebook.height} />
      <meta property="og:site_name" content={SEO_CONFIG.default.siteName} />
      <meta property="og:locale" content="en_US" />
      <meta property="fb:app_id" content={SEO_CONFIG.default.facebookAppId} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SEO_CONFIG.default.twitterHandle} />
      <meta name="twitter:creator" content={SEO_CONFIG.default.twitterHandle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:image:width" content={SEO_CONFIG.socialImages.twitter.width} />
      <meta name="twitter:image:height" content={SEO_CONFIG.socialImages.twitter.height} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      
      {/* Schema Markup */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
      
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      
      {/* Organization Schema (always include) */}
      <script type="application/ld+json">
        {JSON.stringify(generateSchemaMarkup('organization'))}
      </script>
    </Helmet>
  );
};

export default SEOOptimizer;
