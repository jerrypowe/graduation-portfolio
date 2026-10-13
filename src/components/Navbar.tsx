import React, { useState } from 'react';
import { GraduationCap, Volume2, VolumeX, Image as ImageIcon, Menu, X, Sparkles, MessageSquareHeart } from 'lucide-react';
import { playCelebrationSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface NavbarProps {
  currentPage: 'home' | 'invitation';
  onNavigateHome: () => void;
  onNavigateCreateInvitation: () => void;
  onNavigateWishes: () => void;
  onOpenReference: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigateHome,
  onNavigateCreateInvitation,
  onNavigateWishes,
  onOpenReference,
  soundEnabled,
  onToggleSound
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleQuickCelebrate = () => {
    if (soundEnabled) playCelebrationSound();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.1 },
      colors: ['#FFD027', '#E63946', '#1E232A']
    });
  };

  return (
    <header className="sticky top-0 z-50 px-3 sm:px-6 py-2.5 backdrop-blur-md bg-[#F8F5EE]/90 border-b-2 border-[#1E232A]">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand / Name Tag */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2 group text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-[#FFD027] border-2 border-[#1E232A] flex items-center justify-center font-black text-sm shadow-cutout group-hover:rotate-6 transition-transform">
            🎓
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black font-display tracking-tight text-[#1E232A] leading-none">
              THANH TÚ
            </span>
            <span className="text-[10px] font-mono text-gray-500 font-bold leading-none mt-0.5">
              GRADUATION 2026
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#EBE5D5] p-1 rounded-xl border border-[#1E232A]">
          <button
            onClick={onNavigateHome}
            className={`px-3.5 py-1 rounded-lg text-xs font-mono font-bold transition-all active:scale-95 ${
              currentPage === 'home'
                ? 'bg-[#1E232A] text-[#FFD027] shadow-sm'
                : 'text-gray-800 hover:text-black hover:bg-white/80'
            }`}
          >
            Thiệp chính
          </button>

          <button
            onClick={onNavigateCreateInvitation}
            className={`flex items-center gap-1 px-3.5 py-1 rounded-lg text-xs font-mono font-bold transition-all active:scale-95 ${
              currentPage === 'invitation'
                ? 'bg-[#1E232A] text-[#FFD027] shadow-sm'
                : 'text-gray-800 hover:text-black hover:bg-white/80'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Tạo thiệp riêng</span>
          </button>

          <button
            onClick={onNavigateWishes}
            className="flex items-center gap-1 px-3.5 py-1 rounded-lg text-xs font-mono font-bold text-gray-800 hover:text-black hover:bg-white/80 transition-all active:scale-95"
          >
            <MessageSquareHeart className="w-3 h-3 text-red-500" />
            <span>Gửi lời chúc</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Throw Cap Button */}
          <button
            onClick={handleQuickCelebrate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFD027] hover:bg-[#FACC15] text-[#1E232A] font-bold text-xs border border-[#1E232A] shadow-cutout transition-transform active:translate-y-0.5"
            title="Tung nón & pháo hoa chúc mừng!"
          >
            <GraduationCap className="w-4 h-4" />
            <span className="hidden sm:inline">Tung nón</span>
          </button>

          {/* Reference Poster comparison viewer toggle */}
          <button
            onClick={onOpenReference}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-white hover:bg-gray-100 text-[#1E232A] border border-[#1E232A] text-xs font-mono font-semibold flex items-center gap-1 transition-colors"
            title="Xem ảnh thiệp gốc"
          >
            <ImageIcon className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Ảnh gốc</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-1.5 rounded-xl border border-[#1E232A] text-xs transition-colors ${
              soundEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
            }`}
            title={soundEnabled ? 'Bật âm thanh chúc mừng' : 'Tắt âm thanh'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-xl border border-[#1E232A] bg-white text-gray-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 pt-2 border-t border-[#1E232A]/20 flex flex-col gap-1 pb-2">
          <button
            onClick={() => {
              onNavigateHome();
              setMobileMenuOpen(false);
            }}
            className={`text-left px-3 py-2 rounded-lg text-sm font-mono font-bold ${
              currentPage === 'home' ? 'bg-[#FEF08A]' : 'hover:bg-gray-100'
            }`}
          >
            Thiệp tốt nghiệp chính
          </button>

          <button
            onClick={() => {
              onNavigateCreateInvitation();
              setMobileMenuOpen(false);
            }}
            className={`text-left px-3 py-2 rounded-lg text-sm font-mono font-bold flex items-center gap-2 ${
              currentPage === 'invitation' ? 'bg-[#FEF08A]' : 'hover:bg-gray-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Tạo thiệp của riêng bạn</span>
          </button>

          <button
            onClick={() => {
              onNavigateWishes();
              setMobileMenuOpen(false);
            }}
            className="text-left px-3 py-2 rounded-lg text-sm font-mono font-bold flex items-center gap-2 hover:bg-gray-100"
          >
            <MessageSquareHeart className="w-4 h-4 text-red-500" />
            <span>Gửi lời chúc tốt nghiệp</span>
          </button>
        </div>
      )}
    </header>
  );
};
