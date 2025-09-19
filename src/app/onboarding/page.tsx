'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Heading, Card, CoreButton, Badge, Logo, PinInput } from '../../../components/ui/design-system';
import Input from '../../../components/ui/input';
import Loading from '../../../components/ui/loading';
import { useAuth } from '../../../hooks/useAuth';
import { completeFamilyOnboarding, updateOnboardingStep, saveParentData } from '../../../lib/db';
import { hashPin } from '../../../lib/utils';

export default function OnboardingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state for parent setup
  const [parentName, setParentName] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const { user, loading, refreshUser } = useAuth();
  const router = useRouter();

  // Determine current step: Step 1 (parent setup) or Step 2 (kids setup)
  const currentStep = user?.onboardingStep || 1;

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  // Redirect if onboarding is already complete
  useEffect(() => {
    if (!loading && user && user.onboardingComplete) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  // Handle Step 1: Parent Account Setup -> Move to Step 2
  const handleNextStep = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      // Validate form
      if (!parentName.trim()) {
        throw new Error('Please enter your name');
      }

      if (pin.length !== 4) {
        throw new Error('PIN must be exactly 4 digits');
      }

      if (pin !== confirmPin) {
        throw new Error('PINs do not match');
      }

      if (!/^\d{4}$/.test(pin)) {
        throw new Error('PIN must contain only numbers');
      }

      // Hash the PIN
      const pinHash = await hashPin(pin);

      // Save parent data
      await saveParentData(user.uid, parentName.trim(), pinHash);

      // Update onboarding step to 2
      await updateOnboardingStep(user.uid, 2);

      // Refresh the auth context with updated family data
      await refreshUser();
    } catch (error: unknown) {
      console.error('Step progression error:', error);
      setError((error as Error).message || 'Failed to proceed to next step. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Step 2: Kids Account Setup -> Complete Onboarding
  const handleCompleteOnboarding = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      // Complete the onboarding process
      await completeFamilyOnboarding(user.uid);

      // Refresh the auth context with updated family data
      await refreshUser();

      // Redirect to dashboard after completion
      router.push('/dashboard');
    } catch (error: unknown) {
      console.error('Onboarding completion error:', error);
      setError((error as Error).message || 'Failed to complete onboarding. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking auth state
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Setting up your family account..." />
      </main>
    );
  }

  // Don't render anything if user is not authenticated (will redirect)
  if (!user) {
    return null;
  }

  // Don't render if onboarding is already complete (will redirect)
  if (user.onboardingComplete) {
    return null;
  }

  // Render Step 1: Parent Account Setup
  if (currentStep === 1) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <Container>
          <div className="max-w-lg mx-auto w-full">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="mb-6">
                <Logo size="lg" />
              </div>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                Welcome to KidBase! Let&apos;s start by setting up your parent account first.
              </p>
            </div>

            {/* Step Indicator */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <span className="ml-2 text-sm font-medium text-primary-600">Parent Setup</span>
                </div>
                <div className="w-8 h-0.5 bg-gray-300"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <span className="ml-2 text-sm text-gray-500">Kids Setup</span>
                </div>
              </div>
            </div>

            {/* Onboarding Form */}
            <div className="max-w-md mx-auto w-full">
              <Card hover={false} className="shadow-brutal">
                {/* Error Messages */}
                {error && (
                  <div className="mb-6">
                    <Badge variant="warning" className="w-full text-left bg-red-100 text-red-800 border border-red-200">
                      ⚠️ {error}
                    </Badge>
                  </div>
                )}

                {/* Parent Setup Form */}
                <div className="space-y-6 mb-8">
                  {/* Parent Name Field */}
                  <div>
                    <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <Input
                      id="parentName"
                      type="text"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="Enter your first name"
                      disabled={isLoading}
                      className="shadow-brutal"
                      autoFocus
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      This will be used to identify you within your family
                    </p>
                  </div>

                  {/* PIN Setup */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Create Your PIN
                    </label>
                    <PinInput
                      value={pin}
                      onChange={setPin}
                      disabled={isLoading}
                      error={error?.includes('PIN') || false}
                    />
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      Choose a 4-digit PIN for secure access
                    </p>
                  </div>

                  {/* Confirm PIN */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Your PIN
                    </label>
                    <PinInput
                      value={confirmPin}
                      onChange={setConfirmPin}
                      disabled={isLoading}
                      error={error?.includes('match') || false}
                    />
                  </div>
                </div>

                {/* Next Step Button */}
                <CoreButton
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isLoading || !parentName.trim() || pin.length !== 4 || confirmPin.length !== 4}
                  onClick={handleNextStep}
                >
                  {isLoading ? 'Saving Parent Info...' : 'Save & Continue 👶'}
                </CoreButton>

                {/* Additional Information */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    Step 1 of 2 - Your information will be securely encrypted
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  // Render Step 2: Kids Account Setup
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <Container>
        <div className="max-w-lg mx-auto w-full">
          {/* Header Section */}
          <div className="text-center mb-8">
            <Heading level={1} size="display" className="mb-4">
              Kids Account Setup 👶
            </Heading>
            <div className="mb-6">
              <Logo size="lg" />
            </div>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Great! Now let&apos;s set up accounts for your children with age-appropriate access.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  ✓
                </div>
                <span className="ml-2 text-sm text-green-600">Parent Setup</span>
              </div>
              <div className="w-8 h-0.5 bg-green-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="ml-2 text-sm font-medium text-primary-600">Kids Setup</span>
              </div>
            </div>
          </div>

          {/* Onboarding Form */}
          <div className="max-w-md mx-auto w-full">
            <Card hover={false} className="shadow-brutal">
              {/* Error Messages */}
              {error && (
                <div className="mb-6">
                  <Badge variant="warning" className="w-full text-left bg-red-100 text-red-800 border border-red-200">
                    ⚠️ {error}
                  </Badge>
                </div>
              )}

              {/* Family Information Display */}
              <div className="mb-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-cyan-500 rounded-3xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                    👶
                  </div>
                  <Heading level={3} size="title" className="mb-2">
                    Kids Accounts
                  </Heading>
                  <p className="text-gray-600 text-sm">Family: {user.displayName || 'Your Family'}</p>
                </div>
              </div>

              {/* Setup Information */}
              <div className="space-y-4 mb-8">
                <div className="bg-gradient-to-r from-green-50 to-cyan-50 border border-green-200 rounded-card p-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">👶</div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Kids Account Setup</h4>
                      <p className="text-sm text-gray-600">
                        In the future, you&apos;ll be able to create individual accounts for each child with age-appropriate features and parental controls.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary-50 to-warm-50 border border-primary-200 rounded-card p-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🎯</div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Ready to Launch!</h4>
                      <p className="text-sm text-gray-600">
                        Complete the setup to access your family dashboard and start exploring all the features KidBase has to offer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Complete Setup Button */}
              <CoreButton
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
                onClick={handleCompleteOnboarding}
              >
                {isLoading ? 'Completing Setup...' : 'Complete Family Setup 🚀'}
              </CoreButton>

              {/* Additional Information */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Step 2 of 2 - This will activate your dashboard and family features
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
}