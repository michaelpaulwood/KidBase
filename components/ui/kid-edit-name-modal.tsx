'use client';

import { useState, useEffect } from 'react';
import Modal from './modal';
import { Heading, CoreButton } from './design-system';
import Input from './input';
import { updateKidName } from '../../lib/db';

interface KidEditNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
  kidKey: string;
  currentName: string;
}

export default function KidEditNameModal({
  isOpen,
  onClose,
  onSuccess,
  userId,
  kidKey,
  currentName
}: KidEditNameModalProps) {
  const [kidName, setKidName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill the form with current name when modal opens
  useEffect(() => {
    if (isOpen) {
      setKidName(currentName);
      setError('');
    }
  }, [isOpen, currentName]);

  const handleClose = () => {
    setKidName('');
    setError('');
    setIsSubmitting(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!kidName.trim()) {
      setError('Please enter your name');
      return;
    }

    // Check if name actually changed
    if (kidName.trim() === currentName) {
      setError('Please enter a different name');
      return;
    }

    setIsSubmitting(true);

    try {
      // Update kid name
      await updateKidName(userId, kidKey, kidName.trim());

      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Error updating kid name:', error);
      const errorMessage = error instanceof Error ? error.message : 'Oops! Something went wrong. Please try again.';
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto shadow-brutal">
          📝
        </div>
        <Heading level={3} size="title" className="text-blue-700">
          Change My Name
        </Heading>
        <p className="text-blue-600 mt-2">
          What would you like people to call you?
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Kid Name Input */}
        <div>
          <Input
            label="My Name"
            type="text"
            value={kidName}
            onChange={(e) => setKidName(e.target.value)}
            placeholder="Enter your name"
            required
            autoFocus
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Fun Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-blue-600 text-sm">
            <span className="font-medium">Fun Fact:</span> You can change your name anytime you want! Make it something that makes you happy. 😊
          </p>
        </div>

        {/* Buttons */}
        <div className="flex space-x-3">
          <CoreButton
            type="button"
            variant="outline"
            onClick={handleClose}
            className="flex-1"
            disabled={isSubmitting}
          >
            Cancel
          </CoreButton>
          <CoreButton
            type="submit"
            variant="primary"
            className="flex-1 bg-blue-500 hover:bg-blue-600"
            loading={isSubmitting}
          >
            Save My Name! 🎉
          </CoreButton>
        </div>
      </form>
    </Modal>
  );
}