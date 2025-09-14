'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CoreButton } from '../ui/design-system';

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MobileNav({ isOpen, onToggle }: MobileNavProps) {
  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={onToggle}
        className="md:hidden relative w-6 h-6 focus:outline-none"
        aria-label="Toggle navigation"
      >
        <span className="sr-only">Open main menu</span>
        <div className="block w-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span
            className={`block absolute h-0.5 w-6 bg-gray-900 transform transition duration-300 ease-in-out ${
              isOpen ? 'rotate-45' : '-translate-y-2'
            }`}
          ></span>
          <span
            className={`block absolute h-0.5 w-6 bg-gray-900 transform transition duration-300 ease-in-out ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          ></span>
          <span
            className={`block absolute h-0.5 w-6 bg-gray-900 transform transition duration-300 ease-in-out ${
              isOpen ? '-rotate-45' : 'translate-y-2'
            }`}
          ></span>
        </div>
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          style={{ zIndex: 9998 }}
          onClick={onToggle}
        ></div>
      )}

      {/* Mobile menu - AESTHETIC ROUNDED DESIGN */}
      <div 
        className={`fixed top-6 right-4 w-80 md:hidden transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'
        }`}
        style={{
          backgroundColor: '#ffffff',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
          borderRadius: '1.5rem',
          zIndex: 9999
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-6 border-b border-gray-100"
          style={{ 
            backgroundColor: '#ffffff',
            borderRadius: '1.5rem 1.5rem 0 0'
          }}
        >
          <Link href="/" className="text-2xl font-bold text-gray-900" onClick={onToggle}>
            KidBase
          </Link>
          <button
            onClick={onToggle}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Navigation - Only as tall as content */}
        <div 
          className="p-6"
          style={{ 
            backgroundColor: '#ffffff',
            borderRadius: '0 0 1.5rem 1.5rem'
          }}
        >
          <div className="space-y-6">
            <Link 
              href="#benefits" 
              className="block text-lg font-medium text-gray-700 hover:text-orange-600 transition-colors"
              onClick={onToggle}
            >
              Benefits
            </Link>
            <Link 
              href="#how-it-works" 
              className="block text-lg font-medium text-gray-700 hover:text-orange-600 transition-colors"
              onClick={onToggle}
            >
              How it Works
            </Link>
            <Link 
              href="#faq" 
              className="block text-lg font-medium text-gray-700 hover:text-orange-600 transition-colors"
              onClick={onToggle}
            >
              FAQ
            </Link>
            <div className="pt-6 border-t border-gray-200">
              <Link href="/auth" onClick={onToggle}>
                <CoreButton variant="primary" size="lg" className="w-full">
                  Get Started
                </CoreButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}