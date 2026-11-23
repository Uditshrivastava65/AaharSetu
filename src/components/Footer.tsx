import React from 'react';
import { ShieldCheck, Heart, ExternalLink, HelpCircle, FileText } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  isHindi: boolean;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, isHindi }) => {
  return (
    <footer className="bg-[#1B4332] text-[#E5E1D8] pt-14 pb-24 lg:pb-12 border-t border-[#143225]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#26533f]">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" size="lg" isHindi={isHindi} />
            <p className="text-sm text-[#C2D6CC] leading-relaxed max-w-md pt-2">
              {isHindi
                ? 'आहारसेतु एक नागरिक-उन्मुख खाद्य-व्यापार पारदर्शिता और सत्यापन मंच है, जो नागरिकों, खाद्य प्रतिष्ठानों और प्राधिकृत खाद्य-सुरक्षा प्राधिकरणों के बीच सेतु का निर्माण करता है।'
                : 'AaharSetu is a citizen-facing food-business transparency and verification platform designed to create a bridge between citizens, food businesses and authorised food-safety authorities.'}
            </p>
            <div className="flex items-center gap-2.5 pt-1 text-xs text-[#E67E22] font-semibold">
              <span className="inline-block w-2 h-2 rounded-full bg-[#E67E22]" />
              <span>{isHindi ? '“जानें। सत्यापित करें। भरोसे के साथ खाएँ।”' : '“Know. Verify. Eat with Confidence.”'}</span>
            </div>
            {/* Disclaimer pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#143225] rounded-full border border-[#26533f] text-[11px] text-[#A3C4B3]">
              <ShieldCheck className="w-4 h-4 text-[#52B788] shrink-0" />
              <span>
                {isHindi
                  ? 'यह कोई व्यावसायिक फ़ूड डिलीवरी ऐप नहीं है, न ही वैधानिक निकायों का विकल्प।'
                  : 'Not a commercial food-delivery app. Prototype demonstration pilot.'}
              </span>
            </div>
          </div>

          {/* Col 3: Citizen Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
              {isHindi ? 'नागरिक सेवाएँ' : 'Citizen Services'}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#C2D6CC]">
              <li>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="hover:text-white transition-colors"
                >
                  {isHindi ? 'खाद्य प्रतिष्ठान खोजें' : 'Explore Food Businesses'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('scan')}
                  className="hover:text-white transition-colors"
                >
                  {isHindi ? 'क्यूआर स्कैन व सत्यापन' : 'Scan & Verify QR'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('map')}
                  className="hover:text-white transition-colors"
                >
                  {isHindi ? 'जबलपुर फ़ूड मैप' : 'Jabalpur Geo Map'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className="hover:text-white transition-colors"
                >
                  {isHindi ? 'भारतीय पोषण ज्ञानकोष' : 'Nutrition Explorer'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('ai')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Aahar AI Assistant</span>
                  <span className="text-[9px] px-1.5 py-0.5 bg-[#E67E22] text-[#1B4332] font-black rounded">
                    AI
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Transparency & Governance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
              {isHindi ? 'पारदर्शिता एवं रिपोर्ट' : 'Transparency & Trust'}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#C2D6CC]">
              <li>
                <button
                  onClick={() => setActiveTab('report')}
                  className="hover:text-white transition-colors"
                >
                  {isHindi ? 'समस्या दर्ज करें (रिपोर्ट)' : 'Report a Food Concern'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('report')}
                  className="hover:text-white transition-colors"
                >
                  {isHindi ? 'शिकायत स्थिति ट्रैक करें' : 'Track Report Status'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('privacy')}
                  className="hover:text-white transition-colors"
                >
                  {isHindi ? 'गोपनीयता एवं डेटा सुरक्षा' : 'Data Privacy & Minimization'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('about')}
                  className="hover:text-white transition-colors"
                >
                  {isHindi ? 'सिद्धांत एवं कार्यप्रणाली' : 'Core Principles & Architecture'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Food Businesses & Authorities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
              {isHindi ? 'प्रतिष्ठान व प्रशासन' : 'Partners & Gov'}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#C2D6CC]">
              <li>
                <button
                  onClick={() => setActiveTab('onboard')}
                  className="hover:text-white transition-colors text-[#E67E22] font-medium"
                >
                  {isHindi ? 'नया व्यवसाय जोड़ें (UFBI)' : 'Business Onboarding'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('gov-demo')}
                  className="hover:text-white transition-colors"
                >
                  {isHindi ? 'शासकीय प्रवर्तन डैशबोर्ड' : 'Authority Inspection Portal'}
                </button>
              </li>
              <li>
                <a
                  href="https://fssai.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>FSSAI Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-[#77A38B]" />
                </a>
              </li>
              <li>
                <span className="text-xs text-[#77A38B] block pt-1">
                  Jabalpur Pilot Zone (MP)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Prototype Safety Notice Banner */}
        <div className="my-6 p-4 rounded-xl bg-[#143225]/80 border border-[#26533f] text-xs text-[#C2D6CC] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#E67E22] shrink-0" />
            <span>
              <strong>PROTOTYPE DEMONSTRATION NOTICE:</strong> All Jabalpur food establishments,
              Universal Food Business IDs (UFBI), inspection records, and official evidence photos
              are fictional demonstration records created strictly for concept demonstration.
            </span>
          </div>
          <span className="shrink-0 text-[10.5px] px-2.5 py-0.5 rounded-full bg-[#1B4332] border border-[#2E6849] font-mono text-[#D4E8DC]">
            PILOT BUILD 2026.09
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8AA999]">
          <div>
            © {new Date().getFullYear()} AaharSetu (आहारसेतु) • Citizen Food Safety Transparency
            Layer
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy First
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('about')}
              className="hover:text-white transition-colors"
            >
              Authoritative Information
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('gov-demo')}
              className="hover:text-white transition-colors"
            >
              GovTech Demo
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
