'use client';

import { useState, useEffect } from 'react';
import Modal from './modal';
import { Heading, CoreButton } from './design-system';
import { updateKidEmoji } from '../../lib/db';

interface EmojiPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
  kidKey: string;
  currentEmoji?: string;
}

// Fun kid-friendly emoji options
const EMOJI_OPTIONS = [
  '😊', '😄', '🤗', '😎', '🤩', '😇',
  '🦄', '🌟', '⭐', '✨', '🌈', '🎈',
  '🎨', '🎮', '📚', '🎵', '⚽', '🏀',
  '🐶', '🐱', '🦁', '🐼', '🐨', '🦊',
  '🌺', '🌻', '🌸', '🍀', '🌿', '🌹'
];

export default function EmojiPickerModal({
  isOpen,
  onClose,
  onSuccess,
  userId,
  kidKey,
  currentEmoji = '😊'
}: EmojiPickerModalProps) {
  const [selectedEmoji, setSelectedEmoji] = useState(currentEmoji);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset selected emoji when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedEmoji(currentEmoji);
    }
  }, [isOpen, currentEmoji]);

  const handleClose = () => {
    setSelectedEmoji(currentEmoji);
    setIsSubmitting(false);
    onClose();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Update kid emoji in database
      await updateKidEmoji(userId, kidKey, selectedEmoji);

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating kid emoji:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto shadow-brutal">
          🎭
        </div>
        <Heading level={3} size="title" className="text-green-700">
          Pick Your Emoji
        </Heading>
        <p className="text-green-600 mt-2">
          Choose an emoji that represents you!
        </p>
      </div>

      {/* Current Selection Preview */}
      <div className="text-center mb-6">
        <div className="inline-block bg-gradient-to-br from-green-100 to-cyan-100 border-4 border-green-300 rounded-2xl p-4">
          <p className="text-green-600 font-medium text-sm mb-2">Your Current Pick:</p>
          <div className="text-6xl">{selectedEmoji}</div>
        </div>
      </div>

      {/* Emoji Grid */}
      <div className="grid grid-cols-6 gap-2 mb-8 max-h-64 overflow-y-auto">
        {EMOJI_OPTIONS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => setSelectedEmoji(emoji)}
            className={`
              w-12 h-12 rounded-lg border-2 text-2xl hover:scale-110 transition-all
              ${selectedEmoji === emoji
                ? 'border-green-500 bg-green-100 shadow-brutal-sm'
                : 'border-gray-200 hover:border-green-300'
              }
            `}
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Fun Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
        <p className="text-green-600 text-sm text-center">
          <span className="font-medium">✨ Pro Tip:</span> Pick something that makes you smile! You can always change it later.
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
          type="button"
          variant="primary"
          className="flex-1 bg-green-500 hover:bg-green-600"
          onClick={handleSubmit}
          loading={isSubmitting}
        >
          Save My Emoji! {selectedEmoji}
        </CoreButton>
      </div>
    </Modal>
  );
}