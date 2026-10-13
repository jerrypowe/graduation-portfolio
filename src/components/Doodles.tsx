import React from 'react';

// Floating Graduation Cap with dynamic tassel
export const GradCapDoodle: React.FC<{
  className?: string;
  onClick?: () => void;
  title?: string;
}> = ({ className = 'w-16 h-16', onClick, title = 'Click to celebrate!' }) => (
  <svg
    viewBox="0 0 120 100"
    className={`cursor-pointer transition-transform duration-300 hover:scale-110 ${className}`}
    onClick={onClick}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {title && <title>{title}</title>}
    {/* Cap diamond */}
    <path
      d="M60 12 L112 36 L60 60 L8 36 Z"
      fill="#1A1E24"
      stroke="#111827"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path
      d="M60 22 L98 36 L60 50 L22 36 Z"
      fill="#2A303C"
      opacity="0.8"
    />
    {/* Cap skull base */}
    <path
      d="M28 46 V66 C28 78 92 78 92 66 V46"
      fill="#1E232A"
      stroke="#111827"
      strokeWidth="3"
    />
    {/* Button on top */}
    <circle cx="60" cy="36" r="4.5" fill="#FFD027" stroke="#111827" strokeWidth="1.5" />
    {/* Golden Tassel */}
    <path
      d="M60 36 C72 38 88 48 94 62"
      stroke="#E5B813"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    {/* Tassel fringe */}
    <path
      d="M94 62 L90 82 M94 62 L94 84 M94 62 L98 82"
      stroke="#FFD027"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="94" cy="62" r="3" fill="#B45309" />
  </svg>
);

// Lightbulb doodle with radiant sparks
export const LightbulbDoodle: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 80 90" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Radiant rays */}
    <path d="M40 6 V16 M18 18 L26 24 M62 18 L54 24 M10 40 H20 M70 40 H60" stroke="#FFD027" strokeWidth="3" strokeLinecap="round" />
    {/* Bulb body */}
    <path
      d="M26 44 C26 32 32 24 40 24 C48 24 54 32 54 44 C54 50 50 56 48 60 H32 C30 56 26 50 26 44 Z"
      fill="#FFD027"
      stroke="#1E232A"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Filament highlight */}
    <path d="M35 34 C36 30 44 30 45 34" stroke="#FFF7D6" strokeWidth="2.5" strokeLinecap="round" />
    {/* Screw base */}
    <path d="M33 60 H47 M34 65 H46 M36 70 H44" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M37 73 H43" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Vector Pen Tool Doodle (Graphic / Engineering)
export const PenToolDoodle: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 90 90" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Bezier curve line */}
    <path d="M15 65 Q 45 15 75 65" stroke="#94A3B8" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="15" cy="65" r="4" fill="#3B82F6" stroke="#1E232A" strokeWidth="1.5" />
    <circle cx="75" cy="65" r="4" fill="#EC4899" stroke="#1E232A" strokeWidth="1.5" />
    {/* Pen nib */}
    <g transform="translate(32, 22) rotate(45)">
      <path d="M0 0 L14 14 L24 8 L32 24 L24 32 L8 24 L14 14 Z" fill="#334155" stroke="#1E232A" strokeWidth="2" />
      <path d="M0 0 L10 10" stroke="#FFD027" strokeWidth="2" />
      <circle cx="10" cy="10" r="2" fill="#E2E8F0" />
    </g>
  </svg>
);

