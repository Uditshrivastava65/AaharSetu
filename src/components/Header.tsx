import React, { useState } from 'react';
import { Search, QrCode, Shield, Menu, X, Globe, Sparkles } from 'lucide-react';
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
    { id: 'explore', label: 'Explore', hindiLabel: 'अन्वेषण' },
    { id: 'scan', label: 'Scan & Verify', hindiLabel: 'स्कैन और सत्यापन', highlight: true },
    { id: 'map', label: 'Map', hindiLabel: 'मानचित्र' },
    { id: 'nutrition', label: 'Nutrition', hindiLabel: 'पोषण ज्ञान' },
    { id: 'ai', label: 'Aahar AI', hindiLabel: 'आहार AI', badge: 'AI' },
    { id: 'report', label: 'Report', hindiLabel: 'शिकायत / रिपोर्ट' },
    { id: 'about', label: 'About', hindiLabel: 'परिचय' },
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
    <header className="sticky top-0 z-40 w-full bg-[#FDFCF8]/95 backdrop-blur-md border-b border-[#E5E1D8] transition-all">
      {/* Top Subtle GovTech Context Bar */}
      <div className="bg-[#1B4332] text-[#E5E1D8] text-[11px] py-1.5 px-4 sm:px-8 flex items-center justify-between border-b border-[#143225]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#52B788] animate-pulse" />
          <span className="font-medium tracking-wide">
            {isHindi
              ? 'नागरिक खाद्य पारदर्शिता पायलट पहल • जबलपुर संभाग (प्रोटोटाइप)'
              : 'Citizen Food Transparency Pilot • Jabalpur Division (Prototype Demonstration)'}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[10.5px] text-[#A7C7B3]">
          <span>Not a commercial food-delivery app</span>
          <span>•</span>
          <button
            onClick={() => setActiveTab('privacy')}
            className="hover:text-white transition-colors underline underline-offset-2"
          >
            {isHindi ? 'गोपनीयता नीति' : 'Data Minimization Protocol'}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332] rounded-xl text-left"
          aria-label="AaharSetu Home"
        >
          <Logo isHindi={isHindi} size="md" />
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
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
                className={`relative px-3.5 py-2 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#1B4332] font-semibold bg-[#F4F1EA]'
                    : 'text-[#2D3436]/80 hover:text-[#1B4332] hover:bg-[#F4F1EA]/60'
                }`}
              >
                {item.id === 'scan' && <QrCode className="w-4 h-4 text-[#E67E22]" />}
                {item.id === 'ai' && <Sparkles className="w-3.5 h-3.5 text-[#1B4332]" />}
                <span>{isHindi ? item.hindiLabel : item.label}</span>
                {item.badge && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 bg-[#1B4332] text-white rounded-full">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#1B4332] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Quick Search, Language Switch, Gov Demo CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-full text-[#2D3436]/80 hover:text-[#1B4332] hover:bg-[#F4F1EA] transition-colors"
            title="Search food businesses or Food ID"
            aria-label="Search"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          {/* Language Toggle: EN / हिं */}
          <button
            onClick={() => setIsHindi(prev => !prev)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#E5E1D8] bg-[#F4F1EA] text-xs font-semibold text-[#1B4332] hover:bg-[#EDE8DF] transition-all shadow-xs"
            title="Toggle Hindi / English"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-[#E67E22]" />
            <span>{isHindi ? 'English' : 'हिंदी'}</span>
          </button>

          {/* Government Demo Button */}
          <button
            onClick={() => setActiveTab('gov-demo')}
            className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all shadow-xs ${
              activeTab === 'gov-demo'
                ? 'bg-[#1B4332] text-white'
                : 'border border-[#1B4332]/30 text-[#1B4332] bg-white hover:bg-[#F4F1EA]'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#E67E22]" />
            <span>{isHindi ? 'शासकीय डैशबोर्ड' : 'Gov Demo'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#1B4332] hover:bg-[#F4F1EA]"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Overlay */}
      {isSearchOpen && (
        <div className="bg-[#F4F1EA] border-b border-[#E5E1D8] px-4 py-3 sm:px-8">
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4.5 h-4.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2D3436]/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={
                  isHindi
                    ? 'रेस्तरां, कैफे, खाद्य श्रेणी या फूड आईडी (उदा. JBP-DEMO-0001) खोजें...'
                    : 'Search restaurant, café, food business or Food ID (e.g. JBP-DEMO-0001)...'
                }
                className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-[#E5E1D8] text-sm text-[#2D3436] placeholder-[#2D3436]/50 focus:outline-none focus:ring-2 focus:ring-[#1B4332] transition-all"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2 bg-[#1B4332] text-white text-sm font-semibold rounded-full hover:bg-[#26533f] transition-colors"
            >
              {isHindi ? 'खोजें' : 'Search'}
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-[#2D3436]/60 hover:text-[#1B4332]"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FDFCF8] border-b border-[#E5E1D8] px-4 pt-2 pb-6 space-y-2 shadow-lg">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                  if (item.id === 'scan' && onOpenScan) {
                    onOpenScan();
                  }
                }}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#1B4332] text-white'
                    : 'bg-[#F4F1EA] text-[#2D3436] hover:bg-[#EDE8DF]'
                }`}
              >
                {item.id === 'scan' && <QrCode className="w-4 h-4 text-[#E67E22]" />}
                {item.id === 'ai' && <Sparkles className="w-4 h-4 text-[#E67E22]" />}
                <span>{isHindi ? item.hindiLabel : item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E5E1D8] flex items-center justify-between">
            <button
              onClick={() => {
                setActiveTab('gov-demo');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1B4332] text-white text-xs font-bold w-full justify-center shadow-sm"
            >
              <Shield className="w-4 h-4 text-[#E67E22]" />
              <span>{isHindi ? 'शासकीय व प्रवर्तन डेमो' : 'Government & Officer Demo'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
