import React from 'react';
import { X, CheckCircle } from 'lucide-react';

export const ReferenceModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FAF7F0] rounded-3xl border-3 border-[#1E232A] shadow-cutout-lg overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FFD027] border-b-2 border-[#1E232A]">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎨</span>
            <h3 className="font-black font-display text-lg text-[#1E232A]">
              Original Graduation Reference Comparison
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#1E232A] flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Reference Image */}
          <div className="rounded-2xl border-2 border-[#1E232A] overflow-hidden bg-white shadow-cutout">
            <img
              src={`${import.meta.env.BASE_URL}assets/graduation_invitation_ref.png`}
              alt="Uploaded Graduation Invitation Reference"
              className="w-full h-auto object-contain max-h-[500px]"
            />
            <div className="p-3 bg-gray-50 border-t border-gray-200 text-center text-xs font-mono text-gray-500">
              Primary Visual Reference Image
            </div>
          </div>

          {/* Design System & Art-Direction Map */}
          <div className="space-y-4">
            <h4 className="text-base font-black font-display text-[#1E232A]">
              Recreated Visual System:
            </h4>

            <div className="space-y-2 text-xs font-sans text-gray-700">
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-gray-200">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-black font-bold block">Graph Paper & Spiral Binding:</strong>
                  Warm ivory repeating grid (26px) with realistic top metallic coils & punched binder holes.
                </div>
              </div>

              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-gray-200">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-black font-bold block">Typography Hierarchy:</strong>
                  Heavy uppercase "HAPPY GRADUATION" paired with cursive handwritten brush name and monospace badges.
                </div>
              </div>

              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-gray-200">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-black font-bold block">Halftone Hand & Phone:</strong>
                  Vintage stippled hand holding the smartphone screen with interactive portrait viewer.
                </div>
              </div>

              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-gray-200">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-black font-bold block">Hand-Drawn Doodles:</strong>
                  Floating toss-cap graduates, glowing lightbulbs, vector bezier pen tool, pencil rocket, and washi tapes.
                </div>
              </div>

              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-gray-200">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-black font-bold block">Audio & Micro-Interactions:</strong>
                  Offline Web Audio synthesizer fanfare chime + multistage canvas confetti on every graduation cap toss.
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-[#1E232A] text-[#FFD027] font-bold text-xs shadow-cutout transition-transform active:translate-y-0.5"
              >
                Back to Interactive Portfolio
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
