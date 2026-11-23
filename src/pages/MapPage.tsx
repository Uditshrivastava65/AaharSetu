import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Crosshair,
  QrCode,
  Layers,
} from 'lucide-react';
import { Business } from '../types';
import { VerificationBadge } from '../components/VerificationBadge';

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
  const [mapStyle, setMapStyle] = useState<'standard' | 'satellite' | 'clean'>('clean');

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
  ];

  const filteredBusinesses =
    selectedLocality === 'All'
      ? businesses
      : businesses.filter(b => b.locality.toLowerCase() === selectedLocality.toLowerCase());

  // Geographic bounds for Jabalpur coordinate projection
  // minLat: ~23.14, maxLat: ~23.19 (Delta: 0.05)
  // minLng: ~79.91, maxLng: ~79.97 (Delta: 0.06)
  const minLat = 23.14;
  const maxLat = 23.195;
  const minLng = 79.91;
  const maxLng = 79.97;

  const getPinPosition = (lat: number, lng: number) => {
    // Normalise to percentage coordinates
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;
    // Bound safely inside map SVG area
    const clampedX = Math.min(Math.max(x, 8), 92);
    const clampedY = Math.min(Math.max(y, 8), 92);
    return { left: `${clampedX}%`, top: `${clampedY}%` };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D97724] mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{isHindi ? 'जबलपुर भू-मानचित्र' : 'Jabalpur Geo-Verification Map'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#163828] tracking-tight">
            {isHindi ? 'निकटवर्ती खाद्य प्रतिष्ठान' : 'Food Businesses Near You'}
          </h1>
          <p className="text-sm text-[#5E6C64]">
            Interactive map visualizing 15 demonstration food businesses across Jabalpur municipal
            wards, color-coded by official audit status.
          </p>
        </div>

        {/* Locality Filter Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {localities.slice(0, 6).map(loc => (
            <button
              key={loc}
              onClick={() => setSelectedLocality(loc)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedLocality === loc
                  ? 'bg-[#163828] text-white'
                  : 'bg-white border border-[#D5CBC0] text-[#55635B] hover:bg-[#EDE6DC]'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Container: Left interactive Canvas/SVG + Right business card details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Map Stage (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E6DFD5] overflow-hidden shadow-sm relative h-[480px] sm:h-[560px]">
          {/* Custom Styled Cartographic SVG Background */}
          <div className="absolute inset-0 bg-[#F4F1EA] overflow-hidden select-none">
            {/* Roads & Narmada River stylized vectors */}
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full opacity-60 pointer-events-none"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Narmada River representation */}
              <path
                d="M -50 550 C 150 520, 300 480, 500 520 C 650 550, 750 530, 850 560"
                fill="none"
                stroke="#C6D8D0"
                strokeWidth="28"
                strokeLinecap="round"
              />
              <path
                d="M -50 550 C 150 520, 300 480, 500 520 C 650 550, 750 530, 850 560"
                fill="none"
                stroke="#B1CBC0"
                strokeWidth="16"
                strokeLinecap="round"
              />

              {/* Major Arterial Roads of Jabalpur */}
              {/* Ring road & Highway */}
              <path
                d="M 50 50 L 750 550"
                stroke="#E2DACF"
                strokeWidth="6"
                strokeDasharray="4 2"
              />
              <path d="M 750 80 L 80 500" stroke="#E2DACF" strokeWidth="6" />
              <path
                d="M 400 30 C 380 200, 420 380, 400 570"
                stroke="#DDD4C8"
                strokeWidth="8"
              />
              <path
                d="M 50 300 C 250 290, 550 310, 780 290"
                stroke="#DDD4C8"
                strokeWidth="8"
              />

              {/* Cantonment / Madan Mahal Hill contours */}
              <circle cx="320" cy="420" r="70" fill="#E8E2D5" opacity="0.5" />
              <circle cx="580" cy="180" r="90" fill="#E8E2D5" opacity="0.5" />

              {/* Landmark Labels */}
              <text x="360" y="270" fill="#88968E" fontSize="13" fontWeight="bold">
                Civil Lines
              </text>
              <text x="430" y="320" fill="#88968E" fontSize="12" fontWeight="bold">
                Sadar Bazar
              </text>
              <text x="240" y="250" fill="#88968E" fontSize="12" fontWeight="bold">
                Wright Town
              </text>
              <text x="280" y="190" fill="#88968E" fontSize="12" fontWeight="bold">
                Napier Town
              </text>
              <text x="200" y="420" fill="#88968E" fontSize="11">
                Madan Mahal
              </text>
              <text x="500" y="130" fill="#88968E" fontSize="11">
                Vijay Nagar
              </text>
              <text x="420" y="525" fill="#719385" fontSize="12" fontWeight="bold">
                Narmada Basin
              </text>
            </svg>

            {/* Render Map Pins */}
            {filteredBusinesses.map(biz => {
              const pos = getPinPosition(biz.coordinates.lat, biz.coordinates.lng);
              const isSelected = activePinBusiness?.id === biz.id;

              const pinColor =
                biz.officialStatus === 'VERIFIED'
                  ? 'bg-[#1B5E20] text-white border-[#A3E635]'
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
                    className={`relative p-2 rounded-full shadow-lg border-2 flex items-center justify-center transition-all ${pinColor} ${
                      isSelected ? 'scale-125 ring-4 ring-[#163828]/20 z-30' : 'hover:scale-110'
                    }`}
                    title={`${biz.name} (${biz.officialStatus})`}
                  >
                    <MapPin className="w-4 h-4" />
                    {isSelected && (
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#163828] text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-md">
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
            <div className="bg-white/95 backdrop-blur-xs rounded-xl border border-[#D5CBC0] shadow-sm p-1.5 flex flex-col gap-1 text-xs">
              <button
                onClick={() => setSelectedLocality('All')}
                className="p-2 hover:bg-[#EDE6DC] rounded-lg text-[#163828]"
                title="Reset Center"
              >
                <Crosshair className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Map Status Legend Bottom Left */}
          <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-xs p-3 rounded-2xl border border-[#D5CBC0] shadow-sm flex flex-wrap items-center gap-3 text-[11px] font-semibold text-[#163828]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#1B5E20]" />
              <span>Verified ({businesses.filter(b => b.officialStatus === 'VERIFIED').length})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#B45309]" />
              <span>Conditional ({businesses.filter(b => b.officialStatus === 'CONDITIONAL').length})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#475569]" />
              <span>Under Verification ({businesses.filter(b => b.officialStatus === 'PENDING').length})</span>
            </div>
          </div>
        </div>

        {/* Right Active Business Preview Card (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {activePinBusiness ? (
            <div className="bg-white rounded-3xl border-2 border-[#163828] p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1]">
                <span className="font-mono text-xs font-bold text-[#163828]">
                  {activePinBusiness.ufbi}
                </span>
                <VerificationBadge status={activePinBusiness.officialStatus} size="sm" />
              </div>

              <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-[#EFEAE2]">
                <img
                  src={activePinBusiness.image}
                  alt={activePinBusiness.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#D97724]">
                  {activePinBusiness.category} • {activePinBusiness.locality}
                </span>
                <h3 className="text-lg font-black text-[#163828] leading-tight">
                  {activePinBusiness.name}
                </h3>
                <p className="text-xs text-[#66736A] italic line-clamp-2">
                  “{activePinBusiness.tagline}”
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E6DFD5] space-y-1.5 text-xs text-[#525E57]">
                <div className="flex justify-between">
                  <span>Last Inspected:</span>
                  <strong className="text-[#163828]">{activePinBusiness.lastInspectedDate}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Customer Score:</span>
                  <strong className="text-[#163828]">
                    ★ {activePinBusiness.customerExperience.rating} ({activePinBusiness.customerExperience.reviewCount})
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Address:</span>
                  <span className="text-right truncate max-w-[170px]">
                    {activePinBusiness.fullAddress}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onSelectBusiness(activePinBusiness)}
                className="w-full py-3 rounded-xl bg-[#163828] text-white text-xs font-bold hover:bg-[#1f4a36] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{isHindi ? 'सत्यापन विवरण देखें' : 'View Full Business Profile'}</span>
                <ArrowRight className="w-4 h-4 text-[#E28738]" />
              </button>
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-3xl border border-[#E6DFD5] text-xs text-[#717E76]">
              Click any pin on the map to inspect its verified food credentials.
            </div>
          )}

          {/* Quick List of businesses in this locality */}
          <div className="bg-white rounded-2xl border border-[#E6DFD5] p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#163828]">
              {selectedLocality === 'All' ? 'All Businesses' : `${selectedLocality} Outlets`} (
              {filteredBusinesses.length})
            </h4>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {filteredBusinesses.map(b => (
                <div
                  key={b.id}
                  onClick={() => setActivePinBusiness(b)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                    activePinBusiness?.id === b.id
                      ? 'border-[#163828] bg-[#FAF8F5]'
                      : 'border-[#E6DFD5] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-[#163828] block line-clamp-1">{b.name}</span>
                    <span className="text-[10px] text-[#717E76]">{b.locality}</span>
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
