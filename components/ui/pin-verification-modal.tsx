'use client';

import { useState } from 'react';
import { Card, CoreButton, Heading } from './design-system';
import PinInput from './pin-input';

interface PinVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  memberName: string;
  memberType: 'parent' | 'kid';
  pinHash: string;
}

export default function PinVerificationModal({
  isOpen,
  onClose,
  onSuccess,
  memberName,
  memberType,
  pinHash
}: PinVerificationModalProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handlePinChange = (newPin: string) => {
    setPin(newPin);
    setError('');
  };

  const handleVerify = async () => {
    if (pin.length !== 4) {
      setError('Please enter your 4-digit PIN');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      // Import PIN verification function from utils
      const { verifyPin } = await import('../../lib/utils');
      const isValid = await verifyPin(pin, pinHash);

      if (isValid) {
        onSuccess();
      } else {
        setError('Incorrect PIN. Please try again.');
        setPin('');
      }
    } catch (error) {
      console.error('PIN verification error:', error);
      setError('Something went wrong. Please try again.');
      setPin('');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClose = () => {
    setPin('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md" hover={false}>
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-core flex items-center justify-center text-3xl mb-4 mx-auto">
            {memberType === 'parent' ? '👨‍👩‍👦' : memberType === 'kid' ? '👦👧' : '🔐'}
          </div>
          <Heading level={3} size="title" className="mb-2">
            Enter PIN for {memberName}
          </Heading>
          <p className="text-gray-600">
            {memberType === 'parent' ? 'Parent account access' : 'Kid account access'}
          </p>
        </div>

        <div className="mb-6">
          <PinInput
            value={pin}
            onChange={handlePinChange}
            error={!!error}
            disabled={isVerifying}
          />
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <CoreButton
            variant="outline"
            onClick={handleClose}
            className="flex-1"
            disabled={isVerifying}
          >
            Cancel
          </CoreButton>
          <CoreButton
            variant="primary"
            onClick={handleVerify}
            className="flex-1"
            disabled={pin.length !== 4 || isVerifying}
          >
            {isVerifying ? 'Verifying...' : 'Enter Account'}
          </CoreButton>
        </div>
      </Card>
    </div>
  );
}