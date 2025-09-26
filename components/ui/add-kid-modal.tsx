'use client';

import { useState } from 'react';
import Modal from './modal';
import { Heading, CoreButton } from './design-system';
import Input from './input';
import PinInput from './pin-input';
import { hashPin } from '../../lib/utils';
import { saveKidData } from '../../lib/db';

interface AddKidModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
}

export default function AddKidModal({ isOpen, onClose, onSuccess, userId }: AddKidModalProps) {
  const [kidName, setKidName] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setKidName('');
    setPin('');
    setConfirmPin('');
    setError('');
    setIsSubmitting(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Debug logging
    console.log('Form submission:', { kidName, pin, confirmPin, pinLength: pin.length, confirmPinLength: confirmPin.length });

    // Basic validation - match onboarding pattern
    if (!kidName.trim()) {
      setError('Please enter kid name');
      return;
    }

    if (pin !== confirmPin) {
      setError('PINs do not match');
      return;
    }

    setIsSubmitting(true);

    try {
      // Hash the PIN (hashPin function will validate format)
      const pinHash = await hashPin(pin);

      // Save kid data
      await saveKidData(userId, kidName.trim(), pinHash);

      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Error adding kid:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to add kid. Please try again.';
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
          👶
        </div>
        <Heading level={3} size="title">Add New Kid</Heading>
        <p className="text-gray-600 mt-2">Create an account for your child</p>
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
          />
        </div>

        {/* PIN Input */}
        <div>
          <label className="block text-sm font-medium font-sans text-gray-700 mb-2">
            Create 4-Digit PIN
          </label>
          <PinInput
            value={pin}
            onChange={setPin}
            autoFocus={false}
          />
        </div>

        {/* Confirm PIN Input */}
        <div>
          <label className="block text-sm font-medium font-sans text-gray-700 mb-2">
            Confirm PIN
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
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Kid'}
          </CoreButton>
        </div>
      </form>
    </Modal>
  );
}