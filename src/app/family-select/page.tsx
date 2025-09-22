'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Section, Heading, Card, CoreButton } from '../../../components/ui/design-system';
import Loading from '../../../components/ui/loading';
import Logo from '../../../components/ui/logo';
import { useAuth } from '../../../hooks/useAuth';

export default function FamilySelect() {
  const { user, loading } = useAuth();
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

  // Show loading while checking auth state
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Loading family accounts..." />
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

  // Mock data for visual demonstration (will be replaced with real family data later)
  const mockKids = [
    { name: 'Emma', emoji: '👧', color: 'from-pink-500 to-pink-600' },
    { name: 'Liam', emoji: '👦', color: 'from-cyan-500 to-cyan-600' }
  ];

  const handleKidSelect = (kidName: string) => {
    // Placeholder - will add PIN verification later
    alert(`Selected ${kidName}'s account (PIN verification coming soon)`);
  };

  const handleParentSelect = () => {
    // Placeholder - will add PIN verification later
    alert('Selected Parent account (PIN verification coming soon)');
  };

  return (
    <main className="min-h-screen">
      {/* Navigation Header */}
      <nav className="bg-white/90 backdrop-blur-sm border-b border-primary-100 sticky top-0 z-40">
        <Container>
          <div className="flex justify-between items-center py-6">
            <Logo size="xs" href="/" />
          </div>
        </Container>
      </nav>

      <Section background="default" padding="lg">
        <Container>
          {/* Header - Using the same text we updated in dashboard */}
          <div className="text-center mb-16">
            <Heading level={1} size="display" className="mb-4">
              Hi, {user.displayName || 'Family'} family! 👋
            </Heading>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your account to get in.
            </p>
          </div>

          {/* Family Member Selection */}
          <div className="max-w-4xl mx-auto">
            {/* Kids Accounts First */}
            <div className="mb-12">
              <Heading level={2} size="heading" className="text-center mb-8">
                Kids Accounts
              </Heading>
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                {mockKids.map((kid, index) => (
                  <Card
                    key={index}
                    className="text-center cursor-pointer hover:shadow-brutal-lg transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1"
                    onClick={() => handleKidSelect(kid.name)}
                  >
                    <div className={`w-24 h-24 bg-gradient-to-br ${kid.color} rounded-core flex items-center justify-center text-4xl mb-6 mx-auto`}>
                      {kid.emoji}
                    </div>
                    <Heading level={3} size="title" className="mb-2">
                      {kid.name}&apos;s Account
                    </Heading>
                    <p className="text-gray-600 mb-6">
                      Tap to enter with your PIN
                    </p>
                    <CoreButton
                      variant="primary"
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleKidSelect(kid.name);
                      }}
                    >
                      Enter Account
                    </CoreButton>
                  </Card>
                ))}
              </div>
            </div>

            {/* Parent Account Last */}
            <div className="mb-16">
              <Heading level={2} size="heading" className="text-center mb-8">
                Parent Account
              </Heading>
              <div className="max-w-md mx-auto">
                <Card
                  className="text-center cursor-pointer hover:shadow-brutal-lg transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1"
                  onClick={handleParentSelect}
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-core flex items-center justify-center text-4xl mb-6 mx-auto">
                    👨‍👩‍👦
                  </div>
                  <Heading level={3} size="title" className="mb-2">
                    Parent Account
                  </Heading>
                  <p className="text-gray-600 mb-6">
                    Family management and settings
                  </p>
                  <CoreButton
                    variant="primary"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleParentSelect();
                    }}
                  >
                    Enter Account
                  </CoreButton>
                </Card>
              </div>
            </div>

            {/* Temporary Development Note */}
            <div className="text-center">
              <p className="text-sm text-gray-500">
                This is Phase 1: Visual mockup only. PIN verification and real family data coming in next phases.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}