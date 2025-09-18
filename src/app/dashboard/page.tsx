'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container, Section, Heading, Card, CoreButton, Badge } from '../../../components/ui/design-system';
import Loading from '../../../components/ui/loading';
import Logo from '../../../components/ui/logo';
import { useAuth } from '../../../hooks/useAuth';

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      try {
        await signOut();
        router.push('/');
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
  };

  const handleEditProfile = () => {
    alert('Edit profile functionality will be implemented with Firebase');
  };

  // Show loading while checking auth state
  if (loading) {
    return (
      <main className="min-h-screen  flex items-center justify-center">
        <Loading size="lg" text="Loading your dashboard..." />
      </main>
    );
  }

  // Don't render anything if user is not authenticated (will redirect)
  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen ">
      {/* Navigation Header */}
      <nav className="bg-white/90 backdrop-blur-sm border-b border-primary-100 sticky top-0 z-40">
        <Container>
          <div className="flex justify-between items-center py-6">
            <Logo size="xs" href="/" />
            <div className="flex items-center space-x-6">
              <CoreButton variant="outline" onClick={handleLogout}>
                Logout
              </CoreButton>
            </div>
          </div>
        </Container>
      </nav>

      <Section background="default" padding="lg">
        <Container>
          {/* Welcome Header */}
          <div className="text-center mb-16">
            <Heading level={1} size="display" className="mb-4">
              Welcome back, {user.displayName?.split(' ')[0] || 'Developer'}! 👋
            </Heading>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your KidBase dashboard is ready. Here&apos;s everything you need to manage your projects and account.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-warm-500 rounded-core flex items-center justify-center text-2xl mb-4 mx-auto">
                🚀
              </div>
              <Heading level={3} size="title" className="mb-2">Active Projects</Heading>
              <div className="text-3xl font-bold text-primary-600 mb-2">3</div>
              <p className="text-gray-600">Projects in development</p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-core flex items-center justify-center text-2xl mb-4 mx-auto">
                ✅
              </div>
              <Heading level={3} size="title" className="mb-2">Tasks Completed</Heading>
              <div className="text-3xl font-bold text-secondary-600 mb-2">24</div>
              <p className="text-gray-600">This month</p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-core flex items-center justify-center text-2xl mb-4 mx-auto">
                📊
              </div>
              <Heading level={3} size="title" className="mb-2">Success Rate</Heading>
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <p className="text-gray-600">Deployment success</p>
            </Card>
          </div>

          {/* Profile & Quick Actions Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Profile Section */}
            <Card>
              <Heading level={3} size="title" className="mb-6">Profile Information</Heading>
              
              <div className="flex items-start space-x-6 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-warm-500 rounded-core flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="flex-1">
                  <Heading level={4} size="title" className="mb-1">{user.displayName || 'User'}</Heading>
                  <p className="text-gray-600 mb-3">{user.email}</p>
                  <Badge variant="success">Active Account</Badge>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                  <p className="text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Login</label>
                  <p className="text-gray-900">
                    {new Date(user.lastLoginAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <CoreButton variant="outline" onClick={handleEditProfile} className="w-full sm:w-auto">
                Edit Profile
              </CoreButton>
            </Card>

            {/* Quick Actions */}
            <Card>
              <Heading level={3} size="title" className="mb-6">Quick Actions</Heading>
              
              <div className="grid grid-cols-2 gap-4">
                <CoreButton 
                  variant="outline" 
                  className="h-24 flex-col justify-center space-y-2"
                  onClick={() => alert('Feature coming soon!')}
                >
                  <div className="text-2xl">🆕</div>
                  <span>New Project</span>
                </CoreButton>
                
                <CoreButton 
                  variant="outline" 
                  className="h-24 flex-col justify-center space-y-2"
                  onClick={() => alert('Feature coming soon!')}
                >
                  <div className="text-2xl">📈</div>
                  <span>Analytics</span>
                </CoreButton>
                
                <CoreButton 
                  variant="outline" 
                  className="h-24 flex-col justify-center space-y-2"
                  onClick={() => alert('Feature coming soon!')}
                >
                  <div className="text-2xl">⚙️</div>
                  <span>Settings</span>
                </CoreButton>
                
                <CoreButton 
                  variant="outline" 
                  className="h-24 flex-col justify-center space-y-2"
                  onClick={() => alert('Help documentation coming soon!')}
                >
                  <div className="text-2xl">❓</div>
                  <span>Help</span>
                </CoreButton>
              </div>
            </Card>
          </div>

          {/* Getting Started Section */}
          <Card className="text-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-warm-400 to-primary-500 rounded-core flex items-center justify-center text-3xl mb-6 mx-auto">
                🎯
              </div>
              <Heading level={3} size="heading" className="mb-4">Ready to build something amazing?</Heading>
              <p className="text-lg text-gray-600 mb-8">
                Your KidBase setup is complete. Start creating your next project with our powerful tools and integrations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CoreButton 
                  variant="primary" 
                  size="lg"
                  onClick={() => alert('Project creation coming soon!')}
                >
                  Create New Project →
                </CoreButton>
                <Link href="/">
                  <CoreButton variant="outline" size="lg">
                    View Documentation
                  </CoreButton>
                </Link>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </main>
  );
}