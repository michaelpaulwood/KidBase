'use client';

import Link from 'next/link';
import { Container, Section, Heading } from '../../components/ui/design-system';
import Footer from '../../components/layout/footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Section background="default" padding="xl">
        <Container>
          <div className="text-center space-y-12">
            {/* Main Heading - Gaming Style vs Layout */}
            <div className="space-y-6">
              <div className="font-black font-display leading-none">
                <div
                  className="bg-gradient-to-r from-secondary-600 via-pink-500 to-orange-500 bg-clip-text text-transparent -mb-2"
                  style={{ fontSize: 'clamp(3.5rem, 12vw, 8rem)' }}
                >
                  KidBase
                </div>
                <div className="text-gray-900 text-center text-hero -mb-2">
                  vs.
                </div>
                <div className="text-gray-900 text-hero">
                  months wasted
                </div>
              </div>

              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                While others debate frameworks, you'll be collecting user feedback. This isn't just a boilerplate—it's your unfair advantage.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Link href="/auth">
                <button className="bg-primary-500 hover:bg-primary-600 text-white font-bold font-display py-4 px-8 rounded-2xl text-lg flex items-center gap-3 transition-all duration-200 shadow-brutal hover:shadow-brutal-lg border-4 border-black hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0">
                  🚀 Get Started
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section background="white" padding="md" id="features">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Bordered Features Box */}
            <div className="border-4 border-black rounded-3xl p-12 shadow-2xl">
              <div className="text-center mb-12">
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
            </div>
          </div>
        </Container>
      </Section>

      {/* Design System Showcase Section */}
      <Section background="white" padding="md" id="design-system">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Bordered Design System Box */}
            <div className="border-4 border-black rounded-3xl p-12 shadow-2xl">
              <div className="text-center mb-12">
                <Heading level={2} size="display" className="mb-8">
                  Ready-Made Kids Design System
                </Heading>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Complete set of kid-friendly components, colors, and elements. Everything you need to build engaging family applications.
                </p>
              </div>

              {/* Design System Preview */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {/* Colors Preview */}
                <div className="text-center">
                  <div className="flex justify-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-primary-500 rounded-full border-2 border-black"></div>
                    <div className="w-8 h-8 bg-success-500 rounded-full border-2 border-black"></div>
                    <div className="w-8 h-8 bg-pink-500 rounded-full border-2 border-black"></div>
                    <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-black"></div>
                    <div className="w-8 h-8 bg-cyan-500 rounded-full border-2 border-black"></div>
                  </div>
                  <h3 className="text-lg font-bold font-display text-gray-800">Bright Color Palette</h3>
                  <p className="text-sm text-gray-600">Kid-friendly, accessible colors</p>
                </div>

                {/* Button Preview */}
                <div className="text-center">
                  <div className="mb-4">
                    <button className="bg-primary-500 text-white font-bold font-display py-2 px-4 rounded-xl text-sm border-2 border-black shadow-brutal">
                      🎯 Sample Button
                    </button>
                  </div>
                  <h3 className="text-lg font-bold font-display text-gray-800">3D Interactive Elements</h3>
                  <p className="text-sm text-gray-600">Tactile, engaging components</p>
                </div>

                {/* Cards Preview */}
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="bg-white p-3 rounded-xl border-2 border-black shadow-brutal w-20 h-16 flex items-center justify-center">
                      <div className="text-2xl">⭐</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold font-display text-gray-800">Modern Cards & Layouts</h3>
                  <p className="text-sm text-gray-600">Professional structure</p>
                </div>
              </div>

              {/* CTA to Design System */}
              <div className="text-center">
                <Link href="/elements">
                  <button className="bg-secondary-600 hover:bg-secondary-700 text-white font-bold font-display py-4 px-8 rounded-2xl text-lg flex items-center gap-3 mx-auto transition-all duration-200 shadow-brutal hover:shadow-brutal-lg border-4 border-black hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0">
                    🎨 Explore Design System
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="white" padding="md" id="cta">
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

              <div className="flex justify-center">
                <a href="https://github.com/michaelpaulwood/KidBase" target="_blank" rel="noopener noreferrer">
                  <button className="bg-success-500 hover:bg-success-600 text-white font-bold font-display py-4 px-8 rounded-2xl text-lg flex items-center gap-3 transition-all duration-200 shadow-brutal hover:shadow-brutal-lg border-4 border-black hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0">
                    ✨ Start Building
                  </button>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}