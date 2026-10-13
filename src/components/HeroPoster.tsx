import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GraduateProfile } from '../types';
import { NotebookSpirals } from './NotebookSpirals';
import {
  GradCapDoodle,
  LightbulbDoodle,
  PenToolDoodle,
  RocketPencilDoodle,
  SpiralDoodle,
  SquigglyArrow,
  ZigzagDoodle,
  IllustratedGraduateDoodle,
  HalftoneHandHoldingPhone,
  WashiTape,
  StampBadge
} from './Doodles';
import { GraduatePortrait } from './GraduatePortrait';
import { playCelebrationSound } from '../utils/audio';
import { Sparkles, Calendar, Clock, MapPin, Phone, GraduationCap, Edit3, ArrowDown } from 'lucide-react';

interface HeroPosterProps {
  profile: GraduateProfile;
  onEditProfile: () => void;
  customImageUrl?: string;
  onCustomImageChange?: (url: string) => void;
}

export const HeroPoster: React.FC<HeroPosterProps> = ({
  profile,
  onEditProfile,
  customImageUrl,
  onCustomImageChange
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [capTossedCount, setCapTossedCount] = useState(0);

  // Parallax tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const triggerCelebration = () => {
    setCapTossedCount((prev) => prev + 1);
    playCelebrationSound();

    // Multistage celebratory confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD027', '#E63946', '#1E232A', '#3B82F6', '#10B981']
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#FFD027', '#E63946', '#FFFFFF']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#FFD027', '#1E232A', '#3B82F6']
      });
    }, 250);
  };

  return (
    <section className="relative w-full overflow-hidden pt-4 pb-16 px-3 sm:px-6">
      {/* Main Graduation Scrapbook Sheet */}
      <div className="relative max-w-5xl mx-auto bg-graph-paper rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-[#1E232A] shadow-cutout-lg overflow-hidden transition-shadow">
        
        {/* Top Spiral Notebook Binding */}
        <NotebookSpirals holesCount={22} />

        {/* Poster Toolbar / Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-8 py-2.5 border-b border-[#E2DCD2] bg-[#FAF6EC]/70 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
            <span className="font-mono text-gray-600">SCRAPBOOK ID: #GRAD-2026-FPT</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={triggerCelebration}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFD027] hover:bg-[#FACC15] text-[#1E232A] font-bold text-xs shadow-cutout transition-transform active:translate-y-0.5 active:shadow-none"
              title="Throw Graduation Cap & Confetti"
            >
              <GraduationCap className="w-4 h-4 transition-transform group-hover:-rotate-12" />
              <span>Throw Cap! ({capTossedCount})</span>
            </button>
            <button
              onClick={onEditProfile}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white hover:bg-gray-100 text-[#1E232A] border border-[#1E232A] font-medium text-xs shadow-sm transition-colors"
              title="Customize Name, University & Details"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Customize</span>
            </button>
          </div>
        </div>

        {/* Poster Content Area */}
        <div className="relative p-4 sm:p-8 md:p-12 overflow-hidden">
          
          {/* Subtle Parallax Floating Doodles in Background */}
          <div
            className="absolute top-12 left-6 pointer-events-none transition-transform duration-300"
            style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)` }}
          >
            <IllustratedGraduateDoodle className="w-20 sm:w-28 h-20 sm:h-28 opacity-90" pose="toss" />
          </div>

          <div
            className="absolute top-10 right-6 pointer-events-none transition-transform duration-300"
            style={{ transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px)` }}
          >
            <IllustratedGraduateDoodle className="w-20 sm:w-28 h-20 sm:h-28 opacity-90" pose="cheer" />
          </div>

          {/* ======================================================== */}
          {/* HEADER SECTION: "HAPPY GRADUATION" + Handwritten Name     */}
          {/* ======================================================== */}
          <div className="text-center relative z-20 mb-8 sm:mb-12">
            {/* Top decorative badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1E232A] text-white rounded-md text-[11px] font-mono tracking-widest uppercase mb-2 shadow-sm">
              <Sparkles className="w-3 h-3 text-[#FFD027]" />
              <span>Class of {profile.gradYear} • Official Portfolio</span>
              <Sparkles className="w-3 h-3 text-[#FFD027]" />
            </div>

            {/* "HAPPY" */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-[0.25em] text-[#1E232A] uppercase leading-none drop-shadow-sm">
              HAPPY
            </h1>

            {/* "GRADUATION" (Huge Block Typography matching reference image) */}
            <div className="relative inline-block mt-1 sm:mt-2">
              <span className="text-4xl sm:text-7xl md:text-8xl font-black font-display tracking-tight text-[#1E232A] uppercase block select-none">
                GRADUATION
              </span>
              {/* Halftone / distressed accent underline */}
              <div className="h-1.5 sm:h-2 w-full bg-[#FFD027] rounded-full mt-1 border border-[#1E232A]" />
            </div>

            {/* Handwritten script name: "Thanh Tú" */}
            <div className="mt-2 sm:mt-3 relative inline-block">
              <span
                className="text-4xl sm:text-6xl md:text-7xl font-bold font-handwriting text-[#1C3D5A] tracking-wider block drop-shadow transform -rotate-1 select-none"
                style={{ textShadow: '2px 2px 0px rgba(255,208,39,0.5)' }}
              >
                {profile.handwrittenName || profile.name}
              </span>
              <div className="absolute -right-8 -top-3 hidden sm:block">
                <WashiTape color="yellow" className="w-12 h-4" angle="rotate-12" />
              </div>
            </div>

            {/* Role & Degree Subtitle */}
            <p className="mt-2 text-sm sm:text-lg font-semibold text-gray-700 font-sans tracking-wide">
              {profile.role} <span className="text-[#E63946] mx-1">•</span> {profile.degree}
            </p>
          </div>

          {/* ======================================================== */}
          {/* 3-COLUMN COMPOSITION: Left Info, Center Phone, Right Info */}
          {/* ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20">

            {/* -------------------------------------------------------- */}
            {/* LEFT COLUMN: Invitation Note & Contact Sticker           */}
            {/* -------------------------------------------------------- */}
            <div className="lg:col-span-3 flex flex-col gap-6 order-2 lg:order-1">
              
              {/* Handwritten Invitation Card (from reference: "Thân mời Bạn Thanh Tú...") */}
              <div className="relative bg-[#FFFDF5] p-5 rounded-xl border-2 border-[#1E232A] shadow-cutout rotate-[-1.5deg] group hover:rotate-0 transition-transform">
                <div className="absolute -top-3 left-6">
                  <WashiTape color="red" className="w-16 h-4" angle="-rotate-3" />
                </div>
                
                <p className="text-sm font-handwriting text-gray-600 text-lg">Thân mời</p>
                <h3 className="text-xl sm:text-2xl font-black text-[#1E232A] font-display mt-0.5">
                  Bạn {profile.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 mt-2 font-handwriting text-base leading-snug">
                  đến tham dự buổi lễ tốt nghiệp & cùng khám phá hành trình kỹ sư phần mềm của mình!
                </p>

                <div className="mt-4 pt-3 border-t border-dashed border-gray-300 flex items-center justify-between text-xs font-mono text-gray-600">
                  <span>FB: {profile.facebook.replace('https://facebook.com/', '')}</span>
                  <span className="text-xs bg-[#FFD027]/40 px-1.5 py-0.5 rounded font-sans font-bold">RSVP</span>
                </div>
              </div>

              {/* Graphic Pen Tool & Squiggle Arrow */}
              <div className="relative flex items-center justify-start gap-3 px-2">
                <PenToolDoodle className="w-14 h-14 hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider">Engineering &</span>
                  <span className="text-xs font-bold text-[#1E232A]">Interactive UI</span>
                </div>
              </div>

              {/* Quick Navigation Sticky Note */}
              <div className="relative bg-[#FEF9C3] p-4 rounded-lg border border-[#1E232A] shadow-sm rotate-[1deg] hover:rotate-0 transition-transform">
                <div className="text-xs font-bold font-mono uppercase tracking-wider text-yellow-900 flex items-center gap-1 mb-2">
                  <span>Portfolio Map</span>
                </div>
                <div className="flex flex-col gap-1.5 text-xs font-sans text-gray-800">
                  <a href="#about" className="hover:text-blue-700 flex items-center gap-1 font-medium">
                    <span>→ 01. About Me</span>
                  </a>
                  <a href="#projects" className="hover:text-blue-700 flex items-center gap-1 font-medium">
                    <span>→ 02. Featured Projects</span>
                  </a>
                  <a href="#skills" className="hover:text-blue-700 flex items-center gap-1 font-medium">
                    <span>→ 03. Technical Skills</span>
                  </a>
                  <a href="#contact" className="hover:text-blue-700 flex items-center gap-1 font-medium">
                    <span>→ 04. Contact & Wishes</span>
                  </a>
                </div>
              </div>

              {/* Squiggle Doodle */}
              <div className="pl-4">
                <SpiralDoodle className="w-10 h-10 text-gray-600" />
              </div>
            </div>

            {/* -------------------------------------------------------- */}
            {/* CENTER COLUMN: Central Smartphone + Portrait + Halftone  */}
            {/* -------------------------------------------------------- */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2 my-2 sm:my-4">
              
              {/* Interactive Graduation Cap floating above phone */}
              <div
                className="relative z-30 -mb-6 animate-float-medium cursor-pointer"
                onClick={triggerCelebration}
                title="Click me to celebrate!"
              >
                <div className="relative">
                  <GradCapDoodle className="w-20 sm:w-28 h-16 sm:h-20" />
                  <span className="absolute -top-1 -right-4 bg-[#E63946] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow animate-pulse">
                    Tap!
                  </span>
                </div>
              </div>

              {/* Smartphone + Halftone Hand Frame */}
              <div className="relative">
                <HalftoneHandHoldingPhone>
                  <GraduatePortrait
                    customImageUrl={customImageUrl}
                    onCustomImageChange={onCustomImageChange}
                  />
                </HalftoneHandHoldingPhone>

                {/* Arrow pointing to Graduate */}
                <div className="absolute -bottom-4 right-0 sm:-right-8 z-30 pointer-events-none hidden sm:block">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-handwriting text-blue-900 text-lg rotate-12">Software Engineer!</span>
                    <SquigglyArrow className="w-14 h-8 rotate-45" direction="left" />
                  </div>
                </div>
              </div>

              {/* Pencil Rocket at bottom center */}
              <div className="relative mt-4 z-20">
                <RocketPencilDoodle className="w-14 h-14 animate-wiggle" />
              </div>
            </div>

            {/* -------------------------------------------------------- */}
            {/* RIGHT COLUMN: University Block, Date & Time               */}
            {/* -------------------------------------------------------- */}
            <div className="lg:col-span-3 flex flex-col gap-6 order-3">
              
              {/* University Stamp Card (from reference: "ĐẠI HỌC FPT CẦN THƠ...") */}
              <div className="relative bg-[#FFFDF5] p-5 rounded-xl border-2 border-[#1E232A] shadow-cutout rotate-[1.5deg] group hover:rotate-0 transition-transform">
                <div className="absolute -top-3 right-6">
                  <WashiTape color="blue" className="w-16 h-4" angle="rotate-3" />
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="w-5 h-5 text-[#E63946]" />
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gray-500">ALMA MATER</span>
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

              {/* Glowing Lightbulb Sticker */}
              <div className="flex items-center gap-3 px-2">
                <LightbulbDoodle className="w-14 h-14 hover:scale-110 transition-transform animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono text-gray-500 uppercase">Passion</span>
                  <span className="text-xs font-bold text-[#1E232A]">Problem Solving</span>
                </div>
              </div>

              {/* Date & Time Big Poster Block (matches reference: "24 Tháng 10, 2026 / 10:00") */}
              <div className="relative bg-[#FAF5E6] p-4 rounded-xl border-2 border-[#1E232A] shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono text-gray-500 uppercase">
                  <Calendar className="w-3.5 h-3.5 text-red-600" />
                  <span>CEREMONY SCHEDULE</span>
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

          {/* Bottom Scroll Indicator */}
          <div className="mt-12 text-center flex flex-col items-center justify-center relative z-20">
            <a
              href="#about"
              className="group inline-flex flex-col items-center gap-1 text-xs font-mono font-bold text-gray-600 hover:text-black transition-colors"
            >
              <span>EXPLORE PORTFOLIO</span>
              <div className="w-8 h-8 rounded-full border-2 border-[#1E232A] bg-white flex items-center justify-center shadow-sm group-hover:translate-y-1 transition-transform">
                <ArrowDown className="w-4 h-4 text-[#1E232A]" />
              </div>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
