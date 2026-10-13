import React, { useState } from 'react';
import { GraduateProfile } from '../types';
import { X, Save, RotateCcw } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: GraduateProfile;
  onSave: (updated: GraduateProfile) => void;
  onReset: () => void;
  customImageUrl?: string;
  onCustomImageChange: (url: string) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  onReset,
  customImageUrl = '',
  onCustomImageChange
}) => {
  const [formData, setFormData] = useState<GraduateProfile>(profile);
  const [imageUrl, setImageUrl] = useState<string>(customImageUrl);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImageUrl(result);
        onCustomImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onCustomImageChange(imageUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FDFCF7] rounded-3xl border-3 border-[#1E232A] shadow-cutout-lg overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FFD027] border-b-2 border-[#1E232A]">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎓</span>
            <h3 className="font-black font-display text-lg text-[#1E232A]">
              Customize Portfolio & Poster
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#1E232A] flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <p className="text-xs text-gray-600 font-sans">
            Customize any graduate information below. Content updates instantly on the interactive poster and portfolio sections!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-gray-700 mb-1">
                Graduate Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#1E232A]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-gray-700 mb-1">
                Handwritten Script Display:
              </label>
              <input
                type="text"
                name="handwrittenName"
                value={formData.handwrittenName}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#1E232A]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-gray-700 mb-1">
                University (Vietnamese):
              </label>
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#1E232A]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-gray-700 mb-1">
                University (Short):
              </label>
              <input
                type="text"
                name="universityShort"
                value={formData.universityShort}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#1E232A]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-gray-700 mb-1">
                Degree / Major:
              </label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#1E232A]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-gray-700 mb-1">
                Graduation Year:
              </label>
              <input
                type="text"
                name="gradYear"
                value={formData.gradYear}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#1E232A]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-gray-700 mb-1">
                Ceremony Date:
              </label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#1E232A]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-gray-700 mb-1">
                Ceremony Time:
              </label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#1E232A]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono font-bold text-gray-700 mb-1">
                University Address:
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#1E232A]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-gray-700 mb-1">
                Phone Number:
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#1E232A]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-gray-700 mb-1">
                Email Address:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#1E232A]"
              />
            </div>
          </div>

          {/* Custom Portrait Photo Upload / URL */}
          <div className="pt-4 border-t border-gray-200">
            <label className="block text-xs font-mono font-bold text-gray-700 mb-1">
              Custom Portrait Photo (Optional):
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Paste image URL (or upload local file below)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#1E232A]"
              />
              <label className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-300 text-xs font-mono font-semibold cursor-pointer text-center">
                <span>Upload File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            {imageUrl && (
              <p className="text-[11px] text-emerald-600 mt-1 font-mono">
                ✓ Custom image loaded! Switch to "Custom" tab on the phone screen anytime.
              </p>
            )}
          </div>

          {/* Footer Controls */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-300 text-red-700 hover:bg-red-50 text-xs font-mono font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#1E232A] hover:bg-black text-[#FFD027] text-xs font-bold shadow-cutout transition-transform active:translate-y-0.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
