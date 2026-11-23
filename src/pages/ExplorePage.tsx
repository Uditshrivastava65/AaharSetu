import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Sparkles,
  QrCode,
  ArrowUpDown,
  X,
} from 'lucide-react';
import { Business, VerificationStatusType } from '../types';
import { VerificationBadge } from '../components/VerificationBadge';

interface ExplorePageProps {
  businesses: Business[];
  onSelectBusiness: (b: Business) => void;
  onOpenQrBoard: (b: Business) => void;
  isHindi: boolean;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  businesses,
  onSelectBusiness,
  onOpenQrBoard,
  isHindi,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLocality, setSelectedLocality] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'inspected'>('rating');

  const categories = [
    'All',
    'Restaurant',
    'Café',
    'Bakery',
    'Sweet Shop',
    'Street Food / Chaat',
    'Cloud Kitchen',
    'Traditional / Thali',
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
          selectedCategory === 'All' || (b.category && b.category.toLowerCase() === selectedCategory.toLowerCase());

        const matchesLocality =
          selectedLocality === 'All' || (b.locality && b.locality.toLowerCase() === selectedLocality.toLowerCase());

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
      {/* Title & Introduction */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E67E22]">
          <span>{isHindi ? 'जबलपुर पायलट संभाग' : 'Jabalpur Pilot Directory'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif text-[#1B4332] tracking-tight">
          {isHindi ? 'खाद्य प्रतिष्ठान अन्वेषण' : 'Explore Food Businesses'}
        </h1>
        <div className="w-10 h-[2px] bg-[#E67E22] mt-2 mb-3" />
        <p className="text-sm text-[#2D3436]/75 max-w-2xl">
          Search and verify 15 participating Jabalpur food businesses. Review registered
          compliance details, hygiene ratings, and historical inspection records.
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white rounded-2xl border border-[#E5E1D8] p-5 shadow-xs space-y-4">
        {/* Top Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4.5 h-4.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2D3436]/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name, cuisine, locality, or Food ID..."
              className="w-full pl-10 pr-4 py-2 bg-[#F4F1EA] rounded-full border border-[#E5E1D8] text-sm text-[#2D3436] placeholder-[#2D3436]/50 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#2D3436]/70">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#2D3436]/50" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-[#F4F1EA] border border-[#E5E1D8] text-xs font-bold text-[#1B4332] rounded-full px-3 py-1.5 focus:outline-none"
              >
                <option value="rating">Rating (High to Low)</option>
                <option value="name">Name (A-Z)</option>
                <option value="inspected">Recent Inspection</option>
              </select>
            </div>
            {(selectedCategory !== 'All' || selectedLocality !== 'All' || selectedStatus !== 'All' || searchQuery) && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#E67E22] hover:underline px-2"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="pt-3 border-t border-[#EDE8DF] space-y-3 text-xs">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="font-bold text-[#2D3436]/70 shrink-0">Category:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#1B4332] text-white'
                    : 'bg-[#F4F1EA] text-[#2D3436]/80 border border-[#E5E1D8] hover:bg-[#EDE8DF]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Locality & Status dropdowns */}
          <div className="flex flex-wrap gap-4 pt-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#2D3436]/70">Locality:</span>
              <select
                value={selectedLocality}
                onChange={e => setSelectedLocality(e.target.value)}
                className="bg-[#F4F1EA] border border-[#E5E1D8] text-xs text-[#1B4332] rounded-full px-3 py-1"
              >
                {localities.map(loc => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-[#2D3436]/70">Status:</span>
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="bg-[#F4F1EA] border border-[#E5E1D8] text-xs text-[#1B4332] rounded-full px-3 py-1"
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
      <div className="flex items-center justify-between text-xs text-[#2D3436]/60">
        <span>
          Showing <strong>{filteredBusinesses.length}</strong> food establishments
        </span>
        <span className="font-mono text-[11px]">ALL JABALPUR PILOT RECORDS</span>
      </div>

      {/* Grid of Business Cards */}
      {filteredBusinesses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map(biz => (
            <div
              key={biz.id}
              className="bg-white rounded-2xl border border-[#E5E1D8] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Card Image */}
              <div className="relative h-48 w-full overflow-hidden bg-[#F4F1EA]">
                <img
                  src={biz.image}
                  alt={biz.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <VerificationBadge status={biz.officialStatus} size="sm" />
                </div>
                <div className="absolute top-3 right-3 bg-[#1B4332]/80 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-0.5 rounded-full font-semibold">
                  {biz.ufbi}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#2D3436]/60">
                    <span className="font-semibold text-[#1B4332]">{biz.category}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#E67E22]" />
                      <span>{biz.locality}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#1B4332] line-clamp-1 group-hover:text-[#E67E22] transition-colors">
                    {biz.name}
                  </h3>
                  <p className="text-xs text-[#2D3436]/75 line-clamp-2 italic">
                    “{biz.tagline}”
                  </p>
                </div>

                {/* Micro Details */}
                <div className="pt-3 border-t border-[#EDE8DF] space-y-1.5 text-xs text-[#2D3436]/70">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#2D3436]/50">Last Audit:</span>
                    <span className="font-semibold text-[#1B4332]">{biz.lastInspectedDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#2D3436]/50">Customer Score:</span>
                    <span className="font-bold text-[#1B4332]">
                      ★ {biz.customerExperience.rating} ({biz.customerExperience.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectBusiness(biz)}
                    className="py-2.5 px-3 rounded-full bg-[#1B4332] text-white text-xs font-bold hover:bg-[#26533f] transition-colors text-center shadow-xs"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => onOpenQrBoard(biz)}
                    className="py-2.5 px-3 rounded-full border border-[#E5E1D8] bg-[#F4F1EA] text-xs font-bold text-[#1B4332] hover:bg-[#EDE8DF] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <QrCode className="w-3.5 h-3.5 text-[#E67E22]" />
                    <span>QR Board</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center bg-white rounded-3xl border border-[#E5E1D8] space-y-3 max-w-lg mx-auto">
          <Search className="w-8 h-8 text-[#2D3436]/50 mx-auto" />
          <h3 className="text-base font-serif font-bold text-[#1B4332]">No matching food businesses</h3>
          <p className="text-xs text-[#2D3436]/70">
            We couldn't find any establishments matching your search query or filter combination.
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-2.5 bg-[#1B4332] text-white text-xs font-bold rounded-full hover:bg-[#26533f]"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
