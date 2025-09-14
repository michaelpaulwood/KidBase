// Utility functions for KidBase

import { type ClassValue, clsx } from 'clsx';

// Class name utility function - combines and deduplicates classes
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Format date utility
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric', 
    year: 'numeric'
  }).format(date);
}

// Capitalize utility
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Truncate text utility
export function truncate(str: string, maxLength: number): string {
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
}