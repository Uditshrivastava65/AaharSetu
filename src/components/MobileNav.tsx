import React from 'react';
import { Home, Compass, QrCode, Apple, Sparkles } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isHindi: boolean;
  onOpenScan: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab,
  isHindi,
  onOpenScan,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#F8FAFC]/98 backdrop-blur-md border-t border-[#CBD5E1] px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
            activeTab === 'home' ? 'text-[#0B2545] font-bold' : 'text-[#64748B]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{isHindi ? 'होम' : 'Home'}</span>
        </button>

        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
            activeTab === 'explore' ? 'text-[#0B2545] font-bold' : 'text-[#64748B]'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{isHindi ? 'पंजिका' : 'Registry'}</span>
        </button>

        <div className="relative -top-3">
          <button
            onClick={() => {
              setActiveTab('scan');
              onOpenScan();
            }}
            className="flex flex-col items-center justify-center w-13 h-13 rounded-xl bg-[#0B2545] text-white shadow-md border-2 border-[#F8FAFC] active:scale-95 transition-transform"
            aria-label="Scan QR Code"
          >
            <QrCode className="w-5.5 h-5.5 text-[#FBBF24]" />
          </button>
          <span className="block text-[10px] font-bold text-center text-[#0B2545] mt-0.5">
            {isHindi ? 'स्कैन' : 'Verify'}
          </span>
        </div>

        <button
          onClick={() => setActiveTab('nutrition')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
            activeTab === 'nutrition' ? 'text-[#0B2545] font-bold' : 'text-[#64748B]'
          }`}
        >
          <Apple className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{isHindi ? 'पोषण' : 'Nutrition'}</span>
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
            activeTab === 'ai' ? 'text-[#0B2545] font-bold' : 'text-[#64748B]'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{isHindi ? 'सहायक' : 'Aahar AI'}</span>
        </button>
      </div>
    </div>
  );
};
