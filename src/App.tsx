import React, { useState, useEffect } from 'react';
import { defaultProfile, sampleProjects, skillCategories } from './data/portfolioData';
import { GraduateProfile } from './types';
import { Navbar } from './components/Navbar';
import { HeroPoster } from './components/HeroPoster';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
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

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReferenceModalOpen, setIsReferenceModalOpen] = useState(false);

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
        onOpenReference={() => setIsReferenceModalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Main Single Page Portfolio Content */}
      <main className="flex-1 flex flex-col gap-12 sm:gap-16 pt-4 pb-12">
        {/* A. Hero: Interactive Graduation Poster */}
        <HeroPoster
          profile={profile}
          onEditProfile={() => setIsEditModalOpen(true)}
          customImageUrl={customImageUrl}
          onCustomImageChange={handleCustomImageChange}
        />

        {/* B. About Me: Editorial Notebook Spread */}
        <AboutSection profile={profile} />

        {/* C. Featured Projects: Pinned Scrapbook Cards */}
        <ProjectsSection projects={sampleProjects} />

        {/* D. Technical Skills: Paper Labels & Badges */}
        <SkillsSection categories={skillCategories} />

        {/* E. Contact & Interactive Graduation Wishes Board */}
        <ContactSection profile={profile} />
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
