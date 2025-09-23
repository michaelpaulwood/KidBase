'use client';

import { useState, useEffect } from 'react';
import Modal from './modal';
import { Heading, CoreButton } from './design-system';
import PinInput from './pin-input';
import { hashPin } from '../../lib/utils';
import { updateKidPin } from '../../lib/db';

interface ChangePinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
  kidKey: string;
  kidName: string;
}

export default function ChangePinModal({
  isOpen,
  onClose,
  onSuccess,
  userId,
  kidKey,
  kidName
}: ChangePinModalProps) {
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setCurrentPin('');
      setNewPin('');
      setConfirmPin('');
      setError('');
    }
  }, [isOpen]);

  const handleClose = () => {
    setCurrentPin('');
    setNewPin('');
    setConfirmPin('');
    setError('');
    setIsSubmitting(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!currentPin) {
      setError('Please enter current PIN');
      return;
    }

    if (!newPin) {
      setError('Please enter new PIN');
      return;
    }

    if (newPin !== confirmPin) {
      setError('New PIN and confirmation do not match');
      return;
    }

    if (currentPin === newPin) {
      setError('New PIN must be different from current PIN');
      return;
    }

    setIsSubmitting(true);

    try {
      // Hash both current and new PINs
      const currentPinHash = await hashPin(currentPin);
      const newPinHash = await hashPin(newPin);

      // Update kid PIN with verification
      await updateKidPin(userId, kidKey, currentPinHash, newPinHash);

      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Error changing kid PIN:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to change PIN. Please try again.';
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
          🔐
        </div>
        <Heading level={3} size="title">Change PIN</Heading>
        <p className="text-gray-600 mt-2">Update {kidName}&apos;s PIN for security</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current PIN Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current PIN
          </label>
          <PinInput
            value={currentPin}
            onChange={setCurrentPin}
            placeholder="0000"
            autoFocus={true}
          />
        </div>

        {/* New PIN Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New 4-Digit PIN
          </label>
          <PinInput
            value={newPin}
            onChange={setNewPin}
            placeholder="0000"
            autoFocus={false}
          />
        </div>

        {/* Confirm New PIN Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New PIN
          </label>
          <PinInput
            value={confirmPin}
            onChange={setConfirmPin}
            placeholder="0000"
            autoFocus={false}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Security Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-blue-600 text-sm">
            <span className="font-medium">Security Note:</span> You must enter the current PIN to verify your identity before changing it.
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
            className="flex-1"
            loading={isSubmitting}
          >
            Update PIN
          </CoreButton>
        </div>
      </form>
    </Modal>
  );
}