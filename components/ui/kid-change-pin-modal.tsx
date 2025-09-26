'use client';

import { useState, useEffect } from 'react';
import Modal from './modal';
import { Heading, CoreButton } from './design-system';
import PinInput from './pin-input';
import { hashPin } from '../../lib/utils';
import { updateKidPin } from '../../lib/db';

interface KidChangePinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
  kidKey: string;
  kidName: string;
}

export default function KidChangePinModal({
  isOpen,
  onClose,
  onSuccess,
  userId,
  kidKey,
  kidName
}: KidChangePinModalProps) {
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
      setError('Please enter your current PIN');
      return;
    }

    if (!newPin) {
      setError('Please enter your new PIN');
      return;
    }

    if (newPin !== confirmPin) {
      setError('Your new PINs don\'t match. Try again!');
      return;
    }

    if (currentPin === newPin) {
      setError('Your new PIN must be different from your old one');
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
      const errorMessage = error instanceof Error ? error.message : 'Oops! Something went wrong. Please try again.';
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto shadow-brutal">
          🔐
        </div>
        <Heading level={3} size="title" className="text-orange-700">
          Change My PIN
        </Heading>
        <p className="text-orange-600 mt-2">
          Hi {kidName}! Let&apos;s update your secret code
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current PIN Input */}
        <div>
          <label className="block text-sm font-medium font-sans text-gray-700 mb-2">
            My Current PIN 🔒
          </label>
          <PinInput
            value={currentPin}
            onChange={setCurrentPin}
            autoFocus={true}
          />
        </div>

        {/* New PIN Input */}
        <div>
          <label className="block text-sm font-medium font-sans text-gray-700 mb-2">
            My New 4-Digit PIN ✨
          </label>
          <PinInput
            value={newPin}
            onChange={setNewPin}
            autoFocus={false}
          />
        </div>

        {/* Confirm New PIN Input */}
        <div>
          <label className="block text-sm font-medium font-sans text-gray-700 mb-2">
            Type My New PIN Again 🔁
          </label>
          <PinInput
            value={confirmPin}
            onChange={setConfirmPin}
            autoFocus={false}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Kid-Friendly Security Note */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <p className="text-orange-600 text-sm">
            <span className="font-medium">🛡️ Keep It Safe:</span> Your PIN is super important! Only you should know it. Don&apos;t share it with anyone except your parents.
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
            className="flex-1 bg-orange-500 hover:bg-orange-600"
            loading={isSubmitting}
          >
            Update My PIN! 🔐
          </CoreButton>
        </div>
      </form>
    </Modal>
  );
}