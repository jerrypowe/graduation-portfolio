import React from 'react';
import { SkillCategory } from '../types';
import { WashiTape, LightbulbDoodle } from './Doodles';
import { Code, Database, Server, Layout, Wrench, Sparkles, Tag } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  'Programming Languages': <Code className="w-4 h-4 text-amber-600" />,
  'Frontend Development': <Layout className="w-4 h-4 text-blue-600" />,
  'Backend & APIs': <Server className="w-4 h-4 text-emerald-600" />,
  'Databases & Storage': <Database className="w-4 h-4 text-indigo-600" />,
  'DevOps & Developer Tools': <Wrench className="w-4 h-4 text-rose-600" />,
};

export const SkillsSection: React.FC<{ categories: SkillCategory[] }> = ({ categories }) => {
  return (
    <section id="skills" className="py-12 px-3 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#1E232A] text-[#FFD027] flex items-center justify-center font-bold text-lg shadow-cutout">
          03
        </div>
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E63946]">
            TECH TOOLBOX & STICKERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-[#1E232A] tracking-tight">
            Technical Skills
          </h2>
        </div>
      </div>

      {/* Intro Note */}
      <div className="mb-8 p-4 rounded-xl bg-[#FFFDF5] border-2 border-[#1E232A] shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <LightbulbDoodle className="w-8 h-8 shrink-0" />
          <p className="text-xs sm:text-sm text-gray-700 font-sans">
            Curated toolkit built through coursework at <strong className="text-black font-bold">FPT University</strong>, hackathons, and software engineering projects. Categorized honestly without arbitrary percentage bars.
          </p>
        </div>
        <span className="hidden sm:inline-block font-handwriting text-lg text-blue-800 -rotate-3 shrink-0">
          Handpicked Stack! ✍️
        </span>
      </div>

      {/* Grid of Skill Category Sheets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => {
          const rotationClasses = ['-rotate-1', 'rotate-1', 'rotate-0', '-rotate-2', 'rotate-2'];
          const rotation = rotationClasses[idx % rotationClasses.length];

          return (
            <div
              key={cat.title}
              className={`relative bg-white rounded-2xl border-2 border-[#1E232A] p-5 shadow-cutout transition-transform duration-200 hover:-translate-y-1 hover:rotate-0 ${rotation}`}
            >
              {/* Top pushpin or washi tape */}
              <div className="absolute -top-3 right-6">
                <WashiTape
                  color={idx % 2 === 0 ? 'yellow' : 'blue'}
                  className="w-16 h-4"
                  angle={idx % 2 === 0 ? '-rotate-3' : 'rotate-3'}
                />
              </div>

              {/* Category Header */}
              <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b-2 border-dashed border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-gray-100 border border-gray-300">
                    {categoryIcons[cat.title] || <Tag className="w-4 h-4 text-gray-700" />}
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-[#1E232A] font-display">
                    {cat.title}
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-gray-100 border border-gray-300 text-gray-600">
                  {cat.badge}
                </span>
              </div>

              {/* Skills as Paper Labels & Sticky Badges */}
              <div className="flex flex-col gap-2.5">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group/skill flex items-center justify-between gap-2 p-2 rounded-lg bg-[#FAF8F3] hover:bg-[#FEF9C3] border border-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E232A] group-hover/skill:bg-[#E63946] transition-colors" />
                      <span className="text-xs font-bold text-gray-800 font-sans">
                        {skill.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {skill.tag && (
                        <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-white border border-gray-200 text-gray-600 group-hover/skill:border-yellow-600">
                          {skill.tag}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Footer Sticker Note */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span>CAT_ID: 0{idx + 1}</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Ready
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
