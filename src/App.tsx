import React, { useState, useEffect } from 'react';
import { defaultProfile } from './data/portfolioData';
import { GraduateProfile } from './types';
import { Navbar } from './components/Navbar';
import { HeroPoster } from './components/HeroPoster';
import { ContactSection } from './components/ContactSection';
import { PersonalizedInvitationPage } from './components/PersonalizedInvitationPage';
import { EditProfileModal } from './components/EditProfileModal';
import { ReferenceModal } from './components/ReferenceModal';
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  // Load profile from localStorage if available, otherwise defaultProfile
  const [profile, setProfile] = useState<GraduateProfile>(() => {
    try {
      const saved = localStorage.getItem('grad_profile_data');
      return saved ? JSON.parse(saved) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  // Custom user uploaded portrait URL
  const [customImageUrl, setCustomImageUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('grad_custom_image') || '';
    } catch {
      return '';
    }
  });

  // Navigation state: 'home' | 'invitation'
  const [currentPage, setCurrentPage] = useState<'home' | 'invitation'>(() => {
    if (typeof window === 'undefined') return 'home';
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash;
    const pathname = window.location.pathname;
    
    if (
      params.has('invitee') || 
      params.has('name') || 
      params.get('page') === 'invitation' ||
      params.get('page') === 'create-invitation' ||
      hash.includes('invitation') ||
      pathname.includes('/invitation') ||
      pathname.includes('/create-invitation')
    ) {
      return 'invitation';
    }
    return 'home';
  });

  // Guest name extracted from URL query or state
  const [guestName, setGuestName] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams(window.location.search);
    return params.get('invitee') || params.get('name') || '';
  });

  // Name to pre-fill into the wishes form
  const [prefilledWishName, setPrefilledWishName] = useState<string>('');

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReferenceModalOpen, setIsReferenceModalOpen] = useState(false);

  // Sync route on popstate / hashchange (back/forward browser buttons)
  useEffect(() => {
    const handleLocationChange = () => {
      const params = new URLSearchParams(window.location.search);
      const hash = window.location.hash;
      const pathname = window.location.pathname;

      const hasInviteeParam = params.has('invitee') || params.has('name');
      const isInvitationRoute = 
        hasInviteeParam || 
        params.get('page') === 'invitation' ||
        params.get('page') === 'create-invitation' ||
        hash.includes('invitation') ||
        pathname.includes('/invitation') ||
        pathname.includes('/create-invitation');

      if (isInvitationRoute) {
        setCurrentPage('invitation');
        const extracted = params.get('invitee') || params.get('name') || '';
        if (extracted) setGuestName(extracted);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Welcome celebration burst on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.3 },
        colors: ['#FFD027', '#E63946', '#1E232A']
      });
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Navigation handlers
  const navigateToHome = () => {
    setCurrentPage('home');
    const url = new URL(window.location.href);
    url.searchParams.delete('page');
    url.searchParams.delete('invitee');
    url.searchParams.delete('name');
    url.hash = '';
    window.history.pushState({}, '', url.pathname + (url.search ? url.search : ''));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCreateInvitation = (initialName: string = '') => {
    setCurrentPage('invitation');
    if (initialName) setGuestName(initialName);
    const url = new URL(window.location.href);
    url.searchParams.set('page', 'invitation');
    if (initialName) url.searchParams.set('invitee', initialName);
    window.history.pushState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToWishes = (fromName?: string) => {
    setCurrentPage('home');
    if (fromName) {
      setPrefilledWishName(fromName);
    }
    const url = new URL(window.location.href);
    url.searchParams.delete('page');
    url.hash = 'contact';
    window.history.pushState({}, '', url.pathname + '#contact');
    
    // Scroll smoothly to contact section
    setTimeout(() => {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSaveProfile = (updated: GraduateProfile) => {
    setProfile(updated);
    try {
      localStorage.setItem('grad_profile_data', JSON.stringify(updated));
    } catch {
      // Storage unavailable or full
    }
  };

  const handleResetProfile = () => {
    setProfile(defaultProfile);
    setCustomImageUrl('');
    try {
      localStorage.removeItem('grad_profile_data');
      localStorage.removeItem('grad_custom_image');
    } catch {
      // Storage unavailable
    }
  };

  const handleCustomImageChange = (url: string) => {
    setCustomImageUrl(url);
    try {
      localStorage.setItem('grad_custom_image', url);
    } catch {
      // Storage unavailable
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#1E232A] flex flex-col selection:bg-[#FFD027]">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigateHome={navigateToHome}
        onNavigateCreateInvitation={() => navigateToCreateInvitation()}
        onNavigateWishes={() => navigateToWishes()}
        onOpenReference={() => setIsReferenceModalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-12 sm:gap-16 pt-4 pb-12">
        {currentPage === 'home' ? (
          <>
            {/* Section 1: Main Graduation Invitation Poster */}
            <HeroPoster
              profile={profile}
              onEditProfile={() => setIsEditModalOpen(true)}
              onNavigateCreateInvitation={() => navigateToCreateInvitation()}
              onNavigateWishes={() => navigateToWishes()}
              customImageUrl={customImageUrl}
              onCustomImageChange={handleCustomImageChange}
            />

            {/* Section 4: Contact & Persistent Graduation Wishes Board */}
            <ContactSection
              profile={profile}
              prefilledName={prefilledWishName}
            />
          </>
        ) : (
          /* Dedicated Page: Personalized Graduation Invitation */
          <PersonalizedInvitationPage
            profile={profile}
            initialGuestName={guestName}
            onNavigateHome={navigateToHome}
            onNavigateWishes={(name) => navigateToWishes(name)}
            customImageUrl={customImageUrl}
          />
        )}
      </main>

      {/* Edit Profile & Customization Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
        onReset={handleResetProfile}
        customImageUrl={customImageUrl}
        onCustomImageChange={handleCustomImageChange}
      />

      {/* Visual Reference Comparison Modal */}
      <ReferenceModal
        isOpen={isReferenceModalOpen}
        onClose={() => setIsReferenceModalOpen(false)}
      />
    </div>
  );
};

export default App;
