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
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-base tracking-tight',
    md: 'text-xl tracking-tight',
    lg: 'text-2xl tracking-tight',
    xl: 'text-3xl tracking-tight',
  };

  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon: Bridge arc + Harvest leaf / plate + Verification Check */}
      <div
        className={`relative flex items-center justify-center rounded-xl transition-transform duration-300 hover:scale-105 ${
          iconSizes[size]
        } ${
          isLight
            ? 'bg-[#FDFCF8] text-[#1B4332] shadow-sm'
            : 'bg-[#1B4332] text-[#FDFCF8] shadow-md'
        }`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1.5"
          aria-hidden="true"
        >
          {/* Bridge Arc (Setu) */}
          <path
            d="M 6 28 C 12 18, 28 18, 34 28"
            stroke={isLight ? '#1B4332' : '#FDFCF8'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Plate / Base Foundation */}
          <ellipse
            cx="20"
            cy="29"
            rx="12"
            ry="2.5"
            fill={isLight ? '#E67E22' : '#E67E22'}
            opacity="0.9"
          />
          {/* Sprout / Leaf of Pure Food (Aahar) */}
          <path
            d="M 20 22 C 16 16, 20 9, 20 9 C 20 9, 24 16, 20 22 Z"
            fill={isLight ? '#2D7A4D' : '#52B788'}
          />
          {/* Verification Check Mark */}
          <path
            d="M 16 18 L 19 21 L 25 14"
            stroke={isLight ? '#FFFFFF' : '#1B4332'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {variant !== 'icon-only' && (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-bold uppercase tracking-tight leading-none ${
                textSizes[size]
              } ${isLight ? 'text-white' : 'text-[#1B4332]'}`}
            >
              {isHindi ? 'आहारसेतु' : 'AAHARSETU'}
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E67E22]" />
          </div>
          <span
            className={`text-[10px] uppercase tracking-widest font-semibold ${
              isLight ? 'text-white/80' : 'text-[#2D3436]/60'
            }`}
          >
            {isHindi ? 'भरोसा • शुद्धता • पारदर्शिता' : 'Know. Verify. Eat.'}
          </span>
        </div>
      )}
    </div>
  );
};
