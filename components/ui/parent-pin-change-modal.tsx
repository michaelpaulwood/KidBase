'use client';

import { useState, useEffect } from 'react';
import Modal from './modal';
import { Heading, CoreButton } from './design-system';
import PinInput from './pin-input';
import { hashPin } from '../../lib/utils';
import { updateParentPin } from '../../lib/db';

interface ParentChangePinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
  parentName: string;
}

export default function ParentChangePinModal({
  isOpen,
  onClose,
  onSuccess,
  userId,
  parentName
}: ParentChangePinModalProps) {
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentPin('');
      setNewPin('');
      setConfirmPin('');
      setError('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const validateForm = () => {
    if (!currentPin) {
      setError('Please enter your current PIN');
      return false;
    }
    if (currentPin.length !== 4) {
      setError('Current PIN must be exactly 4 digits');
      return false;
    }
    if (!newPin) {
      setError('Please enter a new PIN');
      return false;
    }
    if (newPin.length !== 4) {
      setError('New PIN must be exactly 4 digits');
      return false;
    }
    if (!confirmPin) {
      setError('Please confirm the new PIN');
      return false;
    }
    if (newPin !== confirmPin) {
      setError('PIN confirmation does not match');
      return false;
    }
    if (currentPin === newPin) {
      setError('New PIN must be different from current PIN');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setError('');

    try {
      // Hash both current and new PINs
      const currentPinHash = await hashPin(currentPin);
      const newPinHash = await hashPin(newPin);

      // Update PIN with current PIN verification (3-step security)
      await updateParentPin(userId, currentPinHash, newPinHash);

      onSuccess();
    } catch (err) {
      console.error('PIN update error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update PIN';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
            🔐
          </div>
          <Heading size="heading" className="text-center">
            Change PIN for {parentName}
          </Heading>
          <p className="text-gray-600 font-sans mt-2">
            For security, you must verify your current PIN first.
          </p>
        </div>

        {/* Current PIN Input */}
        <div>
          <label className="block text-sm font-medium font-sans text-gray-700 mb-2">
            Current 4-Digit PIN
          </label>
          <PinInput
            value={currentPin}
            onChange={setCurrentPin}
            autoFocus={true}
            error={!!error && error.includes('Current')}
          />
        </div>

        {/* New PIN Input */}
        <div>
          <label className="block text-sm font-medium font-sans text-gray-700 mb-2">
            New 4-Digit PIN
          </label>
          <PinInput
            value={newPin}
            onChange={setNewPin}
            autoFocus={false}
            error={!!error && (error.includes('New PIN') || error.includes('different'))}
          />
        </div>

        {/* Confirm PIN Input */}
        <div>
          <label className="block text-sm font-medium font-sans text-gray-700 mb-2">
            Confirm New PIN
          </label>
          <PinInput
            value={confirmPin}
            onChange={setConfirmPin}
            autoFocus={false}
            error={!!error && error.includes('match')}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-2xl font-sans text-sm">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <CoreButton
            type="button"
            variant="outline"
            onClick={onClose}
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
            Change PIN
          </CoreButton>
        </div>
      </form>
    </Modal>
  );
}