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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#F8FAFC] rounded-xl shadow-2xl border border-[#CBD5E1] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#CBD5E1] bg-[#0B2545] text-white">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#FBBF24]" />
            <h3 className="text-base font-bold">
              {isHindi ? 'भौतिक क्यूआर डिस्प्ले बोर्ड' : 'Official Counter QR Plaque Mockup'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#CBD5E1] hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Controls */}
        <div className="px-6 py-3 bg-[#EEF2F6] border-b border-[#CBD5E1] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#334155]">Plaque Finish:</span>
            <div className="inline-flex rounded-lg p-0.5 bg-[#DCE3EB] border border-[#CBD5E1]">
              <button
                onClick={() => setBoardTheme('acrylic')}
                className={`px-3 py-1 rounded-md transition-colors font-medium ${
                  boardTheme === 'acrylic'
                    ? 'bg-white text-[#0B2545] shadow-xs'
                    : 'text-[#475569] hover:text-[#0B2545]'
                }`}
              >
                Acrylic Counter Stand
              </button>
              <button
                onClick={() => setBoardTheme('classic')}
                className={`px-3 py-1 rounded-md transition-colors font-medium ${
                  boardTheme === 'classic'
                    ? 'bg-white text-[#0B2545] shadow-xs'
                    : 'text-[#475569] hover:text-[#0B2545]'
                }`}
              >
                Sovereign Navy Plaque
              </button>
              <button
                onClick={() => setBoardTheme('brass')}
                className={`px-3 py-1 rounded-md transition-colors font-medium ${
                  boardTheme === 'brass'
                    ? 'bg-white text-[#0B2545] shadow-xs'
                    : 'text-[#475569] hover:text-[#0B2545]'
                }`}
              >
                Official Brass Mount
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-white text-[#0B2545] font-semibold hover:bg-[#E7ECF1] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-[#B45309]" />
              <span>{copied ? 'Copied!' : 'Share UFBI'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0B2545] text-white font-semibold hover:bg-[#13315C] transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Plaque</span>
            </button>
          </div>
        </div>

        {/* The Physical Display Board Mockup Canvas */}
        <div className="p-6 sm:p-8 bg-[#DCE3EB] flex flex-col items-center justify-center">
          {/* Acrylic Stand Mount Illusion */}
          <div
            className={`w-full max-w-sm rounded-2xl p-6 sm:p-7 relative transition-all duration-300 shadow-xl border ${
              boardTheme === 'acrylic'
                ? 'bg-gradient-to-b from-white to-[#F1F5F9] border-white shadow-2xl ring-1 ring-black/5'
                : boardTheme === 'classic'
                ? 'bg-[#0B2545] text-white border-[#1E3A5F] shadow-2xl'
                : 'bg-gradient-to-b from-[#FFFDF7] to-[#F5EBD2] border-[#D9A548] shadow-2xl ring-1 ring-[#D9A548]/40'
            }`}
          >
            {/* Top Screws / Fasteners for physical plaque reality */}
            <div className="flex justify-between items-center mb-4">
              <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-slate-400 to-slate-200 shadow-inner border border-slate-300/80 inline-block" />
              <div
                className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md border ${
                  boardTheme === 'classic'
                    ? 'bg-[#B45309]/25 text-[#FBBF24] border-[#FBBF24]/30'
                    : 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
                }`}
              >
                <Shield className="w-3 h-3" />
                <span>OFFICIAL VERIFICATION</span>
              </div>
              <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-slate-400 to-slate-200 shadow-inner border border-slate-300/80 inline-block" />
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
                  boardTheme === 'classic' ? 'text-[#CBD5E1]' : 'text-[#475569]'
                }`}
              >
                {isHindi ? 'सत्यापित खाद्य प्रतिष्ठान' : 'CITIZEN TRANSPARENCY QR'}
              </p>
            </div>

            {/* Central QR Code Stage */}
            <div className="my-5 flex flex-col items-center justify-center">
              <div className="p-3.5 bg-white rounded-xl shadow-md border border-[#CBD5E1] relative group">
                <svg
                  viewBox="0 0 160 160"
                  className="w-44 h-44"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer Frame */}
                  <rect width="160" height="160" fill="white" rx="8" />
                  {/* High Density Sovereign Navy QR Matrix */}
                  <g fill="#0B2545">
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

                    {/* Pattern Clusters */}
                    <rect x="56" y="12" width="6" height="34" />
                    <rect x="70" y="14" width="24" height="6" />
                    <rect x="66" y="28" width="10" height="14" />
                    <rect x="84" y="26" width="14" height="18" />
                    <rect x="14" y="56" width="32" height="6" />
                    <rect x="24" y="70" width="18" height="8" />
                    <rect x="12" y="86" width="14" height="14" />
                    <rect x="36" y="84" width="12" height="18" />

                    <rect x="56" y="56" width="48" height="48" rx="4" fill="#EEF2F6" />
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
                    <rect width="36" height="36" rx="8" fill="#0B2545" />
                    <circle cx="18" cy="18" r="14" fill="#F8FAFC" />
                    <path
                      d="M 12 18 L 16 22 L 24 14"
                      stroke="#14532D"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>

                {/* Subtitle tag */}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#0B2545] text-[#FBBF24] text-[9px] font-bold px-3 py-0.5 rounded-md tracking-wider whitespace-nowrap shadow-xs border border-[#1E3A5F]">
                  SCAN TO VERIFY
                </div>
              </div>
            </div>

            {/* Business Details On Board */}
            <div className="text-center space-y-1.5 pt-1">
              <h4
                className={`text-base font-extrabold line-clamp-1 ${
                  boardTheme === 'classic' ? 'text-white' : 'text-[#0B2545]'
                }`}
              >
                {business.name}
              </h4>
              <p
                className={`text-xs ${
                  boardTheme === 'classic' ? 'text-[#CBD5E1]' : 'text-[#475569]'
                }`}
              >
                {business.category} · {business.locality}, Jabalpur
              </p>

              {/* UFBI Badge */}
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-mono text-xs font-bold tracking-wider border ${
                  boardTheme === 'classic'
                    ? 'bg-white/10 text-white border-white/15'
                    : 'bg-[#EEF2F6] text-[#0B2545] border-[#CBD5E1]'
                }`}
              >
                <span className={boardTheme === 'classic' ? 'text-[#FBBF24]' : 'text-[#B45309]'}>
                  UFBI:
                </span>
                <span>{business.ufbi}</span>
              </div>
            </div>

            {/* Tagline Footer */}
            <div
              className={`mt-4 pt-3 border-t text-center text-[10.5px] font-medium italic ${
                boardTheme === 'classic'
                  ? 'border-[#1E3A5F] text-[#CBD5E1]'
                  : 'border-[#CBD5E1] text-[#475569]'
              }`}
            >
              “Know. Verify. Eat with Confidence.” · “जानें। सत्यापित करें। भरोसे के साथ खाएँ।”
            </div>

            {/* Bottom Screws */}
            <div className="flex justify-between items-center mt-3">
              <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-slate-400 to-slate-200 shadow-inner border border-slate-300/80 inline-block" />
              <span
                className={`text-[9px] uppercase tracking-widest font-semibold ${
                  boardTheme === 'classic' ? 'text-[#94A3B8]' : 'text-[#64748B]'
                }`}
              >
                JABALPUR PILOT DISPLAY
              </span>
              <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-slate-400 to-slate-200 shadow-inner border border-slate-300/80 inline-block" />
            </div>
          </div>

          {/* Stand Footing Shadow Graphic */}
          <div className="w-48 h-3.5 bg-black/20 rounded-full blur-md -mt-1" />
        </div>

        {/* Modal Info Footer */}
        <div className="px-6 py-4 bg-[#F8FAFC] border-t border-[#CBD5E1] text-xs text-[#475569] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#14532D] shrink-0" />
            <span>
              {isHindi
                ? 'यह बोर्ड काउंटर पर अथवा प्रवेश द्वार पर प्रदर्शित किया जाता है।'
                : 'Standard 6×8 inch counter stand designed for establishment billing & entrance verification.'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-[#CBD5E1] bg-white text-[#0B2545] font-semibold hover:bg-[#E7ECF1] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
