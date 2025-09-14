'use client';

import { Container, Section, Heading, Card, Badge, CoreButton, CoreInput } from '../../../components/ui/design-system';
import Footer from '../../../components/layout/footer';

export default function DesignSystem() {

  return (
    <main className="min-h-screen">
      {/* Header */}
      <Section padding="lg">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-6 shadow-brutal border-2 border-black">🎨 Design System</Badge>
            <Heading level={1} size="display" className="mb-6">
              KidBase Design Elements
            </Heading>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive showcase of all design components, colors, and patterns available in the KidBase design system.
            </p>
          </div>
        </Container>
      </Section>

      {/* Colors Section */}
      <Section background="white" padding="lg">
        <Container>
          <div className="mb-16">
            <Heading level={2} size="heading" className="mb-8 text-center">Color Palette</Heading>

            {/* Primary Colors */}
            <div className="mb-12">
              <h3 className="text-xl font-bold font-display mb-6">Primary Purple</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { name: 'primary-100', value: '#f3e8ff', text: 'text-black' },
                  { name: 'primary-300', value: '#d8b4fe', text: 'text-black' },
                  { name: 'primary-500', value: '#a855f7', text: 'text-white' },
                  { name: 'primary-700', value: '#7c3aed', text: 'text-white' },
                  { name: 'primary-900', value: '#581c87', text: 'text-white' }
                ].map((color) => (
                  <div key={color.name} className={`bg-${color.name} p-6 rounded-2xl border-4 border-black shadow-brutal`}>
                    <div className={`font-bold font-display ${color.text}`}>{color.name}</div>
                    <div className={`text-sm ${color.text} opacity-80`}>{color.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Colors */}
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="text-center">
                <h4 className="font-bold font-display mb-4">Success Green</h4>
                <div className="bg-success-500 p-6 rounded-2xl border-4 border-black shadow-brutal text-white">
                  <div className="font-bold">#22c55e</div>
                </div>
              </div>
              <div className="text-center">
                <h4 className="font-bold font-display mb-4">Pink</h4>
                <div className="bg-pink-500 p-6 rounded-2xl border-4 border-black shadow-brutal text-white">
                  <div className="font-bold">#ec4899</div>
                </div>
              </div>
              <div className="text-center">
                <h4 className="font-bold font-display mb-4">Orange</h4>
                <div className="bg-orange-500 p-6 rounded-2xl border-4 border-black shadow-brutal text-white">
                  <div className="font-bold">#f97316</div>
                </div>
              </div>
              <div className="text-center">
                <h4 className="font-bold font-display mb-4">Cyan</h4>
                <div className="bg-cyan-500 p-6 rounded-2xl border-4 border-black shadow-brutal text-white">
                  <div className="font-bold">#14b8a6</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Typography Section */}
      <Section padding="lg">
        <Container>
          <div className="mb-16">
            <Heading level={2} size="heading" className="mb-8 text-center">Typography</Heading>

            <Card hover={false} className="p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold font-display mb-4 text-gray-600">Display Font (Inter)</h3>
                  <div className="text-6xl font-display font-bold text-primary-600 mb-2">Aa</div>
                  <p className="text-gray-600">Clean, modern font for headings and display text</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-display mb-4 text-gray-600">Body Font (DM Sans)</h3>
                  <div className="text-4xl font-sans font-medium text-gray-800 mb-2">Aa</div>
                  <p className="text-gray-600">Simple, readable font for body text and UI elements</p>
                </div>

                <div className="space-y-4">
                  <div className="text-hero font-display font-black">Hero Text (Responsive)</div>
                  <div className="text-display font-display font-bold">Display Text (Responsive)</div>
                  <div className="text-heading font-display font-bold">Heading Text (Responsive)</div>
                  <div className="text-2xl font-bold font-display">Title Text</div>
                  <div className="text-lg">Large Body Text</div>
                  <div className="text-base">Regular Body Text</div>
                  <div className="text-sm text-gray-600">Small Text</div>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Buttons Section */}
      <Section background="white" padding="lg">
        <Container>
          <div className="mb-16">
            <Heading level={2} size="heading" className="mb-8 text-center">Button Components</Heading>

            <div className="grid md:grid-cols-2 gap-8">
              <Card hover={false} className="p-8">
                <h3 className="text-xl font-bold font-display mb-6">Button Variants</h3>
                <div className="space-y-4">
                  <CoreButton variant="primary" size="lg">🚀 Primary Button</CoreButton>
                  <CoreButton variant="secondary" size="lg">💙 Secondary Button</CoreButton>
                  <CoreButton variant="outline" size="lg">📝 Outline Button</CoreButton>
                  <CoreButton variant="ghost" size="lg">👻 Ghost Button</CoreButton>
                </div>
              </Card>

              <Card hover={false} className="p-8">
                <h3 className="text-xl font-bold font-display mb-6">Button Sizes</h3>
                <div className="space-y-4 flex flex-col items-start">
                  <CoreButton variant="primary" size="sm">Small</CoreButton>
                  <CoreButton variant="primary" size="md">Medium</CoreButton>
                  <CoreButton variant="primary" size="lg">Large</CoreButton>
                  <CoreButton variant="primary" size="xl">Extra Large</CoreButton>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Form Elements Section */}
      <Section padding="lg">
        <Container>
          <div className="mb-16">
            <Heading level={2} size="heading" className="mb-8 text-center">Form Elements</Heading>

            <Card hover={false} className="max-w-2xl mx-auto p-8">
              <div className="space-y-6">
                <CoreInput
                  label="Text Input"
                  placeholder="Enter some text..."
                />

                <CoreInput
                  label="Email Input"
                  type="email"
                  placeholder="your@email.com"
                  required
                />

                <CoreInput
                  label="Password Input"
                  type="password"
                  placeholder="Enter password"
                />

                <CoreInput
                  label="Input with Error"
                  placeholder="This has an error"
                  error="This field is required"
                />

                <div className="pt-4">
                  <CoreButton variant="primary" size="lg" className="w-full">
                    Submit Form
                  </CoreButton>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Cards Section */}
      <Section background="white" padding="lg">
        <Container>
          <div className="mb-16">
            <Heading level={2} size="heading" className="mb-8 text-center">Card Components</Heading>

            <div className="grid md:grid-cols-3 gap-8">
              <Card hover={false} className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold font-display mb-4">Basic Card</h3>
                <p className="text-gray-600">A simple card with 3D shadow effects and rounded corners.</p>
              </Card>

              <Card hover={false} className="text-center bg-gradient-to-br from-primary-500 to-primary-600 text-white border-primary-700">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-bold font-display mb-4 text-white">Colored Card</h3>
                <p className="text-primary-100">Cards can have custom backgrounds and styling.</p>
              </Card>

              <Card hover={false} className="text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold font-display mb-4">Hover Effects</h3>
                <p className="text-gray-600">Interactive cards with 3D hover animations.</p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Badges Section */}
      <Section padding="lg">
        <Container>
          <div className="mb-16">
            <Heading level={2} size="heading" className="mb-8 text-center">Badge Components</Heading>

            <div className="text-center space-x-4 space-y-4">
              <Badge variant="primary">🚀 Primary Badge</Badge>
              <Badge variant="secondary">💙 Secondary Badge</Badge>
              <Badge variant="success">✅ Success Badge</Badge>
              <Badge variant="warning">⚠️ Warning Badge</Badge>
            </div>
          </div>
        </Container>
      </Section>

      {/* Shadows & Effects Section */}
      <Section background="white" padding="lg">
        <Container>
          <div className="mb-16">
            <Heading level={2} size="heading" className="mb-8 text-center">Shadow Effects</Heading>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8  rounded-2xl border-4 border-black shadow-brutal text-center">
                <h3 className="font-bold font-display mb-2">Brutal Shadow</h3>
                <code className="text-sm text-gray-600">shadow-brutal</code>
              </div>

              <div className="p-8  rounded-2xl border-4 border-black shadow-brutal-lg text-center">
                <h3 className="font-bold font-display mb-2">Large Brutal Shadow</h3>
                <code className="text-sm text-gray-600">shadow-brutal-lg</code>
              </div>

              <div className="p-8 bg-gray-100 rounded-2xl border-4 border-black shadow-inset-brutal text-center">
                <h3 className="font-bold font-display mb-2">Inset Shadow</h3>
                <code className="text-sm text-gray-600">shadow-inset-brutal</code>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Usage Guidelines */}
      <Section padding="lg">
        <Container>
          <div className="mb-16">
            <Heading level={2} size="heading" className="mb-8 text-center">Usage Guidelines</Heading>

            <div className="grid md:grid-cols-2 gap-8">
              <Card hover={false} className="p-8">
                <h3 className="text-xl font-bold font-display mb-4 text-success-600">✅ Do&apos;s</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Use bright, kid-friendly colors</li>
                  <li>• Apply 3D shadows for depth</li>
                  <li>• Use Fredoka font for headings</li>
                  <li>• Make buttons large and touchable</li>
                  <li>• Include emojis for visual appeal</li>
                  <li>• Use rounded corners (rounded-2xl, rounded-3xl)</li>
                </ul>
              </Card>

              <Card hover={false} className="p-8">
                <h3 className="text-xl font-bold font-display mb-4 text-pink-600">❌ Don&apos;ts</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Avoid small, hard-to-tap elements</li>
                  <li>• Don&apos;t use muted or dark colors</li>
                  <li>• Avoid flat, 2D designs</li>
                  <li>• Don&apos;t overcomplicate interfaces</li>
                  <li>• Avoid tiny fonts or text</li>
                  <li>• Don&apos;t skip the border and shadow effects</li>
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}