// Pencil Rocket Doodle
export const RocketPencilDoodle: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 90 90" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(15, 10) rotate(35)">
      {/* Pencil tip */}
      <polygon points="20,0 12,16 28,16" fill="#F4DFC8" stroke="#1E232A" strokeWidth="2" />
      <polygon points="20,0 16,7 24,7" fill="#1E232A" />
      {/* Pencil body */}
      <rect x="12" y="16" width="16" height="34" fill="#FFD027" stroke="#1E232A" strokeWidth="2" />
      <line x1="17" y1="16" x2="17" y2="50" stroke="#E5B813" strokeWidth="1.5" />
      <line x1="23" y1="16" x2="23" y2="50" stroke="#E5B813" strokeWidth="1.5" />
      {/* Ferrule & Eraser */}
      <rect x="12" y="50" width="16" height="6" fill="#CBD5E1" stroke="#1E232A" strokeWidth="2" />
      <rect x="12" y="56" width="16" height="10" rx="3" fill="#F472B6" stroke="#1E232A" strokeWidth="2" />
      {/* Rocket wings */}
      <polygon points="12,42 2,52 12,50" fill="#60A5FA" stroke="#1E232A" strokeWidth="1.5" />
      <polygon points="28,42 38,52 28,50" fill="#60A5FA" stroke="#1E232A" strokeWidth="1.5" />
      {/* Jet smoke */}
      <circle cx="16" cy="70" r="4" fill="#E2E8F0" />
      <circle cx="24" cy="72" r="5" fill="#E2E8F0" />
      <circle cx="20" cy="78" r="3" fill="#CBD5E1" />
    </g>
  </svg>
);

// Hand-drawn Spiral Doodle
export const SpiralDoodle: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M30 30 C32 27 35 29 35 32 C35 36 28 37 26 33 C23 27 28 20 35 21 C43 22 46 32 42 39 C36 48 23 46 17 37 C10 26 17 12 30 11 C45 10 54 22 52 35"
      stroke="#4A5568"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Squiggly arrow
