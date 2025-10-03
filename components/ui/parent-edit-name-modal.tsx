'use client';

import { useState, useEffect } from 'react';
import Modal from './modal';
import { Heading, CoreButton } from './design-system';
import Input from './input';
import { updateParentName } from '../../lib/db';

interface ParentEditNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
  currentName: string;
}

export default function ParentEditNameModal({
  isOpen,
  onClose,
  onSuccess,
  userId,
  currentName
}: ParentEditNameModalProps) {
  const [parentName, setParentName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill the form with current name when modal opens
  useEffect(() => {
    if (isOpen) {
      setParentName(currentName);
      setError('');
    }
  }, [isOpen, currentName]);

  const handleClose = () => {
    setParentName('');
    setError('');
    setIsSubmitting(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!parentName.trim()) {
      setError('Please enter parent name');
      return;
    }

    // Check if name actually changed
    if (parentName.trim() === currentName) {
      setError('Please enter a different name');
      return;
    }

    setIsSubmitting(true);

    try {
      // Update parent name
      await updateParentName(userId, parentName.trim());

      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Error updating parent name:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update parent name. Please try again.';
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
          📝
        </div>
        <Heading level={3} size="title">Edit Parent Name</Heading>
        <p className="text-gray-600 mt-2">Update your family name</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Parent Name Input */}
        <div>
          <Input
            label="Parent Name"
            type="text"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            placeholder="Enter parent's name"
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