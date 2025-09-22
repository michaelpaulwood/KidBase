'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container, Section, Heading, Card, CoreButton, Badge } from '../../../components/ui/design-system';
import Loading from '../../../components/ui/loading';
import Logo from '../../../components/ui/logo';
import { useAuth } from '../../../hooks/useAuth';

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  // Redirect to onboarding if not completed
  useEffect(() => {
    if (!loading && user && !user.onboardingComplete) {
      router.push('/onboarding');
    }
  }, [user, loading, router]);

  // Phase 2: Redirect to family member selection if no user selected
  // Bypass with ?direct=true for testing current dashboard
  useEffect(() => {
    const isDirect = searchParams.get('direct') === 'true';
    const hasSelectedUser = sessionStorage.getItem('selectedFamilyMember');

    if (!loading && user && user.onboardingComplete && !hasSelectedUser && !isDirect) {
      router.push('/family-select');
    }
  }, [user, loading, router, searchParams]);

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      try {
        // Clear selected family member on logout
        sessionStorage.removeItem('selectedFamilyMember');
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

  // Don't render anything if onboarding is not complete (will redirect)
  if (!user.onboardingComplete) {
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
              Hi, {user.displayName || 'Family'} family! 👋
            </Heading>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your account to get in.
            </p>
          </div>

          {/* Profile Section */}
          <div className="max-w-2xl mx-auto mb-16">
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

          </div>

        </Container>
      </Section>
    </main>
  );
}