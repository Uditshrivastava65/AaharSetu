import React, { useState } from 'react';
import { X, Printer, Download, Share2, CheckCircle2, Shield, QrCode } from 'lucide-react';
import { Business } from '../types';
import { Logo } from './Logo';

interface QrBoardModalProps {
  business: Business;
  onClose: () => void;
  isHindi: boolean;
}

export const QrBoardModal: React.FC<QrBoardModalProps> = ({
  business,
  onClose,
  isHindi,
}) => {
  const [boardTheme, setBoardTheme] = useState<'acrylic' | 'classic' | 'brass'>('acrylic');
  const [copied, setCopied] = useState(false);

  if (!business) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    if (!business?.ufbi) return;
    navigator.clipboard?.writeText?.(
      `${window.location.origin}/?business=${business.ufbi}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E6DFD5] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6DFD5] bg-[#F5EFE6]">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#163828]" />
            <h3 className="text-base font-bold text-[#163828]">
              {isHindi ? 'भौतिक क्यूआर डिस्प्ले बोर्ड' : 'Physical QR Counter Display Mockup'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#556159] hover:text-[#163828] hover:bg-[#EAE2D8] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Controls */}
        <div className="px-6 py-3 bg-[#FAF8F5] border-b border-[#E6DFD5] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#556159]">Material Finish:</span>
            <div className="inline-flex rounded-lg p-0.5 bg-[#EDE6DC]">
              <button
                onClick={() => setBoardTheme('acrylic')}
                className={`px-3 py-1 rounded-md transition-colors font-medium ${
                  boardTheme === 'acrylic'
                    ? 'bg-white text-[#163828] shadow-xs'
                    : 'text-[#6C7770] hover:text-[#163828]'
                }`}
              >
                Clear Acrylic Stand
              </button>
              <button
                onClick={() => setBoardTheme('classic')}
                className={`px-3 py-1 rounded-md transition-colors font-medium ${
                  boardTheme === 'classic'
                    ? 'bg-white text-[#163828] shadow-xs'
                    : 'text-[#6C7770] hover:text-[#163828]'
                }`}
              >
                Forest Plaque
              </button>
              <button
                onClick={() => setBoardTheme('brass')}
                className={`px-3 py-1 rounded-md transition-colors font-medium ${
                  boardTheme === 'brass'
                    ? 'bg-white text-[#163828] shadow-xs'
                    : 'text-[#6C7770] hover:text-[#163828]'
                }`}
              >
                Warm Brass Mount
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#D5CBC0] bg-white text-[#163828] font-medium hover:bg-[#F2ECE4] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-[#D97724]" />
              <span>{copied ? 'Copied!' : 'Share UFBI'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#163828] text-white font-medium hover:bg-[#1f4a36] transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Board</span>
            </button>
          </div>
        </div>

        {/* The Physical Display Board Mockup Canvas */}
        <div className="p-6 sm:p-8 bg-[#EFE9DF]/70 flex flex-col items-center justify-center">
          {/* Acrylic Stand Mount Illusion */}
          <div
            className={`w-full max-w-sm rounded-3xl p-6 sm:p-7 relative transition-all duration-300 shadow-xl border ${
              boardTheme === 'acrylic'
                ? 'bg-gradient-to-b from-white to-[#FAF6F0] border-white/80 shadow-2xl ring-1 ring-black/5'
                : boardTheme === 'classic'
                ? 'bg-[#163828] text-white border-[#275841] shadow-2xl'
                : 'bg-gradient-to-b from-[#FFFDF7] to-[#F7EED9] border-[#E8D4A6] shadow-2xl ring-1 ring-[#D9A548]/30'
            }`}
          >
            {/* Top Screws / Fasteners for physical plaque reality */}
            <div className="flex justify-between items-center mb-4">
              <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-gray-400 to-gray-200 shadow-inner border border-gray-300/80 inline-block" />
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#E28738]/15 text-[#D97724] border border-[#E28738]/30">
                <Shield className="w-3 h-3" />
                <span>OFFICIAL VERIFICATION</span>
              </div>
              <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-gray-400 to-gray-200 shadow-inner border border-gray-300/80 inline-block" />
            </div>

            {/* Plaque Header */}
            <div className="text-center space-y-1">
              <div className="flex justify-center">
                <Logo
                  variant={boardTheme === 'classic' ? 'light' : 'full'}
                  size="md"
                  isHindi={isHindi}
                />
              </div>
              <p
                className={`text-xs font-bold uppercase tracking-widest pt-2 ${
                  boardTheme === 'classic' ? 'text-[#A7CBB7]' : 'text-[#5C6B62]'
                }`}
              >
                {isHindi ? 'सत्यापित खाद्य प्रतिष्ठान' : 'CITIZEN TRANSPARENCY QR'}
              </p>
            </div>

            {/* Central QR Code Stage */}
            <div className="my-5 flex flex-col items-center justify-center">
              <div className="p-3.5 bg-white rounded-2xl shadow-md border border-black/5 relative group">
                <svg
                  viewBox="0 0 160 160"
                  className="w-44 h-44"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer Frame */}
                  <rect width="160" height="160" fill="white" rx="8" />
                  {/* Faux High Density QR Matrix */}
                  <g fill="#163828">
                    {/* Top Left Finder */}
                    <rect x="10" y="10" width="38" height="38" rx="4" />
                    <rect x="16" y="16" width="26" height="26" fill="white" rx="2" />
                    <rect x="22" y="22" width="14" height="14" rx="2" />

                    {/* Top Right Finder */}
                    <rect x="112" y="10" width="38" height="38" rx="4" />
                    <rect x="118" y="16" width="26" height="26" fill="white" rx="2" />
                    <rect x="124" y="22" width="14" height="14" rx="2" />

                    {/* Bottom Left Finder */}
                    <rect x="10" y="112" width="38" height="38" rx="4" />
                    <rect x="16" y="118" width="26" height="26" fill="white" rx="2" />
                    <rect x="22" y="124" width="14" height="14" rx="2" />

                    {/* Faux Pattern Clusters */}
                    <rect x="56" y="12" width="6" height="34" />
                    <rect x="70" y="14" width="24" height="6" />
                    <rect x="66" y="28" width="10" height="14" />
                    <rect x="84" y="26" width="14" height="18" />
                    <rect x="14" y="56" width="32" height="6" />
                    <rect x="24" y="70" width="18" height="8" />
                    <rect x="12" y="86" width="14" height="14" />
                    <rect x="36" y="84" width="12" height="18" />

                    <rect x="56" y="56" width="48" height="48" rx="4" fill="#F4EDE4" />
                    <rect x="112" y="56" width="36" height="6" />
                    <rect x="120" y="68" width="16" height="24" />
                    <rect x="142" y="72" width="8" height="20" />
                    <rect x="112" y="98" width="36" height="6" />

                    <rect x="56" y="112" width="16" height="18" />
                    <rect x="80" y="118" width="24" height="10" />
                    <rect x="64" y="136" width="34" height="12" />
                    <rect x="110" y="112" width="16" height="16" />
                    <rect x="132" y="114" width="18" height="12" />
                    <rect x="116" y="134" width="34" height="14" />
                  </g>

                  {/* Center Emblem in QR */}
                  <g transform="translate(62, 62)">
                    <rect width="36" height="36" rx="8" fill="#163828" />
                    <circle cx="18" cy="18" r="14" fill="#FAF8F5" />
                    <path
                      d="M 12 18 L 16 22 L 24 14"
                      stroke="#163828"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>

                {/* Subtitle tag */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#163828] text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full tracking-wider whitespace-nowrap shadow-xs">
                  SCAN TO VERIFY
                </div>
              </div>
            </div>

            {/* Business Details On Board */}
            <div className="text-center space-y-1.5 pt-1">
              <h4
                className={`text-base font-extrabold line-clamp-1 ${
                  boardTheme === 'classic' ? 'text-white' : 'text-[#163828]'
                }`}
              >
                {business.name}
              </h4>
              <p
                className={`text-xs ${
                  boardTheme === 'classic' ? 'text-[#B0D1BF]' : 'text-[#616D65]'
                }`}
              >
                {business.category} • {business.locality}, Jabalpur
              </p>

              {/* UFBI Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/5 font-mono text-xs font-bold tracking-wider">
                <span className="text-[#D97724]">UFBI:</span>
                <span>{business.ufbi}</span>
              </div>
            </div>

            {/* Tagline Footer */}
            <div
              className={`mt-4 pt-3 border-t text-center text-[10.5px] font-medium italic ${
                boardTheme === 'classic'
                  ? 'border-[#26573F] text-[#86AE97]'
                  : 'border-[#E6DFD5] text-[#717E76]'
              }`}
            >
              “Know before you eat.” • “जानें। सत्यापित करें। भरोसे के साथ खाएँ।”
            </div>

            {/* Bottom Screws */}
            <div className="flex justify-between items-center mt-3">
              <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-gray-400 to-gray-200 shadow-inner border border-gray-300/80 inline-block" />
              <span className="text-[9px] uppercase tracking-widest text-[#9EA9A2] font-semibold">
                PROTOTYPE PILOT DISPLAY
              </span>
              <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-gray-400 to-gray-200 shadow-inner border border-gray-300/80 inline-block" />
            </div>
          </div>

          {/* Stand Footing Shadow Graphic */}
          <div className="w-48 h-3.5 bg-black/15 rounded-full blur-md -mt-1" />
        </div>

        {/* Modal Info Footer */}
        <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#E6DFD5] text-xs text-[#5D6B62] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#2D7A4D]" />
            <span>
              {isHindi
                ? 'यह बोर्ड काउंटर पर अथवा प्रवेश द्वार पर प्रदर्शित किया जाता है।'
                : 'Standard 6×8 inch acrylic counter stand designed for restaurant billing/entrance.'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-[#D5CBC0] font-semibold hover:bg-[#EDE6DC] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
