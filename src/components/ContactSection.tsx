import React, { useState } from 'react';
import { GraduateProfile } from '../types';
import { WashiTape, StampBadge, GradCapDoodle } from './Doodles';
import { Mail, Github, Linkedin, MessageSquare, Send, Check, MapPin, Calendar, Clock, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCelebrationSound } from '../utils/audio';

interface WishNote {
  id: string;
  sender: string;
  message: string;
  color: 'yellow' | 'pink' | 'blue' | 'green';
  rotation: string;
  timestamp: string;
}

export const ContactSection: React.FC<{ profile: GraduateProfile }> = ({ profile }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  
  // Interactive Graduation Guestbook Wishing Notes
  const [wishes, setWishes] = useState<WishNote[]>([
    {
      id: '1',
      sender: 'Kỳ Anh (Classmate)',
      message: 'Chúc mừng Tân Cử nhân Thanh Tú! Chúc bạn bay thật cao và kiến tạo thật nhiều sản phẩm tuyệt vời nhé! 🎓🎉',
      color: 'yellow',
      rotation: '-rotate-2',
      timestamp: '24 Oct 2026'
    },
    {
      id: '2',
      sender: 'Tech Lead / Mentor',
      message: 'Impressive engineering foundations and creative eye for frontend craftsmanship. Keep shining in your SWE journey!',
      color: 'blue',
      rotation: 'rotate-2',
      timestamp: '24 Oct 2026'
    },
    {
      id: '3',
      sender: 'FPT University Alumni',
      message: 'Tự hào FPT Can Tho! Chúc cậu gặt hái thật nhiều thành công rực rỡ trong sự nghiệp Software Engineering!',
      color: 'pink',
      rotation: '-rotate-1',
      timestamp: '24 Oct 2026'
    }
  ]);

  const [senderName, setSenderName] = useState('');
  const [senderWish, setSenderWish] = useState('');
  const [selectedColor, setSelectedColor] = useState<'yellow' | 'pink' | 'blue' | 'green'>('yellow');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderWish.trim()) return;

    const rotations = ['-rotate-2', 'rotate-2', '-rotate-3', 'rotate-1', 'rotate-3'];
    const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];

    const newWish: WishNote = {
      id: Date.now().toString(),
      sender: senderName.trim(),
      message: senderWish.trim(),
      color: selectedColor,
      rotation: randomRotation,
      timestamp: 'Just now'
    };

    setWishes([newWish, ...wishes]);
    setSenderName('');
    setSenderWish('');

    playCelebrationSound();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#FFD027', '#E63946', '#3B82F6']
    });
  };

  const noteBgColors = {
    yellow: 'bg-[#FEF08A] text-yellow-950 border-yellow-400',
    pink: 'bg-[#FCE7F3] text-pink-950 border-pink-400',
    blue: 'bg-[#E0F2FE] text-blue-950 border-blue-400',
    green: 'bg-[#DCFCE7] text-emerald-950 border-emerald-400'
  };

  return (
    <section id="contact" className="py-12 px-3 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#1E232A] text-[#FFD027] flex items-center justify-center font-bold text-lg shadow-cutout">
          04
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

            {/* Note on placeholders */}
            <p className="mt-4 text-[11px] font-mono text-gray-400 text-center">
              (All contact links can be edited in real-time via the Customize button)
            </p>
          </div>

        </div>

        {/* Right Column: Interactive Graduation Wishing Board / Guestbook (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          {/* Guestbook Board Container */}
          <div className="bg-[#FAF7EE] p-5 sm:p-6 rounded-2xl border-2 sm:border-3 border-[#1E232A] shadow-cutout relative">
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-dashed border-[#DED7C6]">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#E63946]" />
                <h3 className="text-lg sm:text-xl font-black font-display text-[#1E232A]">
                  Graduation Wishing Board
                </h3>
              </div>
              <span className="text-xs font-handwriting text-blue-900 text-base font-bold">
                Leave a sticky note! 📌
              </span>
            </div>

            {/* Form to leave a note */}
            <form onSubmit={handleAddWish} className="mb-6 p-4 rounded-xl bg-white border-2 border-[#1E232A] shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-gray-700 mb-1 uppercase">
                    Your Name / Relation:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hoàng Nam (Friend / Recruiter)"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-sans focus:outline-none focus:border-[#1E232A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-gray-700 mb-1 uppercase">
                    Sticky Note Color:
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
                <label className="block text-[11px] font-mono font-bold text-gray-700 mb-1 uppercase">
                  Congratulation Wish / Note:
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Leave your graduation wishes, advice, or greeting for Thanh Tú..."
                  value={senderWish}
                  onChange={(e) => setSenderWish(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-sans focus:outline-none focus:border-[#1E232A]"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E232A] hover:bg-black text-[#FFD027] font-bold text-xs shadow-cutout transition-transform active:translate-y-0.5 active:shadow-none"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Pin Sticky Note 📌</span>
                </button>
              </div>
            </form>

            {/* Sticky Notes Display Board */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wishes.map((note) => (
                <div
                  key={note.id}
                  className={`relative p-4 rounded-xl border-2 shadow-sm transition-transform hover:scale-105 hover:rotate-0 hover:z-20 ${noteBgColors[note.color]} ${note.rotation}`}
                >
                  {/* Pushpin at top */}
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 border border-black shadow-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  </div>

                  <p className="text-xs sm:text-sm font-handwriting text-base sm:text-lg leading-snug mt-1 text-gray-900">
                    "{note.message}"
                  </p>

                  <div className="mt-3 pt-2 border-t border-black/10 flex items-center justify-between text-[11px] font-mono font-semibold">
                    <span>— {note.sender}</span>
                    <span className="text-[10px] opacity-60">{note.timestamp}</span>
                  </div>
                </div>
              ))}
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
          <span>Crafted with React, Tailwind & Vite</span>
          <span>•</span>
          <span className="text-red-600 font-bold">FPT University Can Tho</span>
        </div>
      </div>
    </section>
  );
};
