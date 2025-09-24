'use client';

import { useState } from 'react';
import Modal from './modal';
import { Heading, CoreButton, Card } from './design-system';
import KidEditNameModal from './kid-edit-name-modal';
import EmojiPickerModal from './emoji-picker-modal';
import KidChangePinModal from './kid-change-pin-modal';

interface KidSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  kidName: string;
  kidKey: string;
  userId: string;
  onRefreshFamily: () => void;
}

export default function KidSettingsModal({
  isOpen,
  onClose,
  kidName,
  kidKey,
  userId,
  onRefreshFamily
}: KidSettingsModalProps) {
  const [activeSubModal, setActiveSubModal] = useState<'name' | 'emoji' | 'pin' | null>(null);

  const handleClose = () => {
    setActiveSubModal(null);
    onClose();
  };

  const handleSubModalClose = () => {
    setActiveSubModal(null);
  };

  const handleSuccess = () => {
    onRefreshFamily();
    setActiveSubModal(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto shadow-brutal">
          🛠️
        </div>
        <Heading level={3} size="title" className="text-purple-700">
          My Settings
        </Heading>
        <p className="text-gray-600 mt-2">
          Hi {kidName}! Let&apos;s customize your profile
        </p>
      </div>

      <div className="space-y-4">
        {/* Change Name Card */}
        <Card className="bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-blue-200" hover={false}>
          <div className="flex items-center space-x-4 p-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl shadow-brutal-sm">
              📝
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-bold text-blue-700 text-lg">Change My Name</h4>
              <p className="text-blue-600 text-sm">Update what people call you</p>
            </div>
            <CoreButton
              variant="primary"
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => setActiveSubModal('name')}
            >
              Edit
            </CoreButton>
          </div>
        </Card>

        {/* Change Emoji Card */}
        <Card className="bg-gradient-to-br from-green-100 to-cyan-100 border-2 border-green-200" hover={false}>
          <div className="flex items-center space-x-4 p-2">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl shadow-brutal-sm">
              🎭
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-bold text-green-700 text-lg">Change My Emoji</h4>
              <p className="text-green-600 text-sm">Pick a fun avatar that represents you</p>
            </div>
            <CoreButton
              variant="primary"
              className="bg-green-500 hover:bg-green-600"
              onClick={() => setActiveSubModal('emoji')}
            >
              Pick
            </CoreButton>
          </div>
        </Card>

        {/* Change PIN Card */}
        <Card className="bg-gradient-to-br from-orange-100 to-pink-100 border-2 border-orange-200" hover={false}>
          <div className="flex items-center space-x-4 p-2">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-2xl shadow-brutal-sm">
              🔐
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-bold text-orange-700 text-lg">Change My PIN</h4>
              <p className="text-orange-600 text-sm">Update your secret 4-digit code</p>
            </div>
            <CoreButton
              variant="primary"
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => setActiveSubModal('pin')}
            >
              Update
            </CoreButton>
          </div>
        </Card>
      </div>

      {/* Close Button */}
      <div className="mt-8">
        <CoreButton
          variant="outline"
          className="w-full"
          onClick={handleClose}
        >
          All Done! 🎉
        </CoreButton>
      </div>

      {/* Sub-modals */}
      <KidEditNameModal
        isOpen={activeSubModal === 'name'}
        onClose={handleSubModalClose}
        onSuccess={handleSuccess}
        userId={userId}
        kidKey={kidKey}
        currentName={kidName}
      />

      <EmojiPickerModal
        isOpen={activeSubModal === 'emoji'}
        onClose={handleSubModalClose}
        onSuccess={handleSuccess}
        userId={userId}
        kidKey={kidKey}
        currentEmoji="😊"
      />

      <KidChangePinModal
        isOpen={activeSubModal === 'pin'}
        onClose={handleSubModalClose}
        onSuccess={handleSuccess}
        userId={userId}
        kidKey={kidKey}
        kidName={kidName}
      />
    </Modal>
  );
}