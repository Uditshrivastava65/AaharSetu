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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FAF8F5]/98 backdrop-blur-md border-t border-[#E6DFD5] px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {/* Home */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
            activeTab === 'home' ? 'text-[#163828]' : 'text-[#758079]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">{isHindi ? 'होम' : 'Home'}</span>
        </button>

        {/* Explore */}
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
            activeTab === 'explore' ? 'text-[#163828]' : 'text-[#758079]'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">{isHindi ? 'खोजें' : 'Explore'}</span>
        </button>

        {/* Prominent Center Scan Button */}
        <div className="relative -top-4">
          <button
            onClick={() => {
              setActiveTab('scan');
              onOpenScan();
            }}
            className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-[#163828] text-white shadow-md shadow-[#163828]/30 border-4 border-[#FAF8F5] active:scale-95 transition-transform"
            aria-label="Scan QR Code"
          >
            <QrCode className="w-6 h-6 text-[#E28738]" />
          </button>
          <span className="block text-[10px] font-bold text-center text-[#163828] mt-0.5">
            {isHindi ? 'स्कैन' : 'Scan'}
          </span>
        </div>

        {/* Nutrition */}
        <button
          onClick={() => setActiveTab('nutrition')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
            activeTab === 'nutrition' ? 'text-[#163828]' : 'text-[#758079]'
          }`}
        >
          <Apple className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">{isHindi ? 'पोषण' : 'Nutrition'}</span>
        </button>

        {/* Aahar AI */}
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
            activeTab === 'ai' ? 'text-[#163828]' : 'text-[#758079]'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">{isHindi ? 'एआई' : 'AI'}</span>
        </button>
      </div>
    </div>
  );
};
