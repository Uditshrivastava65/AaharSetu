import React, { useState, useMemo } from 'react';
import {
  QrCode,
  Search,
  CheckCircle2,
  Shield,
  ArrowRight,
  MapPin,
  Calendar,
  Eye,
  FileCheck2,
  Flag,
  Building2,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { Business } from '../types';
import { VerificationBadge } from '../components/VerificationBadge';
import { FssaiComplianceBadge } from '../components/FssaiComplianceBadge';
import { SafeImage } from '../components/SafeImage';
import { JABALPUR_BUSINESSES } from '../data/mockData';
import { LOCAL_ASSETS } from '../data/localImages';

interface HomePageProps {
  businesses: Business[];
  setActiveTab: (tab: string) => void;
  setSelectedBusiness: (b: Business) => void;
  onOpenQrBoard: (b: Business) => void;
  onOpenScan: () => void;
  onSearchSelect?: (query: string) => void;
  isHindi: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  businesses,
  setActiveTab,
  setSelectedBusiness,
  onOpenQrBoard,
  onOpenScan,
  onSearchSelect,
  isHindi,
}) => {
  const [heroSearch, setHeroSearch] = useState('');
  const [ledgerFilter, setLedgerFilter] = useState<'ALL' | 'VERIFIED' | 'CONDITIONAL' | 'PENDING'>('ALL');

  const activeList = businesses.length > 0 ? businesses : JABALPUR_BUSINESSES;

  const heroBusiness =
    activeList.find(b => b.ufbi === 'JBP-DEMO-0001') ||
    activeList[0];

  const verifiedCount = activeList.filter(b => b.officialStatus === 'VERIFIED').length;
  const conditionalCount = activeList.filter(b => b.officialStatus === 'CONDITIONAL').length;
  const pendingCount = activeList.filter(b => b.officialStatus === 'PENDING').length;
  const wardCount = new Set(activeList.map(b => b.locality)).size;

  const spotlightBusinesses = useMemo(() => {
    const preferredIds = ['b16', 'b17', 'b22', 'b28'];
    const picks = preferredIds
      .map(id => activeList.find(b => b.id === id))
      .filter((b): b is Business => Boolean(b));
    return picks.length === 4 ? picks : activeList.slice(0, 4);
  }, [activeList]);

  const ledgerRows = useMemo(() => {
    const filtered =
      ledgerFilter === 'ALL'
        ? activeList
        : activeList.filter(b => b.officialStatus === ledgerFilter);
    return filtered.slice(0, 7);
  }, [activeList, ledgerFilter]);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSelect) {
      onSearchSelect(heroSearch);
    } else if (heroSearch.trim()) {
      setActiveTab('explore');
    }
  };

  const quickLookupByUfbi = (ufbi: string) => {
    const match = activeList.find(b => b.ufbi === ufbi);
    if (match) {
      setSelectedBusiness(match);
      setActiveTab('business-detail');
    }
  };

  const portalServices = [
    {
      num: '01',
      title: isHindi ? 'क्यूआर और आईडी सत्यापन' : 'Verify Counter QR / UFBI',
      desc: isHindi
        ? 'प्रतिष्ठान के काउंटर पर लगे बोर्ड को स्कैन करें या 11-अंकीय UFBI कोड दर्ज करें।'
        : 'Scan the official counter plaque or look up any Universal Food Business ID instantly.',
      actionLabel: isHindi ? 'स्कैनर खोलें' : 'Open Scanner',
      icon: QrCode,
      onClick: onOpenScan,
    },
    {
      num: '02',
      title: isHindi ? 'जबलपुर खाद्य पंजिका' : 'Search Ward Registry',
      desc: isHindi
        ? `जबलपुर के ${activeList.length} पंजीकृत रेस्तरां, कैफे, ढाबा व मिठाई प्रतिष्ठानों के रिकॉर्ड देखें।`
        : `Inspect FSSAI licences, water potability logs, and audit history across ${activeList.length} outlets.`,
      actionLabel: isHindi ? 'पंजिका देखें' : 'Browse Registry',
      icon: Building2,
      onClick: () => setActiveTab('explore'),
    },
    {
      num: '03',
      title: isHindi ? 'खाद्य सुरक्षा शिकायत दर्ज' : 'Lodge Hygiene Grievance',
      desc: isHindi
        ? 'अस्वच्छ रसोई, बासी भोजन या पेस्ट की शिकायत सीधे नगर निगम व FSO को भेजें।'
        : 'Route hygiene or storage complaints directly to Jabalpur Municipal Food Safety Officers.',
      actionLabel: isHindi ? 'शिकायत दर्ज करें' : 'File Grievance',
      icon: Flag,
      onClick: () => setActiveTab('report'),
    },
    {
      num: '04',
      title: isHindi ? 'नया व्यवसाय पंजीकरण' : 'Register Food Business',
      desc: isHindi
        ? 'अपना प्रतिष्ठान पंजीकृत करें, स्वच्छ रसोई शपथ लें और आधिकारिक QR बोर्ड प्राप्त करें।'
        : 'Onboard an establishment, submit FSSAI credentials, and generate an official UFBI plaque.',
      actionLabel: isHindi ? 'पंजीकरण शुरू करें' : 'Onboard Outlet',
      icon: FileCheck2,
      onClick: () => setActiveTab('onboard'),
    },
  ];

  const verificationPillars = [
    {
      num: '01',
      title: isHindi ? 'वैधानिक व्यवसाय पहचान' : 'Statutory Business Identity',
      desc: isHindi
        ? 'प्रत्येक पंजीकृत प्रतिष्ठान को एक स्थायी यूनिवर्सल फूड बिज़नेस आईडी (UFBI) प्रदान किया जाता है।'
        : 'Registered commercial entity verified against district trade records and assigned a permanent UFBI.',
      icon: FileCheck2,
    },
    {
      num: '02',
      title: isHindi ? 'परिसर एवं भू-सत्यापन' : 'Premises Geo-Verification',
      desc: isHindi
        ? 'वार्ड अधिकारी द्वारा रसोई स्थल की वास्तविक भौगोलिक स्थिति और सीमा का सत्यापन।'
        : 'Municipal ward geo-tagging anchors compliance history to the actual physical kitchen premises.',
      icon: MapPin,
    },
    {
      num: '03',
      title: isHindi ? 'FSSAI एवं जल परीक्षण' : 'FSSAI & Potable Water Audit',
      desc: isHindi
        ? 'सक्रिय FSSAI लाइसेंस, नगर निगम ट्रेड लाइसेंस और पेयजल प्रयोगशाला परीक्षण की जांच।'
        : 'Active FSSAI licence validity, municipal trade permit, and PHE potable water certification.',
      icon: Shield,
    },
    {
      num: '04',
      title: isHindi ? 'कालानुक्रमिक निरीक्षण लॉग' : 'Chronological Audit History',
      desc: isHindi
        ? 'खाद्य सुरक्षा अधिकारियों द्वारा किए गए नियमित एवं आकस्मिक निरीक्षणों का पारदर्शी विवरण।'
        : 'Signed routine and surprise hygiene inspection scores, temperature logs, and officer notes.',
      icon: Calendar,
    },
  ];

  return (
    <div className="w-full space-y-14 pb-16">
      {/* 1. SOVEREIGN INSTITUTIONAL HERO BANNER */}
      <section className="relative bg-gradient-to-br from-[#071A33] via-[#0B2545] to-[#13315C] text-white border-b-4 border-[#B45309] overflow-hidden">
        <div className="absolute inset-0 gov-grid-pattern pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10 lg:pt-12 lg:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Column: Civic Mandate & Registry Search Console */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[#FBBF24]">
                  <Shield className="w-3.5 h-3.5" />
                  <span>
                    {isHindi
                      ? 'जबलपुर संभाग खाद्य सुरक्षा पारदर्शिता मंच'
                      : 'Jabalpur Division Public Food Safety Registry'}
                  </span>
                </div>

                <h1
                  className="text-3xl sm:text-5xl lg:text-[3.25rem] font-serif font-semibold text-white tracking-tight leading-[1.12] max-w-2xl"
                  style={{ textWrap: 'balance' }}
                >
                  {isHindi
                    ? 'भोजन से पहले जाँचें: आधिकारिक खाद्य सुरक्षा पंजिका।'
                    : 'Verify Every Kitchen Before You Dine.'}
                </h1>

                <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed max-w-xl">
                  {isHindi
                    ? 'आहारसेतु नागरिकों को एक स्थायी फूड बिज़नेस आईडी (UFBI) और आधिकारिक क्यूआर के माध्यम से लाइसेंस, जल गुणवत्ता व स्वच्छता निरीक्षण रिकॉर्ड की सीधी पहुँच प्रदान करता है।'
                    : 'AaharSetu provides citizens direct, unmediated access to statutory FSSAI registrations, potable water reports, and food safety inspection dossiers through one Universal Food Business ID.'}
                </p>
              </div>

              {/* Official UFBI / Registry Verification Search Console */}
              <div className="bg-[#071A33]/80 border border-[#244775] rounded-xl p-4 sm:p-5 space-y-3">
                <label
                  htmlFor="hero-registry-search"
                  className="block text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]"
                >
                  {isHindi
                    ? 'तत्काल प्रतिष्ठान या UFBI सत्यापन खोज'
                    : 'Instant Establishment & UFBI Verification Lookup'}
                </label>

                <form onSubmit={handleHeroSearch} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Search className="w-4.5 h-4.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
                    <input
                      id="hero-registry-search"
                      type="text"
                      value={heroSearch}
                      onChange={e => setHeroSearch(e.target.value)}
                      placeholder={
                        isHindi
                          ? 'रेस्तरां नाम, क्षेत्र या UFBI दर्ज करें (जैसे JBP-DEMO-0016)'
                          : 'Enter restaurant name, locality, or UFBI (e.g. JBP-DEMO-0001)'
                      }
                      className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border border-[#CBD5E1] text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#B45309] hover:bg-[#92400E] text-white text-xs sm:text-sm font-bold rounded-lg transition-colors shrink-0 inline-flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <span>{isHindi ? 'रिकॉर्ड खोजें' : 'Verify Record'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Quick Unboxed Example Links */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#94A3B8]">
                  <span>{isHindi ? 'त्वरित उदाहरण:' : 'Sample UFBI:'}</span>
                  <button
                    type="button"
                    onClick={() => quickLookupByUfbi('JBP-DEMO-0001')}
                    className="font-mono text-[#FBBF24] hover:underline"
                  >
                    JBP-DEMO-0001
                  </button>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() => quickLookupByUfbi('JBP-DEMO-0016')}
                    className="font-mono text-[#FBBF24] hover:underline"
                  >
                    JBP-DEMO-0016
                  </button>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() => quickLookupByUfbi('JBP-DEMO-0022')}
                    className="font-mono text-[#FBBF24] hover:underline"
                  >
                    JBP-DEMO-0022
                  </button>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (onSearchSelect) onSearchSelect('Civil Lines');
                      else setActiveTab('explore');
                    }}
                    className="text-white/90 hover:underline"
                  >
                    Civil Lines
                  </button>
                </div>
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenScan}
                  className="px-6 py-3 rounded-lg bg-white text-[#0B2545] text-xs sm:text-sm font-bold hover:bg-[#E2E8F0] transition-colors inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <QrCode className="w-4.5 h-4.5 text-[#B45309]" />
                  <span>{isHindi ? 'क्यूआर स्कैन एवं सत्यापन' : 'Scan Counter QR'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="px-6 py-3 rounded-lg border border-white/30 bg-white/10 text-white text-xs sm:text-sm font-semibold hover:bg-white/20 transition-colors inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <span>
                    {isHindi
                      ? `सभी ${activeList.length} प्रतिष्ठान देखें`
                      : `Browse Full Registry (${activeList.length})`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Official Digital Compliance Certificate Preview */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="bg-[#F8FAFC] text-[#0F172A] rounded-xl border border-[#CBD5E1] shadow-xl overflow-hidden flex-1 flex flex-col justify-between">
                {/* Official Certificate Header */}
                <div className="bg-[#EEF2F6] px-5 py-3.5 border-b border-[#CBD5E1] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0B2545]">
                    <Shield className="w-4 h-4 text-[#B45309]" />
                    <span>UFBI · {heroBusiness.ufbi}</span>
                  </div>
                  <VerificationBadge status={heroBusiness.officialStatus} size="sm" />
                </div>

                {/* Establishment Identity + Editorial Photo */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-[#CBD5E1] shrink-0 bg-[#E2E8F0]">
                      <SafeImage
                        src={LOCAL_ASSETS.civicInspection}
                        alt={heroBusiness.name}
                        category={heroBusiness.category}
                      />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="text-[11px] font-semibold text-[#475569] flex items-center gap-1.5">
                        <span>{heroBusiness.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{heroBusiness.locality}, Jabalpur</span>
                      </div>
                      <h2 className="text-lg font-serif font-bold text-[#0B2545] leading-snug">
                        {heroBusiness.name}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 pt-0.5">
                        <p className="text-xs text-[#475569] font-mono tabular-nums">
                          FSSAI: {heroBusiness.registrations.fssaiNumber}
                        </p>
                        <FssaiComplianceBadge business={heroBusiness} size="sm" isHindi={isHindi} />
                      </div>
                    </div>
                  </div>

                  {/* Statutory Compliance Grid */}
                  <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-lg bg-[#EEF2F6] border border-[#CBD5E1] text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#14532D] shrink-0" />
                      <span className="font-medium text-[#0F172A]">Entity Registered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#14532D] shrink-0" />
                      <span className="font-medium text-[#0F172A]">Ward Geo-Verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#14532D] shrink-0" />
                      <span className="font-medium text-[#0F172A]">Potable Water OK</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#14532D] shrink-0" />
                      <span className="font-medium text-[#0F172A]">Audit: {heroBusiness.lastInspectedDate}</span>
                    </div>
                  </div>

                  {/* Separated Official Audit vs Public Sentiment Row */}
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#E2E8F0] text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">
                        Latest FSO Score
                      </span>
                      <span className="text-sm font-bold text-[#14532D] tabular-nums">
                        {heroBusiness.inspectionHistory[0]?.score || 94} / 100 Compliant
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">
                        Citizen Impressions
                      </span>
                      <span className="text-sm font-bold text-[#0B2545] tabular-nums">
                        ★ {heroBusiness.customerExperience.rating} ({heroBusiness.customerExperience.reviewCount})
                      </span>
                    </div>
                  </div>

                  {/* Certificate Actions */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <button
                      onClick={() => {
                        setSelectedBusiness(heroBusiness);
                        setActiveTab('business-detail');
                      }}
                      className="py-2.5 px-3 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#13315C] transition-colors text-center"
                    >
                      {isHindi ? 'पूर्ण डोजियर देखें' : 'Inspect Dossier'}
                    </button>
                    <button
                      onClick={() => onOpenQrBoard(heroBusiness)}
                      className="py-2.5 px-3 rounded-lg border border-[#CBD5E1] bg-white text-[#0B2545] text-xs font-bold hover:bg-[#EEF2F6] transition-colors inline-flex items-center justify-center gap-1.5"
                    >
                      <QrCode className="w-3.5 h-3.5 text-[#B45309]" />
                      <span>{isHindi ? 'काउंटर बोर्ड' : 'Counter Plaque'}</span>
                    </button>
                  </div>
                </div>

                {/* Prototype Transparency Strip */}
                <div className="px-4 py-2 bg-[#FFFBEB] border-t border-[#FDE68A] text-center text-[10px] font-bold uppercase tracking-wider text-[#92400E]">
                  Pilot Prototype Record · Non-Statutory Demonstration
                </div>
              </div>
            </div>
          </div>

          {/* 4-Column Civic Registry KPI Strip (Full Width Below Hero Split) */}
          <div className="mt-10 pt-8 border-t border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#071A33]/70 border border-[#244775] rounded-lg px-5 py-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] block">
                {isHindi ? 'पंजीकृत प्रतिष्ठान' : 'Registered Pilot Outlets'}
              </span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums mt-1 block">
                {activeList.length}
              </span>
            </div>

            <div className="bg-[#071A33]/70 border border-[#244775] rounded-lg px-5 py-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] block">
                {isHindi ? 'सत्यापित अनुपालन' : 'Verified Compliant'}
              </span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#34D399] tabular-nums mt-1 block">
                {verifiedCount}
              </span>
            </div>

            <div className="bg-[#071A33]/70 border border-[#244775] rounded-lg px-5 py-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] block">
                {isHindi ? 'सशर्त / समीक्षाधीन' : 'Conditional & In Review'}
              </span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#FBBF24] tabular-nums mt-1 block">
                {conditionalCount + pendingCount}
              </span>
            </div>

            <div className="bg-[#071A33]/70 border border-[#244775] rounded-lg px-5 py-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] block">
                {isHindi ? 'जबलपुर क्षेत्र कवरेज' : 'Jabalpur Zones Covered'}
              </span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums mt-1 block">
                {wardCount} Wards
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CITIZEN & BUSINESS PORTAL SERVICES DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B45309] block mb-1">
              {isHindi ? 'नागरिक व व्यवसाय सेवाएँ' : 'Public Service Directory'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2545]">
              {isHindi ? 'आहारसेतु डिजिटल सेवा पोर्टल' : 'Core Civic Verification Services'}
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('gov-demo')}
            className="text-xs font-bold text-[#0B2545] hover:text-[#B45309] inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            <Shield className="w-4 h-4 text-[#B45309]" />
            <span>{isHindi ? 'खाद्य सुरक्षा अधिकारी पोर्टल →' : 'Food Safety Officer Workbench →'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {portalServices.map(svc => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.num}
                className="bg-[#F8FAFC] rounded-xl border border-[#CBD5E1] p-5 flex flex-col justify-between space-y-5 hover:border-[#0B2545] transition-colors shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#64748B]">{svc.num}.</span>
                    <div className="w-9 h-9 rounded-lg bg-[#EEF2F6] border border-[#CBD5E1] flex items-center justify-center text-[#0B2545]">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#0B2545]">{svc.title}</h3>
                  <p className="text-xs text-[#475569] leading-relaxed">{svc.desc}</p>
                </div>

                <button
                  onClick={svc.onClick}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#EEF2F6] hover:bg-[#0B2545] text-[#0B2545] hover:text-white border border-[#CBD5E1] text-xs font-bold transition-colors flex items-center justify-between"
                >
                  <span>{svc.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. PUBLIC FOOD SAFETY COMPLIANCE LEDGER (TABLE) + VISUAL SPOTLIGHT */}
      <section className="bg-[#DCE3EB] border-y border-[#CBD5E1] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header & Segmented Status Filter */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B45309] block mb-1">
                {isHindi ? 'सार्वजनिक अनुपालन पंजिका' : 'Jabalpur Public Compliance Ledger'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0B2545]">
                {isHindi ? 'जबलपुर खाद्य प्रतिष्ठान पंजिका' : 'Official Establishment Registry'}
              </h2>
              <p className="text-xs sm:text-sm text-[#334155] mt-1 max-w-2xl">
                {isHindi
                  ? `जबलपुर संभाग के ${activeList.length} पंजीकृत प्रतिष्ठानों का लाइव सत्यापन विवरण।`
                  : `Live demonstration registry across ${activeList.length} participating Jabalpur restaurants, cafés, sweet shops, and street hubs.`}
              </p>
            </div>

            {/* Interactive Segmented Filter */}
            <div className="inline-flex items-center gap-1 p-1 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg self-start">
              {(['ALL', 'VERIFIED', 'CONDITIONAL', 'PENDING'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setLedgerFilter(status)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap ${
                    ledgerFilter === status
                      ? 'bg-[#0B2545] text-white'
                      : 'text-[#475569] hover:text-[#0B2545]'
                  }`}
                >
                  {status === 'ALL'
                    ? `All (${activeList.length})`
                    : status === 'VERIFIED'
                    ? `Verified (${verifiedCount})`
                    : status === 'CONDITIONAL'
                    ? `Conditional (${conditionalCount})`
                    : `Review (${pendingCount})`}
                </button>
              ))}
            </div>
          </div>

          {/* Formal Tabular Compliance Ledger */}
          <div className="bg-[#F8FAFC] rounded-xl border border-[#CBD5E1] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0B2545] text-white text-[11px] uppercase tracking-wider">
                    <th className="py-3.5 px-4 font-semibold whitespace-nowrap">UFBI ID</th>
                    <th className="py-3.5 px-4 font-semibold">Establishment & Category</th>
                    <th className="py-3.5 px-4 font-semibold whitespace-nowrap">Ward / Locality</th>
                    <th className="py-3.5 px-4 font-semibold whitespace-nowrap">FSSAI Reference</th>
                    <th className="py-3.5 px-4 font-semibold whitespace-nowrap">Last Audit</th>
                    <th className="py-3.5 px-4 font-semibold whitespace-nowrap">Official Status</th>
                    <th className="py-3.5 px-4 font-semibold text-right whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#CBD5E1] text-xs">
                  {ledgerRows.map(biz => (
                    <tr
                      key={biz.id}
                      className="hover:bg-[#EEF2F6] transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-[#0B2545] whitespace-nowrap tabular-nums">
                        {biz.ufbi}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#0F172A] text-sm">{biz.name}</div>
                        <div className="text-[11px] text-[#475569]">{biz.category}</div>
                      </td>
                      <td className="py-3.5 px-4 text-[#334155] whitespace-nowrap">
                        {biz.locality}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#334155] whitespace-nowrap tabular-nums">
                        <div className="space-y-1">
                          <div>{biz.registrations.fssaiNumber}</div>
                          <FssaiComplianceBadge business={biz} size="sm" isHindi={isHindi} />
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[#334155] whitespace-nowrap tabular-nums">
                        {biz.lastInspectedDate}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <VerificationBadge status={biz.officialStatus} size="sm" />
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => {
                            setSelectedBusiness(biz);
                            setActiveTab('business-detail');
                          }}
                          className="px-3 py-1.5 rounded-md bg-white border border-[#CBD5E1] text-[#0B2545] font-semibold hover:bg-[#0B2545] hover:text-white transition-colors"
                        >
                          View Dossier
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-3.5 bg-[#EEF2F6] border-t border-[#CBD5E1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="text-[#475569]">
                Showing {ledgerRows.length} of <strong>{activeList.length}</strong> registered Jabalpur establishments
              </span>
              <button
                onClick={() => setActiveTab('explore')}
                className="inline-flex items-center gap-1.5 font-bold text-[#0B2545] hover:text-[#B45309] transition-colors"
              >
                <span>{isHindi ? `सभी ${activeList.length} प्रतिष्ठान देखें` : `Open Full ${activeList.length}-Outlet Directory`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4-Card Featured Inspection & Dining Spotlight */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-serif font-bold text-[#0B2545]">
                {isHindi ? 'जबलपुर के चयनित आदर्श प्रतिष्ठान' : 'Featured Verified Establishments'}
              </h3>
              <button
                onClick={() => setActiveTab('map')}
                className="text-xs font-bold text-[#0B2545] hover:text-[#B45309] inline-flex items-center gap-1"
              >
                <MapPin className="w-3.5 h-3.5 text-[#B45309]" />
                <span>{isHindi ? 'वार्ड मानचित्र पर देखें' : 'View Ward Geo-Map'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {spotlightBusinesses.map(biz => (
                <div
                  key={biz.id}
                  className="bg-[#F8FAFC] rounded-xl border border-[#CBD5E1] overflow-hidden shadow-xs hover:border-[#0B2545] transition-colors flex flex-col group"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-[#CBD5E1]">
                    <SafeImage
                      src={biz.image}
                      alt={biz.name}
                      category={biz.category}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white font-mono">
                      <span className="font-semibold">{biz.ufbi}</span>
                      <span>{biz.locality}</span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold text-[#475569]">
                          {biz.category}
                        </span>
                        <VerificationBadge status={biz.officialStatus} size="sm" />
                      </div>
                      <h4 className="text-base font-serif font-bold text-[#0B2545] line-clamp-1">
                        {biz.name}
                      </h4>
                      <p className="text-xs text-[#475569] line-clamp-2">{biz.tagline}</p>
                    </div>

                    <div className="pt-2.5 border-t border-[#E2E8F0] space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-[#334155]">
                        <span>{isHindi ? 'FSSAI स्थिति:' : 'FSSAI Status:'}</span>
                        <FssaiComplianceBadge business={biz} size="sm" isHindi={isHindi} />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#334155] tabular-nums">
                        <span>Audit: {biz.lastInspectedDate}</span>
                        <span className="font-bold text-[#0B2545]">★ {biz.customerExperience.rating}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedBusiness(biz);
                        setActiveTab('business-detail');
                      }}
                      className="w-full py-2 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#13315C] transition-colors"
                    >
                      {isHindi ? 'सत्यापन डोजियर' : 'Inspect Dossier'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. STATUTORY ARCHITECTURE: ONE PREMISES · ONE UFBI · CLEAR SEPARATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F8FAFC] rounded-xl border border-[#CBD5E1] p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B45309] block">
                {isHindi ? 'सार्वजनिक पारदर्शिता वास्तुकला' : 'Statutory Verification Framework'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0B2545] leading-tight">
                {isHindi
                  ? 'एक परिसर। एक UFBI। स्पष्ट सरकारी प्रमाण।'
                  : 'One Premises. One UFBI. Authoritative Truth.'}
              </h2>
              <p className="text-sm text-[#334155] leading-relaxed">
                {isHindi
                  ? 'आहारसेतु में आधिकारिक सरकारी निरीक्षण रिकॉर्ड और ग्राहक अनुभव रेटिंग को पूरी तरह अलग रखा जाता है, जिससे कोई भी प्रतिष्ठान भुगतान करके अपना स्वच्छता दर्जा नहीं बदल सकता।'
                  : 'AaharSetu strictly separates statutory government records from public diner sentiment. Official compliance status changes only upon signed Food Safety Officer verification.'}
              </p>

              <div className="pt-2 space-y-3 border-t border-[#E2E8F0]">
                <div className="flex items-start gap-2.5 text-xs text-[#334155]">
                  <Eye className="w-4 h-4 text-[#0B2545] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#0B2545]">Zero Pay-to-Rank:</strong> Non-commercial digital public infrastructure with no commissions or promoted listings.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#334155]">
                  <Shield className="w-4 h-4 text-[#14532D] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#0B2545]">Privacy by Minimization:</strong> Citizens scan and inspect without mandatory accounts or location tracking.
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {verificationPillars.map(pillar => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.num}
                    className="p-5 rounded-lg bg-[#EEF2F6] border border-[#CBD5E1] space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#B45309]">
                        {pillar.num}.
                      </span>
                      <Icon className="w-4.5 h-4.5 text-[#0B2545]" />
                    </div>
                    <h3 className="text-base font-serif font-bold text-[#0B2545]">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#475569] leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PUBLIC NUTRITION LITERACY & AAHAR AI ADVISORY BAND */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B2545] text-white rounded-xl border border-[#1E3A5F] p-8 sm:p-10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-[#FBBF24]">
                {isHindi ? 'नागरिक पोषण एवं खाद्य सुरक्षा शिक्षा' : 'Public Nutrition & Safety Literacy'}
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-semibold">
                {isHindi ? 'अपने भोजन के पोषण और स्वच्छता मानक जानें।' : 'Understand Food Safety & Indian Nutrition.'}
              </h2>
              <p className="text-sm text-[#CBD5E1] leading-relaxed max-w-2xl">
                Review ICMR-NIN reference nutrition profiles for common Indian meals, safe oil TPM limits, and temperature holding guidelines via Aahar AI.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className="px-5 py-2.5 rounded-lg bg-[#B45309] hover:bg-[#92400E] text-white text-xs font-bold transition-colors inline-flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{isHindi ? 'पोषण संदर्भ कार्ड देखें' : 'Browse Nutrition Guide'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className="px-5 py-2.5 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#FBBF24]" />
                  <span>{isHindi ? 'आहार AI से पूछें' : 'Consult Aahar AI'}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#071A33] rounded-lg p-5 border border-[#244775] space-y-2.5">
              <span className="text-[11px] uppercase tracking-wider text-[#FBBF24] font-bold block">
                FSSAI Statutory Guideline Note
              </span>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                Total Polar Compounds (TPC) in frying oil must not exceed 25%. Cooked hot food must be maintained above 65°C or chilled below 5°C.
              </p>
              <span className="text-[10px] text-[#94A3B8] block">
                Educational reference aligned with FSSAI Schedule 4 norms.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
