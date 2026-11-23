import React, { useState } from 'react';
import {
  QrCode,
  Search,
  CheckCircle2,
  Shield,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  AlertCircle,
  Eye,
  ChevronRight,
  TrendingUp,
  Cpu,
  FileCheck2,
  Users,
} from 'lucide-react';
import { Business } from '../types';
import { VerificationBadge } from '../components/VerificationBadge';
import { JABALPUR_BUSINESSES } from '../data/mockData';

interface HomePageProps {
  businesses: Business[];
  setActiveTab: (tab: string) => void;
  setSelectedBusiness: (b: Business) => void;
  onOpenQrBoard: (b: Business) => void;
  onOpenScan: () => void;
  isHindi: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  businesses,
  setActiveTab,
  setSelectedBusiness,
  onOpenQrBoard,
  onOpenScan,
  isHindi,
}) => {
  const [heroSearch, setHeroSearch] = useState('');

  // Sample flagship business for hero visual with safe fallback
  const heroBusiness =
    businesses.find(b => b.ufbi === 'JBP-DEMO-0001') ||
    businesses[0] ||
    JABALPUR_BUSINESSES[0];
  const featuredBusinesses = businesses.length > 0 ? businesses.slice(0, 4) : JABALPUR_BUSINESSES.slice(0, 4);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      setActiveTab('explore');
    }
  };

  const signatureStages = [
    {
      num: '01',
      step: isHindi ? 'स्कैन' : 'SCAN',
      title: isHindi ? 'एक सेकंड में पहचानें' : 'Instant Recognition',
      desc: isHindi
        ? 'दुकान या बिलिंग काउंटर पर लगा AaharSetu क्यूआर कोड अपने फ़ोन से स्कैन करें।'
        : 'Scan the unified AaharSetu QR board mounted at the counter, entrance or menu.',
      icon: QrCode,
      tag: 'UFBI Geo-Lock',
    },
    {
      num: '02',
      step: isHindi ? 'सत्यापित करें' : 'VERIFY',
      title: isHindi ? 'प्राधिकृत रिकॉर्ड देखें' : 'Authoritative Records',
      desc: isHindi
        ? 'FSSAI लाइसेंस, नगर निगम अनुज्ञप्ति, जल परीक्षण और आधिकारिक निरीक्षण स्थिति जानें।'
        : 'Access confirmed registration, trade licences, and certified water potability records.',
      icon: Shield,
      tag: 'Zero Fakes',
    },
    {
      num: '03',
      step: isHindi ? 'समझें' : 'UNDERSTAND',
      title: isHindi ? 'स्वच्छता व पोषण जानें' : 'Hygiene & Nutrition',
      desc: isHindi
        ? 'रसोई स्वच्छता, तेल गुणवत्ता लॉग, तथा भारतीय व्यंजनों का पोषण विश्लेषण समझें।'
        : 'Review actual inspection findings, hygiene timeline, and dish nutritional profiles.',
      icon: Eye,
      tag: 'Pure Insight',
    },
    {
      num: '04',
      step: isHindi ? 'भरोसे से खाएँ' : 'EAT WITH CONFIDENCE',
      title: isHindi ? 'पारदर्शिता के साथ तृप्ति' : 'Complete Peace of Mind',
      desc: isHindi
        ? 'संतुष्टि के साथ भोजन करें। कोई संशय हो तो सीधे प्राधिकृत निकाय को रिपोर्ट करें।'
        : 'Dine knowing the establishment stands accountable. Report concerns seamlessly.',
      icon: CheckCircle2,
      tag: 'Citizen Trust',
    },
  ];

  return (
    <div className="w-full space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Subtle decorative background organic glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-[#F4F1EA]/60 via-[#F4F1EA]/20 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Header */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F1EA] border border-[#E5E1D8] text-xs font-semibold text-[#1B4332] tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#E67E22]" />
              <span className="uppercase text-[11px] tracking-wider">
                {isHindi
                  ? 'नागरिक खाद्य पारदर्शिता एवं प्राधिकृत सत्यापन पहल'
                  : 'Citizen Food Transparency & Authorised Verification'}
              </span>
            </div>

            {/* Editorial Headline */}
            <div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#1B4332] tracking-tight leading-[1.08]">
                {isHindi ? (
                  <>
                    खाने से पहले, <br />
                    <span className="italic text-[#E67E22]">जानें क्या है पीछे।</span>
                  </>
                ) : (
                  <>
                    Before you eat, <br />
                    <span className="italic text-[#2D3436]">know what’s behind it.</span>
                  </>
                )}
              </h1>
              <div className="w-10 h-[2px] bg-[#E67E22] mt-5" />
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#2D3436]/80 leading-relaxed max-w-xl">
              {isHindi
                ? 'आहारसेतु नागरिकों को एक सरल पहचान, एक क्यूआर कोड और स्पष्ट सत्यापन के माध्यम से विश्वसनीय खाद्य-प्रतिष्ठान जानकारी से जोड़ता है।'
                : 'AaharSetu connects citizens with trusted food-business information through one simple identity, one QR and clear verification.'}
            </p>

            {/* Hero Quick Search Bar */}
            <form onSubmit={handleHeroSearch} className="max-w-xl">
              <div className="relative flex items-center p-1.5 bg-white rounded-full border border-[#E5E1D8] shadow-sm hover:border-[#1B4332]/50 transition-all focus-within:ring-2 focus-within:ring-[#1B4332]">
                <Search className="w-5 h-5 ml-4 text-[#2D3436]/50 shrink-0" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={e => setHeroSearch(e.target.value)}
                  placeholder={
                    isHindi
                      ? 'रेस्तरां, कैफे, खाद्य श्रेणी या Food ID खोजें...'
                      : 'Search restaurant, café, food business or Food ID'
                  }
                  className="w-full px-3 py-2 text-sm text-[#2D3436] placeholder-[#2D3436]/50 focus:outline-none bg-transparent"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1B4332] text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-[#26533f] transition-all shrink-0 flex items-center gap-1.5 shadow-sm"
                >
                  <span>{isHindi ? 'खोजें' : 'Search'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2.5 px-4 text-xs text-[#2D3436]/60">
                <span>{isHindi ? 'उदाहरण:' : 'Try:'}</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBusiness(heroBusiness);
                    setActiveTab('business-detail');
                  }}
                  className="underline hover:text-[#1B4332] font-mono"
                >
                  JBP-DEMO-0001
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('explore')}
                  className="underline hover:text-[#1B4332]"
                >
                  Civil Lines
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('explore')}
                  className="underline hover:text-[#1B4332]"
                >
                  Cafés
                </button>
              </div>
            </form>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenScan}
                className="px-7 py-3.5 rounded-full bg-[#1B4332] text-white text-sm font-bold hover:bg-[#26533f] active:scale-98 transition-all flex items-center gap-2.5 shadow-md shadow-[#1B4332]/20"
              >
                <QrCode className="w-5 h-5 text-[#E67E22]" />
                <span>{isHindi ? 'स्कैन और सत्यापन' : 'Scan & Verify'}</span>
              </button>
              <button
                onClick={() => setActiveTab('explore')}
                className="px-7 py-3.5 rounded-full border border-[#E5E1D8] bg-white text-[#1B4332] text-sm font-bold hover:bg-[#F4F1EA] active:scale-98 transition-all flex items-center gap-2 shadow-xs"
              >
                <span>{isHindi ? 'खाद्य प्रतिष्ठान देखें' : 'Explore Food Businesses'}</span>
                <ArrowRight className="w-4 h-4 text-[#E67E22]" />
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-5 grid grid-cols-3 gap-4 border-t border-[#E5E1D8] max-w-lg">
              <div>
                <span className="block text-2xl font-serif font-bold text-[#1B4332]">15+</span>
                <span className="text-xs text-[#2D3436]/70">Jabalpur Demo Outlets</span>
              </div>
              <div>
                <span className="block text-2xl font-serif font-bold text-[#1B4332]">100%</span>
                <span className="text-xs text-[#2D3436]/70">Public Transparency</span>
              </div>
              <div>
                <span className="block text-2xl font-serif font-bold text-[#E67E22]">UFBI</span>
                <span className="text-xs text-[#2D3436]/70">Persistent Business ID</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Food-Business Verification Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative space-y-4">
              {/* Floating Verification Card Component */}
              <div className="bg-white rounded-2xl p-6 shadow-[0_24px_48px_-12px_rgba(27,67,50,0.12)] border border-[#E5E1D8] relative overflow-hidden transition-all duration-300">
                {/* Subtle scanning laser line effect */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1B4332] to-transparent animate-pulse" />

                {/* Top Badge Row */}
                <div className="flex items-center justify-between border-b border-[#EDE8DF] pb-3.5 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-widest text-[#1B4332] uppercase">
                      AAHARSETU
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E67E22]" />
                    <span className="text-[11px] font-mono text-[#2D3436]/60 font-semibold">
                      {heroBusiness.ufbi}
                    </span>
                  </div>
                  <VerificationBadge status={heroBusiness.officialStatus} size="sm" />
                </div>

                {/* Business Info Inside Hero Card */}
                <div className="space-y-1 mb-4">
                  <h3 className="text-xl font-serif font-bold text-[#1B4332] leading-snug">
                    {heroBusiness.name}
                  </h3>
                  <p className="text-xs text-[#2D3436]/70 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E67E22]" />
                    <span>{heroBusiness.locality}, Jabalpur</span>
                    <span>•</span>
                    <span className="font-semibold text-[#1B4332]">{heroBusiness.category}</span>
                  </p>
                </div>

                {/* The 4 Pillar Checks (Hero spec) */}
                <div className="grid grid-cols-2 gap-2 text-xs text-[#2D3436] py-3 px-3.5 bg-[#F4F1EA] rounded-xl border border-[#E5E1D8] mb-4">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                    <span className="font-medium">Business identity</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                    <span className="font-medium">Location geo-tag</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                    <span className="font-medium">Applicable registration</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                    <span className="font-medium">Inspection record</span>
                  </div>
                </div>

                {/* Mini Visual Preview + Interactive QR code trigger */}
                <div className="flex items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-3">
                    <img
                      src={heroBusiness.image}
                      alt={heroBusiness.name}
                      className="w-16 h-16 rounded-xl object-cover border border-[#E5E1D8]"
                    />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#2D3436]/50 block tracking-wider">
                        Customer Rating
                      </span>
                      <span className="text-sm font-bold text-[#1B4332]">
                        ★ {heroBusiness.customerExperience.rating} / 5.0
                      </span>
                      <span className="text-[10.5px] text-[#2D3436]/60 block">
                        {heroBusiness.customerExperience.reviewCount} reviews
                      </span>
                    </div>
                  </div>

                  {/* QR trigger button */}
                  <button
                    onClick={() => {
                      setSelectedBusiness(heroBusiness);
                      setActiveTab('business-detail');
                    }}
                    className="p-3 rounded-xl bg-[#F4F1EA] border border-[#E5E1D8] text-[#1B4332] hover:bg-[#1B4332] hover:text-white transition-all flex flex-col items-center justify-center gap-1 shrink-0"
                    title="View Business Profile"
                  >
                    <QrCode className="w-6 h-6 text-[#E67E22]" />
                    <span className="text-[9.5px] font-bold uppercase tracking-wider">
                      Verify
                    </span>
                  </button>
                </div>

                {/* Prototype Disclaimer on Card */}
                <div className="mt-4 pt-3 border-t border-[#EDE8DF] text-center">
                  <span className="text-[9.5px] uppercase font-bold tracking-widest text-[#B45309] bg-[#FEF3C7] px-3 py-1 rounded-full inline-block">
                    DEMO PROTOTYPE • NOT AN OFFICIAL VERIFICATION
                  </span>
                </div>
              </div>

              {/* Physical Board Quick Preview Button */}
              <div className="flex items-center justify-between p-4 bg-[#1B4332] text-white rounded-xl shadow-sm text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E67E22]" />
                  <span className="font-semibold">
                    {isHindi ? 'दुकान पर ऐसा दिखेगा बोर्ड' : 'Physical Counter Display Board'}
                  </span>
                </div>
                <button
                  onClick={() => onOpenQrBoard(heroBusiness)}
                  className="px-4 py-1.5 bg-[#26533f] hover:bg-[#316950] text-[#FDFCF8] rounded-full font-bold transition-colors"
                >
                  {isHindi ? 'बोर्ड देखें' : 'View Plaque'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE INTERACTION: SCAN -> VERIFY -> UNDERSTAND -> EAT WITH CONFIDENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F4F1EA] text-[#E67E22] text-xs font-semibold uppercase tracking-wider border border-[#E5E1D8]">
            <span>{isHindi ? 'हस्ताक्षर कार्यप्रणाली' : 'Signature Verification Flow'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1B4332] tracking-tight">
            {isHindi
              ? 'स्कैन से लेकर भरोसे तक, चार सरल चरण'
              : 'From Scan to Trust: The 4-Stage Protocol'}
          </h2>
          <div className="w-10 h-[2px] bg-[#E67E22] mx-auto mt-3" />
          <p className="text-sm sm:text-base text-[#2D3436]/75 max-w-2xl mx-auto">
            {isHindi
              ? 'खाद्य सुरक्षा की जटिलताओं को सुलझाकर नागरिकों तक पारदर्शी रूप में पहुँचाने की एक आधुनिक व्यवस्था।'
              : 'Demystifying food safety by converting bureaucratic records into clear, immediate citizen transparency.'}
          </p>
        </div>

        {/* 4 Interactive Stages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {signatureStages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.num}
                className="relative bg-white rounded-2xl p-6 border border-[#E5E1D8] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Step Marker */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold tracking-widest text-[#E67E22] bg-[#F4F1EA] px-3 py-1 rounded-full border border-[#E5E1D8]">
                    {stage.step}
                  </span>
                  <span className="text-xs font-mono text-[#2D3436]/50 font-semibold">
                    STAGE {stage.num}
                  </span>
                </div>

                {/* Icon & Title */}
                <div className="space-y-2 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#F4F1EA] border border-[#E5E1D8] flex items-center justify-center text-[#1B4332] group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-[#1B4332]" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#1B4332]">{stage.title}</h3>
                  <p className="text-xs text-[#2D3436]/75 leading-relaxed">{stage.desc}</p>
                </div>

                {/* Footer Tag */}
                <div className="pt-3 border-t border-[#EDE8DF] flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#2D3436]/60">{stage.tag}</span>
                  <ChevronRight className="w-4 h-4 text-[#E67E22] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. 30-SECOND HOMEPAGE STORY: THE COMPLETE LIFECYCLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F4F1EA] rounded-3xl p-8 sm:p-12 border border-[#E5E1D8] relative overflow-hidden">
          <div className="max-w-2xl space-y-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E67E22]">
              {isHindi ? 'संपूर्ण अवधारणा' : 'The 30-Second Story'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#1B4332]">
              {isHindi
                ? 'नागरिक, प्रतिष्ठान और प्रशासन: एक संयुक्त सेतु'
                : 'How AaharSetu Works in 30 Seconds'}
            </h2>
            <p className="text-sm text-[#2D3436]/80">
              From the moment you step into a restaurant until post-inspection public updates,
              experience how transparency builds public confidence.
            </p>
          </div>

          {/* Step Sequence Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="bg-white p-6 rounded-2xl border border-[#E5E1D8] shadow-xs space-y-3">
              <div className="w-9 h-9 rounded-full bg-[#1B4332] text-white flex items-center justify-center text-xs font-bold">
                1
              </div>
              <h4 className="text-base font-serif font-bold text-[#1B4332]">Citizen Spots QR & Scans</h4>
              <p className="text-xs text-[#2D3436]/75 leading-relaxed">
                Persistent UFBI board identified instantly. Available inspection and water quality
                reports load in 0.5s.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E5E1D8] shadow-xs space-y-3">
              <div className="w-9 h-9 rounded-full bg-[#E67E22] text-white flex items-center justify-center text-xs font-bold">
                2
              </div>
              <h4 className="text-base font-serif font-bold text-[#1B4332]">Nutrition & Citizen Concerns</h4>
              <p className="text-xs text-[#2D3436]/75 leading-relaxed">
                Explore nutritional breakdowns or log an unhygienic storage concern without
                bureaucracy.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E5E1D8] shadow-xs space-y-3">
              <div className="w-9 h-9 rounded-full bg-[#26533f] text-white flex items-center justify-center text-xs font-bold">
                3
              </div>
              <h4 className="text-base font-serif font-bold text-[#1B4332]">Authority Reviews & Updates</h4>
              <p className="text-xs text-[#2D3436]/75 leading-relaxed">
                AI assists the food safety officer during field audit. Final authorized decision
                instantly refreshes public status.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRUST SECTION: "ONE BUSINESS. ONE ID. ONE QR. CLEAR VERIFICATION." */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F4F1EA] text-[#1B4332] text-xs font-semibold uppercase tracking-wider border border-[#E5E1D8]">
              <Shield className="w-3.5 h-3.5 text-[#E67E22]" />
              <span>Universal Food Business ID</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1B4332] leading-tight">
              One Business. <br />
              One ID. <br />
              One QR. <br />
              <span className="italic text-[#E67E22]">Clear Verification.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#2D3436]/80 leading-relaxed">
              Every participating food business receives a persistent public-facing Universal Food
              Business ID (e.g. <span className="font-mono font-bold text-[#1B4332]">JBP26-048721</span>).
              The ID identifies the premises and its compliance history — strictly preserving
              citizen privacy and confidential business records.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-full bg-[#1B4332] text-white mt-0.5 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1B4332]">Premises-Centric, Not Personal</h4>
                  <p className="text-xs text-[#2D3436]/70">
                    Identifies the kitchen and geo-location, never publishing personal Aadhaar or
                    private finances.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-full bg-[#1B4332] text-white mt-0.5 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1B4332]">Authoritative Truth</h4>
                  <p className="text-xs text-[#2D3436]/70">
                    Only authorized government records change official status. Customer reviews
                    remain clearly demarcated.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual 4 Pillars Card */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-[#E5E1D8] shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#F4F1EA] text-[#1B4332] flex items-center justify-center font-bold">
                <FileCheck2 className="w-5 h-5 text-[#1B4332]" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#1B4332]">Business Identity</h3>
              <p className="text-xs text-[#2D3436]/75 leading-relaxed">
                MCA registered legal entity, trade classification, and verified operating name.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E1D8] shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#F4F1EA] text-[#E67E22] flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5 text-[#E67E22]" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#1B4332]">Location Geo-Tag</h3>
              <p className="text-xs text-[#2D3436]/75 leading-relaxed">
                Municipal ward geo-fencing confirms physical existence and premise boundaries.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E1D8] shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#F4F1EA] text-[#1B4332] flex items-center justify-center font-bold">
                <Shield className="w-5 h-5 text-[#1B4332]" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#1B4332]">Applicable Verification</h3>
              <p className="text-xs text-[#2D3436]/75 leading-relaxed">
                FSSAI central/state licenses, potable water test compliance, and fire clearance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E1D8] shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#F4F1EA] text-[#1B4332] flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5 text-[#1B4332]" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#1B4332]">Inspection Records</h3>
              <p className="text-xs text-[#2D3436]/75 leading-relaxed">
                Transparent timeline of hygiene audits, oil quality checks, and officer notes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED JABALPUR VERIFIED BUSINESSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E67E22] mb-1">
              <span>{isHindi ? 'पायलट प्रतिभागी' : 'Jabalpur Pilot Demonstration'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#1B4332]">
              {isHindi ? 'जबलपुर के प्रमुख खाद्य प्रतिष्ठान' : 'Participating Food Establishments'}
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('explore')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B4332] hover:text-[#E67E22] transition-colors"
          >
            <span>{isHindi ? 'सभी 15 प्रतिष्ठान देखें' : 'View all 15 outlets'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Business Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBusinesses.map(biz => (
            <div
              key={biz.id}
              className="bg-white rounded-2xl border border-[#E5E1D8] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Image & Badges */}
              <div className="relative h-44 w-full overflow-hidden bg-[#F4F1EA]">
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

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#2D3436]/60 mb-1">
                    <span>{biz.category}</span>
                    <span>{biz.locality}</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#1B4332] line-clamp-1 group-hover:text-[#E67E22] transition-colors">
                    {biz.name}
                  </h3>
                  <p className="text-xs text-[#2D3436]/75 line-clamp-2 mt-1">{biz.tagline}</p>
                </div>

                {/* Separation: Official Status vs Customer Rating */}
                <div className="pt-3 border-t border-[#EDE8DF] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#2D3436]/60 font-medium">OFFICIAL AUDIT</span>
                    <span className="font-semibold text-[#1B4332]">
                      {biz.lastInspectedDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#2D3436]/60 font-medium">CUSTOMER RATING</span>
                    <span className="font-bold text-[#1B4332]">
                      ★ {biz.customerExperience.rating} ({biz.customerExperience.reviewCount})
                    </span>
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  onClick={() => {
                    setSelectedBusiness(biz);
                    setActiveTab('business-detail');
                  }}
                  className="w-full mt-2 py-2.5 rounded-full bg-[#F4F1EA] border border-[#E5E1D8] text-xs font-bold text-[#1B4332] hover:bg-[#1B4332] hover:text-white transition-colors text-center"
                >
                  {isHindi ? 'सत्यापन विवरण देखें' : 'View Profile'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. AAHAR AI & NUTRITION TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1B4332] to-[#26533f] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[#E67E22] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AAHAR AI & NUTRITION LITERACY</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif tracking-tight">
                {isHindi ? 'अपने भोजन को गहराई से समझें' : 'Understand What You Eat.'}
              </h2>
              <p className="text-sm sm:text-base text-[#D4E8DC] leading-relaxed max-w-2xl">
                Have questions like <em>“Is poha healthy for breakfast?”</em> or{' '}
                <em>“How much protein does dal offer?”</em>? Ask Aahar AI or browse verified
                nutritional facts for traditional Indian culinary favorites.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('ai')}
                  className="px-6 py-3 rounded-full bg-[#E67E22] text-white text-sm font-bold hover:bg-[#d47019] transition-colors flex items-center gap-2 shadow-xs"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Ask Aahar AI</span>
                </button>
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className="px-6 py-3 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-colors"
                >
                  Explore Nutrition Cards
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-3">
              <span className="text-[11px] uppercase tracking-wider text-[#A5C8B4] font-bold block">
                Educational Food Companion
              </span>
              <p className="text-xs text-[#E5E1D8] italic leading-relaxed">
                “Curd (Dahi) contains live Lactobacillus acidophilus cultures, supporting gut enzyme
                microbiota naturally.”
              </p>
              <span className="text-[10px] text-[#A5C8B4] block">
                *Approximate nutritional data for educational purposes.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
