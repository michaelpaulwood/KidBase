'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Section, Heading, Card, CoreButton } from '../../../components/ui/design-system';
import Loading from '../../../components/ui/loading';
import Logo from '../../../components/ui/logo';
import { useAuth } from '../../../hooks/useAuth';

export default function KidDashboard() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

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

  // Check if a kid is selected
  useEffect(() => {
    if (!loading && user && user.onboardingComplete) {
      const selectedMember = sessionStorage.getItem('selectedFamilyMember');
      if (!selectedMember) {
        router.push('/family-select');
        return;
      }

      try {
        const memberInfo = JSON.parse(selectedMember);
        if (memberInfo.type !== 'kid') {
          // If parent is selected, redirect to parent dashboard
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error parsing selected member:', error);
        router.push('/family-select');
      }
    }
  }, [user, loading, router]);

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

  const handleSwitchUser = () => {
    // Clear selected family member and go back to family select
    sessionStorage.removeItem('selectedFamilyMember');
    router.push('/family-select');
  };

  // Show loading while checking auth state
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Loading your kid dashboard..." />
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

  // Get selected kid info
  const selectedMemberJson = sessionStorage.getItem('selectedFamilyMember');
  const selectedMember = selectedMemberJson ? JSON.parse(selectedMemberJson) : null;
  const kidName = selectedMember?.name || 'Kid';

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-cyan-50 to-green-50">
      {/* Kid-Friendly Navigation Header */}
      <nav className="bg-white/95 backdrop-blur-sm border-b-4 border-primary-200 sticky top-0 z-40">
        <Container>
          <div className="flex justify-between items-center py-4">
            <Logo size="sm" />
            <div className="flex items-center space-x-3 sm:space-x-4">
              <CoreButton variant="outline" onClick={handleSwitchUser} className="text-xs sm:text-sm">
                Switch User
              </CoreButton>
              <CoreButton variant="outline" onClick={handleLogout} className="text-xs sm:text-sm">
                Logout
              </CoreButton>
            </div>
          </div>
        </Container>
      </nav>

      <Section background="default" padding="lg">
        <Container>
          {/* Kid-Friendly Welcome Header */}
          <div className="text-center mb-12">
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-500 rounded-full flex items-center justify-center text-6xl mb-6 mx-auto shadow-brutal-lg">
              🎉
            </div>
            <Heading level={1} size="display" className="mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">
              Hey {kidName}! 🌟
            </Heading>
            <p className="text-2xl text-gray-700 max-w-2xl mx-auto font-bold">
              Welcome to your awesome dashboard!
            </p>
          </div>

          {/* Kid Activity Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Games & Fun */}
            <Card className="text-center bg-gradient-to-br from-pink-100 to-pink-200" hover={false}>
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-core flex items-center justify-center text-4xl mb-6 mx-auto">
                🎮
              </div>
              <Heading level={3} size="title" className="mb-3">
                Games & Fun
              </Heading>
              <p className="text-gray-700 mb-6">
                Play educational games and have fun learning!
              </p>
              <CoreButton variant="primary" className="w-full">
                Let&apos;s Play!
              </CoreButton>
            </Card>

            {/* Learning Zone */}
            <Card className="text-center bg-gradient-to-br from-cyan-100 to-cyan-200" hover={false}>
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-core flex items-center justify-center text-4xl mb-6 mx-auto">
                📚
              </div>
              <Heading level={3} size="title" className="mb-3">
                Learning Zone
              </Heading>
              <p className="text-gray-700 mb-6">
                Discover new things and expand your knowledge!
              </p>
              <CoreButton variant="primary" className="w-full">
                Start Learning
              </CoreButton>
            </Card>

            {/* Creative Corner */}
            <Card className="text-center bg-gradient-to-br from-green-100 to-green-200" hover={false}>
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-core flex items-center justify-center text-4xl mb-6 mx-auto">
                🎨
              </div>
              <Heading level={3} size="title" className="mb-3">
                Creative Corner
              </Heading>
              <p className="text-gray-700 mb-6">
                Draw, create, and express your imagination!
              </p>
              <CoreButton variant="primary" className="w-full">
                Create Art
              </CoreButton>
            </Card>

            {/* Achievement Badges */}
            <Card className="text-center bg-gradient-to-br from-yellow-100 to-yellow-200" hover={false}>
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-core flex items-center justify-center text-4xl mb-6 mx-auto">
                🏆
              </div>
              <Heading level={3} size="title" className="mb-3">
                My Achievements
              </Heading>
              <p className="text-gray-700 mb-6">
                Check out all your awesome achievements!
              </p>
              <CoreButton variant="primary" className="w-full">
                View Badges
              </CoreButton>
            </Card>

            {/* Stories & Books */}
            <Card className="text-center bg-gradient-to-br from-purple-100 to-purple-200" hover={false}>
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-core flex items-center justify-center text-4xl mb-6 mx-auto">
                📖
              </div>
              <Heading level={3} size="title" className="mb-3">
                Story Time
              </Heading>
              <p className="text-gray-700 mb-6">
                Read amazing stories and fairy tales!
              </p>
              <CoreButton variant="primary" className="w-full">
                Read Stories
              </CoreButton>
            </Card>

            {/* Settings */}
            <Card className="text-center bg-gradient-to-br from-orange-100 to-orange-200" hover={false}>
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-core flex items-center justify-center text-4xl mb-6 mx-auto">
                ⚙️
              </div>
              <Heading level={3} size="title" className="mb-3">
                My Settings
              </Heading>
              <p className="text-gray-700 mb-6">
                Customize your dashboard just the way you like!
              </p>
              <CoreButton variant="primary" className="w-full">
                Settings
              </CoreButton>
            </Card>
          </div>

          {/* Fun Daily Message */}
          <Card className="text-center bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 border-4 border-purple-200" hover={false}>
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                💫
              </div>
              <Heading level={3} size="heading" className="mb-4 text-purple-700">
                Today&apos;s Super Message!
              </Heading>
              <p className="text-lg text-purple-600 font-medium mb-6">
                &quot;Every day is a new adventure waiting to be discovered. You&apos;re amazing, {kidName}!&quot;
              </p>
              <div className="flex justify-center space-x-2">
                <span className="text-2xl">🌟</span>
                <span className="text-2xl">🦄</span>
                <span className="text-2xl">🌈</span>
                <span className="text-2xl">⭐</span>
                <span className="text-2xl">🎈</span>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </main>
  );
}