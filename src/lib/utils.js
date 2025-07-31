import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

// Utility to fetch static JSON data from public folder
export async function fetchStaticData(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error('Failed to load data: ' + path);
  return response.json();
}