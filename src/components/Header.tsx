import React, { useState } from 'react';
import { Search, Shield, Menu, X, Globe } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isHindi: boolean;
  setIsHindi: React.Dispatch<React.SetStateAction<boolean>>;
  onSearchSelect?: (idOrQuery: string) => void;
  onOpenScan?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isHindi,
  setIsHindi,
  onSearchSelect,
  onOpenScan,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { id: 'explore', label: 'Registry', hindiLabel: 'खाद्य पंजिका' },
    { id: 'scan', label: 'Verify QR', hindiLabel: 'क्यूआर सत्यापन' },
    { id: 'map', label: 'Ward Map', hindiLabel: 'वार्ड मानचित्र' },
    { id: 'nutrition', label: 'Nutrition', hindiLabel: 'पोषण ज्ञान' },
    { id: 'report', label: 'Grievance', hindiLabel: 'शिकायत दर्ज' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearchSelect) {
      onSearchSelect(searchQuery.trim());
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8FAFC] border-b border-[#CBD5E1] shadow-xs">
      {/* National Constitutional Accent Strip */}
      <div className="h-1 w-full bg-gradient-to-r from-[#EA580C] via-[#F8FAFC] to-[#15803D]" />

      {/* Top Sovereign Utility Bar */}
      <div className="bg-[#071A33] text-[#CBD5E1] text-[11px] py-1.5 px-4 sm:px-8 border-b border-[#13315C]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 truncate">
            <span className="font-semibold tracking-wide text-white whitespace-nowrap">
              {isHindi
                ? 'मध्य प्रदेश खाद्य सुरक्षा पारदर्शिता पायलट · जबलपुर संभाग'
                : 'PUBLIC FOOD SAFETY TRANSPARENCY PORTAL · JABALPUR DIVISION (M.P.)'}
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setActiveTab('about')}
              className={`hidden md:inline-block hover:text-white transition-colors whitespace-nowrap ${
                activeTab === 'about' ? 'text-white underline underline-offset-4' : ''
              }`}
            >
              {isHindi ? 'परिचय एवं नीति' : 'Charter & Mandate'}
            </button>
            <span className="hidden md:inline text-[#475569]" aria-hidden="true">|</span>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`hidden sm:inline-block hover:text-white transition-colors whitespace-nowrap ${
                activeTab === 'privacy' ? 'text-white underline underline-offset-4' : ''
              }`}
            >
              {isHindi ? 'डेटा गोपनीयता' : 'Privacy Protocol'}
            </button>
            <span className="hidden sm:inline text-[#475569]" aria-hidden="true">|</span>
            <button
              onClick={() => setActiveTab('ai')}
              className={`hidden sm:inline-block hover:text-white transition-colors whitespace-nowrap ${
                activeTab === 'ai' ? 'text-[#FBBF24] font-semibold' : ''
              }`}
            >
              {isHindi ? 'आहार AI सहायक' : 'Aahar AI Advisory'}
            </button>
            <span className="hidden sm:inline text-[#475569]" aria-hidden="true">|</span>
            <button
              onClick={() => setIsHindi(prev => !prev)}
              className="inline-flex items-center gap-1.5 text-white hover:text-[#FBBF24] font-semibold transition-colors whitespace-nowrap shrink-0"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{isHindi ? 'English' : 'हिंदी'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (3-Zone Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2545] rounded-lg text-left shrink-0"
          aria-label="AaharSetu Home"
        >
          <Logo isHindi={isHindi} size="md" />
        </button>

        {/* Zone 2: Clean Single-Line Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === 'scan' && onOpenScan) {
                    onOpenScan();
                  }
                }}
                className={`relative py-2 transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#0B2545]'
                    : 'text-[#475569] hover:text-[#0B2545]'
                }`}
              >
                <span>{isHindi ? item.hindiLabel : item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B45309]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Quick Search + Primary Officer Portal Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-lg border border-[#CBD5E1] bg-white text-[#334155] hover:text-[#0B2545] hover:border-[#0B2545] transition-colors"
            title="Search food businesses or Food ID"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab('gov-demo')}
            className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'gov-demo'
                ? 'bg-[#B45309] text-white'
                : 'bg-[#0B2545] text-white hover:bg-[#13315C]'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#FBBF24]" />
            <span>{isHindi ? 'अधिकारी पोर्टल' : 'Officer Portal'}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-[#CBD5E1] bg-white text-[#0B2545]"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Registry Search Bar */}
      {isSearchOpen && (
        <div className="bg-[#EEF2F6] border-t border-[#CBD5E1] px-4 py-3 sm:px-8">
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={
                  isHindi
                    ? 'रेस्तरां, श्रेणी या UFBI (जैसे JBP-DEMO-0001) खोजें...'
                    : 'Search establishment name, locality, or UFBI (e.g. JBP-DEMO-0001)...'
                }
                className="w-full pl-10 pr-4 py-2 bg-white rounded-lg border border-[#CBD5E1] text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0B2545] text-white text-xs font-bold rounded-lg hover:bg-[#13315C] transition-colors whitespace-nowrap"
            >
              {isHindi ? 'खोजें' : 'Lookup'}
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-[#475569] hover:text-[#0B2545]"
              aria-label="Close search"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#F8FAFC] border-t border-[#CBD5E1] px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {[
              ...navItems,
              { id: 'ai', label: 'Aahar AI', hindiLabel: 'आहार AI' },
              { id: 'onboard', label: 'Register FBO', hindiLabel: 'व्यवसाय पंजीकरण' },
              { id: 'about', label: 'Mandate', hindiLabel: 'परिचय' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                  if (item.id === 'scan' && onOpenScan) {
                    onOpenScan();
                  }
                }}
                className={`px-3.5 py-2.5 rounded-lg text-xs font-semibold text-left border transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#0B2545] text-white border-[#0B2545]'
                    : 'bg-white text-[#0F172A] border-[#CBD5E1] hover:bg-[#E7ECF1]'
                }`}
              >
                {isHindi ? item.hindiLabel : item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setActiveTab('gov-demo');
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#B45309] text-white text-xs font-bold w-full justify-center"
          >
            <Shield className="w-4 h-4" />
            <span>{isHindi ? 'अधिकारी निरीक्षण पोर्टल' : 'Authority Officer Portal'}</span>
          </button>
        </div>
      )}
    </header>
  );
};
