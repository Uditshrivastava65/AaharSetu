import React, { useState } from 'react';
import { ShieldCheck, Utensils } from 'lucide-react';

interface SafeImageProps {
  src?: string;
  alt: string;
  category?: string;
  className?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  category = 'Food Establishment',
  className = 'w-full h-full object-cover',
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`w-full h-full bg-gradient-to-br from-[#0B2545] via-[#13315C] to-[#1E4575] text-white flex flex-col items-center justify-center p-4 text-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center mb-2">
          {category.toLowerCase().includes('inspection') ? (
            <ShieldCheck className="w-5 h-5 text-[#F59E0B]" />
          ) : (
            <Utensils className="w-5 h-5 text-[#F59E0B]" />
          )}
        </div>
        <span className="text-xs font-serif font-semibold text-white/95 line-clamp-2 max-w-[90%]">
          {alt}
        </span>
        <span className="text-[10px] font-mono text-[#94A3B8] mt-1">{category}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
