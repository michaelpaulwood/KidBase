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

// PIN hashing utility using Web Crypto API
export async function hashPin(pin: string): Promise<string> {
  if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
    throw new Error('PIN must be exactly 4 digits');
  }

  // Convert string to bytes
  const encoder = new TextEncoder();
  const data = encoder.encode(pin);

  // Hash the PIN using SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  // Convert hash to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
}

// Verify PIN against hash
export async function verifyPin(pin: string, hash: string): Promise<boolean> {
  try {
    const hashedInput = await hashPin(pin);
    return hashedInput === hash;
  } catch {
    return false;
  }
}

// Generate UUID for kid accounts
export function generateKidUUID(): string {
  return crypto.randomUUID();
}