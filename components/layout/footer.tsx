'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center text-sm text-gray-600">
          <p>
            © {currentYear} KidBase 📱 • Built with ❤️ by{' '}
            <Link
              href="https://github.com/michaelpaulwood"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              Michael Paul Wood
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}