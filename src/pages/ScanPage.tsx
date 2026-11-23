import React, { useState } from 'react';
import {
  QrCode,
  Camera,
  Search,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { Business } from '../types';
import { VerificationBadge } from '../components/VerificationBadge';
import { FssaiComplianceBadge } from '../components/FssaiComplianceBadge';
import { SafeImage } from '../components/SafeImage';
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

  // Quick simulation presets with accurate business labels
  const sample1 = businesses.find(b => b.ufbi === 'JBP-DEMO-0001') || businesses[0] || JABALPUR_BUSINESSES[0];
  const sample2 = businesses.find(b => b.ufbi === 'JBP-DEMO-0005') || businesses[4] || JABALPUR_BUSINESSES[0];
  const sample3 = businesses.find(b => b.ufbi === 'JBP-DEMO-0016') || businesses[15] || businesses[2] || JABALPUR_BUSINESSES[0];

  const handleSimulateScan = (biz?: Business) => {
    if (!biz) return;
    setIsScanningActive(true);
    setHasError(false);
    setTimeout(() => {
      setScannedBusiness(biz);
      setManualInput(biz.ufbi);
      setIsScanningActive(false);
    }, 500);
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
      setIsScanningActive(false);
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-[#0B2545] text-white rounded-xl p-6 sm:p-8 border border-[#1E3A5F] shadow-md gov-grid-pattern text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#071A33] border border-[#1E3A5F] text-[#FBBF24] text-xs font-bold uppercase tracking-wider">
          <QrCode className="w-3.5 h-3.5" />
          <span>{isHindi ? 'नागरिक सत्यापन स्कैनर' : 'Citizen QR & UFBI Verification Terminal'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          {isHindi ? 'क्यूआर स्कैन करें या Food ID दर्ज करें' : 'Scan Counter Plaque or Enter UFBI'}
        </h1>
        <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-xl mx-auto">
          {isHindi
            ? 'प्रतिष्ठान के काउंटर या बिलिंग स्टैंड पर लगा AaharSetu क्यूआर कोड स्कैन करें।'
            : 'Verify any AaharSetu counter plaque or enter the establishment’s Universal Food Business ID.'}
        </p>
      </div>

      {/* Main Scanner Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Viewfinder Simulation / Camera */}
        <div className="md:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-xl bg-[#071A33] p-4 overflow-hidden shadow-lg border-2 border-[#CBD5E1] flex flex-col justify-between">
            {/* Camera Viewfinder Corners */}
            <div className="absolute inset-8 pointer-events-none border border-white/20 rounded-xl">
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-3 border-l-3 border-[#FBBF24] rounded-tl-md" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-3 border-r-3 border-[#FBBF24] rounded-tr-md" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-3 border-l-3 border-[#FBBF24] rounded-bl-md" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-3 border-r-3 border-[#FBBF24] rounded-br-md" />

              {isScanningActive && (
                <div className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-[#FBBF24] to-transparent shadow-[0_0_10px_#FBBF24] animate-bounce" />
              )}
            </div>

            {/* Viewfinder Top Bar */}
            <div className="relative z-10 flex items-center justify-between text-white/90 text-xs px-2">
              <span className="flex items-center gap-1.5 font-mono text-[11px]">
                <Camera className="w-3.5 h-3.5 text-[#FBBF24]" />
                <span>OPTICAL READER READY</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 border border-white/15">
                UFBI v2
              </span>
            </div>

            {/* Center QR Graphic Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto space-y-2.5 text-white/80">
              <QrCode className="w-20 h-20 text-white/35" />
              <p className="text-xs font-medium text-center text-white">
                {isScanningActive
                  ? isHindi
                    ? 'क्यूआर कोड को चौखट के मध्य में रखें'
                    : 'Align AaharSetu QR plaque within viewfinder'
                  : 'Establishment Record Verified'}
              </p>
            </div>

            {/* Bottom Status Inside Viewfinder */}
            <div className="relative z-10 text-center">
              <span className="text-[10px] text-[#CBD5E1] tracking-wider font-mono">
                PUBLIC VERIFICATION TERMINAL · JABALPUR PILOT
              </span>
            </div>
          </div>

          {/* Quick Simulation One-Click Buttons */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-[#0B2545] uppercase tracking-wider block">
              Simulate Counter Scan (Sample Records):
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[sample1, sample2, sample3].map(sample => (
                <button
                  key={sample.id}
                  onClick={() => handleSimulateScan(sample)}
                  className="p-2.5 rounded-lg border border-[#CBD5E1] bg-white text-left hover:border-[#0B2545] hover:bg-[#F8FAFC] transition-all shadow-xs"
                >
                  <span className="text-[10px] font-mono text-[#B45309] font-bold block">
                    {sample.ufbi}
                  </span>
                  <span className="text-xs font-bold text-[#0B2545] line-clamp-1">
                    {sample.name}
                  </span>
                  <span
                    className={`text-[10px] font-semibold ${
                      sample.officialStatus === 'VERIFIED' ? 'text-[#14532D]' : 'text-[#B45309]'
                    }`}
                  >
                    {sample.officialStatus}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Manual ID Input & Scanned Verification Card */}
        <div className="md:col-span-6 space-y-6">
          {/* Manual Input Form */}
          <div className="bg-white rounded-xl p-6 border border-[#CBD5E1] shadow-xs space-y-4">
            <h3 className="text-base font-serif font-bold text-[#0B2545]">
              {isHindi ? 'फूड आईडी (UFBI) द्वारा खोजें' : 'Manual Universal Food ID Lookup'}
            </h3>
            <p className="text-xs text-[#475569]">
              Enter the Universal Food Business ID printed below the counter QR code or search by establishment name.
            </p>

            <form onSubmit={handleManualSearch} className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#475569]" />
                <input
                  type="text"
                  value={manualInput}
                  onChange={e => {
                    setManualInput(e.target.value);
                    setHasError(false);
                  }}
                  placeholder="e.g. JBP-DEMO-0016 or Indian Coffee House"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-sm text-[#0F172A] font-mono focus:ring-2 focus:ring-[#0B2545] focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0B2545] text-white font-bold text-xs rounded-lg hover:bg-[#13315C] transition-colors"
                >
                  {isHindi ? 'सत्यापित करें' : 'Verify Establishment ID'}
                </button>
                {scannedBusiness && (
                  <button
                    type="button"
                    onClick={handleResetScan}
                    className="p-2.5 rounded-lg border border-[#CBD5E1] text-[#0B2545] hover:bg-[#EEF2F6]"
                    title="Reset Scan"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>

            {hasError && (
              <div className="p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>
                  No registry record found for “{manualInput}”. Verify the UFBI format (e.g. JBP-DEMO-0001) and retry.
                </span>
              </div>
            )}
          </div>

          {/* Instant Scanned Verification Result Card */}
          {scannedBusiness && (
            <div className="bg-white rounded-xl border-2 border-[#0B2545] p-6 shadow-md space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-[#CBD5E1]">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B45309]">
                    STATUTORY VERIFICATION RESULT
                  </span>
                  <div className="font-mono text-xs font-bold text-[#0B2545]">
                    {scannedBusiness.ufbi}
                  </div>
                </div>
                <VerificationBadge status={scannedBusiness.officialStatus} size="md" />
              </div>

              <div className="flex items-start gap-3.5">
                <SafeImage
                  src={scannedBusiness.image}
                  alt={scannedBusiness.name}
                  className="w-16 h-16 rounded-lg object-cover border border-[#CBD5E1] shrink-0"
                />
                <div className="space-y-1 flex-1">
                  <h4 className="text-base font-serif font-bold text-[#0B2545] leading-tight">
                    {scannedBusiness.name}
                  </h4>
                  <p className="text-xs text-[#475569]">
                    {scannedBusiness.locality}, Jabalpur · {scannedBusiness.category}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    <p className="text-[11px] text-[#334155]">
                      Last Inspected: <strong className="tabular-nums">{scannedBusiness.lastInspectedDate}</strong>
                    </p>
                    <FssaiComplianceBadge business={scannedBusiness} size="sm" isHindi={isHindi} />
                  </div>
                </div>
              </div>

              {/* 4 Pillars Mini Grid */}
              <div className="grid grid-cols-2 gap-2 text-[11px] py-2.5 px-3 bg-[#F8FAFC] rounded-lg border border-[#CBD5E1]">
                <div className="flex items-center gap-1.5 text-[#0F172A]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#14532D]" />
                  <span>Identity: {scannedBusiness.pillars.businessIdentity.status}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#0F172A]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#14532D]" />
                  <span>Premises: {scannedBusiness.pillars.locationVerification.status}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#0F172A]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#14532D]" />
                  <span>Licences: {scannedBusiness.pillars.applicableRegistration.status}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#0F172A]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#14532D]" />
                  <span>Hygiene Grade: {scannedBusiness.hygieneRating}/5</span>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => onSelectBusiness(scannedBusiness)}
                className="w-full py-3 rounded-lg bg-[#0B2545] hover:bg-[#13315C] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>{isHindi ? 'पूरा प्रोफाइल एवं साक्ष्य देखें' : 'Open Complete Compliance Dossier'}</span>
                <ArrowRight className="w-4 h-4 text-[#FBBF24]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
