import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  MapPin,
  QrCode,
  ArrowUpDown,
  X,
  Building2,
} from 'lucide-react';
import { Business } from '../types';
import { VerificationBadge } from '../components/VerificationBadge';
import { FssaiComplianceBadge } from '../components/FssaiComplianceBadge';
import { SafeImage } from '../components/SafeImage';

interface ExplorePageProps {
  businesses: Business[];
  initialSearchQuery?: string;
  onSelectBusiness: (b: Business) => void;
  onOpenQrBoard: (b: Business) => void;
  isHindi: boolean;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  businesses,
  initialSearchQuery = '',
  onSelectBusiness,
  onOpenQrBoard,
  isHindi,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLocality, setSelectedLocality] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'inspected'>('rating');

  useEffect(() => {
    setSearchQuery(initialSearchQuery || '');
  }, [initialSearchQuery]);

  const categories = [
    'All',
    'Restaurants',
    'Cafés',
    'Traditional / Thali',
    'Bakeries',
    'Sweet Shops',
    'Dhabas',
    'Street Food / Chaat',
    'Cloud Kitchens',
    'Fast Food / Snacks',
  ];

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

  const statuses = ['All', 'VERIFIED', 'CONDITIONAL', 'PENDING'];

  const filteredBusinesses = useMemo(() => {
    return businesses
      .filter(b => {
        if (!b) return false;
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          !searchQuery.trim() ||
          (b.name && b.name.toLowerCase().includes(q)) ||
          (b.ufbi && b.ufbi.toLowerCase().includes(q)) ||
          (b.category && b.category.toLowerCase().includes(q)) ||
          (b.locality && b.locality.toLowerCase().includes(q)) ||
          (b.cuisineTypes && b.cuisineTypes.some(c => c.toLowerCase().includes(q)));

        const matchesCategory =
          selectedCategory === 'All' ||
          (b.category && b.category.toLowerCase() === selectedCategory.toLowerCase());

        const matchesLocality =
          selectedLocality === 'All' ||
          (b.locality && b.locality.toLowerCase() === selectedLocality.toLowerCase());

        const matchesStatus =
          selectedStatus === 'All' || b.officialStatus === selectedStatus;

        return matchesSearch && matchesCategory && matchesLocality && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return b.customerExperience.rating - a.customerExperience.rating;
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return b.lastInspectedDate.localeCompare(a.lastInspectedDate);
      });
  }, [businesses, searchQuery, selectedCategory, selectedLocality, selectedStatus, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLocality('All');
    setSelectedStatus('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Official Registry Banner */}
      <div className="bg-[#0B2545] text-white rounded-xl border border-[#1E3A5F] p-6 sm:p-8 shadow-md gov-grid-pattern">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#FBBF24]">
              <Building2 className="w-3.5 h-3.5" />
              <span>{isHindi ? 'जबलपुर संभाग सार्वजनिक पंजिका' : 'Jabalpur District Public Food Registry'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
              {isHindi ? 'खाद्य प्रतिष्ठान पंजिका अन्वेषण' : 'Public Establishment Directory'}
            </h1>
            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              Search and audit <strong className="text-white tabular-nums">{businesses.length}</strong> participating
              Jabalpur food establishments. Review statutory compliance records, FSSAI categories,
              hygiene grades, and field inspection logs.
            </p>
          </div>
          <div className="bg-[#071A33] border border-[#1E3A5F] rounded-lg px-4 py-3 text-xs shrink-0 space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] block">Registry Coverage</span>
            <span className="font-mono font-bold text-[#FBBF24] text-sm tabular-nums">
              {businesses.length} ACTIVE UFBI RECORDS
            </span>
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-[#F8FAFC] rounded-xl border border-[#CBD5E1] p-5 shadow-xs space-y-4">
        {/* Top Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#475569]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by establishment name, cuisine, ward, or UFBI..."
              className="w-full pl-10 pr-4 py-2 bg-white rounded-lg border border-[#CBD5E1] text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#334155]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#475569]" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-white border border-[#CBD5E1] text-xs font-bold text-[#0B2545] rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
              >
                <option value="rating">Public Score (High to Low)</option>
                <option value="name">Establishment Name (A–Z)</option>
                <option value="inspected">Recent Audit Date</option>
              </select>
            </div>
            {(selectedCategory !== 'All' || selectedLocality !== 'All' || selectedStatus !== 'All' || searchQuery) && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#B45309] hover:underline px-2"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="pt-3 border-t border-[#CBD5E1] space-y-3 text-xs">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="font-bold text-[#334155] shrink-0 mr-1">Category:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 border ${
                  selectedCategory === cat
                    ? 'bg-[#0B2545] text-white border-[#0B2545]'
                    : 'bg-white text-[#334155] border-[#CBD5E1] hover:bg-[#EEF2F6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Locality & Status dropdowns */}
          <div className="flex flex-wrap gap-4 pt-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#334155]">Ward / Locality:</span>
              <select
                value={selectedLocality}
                onChange={e => setSelectedLocality(e.target.value)}
                className="bg-white border border-[#CBD5E1] text-xs font-semibold text-[#0B2545] rounded-md px-3 py-1.5"
              >
                {localities.map(loc => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-[#334155]">Compliance Status:</span>
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="bg-white border border-[#CBD5E1] text-xs font-semibold text-[#0B2545] rounded-md px-3 py-1.5"
              >
                {statuses.map(st => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-[#475569] border-b border-[#CBD5E1] pb-2">
        <span className="tabular-nums">
          Displaying <strong className="text-[#0B2545]">{filteredBusinesses.length}</strong> of{' '}
          <strong className="text-[#0B2545]">{businesses.length}</strong> registered establishments
        </span>
        <span className="font-mono text-[11px] font-semibold text-[#0B2545]">
          JABALPUR MUNICIPAL PILOT REGISTRY
        </span>
      </div>

      {/* Grid of Business Dossier Cards */}
      {filteredBusinesses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map(biz => (
            <div
              key={biz.id}
              className="bg-[#F8FAFC] rounded-xl border border-[#CBD5E1] overflow-hidden shadow-xs hover:shadow-md hover:border-[#94A3B8] transition-all duration-200 flex flex-col justify-between group"
            >
              {/* Card Image */}
              <div className="relative h-44 w-full overflow-hidden bg-[#DCE3EB] border-b border-[#CBD5E1]">
                <SafeImage
                  src={biz.image}
                  alt={biz.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <VerificationBadge status={biz.officialStatus} size="sm" />
                </div>
                <div className="absolute top-3 right-3 bg-[#071A33]/90 backdrop-blur-xs text-[#FBBF24] text-[10px] font-mono px-2.5 py-1 rounded-md font-bold border border-white/15">
                  {biz.ufbi}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-[#475569]">
                    <span className="font-bold uppercase tracking-wider text-[#B45309]">
                      {biz.category}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-[#334155]">
                      <MapPin className="w-3 h-3 text-[#0B2545]" />
                      <span>{biz.locality}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#0B2545] line-clamp-1 group-hover:text-[#B45309] transition-colors">
                    {biz.name}
                  </h3>
                  <p className="text-xs text-[#475569] line-clamp-2">
                    {biz.tagline}
                  </p>
                </div>

                {/* Micro Compliance Ledger */}
                <div className="pt-3 border-t border-[#E2E8F0] space-y-2 text-xs text-[#475569]">
                  <div className="flex items-center justify-between text-[11px] gap-2">
                    <span>FSSAI Compliance:</span>
                    <FssaiComplianceBadge business={biz} size="sm" isHindi={isHindi} />
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span>Last Official Audit:</span>
                    <span className="font-semibold text-[#0F172A] tabular-nums">{biz.lastInspectedDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span>Citizen Rating · Hygiene:</span>
                    <span className="font-bold text-[#0B2545] tabular-nums">
                      ★ {biz.customerExperience.rating} ({biz.customerExperience.reviewCount}) · {biz.hygieneRating}/5
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectBusiness(biz)}
                    className="py-2 px-3 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#13315C] transition-colors text-center shadow-xs"
                  >
                    View Dossier
                  </button>
                  <button
                    onClick={() => onOpenQrBoard(biz)}
                    className="py-2 px-3 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-xs font-bold text-[#0B2545] hover:bg-[#EEF2F6] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <QrCode className="w-3.5 h-3.5 text-[#B45309]" />
                    <span>QR Plaque</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center bg-[#F8FAFC] rounded-xl border border-[#CBD5E1] space-y-3 max-w-lg mx-auto">
          <Search className="w-8 h-8 text-[#475569] mx-auto" />
          <h3 className="text-base font-serif font-bold text-[#0B2545]">No matching food establishments</h3>
          <p className="text-xs text-[#475569]">
            No registry entries match your current keyword, ward, or compliance status filters.
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-2 bg-[#0B2545] text-white text-xs font-bold rounded-lg hover:bg-[#13315C]"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
