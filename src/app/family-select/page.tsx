'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Section, Heading, Card, CoreButton } from '../../../components/ui/design-system';
import Loading from '../../../components/ui/loading';
import Logo from '../../../components/ui/logo';
import PinVerificationModal from '../../../components/ui/pin-verification-modal';
import { useAuth } from '../../../hooks/useAuth';
import type { KidData } from '../../../types/user';

export default function FamilySelect() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // PIN verification modal state
  const [showPinModal, setShowPinModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<{
    name: string;
    type: 'parent' | 'kid';
    pinHash: string;
    kidData?: KidData;
  } | null>(null);

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

  // Extract real family data
  const familyKids = user?.kids ? Object.entries(user.kids).map(([key, kidData]) => ({
    key,
    ...kidData,
    emoji: kidData.kidNumber % 2 === 1 ? '👧' : '👦', // Alternate between girl/boy emoji
    color: kidData.kidNumber % 3 === 1 ? 'from-pink-500 to-pink-600' :
           kidData.kidNumber % 3 === 2 ? 'from-cyan-500 to-cyan-600' :
           'from-green-500 to-green-600'
  })) : [];

  const hasParent = user?.parent;

  const handleKidSelect = (kidData: KidData) => {
    setSelectedMember({
      name: kidData.name,
      type: 'kid',
      pinHash: kidData.pinHash,
      kidData
    });
    setShowPinModal(true);
  };

  const handleParentSelect = () => {
    if (!user?.parent) return;

    setSelectedMember({
      name: user.parent.name,
      type: 'parent',
      pinHash: user.parent.pinHash
    });
    setShowPinModal(true);
  };

  const handlePinSuccess = () => {
    if (!selectedMember) return;

    // Store selected family member in sessionStorage
    const memberInfo = {
      name: selectedMember.name,
      type: selectedMember.type,
      ...(selectedMember.kidData && { kidData: selectedMember.kidData })
    };

    sessionStorage.setItem('selectedFamilyMember', JSON.stringify(memberInfo));

    // Close modal
    setShowPinModal(false);
    setSelectedMember(null);

    // Redirect to appropriate dashboard
    if (selectedMember.type === 'parent') {
      router.push('/dashboard');
    } else {
      // For now, redirect to dashboard (kid dashboard in Phase 4)
      router.push('/dashboard');
    }
  };

  const handlePinCancel = () => {
    setShowPinModal(false);
    setSelectedMember(null);
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
            {familyKids.length > 0 && (
              <div className="mb-12">
                <Heading level={2} size="heading" className="text-center mb-8">
                  Kids Accounts
                </Heading>
                <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  {familyKids.map((kid) => (
                    <Card key={kid.uuid} className="text-center">
                      <div
                        className="cursor-pointer hover:shadow-brutal-lg transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1"
                        onClick={() => handleKidSelect(kid)}
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
                          onClick={() => handleKidSelect(kid)}
                        >
                          Enter Account
                        </CoreButton>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Parent Account Last */}
            {hasParent && (
              <div className="mb-16">
                <Heading level={2} size="heading" className="text-center mb-8">
                  Parent Account
                </Heading>
                <div className="max-w-md mx-auto">
                  <Card className="text-center">
                    <div
                      className="cursor-pointer hover:shadow-brutal-lg transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1"
                      onClick={handleParentSelect}
                    >
                      <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-core flex items-center justify-center text-4xl mb-6 mx-auto">
                        👨‍👩‍👦
                      </div>
                      <Heading level={3} size="title" className="mb-2">
                        {user.parent?.name}&apos;s Account
                      </Heading>
                      <p className="text-gray-600 mb-6">
                        Family management and settings
                      </p>
                      <CoreButton
                        variant="primary"
                        className="w-full"
                        onClick={handleParentSelect}
                      >
                        Enter Account
                      </CoreButton>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* No family members yet */}
            {familyKids.length === 0 && !hasParent && (
              <div className="text-center mb-16">
                <div className="w-20 h-20 bg-gray-200 rounded-core flex items-center justify-center text-3xl mb-6 mx-auto">
                  👥
                </div>
                <Heading level={3} size="heading" className="mb-4">
                  No Family Members Set Up Yet
                </Heading>
                <p className="text-gray-600 mb-8">
                  Complete the onboarding process to set up your family accounts.
                </p>
                <CoreButton
                  variant="primary"
                  onClick={() => router.push('/onboarding')}
                >
                  Complete Setup
                </CoreButton>
              </div>
            )}
          </div>

          {/* PIN Verification Modal */}
          {selectedMember && (
            <PinVerificationModal
              isOpen={showPinModal}
              onClose={handlePinCancel}
              onSuccess={handlePinSuccess}
              memberName={selectedMember.name}
              memberType={selectedMember.type}
              pinHash={selectedMember.pinHash}
            />
          )}
        </Container>
      </Section>
    </main>
  );
}