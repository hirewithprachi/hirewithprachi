import React from 'react';

export default function Breadcrumbs({ items }) {
  return (
    <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex">
        {items.map((item, idx) => (
          <li key={(item.href || 'last') + '-' + idx} className="flex items-center">
            {idx > 0 && <span className="mx-2">/</span>}
            {item.href ? (
              <a href={item.href} className="text-indigo-600 hover:underline">{item.label}</a>
            ) : (
              <span className="text-gray-700 font-semibold">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
} 