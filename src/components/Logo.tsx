import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon-only' | 'light' | 'dark' | 'official';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isHindi?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  isHindi = false,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-base tracking-tight',
    md: 'text-lg tracking-tight',
    lg: 'text-xl tracking-tight',
    xl: 'text-2xl tracking-tight',
  };

  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-2.5 select-none whitespace-nowrap shrink-0 ${className}`}>
      {/* Official Civic Crest: Sovereign Shield + Bridge Arch + Verification Check */}
      <div
        className={`relative flex items-center justify-center rounded-lg border transition-colors ${
          iconSizes[size]
        } ${
          isLight
            ? 'bg-white/10 border-white/20 text-white'
            : 'bg-[#0B2545] border-[#1E3A5F] text-white shadow-xs'
        }`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1.5"
          aria-hidden="true"
        >
          {/* Outer Shield Silhouette */}
          <path
            d="M20 4L7 9V19C7 27.5 12.6 34.4 20 36.5C27.4 34.4 33 27.5 33 19V9L20 4Z"
            stroke="#D97706"
            strokeWidth="2"
            fill={isLight ? 'rgba(255,255,255,0.08)' : '#13315C'}
          />
          {/* Bridge Arch (Setu) */}
          <path
            d="M11 23C14.5 16.5 25.5 16.5 29 23"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Base Horizon */}
          <line
            x1="10"
            y1="25.5"
            x2="30"
            y2="25.5"
            stroke="#D97706"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Verification Checkmark */}
          <path
            d="M16.5 14.5L19 17L24 11.5"
            stroke="#34D399"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {variant !== 'icon-only' && (
        <div className="flex flex-col text-left">
          <span
            className={`font-serif font-bold uppercase tracking-tight leading-none ${
              textSizes[size]
            } ${isLight ? 'text-white' : 'text-[#0B2545]'}`}
          >
            {isHindi ? 'आहारसेतु' : 'AAHARSETU'}
          </span>
          <span
            className={`text-[10px] uppercase tracking-widest font-semibold mt-0.5 ${
              isLight ? 'text-[#94A3B8]' : 'text-[#475569]'
            }`}
          >
            {isHindi ? 'खाद्य पारदर्शिता पोर्टल' : 'Public Food Transparency'}
          </span>
        </div>
      )}
    </div>
  );
};
