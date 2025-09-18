'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Heading, Card, CoreButton, Badge, Logo } from '../../../components/ui/design-system';
import Loading from '../../../components/ui/loading';
import { useAuth } from '../../../hooks/useAuth';
import { completeFamilyOnboarding } from '../../../lib/db';

export default function OnboardingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user, loading, refreshUser } = useAuth();
  const router = useRouter();

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

  const handleCompleteOnboarding = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      // Update the family document in Firestore
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

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <Container>
        <div className="max-w-lg mx-auto w-full">
          {/* Header Section */}
          <div className="text-center mb-8">
            <Heading level={1} size="display" className="mb-4">
              Welcome to KidBase! 🎉
            </Heading>
            <div className="mb-6">
              <Logo size="lg" />
            </div>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Let&apos;s finish setting up your family account. You&apos;re just one step away from getting started!
            </p>
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
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-warm-500 rounded-3xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'F'}
                  </div>
                  <Heading level={3} size="title" className="mb-2">
                    {user.displayName || 'Your Family'}
                  </Heading>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
              </div>

              {/* Setup Information */}
              <div className="space-y-4 mb-8">
                <div className="bg-gradient-to-r from-primary-50 to-warm-50 border border-primary-200 rounded-card p-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">✨</div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Almost Ready!</h4>
                      <p className="text-sm text-gray-600">
                        Your family account has been created successfully. Complete the setup to access your dashboard and start building amazing family apps.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-secondary-50 to-secondary-100 border border-secondary-200 rounded-card p-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🔐</div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Secure Foundation</h4>
                      <p className="text-sm text-gray-600">
                        Your account is protected by Firebase authentication. In the future, you&apos;ll be able to add family members with their own secure access.
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
                  This will activate your dashboard and family features
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
}