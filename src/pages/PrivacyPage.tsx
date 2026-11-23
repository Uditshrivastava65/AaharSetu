import React from 'react';
import { Lock, ShieldCheck, EyeOff, UserCheck, CheckCircle2, FileText } from 'lucide-react';

interface PrivacyPageProps {
  isHindi: boolean;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ isHindi }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#D97724] text-xs font-bold uppercase tracking-wider">
          <Lock className="w-3.5 h-3.5" />
          <span>{isHindi ? 'नागरिक गोपनीयता प्रोटोकॉल' : 'Data Minimization & Privacy'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#163828] tracking-tight">
          {isHindi ? 'सरल भाषा में हमारी गोपनीयता नीति' : 'Plain-Language Privacy Policy'}
        </h1>
        <p className="text-sm text-[#5B6961] max-w-xl mx-auto">
          Food safety transparency belongs to everyone. Here is how AaharSetu protects citizen
          autonomy by minimizing data collection at every layer.
        </p>
      </div>

      {/* 3 Clear Columns: What we collect, What we show, What we NEVER collect */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Collected from citizens */}
        <div className="bg-white rounded-3xl border border-[#E6DFD5] p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] text-[#D97724] flex items-center justify-center font-bold">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#163828]">What Is Collected from Citizens</h3>
          <ul className="space-y-2 text-xs text-[#5D6B63] leading-relaxed">
            <li>
              • <strong>No Mandatory Sign-Up:</strong> Citizens can scan, search, and verify all
              records completely anonymously.
            </li>
            <li>
              • <strong>No Background Geolocation:</strong> Geo-coordinates are only queried when
              you explicitly click "Near Me".
            </li>
            <li>
              • <strong>Optional Report Data:</strong> When filing a concern, you may choose 100%
              anonymous submission.
            </li>
          </ul>
        </div>

        {/* Column 2: What is displayed */}
        <div className="bg-white rounded-3xl border border-[#E6DFD5] p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#EBF7EE] text-[#1B5E20] flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#163828]">What Public Records Are Displayed</h3>
          <ul className="space-y-2 text-xs text-[#5D6B63] leading-relaxed">
            <li>
              • <strong>Universal Food Business ID (UFBI):</strong> Public identification of the
              physical kitchen premise.
            </li>
            <li>
              • <strong>Statutory Licences:</strong> Confirmed FSSAI numbers, municipal trade
              permits, and water test records.
            </li>
            <li>
              • <strong>Official Audit Logs:</strong> Dates of government hygiene inspections and
              official audit findings.
            </li>
          </ul>
        </div>

        {/* Column 3: What is NEVER collected */}
        <div className="bg-white rounded-3xl border border-[#E6DFD5] p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FEF2F2] text-[#991B1B] flex items-center justify-center font-bold">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#163828]">What We NEVER Collect</h3>
          <ul className="space-y-2 text-xs text-[#5D6B63] leading-relaxed">
            <li>
              • <strong>No Order or Payment Data:</strong> We do not facilitate food transactions,
              card payments, or bill tracking.
            </li>
            <li>
              • <strong>No Cross-Site Ad Trackers:</strong> No advertising pixels, retargeting
              scripts, or consumer profiling.
            </li>
            <li>
              • <strong>No Commercial Resale:</strong> Public safety data is never sold to private
              marketing intermediaries.
            </li>
          </ul>
        </div>
      </div>

      {/* Why Data Minimization Matters in GovTech */}
      <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#E6DFD5] space-y-4">
        <h3 className="text-lg font-bold text-[#163828]">
          Why Data Minimization is Fundamental to Civic Trust
        </h3>
        <p className="text-xs sm:text-sm text-[#5C6A62] leading-relaxed">
          Public safety platforms must never act as commercial data silos. When a citizen pauses at
          a restaurant counter to scan a QR code, they are verifying whether the kitchen respects
          sanitary hygiene standards. Requiring an app download, phone OTP, or social login would
          chill participation. By ensuring zero friction and zero surveillance, AaharSetu enables
          universal civic oversight without compromising privacy.
        </p>
        <div className="pt-2 flex items-center gap-2 text-xs text-[#2D7A4D] font-bold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Standard compliance with Digital Personal Data Protection (DPDP) Act principles.</span>
        </div>
      </div>
    </div>
  );
};
