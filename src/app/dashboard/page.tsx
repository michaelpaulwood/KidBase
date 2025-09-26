'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container, Section, Heading, Card, CoreButton, Badge, ConfirmationModal } from '../../../components/ui/design-system';
import Loading from '../../../components/ui/loading';
import Logo from '../../../components/ui/logo';
import AddKidModal from '../../../components/ui/add-kid-modal';
import EditNameModal from '../../../components/ui/edit-name-modal';
import ParentChangePinModal from '../../../components/ui/parent-change-pin-modal';
import { useAuth } from '../../../hooks/useAuth';
import { deleteKidData } from '../../../lib/db';

export default function Dashboard() {
  const { user, loading, signOut, refreshUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAddKidModalOpen, setIsAddKidModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [kidToDelete, setKidToDelete] = useState<{ key: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditNameModalOpen, setIsEditNameModalOpen] = useState(false);
  const [kidToEdit, setKidToEdit] = useState<{ key: string; name: string } | null>(null);
  const [isChangePinModalOpen, setIsChangePinModalOpen] = useState(false);
  const [kidToChangePin, setKidToChangePin] = useState<{ key: string; name: string } | null>(null);

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  // Redirect to onboarding if not completed
  useEffect(() => {
    if (!loading && user && !user.onboardingComplete) {
      router.push('/onboarding');
    }
  }, [user, loading, router]);

  // Phase 2: Redirect to family member selection if no user selected
  // Bypass with ?direct=true for testing current dashboard
  useEffect(() => {
    const isDirect = searchParams.get('direct') === 'true';
    const hasSelectedUser = sessionStorage.getItem('selectedFamilyMember');

    if (!loading && user && user.onboardingComplete && !hasSelectedUser && !isDirect) {
      router.push('/family-select');
    }
  }, [user, loading, router, searchParams]);

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      try {
        // Clear selected family member on logout
        sessionStorage.removeItem('selectedFamilyMember');
        await signOut();
        router.push('/');
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
  };

  const handleEditProfile = () => {
    alert('Edit profile functionality will be implemented with Firebase');
  };

  const handleSwitchUser = () => {
    // Clear selected family member and go back to family select
    sessionStorage.removeItem('selectedFamilyMember');
    router.push('/family-select');
  };

  const handleDeleteKid = (kidKey: string, kidName: string) => {
    setKidToDelete({ key: kidKey, name: kidName });
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!kidToDelete || !user) return;

    setIsDeleting(true);
    try {
      await deleteKidData(user.uid, kidToDelete.key);
      await refreshUser();
      setIsDeleteModalOpen(false);
      setKidToDelete(null);
    } catch (error) {
      console.error('Error deleting kid:', error);
      alert('Failed to delete kid. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setKidToDelete(null);
  };

  const handleEditKidName = (kidKey: string, kidName: string) => {
    setKidToEdit({ key: kidKey, name: kidName });
    setIsEditNameModalOpen(true);
  };

  const handleEditNameSuccess = async () => {
    // Refresh family data to show the updated name
    await refreshUser();
    setIsEditNameModalOpen(false);
    setKidToEdit(null);
  };

  const handleCancelEditName = () => {
    setIsEditNameModalOpen(false);
    setKidToEdit(null);
  };

  const handleChangeKidPin = (kidKey: string, kidName: string) => {
    setKidToChangePin({ key: kidKey, name: kidName });
    setIsChangePinModalOpen(true);
  };

  const handleChangePinSuccess = async () => {
    // Refresh family data (PIN changes are internal, UI doesn't need to update)
    await refreshUser();
    setIsChangePinModalOpen(false);
    setKidToChangePin(null);
  };

  const handleCancelChangePin = () => {
    setIsChangePinModalOpen(false);
    setKidToChangePin(null);
  };

  // Show loading while checking auth state
  if (loading) {
    return (
      <main className="min-h-screen  flex items-center justify-center">
        <Loading size="lg" text="Loading your dashboard..." />
      </main>
    );
  }

  // Don't render anything if user is not authenticated (will redirect)
  if (!user) {
    return null;
  }

  // Don't render anything if onboarding is not complete (will redirect)
  if (!user.onboardingComplete) {
    return null;
  }

  return (
    <main className="min-h-screen ">
      {/* Navigation Header */}
      <nav className="bg-white/90 backdrop-blur-sm border-b border-primary-100 sticky top-0 z-40">
        <Container>
          <div className="flex justify-between items-center py-6">
            <Logo size="xs" href="/" />
            <div className="flex items-center space-x-3 sm:space-x-4">
              <CoreButton variant="outline" onClick={handleSwitchUser} className="text-xs sm:text-sm">
                Switch User
              </CoreButton>
              <CoreButton variant="outline" onClick={handleLogout} className="text-xs sm:text-sm">
                Logout
              </CoreButton>
            </div>
          </div>
        </Container>
      </nav>

      <Section background="default" padding="lg">
        <Container>
          {/* Welcome Header */}
          <div className="text-center mb-16">
            <Heading level={1} size="display" className="mb-4">
              Hi, {user.displayName || 'Family'} family! 👋
            </Heading>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your account to get in.
            </p>
          </div>

          {/* Kids Management Section */}
          <div className="max-w-2xl mx-auto mb-8">
            <Card hover={false}>
              <Heading level={3} size="title" className="mb-6">Kids Management</Heading>

              {user.kids && Object.keys(user.kids).length > 0 ? (
                <div className="space-y-4 mb-6">
                  {Object.entries(user.kids).map(([kidKey, kidData], index) => (
                    <div key={kidKey} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">
                          {index % 2 === 0 ? '👧' : '👦'}
                        </span>
                        <div>
                          <Heading level={4} size="title" className="mb-0">{kidData.name}</Heading>
                          <p className="text-sm text-gray-500">Created {new Date(kidData.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          className="text-blue-600 hover:text-blue-800 text-xl transition-colors"
                          title="Edit kid name"
                          onClick={() => handleEditKidName(kidKey, kidData.name)}
                        >
                          📝
                        </button>
                        <button
                          className="text-green-600 hover:text-green-800 text-xl transition-colors"
                          title="Change PIN"
                          onClick={() => handleChangeKidPin(kidKey, kidData.name)}
                        >
                          🔐
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 text-xl transition-colors"
                          title="Delete kid"
                          onClick={() => handleDeleteKid(kidKey, kidData.name)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 mb-6">
                  <div className="text-6xl mb-4">👶</div>
                  <p className="text-gray-500 mb-4">No kids added yet</p>
                  <p className="text-sm text-gray-400">Add your first kid to get started!</p>
                </div>
              )}

              <CoreButton variant="primary" onClick={() => setIsAddKidModalOpen(true)} className="w-full sm:w-auto">
                Add Kid
              </CoreButton>
            </Card>
          </div>

          {/* Profile Section */}
          <div className="max-w-2xl mx-auto mb-16">
            {/* Profile Section */}
            <Card hover={false}>
              <Heading level={3} size="title" className="mb-6">Profile Information</Heading>
              
              <div className="flex items-start space-x-6 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-warm-500 rounded-core flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="flex-1">
                  <Heading level={4} size="title" className="mb-1">{user.displayName || 'User'}</Heading>
                  <p className="text-gray-600 mb-3">{user.email}</p>
                  <Badge variant="success">Active Account</Badge>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                  <p className="text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Login</label>
                  <p className="text-gray-900">
                    {new Date(user.lastLoginAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <CoreButton variant="outline" onClick={handleEditProfile} className="w-full sm:w-auto">
                Edit Profile
              </CoreButton>
            </Card>

          </div>

        </Container>
      </Section>

      {/* Add Kid Modal */}
      {user && (
        <AddKidModal
          isOpen={isAddKidModalOpen}
          onClose={() => setIsAddKidModalOpen(false)}
          onSuccess={async () => {
            // Refresh family data to show the new kid
            await refreshUser();
            console.log('Kid added successfully!');
          }}
          userId={user.uid}
        />
      )}

      {/* Edit Kid Name Modal */}
      {user && kidToEdit && (
        <EditNameModal
          isOpen={isEditNameModalOpen}
          onClose={handleCancelEditName}
          onSuccess={handleEditNameSuccess}
          userId={user.uid}
          kidKey={kidToEdit.key}
          currentName={kidToEdit.name}
        />
      )}

      {/* Change Kid PIN Modal */}
      {user && kidToChangePin && (
        <ParentChangePinModal
          isOpen={isChangePinModalOpen}
          onClose={handleCancelChangePin}
          onSuccess={handleChangePinSuccess}
          userId={user.uid}
          kidKey={kidToChangePin.key}
          kidName={kidToChangePin.name}
        />
      )}

      {/* Delete Kid Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Kid Account"
        message={`Are you sure you want to delete ${kidToDelete?.name}'s account? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
        variant="danger"
      />
    </main>
  );
}