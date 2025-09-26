'use client';

import { useState, useEffect } from 'react';
import Modal from './modal';
import { Heading, CoreButton } from './design-system';
import PinInput from './pin-input';
import { hashPin } from '../../lib/utils';
import { updateKidPin } from '../../lib/db';

interface ParentChangePinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
  kidKey: string;
  kidName: string;
}

export default function ParentChangePinModal({
  isOpen,
  onClose,
  onSuccess,
  userId,
  kidKey,
  kidName
}: ParentChangePinModalProps) {
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setNewPin('');
      setConfirmPin('');
      setError('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const validateForm = () => {
    if (!newPin) {
      setError('Please enter a new PIN');
      return false;
    }
    if (newPin.length !== 4) {
      setError('PIN must be exactly 4 digits');
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
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setError('');

    try {
      // Hash the new PIN
      const newPinHash = await hashPin(newPin);

      // Update PIN without requiring current PIN verification (parent override)
      await updateKidPin(userId, kidKey, '', newPinHash, false);

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
        <Heading size="heading" className="text-center">
          Reset PIN for {kidName}
        </Heading>

        <div className="space-y-4 text-center">
          <p className="text-gray-600 font-sans">
            As a parent, you can reset {kidName}&apos;s PIN without knowing their current one.
            This is a security feature for when they forget their PIN.
          </p>
        </div>

        {/* New PIN Input */}
        <div>
          <label className="block text-sm font-medium font-sans text-gray-700 mb-2">
            New 4-Digit PIN
          </label>
          <PinInput
            value={newPin}
            onChange={setNewPin}
            autoFocus={true}
            error={!!error && error.includes('PIN')}
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
            Reset PIN
          </CoreButton>
        </div>
      </form>
    </Modal>
  );
}