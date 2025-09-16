import React from 'react';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  href?: string;
}

const sizeMap = {
  xs: 'clamp(1.5rem, 4vw, 2rem)',   // Extra small for navbar
  sm: 'clamp(2rem, 6vw, 3rem)',     // Small version
  md: 'clamp(2.5rem, 8vw, 4rem)',   // Medium version
  lg: 'clamp(3rem, 10vw, 6rem)',    // Elements page size
  xl: 'clamp(3.5rem, 12vw, 8rem)'   // Landing page hero size
};

export default function Logo({ size = 'lg', className = '', href }: LogoProps) {
  const logoElement = (
    <div
      className={`bg-gradient-to-r from-primary-600 via-pink-500 to-orange-500 bg-clip-text text-transparent font-black font-display leading-none -mb-2 ${className}`}
      style={{ fontSize: sizeMap[size] }}
    >
      KidBase
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="inline-block hover:opacity-80 transition-opacity"
      >
        {logoElement}
      </a>
    );
  }

  return logoElement;
}