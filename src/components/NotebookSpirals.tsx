import React from 'react';

export const NotebookSpirals: React.FC<{ holesCount?: number; className?: string }> = ({
  holesCount = 18,
  className = ''
}) => {
  return (
    <div className={`w-full overflow-hidden select-none py-3 relative bg-[#EFEAE0] border-b border-[#D8D0C0] ${className}`}>
      {/* Subtle perforations shadow */}
      <div className="flex justify-between items-center px-4 sm:px-8 max-w-6xl mx-auto">
        {Array.from({ length: holesCount }).map((_, index) => (
          <div key={index} className="relative flex flex-col items-center">
            {/* Spiral wire ring */}
            <div className="w-2.5 sm:w-3.5 h-7 sm:h-9 bg-gradient-to-r from-[#2B303A] via-[#11141A] to-[#454D5A] rounded-full shadow-md -translate-y-1 z-10 border-t border-white/20" />
            {/* Punched Hole */}
            <div className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-[#3B3834] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] -mt-2 z-0 border border-[#2D2A26]" />
          </div>
        ))}
      </div>
      {/* Perforation dotted line across the binder */}
      <div className="w-full mt-2 border-b-2 border-dashed border-[#C5BCAB]" />
    </div>
  );
};
