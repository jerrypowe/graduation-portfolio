import React from 'react';
import { GraduateProfile } from '../types';
import { WashiTape, StampBadge } from './Doodles';
import { GraduationCap, Target, Heart, Terminal, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC<{ profile: GraduateProfile }> = ({ profile }) => {
  return (
    <section id="about" className="py-12 px-3 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#1E232A] text-[#FFD027] flex items-center justify-center font-bold text-lg shadow-cutout">
          01
        </div>
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E63946]">
            EDITORIAL NOTEBOOK
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-[#1E232A] tracking-tight">
            About The Graduate
          </h2>
        </div>
      </div>

      {/* Scrapbook Spread Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

        {/* Left Column: Polaroid Photo & Personal Philosophy (4 cols) */}
        <div className="md:col-span-5 flex flex-col gap-6">
          
          {/* Polaroid Snapshot */}
          <div className="relative bg-white p-4 pb-6 rounded-lg border-2 border-[#1E232A] shadow-polaroid rotate-[-2deg] hover:rotate-0 transition-transform">
            {/* Washi tape on polaroid */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <WashiTape color="red" className="w-24 h-5" angle="rotate-1" />
            </div>

            <div className="relative aspect-square w-full rounded bg-[#1E232A] overflow-hidden flex items-center justify-center border border-gray-200">
              <img
                src={`${import.meta.env.BASE_URL}assets/graduation_invitation_ref.png`}
                alt="Graduate Snapshot"
                className="w-full h-full object-cover object-top scale-125 translate-y-3 contrast-105"
              />
              <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur">
                24.10.2026
              </div>
            </div>

            {/* Polaroid caption handwritten */}
            <div className="mt-4 text-center">
              <span className="text-xl font-handwriting font-bold text-[#1C3D5A]">
                Ready for the Next Chapter! 🎓
              </span>
              <p className="text-xs text-gray-500 font-mono mt-0.5">
                {profile.universityShort}
              </p>
            </div>
          </div>

          {/* Sticky Note: Education Background */}
          <div className="relative bg-[#FEF08A] p-5 rounded-xl border-2 border-[#1E232A] shadow-cutout rotate-[1.5deg] hover:rotate-0 transition-transform">
            <div className="flex items-center gap-2 mb-3 text-yellow-900 font-mono text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-black" />
              <span>ACADEMIC FOUNDATION</span>
            </div>
            
            <h4 className="text-lg font-black text-[#1E232A] font-display">
              {profile.degree}
            </h4>
            
            <p className="text-sm font-semibold text-gray-800 mt-1">
              {profile.university}
            </p>
            
            <p className="text-xs text-gray-700 mt-2">
              Graduation Year: <strong className="font-mono text-black">{profile.gradYear}</strong>
            </p>

            <div className="mt-3 pt-2 border-t border-yellow-700/30 text-xs text-gray-800 leading-relaxed font-sans">
              Specialized in modern software engineering principles, full-stack application lifecycle, and interactive web architecture.
            </div>
          </div>

        </div>

        {/* Right Column: Lined Paper Bio, Interests, Goals (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-6">

          {/* Lined Paper Note: Personal Story & Technical Mindset */}
          <div className="relative bg-lined-paper p-6 sm:p-8 rounded-2xl border-2 border-[#1E232A] shadow-cutout">
            <div className="absolute -top-3 right-8">
              <WashiTape color="blue" className="w-20 h-5" angle="-rotate-2" />
            </div>

            <div className="flex items-center gap-2 mb-4 text-xs font-mono font-bold text-gray-500 uppercase tracking-wider">
              <Terminal className="w-4 h-4 text-blue-600" />
              <span>ENGINEER’S JOURNAL</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black font-display text-[#1E232A] mb-3">
              Crafting code with precision & empathy.
            </h3>

            <div className="space-y-4 text-sm sm:text-base text-gray-800 leading-relaxed font-sans">
              {profile.bioLong.map((para, idx) => (
                <p key={idx} className="relative">
                  {para}
                </p>
              ))}
            </div>

            {/* Handwritten Signature */}
            <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-gray-500 block">SIGNATURE</span>
                <span className="text-2xl font-handwriting font-bold text-[#1C3D5A]">
                  {profile.name}
                </span>
              </div>
              <StampBadge text="FPT SWE" year="2026" className="scale-75" />
            </div>
          </div>

          {/* Two-Column Mini Cards: Technical Interests & Personal Goals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Technical Interests */}
            <div className="bg-[#F8FAFC] p-4 rounded-xl border-2 border-[#1E232A] shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-blue-700 mb-2.5">
                <Heart className="w-3.5 h-3.5 text-red-500" />
                <span>Technical Interests</span>
              </div>
              <ul className="space-y-2 text-xs text-gray-800">
                {profile.interests.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#FFD027] font-bold">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Personal Goals */}
            <div className="bg-[#FAF5FF] p-4 rounded-xl border-2 border-[#1E232A] shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-purple-700 mb-2.5">
                <Target className="w-3.5 h-3.5 text-purple-600" />
                <span>Career Goals</span>
              </div>
              <ul className="space-y-2 text-xs text-gray-800">
                {profile.goals.map((goal, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
