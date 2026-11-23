import React, { useState } from 'react';
import {
  QrCode,
  Camera,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Sparkles,
  Shield,
  HelpCircle,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { Business } from '../types';
import { VerificationBadge } from '../components/VerificationBadge';
import { JABALPUR_BUSINESSES } from '../data/mockData';

interface ScanPageProps {
  businesses: Business[];
  onSelectBusiness: (b: Business) => void;
  isHindi: boolean;
}

export const ScanPage: React.FC<ScanPageProps> = ({
  businesses,
  onSelectBusiness,
  isHindi,
}) => {
  const [manualInput, setManualInput] = useState('');
  const [scannedBusiness, setScannedBusiness] = useState<Business | null>(null);
  const [isScanningActive, setIsScanningActive] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Quick simulation presets with safe fallbacks
  const sample1 = businesses.find(b => b.ufbi === 'JBP-DEMO-0001') || businesses[0] || JABALPUR_BUSINESSES[0];
  const sample2 = businesses.find(b => b.ufbi === 'JBP-DEMO-0005') || businesses[1] || JABALPUR_BUSINESSES[4] || JABALPUR_BUSINESSES[0];
  const sample3 = businesses.find(b => b.ufbi === 'JBP-DEMO-0003') || businesses[2] || JABALPUR_BUSINESSES[2] || JABALPUR_BUSINESSES[0];

  const handleSimulateScan = (biz?: Business) => {
    if (!biz) return;
    setIsScanningActive(true);
    setHasError(false);
    setTimeout(() => {
      setScannedBusiness(biz);
      setManualInput(biz.ufbi);
      setIsScanningActive(false);
    }, 600);
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;

    const query = manualInput.trim().toUpperCase();
    const found = businesses.find(
      b =>
        b.ufbi.toUpperCase() === query ||
        b.ufbi.replace(/[^A-Z0-9]/g, '') === query.replace(/[^A-Z0-9]/g, '') ||
        b.name.toLowerCase().includes(query.toLowerCase())
    );

    if (found) {
      setScannedBusiness(found);
      setHasError(false);
    } else {
      setScannedBusiness(null);
      setHasError(true);
    }
  };

  const handleResetScan = () => {
    setScannedBusiness(null);
    setManualInput('');
    setHasError(false);
    setIsScanningActive(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#D97724] text-xs font-bold uppercase tracking-wider">
          <QrCode className="w-3.5 h-3.5" />
          <span>{isHindi ? 'नागरिक सत्यापन स्कैनर' : 'Citizen Verification Scanner'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#163828] tracking-tight">
          {isHindi ? 'क्यूआर स्कैन करें या Food ID दर्ज करें' : 'Scan QR or Enter Universal Food ID'}
        </h1>
        <p className="text-sm text-[#59665E] max-w-lg mx-auto">
          {isHindi
            ? 'प्रतिष्ठान के काउंटर या बिलिंग स्टैंड पर लगा AaharSetu क्यूआर कोड सीधे स्कैन करें।'
            : 'Point camera at any AaharSetu counter plaque or enter the 11-digit UFBI identifier.'}
        </p>
      </div>

      {/* Main Scanner Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Viewfinder Simulation / Camera */}
        <div className="md:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl bg-[#163828] p-4 overflow-hidden shadow-2xl border-4 border-[#FAF8F5] ring-1 ring-black/10 flex flex-col justify-between">
            {/* Camera Viewfinder Corners */}
            <div className="absolute inset-8 pointer-events-none border border-white/20 rounded-2xl">
              {/* Top Left Corner */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-3 border-l-3 border-[#52B788] rounded-tl-lg" />
              {/* Top Right Corner */}
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-3 border-r-3 border-[#52B788] rounded-tr-lg" />
              {/* Bottom Left Corner */}
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-3 border-l-3 border-[#52B788] rounded-bl-lg" />
              {/* Bottom Right Corner */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-3 border-r-3 border-[#52B788] rounded-br-lg" />

              {/* Scanning Laser Animation */}
              {isScanningActive && (
                <div className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-[#52B788] to-transparent shadow-[0_0_12px_#52B788] animate-bounce" />
              )}
            </div>

            {/* Viewfinder Top Bar */}
            <div className="relative z-10 flex items-center justify-between text-white/80 text-xs px-2">
              <span className="flex items-center gap-1.5 font-mono text-[11px]">
                <Camera className="w-3.5 h-3.5 text-[#52B788]" />
                <span>CAMERA ACTIVE</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10">
                AUTO-FOCUS
              </span>
            </div>

            {/* Center QR Graphic Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto space-y-2 text-white/70">
              <QrCode className="w-20 h-20 text-white/40 animate-pulse" />
              <p className="text-xs font-medium text-center text-white/90">
                {isScanningActive
                  ? isHindi
                    ? 'क्यूआर कोड को चौखट के मध्य में रखें'
                    : 'Position AaharSetu QR inside the frame'
                  : 'QR Scanned Successfully!'}
              </p>
            </div>

            {/* Bottom Status Inside Viewfinder */}
            <div className="relative z-10 text-center">
              <span className="text-[10px] text-white/70 tracking-wider font-mono">
                SECURE SANDBOX • JABALPUR PILOT
              </span>
            </div>
          </div>

          {/* Quick Simulation One-Click Buttons */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-[#163828] uppercase tracking-wider block">
              Quick Test Simulation:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleSimulateScan(sample1)}
                className="p-2.5 rounded-xl border border-[#D5CBC0] bg-white text-left hover:border-[#163828] transition-all shadow-xs"
              >
                <span className="text-[10px] font-mono text-[#D97724] font-bold block">
                  DEMO-0001
                </span>
                <span className="text-xs font-bold text-[#163828] line-clamp-1">
                  Verandah Brew
                </span>
                <span className="text-[10px] text-[#1B5E20] font-semibold">Verified</span>
              </button>

              <button
                onClick={() => handleSimulateScan(sample2)}
                className="p-2.5 rounded-xl border border-[#D5CBC0] bg-white text-left hover:border-[#163828] transition-all shadow-xs"
              >
                <span className="text-[10px] font-mono text-[#D97724] font-bold block">
                  DEMO-0005
                </span>
                <span className="text-xs font-bold text-[#163828] line-clamp-1">
                  New Shere Punjab
                </span>
                <span className="text-[10px] text-[#B45309] font-semibold">Conditional</span>
              </button>

              <button
                onClick={() => handleSimulateScan(sample3)}
                className="p-2.5 rounded-xl border border-[#D5CBC0] bg-white text-left hover:border-[#163828] transition-all shadow-xs"
              >
                <span className="text-[10px] font-mono text-[#D97724] font-bold block">
                  DEMO-0003
                </span>
                <span className="text-xs font-bold text-[#163828] line-clamp-1">
                  Indian Coffee House
                </span>
                <span className="text-[10px] text-[#1B5E20] font-semibold">Verified</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Manual ID Input & Scanned Verification Card */}
        <div className="md:col-span-6 space-y-6">
          {/* Manual Input Form */}
          <div className="bg-white rounded-2xl p-6 border border-[#E6DFD5] shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-[#163828]">
              {isHindi ? 'फूड आईडी (UFBI) द्वारा खोजें' : 'Manual Universal ID Search'}
            </h3>
            <p className="text-xs text-[#5C6961]">
              If your camera is unavailable, enter the Food ID displayed beneath the QR board.
            </p>

            <form onSubmit={handleManualSearch} className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7E8C83]" />
                <input
                  type="text"
                  value={manualInput}
                  onChange={e => {
                    setManualInput(e.target.value);
                    setHasError(false);
                  }}
                  placeholder="e.g. JBP-DEMO-0001 or business name"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5CBC0] text-sm text-[#163828] font-mono uppercase focus:ring-2 focus:ring-[#163828] focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#163828] text-white font-bold text-xs rounded-xl hover:bg-[#1f4a36] transition-colors"
                >
                  {isHindi ? 'सत्यापित करें' : 'Verify ID'}
                </button>
                {scannedBusiness && (
                  <button
                    type="button"
                    onClick={handleResetScan}
                    className="p-2.5 rounded-xl border border-[#D5CBC0] text-[#163828] hover:bg-[#FAF8F5]"
                    title="Reset Scan"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>

            {hasError && (
              <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>
                  No matching food establishment found for "{manualInput}". Please check the ID and
                  retry.
                </span>
              </div>
            )}
          </div>

          {/* Instant Scanned Verification Result Card */}
          {scannedBusiness && (
            <div className="bg-white rounded-3xl border-2 border-[#163828] p-6 shadow-xl space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1]">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97724]">
                    VERIFICATION RESULT
                  </span>
                  <div className="font-mono text-xs font-bold text-[#163828]">
                    {scannedBusiness.ufbi}
                  </div>
                </div>
                <VerificationBadge status={scannedBusiness.officialStatus} size="md" />
              </div>

              <div className="flex items-start gap-3.5">
                <img
                  src={scannedBusiness.image}
                  alt={scannedBusiness.name}
                  className="w-16 h-16 rounded-xl object-cover border border-[#E6DFD5]"
                />
                <div className="space-y-1 flex-1">
                  <h4 className="text-base font-extrabold text-[#163828] leading-tight">
                    {scannedBusiness.name}
                  </h4>
                  <p className="text-xs text-[#627068]">
                    {scannedBusiness.locality}, Jabalpur • {scannedBusiness.category}
                  </p>
                  <p className="text-[11px] text-[#4F5D54]">
                    Last Inspected: <strong>{scannedBusiness.lastInspectedDate}</strong>
                  </p>
                </div>
              </div>

              {/* 4 Pillars Mini Grid */}
              <div className="grid grid-cols-2 gap-2 text-[11px] py-2.5 px-3 bg-[#FAF7F2] rounded-xl border border-[#ECE5DA]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2D7A4D]" />
                  <span>Identity Verified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2D7A4D]" />
                  <span>Location Geo-locked</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2D7A4D]" />
                  <span>Registration Active</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2D7A4D]" />
                  <span>Audit History Clear</span>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => onSelectBusiness(scannedBusiness)}
                className="w-full py-3 rounded-xl bg-[#163828] hover:bg-[#1f4a36] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{isHindi ? 'पूरा प्रोफाइल एवं साक्ष्य देखें' : 'View Full Profile & Evidence'}</span>
                <ArrowRight className="w-4 h-4 text-[#E28738]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
