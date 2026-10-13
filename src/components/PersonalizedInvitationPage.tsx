import React, { useState, useEffect } from 'react';
import { GraduateProfile } from '../types';
import { NotebookSpirals } from './NotebookSpirals';
import {
  GradCapDoodle,
  PenToolDoodle,
  RocketPencilDoodle,
  ZigzagDoodle,
  IllustratedGraduateDoodle,
  HalftoneHandHoldingPhone,
  WashiTape,
  StampBadge
} from './Doodles';
import { GraduatePortrait } from './GraduatePortrait';
import { playCelebrationSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Share2, 
  Check, 
  ArrowLeft, 
  MessageSquareHeart, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  GraduationCap,
  Copy,
  UserCheck
} from 'lucide-react';

interface PersonalizedInvitationPageProps {
  profile: GraduateProfile;
  initialGuestName?: string;
  onNavigateHome: () => void;
  onNavigateWishes: (prefilledName?: string) => void;
  customImageUrl?: string;
}

export const PersonalizedInvitationPage: React.FC<PersonalizedInvitationPageProps> = ({
  profile,
  initialGuestName = '',
  onNavigateHome,
  onNavigateWishes,
  customImageUrl
}) => {
  const [inputName, setInputName] = useState(initialGuestName);
  const [activeGuestName, setActiveGuestName] = useState(
    initialGuestName.trim() ? initialGuestName.trim() : 'Bạn thân mến'
  );
  const [copiedLink, setCopiedLink] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Synchronize when initialGuestName prop changes from URL
  useEffect(() => {
    if (initialGuestName.trim()) {
      setInputName(initialGuestName.trim());
      setActiveGuestName(initialGuestName.trim());
    }
  }, [initialGuestName]);

  const handleCreateInvitation = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = inputName.trim();

    if (!cleanName) {
      setErrorMsg('Vui lòng nhập tên hoặc biệt danh của bạn!');
      return;
    }

    if (cleanName.length > 40) {
      setErrorMsg('Tên không được vượt quá 40 ký tự.');
      return;
    }

    setErrorMsg('');
    setActiveGuestName(cleanName);

    // Update browser URL query parameter without full reload
    const url = new URL(window.location.href);
    url.searchParams.set('invitee', cleanName);
    window.history.replaceState({}, '', url.toString());

    // Confetti and sound celebration
    playCelebrationSound();
    confetti({
      particleCount: 70,
      spread: 65,
      origin: { y: 0.5 },
      colors: ['#FFD027', '#E63946', '#1E232A', '#3B82F6']
    });
  };

  const getShareableUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('invitee', activeGuestName);
    return url.toString();
  };

  const handleCopyLink = () => {
    const shareUrl = getShareableUrl();
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);

    confetti({
      particleCount: 25,
      spread: 40,
      origin: { y: 0.3 }
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-6 flex flex-col gap-8">
      
      {/* Top Navigation & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-gray-100 text-[#1E232A] border-2 border-[#1E232A] font-mono text-xs font-bold shadow-cutout transition-transform active:translate-y-0.5 active:shadow-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Trang chính</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateWishes(activeGuestName)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFD027] hover:bg-[#FACC15] text-[#1E232A] border-2 border-[#1E232A] font-bold text-xs shadow-cutout transition-transform active:translate-y-0.5 active:shadow-none"
          >
            <MessageSquareHeart className="w-4 h-4 text-red-600" />
            <span>Gửi lời chúc đến {profile.name}</span>
          </button>
        </div>
      </div>

      {/* Input Generator Card */}
      <div className="relative bg-[#FFFDF5] p-5 sm:p-7 rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-[#1E232A] shadow-cutout-lg">
        <div className="absolute -top-3.5 left-10">
          <WashiTape color="yellow" className="w-28 h-5" angle="-rotate-1" />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#E63946] uppercase block">
              TẠO THIỆP MỜI CÁ NHÂN HÓA
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-[#1E232A] mt-0.5">
              Thiệp Tốt Nghiệp Dành Riêng Cho Bạn
            </h2>
            <p className="text-xs sm:text-sm text-gray-700 mt-1 font-sans">
              Nhập tên hoặc biệt danh của bạn bên dưới để tạo phiên bản thiệp mời tốt nghiệp độc quyền từ <strong>{profile.name}</strong> và sao chép liên kết chia sẻ cho bạn bè!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleCreateInvitation} className="w-full md:w-auto flex-1 max-w-md">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono font-bold text-gray-800 uppercase flex items-center justify-between">
                <span>Tên của bạn / Khách mời:</span>
                <span className="text-[10px] text-gray-500 font-mono">
                  {inputName.length}/40 ký tự
                </span>
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={40}
                  required
                  placeholder="Ví dụ: Hoàng Nam, Khánh Linh, Nhóm Bạn Thân..."
                  value={inputName}
                  onChange={(e) => {
                    setInputName(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border-2 border-[#1E232A] bg-white text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#FFD027]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#1E232A] hover:bg-black text-[#FFD027] font-bold text-xs sm:text-sm shadow-cutout transition-transform active:translate-y-0.5 active:shadow-none whitespace-nowrap flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tạo thiệp</span>
                </button>
              </div>

              {errorMsg && (
                <p className="text-xs text-red-600 font-mono mt-1 font-bold">
                  ⚠️ {errorMsg}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Share & Copy Link Action Bar */}
        <div className="mt-5 pt-4 border-t-2 border-dashed border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-gray-700 font-mono">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>Đang hiển thị cho: <strong className="text-black bg-[#FEF08A] px-2 py-0.5 rounded">{activeGuestName}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-gray-100 text-[#1E232A] border border-[#1E232A] font-mono text-xs font-bold shadow-sm transition-transform active:scale-95"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Đã sao chép liên kết!' : 'Sao chép link thiệp'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* THE PERSONALIZED GRADUATION POSTER SHEET                                  */}
      {/* ========================================================================= */}
      <div className="relative bg-graph-paper rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-[#1E232A] shadow-cutout-lg overflow-hidden">
        
        {/* Top Spiral Notebook Binding */}
        <NotebookSpirals holesCount={22} />

        {/* Personalized Header Ribbon */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-2 border-b border-[#E2DCD2] bg-[#FAF6EC]/80 text-xs font-mono">
          <span className="text-gray-600">OFFICIAL INVITATION • GUEST EDITION</span>
          <span className="text-[#E63946] font-bold">DÀNH RIÊNG CHO: {activeGuestName}</span>
        </div>

        {/* Poster Content Area */}
        <div className="relative p-4 sm:p-8 md:p-12 overflow-hidden">
          
          {/* Top Floating Celebratory Doodles */}
          <div className="absolute top-10 left-6 pointer-events-none opacity-80 hidden sm:block">
            <IllustratedGraduateDoodle className="w-24 h-24" pose="toss" />
          </div>
          <div className="absolute top-10 right-6 pointer-events-none opacity-80 hidden sm:block">
            <IllustratedGraduateDoodle className="w-24 h-24" pose="cheer" />
          </div>

          {/* Header Typography */}
          <div className="text-center relative z-20 mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1E232A] text-white rounded-md text-[11px] font-mono tracking-widest uppercase mb-2 shadow-sm">
              <Sparkles className="w-3 h-3 text-[#FFD027]" />
              <span>LỄ TỐT NGHIỆP • CLASS OF {profile.gradYear}</span>
              <Sparkles className="w-3 h-3 text-[#FFD027]" />
            </div>

            {/* "HAPPY" */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-[0.25em] text-[#1E232A] uppercase leading-none">
              HAPPY
            </h1>

            {/* "GRADUATION" */}
            <div className="relative inline-block mt-1 sm:mt-2">
              <span className="text-4xl sm:text-7xl md:text-8xl font-black font-display tracking-tight text-[#1E232A] uppercase block select-none">
                GRADUATION
              </span>
              <div className="h-1.5 sm:h-2 w-full bg-[#FFD027] rounded-full mt-1 border border-[#1E232A]" />
            </div>

            {/* Graduate Name (Thanh Tú - remains graduate) */}
            <div className="mt-2 sm:mt-3 relative inline-block">
              <span
                className="text-4xl sm:text-6xl md:text-7xl font-bold font-handwriting text-[#1C3D5A] tracking-wider block drop-shadow transform -rotate-1 select-none"
                style={{ textShadow: '2px 2px 0px rgba(255,208,39,0.5)' }}
              >
                {profile.handwrittenName || profile.name}
              </span>
            </div>

            <p className="mt-2 text-sm sm:text-lg font-semibold text-gray-700 font-sans tracking-wide">
              {profile.role} <span className="text-[#E63946] mx-1">•</span> {profile.degree}
            </p>
          </div>

          {/* 3-Column Poster Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20">

            {/* -------------------------------------------------------- */}
            {/* LEFT COLUMN: THE PERSONALIZED GUEST INVITATION CARD      */}
            {/* -------------------------------------------------------- */}
            <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
              
              {/* Highlighted Personalized Guest Card */}
              <div className="relative bg-[#FFFDF5] p-5 sm:p-6 rounded-2xl border-3 border-[#1E232A] shadow-cutout-lg rotate-[-1.5deg]">
                <div className="absolute -top-3.5 left-8">
                  <WashiTape color="red" className="w-20 h-5" angle="-rotate-2" />
                </div>

                <p className="text-sm font-handwriting text-gray-600 text-xl">Thân mời</p>
                
                {/* GUEST NAME prominently highlighted as the invited guest! */}
                <h3 className="text-2xl sm:text-3xl font-black text-[#1E232A] font-display mt-0.5 break-words">
                  Bạn <span className="bg-[#FEF08A] px-1.5 py-0.5 rounded border-b-2 border-dashed border-[#1E232A]">{activeGuestName}</span>
                </h3>

                <p className="text-xs sm:text-sm text-gray-800 mt-2.5 font-handwriting text-lg leading-snug">
                  đến tham dự buổi lễ tốt nghiệp của mình và cùng chung vui, chụp những tấm hình kỷ niệm thật đẹp nhé!
                </p>

                {/* Personal Thank You Note */}
                <div className="mt-4 pt-3 border-t-2 border-dashed border-gray-300">
                  <div className="p-3 rounded-xl bg-[#FEF9C3]/70 border border-yellow-300 text-xs font-sans text-yellow-950 leading-relaxed">
                    <span className="font-bold block mb-1">💌 Lời nhắn từ {profile.name}:</span>
                    "Cảm ơn {activeGuestName} đã luôn là một người bạn tuyệt vời. Sự hiện diện của bạn trong ngày tốt nghiệp là niềm vui rất lớn đối với mình!"
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs font-mono text-gray-600 pt-2 border-t border-gray-200">
                  <span>FB: {profile.facebook.replace('https://facebook.com/', '')}</span>
                  <span className="bg-[#1E232A] text-[#FFD027] px-2 py-0.5 rounded font-bold">VIP GUEST</span>
                </div>
              </div>

              {/* Graphic Vector Pen & Note */}
              <div className="flex items-center gap-3 px-2">
                <PenToolDoodle className="w-14 h-14" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono text-gray-500 uppercase">Khách mời đặc biệt</span>
                  <span className="text-xs font-bold text-[#1E232A]">{activeGuestName}</span>
                </div>
              </div>

              {/* Quick wishing CTA */}
              <button
                onClick={() => onNavigateWishes(activeGuestName)}
                className="p-3.5 rounded-xl bg-[#FEF08A] hover:bg-[#FDE047] border-2 border-[#1E232A] shadow-sm font-sans text-xs font-bold text-yellow-950 flex items-center justify-between transition-transform active:scale-95"
              >
                <span>✍️ Để lại lời chúc cho {profile.name}</span>
                <span>→</span>
              </button>

            </div>

            {/* -------------------------------------------------------- */}
            {/* CENTER COLUMN: Central Smartphone + Portrait + Halftone  */}
            {/* -------------------------------------------------------- */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2 my-2">
              
              {/* Floating Cap */}
              <div className="relative z-30 -mb-6 animate-float-medium">
                <GradCapDoodle className="w-20 sm:w-24 h-16 sm:h-20" />
              </div>

              <div className="relative">
                <HalftoneHandHoldingPhone>
                  <GraduatePortrait customImageUrl={customImageUrl} />
                </HalftoneHandHoldingPhone>
              </div>

              <div className="relative mt-4 z-20">
                <RocketPencilDoodle className="w-12 h-12" />
              </div>
            </div>

            {/* -------------------------------------------------------- */}
            {/* RIGHT COLUMN: University Block, Date & Time               */}
            {/* -------------------------------------------------------- */}
            <div className="lg:col-span-4 flex flex-col gap-6 order-3">
              
              {/* University Stamp Card */}
              <div className="relative bg-[#FFFDF5] p-5 rounded-xl border-2 border-[#1E232A] shadow-cutout rotate-[1.5deg]">
                <div className="absolute -top-3 right-6">
                  <WashiTape color="blue" className="w-16 h-4" angle="rotate-3" />
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="w-5 h-5 text-[#E63946]" />
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gray-500">ĐỊA ĐIỂM TỔ CHỨC</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#1E232A] font-display uppercase tracking-tight">
                  {profile.university}
                </h3>
                
                <div className="mt-2 flex items-start gap-1.5 text-xs text-gray-700 leading-snug">
                  <MapPin className="w-4 h-4 shrink-0 text-gray-500 mt-0.5" />
                  <span>{profile.address}</span>
                </div>

                <div className="mt-3 pt-3 border-t border-dashed border-gray-300 flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1 text-gray-700">
                    <Phone className="w-3.5 h-3.5 text-green-600" />
                    <span>{profile.phone}</span>
                  </span>
                </div>
              </div>

              {/* Ceremony Date & Time Poster Block */}
              <div className="relative bg-[#FAF5E6] p-4 rounded-xl border-2 border-[#1E232A] shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono text-gray-500 uppercase">
                  <Calendar className="w-3.5 h-3.5 text-red-600" />
                  <span>THỜI GIAN BUỔI LỄ</span>
                </div>
                
                <div className="text-2xl sm:text-3xl font-black font-display text-[#1E232A] tracking-tight">
                  {profile.date}
                </div>

                <div className="mt-1 flex items-center gap-2 text-xl sm:text-2xl font-black font-mono text-[#E63946]">
                  <Clock className="w-5 h-5" />
                  <span>{profile.time}</span>
                </div>

                <div className="mt-3">
                  <ZigzagDoodle className="w-20 h-4 text-gray-400" />
                </div>
              </div>

              {/* Rubber Stamp Seal */}
              <div className="flex justify-end pr-2">
                <StampBadge
                  text="VERIFIED GRADUATE"
                  subtext="FPT UNIVERSITY"
                  year={profile.gradYear}
                  className="scale-90"
                />
              </div>

            </div>

          </div>

          {/* Bottom Share Toolbar */}
          <div className="mt-12 text-center flex flex-wrap items-center justify-center gap-4 relative z-20 pt-6 border-t-2 border-dashed border-[#D5CDBE]">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E232A] hover:bg-black text-[#FFD027] font-bold text-xs shadow-cutout transition-transform active:translate-y-0.5"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiedLink ? '✓ Đã sao chép liên kết!' : 'Chia sẻ thiệp này cho bạn bè'}</span>
            </button>

            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-[#1E232A] border-2 border-[#1E232A] font-bold text-xs shadow-sm transition-colors"
            >
              <span>Về trang chủ</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
