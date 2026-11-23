import React from 'react';
import { Lock, ShieldCheck, EyeOff, UserCheck, CheckCircle2 } from 'lucide-react';

interface PrivacyPageProps {
  isHindi: boolean;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ isHindi }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Banner */}
      <div className="bg-[#0B2545] text-white rounded-xl p-6 sm:p-8 border border-[#1E3A5F] shadow-md gov-grid-pattern text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#071A33] border border-[#1E3A5F] text-[#FBBF24] text-xs font-bold uppercase tracking-wider">
          <Lock className="w-3.5 h-3.5" />
          <span>{isHindi ? 'नागरिक गोपनीयता प्रोटोकॉल' : 'Data Minimization & Privacy Charter'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          {isHindi ? 'सरल भाषा में हमारी गोपनीयता नीति' : 'Plain-Language Privacy Protocol'}
        </h1>
        <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-xl mx-auto">
          Public food safety verification requires zero citizen surveillance. Here is how AaharSetu
          protects autonomy by minimizing data collection at every tier.
        </p>
      </div>

      {/* 3 Clear Columns: What we collect, What we show, What we NEVER collect */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-[#CBD5E1] p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-[#B45309] flex items-center justify-center font-bold">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-serif font-bold text-[#0B2545]">What Is Collected from Citizens</h3>
          <ul className="space-y-2 text-xs text-[#475569] leading-relaxed">
            <li>
              • <strong className="text-[#0B2545]">No Mandatory Sign-Up:</strong> Citizens scan, search, and verify all
              records anonymously.
            </li>
            <li>
              • <strong className="text-[#0B2545]">No Background Tracking:</strong> Location filters work purely via
              manual ward selection unless explicitly consented.
            </li>
            <li>
              • <strong className="text-[#0B2545]">Anonymous Grievances:</strong> Whistleblowers and diners can withhold
              personal contact data from public logs.
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-[#CBD5E1] p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#ECFDF5] border border-[#86EFAC] text-[#14532D] flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-serif font-bold text-[#0B2545]">Public Statutory Records Displayed</h3>
          <ul className="space-y-2 text-xs text-[#475569] leading-relaxed">
            <li>
              • <strong className="text-[#0B2545]">Universal Food Business ID (UFBI):</strong> Public identification of
              physical kitchen premises.
            </li>
            <li>
              • <strong className="text-[#0B2545]">Statutory Licences:</strong> FSSAI registration numbers, municipal
              trade permits, and potable water test status.
            </li>
            <li>
              • <strong className="text-[#0B2545]">Official Audit Logs:</strong> Inspection dates, Schedule 4 compliance
              scores, and field findings.
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-[#CBD5E1] p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] flex items-center justify-center font-bold">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="text-base font-serif font-bold text-[#0B2545]">What We NEVER Collect</h3>
          <ul className="space-y-2 text-xs text-[#475569] leading-relaxed">
            <li>
              • <strong className="text-[#0B2545]">No Order or Payment Data:</strong> No dining bills, UPI records, or
              transaction telemetry.
            </li>
            <li>
              • <strong className="text-[#0B2545]">No Ad Trackers:</strong> Zero third-party advertising pixels or
              behavioural profiling cookies.
            </li>
            <li>
              • <strong className="text-[#0B2545]">No Commercial Resale:</strong> Civic safety data is never monetised
              or shared with private brokers.
            </li>
          </ul>
        </div>
      </div>

      {/* Why Data Minimization Matters in GovTech */}
      <div className="p-8 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#0B2545]">
          Why Data Minimization is Fundamental to Civic Trust
        </h3>
        <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
          Public safety registries must never operate as commercial data harvesters. When a citizen pauses
          at a counter to scan an AaharSetu QR plaque, they are verifying kitchen hygiene before eating.
          Requiring OTP logins or app downloads discourages civic participation. Zero-friction,
          privacy-first verification upholds universal public oversight.
        </p>
        <div className="pt-2 flex items-center gap-2 text-xs text-[#14532D] font-bold">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Aligned with Digital Personal Data Protection (DPDP) Act data minimization principles.</span>
        </div>
      </div>
    </div>
  );
};
