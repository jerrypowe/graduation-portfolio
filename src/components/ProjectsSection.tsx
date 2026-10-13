import React, { useState } from 'react';
import { Project } from '../types';
import { WashiTape } from './Doodles';
import { ExternalLink, Github, Sparkles, FolderGit2 } from 'lucide-react';

export const ProjectsSection: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Extract unique technologies for filter tabs
  const allTechnologies = ['All', 'React', 'TypeScript', 'Node.js', 'Go', 'Python'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.technologies.some(t => t.toLowerCase().includes(activeFilter.toLowerCase())));

  return (
    <section id="projects" className="py-12 px-3 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1E232A] text-[#FFD027] flex items-center justify-center font-bold text-lg shadow-cutout">
            02
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E63946]">
              ENGINEERING LAB
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-[#1E232A] tracking-tight">
              Featured Projects
            </h2>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-[#EAE3D2] rounded-xl border border-[#1E232A]">
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setActiveFilter(tech)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeFilter === tech
                  ? 'bg-[#1E232A] text-[#FFD027] shadow-sm'
                  : 'text-gray-700 hover:text-black hover:bg-white/40'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Scrapbook Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project, idx) => {
          const tapeColors: ('yellow' | 'red' | 'blue' | 'dark')[] = ['yellow', 'red', 'blue', 'dark'];
          const tapeColor = tapeColors[idx % tapeColors.length];
          const rotationClasses = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2'];
          const rotation = rotationClasses[idx % rotationClasses.length];

          return (
            <div
              key={project.id}
              className={`relative bg-[#FFFDF8] rounded-2xl border-2 sm:border-3 border-[#1E232A] p-5 sm:p-6 shadow-cutout transition-all duration-300 hover:shadow-cutout-lg hover:-translate-y-1.5 ${rotation} hover:rotate-0 flex flex-col justify-between`}
            >
              {/* Washi tape pinning the card */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                <WashiTape color={tapeColor} className="w-24 sm:w-28 h-5" angle="rotate-1" />
              </div>

              {/* Card Top: Category and Star */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3 pt-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-gray-500">
                    <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>SWE_PROJECT_0{idx + 1}</span>
                  </div>
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FEF08A] text-yellow-900 border border-yellow-700 text-[10px] font-bold font-mono">
                      <Sparkles className="w-2.5 h-2.5" /> Featured
                    </span>
                  )}
                </div>

                {/* Project Visual / Code Preview Banner */}
                <div className="w-full aspect-video rounded-xl bg-[#181B22] border-2 border-[#1E232A] mb-4 overflow-hidden relative group/preview flex flex-col justify-between p-3.5 text-white">
                  {/* Terminal bar */}
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[10px] font-mono text-gray-400">{project.id}.tsx</span>
                  </div>

                  {/* Terminal code snippet art */}
                  <div className="font-mono text-xs text-emerald-400 space-y-1 opacity-90 my-auto">
                    <p><span className="text-pink-400">const</span> {project.title.replace(/\s+/g, '')} = <span className="text-yellow-300">defineModule</span>({'{'}</p>
                    <p className="pl-3 text-gray-300 text-[11px] truncate">// {project.tagline}</p>
                    <p className="pl-3"><span className="text-blue-300">status</span>: <span className="text-green-300">"Production Ready"</span>,</p>
                    <p className="pl-3"><span className="text-blue-300">stack</span>: [{project.technologies.slice(0, 3).map(t => `"${t}"`).join(', ')}]</p>
                    <p>{'});'}</p>
                  </div>

                  {/* Footer status */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 border-t border-gray-800 pt-1.5">
                    <span>⚡ FPT University Class of 2026</span>
                    <span className="text-[#FFD027]">● LIVE</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl sm:text-2xl font-black font-display text-[#1E232A]">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-gray-600 mt-0.5">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-700 mt-2.5 leading-relaxed font-sans">
                  {project.description}
                </p>

                {/* Technologies Badge List */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-[#F1ECE1] border border-[#1E232A]/20 text-[11px] font-mono font-semibold text-gray-800 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: GitHub & Demo */}
              <div className="mt-6 pt-4 border-t-2 border-dashed border-[#E2DCD2] flex items-center justify-between gap-3">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono font-bold text-gray-800 hover:text-black px-3 py-1.5 rounded-lg border border-[#1E232A] bg-white hover:bg-gray-100 shadow-sm transition-transform active:translate-y-0.5"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                ) : <div />}

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#1E232A] bg-[#FFD027] hover:bg-[#FACC15] px-3.5 py-1.5 rounded-lg border border-[#1E232A] shadow-cutout transition-transform active:translate-y-0.5 active:shadow-none"
                  >
                    <span>Launch Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
