import React, { useState } from 'react';
import {
  ArrowLeft,
  QrCode,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Share2,
  Flag,
  Sparkles,
  Phone,
  Clock,
  ChevronDown,
  ChevronUp,
  Check,
} from 'lucide-react';
import { Business } from '../types';
import { VerificationBadge } from '../components/VerificationBadge';
import { SafeImage } from '../components/SafeImage';

interface BusinessDetailPageProps {
  business: Business;
  onBack: () => void;
  onOpenReport: (b: Business) => void;
  onOpenQrBoard: (b: Business) => void;
  isHindi: boolean;
}

export const BusinessDetailPage: React.FC<BusinessDetailPageProps> = ({
  business,
  onBack,
  onOpenReport,
  onOpenQrBoard,
  isHindi,
}) => {
  const [expandedInspectionId, setExpandedInspectionId] = useState<string | null>(
    business?.inspectionHistory?.[0]?.id || null
  );
  const [copied, setCopied] = useState(false);

  if (!business) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-sm text-[#475569]">No establishment dossier selected.</p>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2.5 bg-[#0B2545] text-white text-xs font-bold rounded-lg"
        >
          Return to Registry
        </button>
      </div>
    );
  }

  const handleCopy = () => {
    if (!business?.ufbi) return;
    navigator.clipboard?.writeText(
      `${window.location.origin}/?business=${business.ufbi}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pillarList = [
    { key: 'businessIdentity', label: 'Business Identity', pillar: business.pillars.businessIdentity },
    { key: 'locationVerification', label: 'Location & Geo-tag', pillar: business.pillars.locationVerification },
    { key: 'applicableRegistration', label: 'Applicable Licences', pillar: business.pillars.applicableRegistration },
    { key: 'inspectionRecord', label: 'Inspection Record', pillar: business.pillars.inspectionRecord },
    { key: 'hygienePractices', label: 'Hygiene & Cleanliness', pillar: business.pillars.hygienePractices },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb / Action Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B2545] hover:text-[#B45309] transition-colors py-1.5 px-3 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isHindi ? 'पंजिका पर लौटें' : 'Back to Public Registry'}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#CBD5E1] bg-white text-xs font-semibold text-[#0B2545] hover:bg-[#EEF2F6] transition-colors shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#14532D]" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'UFBI Copied' : 'Share Dossier'}</span>
          </button>
          <button
            onClick={() => onOpenQrBoard(business)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#13315C] transition-colors shadow-xs"
          >
            <QrCode className="w-3.5 h-3.5 text-[#FBBF24]" />
            <span>{isHindi ? 'क्यूआर बोर्ड' : 'Official QR Plaque'}</span>
          </button>
        </div>
      </div>

      {/* Prototype Notification Banner */}
      <div className="p-3.5 bg-[#F8FAFC] border border-[#CBD5E1] text-[#334155] rounded-xl text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-[#B45309]" />
          <span>
            <strong className="text-[#0B2545]">PILOT DEMONSTRATION DOSSIER:</strong> Verification statuses,
            FSSAI licences, and audit logs for {business.name} represent Jabalpur pilot demonstration data.
          </span>
        </div>
        <span className="font-mono text-[10.5px] font-bold text-[#0B2545] bg-[#EEF2F6] px-2.5 py-0.5 rounded-md border border-[#CBD5E1]">
          JBP PILOT 2026
        </span>
      </div>

      {/* Main Establishment Dossier Card */}
      <div className="bg-white rounded-xl border border-[#CBD5E1] p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Business Details */}
          <div className="lg:col-span-8 space-y-4">
            {/* Top row: UFBI + Official Status Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0B2545] font-mono text-xs font-bold text-white">
                <span className="text-[#FBBF24]">UFBI:</span>
                <span>{business.ufbi}</span>
              </div>
              <VerificationBadge status={business.officialStatus} size="md" />
              {business.hasCleanKitchenPledge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ECFDF5] border border-[#86EFAC] text-xs font-semibold text-[#14532D]">
                  <Sparkles className="w-3.5 h-3.5 text-[#14532D]" />
                  <span>Clean Kitchen Pledge</span>
                </span>
              )}
            </div>

            {/* Business Title & Tagline */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B2545] tracking-tight">
                {business.name}
              </h1>
              {business.hindiName && (
                <p className="text-sm font-semibold text-[#475569] mt-0.5">{business.hindiName}</p>
              )}
              <div className="w-12 h-[2px] bg-[#B45309] mt-2.5 mb-2.5" />
              <p className="text-sm sm:text-base text-[#334155] font-medium">
                {business.tagline}
              </p>
            </div>

            {/* Locality & Cuisine text strip (zero pill clutter) */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 pt-1 text-xs text-[#334155]">
              <span className="inline-flex items-center gap-1 text-[#0B2545] font-bold">
                <MapPin className="w-3.5 h-3.5 text-[#B45309]" />
                <span>{business.locality}, Jabalpur</span>
              </span>
              <span className="text-[#94A3B8]">·</span>
              <span className="font-semibold text-[#0B2545]">{business.category}</span>
              <span className="text-[#94A3B8]">·</span>
              <span className="text-[#475569]">{business.cuisineTypes.join(' · ')}</span>
            </div>

            {/* Address & Hours */}
            <div className="text-xs text-[#334155] space-y-1.5 pt-3 border-t border-[#E2E8F0]">
              <p>
                <strong className="text-[#0B2545]">Registered Premises:</strong> {business.fullAddress}
              </p>
              <div className="flex flex-wrap gap-5 text-[11.5px] text-[#475569]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#0B2545]" />
                  <span>Operating Hours: {business.contactPublic?.hours || '10:00 AM – 10:00 PM'}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#0B2545]" />
                  <span>Contact: {business.contactPublic?.phone || 'Available at counter'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Business Photo & Action CTA Box */}
          <div className="lg:col-span-4 space-y-4">
            <div className="relative h-48 w-full rounded-xl overflow-hidden border border-[#CBD5E1] bg-[#DCE3EB] shadow-xs">
              <SafeImage
                src={business.image}
                alt={business.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <button
                onClick={() => onOpenQrBoard(business)}
                className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-lg bg-white/95 backdrop-blur-xs text-[#0B2545] text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-white"
              >
                <QrCode className="w-4 h-4 text-[#B45309]" />
                <span>Show QR Plaque</span>
              </button>
            </div>

            {/* Citizen Action Trigger */}
            <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-2.5">
              <span className="text-sm font-serif font-bold text-[#0B2545] block">
                Citizen Observation or Grievance?
              </span>
              <p className="text-[11.5px] text-[#475569] leading-relaxed">
                Report a hygiene issue, food handling concern, or licensing discrepancy directly to Jabalpur Ward FSO officers.
              </p>
              <button
                onClick={() => onOpenReport(business)}
                className="w-full py-2.5 px-3 rounded-lg bg-[#0B2545] hover:bg-[#13315C] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Flag className="w-3.5 h-3.5 text-[#FBBF24]" />
                <span>File Grievance for this Outlet</span>
              </button>
            </div>
          </div>
        </div>

        {/* Statutory Firewall: Official Government Record vs Community Sentiment */}
        <div className="mt-8 pt-6 border-t border-[#E2E8F0] grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-[#EEF2F6] border border-[#CBD5E1] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B2545]">
                Official Statutory Verification
              </span>
              <VerificationBadge status={business.officialStatus} size="sm" />
            </div>
            <p className="text-xs text-[#334155]">
              Last Inspected: <strong className="text-[#0B2545] tabular-nums">{business.lastInspectedDate}</strong> · Hygiene Grade:{' '}
              <strong className="text-[#0B2545] tabular-nums">{business.hygieneRating}/5</strong>
            </p>
            <p className="text-[11px] text-[#475569] leading-tight">
              Governed by District Food Safety Administration & Jabalpur Municipal Corporation.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#B45309]">
                Public Diner Impressions (Non-Statutory)
              </span>
              <span className="text-xs font-bold text-[#0B2545] tabular-nums">
                ★ {business.customerExperience.rating} / 5.0
              </span>
            </div>
            <p className="text-xs text-[#334155] tabular-nums">
              Aggregated from {business.customerExperience.reviewCount} citizen reviews.
            </p>
            <p className="text-[11px] text-[#475569] leading-tight italic">
              “{business.customerExperience.sentimentSummary}”
            </p>
          </div>
        </div>
      </div>

      {/* 5 VERIFICATION PILLARS */}
      <div className="space-y-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#B45309]">
            Compliance Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2545]">
            The 5 Verification Pillars & Licences
          </h2>
          <p className="text-xs sm:text-sm text-[#475569]">
            Audited transparency across identity, geo-location, statutory licences, inspection logs, and sanitation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillarList.map(item => (
            <div
              key={item.key}
              className="p-5 rounded-xl bg-white border border-[#CBD5E1] shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-serif font-bold text-[#0B2545]">{item.pillar.title}</h3>
                  <VerificationBadge status={item.pillar.status} size="sm" />
                </div>
                <p className="text-xs text-[#334155] leading-relaxed">{item.pillar.details}</p>
              </div>

              <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#475569]">
                <span>Record Updated</span>
                <span className="font-semibold text-[#0B2545] tabular-nums">{item.pillar.lastUpdated}</span>
              </div>
            </div>
          ))}

          {/* Official Registrations Card */}
          <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] shadow-xs space-y-3">
            <h3 className="text-base font-serif font-bold text-[#0B2545]">Statutory Registration Ledger</h3>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-1 border-b border-[#CBD5E1]">
                <span className="text-[#475569]">FSSAI Reference:</span>
                <span className="font-mono font-semibold text-[#0B2545]">
                  {business.registrations.fssaiNumber}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#CBD5E1]">
                <span className="text-[#475569]">FSSAI Category:</span>
                <span className="font-semibold text-[#0B2545]">
                  {business.registrations.fssaiType}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#CBD5E1]">
                <span className="text-[#475569]">Municipal Trade Licence:</span>
                <span className="font-mono font-semibold text-[#0B2545]">
                  {business.registrations.municipalTradeLicence}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#475569]">Potable Water Test:</span>
                <span className="font-semibold text-[#14532D]">
                  {business.registrations.waterPotabilityTest}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INSPECTION TIMELINE */}
      <div className="space-y-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#B45309]">
            Official Audit Register
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2545]">
            Inspection History Timeline
          </h2>
          <p className="text-xs sm:text-sm text-[#475569]">
            Chronological log of food-safety and municipal health department inspections.
          </p>
        </div>

        <div className="space-y-3">
          {business.inspectionHistory.map(ins => {
            const isExpanded = expandedInspectionId === ins.id;
            return (
              <div
                key={ins.id}
                className="bg-white rounded-xl border border-[#CBD5E1] overflow-hidden shadow-xs transition-all"
              >
                <div
                  onClick={() => setExpandedInspectionId(isExpanded ? null : ins.id)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F8FAFC] transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#EEF2F6] border border-[#CBD5E1] text-[#0B2545] flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-[#0B2545]" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-bold text-[#0B2545] tabular-nums">{ins.date}</span>
                        <span className="text-[#94A3B8]">·</span>
                        <span className="font-semibold text-[#B45309]">{ins.type}</span>
                        {ins.score !== undefined && (
                          <>
                            <span className="text-[#94A3B8]">·</span>
                            <span className="font-mono font-bold text-[#14532D] tabular-nums">
                              Score: {ins.score}/100
                            </span>
                          </>
                        )}
                      </div>
                      <h4 className="text-sm sm:text-base font-serif font-bold text-[#0B2545] mt-0.5">
                        {ins.summary}
                      </h4>
                      <p className="text-xs text-[#475569]">{ins.authority}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-md border ${
                        ins.status.toLowerCase().includes('satisfactory') ||
                        ins.status.toLowerCase().includes('exemplary')
                          ? 'bg-[#ECFDF5] text-[#14532D] border-[#86EFAC]'
                          : 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
                      }`}
                    >
                      {ins.status}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#475569]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#475569]" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-3 border-t border-[#CBD5E1] bg-[#F8FAFC] space-y-3 text-xs">
                    <div className="space-y-1.5">
                      <span className="font-bold text-[#0B2545] uppercase text-[10.5px] tracking-wider">
                        Officer Observations & Critical Checkpoints:
                      </span>
                      <ul className="space-y-1 text-[#334155]">
                        {ins.findings.map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#14532D] shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-[#CBD5E1] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#475569]">
                      <span className="font-mono">Document Reference: FSO-JBP-{ins.id}</span>
                      <span className="font-semibold text-[#14532D]">Authorized Digital Seal Applied</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* OFFICIAL EVIDENCE GALLERY */}
      <div className="space-y-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#B45309]">
            Inspection Artifacts
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2545]">
            Official Photographic Evidence
          </h2>
          <p className="text-xs sm:text-sm text-[#475569]">
            Geo-tagged photographic and documentary records captured during authorized audits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {business.evidenceList.map(ev => (
            <div
              key={ev.id}
              className="bg-white rounded-xl border border-[#CBD5E1] overflow-hidden shadow-xs space-y-3 p-3 flex flex-col justify-between"
            >
              <div className="relative h-44 w-full rounded-lg overflow-hidden bg-[#DCE3EB] border border-[#CBD5E1]">
                <SafeImage
                  src={ev.imageUrl}
                  alt={ev.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-[#071A33]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {ev.category}
                </div>
                {ev.isPrototype && (
                  <div className="absolute bottom-2 right-2 bg-[#F8FAFC] text-[#B45309] text-[9.5px] font-bold px-2 py-0.5 rounded-md border border-[#CBD5E1]">
                    PILOT ARTIFACT
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-serif font-bold text-[#0B2545]">{ev.title}</h4>
                <p className="text-xs text-[#475569] leading-snug">{ev.caption}</p>
              </div>

              <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#475569]">
                <span className="font-medium text-[#0B2545]">{ev.authorityTag}</span>
                <span className="font-semibold text-[#0B2545] tabular-nums">{ev.verifiedDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
