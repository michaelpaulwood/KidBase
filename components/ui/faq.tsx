'use client';

import { useState } from 'react';
import { Card, Heading } from './design-system';
import { cn } from '../../lib/utils';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function FAQItem({ question, answer, isOpen = false, onToggle }: FAQItemProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isExpanded = onToggle ? isOpen : internalOpen;
  const handleToggle = onToggle ? onToggle : () => {
    console.log('FAQ clicked, current state:', internalOpen); // Debug log
    setInternalOpen(!internalOpen);
  };

  return (
    <div className="cursor-pointer" onClick={handleToggle}>
      <Card className="transition-all duration-200 hover:shadow-xl">
        <div className="flex justify-between items-start">
          <Heading level={3} size="title" className="pr-8 flex-1">
            {question}
          </Heading>
          <div className={cn(
            "w-8 h-8 bg-gradient-to-br from-warm-500 to-primary-600 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-transform duration-200",
            isExpanded && "rotate-45"
          )}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>
        
        <div className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isExpanded ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
        )}>
          <div className="pt-6 border-t border-gray-200">
            <p className="text-gray-600 leading-relaxed text-lg">{answer}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}