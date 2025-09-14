'use client';

import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

// Core Container Component
interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('max-w-7xl mx-auto px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}

// Core Section Component
interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'default' | 'warm' | 'cool' | 'white';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Section({ 
  children, 
  className, 
  background = 'default',
  padding = 'lg'
}: SectionProps) {
  const backgroundClasses = {
    default: 'bg-core-gradient',
    warm: 'bg-warm-gradient', 
    cool: 'bg-cool-gradient',
    white: 'bg-white'
  };

  const paddingClasses = {
    sm: 'py-12',
    md: 'py-16', 
    lg: 'py-24',
    xl: 'py-32'
  };

  return (
    <section className={cn(
      backgroundClasses[background],
      paddingClasses[padding],
      className
    )}>
      {children}
    </section>
  );
}

// Core Heading Component
interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  size?: 'hero' | 'display' | 'heading' | 'title';
  className?: string;
  gradient?: boolean;
}

export function Heading({ 
  children, 
  level = 1, 
  size = 'heading',
  className,
  gradient = false
}: HeadingProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  
  const sizeClasses = {
    hero: 'text-hero',
    display: 'text-display', 
    heading: 'text-heading',
    title: 'text-2xl font-bold'
  };

  const gradientClass = gradient 
    ? 'bg-gradient-to-r from-primary-500 to-warm-500 bg-clip-text text-transparent'
    : 'text-gray-900';

  return (
    <Component className={cn(
      sizeClasses[size],
      gradientClass,
      'font-black',
      className
    )}>
      {children}
    </Component>
  );
}

// Core Card Component
interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ 
  children, 
  className, 
  hover = true,
  padding = 'lg'
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div className={cn(
      'bg-white border border-gray-200 rounded-core shadow-core',
      hover && 'hover:shadow-core-lg transition-all duration-200 hover:scale-105',
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  );
}

// Core Badge Component
interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  className?: string;
}

export function Badge({ 
  children, 
  variant = 'primary',
  className 
}: BadgeProps) {
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-warm-100 text-warm-800'
  };

  return (
    <div className={cn(
      'inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold',
      variantClasses[variant],
      className
    )}>
      {children}
    </div>
  );
}

// Core Button Component (Enhanced)
interface CoreButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function CoreButton({ 
  children, 
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  type = 'button',
  disabled = false
}: CoreButtonProps) {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-500 to-warm-500 hover:from-primary-600 hover:to-warm-600 text-white shadow-lg',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white shadow-lg',
    outline: 'border-2 border-gray-300 hover:border-primary-500 hover:text-primary-600 bg-white',
    ghost: 'hover:bg-gray-100 text-gray-700 hover:text-primary-600'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'font-semibold rounded-core transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  );
}

// Core Input Component  
interface CoreInputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
  error?: string;
}

export function CoreInput({
  label,
  placeholder,
  type = 'text',
  required = false,
  className,
  error
}: CoreInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className={cn(
          'w-full px-4 py-3 border border-gray-300 rounded-card focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}

// Step Component for How It Works
interface StepProps {
  step: string;
  title: string;
  description: string;
  icon: string;
  className?: string;
}

export function Step({ step, title, description, icon, className }: StepProps) {
  return (
    <Card className={cn('flex items-center gap-6 min-h-[120px] py-6 shadow-lg', className)}>
      <div className="flex-shrink-0 flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-warm-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {step}
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </Card>
  );
}