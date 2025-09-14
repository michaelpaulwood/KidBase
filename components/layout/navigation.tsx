'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '../ui/button';

interface NavigationProps {
  user?: {
    name: string;
    email: string;
  } | null;
  onLogout?: () => void;
}

export default function Navigation({ user, onLogout }: NavigationProps) {
  const pathname = usePathname();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior
      if (confirm('Are you sure you want to logout?')) {
        window.location.href = '/';
      }
    }
  };

  const isAuthPage = pathname === '/auth';
  const isDashboard = pathname === '/dashboard';

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              KidBase
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {user ? (
              // Authenticated user menu
              <>
                <div className="hidden sm:flex items-center space-x-4">
                  <Link
                    href="/dashboard"
                    className={`text-sm font-medium transition-colors ${
                      isDashboard 
                        ? 'text-blue-600' 
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <span className="text-sm text-gray-500">
                    Welcome, {user.name}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="hidden sm:inline-flex"
                >
                  Logout
                </Button>
                
                {/* Mobile menu for authenticated users */}
                <div className="sm:hidden">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              // Guest user menu
              <>
                {!isAuthPage && (
                  <>
                    <div className="hidden sm:flex items-center space-x-4">
                      <Link
                        href="/auth"
                        className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        Sign In
                      </Link>
                    </div>
                    <Link href="/auth">
                      <Button size="sm">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
                
                {isAuthPage && (
                  <Link
                    href="/"
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Back to Home
                  </Link>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile navigation menu for authenticated users */}
        {user && (
          <div className="sm:hidden border-t border-gray-200 pt-4 pb-3">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user.name}</div>
                <div className="text-sm font-medium text-gray-500">{user.email}</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                href="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}