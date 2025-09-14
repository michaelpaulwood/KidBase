'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container, Section, Heading, Card, Badge, CoreButton, CoreInput, Step } from '../../components/ui/design-system';
import { FAQItem } from '../../components/ui/faq';
import MobileNav from '../../components/layout/mobile-nav';
import Footer from '../../components/layout/footer';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleViewDemo = () => {
    // Scroll to benefits section first to show what KidBase offers
    document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
    // After a delay, show a helpful message about trying the demo
    setTimeout(() => {
      const tryDemo = confirm(
        "KidBase Demo:\n\n" +
        "The best way to see KidBase in action is to try the authentication system!\n\n" +
        "• Click 'OK' to try signing up/logging in\n" +
        "• Click 'Cancel' to continue browsing features\n\n" +
        "You can create a real account or just explore the forms."
      );
      if (tryDemo) {
        window.location.href = '/auth';
      }
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-core-gradient">
      {/* Navigation */}
      <nav className="relative z-10 bg-white/90 backdrop-blur-sm border-b border-primary-100">
        <Container>
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-3xl font-bold text-gray-900">
              KidBase
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#benefits" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Benefits
              </Link>
              <Link href="#how-it-works" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                How it Works
              </Link>
              <Link href="#faq" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                FAQ
              </Link>
              <Link href="/auth">
                <CoreButton variant="primary">Get Started</CoreButton>
              </Link>
            </div>

            {/* Mobile Navigation */}
            <MobileNav isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu} />
          </div>
        </Container>
      </nav>

      {/* Hero Section */}
      <Section background="default" padding="xl">
        <Container>
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-warm-400 to-primary-500 rounded-core rotate-12 opacity-60"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full opacity-50"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-br from-warm-400 to-primary-500 rounded-card rotate-45 opacity-40"></div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center relative">
            <div className="space-y-8">
              <Heading level={1} size="hero" className="leading-tight">
                Build faster with{' '}
                <span className="bg-gradient-to-r from-primary-500 to-warm-500 bg-clip-text text-transparent">
                  KidBase
                </span>
              </Heading>
              
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-xl">
                The modern Next.js 14 boilerplate with Firebase integration. 
                Skip hours of setup and start building your next great idea today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth">
                  <CoreButton variant="primary" size="xl" className="w-full sm:w-auto">
                    Start Building Now →
                  </CoreButton>
                </Link>
                <CoreButton variant="outline" size="xl" className="w-full sm:w-auto" onClick={handleViewDemo}>
                  View Demo →
                </CoreButton>
              </div>
            </div>
            
            {/* Hero Illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-50 to-warm-50 rounded-core p-8 relative overflow-hidden shadow-core">
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <Card padding="md" className="shadow-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                  </Card>
                  <Card padding="md" className="shadow-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-2/3"></div>
                  </Card>
                  <Card padding="md" className="shadow-lg">
                    <div className="w-8 h-8 bg-purple-500 rounded-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-4/5"></div>
                  </Card>
                  <Card padding="md" className="shadow-lg">
                    <div className="w-8 h-8 bg-primary-500 rounded-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-3/5"></div>
                  </Card>
                </div>
                {/* Background decoration */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-warm-400 to-primary-500 rounded-full opacity-20"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-card opacity-30"></div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Benefits Section */}
      <Section background="white" padding="lg">
        <Container>
          <div className="text-center mb-20">
            <Badge variant="success" className="mb-6">✨ Benefits</Badge>
            <Heading level={2} size="display" className="mb-6">
              Why developers choose{' '}
              <span className="bg-gradient-to-r from-secondary-500 to-primary-500 bg-clip-text text-transparent">
                KidBase
              </span>
            </Heading>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to build modern web applications, without the setup headaches
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Lightning Fast Setup',
                description: 'Get from git clone to deployed app in under 5 minutes. No complex configuration needed.',
                color: 'from-warm-400 to-primary-500'
              },
              {
                icon: '🔥',
                title: 'Firebase Ready',
                description: 'Authentication, Firestore, and hosting pre-configured with best practices built-in.',
                color: 'from-primary-400 to-warm-500'
              },
              {
                icon: '💎',
                title: 'Premium Components',
                description: 'Beautiful, accessible UI components built with Tailwind CSS and TypeScript.',
                color: 'from-purple-400 to-pink-500'
              },
              {
                icon: '🛡️',
                title: 'Production Hardened',
                description: 'Error boundaries, loading states, and comprehensive error handling included.',
                color: 'from-secondary-400 to-secondary-600'
              },
              {
                icon: '📱',
                title: 'Mobile First',
                description: 'Responsive design that looks perfect on every device, from phones to desktops.',
                color: 'from-green-400 to-teal-500'
              },
              {
                icon: '🚀',
                title: 'Deploy Anywhere',
                description: 'Optimized for Vercel, Netlify, and any platform that supports Next.js applications.',
                color: 'from-indigo-400 to-purple-500'
              }
            ].map((benefit, index) => (
              <Card key={index} className="h-full">
                <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-core flex items-center justify-center text-2xl mb-6`}>
                  {benefit.icon}
                </div>
                <Heading level={3} size="title" className="mb-4">{benefit.title}</Heading>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* How It Works Section */}
      <Section background="cool" padding="lg">
        <Container>
          <div className="text-center mb-20">
            <Badge variant="secondary" className="mb-6">🎯 How It Works</Badge>
            <Heading level={2} size="display" className="mb-6">
              Get started in{' '}
              <span className="bg-gradient-to-r from-secondary-500 to-secondary-700 bg-clip-text text-transparent">
                5 simple steps
              </span>
            </Heading>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From clone to production in minutes, not hours
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            <Step
              step="01"
              title="Clone the Repository"
              description="git clone https://github.com/michaelpaulwood/KidBase.git - Get the complete boilerplate with all features ready to go."
              icon="📥"
            />
            <Step
              step="02"
              title="Install Dependencies" 
              description="npm install - All dependencies are carefully selected and optimized for performance and compatibility."
              icon="📦"
            />
            <Step
              step="03"
              title="Configure Firebase"
              description="Copy .env.example to .env.local and add your Firebase config. Full setup instructions included."
              icon="🔧"
            />
            <Step
              step="04"
              title="Start Development"
              description="npm run dev - Your development server is running with authentication, database, and all features working."
              icon="🚀"
            />
            <Step
              step="05"
              title="Deploy & Scale"
              description="Push to Vercel, Netlify, or your preferred platform. Deployment configurations included."
              icon="🌍"
            />
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section background="white" padding="lg">
        <Container>
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <Badge variant="warning" className="mb-6">❓ FAQ</Badge>
            <Heading level={2} size="display" className="mb-6">
              Frequently asked{' '}
              <span className="bg-gradient-to-r from-warm-500 to-primary-600 bg-clip-text text-transparent">
                questions
              </span>
            </Heading>
            <p className="text-xl text-gray-600">
              Everything you need to know about KidBase
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            <FAQItem
              question="What makes KidBase different from other boilerplates?"
              answer="KidBase is production-ready out of the box with Firebase integration, comprehensive error handling, and modern UI components. No more spending weeks on setup - start building your features immediately."
            />
            <FAQItem
              question="Do I need to know Firebase to use KidBase?"
              answer="Not at all! KidBase comes with pre-configured Firebase setup, helper functions, and clear documentation. Just add your Firebase config and start using authentication and database features right away."
            />
            <FAQItem
              question="Can I customize the UI components?"
              answer="Absolutely! All components are built with Tailwind CSS and TypeScript, making them easy to customize. You can modify colors, sizes, and behavior to match your brand and requirements."
            />
            <FAQItem
              question="Is KidBase suitable for production applications?"
              answer="Yes! KidBase includes error boundaries, loading states, TypeScript throughout, and follows Next.js best practices. Many developers use it to ship production applications quickly and reliably."
            />
            <FAQItem
              question="What support is available?"
              answer="KidBase comes with comprehensive documentation, code comments, and examples. The codebase is designed to be self-documenting and easy to understand for developers of all levels."
            />
            <FAQItem
              question="Can I deploy KidBase to platforms other than Vercel?"
              answer="Yes! KidBase works on any platform that supports Next.js - including Netlify, Railway, DigitalOcean App Platform, AWS Amplify, and more. Deployment instructions are included."
            />
          </div>
        </Container>
      </Section>

      {/* Newsletter Section */}
      <Section background="warm" padding="lg">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            {/* Integrated design - no card, blend with background */}
            <Badge variant="primary" className="mb-6">📧 Newsletter</Badge>
            <Heading level={2} size="display" className="mb-6">
              Stay updated with{' '}
              <span className="bg-gradient-to-r from-primary-500 to-warm-500 bg-clip-text text-transparent">
                KidBase
              </span>
            </Heading>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Get notified about new features, updates, and developer tips. 
              Join hundreds of developers building faster with KidBase.
            </p>
            
            {/* Form in a subtle card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-core p-8 shadow-core max-w-lg mx-auto mb-6">
              <form className="flex flex-col sm:flex-row gap-4">
                <CoreInput
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 text-lg py-4"
                />
                <CoreButton type="submit" variant="primary" size="lg" className="whitespace-nowrap">
                  Subscribe →
                </CoreButton>
              </form>
            </div>
            
            <p className="text-sm text-gray-500">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}