'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container, Section, Heading, CoreButton } from '../../components/ui/design-system';
import MobileNav from '../../components/layout/mobile-nav';
import Footer from '../../components/layout/footer';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="relative z-10 bg-white/90 backdrop-blur-sm">
        <Container>
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              KidBase
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Features
              </Link>
              <Link href="#cta" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Get Started
              </Link>
              <Link href="/auth">
                <CoreButton variant="primary">🚀 Get Started</CoreButton>
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
          <div className="text-center space-y-12">
            {/* Main Heading */}
            <div className="space-y-6">
              <Heading level={1} size="hero" className="leading-tight">
                Build apps for{' '}
                <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                  Families
                </span>
              </Heading>

              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                The modern Next.js boilerplate designed for family apps. Kid-friendly UI,
                parent controls, and points system - all ready to go.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth">
                <button className="bg-primary-500 hover:bg-primary-600 text-white font-bold font-display py-4 px-8 rounded-2xl text-lg flex items-center gap-3 transition-all duration-200 shadow-brutal hover:shadow-brutal-lg border-4 border-black hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0">
                  🚀 Get Started
                </button>
              </Link>
              <Link href="/elements">
                <button className="bg-success-500 hover:bg-success-600 text-white font-bold font-display py-4 px-8 rounded-2xl text-lg flex items-center gap-3 transition-all duration-200 shadow-brutal hover:shadow-brutal-lg border-4 border-black hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0">
                  🎨 View Elements
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section background="white" padding="lg" id="features">
        <Container>
          <div className="text-center mb-20">
            <Heading level={2} size="display" className="mb-8">
              Built for Families
            </Heading>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create engaging family applications with modern 3D design
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Kid-Friendly Design */}
            <div className="bg-primary-500 text-white p-8 rounded-3xl border-4 border-black shadow-brutal">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold font-display mb-4">Kid-Friendly Design</h3>
              <p className="text-primary-100 leading-relaxed">
                Large buttons, bright colors, and touch-optimized for little hands
              </p>
            </div>

            {/* Family Authentication */}
            <div className="bg-success-500 text-white p-8 rounded-3xl border-4 border-black shadow-brutal">
              <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-2xl font-bold font-display mb-4">Family Authentication</h3>
              <p className="text-success-100 leading-relaxed">
                Parent accounts with Kid PINs - secure but simple for children
              </p>
            </div>

            {/* Points & Rewards */}
            <div className="bg-primary-500 text-white p-8 rounded-3xl border-4 border-black shadow-brutal">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold font-display mb-4">Points & Rewards</h3>
              <p className="text-primary-100 leading-relaxed">
                Built-in gamification system to motivate and reward good behavior
              </p>
            </div>

            {/* Mobile First */}
            <div className="bg-pink-500 text-white p-8 rounded-3xl border-4 border-black shadow-brutal">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-2xl font-bold font-display mb-4">Mobile First</h3>
              <p className="text-pink-100 leading-relaxed">
                Designed for tablets and phones - perfect for family use
              </p>
            </div>

            {/* 3D Components */}
            <div className="bg-cyan-500 text-white p-8 rounded-3xl border-4 border-black shadow-brutal">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold font-display mb-4">3D Components</h3>
              <p className="text-cyan-100 leading-relaxed">
                Modern, tactile interface that feels real and engaging
              </p>
            </div>

            {/* Ready to Deploy */}
            <div className="bg-orange-500 text-white p-8 rounded-3xl border-4 border-black shadow-brutal">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold font-display mb-4">Ready to Deploy</h3>
              <p className="text-orange-100 leading-relaxed">
                Firebase configured, components built, just add your family logic
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="white" padding="lg" id="cta">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            {/* Bordered CTA Box like in screenshot */}
            <div className="border-4 border-black rounded-3xl p-12 shadow-2xl">
              <Heading level={2} size="display" className="mb-8">
                Ready to Build Something Amazing?
              </Heading>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Join the future of family apps with our beautiful, functional boilerplate
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/auth">
                  <button className="bg-success-500 hover:bg-success-600 text-white font-bold font-display py-4 px-8 rounded-2xl text-lg flex items-center gap-3 transition-all duration-200 shadow-brutal hover:shadow-brutal-lg border-4 border-black hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0">
                    ✨ Start Building
                  </button>
                </Link>
                <Link href="/auth">
                  <button className="bg-primary-500 hover:bg-primary-600 text-white font-bold font-display py-4 px-8 rounded-2xl text-lg flex items-center gap-3 transition-all duration-200 shadow-brutal hover:shadow-brutal-lg border-4 border-black hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0">
                    🔧 Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}