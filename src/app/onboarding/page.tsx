'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Heading, Card, CoreButton, Badge, Logo, PinInput } from '../../../components/ui/design-system';
import Input from '../../../components/ui/input';
import Loading from '../../../components/ui/loading';
import { useAuth } from '../../../hooks/useAuth';
import { completeFamilyOnboarding, updateOnboardingStep, saveParentData, saveKidData } from '../../../lib/db';
import { hashPin } from '../../../lib/utils';

export default function OnboardingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state for parent setup
  const [parentName, setParentName] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  // Form state for kid setup (visual only for now)
  const [kidName, setKidName] = useState('');
  const [kidPin, setKidPin] = useState('');
  const [kidConfirmPin, setKidConfirmPin] = useState('');

  const { user, loading, refreshUser } = useAuth();
  const router = useRouter();

  // Determine current step: Step 1 (parent setup) or Step 2 (kids setup)
  const currentStep = user?.onboardingStep || 1;

  // Helper function to clear kid form
  const clearKidForm = () => {
    setKidName('');
    setKidPin('');
    setKidConfirmPin('');
    setError(null);
  };

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

  // Handle Step 2: Add Another Kid (without completing onboarding)
  const handleAddAnotherKid = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      // Validate kid form
      if (!kidName.trim()) {
        throw new Error('Please enter the kid\'s name');
      }

      if (kidPin.length !== 4) {
        throw new Error('Kid PIN must be exactly 4 digits');
      }

      if (kidPin !== kidConfirmPin) {
        throw new Error('Kid PINs do not match');
      }

      if (!/^\d{4}$/.test(kidPin)) {
        throw new Error('Kid PIN must contain only numbers');
      }

      // Hash the kid PIN
      const kidPinHash = await hashPin(kidPin);

      // Save kid data
      await saveKidData(user.uid, kidName.trim(), kidPinHash);

      // Refresh the auth context to show updated kids count
      await refreshUser();

      // Clear form for next kid
      clearKidForm();

    } catch (error: unknown) {
      console.error('Add kid error:', error);
      setError((error as Error).message || 'Failed to add kid. Please try again.');
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

      // If form has data, save it first before completing
      if (kidName.trim()) {
        // Validate kid form
        if (kidPin.length !== 4) {
          throw new Error('Kid PIN must be exactly 4 digits');
        }

        if (kidPin !== kidConfirmPin) {
          throw new Error('Kid PINs do not match');
        }

        if (!/^\d{4}$/.test(kidPin)) {
          throw new Error('Kid PIN must contain only numbers');
        }

        // Hash the kid PIN and save
        const kidPinHash = await hashPin(kidPin);
        await saveKidData(user.uid, kidName.trim(), kidPinHash);
      }

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
              <p className="text-lg font-sans text-gray-600 max-w-md mx-auto">
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
                  <span className="ml-2 text-sm font-sans text-gray-500">Kids Setup</span>
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
                    <label htmlFor="parentName" className="block text-sm font-medium font-sans text-gray-700 mb-2">
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
                    <p className="text-sm font-sans text-gray-500 mt-1">
                      This will be used to identify you within your family
                    </p>
                  </div>

                  {/* PIN Setup */}
                  <div>
                    <label className="block text-sm font-medium font-sans text-gray-700 mb-2">
                      Create Your PIN
                    </label>
                    <PinInput
                      value={pin}
                      onChange={setPin}
                      disabled={isLoading}
                      error={error?.includes('PIN') || false}
                    />
                    <p className="text-sm font-sans text-gray-500 mt-2 text-center">
                      Choose a 4-digit PIN for secure access
                    </p>
                  </div>

                  {/* Confirm PIN */}
                  <div>
                    <label className="block text-sm font-medium font-sans text-gray-700 mb-2">
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
                  <p className="text-sm font-sans text-gray-500">
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
                  <Heading level={3} size="title" className="mb-2">
                    Kids Accounts
                  </Heading>
                  <p className="text-gray-600 text-sm">Family: {user.displayName || 'Your Family'}</p>
                </div>
              </div>

              {/* Kids Counter Display */}
              {user?.kids && Object.keys(user.kids).length > 0 && (
                <div className="mb-6 text-center">
                  <Badge variant="success" className="bg-green-100 text-green-800 border-green-200">
                    ✅ {Object.keys(user.kids).length} kid{Object.keys(user.kids).length > 1 ? 's' : ''} added
                  </Badge>
                </div>
              )}

              {/* Kid Setup Form */}
              <div className="space-y-6 mb-8">
                {/* Kid Name Field */}
                <div>
                  <label htmlFor="kidName" className="block text-sm font-medium font-sans text-gray-700 mb-2">
                    Kid Name
                  </label>
                  <Input
                    id="kidName"
                    type="text"
                    value={kidName}
                    onChange={(e) => setKidName(e.target.value)}
                    placeholder="Enter your child's name"
                    disabled={isLoading}
                    className="shadow-brutal"
                    autoFocus
                  />
                  <p className="text-sm font-sans text-gray-500 mt-1">
                    This will be used to identify your child within your family
                  </p>
                </div>

                {/* Create PIN */}
                <div>
                  <label className="block text-sm font-medium font-sans text-gray-700 mb-2">
                    Create PIN for Kid
                  </label>
                  <PinInput
                    value={kidPin}
                    onChange={setKidPin}
                    disabled={isLoading}
                    error={error?.includes('PIN') || false}
                  />
                  <p className="text-sm font-sans text-gray-500 mt-2 text-center">
                    Choose a 4-digit PIN for your child&apos;s secure access
                  </p>
                </div>

                {/* Confirm PIN */}
                <div>
                  <label className="block text-sm font-medium font-sans text-gray-700 mb-2">
                    Confirm Kid PIN
                  </label>
                  <PinInput
                    value={kidConfirmPin}
                    onChange={setKidConfirmPin}
                    disabled={isLoading}
                    error={error?.includes('match') || false}
                  />
                </div>
              </div>

              {/* Add Another Child Button */}
              <CoreButton
                variant="secondary"
                size="lg"
                className="w-full mb-4"
                disabled={isLoading || !kidName.trim() || kidPin.length !== 4 || kidConfirmPin.length !== 4}
                onClick={handleAddAnotherKid}
              >
                {isLoading ? 'Adding Kid...' : 'Add Another Child 👶'}
              </CoreButton>

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
                <p className="text-sm font-sans text-gray-500">
                  Step 2 of 2 - Add all your kids, then complete setup to activate your dashboard
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
}