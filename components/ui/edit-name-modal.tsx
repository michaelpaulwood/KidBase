'use client';

import { useState, useEffect } from 'react';
import Modal from './modal';
import { Heading, CoreButton } from './design-system';
import Input from './input';
import { updateKidName } from '../../lib/db';

interface EditNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
  kidKey: string;
  currentName: string;
}

export default function EditNameModal({
  isOpen,
  onClose,
  onSuccess,
  userId,
  kidKey,
  currentName
}: EditNameModalProps) {
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
      setError('Please enter kid name');
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
      const errorMessage = error instanceof Error ? error.message : 'Failed to update kid name. Please try again.';
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
          📝
        </div>
        <Heading level={3} size="title">Edit Kid Name</Heading>
        <p className="text-gray-600 mt-2">Update {currentName}&apos;s name</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Kid Name Input */}
        <div>
          <Input
            label="Kid Name"
            type="text"
            value={kidName}
            onChange={(e) => setKidName(e.target.value)}
            placeholder="Enter kid's name"
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
            className="flex-1"
            loading={isSubmitting}
          >
            Update Name
          </CoreButton>
        </div>
      </form>
    </Modal>
  );
}