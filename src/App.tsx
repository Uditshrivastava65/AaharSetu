import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { QrBoardModal } from './components/QrBoardModal';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { ScanPage } from './pages/ScanPage';
import { MapPage } from './pages/MapPage';
import { NutritionPage } from './pages/NutritionPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { ReportPage } from './pages/ReportPage';
import { GovDashboardPage } from './pages/GovDashboardPage';
import { OnboardPage } from './pages/OnboardPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { BusinessDetailPage } from './pages/BusinessDetailPage';
import { getBusinesses, getBusinessByUfbi } from './services/api';
import { JABALPUR_BUSINESSES } from './data/mockData';
import { Business } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [businesses, setBusinesses] = useState<Business[]>(JABALPUR_BUSINESSES);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [qrModalBusiness, setQrModalBusiness] = useState<Business | null>(null);
  const [isHindi, setIsHindi] = useState<boolean>(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string | undefined>(undefined);
  const [preselectedReportBiz, setPreselectedReportBiz] = useState<Business | null>(null);
  const [exploreInitialSearch, setExploreInitialSearch] = useState<string>('');

  // Load initial businesses from mock data service
  useEffect(() => {
    getBusinesses().then(data => {
      setBusinesses(data);

      // Check if URL specifies a business query
      const params = new URLSearchParams(window.location.search);
      const queryUfbi = params.get('business');
      const queryTab = params.get('tab');

      if (queryUfbi) {
        getBusinessByUfbi(queryUfbi).then(found => {
          if (found) {
            setSelectedBusiness(found);
            setActiveTab('business-detail');
          }
        });
      } else if (queryTab) {
        setActiveTab(queryTab);
      }
    });
  }, []);

  // Scroll to top on tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleSelectBusiness = (business: Business) => {
    setSelectedBusiness(business);
    setActiveTab('business-detail');
  };

  const handleOpenReportForBusiness = (business: Business) => {
    setPreselectedReportBiz(business);
    setActiveTab('report');
  };

  const handleOpenAiWithPrompt = (prompt?: string) => {
    setAiInitialPrompt(prompt);
    setActiveTab('ai');
  };

  const handleSearchSelect = async (query: string) => {
    const clean = query.trim();
    if (!clean) {
      setExploreInitialSearch('');
      setActiveTab('explore');
      return;
    }
    // Try exact matching UFBI
    const byUfbi = await getBusinessByUfbi(clean);
    if (byUfbi) {
      setSelectedBusiness(byUfbi);
      setActiveTab('business-detail');
      return;
    }

    // Fallback: go to explore tab with search query prefilled
    setExploreInitialSearch(clean);
    setActiveTab('explore');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#E7ECF1] text-[#0F172A] font-sans antialiased selection:bg-[#0B2545]/15 selection:text-[#0B2545]">
      {/* Universal Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isHindi={isHindi}
        setIsHindi={setIsHindi}
        onSearchSelect={handleSearchSelect}
        onOpenScan={() => setActiveTab('scan')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            businesses={businesses}
            setActiveTab={setActiveTab}
            setSelectedBusiness={handleSelectBusiness}
            onOpenQrBoard={biz => setQrModalBusiness(biz)}
            onOpenScan={() => setActiveTab('scan')}
            onSearchSelect={handleSearchSelect}
            isHindi={isHindi}
          />
        )}

        {activeTab === 'explore' && (
          <ExplorePage
            businesses={businesses}
            onSelectBusiness={handleSelectBusiness}
            onOpenQrBoard={biz => setQrModalBusiness(biz)}
            initialSearchQuery={exploreInitialSearch}
            isHindi={isHindi}
          />
        )}

        {activeTab === 'scan' && (
          <ScanPage
            businesses={businesses}
            onSelectBusiness={handleSelectBusiness}
            isHindi={isHindi}
          />
        )}

        {activeTab === 'map' && (
          <MapPage
            businesses={businesses}
            onSelectBusiness={handleSelectBusiness}
            isHindi={isHindi}
          />
        )}

        {activeTab === 'nutrition' && (
          <NutritionPage
            onOpenAI={prompt => handleOpenAiWithPrompt(prompt)}
            isHindi={isHindi}
          />
        )}

        {activeTab === 'ai' && (
          <AIAssistantPage
            initialPrompt={aiInitialPrompt}
            isHindi={isHindi}
          />
        )}

        {activeTab === 'report' && (
          <ReportPage
            businesses={businesses}
            preselectedBusiness={preselectedReportBiz}
            isHindi={isHindi}
          />
        )}

        {activeTab === 'gov-demo' && (
          <GovDashboardPage
            businesses={businesses}
            isHindi={isHindi}
          />
        )}

        {activeTab === 'onboard' && (
          <OnboardPage
            onSuccess={newBiz => {
              setBusinesses(prev => [newBiz, ...prev]);
              handleSelectBusiness(newBiz);
            }}
            isHindi={isHindi}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            setActiveTab={setActiveTab}
            isHindi={isHindi}
          />
        )}

        {activeTab === 'privacy' && (
          <PrivacyPage
            isHindi={isHindi}
          />
        )}

        {activeTab === 'business-detail' && selectedBusiness && (
          <BusinessDetailPage
            business={selectedBusiness}
            onBack={() => setActiveTab('explore')}
            onOpenReport={biz => handleOpenReportForBusiness(biz)}
            onOpenQrBoard={biz => setQrModalBusiness(biz)}
            isHindi={isHindi}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        setActiveTab={setActiveTab}
        isHindi={isHindi}
      />

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isHindi={isHindi}
        onOpenScan={() => setActiveTab('scan')}
      />

      {/* Physical QR Board Mockup Modal */}
      {qrModalBusiness && (
        <QrBoardModal
          business={qrModalBusiness}
          onClose={() => setQrModalBusiness(null)}
          isHindi={isHindi}
        />
      )}
    </div>
  );
}