export const SquigglyArrow: React.FC<{ className?: string; direction?: 'left' | 'right' }> = ({
  className = 'w-16 h-8',
  direction = 'right'
}) => (
  <svg
    viewBox="0 0 100 50"
    className={`${direction === 'left' ? '-scale-x-100' : ''} ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 25 Q 30 8, 50 30 T 90 20"
      stroke="#1E232A"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M78 12 L 92 20 L 82 32"
      stroke="#1E232A"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Zigzag doodle
export const ZigzagDoodle: React.FC<{ className?: string }> = ({ className = 'w-14 h-6' }) => (
  <svg viewBox="0 0 80 20" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 10 L 15 3 L 25 15 L 35 3 L 45 15 L 55 3 L 65 15 L 75 10"
      stroke="#4B5563"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Celebratory anime/illustrated graduate character (seen in reference poster top-left and top-right)
export const IllustratedGraduateDoodle: React.FC<{
  className?: string;
  pose?: 'cheer' | 'toss';
}> = ({ className = 'w-24 h-24', pose = 'cheer' }) => (
  <svg
    viewBox="0 0 120 140"
    className={`${pose === 'toss' ? '-scale-x-100' : ''} ${className} select-none pointer-events-none`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Cap flying above */}
    <g transform="translate(68, 6) rotate(18) scale(0.45)">
      <polygon points="60,10 110,35 60,60 10,35" fill="#1E232A" stroke="#000" strokeWidth="3" />
      <path d="M60,35 C70,40 85,45 90,65" stroke="#FFD027" strokeWidth="4" />
      <circle cx="90" cy="65" r="4" fill="#D97706" />
    </g>
    {/* Sparkles around flying cap */}
    <path d="M85 8 L88 2 M95 14 L102 12" stroke="#FFD027" strokeWidth="2" strokeLinecap="round" />
    
    {/* Hair back */}
    <path d="M42 46 C35 65 30 85 36 95 C40 85 45 65 48 48 Z" fill="#78350F" />
    <path d="M72 46 C80 65 85 85 78 95 C74 85 70 65 68 48 Z" fill="#78350F" />

    {/* Head & Face */}
    <ellipse cx="58" cy="48" rx="16" ry="17" fill="#FDE68A" />
    <path d="M42 42 C45 32 70 32 74 42 C70 45 62 42 58 44 C54 42 46 45 42 42 Z" fill="#92400E" />
    
    {/* Eyes & Smile */}
    <ellipse cx="52" cy="49" rx="2" ry="2.5" fill="#1E232A" />
    <ellipse cx="64" cy="49" rx="2" ry="2.5" fill="#1E232A" />
    <circle cx="53" cy="48" r="0.8" fill="#FFF" />
    <circle cx="65" cy="48" r="0.8" fill="#FFF" />
    {/* Blush */}
    <ellipse cx="49" cy="53" rx="2.5" ry="1.2" fill="#F87171" opacity="0.7" />
    <ellipse cx="67" cy="53" rx="2.5" ry="1.2" fill="#F87171" opacity="0.7" />
    {/* Cute smile */}
    <path d="M55 54 Q58 58 61 54" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />

    {/* Gown Body */}
    <path
      d="M44 65 L32 125 C38 128 78 128 84 125 L72 65 Z"
      fill="#1E232A"
      stroke="#0F172A"
      strokeWidth="2"
    />
    {/* Yellow Collar / Sash */}
    <path
      d="M48 64 L58 84 L68 64 Q58 66 48 64 Z"
      fill="#FFD027"
      stroke="#D97706"
      strokeWidth="1.5"
    />
    <path
      d="M44 64 L50 78 L58 84 L66 78 L72 64"
      stroke="#1E232A"
      strokeWidth="1.5"
    />

    {/* Arms raised in celebration */}
    <path
      d="M44 68 L24 45 L30 40 L48 64"
      fill="#1E232A"
      stroke="#0F172A"
      strokeWidth="1.5"
    />
    {/* Left hand holding diploma */}
    <circle cx="22" cy="42" r="5" fill="#FDE68A" />
    {/* Diploma scroll with red ribbon */}
    <g transform="translate(14, 30) rotate(-25)">
      <rect x="0" y="0" width="8" height="22" rx="2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
      <rect x="0" y="8" width="8" height="5" fill="#EF4444" />
      <path d="M4 13 L-1 18 M4 13 L9 18" stroke="#DC2626" strokeWidth="1.5" />
    </g>

    {/* Right arm tossing cap */}
    <path
      d="M72 68 L92 40 L98 45 L78 72"
      fill="#1E232A"
      stroke="#0F172A"
      strokeWidth="1.5"
    />
    <circle cx="95" cy="40" r="5" fill="#FDE68A" />
  </svg>
);

// Vintage Halftone Hand holding smartphone vector composition
export const HalftoneHandHoldingPhone: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    {/* Vintage stippled / halftone sketch hand illustration at bottom left */}
    <div className="absolute -bottom-10 -left-12 sm:-left-16 w-56 sm:w-72 md:w-80 pointer-events-none select-none z-10 opacity-95">
      <svg
        viewBox="0 0 320 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto filter drop-shadow-lg"
      >
        {/* Halftone / engraved hand texture & contours */}
        <defs>
          <pattern id="halftone-dots" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="1.4" fill="#374151" />
          </pattern>
          <pattern id="halftone-dense" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.3" fill="#1F2937" />
          </pattern>
        </defs>

        {/* Hand wrist and palm silhouette */}
        <path
          d="M0 380 L60 260 C80 230 110 210 135 195 L175 170 C195 160 215 170 210 190 L185 240 C175 260 160 290 150 340 L130 380 Z"
          fill="url(#halftone-dots)"
          stroke="#111827"
          strokeWidth="3.5"
        />

        {/* Thumb wrapping around bottom left of the phone */}
        <path
          d="M100 230 C90 190 120 150 145 135 C160 125 175 135 170 155 C165 175 140 215 130 240 Z"
          fill="url(#halftone-dense)"
          stroke="#111827"
          strokeWidth="3.5"
        />
        {/* Thumb nail with glossy reflection */}
        <path
          d="M152 140 C156 136 164 140 162 148 C160 152 154 150 152 140 Z"
          fill="#111827"
          stroke="#374151"
          strokeWidth="1.5"
        />

        {/* Fingers wrapping around the other side / gripping phone */}
        <path
          d="M175 170 C200 150 240 170 245 195 C250 220 230 240 210 245"
          stroke="#111827"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M165 200 C190 185 230 205 235 225 C238 245 220 260 200 265"
          stroke="#111827"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M155 235 C175 225 210 240 215 260 C218 275 200 285 185 290"
          stroke="#111827"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Hatching sketch shading lines along forearm */}
        <path d="M20 370 L70 290" stroke="#4B5563" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M35 375 L85 295" stroke="#4B5563" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M50 380 L100 300" stroke="#4B5563" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M70 380 L115 310" stroke="#4B5563" strokeWidth="2" strokeDasharray="3 3" />
      </svg>
    </div>

    {/* Modern Smartphone Mockup Body (as seen in graduation poster) */}
    <div className="relative w-[260px] sm:w-[310px] md:w-[340px] aspect-[9/16] bg-[#0E1116] rounded-[42px] p-3 shadow-cutout-lg border-4 border-[#1E232A] overflow-hidden flex flex-col justify-between z-20">
      {/* Top phone speaker & dynamic island */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#1F242D] rounded-full flex items-center justify-center gap-2 z-30">
        <div className="w-2.5 h-2.5 rounded-full bg-[#111827] border border-[#374151]" />
        <div className="w-10 h-1.5 rounded-full bg-[#111827]" />
      </div>

      {/* Screen area containing graduate photo/content */}
      <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-gradient-to-b from-[#1C2330] via-[#2A3445] to-[#161B24] flex flex-col justify-between">
        {/* Subtle camera UI overlay on top */}
        <div className="pt-8 px-4 flex justify-between items-center text-[10px] tracking-wider text-white/50 uppercase font-mono z-20">
          <span>RAW 4K</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            REC
          </span>
        </div>

        {/* Children: Portrait image or customized subject */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden">
          {children}
        </div>

        {/* Bottom camera interface controls (matching the reference invitation) */}
        <div className="pb-4 px-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-6 z-20 flex flex-col items-center gap-2">
          {/* Modes: PHOTO VIDEO PORTRAIT MORE */}
          <div className="flex gap-4 text-[10px] tracking-widest uppercase font-semibold text-white/60">
            <span>VIDEO</span>
            <span className="text-[#FFD027] font-bold">PHOTO</span>
            <span>PORTRAIT</span>
            <span className="hidden sm:inline">MORE</span>
          </div>

          {/* Shutter ring */}
          <div className="w-12 h-12 rounded-full border-2 border-white/70 p-1 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-white transition-transform active:scale-90" />
          </div>

          {/* Home indicator bar */}
          <div className="w-24 h-1 bg-white/40 rounded-full mt-1" />
        </div>
      </div>
    </div>
  </div>
);

// Washi Tape component with custom angles and textures
export const WashiTape: React.FC<{
  className?: string;
  color?: 'yellow' | 'red' | 'blue' | 'dark';
  angle?: string;
}> = ({ className = 'w-24 h-6', color = 'yellow', angle = '-rotate-2' }) => {
  const colorMap = {
    yellow: 'bg-[#FEF08A]/85 border-[#FDE047]/60 text-yellow-900',
    red: 'bg-[#FECACA]/85 border-[#FCA5A5]/60 text-red-900',
    blue: 'bg-[#BFDBFE]/85 border-[#93C5FD]/60 text-blue-900',
    dark: 'bg-[#1E232A]/80 border-[#374151]/60 text-white'
  };

  return (
    <div
      className={`inline-block shadow-sm backdrop-blur-[1px] border-t border-b select-none ${colorMap[color]} ${angle} ${className}`}
      style={{
        clipPath: 'polygon(3% 0%, 97% 0%, 100% 100%, 0% 100%)'
      }}
    />
  );
};

// Rubber Stamp badge for Graduation 2026
export const StampBadge: React.FC<{
  text?: string;
  subtext?: string;
  year?: string;
  className?: string;
}> = ({
  text = 'OFFICIAL GRADUATE',
  subtext = 'FPT UNIVERSITY',
  year = '2026',
  className = ''
}) => (
  <div
    className={`inline-flex flex-col items-center justify-center p-3 rounded-full border-2 border-dashed border-[#1E232A] bg-transparent text-[#1E232A] rotate-6 select-none shadow-sm ${className}`}
  >
    <div className="text-[9px] font-black tracking-widest uppercase">{text}</div>
    <div className="text-xl font-black font-display tracking-tight text-[#E63946]">{year}</div>
    <div className="text-[8px] font-bold tracking-widest uppercase">{subtext}</div>
  </div>
);
