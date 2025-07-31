import React from 'react';

const requiredImages = [
  {
    key: 'logo',
    label: 'Site Logo',
    placeholder: 'https://demo.awaikenthemes.com/hirable/wp-content/uploads/2025/03/favicon.png',
    path: '/assets/images/logo.png',
  },
  {
    key: 'hero',
    label: 'Hero Section Image',
    placeholder: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    path: '/assets/images/hero.jpg',
  },
  {
    key: 'about',
    label: 'About Section Photo',
    placeholder: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1',
    path: '/assets/images/about.jpg',
  },
  {
    key: 'service1',
    label: 'Service Card 1',
    placeholder: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7',
    path: '/assets/images/service1.jpg',
  },
  {
    key: 'service2',
    label: 'Service Card 2',
    placeholder: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    path: '/assets/images/service2.jpg',
  },
  {
    key: 'testimonial',
    label: 'Testimonial/Client Photo',
    placeholder: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167',
    path: '/assets/images/testimonial.jpg',
  },
  {
    key: 'resource',
    label: 'Resource Card Image',
    placeholder: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    path: '/assets/images/resource.jpg',
  },
  {
    key: 'cta',
    label: 'Call To Action Section',
    placeholder: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1',
    path: '/assets/images/cta.jpg',
  },
  // Add more as needed
];

export default function AdminImages() {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Image Manager</h1>
      <p className="mb-8 text-gray-600">Upload or replace images used throughout the site. Click an image to upload a new one. Use the placeholders as a reference for recommended dimensions and style. Changes will reflect after you refresh the site.</p>
      <div className="grid grid-cols-1 gap-8">
        {requiredImages.map(img => (
          <div key={img.key} className="flex items-center gap-6 p-4 bg-white rounded-xl shadow">
            <img
              src={img.placeholder}
              alt={img.label}
              className="w-24 h-24 object-cover rounded-lg border"
              style={{ background: '#f3f4f6' }}
            />
            <div className="flex-1">
              <div className="font-semibold mb-1">{img.label}</div>
              <div className="text-xs text-gray-500 mb-2">Path: <code>{img.path}</code></div>
              <input type="file" accept="image/*" className="block" disabled title="Image upload coming soon. Please replace manually in /public/assets/images/ for now." />
              <div className="text-xs text-yellow-600 mt-1">Upload coming soon. For now, replace manually in <code>public/assets/images/</code> with the correct filename.</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 