import { ReactNode } from 'react';

interface LoadingProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  overlay?: boolean;
  className?: string;
  color?: 'blue' | 'white' | 'gray';
}

interface LoadingOverlayProps {
  isLoading: boolean;
  children: ReactNode;
  text?: string;
  size?: LoadingProps['size'];
}

interface LoadingSkeletonProps {
  className?: string;
  rows?: number;
}

export default function Loading({ 
  size = 'md', 
  text, 
  overlay = false, 
  className = '',
  color = 'blue'
}: LoadingProps) {
  const sizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const colors = {
    blue: 'text-blue-600',
    white: 'text-white',
    gray: 'text-gray-600'
  };

  const spinner = (
    <svg 
      className={`animate-spin ${colors[color]} ${sizes[size]}`}
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4" 
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
      />
    </svg>
  );

  const content = (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      {spinner}
      {text && (
        <p className={`text-sm ${color === 'white' ? 'text-white' : 'text-gray-600'}`}>
          {text}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6">
          {content}
        </div>
      </div>
    );
  }

  return content;
}

export function LoadingOverlay({ isLoading, children, text, size }: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
          <Loading size={size} text={text} />
        </div>
      )}
    </div>
  );
}

export function LoadingSkeleton({ className = '', rows = 3 }: LoadingSkeletonProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="bg-gray-200 rounded h-4 mb-3 w-full last:mb-0" />
      ))}
    </div>
  );
}

interface LoadingButtonProps {
  isLoading: boolean;
  children: ReactNode;
  [key: string]: unknown;
}

export function LoadingButton({ isLoading, children, ...props }: LoadingButtonProps) {
  return (
    <button disabled={isLoading} {...props}>
      <div className="flex items-center justify-center space-x-2">
        {isLoading && <Loading size="sm" color="white" />}
        <span>{children}</span>
      </div>
    </button>
  );
}