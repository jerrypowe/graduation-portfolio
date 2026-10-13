import React, { useState } from 'react';

interface GraduatePortraitProps {
  customImageUrl?: string;
  onCustomImageChange?: (url: string) => void;
}

export const GraduatePortrait: React.FC<GraduatePortraitProps> = ({
  customImageUrl,
  onCustomImageChange
}) => {
  const [viewMode, setViewMode] = useState<'illustration' | 'reference' | 'custom'>(
    customImageUrl ? 'custom' : 'illustration'
  );

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-2 group">
      {/* View Mode Switcher on top hover */}
      <div className="absolute top-2 right-2 z-30 opacity-80 hover:opacity-100 transition-opacity flex gap-1 bg-black/70 backdrop-blur-md p-1 rounded-full border border-white/20 text-[10px]">
        <button
          onClick={() => setViewMode('illustration')}
          className={`px-2 py-0.5 rounded-full transition-colors ${
            viewMode === 'illustration'
              ? 'bg-[#FFD027] text-black font-bold'
              : 'text-white/80 hover:text-white'
          }`}
          title="Vector Artwork"
        >
          Vector
        </button>
        <button
          onClick={() => setViewMode('reference')}
          className={`px-2 py-0.5 rounded-full transition-colors ${
            viewMode === 'reference'
              ? 'bg-[#FFD027] text-black font-bold'
              : 'text-white/80 hover:text-white'
          }`}
          title="Invitation Photo"
        >
          Photo
        </button>
        {customImageUrl && (
          <button
            onClick={() => setViewMode('custom')}
            className={`px-2 py-0.5 rounded-full transition-colors ${
              viewMode === 'custom'
                ? 'bg-[#FFD027] text-black font-bold'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Custom
          </button>
        )}
      </div>

      {/* Render based on viewMode */}
      {viewMode === 'reference' ? (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Reference photo cropped specifically to the central graduate portrait */}
          <img
            src={`${import.meta.env.BASE_URL}assets/graduation_invitation_ref.png`}
            alt="Graduation Reference Portrait"
            className="w-full h-full object-cover object-center scale-[1.35] translate-y-2 select-none filter contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>
      ) : viewMode === 'custom' && customImageUrl ? (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src={customImageUrl}
            alt="Custom Graduate Portrait"
            className="w-full h-full object-cover object-center rounded-2xl select-none"
          />
        </div>
      ) : (
        /* Rich handcrafted vector graduate illustration */
        <div className="relative w-full h-full flex items-center justify-center">
          <svg
            viewBox="0 0 280 380"
            className="w-full h-full max-h-[350px] filter drop-shadow-xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Soft backdrop glow */}
            <circle cx="140" cy="180" r="110" fill="#FFD027" opacity="0.12" />

            {/* Mortarboard Cap */}
            <g transform="translate(140, 75)">
              {/* Cap Diamond */}
              <polygon
                points="0,-35 85,0 0,35 -85,0"
                fill="#161A22"
                stroke="#0B0D11"
                strokeWidth="3.5"
              />
              <polygon
                points="0,-22 68,0 0,22 -68,0"
                fill="#262D3B"
                opacity="0.9"
              />
              {/* Cap base skull fitting */}
              <path
                d="M -40,15 C -40,32 40,32 40,15"
                fill="#161A22"
                stroke="#0B0D11"
                strokeWidth="2.5"
              />
              {/* Top button */}
              <circle cx="0" cy="0" r="5" fill="#FFD027" stroke="#0B0D11" strokeWidth="2" />
              {/* Golden hanging tassel with dynamic sway */}
              <path
                d="M 0,0 C 25,5 58,15 65,45"
                stroke="#E5B813"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="65" cy="45" r="4" fill="#B45309" />
              {/* Tassel threads */}
              <path
                d="M 65,45 L 60,78 M 65,45 L 66,82 M 65,45 L 72,78"
                stroke="#FFD027"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </g>

            {/* Graduate Face & Hair */}
            {/* Hair Back */}
            <path
              d="M 95,95 C 80,125 78,160 88,185 C 105,170 108,135 110,105 Z"
              fill="#2A1B14"
            />
            <path
              d="M 185,95 C 200,125 202,160 192,185 C 175,170 172,135 170,105 Z"
              fill="#2A1B14"
            />

            {/* Face Oval */}
            <ellipse cx="140" cy="118" rx="34" ry="36" fill="#FCE8D1" stroke="#E2C19E" strokeWidth="1" />
            {/* Fringe / Bangs Hair */}
            <path
              d="M 106,105 C 112,85 168,85 174,105 C 165,112 152,104 140,108 C 128,104 115,112 106,105 Z"
              fill="#2A1B14"
            />

            {/* Big expressive bright eyes */}
            <ellipse cx="126" cy="116" rx="5" ry="6" fill="#1C1917" />
            <ellipse cx="154" cy="116" rx="5" ry="6" fill="#1C1917" />
            <circle cx="128" cy="114" r="2" fill="#FFFFFF" />
            <circle cx="156" cy="114" r="2" fill="#FFFFFF" />
            <circle cx="125" cy="118" r="1" fill="#FFFFFF" />
            <circle cx="153" cy="118" r="1" fill="#FFFFFF" />

            {/* Rosy blush cheeks */}
            <ellipse cx="118" cy="125" rx="5" ry="2.5" fill="#F87171" opacity="0.65" />
            <ellipse cx="162" cy="125" rx="5" ry="2.5" fill="#F87171" opacity="0.65" />

            {/* Happy sweet smile */}
            <path
              d="M 134,127 Q 140,135 146,127"
              stroke="#991B1B"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Graduation Gown Body */}
            {/* Gown silhouette sitting down */}
            <path
              d="M 105,150 L 75,260 C 85,285 195,285 205,260 L 175,150 Z"
              fill="#181B22"
              stroke="#0D0E12"
              strokeWidth="3"
            />

            {/* Gown pleats / folds */}
            <path d="M 125,180 L 115,265" stroke="#262C38" strokeWidth="2.5" />
            <path d="M 140,185 L 140,270" stroke="#262C38" strokeWidth="2.5" />
            <path d="M 155,180 L 165,265" stroke="#262C38" strokeWidth="2.5" />

            {/* Golden Satin Graduation Collar / Hood with emerald green trim (as in reference!) */}
            <path
              d="M 104,150 L 140,195 L 176,150 Q 140,158 104,150 Z"
              fill="#FFD027"
              stroke="#D97706"
              strokeWidth="2.5"
            />
            {/* Green trim underneath collar */}
            <path
              d="M 98,154 L 105,165 L 140,205 L 175,165 L 182,154"
              stroke="#15803D"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Hands & Arms */}
            {/* Left arm holding diploma scroll */}
            <path
              d="M 104,155 L 85,180 L 105,190"
              fill="#181B22"
              stroke="#0D0E12"
              strokeWidth="2"
            />
            <circle cx="108" cy="188" r="8" fill="#FCE8D1" />

            {/* White diploma roll with red ribbon */}
            <g transform="translate(100, 160) rotate(-15)">
              <rect x="0" y="0" width="16" height="42" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
              <rect x="0" y="16" width="16" height="10" fill="#DC2626" />
              {/* Bow / Ribbon knot */}
              <circle cx="8" cy="21" r="5" fill="#EF4444" />
              <path d="M 8,24 L 2,34 M 8,24 L 14,34" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            {/* Right hand resting softly */}
            <path
              d="M 176,155 L 195,185 L 175,195"
              fill="#181B22"
              stroke="#0D0E12"
              strokeWidth="2"
            />
            <circle cx="172" cy="195" r="8" fill="#FCE8D1" />

            {/* Sitting Legs with White Ruffled Socks & Black Shiny Shoes */}
            {/* Bare lower legs */}
            <rect x="122" y="260" width="14" height="35" rx="5" fill="#FCE8D1" />
            <rect x="144" y="260" width="14" height="35" rx="5" fill="#FCE8D1" />

            {/* White Frilly Ruffled Socks */}
            <path
              d="M 118,290 C 122,286 136,286 140,290 L 138,310 L 120,310 Z"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="1.5"
            />
            <path
              d="M 142,290 C 146,286 160,286 164,290 L 162,310 L 144,310 Z"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="1.5"
            />
            {/* Ruffle ripples */}
            <path d="M 118,290 Q 124,286 128,290 Q 134,286 140,290" stroke="#94A3B8" strokeWidth="1.5" />
            <path d="M 142,290 Q 148,286 152,290 Q 158,286 164,290" stroke="#94A3B8" strokeWidth="1.5" />

            {/* Shiny Black Mary Jane shoes */}
            <ellipse cx="128" cy="322" rx="14" ry="12" fill="#0F172A" stroke="#000" strokeWidth="2" />
            <ellipse cx="154" cy="322" rx="14" ry="12" fill="#0F172A" stroke="#000" strokeWidth="2" />
            {/* Buckle strap */}
            <path d="M 118,318 Q 128,322 138,318" stroke="#334155" strokeWidth="2" />
            <path d="M 144,318 Q 154,322 164,318" stroke="#334155" strokeWidth="2" />
            <circle cx="128" cy="318" r="2" fill="#CBD5E1" />
            <circle cx="154" cy="318" r="2" fill="#CBD5E1" />
            {/* Shoe highlights */}
            <path d="M 124,324 A 6 4 0 0 1 132,324" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 150,324 A 6 4 0 0 1 158,324" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {/* User customizable image hint */}
      {onCustomImageChange && (
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] text-white/70 bg-black/80 px-2 py-0.5 rounded shadow">
            Toggle photo mode above
          </span>
        </div>
      )}
    </div>
  );
};
