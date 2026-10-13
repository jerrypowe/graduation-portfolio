import React, { useState, useEffect } from 'react';
import { GraduateProfile } from '../types';
import { WashiTape, StampBadge, GradCapDoodle } from './Doodles';
import { 
  Mail, 
  Github, 
  Linkedin, 
  MessageSquare, 
  Send, 
  Check, 
  MapPin, 
  Calendar, 
  Clock, 
  Copy, 
  Loader2, 
  AlertCircle, 
  CheckCircle,
  Database
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCelebrationSound } from '../utils/audio';
import { 
  DbWish, 
  getWishesFromDatabase, 
  insertWishToDatabase, 
  isSupabaseConfigured
} from '../lib/supabase';

interface ContactSectionProps {
  profile: GraduateProfile;
  prefilledName?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, prefilledName = '' }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  
  // Wishes loaded from database
  const [wishes, setWishes] = useState<DbWish[]>([]);
  const [isLoadingWishes, setIsLoadingWishes] = useState(true);

  // Form states
  const [senderName, setSenderName] = useState(prefilledName);
  const [senderWish, setSenderWish] = useState('');
  const [selectedColor, setSelectedColor] = useState<'yellow' | 'pink' | 'blue' | 'green'>('yellow');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Update senderName if prefilledName changes
  useEffect(() => {
    if (prefilledName) {
      setSenderName(prefilledName);
    }
  }, [prefilledName]);

  // Load wishes on mount
  useEffect(() => {
    loadWishes();
  }, []);

  const loadWishes = async () => {
    setIsLoadingWishes(true);
    const result = await getWishesFromDatabase();
    setWishes(result.wishes);
    setIsLoadingWishes(false);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleAddWish = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const trimmedName = senderName.trim();
    const trimmedMessage = senderWish.trim();

    if (!trimmedName) {
      setStatusMessage({ type: 'error', text: 'Vui lòng nhập tên của bạn!' });
      return;
    }
    if (trimmedName.length > 40) {
      setStatusMessage({ type: 'error', text: 'Tên không được dài quá 40 ký tự.' });
      return;
    }
    if (!trimmedMessage) {
      setStatusMessage({ type: 'error', text: 'Vui lòng nhập lời chúc của bạn!' });
      return;
    }
    if (trimmedMessage.length > 1000) {
      setStatusMessage({ type: 'error', text: 'Lời chúc không được dài quá 1000 ký tự.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await insertWishToDatabase(trimmedName, trimmedMessage, selectedColor);

      if (result.success && result.data) {
        // Clear form only after write succeeds
        setSenderWish('');
        setStatusMessage({
          type: 'success',
          text: isSupabaseConfigured 
            ? 'Cảm ơn bạn! Lời chúc đã được lưu vào cơ sở dữ liệu thành công! 🎉'
            : 'Lời chúc của bạn đã được lưu thành công! 🎉'
        });

        // Prepend new wish immediately to list
        setWishes((prev) => [result.data!, ...prev]);

        playCelebrationSound();
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#FFD027', '#E63946', '#3B82F6', '#10B981']
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: result.error || 'Có lỗi xảy ra khi lưu lời chúc. Vui lòng thử lại!'
        });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Lỗi hệ thống';
      setStatusMessage({
        type: 'error',
        text: `Không thể gửi lời chúc: ${message}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const noteBgColors = {
    yellow: 'bg-[#FEF08A] text-yellow-950 border-yellow-400',
    pink: 'bg-[#FCE7F3] text-pink-950 border-pink-400',
    blue: 'bg-[#E0F2FE] text-blue-950 border-blue-400',
    green: 'bg-[#DCFCE7] text-emerald-950 border-emerald-400'
  };

  const formatDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return 'Gần đây';
      return d.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return 'Gần đây';
    }
  };

  return (
    <section id="contact" className="py-12 px-3 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#1E232A] text-[#FFD027] flex items-center justify-center font-bold text-lg shadow-cutout">
          02
        </div>
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E63946]">
            CELEBRATION POSTCARD & GUESTBOOK
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-[#1E232A] tracking-tight">
            Connect & Graduation Wishes
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Graduation Postcard & Contact Info (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Postcard Container */}
          <div className="relative bg-[#FFFDF5] p-6 rounded-2xl border-2 sm:border-3 border-[#1E232A] shadow-cutout rotate-[-1deg]">
            <div className="absolute -top-3.5 left-10">
              <WashiTape color="red" className="w-20 h-5" angle="-rotate-2" />
            </div>

            {/* Stamp in upper right */}
            <div className="absolute top-4 right-4">
              <StampBadge text="FPT CAN THO" year="2026" className="scale-75" />
            </div>

            <div className="pt-2">
              <span className="text-xs font-mono font-bold text-gray-500 uppercase">
                COMMENCEMENT INVITATION
              </span>
              <h3 className="text-2xl font-black font-display text-[#1E232A] mt-1">
                Thank You for Visiting!
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 mt-2 font-sans leading-relaxed">
                Thank you for being part of this graduation milestone. Whether you want to discuss full-stack engineering opportunities, collaborate on creative web projects, or simply say hello, my inbox is always open!
              </p>
            </div>

            {/* Ceremony Details Quick Summary */}
            <div className="mt-5 p-3.5 rounded-xl bg-[#F7F2E7] border border-gray-300 text-xs space-y-1.5 font-sans">
              <div className="flex items-center gap-2 text-gray-800">
                <Calendar className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span><strong>Date:</strong> {profile.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-800">
                <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span><strong>Time:</strong> {profile.time}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-800">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate"><strong>Location:</strong> {profile.universityShort}</span>
              </div>
            </div>

            {/* Contact Channels */}
            <div className="mt-6 space-y-3 pt-4 border-t-2 border-dashed border-gray-200">
              {/* Email Button with copy */}
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white border border-[#1E232A] shadow-sm">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 rounded-lg bg-red-100 text-red-700">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase text-gray-500 block">Direct Email</span>
                    <span className="text-xs font-bold text-gray-800 truncate block">{profile.email}</span>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1.5 rounded-lg bg-[#FFD027] hover:bg-[#FACC15] text-[#1E232A] font-mono text-xs font-bold shadow-sm transition-transform active:scale-95 flex items-center gap-1 shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* GitHub Link */}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#1E232A] shadow-sm hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-gray-900 text-white">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-gray-500 block">Code Repositories</span>
                    <span className="text-xs font-bold text-gray-800">{profile.github}</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-gray-400">↗</span>
              </a>

              {/* LinkedIn Link */}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#1E232A] shadow-sm hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-gray-500 block">Professional Network</span>
                    <span className="text-xs font-bold text-gray-800">{profile.linkedin}</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-gray-400">↗</span>
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Persistent Graduation Wishing Board / Guestbook (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          {/* Guestbook Board Container */}
          <div className="bg-[#FAF7EE] p-5 sm:p-6 rounded-2xl border-2 sm:border-3 border-[#1E232A] shadow-cutout relative">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-dashed border-[#DED7C6]">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#E63946]" />
                <h3 className="text-lg sm:text-xl font-black font-display text-[#1E232A]">
                  Graduation Wishing Board
                </h3>
              </div>
              
              {/* Database status indicator badge */}
              <div className="flex items-center gap-1.5 text-[11px] font-mono">
                <Database className={`w-3.5 h-3.5 ${isSupabaseConfigured ? 'text-emerald-600' : 'text-amber-600'}`} />
                <span className={isSupabaseConfigured ? 'text-emerald-700 font-bold' : 'text-gray-600'}>
                  {isSupabaseConfigured ? 'Supabase Connected' : 'Local Persistence (Dev)'}
                </span>
              </div>
            </div>

            {/* Form to leave a wish */}
            <form onSubmit={handleAddWish} className="mb-6 p-4 rounded-xl bg-white border-2 border-[#1E232A] shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-gray-700 mb-1 uppercase flex justify-between">
                    <span>Tên của bạn:</span>
                    <span className="text-[10px] text-gray-400 font-mono">{senderName.length}/40</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={40}
                    placeholder="Ví dụ: Hoàng Nam, Bạn Đại Học, Tuyển Dụng..."
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-sans focus:outline-none focus:border-[#1E232A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-gray-700 mb-1 uppercase">
                    Màu giấy ghi chú:
                  </label>
                  <div className="flex gap-2">
                    {(['yellow', 'pink', 'blue', 'green'] as const).map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          color === 'yellow' ? 'bg-[#FEF08A]' :
                          color === 'pink' ? 'bg-[#FCE7F3]' :
                          color === 'blue' ? 'bg-[#E0F2FE]' : 'bg-[#DCFCE7]'
                        } ${selectedColor === color ? 'border-black scale-110 shadow' : 'border-transparent'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-[11px] font-mono font-bold text-gray-700 mb-1 uppercase flex justify-between">
                  <span>Lời chúc tốt nghiệp:</span>
                  <span className="text-[10px] text-gray-400 font-mono">{senderWish.length}/1000</span>
                </label>
                <textarea
                  required
                  rows={3}
                  maxLength={1000}
                  placeholder={`Gửi lời chúc, lời nhắn gửi hoặc lời động viên dành cho ${profile.name}...`}
                  value={senderWish}
                  onChange={(e) => setSenderWish(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-sans focus:outline-none focus:border-[#1E232A]"
                />
              </div>

              {/* Status feedback message */}
              {statusMessage && (
                <div
                  className={`mb-3 p-2.5 rounded-lg text-xs font-mono flex items-center gap-2 ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-red-50 text-red-800 border border-red-300'
                  }`}
                >
                  {statusMessage.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-gray-400 font-mono hidden sm:inline">
                  {isSupabaseConfigured ? '⚡ Lưu vĩnh viễn trên Supabase' : '⚡ Lưu tức thì'}
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E232A] hover:bg-black text-[#FFD027] font-bold text-xs shadow-cutout transition-transform active:translate-y-0.5 active:shadow-none disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Đang lưu vào CSDL...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Gửi lời chúc 📌</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Sticky Notes Display Board (Newest first) */}
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-gray-600">
                <span className="font-bold uppercase tracking-wider">
                  Lời chúc đã gửi ({wishes.length})
                </span>
                {isLoadingWishes && (
                  <span className="flex items-center gap-1 text-gray-400">
                    <Loader2 className="w-3 h-3 animate-spin" /> Đang tải...
                  </span>
                )}
              </div>

              {wishes.length === 0 && !isLoadingWishes ? (
                <div className="p-8 text-center text-xs font-mono text-gray-400 border-2 border-dashed border-gray-300 rounded-xl">
                  Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc tốt nghiệp nhé! ✨
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1">
                  {wishes.map((note, index) => {
                    const rotations = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', 'rotate-0'];
                    const rotation = rotations[index % rotations.length];
                    const noteColor = note.color && noteBgColors[note.color] ? noteBgColors[note.color] : noteBgColors.yellow;

                    return (
                      <div
                        key={note.id}
                        className={`relative p-4 rounded-xl border-2 shadow-sm transition-transform hover:scale-105 hover:rotate-0 hover:z-20 ${noteColor} ${rotation}`}
                      >
                        {/* Pushpin at top */}
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 border border-black shadow-sm flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                        </div>

                        <p className="text-xs sm:text-sm font-handwriting text-base sm:text-lg leading-snug mt-1 text-gray-900 break-words">
                          "{note.message}"
                        </p>

                        <div className="mt-3 pt-2 border-t border-black/10 flex items-center justify-between text-[11px] font-mono font-semibold">
                          <span className="truncate max-w-[150px]">— {note.name}</span>
                          <span className="text-[10px] opacity-60 shrink-0">{formatDate(note.created_at)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Footer Closing Credits */}
      <div className="mt-16 pt-8 border-t-2 border-[#1E232A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-600">
        <div className="flex items-center gap-2">
          <GradCapDoodle className="w-6 h-6 inline-block" />
          <span>© 2026 {profile.name} • Bachelor of Software Engineering</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{isSupabaseConfigured ? 'Connected to Supabase' : 'Offline / Dev Mode'}</span>
          <span>•</span>
          <span className="text-red-600 font-bold">FPT University Can Tho</span>
        </div>
      </div>
    </section>
  );
};
