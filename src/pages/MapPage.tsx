import React, { useState, useEffect } from 'react';
import {
  MapPin,
  ArrowRight,
  Crosshair,
} from 'lucide-react';
import { Business } from '../types';
import { VerificationBadge } from '../components/VerificationBadge';
import { FssaiComplianceBadge } from '../components/FssaiComplianceBadge';
import { SafeImage } from '../components/SafeImage';

interface MapPageProps {
  businesses: Business[];
  onSelectBusiness: (b: Business) => void;
  isHindi: boolean;
}

export const MapPage: React.FC<MapPageProps> = ({
  businesses,
  onSelectBusiness,
  isHindi,
}) => {
  const [selectedLocality, setSelectedLocality] = useState<string>('All');
  const [activePinBusiness, setActivePinBusiness] = useState<Business | null>(businesses[0] || null);

  useEffect(() => {
    if (!activePinBusiness && businesses.length > 0) {
      setActivePinBusiness(businesses[0]);
    }
  }, [businesses, activePinBusiness]);

  const localities = [
    'All',
    'Civil Lines',
    'Sadar',
    'Napier Town',
    'Wright Town',
    'Russell Chowk',
    'Ganjipura',
    'Gorakhpur',
    'Madan Mahal',
    'Vijay Nagar',
    'Garha',
    'Cantt',
    'Tilhari',
    'Gwarighat',
    'Adhartal',
    'Ranjhi',
  ];

  const filteredBusinesses =
    selectedLocality === 'All'
      ? businesses
      : businesses.filter(b => b.locality.toLowerCase() === selectedLocality.toLowerCase());

  // Geographic bounds covering Gwarighat (23.1225) to Adhartal (23.1942) and Garha (79.914) to Ranjhi (79.9685)
  const minLat = 23.115;
  const maxLat = 23.20;
  const minLng = 79.905;
  const maxLng = 79.975;

  const getPinPosition = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;
    const clampedX = Math.min(Math.max(x, 7), 93);
    const clampedY = Math.min(Math.max(y, 8), 92);
    return { left: `${clampedX}%`, top: `${clampedY}%` };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Ward Selector */}
      <div className="bg-[#0B2545] text-white rounded-xl p-6 border border-[#1E3A5F] shadow-md gov-grid-pattern flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#FBBF24]">
            <MapPin className="w-3.5 h-3.5" />
            <span>{isHindi ? 'जबलपुर नगर निगम भू-मानचित्र' : 'Jabalpur Municipal GIS Compliance Map'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            {isHindi ? 'निकटवर्ती खाद्य प्रतिष्ठान मानचित्र' : 'Ward-Wise Food Safety Geo-Registry'}
          </h1>
          <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-2xl">
            Interactive spatial distribution of <strong className="text-white tabular-nums">{businesses.length}</strong>{' '}
            registered food establishments across Jabalpur municipal wards, coded by statutory inspection standing.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <label className="text-xs font-semibold text-[#CBD5E1]" htmlFor="wardFilterSelect">
            Filter Ward:
          </label>
          <select
            id="wardFilterSelect"
            value={selectedLocality}
            onChange={e => setSelectedLocality(e.target.value)}
            className="bg-[#071A33] border border-[#1E3A5F] text-white text-xs font-bold rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#FBBF24]"
          >
            {localities.map(loc => (
              <option key={loc} value={loc}>
                {loc === 'All' ? `All Wards (${businesses.length})` : loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Map Container: Left interactive Canvas/SVG + Right business card details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Map Stage (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#CBD5E1] overflow-hidden shadow-xs relative h-[480px] sm:h-[580px]">
          {/* Cartographic Archival Slate SVG Background */}
          <div className="absolute inset-0 bg-[#DCE3EB] overflow-hidden select-none">
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full opacity-80 pointer-events-none"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Municipal Grid Lines */}
              <defs>
                <pattern id="wardGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CBD5E1" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="800" height="600" fill="url(#wardGrid)" />

              {/* Narmada River Basin (South Corridor) */}
              <path
                d="M -50 545 C 150 515, 300 475, 500 520 C 650 550, 750 525, 850 555"
                fill="none"
                stroke="#93C5FD"
                strokeWidth="30"
                strokeLinecap="round"
              />
              <path
                d="M -50 545 C 150 515, 300 475, 500 520 C 650 550, 750 525, 850 555"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="14"
                strokeLinecap="round"
              />

              {/* Major Arterial Roads of Jabalpur */}
              <path d="M 50 50 L 750 550" stroke="#94A3B8" strokeWidth="4" strokeDasharray="6 4" opacity="0.5" />
              <path d="M 750 80 L 80 500" stroke="#94A3B8" strokeWidth="4" opacity="0.5" />
              <path d="M 400 20 C 380 200, 420 380, 400 570" stroke="#CBD5E1" strokeWidth="8" />
              <path d="M 40 280 C 250 270, 550 290, 780 270" stroke="#CBD5E1" strokeWidth="8" />

              {/* Madan Mahal & Cantonment Ridge contours */}
              <circle cx="240" cy="400" r="65" fill="#CBD5E1" opacity="0.45" />
              <circle cx="580" cy="180" r="85" fill="#CBD5E1" opacity="0.45" />

              {/* Landmark Ward Labels */}
              <text x="610" y="90" fill="#475569" fontSize="11" fontWeight="bold">Adhartal</text>
              <text x="670" y="150" fill="#475569" fontSize="11" fontWeight="bold">Ranjhi</text>
              <text x="190" y="110" fill="#475569" fontSize="11" fontWeight="bold">Vijay Nagar</text>
              <text x="350" y="255" fill="#334155" fontSize="12" fontWeight="bold">Civil Lines</text>
              <text x="480" y="315" fill="#334155" fontSize="12" fontWeight="bold">Sadar & Cantt</text>
              <text x="240" y="245" fill="#475569" fontSize="11" fontWeight="bold">Napier / Wright Town</text>
              <text x="130" y="385" fill="#475569" fontSize="11" fontWeight="bold">Garha / Madan Mahal</text>
              <text x="275" y="515" fill="#1E3A8A" fontSize="12" fontWeight="bold">Gwarighat · Narmada Basin</text>
            </svg>

            {/* Render Map Pins */}
            {filteredBusinesses.map(biz => {
              const pos = getPinPosition(biz.coordinates.lat, biz.coordinates.lng);
              const isSelected = activePinBusiness?.id === biz.id;

              const pinColor =
                biz.officialStatus === 'VERIFIED'
                  ? 'bg-[#14532D] text-white border-[#86EFAC]'
                  : biz.officialStatus === 'CONDITIONAL'
                  ? 'bg-[#B45309] text-white border-[#FDE68A]'
                  : 'bg-[#475569] text-white border-[#CBD5E1]';

              return (
                <div
                  key={biz.id}
                  style={{ left: pos.left, top: pos.top }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-transform duration-200"
                >
                  <button
                    onClick={() => setActivePinBusiness(biz)}
                    className={`relative p-1.5 rounded-full shadow-md border-2 flex items-center justify-center transition-all ${pinColor} ${
                      isSelected ? 'scale-125 ring-4 ring-[#0B2545]/30 z-30' : 'hover:scale-110'
                    }`}
                    title={`${biz.name} (${biz.officialStatus})`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    {isSelected && (
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#071A33] text-[#FBBF24] text-[9.5px] font-bold px-2.5 py-0.5 rounded-md whitespace-nowrap shadow-md border border-[#1E3A5F]">
                        {biz.name}
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Map Controls Top Right */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            <div className="bg-white/95 backdrop-blur-xs rounded-lg border border-[#CBD5E1] shadow-sm p-1">
              <button
                onClick={() => setSelectedLocality('All')}
                className="p-2 hover:bg-[#EEF2F6] rounded-md text-[#0B2545]"
                title="Show All Wards"
              >
                <Crosshair className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Map Status Legend Bottom Left */}
          <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-xs px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] shadow-sm flex flex-wrap items-center gap-4 text-[11px] font-semibold text-[#0B2545] tabular-nums">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#14532D]" />
              <span>Verified ({businesses.filter(b => b.officialStatus === 'VERIFIED').length})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />
              <span>Conditional ({businesses.filter(b => b.officialStatus === 'CONDITIONAL').length})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#475569]" />
              <span>Under Review ({businesses.filter(b => b.officialStatus === 'PENDING').length})</span>
            </div>
          </div>
        </div>

        {/* Right Active Business Preview Card (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {activePinBusiness ? (
            <div className="bg-white rounded-xl border border-[#CBD5E1] p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                <span className="font-mono text-xs font-bold text-[#0B2545]">
                  {activePinBusiness.ufbi}
                </span>
                <VerificationBadge status={activePinBusiness.officialStatus} size="sm" />
              </div>

              <div className="relative h-36 w-full rounded-lg overflow-hidden bg-[#DCE3EB] border border-[#CBD5E1]">
                <SafeImage
                  src={activePinBusiness.image}
                  alt={activePinBusiness.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B45309]">
                  {activePinBusiness.category} · {activePinBusiness.locality}
                </span>
                <h3 className="text-lg font-serif font-bold text-[#0B2545] leading-tight">
                  {activePinBusiness.name}
                </h3>
                <p className="text-xs text-[#475569] line-clamp-2">
                  {activePinBusiness.tagline}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] space-y-1.5 text-xs text-[#334155]">
                <div className="flex items-center justify-between">
                  <span>FSSAI Compliance:</span>
                  <FssaiComplianceBadge business={activePinBusiness} size="sm" isHindi={isHindi} />
                </div>
                <div className="flex justify-between">
                  <span>Last Audited:</span>
                  <strong className="text-[#0B2545] tabular-nums">{activePinBusiness.lastInspectedDate}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Citizen Score:</span>
                  <strong className="text-[#0B2545] tabular-nums">
                    ★ {activePinBusiness.customerExperience.rating} ({activePinBusiness.customerExperience.reviewCount})
                  </strong>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Address:</span>
                  <span className="text-right truncate max-w-[180px]">
                    {activePinBusiness.fullAddress}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onSelectBusiness(activePinBusiness)}
                className="w-full py-2.5 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#13315C] transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>{isHindi ? 'सत्यापन विवरण देखें' : 'Open Compliance Dossier'}</span>
                <ArrowRight className="w-4 h-4 text-[#FBBF24]" />
              </button>
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-xl border border-[#CBD5E1] text-xs text-[#475569]">
              Select any pin on the municipal map to inspect establishment records.
            </div>
          )}

          {/* Quick List of businesses in this locality */}
          <div className="bg-[#F8FAFC] rounded-xl border border-[#CBD5E1] p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2545] tabular-nums">
              {selectedLocality === 'All' ? 'All Jabalpur Outlets' : `${selectedLocality} Outlets`} (
              {filteredBusinesses.length})
            </h4>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {filteredBusinesses.map(b => (
                <div
                  key={b.id}
                  onClick={() => setActivePinBusiness(b)}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${
                    activePinBusiness?.id === b.id
                      ? 'border-[#0B2545] bg-white shadow-xs'
                      : 'border-[#CBD5E1] bg-white/70 hover:bg-white'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="font-bold text-[#0B2545] block line-clamp-1">{b.name}</span>
                    <span className="text-[10px] text-[#475569] block">{b.locality} · {b.ufbi}</span>
                    <FssaiComplianceBadge business={b} size="sm" isHindi={isHindi} />
                  </div>
                  <VerificationBadge status={b.officialStatus} size="sm" showLabel={false} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
