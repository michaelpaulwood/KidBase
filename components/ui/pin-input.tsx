'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface PinInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  autoFocus?: boolean;
}

export default function PinInput({
  value,
  onChange,
  length = 4,
  disabled = false,
  error = false,
  className,
  autoFocus = false
}: PinInputProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [lastTypedIndex, setLastTypedIndex] = useState<number | null>(null);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Create array for the PIN digits
  const digits = Array.from({ length }, (_, i) => value[i] || '');

  // Clear last typed index after delay to show dots
  useEffect(() => {
    if (lastTypedIndex !== null) {
      const timeout = setTimeout(() => {
        setLastTypedIndex(null);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [lastTypedIndex]);

  useEffect(() => {
    // Only auto-focus if autoFocus prop is true
    if (autoFocus) {
      const firstEmptyIndex = digits.findIndex(digit => !digit);
      if (firstEmptyIndex !== -1 && inputRefs.current[firstEmptyIndex]) {
        inputRefs.current[firstEmptyIndex]?.focus();
      }
    }
  }, [digits, autoFocus]);

  const handleInputChange = (index: number, inputValue: string) => {
    // Only allow single digits
    const digit = inputValue.replace(/\D/g, '').slice(-1);

    // Update the value
    const newDigits = [...digits];
    newDigits[index] = digit;
    const newValue = newDigits.join('');
    onChange(newValue);

    // Track which digit was just typed for showing actual digit briefly
    if (digit) {
      setLastTypedIndex(index);
    }

    // Auto-focus next input if digit was entered
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      e.preventDefault();

      if (digits[index]) {
        // Clear current digit
        const newDigits = [...digits];
        newDigits[index] = '';
        onChange(newDigits.join(''));
      } else if (index > 0) {
        // Move to previous input and clear it
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        onChange(newDigits.join(''));
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
    // Select all text when focusing
    inputRefs.current[index]?.select();
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(pastedData);

    // Focus the next empty input or the last input
    const targetIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[targetIndex]?.focus();
  };

  return (
    <div className={cn('flex gap-3 justify-center', className)}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={
            digits[index]
              ? (lastTypedIndex === index ? digits[index] : '•')
              : ''
          }
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          onPaste={handlePaste}
          disabled={disabled}
          className={cn(
            // Base styles
            'w-12 h-12 text-center text-xl font-bold',
            'border-4 border-black rounded-xl',
            'shadow-brutal',
            'transition-all duration-200',
            'focus:outline-none',

            // Focus styles
            focusedIndex === index && [
              'border-primary-500',
              'shadow-brutal-lg',
              'bg-primary-50',
              '-translate-x-0.5 -translate-y-0.5'
            ],

            // Error styles
            error && [
              'border-red-500',
              'bg-red-50'
            ],

            // Disabled styles
            disabled && [
              'bg-gray-100',
              'text-gray-400',
              'cursor-not-allowed'
            ],

            // Default styles
            !error && !disabled && focusedIndex !== index && [
              'bg-white',
              'hover:bg-gray-50',
              'hover:-translate-x-0.5 hover:-translate-y-0.5'
            ]
          )}
          aria-label={`PIN digit ${index + 1}`}
        />
      ))}
    </div>
  );
}