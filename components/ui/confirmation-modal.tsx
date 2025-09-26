'use client';

import Modal from './modal';
import { Heading, CoreButton } from './design-system';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
  variant = 'danger'
}: ConfirmationModalProps) {
  const getIcon = () => {
    switch (variant) {
      case 'danger':
        return '⚠️';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '⚠️';
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'danger':
        return 'from-red-500 to-red-600';
      case 'warning':
        return 'from-orange-500 to-orange-600';
      case 'info':
        return 'from-blue-500 to-blue-600';
      default:
        return 'from-red-500 to-red-600';
    }
  };

  const getConfirmButtonVariant = (): 'primary' | 'secondary' | 'outline' | 'ghost' => {
    switch (variant) {
      case 'danger':
        return 'primary'; // Will be styled red
      case 'warning':
        return 'primary';
      case 'info':
        return 'primary';
      default:
        return 'primary';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <div className={`w-16 h-16 bg-gradient-to-br ${getIconColor()} rounded-full flex items-center justify-center text-3xl mb-4 mx-auto`}>
          {getIcon()}
        </div>

        <Heading level={3} size="title" className="mb-4">
          {title}
        </Heading>

        <p className="text-gray-600 mb-8 leading-relaxed">
          {message}
        </p>

        <div className="flex space-x-3">
          <CoreButton
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isLoading}
          >
            {cancelText}
          </CoreButton>
          <CoreButton
            type="button"
            variant={getConfirmButtonVariant()}
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 border-4 border-black"
            loading={isLoading}
          >
            {confirmText}
          </CoreButton>
        </div>
      </div>
    </Modal>
  );
}