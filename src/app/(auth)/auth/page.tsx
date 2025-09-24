'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Heading, Card, CoreButton, Badge, Logo } from '../../../../components/ui/design-system';
import { useAuth } from '../../../../hooks/useAuth';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resetEmailSent, setResetEmailSent] = useState(false);
  
  const { signUp, signIn, resetPassword, user, error, clearError } = useAuth();
  const router = useRouter();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      // Check onboarding status and redirect accordingly
      if (user.onboardingComplete) {
        router.push('/dashboard');
      } else {
        router.push('/onboarding');
      }
    }
  }, [user, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (error) {
      clearError();
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Family name is required';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
      } else {
        await signUp(formData.email, formData.password, formData.name);
      }
    } catch (err) {
      console.error('Auth error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setErrors({ email: 'Please enter your email address' });
      return;
    }

    try {
      await resetPassword(formData.email);
      setResetEmailSent(true);
      setErrors({});
    } catch (err) {
      console.error('Password reset error:', err);
    }
  };

  const handleFormToggle = () => {
    setIsLogin(!isLogin);
    // Clear auth errors when switching between login/signup
    if (error) {
      clearError();
    }
    // Clear form validation errors
    setErrors({});
    // Clear password reset success message
    setResetEmailSent(false);
  };

  return (
    <main className="min-h-screen ">
      <Container>
        <div className="min-h-screen flex flex-col justify-center py-12">
          {/* Header */}
          <div className="text-center mb-6">
            <Heading level={2} size="heading" className="mb-6">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </Heading>

            <div>
              <Logo size="lg" href="/" />
            </div>
          </div>

          {/* Auth Form */}
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
              
              {/* Success Messages */}
              {resetEmailSent && (
                <div className="mb-6">
                  <Badge variant="success" className="w-full text-left">
                    ✅ Password reset email sent! Check your inbox.
                  </Badge>
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="w-full">
                    <label className="block text-sm font-medium font-sans text-gray-700 mb-2">
                      Family Name {true && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Enter your family name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-card focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                )}

                <div className="w-full">
                  <label className="block text-sm font-medium font-sans text-gray-700 mb-2">
                    Email Address {true && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-card focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium font-sans text-gray-700 mb-2">
                    Password {true && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-card focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                {!isLogin && (
                  <div className="w-full">
                    <label className="block text-sm font-medium font-sans text-gray-700 mb-2">
                      Confirm Password {true && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <input
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-card focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}

                {isLogin && (
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm font-medium font-sans text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      Forgot your password?
                    </button>
                  </div>
                )}

                <CoreButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : (isLogin ? 'Sign in' : 'Create account')}
                </CoreButton>
              </form>

            </Card>

            {/* Account Toggle - Below Form */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 font-sans">
                {isLogin ? "Don't have an account yet?" : 'Already have an account?'}
                {' '}
                <button
                  type="button"
                  onClick={handleFormToggle}
                  className="font-semibold font-sans text-primary-600 hover:text-primary-700 transition-colors underline"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}