'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Section, Heading, Card, CoreButton } from '../../../components/ui/design-system';
import Loading from '../../../components/ui/loading';
import Logo from '../../../components/ui/logo';
import KidEditNameModal from '../../../components/ui/kid-edit-name-modal';
import EmojiPickerModal from '../../../components/ui/emoji-picker-modal';
import KidChangePinModal from '../../../components/ui/kid-change-pin-modal';
import { useAuth } from '../../../hooks/useAuth';

export default function KidDashboard() {
  const { user, loading, signOut, refreshUser } = useAuth();
  const router = useRouter();
  const [activeSubModal, setActiveSubModal] = useState<'name' | 'emoji' | 'pin' | null>(null);

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

  // Get kidKey from sessionStorage (stored in kidData.key)
  const kidKey = selectedMember?.kidData?.key || 'kid1';

  // Use fresh family data for kid name (falls back to sessionStorage if needed)
  const kidName = user?.kids?.[kidKey]?.name || selectedMember?.name || 'Kid';

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

          {/* Main Dashboard Cards - 3 Section Layout */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-12">
            {/* General Information Card */}
            <Card className="text-center bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 border-4 border-purple-200" hover={false}>
              <Heading level={3} size="title" className="mb-6 text-purple-700">
                Your awesome stats:
              </Heading>

              {/* Quick Stats */}
              <div className="mb-6 space-y-2">
                <div className="text-sm text-gray-700 space-y-1">
                  <div>📅 5 days on KidBase</div>
                  <div>🎉 3 activities completed</div>
                  <div>🏆 2 achievements earned</div>
                </div>
              </div>

              {/* Quick Activity Buttons */}
              <div className="mb-6">
                <p className="text-sm text-purple-600 font-medium mb-3">Quick Activities:</p>
                <div className="flex justify-center space-x-2">
                  <CoreButton variant="outline" className="text-xs px-3 py-1">
                    🎮 Play
                  </CoreButton>
                  <CoreButton variant="outline" className="text-xs px-3 py-1">
                    📚 Learn
                  </CoreButton>
                  <CoreButton variant="outline" className="text-xs px-3 py-1">
                    🎨 Create
                  </CoreButton>
                </div>
              </div>

              <CoreButton variant="primary" className="w-full">
                Explore Activities →
              </CoreButton>
            </Card>

            {/* Enhanced Today's Super Message Card */}
            <Card className="text-center bg-gradient-to-br from-purple-100 via-pink-100 to-cyan-100 border-4 border-purple-200" hover={false}>
              <Heading level={3} size="title" className="mb-6 text-purple-700">
                Today&apos;s Super Message!
              </Heading>

              <p className="text-sm text-purple-600 font-medium mb-6 leading-relaxed">
                &quot;Every day is a new adventure waiting to be discovered. You&apos;re amazing, {kidName}!&quot;
              </p>

              {/* Mood Selector */}
              <div className="mb-6">
                <p className="text-sm text-purple-600 font-medium mb-3">How are you feeling today?</p>
                <div className="flex justify-center space-x-3">
                  <button className="text-2xl hover:scale-110 transition-transform" title="Great!">😊</button>
                  <button className="text-2xl hover:scale-110 transition-transform" title="Sleepy">😴</button>
                  <button className="text-2xl hover:scale-110 transition-transform" title="Curious">🤔</button>
                  <button className="text-2xl hover:scale-110 transition-transform" title="Excited">🤩</button>
                </div>
              </div>

              <div className="flex justify-center space-x-2 mb-4">
                <span className="text-2xl">🌟</span>
                <span className="text-2xl">🦄</span>
                <span className="text-2xl">🌈</span>
                <span className="text-2xl">⭐</span>
                <span className="text-2xl">🎈</span>
              </div>
            </Card>

            {/* My Settings Section */}
            <Card className="text-center bg-gradient-to-br from-orange-100 to-orange-200 border-4 border-orange-200" hover={false}>
              <Heading level={3} size="title" className="mb-6 text-orange-700">
                My Settings
              </Heading>

              {/* Settings Options */}
              <div className="space-y-3">
                {/* Change Name Option */}
                <button
                  onClick={() => setActiveSubModal('name')}
                  className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xl shadow-brutal-sm">
                    📝
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-bold text-blue-700 text-sm">Change My Name</div>
                    <div className="text-blue-600 text-xs">Update what people call you</div>
                  </div>
                </button>

                {/* Change Emoji Option */}
                <button
                  onClick={() => setActiveSubModal('emoji')}
                  className="w-full flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full flex items-center justify-center text-xl shadow-brutal-sm">
                    🎭
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-bold text-green-700 text-sm">Change My Emoji</div>
                    <div className="text-green-600 text-xs">Pick a fun avatar</div>
                  </div>
                </button>

                {/* Change PIN Option */}
                <button
                  onClick={() => setActiveSubModal('pin')}
                  className="w-full flex items-center space-x-3 p-3 bg-red-50 hover:bg-red-100 border-2 border-red-200 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-xl shadow-brutal-sm">
                    🔐
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-bold text-red-700 text-sm">Change My PIN</div>
                    <div className="text-red-600 text-xs">Update your secret code</div>
                  </div>
                </button>
              </div>
            </Card>
          </div>

        </Container>
      </Section>

      {/* Kid Settings Modals */}
      {user && (
        <>
          <KidEditNameModal
            isOpen={activeSubModal === 'name'}
            onClose={() => setActiveSubModal(null)}
            onSuccess={() => {
              refreshUser();
              setActiveSubModal(null);
            }}
            userId={user.uid}
            kidKey={kidKey}
            currentName={kidName}
          />

          <EmojiPickerModal
            isOpen={activeSubModal === 'emoji'}
            onClose={() => setActiveSubModal(null)}
            onSuccess={() => {
              refreshUser();
              setActiveSubModal(null);
            }}
            userId={user.uid}
            kidKey={kidKey}
            currentEmoji="😊"
          />

          <KidChangePinModal
            isOpen={activeSubModal === 'pin'}
            onClose={() => setActiveSubModal(null)}
            onSuccess={() => {
              refreshUser();
              setActiveSubModal(null);
            }}
            userId={user.uid}
            kidKey={kidKey}
            kidName={kidName}
          />
        </>
      )}
    </main>
  );
}