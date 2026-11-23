import React, { useState } from 'react';
import {
  ArrowLeft,
  QrCode,
  Shield,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  Share2,
  Flag,
  Sparkles,
  Phone,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Check,
} from 'lucide-react';
import { Business } from '../types';
import { VerificationBadge } from '../components/VerificationBadge';

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
  if (!business) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-sm text-[#2D3436]/70">No business selected.</p>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2.5 bg-[#1B4332] text-white text-xs font-bold rounded-full"
        >
          Return to Explore
        </button>
      </div>
    );
  }

  const [expandedInspectionId, setExpandedInspectionId] = useState<string | null>(
    business.inspectionHistory?.[0]?.id || null
  );
  const [copied, setCopied] = useState(false);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Breadcrumb / Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1B4332] hover:text-[#E67E22] transition-colors py-1.5 px-3 rounded-full hover:bg-[#F4F1EA]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isHindi ? 'सभी प्रतिष्ठानों पर लौटें' : 'Back to Food Businesses'}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E5E1D8] bg-white text-xs font-semibold text-[#1B4332] hover:bg-[#F4F1EA] transition-colors shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#1B4332]" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied UFBI' : 'Share'}</span>
          </button>
          <button
            onClick={() => onOpenQrBoard(business)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1B4332] text-white text-xs font-bold hover:bg-[#26533f] transition-colors shadow-xs"
          >
            <QrCode className="w-3.5 h-3.5 text-[#E67E22]" />
            <span>{isHindi ? 'क्यूआर बोर्ड' : 'Physical QR Board'}</span>
          </button>
        </div>
      </div>

      {/* Prototype Notification Banner */}
      <div className="p-3.5 bg-[#F4F1EA] border border-[#E5E1D8] text-[#2D3436] rounded-2xl text-xs flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-[#E67E22]" />
          <span>
            <strong className="text-[#1B4332]">PROTOTYPE DEMONSTRATION RECORD:</strong> All verification statuses, licenses,
            and inspection histories for {business.name} are demonstration data for the Jabalpur pilot.
          </span>
        </div>
        <span className="font-mono text-[10.5px] font-bold text-[#E67E22] bg-white px-2.5 py-0.5 rounded-full border border-[#E5E1D8]">PILOT 2026</span>
      </div>

      {/* Hero Header Card */}
      <div className="bg-white rounded-3xl border border-[#E5E1D8] p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Business Details */}
          <div className="lg:col-span-8 space-y-4">
            {/* Top row: UFBI + Official Status Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F4F1EA] border border-[#E5E1D8] font-mono text-xs font-bold text-[#1B4332]">
                <span className="text-[#E67E22]">UFBI:</span>
                <span>{business.ufbi}</span>
              </div>
              <VerificationBadge status={business.officialStatus} size="md" />
              {business.hasCleanKitchenPledge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F1EA] border border-[#E5E1D8] text-xs font-semibold text-[#1B4332]">
                  <Sparkles className="w-3.5 h-3.5 text-[#E67E22]" />
                  <span>Clean Kitchen Pledge</span>
                </span>
              )}
            </div>

            {/* Business Title & Tagline */}
            <div>
              <h1 className="text-3xl sm:text-5xl font-serif text-[#1B4332] tracking-tight">
                {business.name}
              </h1>
              <div className="w-10 h-[2px] bg-[#E67E22] mt-2 mb-2" />
              <p className="text-sm sm:text-base text-[#2D3436]/75 mt-1 font-medium italic">
                “{business.tagline}”
              </p>
            </div>

            {/* Locality & Cuisine pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1 text-[#1B4332] font-semibold bg-[#F4F1EA] border border-[#E5E1D8] px-3 py-1 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-[#E67E22]" />
                <span>{business.locality}, Jabalpur</span>
              </span>
              <span className="text-[#2D3436]/40">•</span>
              <span className="font-semibold text-[#2D3436]/80">{business.category}</span>
              <span className="text-[#2D3436]/40">•</span>
              {business.cuisineTypes.map(c => (
                <span key={c} className="bg-[#F4F1EA] border border-[#E5E1D8] px-2.5 py-0.5 rounded-full text-[#2D3436]/70">
                  {c}
                </span>
              ))}
            </div>

            {/* Address & Hours */}
            <div className="text-xs text-[#2D3436]/75 space-y-1.5 pt-3 border-t border-[#EDE8DF]">
              <p>
                <strong className="text-[#1B4332]">Premises:</strong> {business.fullAddress}
              </p>
              <div className="flex flex-wrap gap-4 text-[11.5px] text-[#2D3436]/60">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#2D3436]/50" />
                  <span>Hours: {business.contactPublic?.hours || '10:00 AM – 10:00 PM'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#2D3436]/50" />
                  <span>Phone: {business.contactPublic?.phone || 'Available at counter'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Business Photo & Action CTA Box */}
          <div className="lg:col-span-4 space-y-4">
            <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-[#E5E1D8] shadow-xs">
              <img
                src={business.image}
                alt={business.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <button
                onClick={() => onOpenQrBoard(business)}
                className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-xs text-[#1B4332] text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-white"
              >
                <QrCode className="w-4 h-4 text-[#E67E22]" />
                <span>Show QR</span>
              </button>
            </div>

            {/* Citizen Action Trigger */}
            <div className="p-5 rounded-2xl bg-[#F4F1EA] border border-[#E5E1D8] space-y-2.5">
              <span className="text-xs font-bold text-[#1B4332] block font-serif text-sm">
                Have an observation or concern?
              </span>
              <p className="text-[11px] text-[#2D3436]/70 leading-relaxed">
                Log feedback or flag a hygiene deviation directly to local food safety authorities.
              </p>
              <button
                onClick={() => onOpenReport(business)}
                className="w-full py-2.5 px-3 rounded-full bg-[#1B4332] hover:bg-[#26533f] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Flag className="w-3.5 h-3.5 text-[#E67E22]" />
                <span>Report an Issue for this Business</span>
              </button>
            </div>
          </div>
        </div>

        {/* Demarcation: Official Government vs Community Sentiment */}
        <div className="mt-8 pt-6 border-t border-[#EDE8DF] grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Side A: Official Verification */}
          <div className="p-5 rounded-2xl bg-[#F4F1EA] border border-[#E5E1D8] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332]">
                Official Food Safety Record
              </span>
              <VerificationBadge status={business.officialStatus} size="sm" />
            </div>
            <p className="text-xs text-[#2D3436]/80">
              Last Inspected: <strong className="text-[#1B4332]">{business.lastInspectedDate}</strong>
            </p>
            <p className="text-[11px] text-[#2D3436]/60 leading-tight">
              Governed by Food Safety Administration and Jabalpur Municipal Corporation.
            </p>
          </div>

          {/* Side B: Customer Community Sentiment */}
          <div className="p-5 rounded-2xl bg-[#F4F1EA] border border-[#E5E1D8] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E67E22]">
                Customer Experience Sentiment
              </span>
              <span className="text-xs font-bold text-[#1B4332]">
                ★ {business.customerExperience.rating} / 5.0
              </span>
            </div>
            <p className="text-xs text-[#2D3436]/80">
              Based on {business.customerExperience.reviewCount} public diner impressions.
            </p>
            <p className="text-[11px] text-[#2D3436]/70 leading-tight italic">
              “{business.customerExperience.sentimentSummary}”
            </p>
          </div>
        </div>
      </div>

      {/* 5 VERIFICATION PILLARS */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E67E22]">
            Compliance Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1B4332]">The 5 Verification Pillars</h2>
          <p className="text-xs sm:text-sm text-[#2D3436]/70">
            Comprehensive transparency across all required operational metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillarList.map(item => (
            <div
              key={item.key}
              className="p-5 rounded-2xl bg-white border border-[#E5E1D8] shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-serif font-bold text-[#1B4332]">{item.pillar.title}</h3>
                  <VerificationBadge status={item.pillar.status} size="sm" />
                </div>
                <p className="text-xs text-[#2D3436]/75 leading-relaxed">{item.pillar.details}</p>
              </div>

              <div className="pt-2 border-t border-[#EDE8DF] flex items-center justify-between text-[11px] text-[#2D3436]/60">
                <span>Status Updated</span>
                <span className="font-semibold text-[#1B4332]">{item.pillar.lastUpdated}</span>
              </div>
            </div>
          ))}

          {/* Official Registrations Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5E1D8] shadow-xs space-y-3">
            <h3 className="text-base font-serif font-bold text-[#1B4332]">Registration Summary</h3>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-1 border-b border-[#EDE8DF]">
                <span className="text-[#2D3436]/60">FSSAI Reference:</span>
                <span className="font-mono font-semibold text-[#1B4332]">
                  {business.registrations.fssaiNumber}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EDE8DF]">
                <span className="text-[#2D3436]/60">FSSAI Category:</span>
                <span className="font-semibold text-[#1B4332]">
                  {business.registrations.fssaiType}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EDE8DF]">
                <span className="text-[#2D3436]/60">Municipal Trade Licence:</span>
                <span className="font-semibold text-[#1B4332]">
                  {business.registrations.municipalTradeLicence}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#2D3436]/60">Potable Water Test:</span>
                <span className="font-semibold text-[#1B4332]">
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
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E67E22]">
            Historical Log
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1B4332]">Inspection History Timeline</h2>
          <p className="text-xs sm:text-sm text-[#2D3436]/70">
            Chronological log of official food-safety and municipal hygiene audits.
          </p>
        </div>

        <div className="space-y-3">
          {business.inspectionHistory.map(ins => {
            const isExpanded = expandedInspectionId === ins.id;
            return (
              <div
                key={ins.id}
                className="bg-white rounded-2xl border border-[#E5E1D8] overflow-hidden shadow-xs transition-all"
              >
                <div
                  onClick={() => setExpandedInspectionId(isExpanded ? null : ins.id)}
                  className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-[#F4F1EA] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F4F1EA] text-[#1B4332] flex items-center justify-center font-bold">
                      <Calendar className="w-5 h-5 text-[#1B4332]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1B4332]">{ins.date}</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F4F1EA] text-[#E67E22] font-semibold border border-[#E5E1D8]">
                          {ins.type}
                        </span>
                      </div>
                      <h4 className="text-base font-serif font-bold text-[#1B4332] mt-0.5">{ins.summary}</h4>
                      <p className="text-xs text-[#2D3436]/60">{ins.authority}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        ins.status.toLowerCase().includes('pass')
                          ? 'bg-[#F4F1EA] text-[#1B4332] border-[#E5E1D8]'
                          : 'bg-[#F4F1EA] text-[#E67E22] border-[#E5E1D8]'
                      }`}
                    >
                      {ins.status}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-[#2D3436]/50" /> : <ChevronDown className="w-4 h-4 text-[#2D3436]/50" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-3 border-t border-[#EDE8DF] bg-[#F4F1EA] space-y-3 text-xs">
                    <div className="space-y-1.5">
                      <span className="font-bold text-[#1B4332] uppercase text-[10.5px]">
                        Officer Observations & Audit Checkpoints:
                      </span>
                      <ul className="space-y-1 text-[#2D3436]/80">
                        {ins.findings.map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332] shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-[#E5E1D8] flex items-center justify-between text-[11px] text-[#2D3436]/70">
                      <span>Document Reference: FSO-JBP-{ins.id}</span>
                      <span className="font-semibold text-[#1B4332]">Authorized Digital Seal Applied</span>
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
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E67E22]">
            Physical Evidence
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1B4332]">Official Photographic Evidence</h2>
          <p className="text-xs sm:text-sm text-[#2D3436]/70">
            Geo-tagged photographic evidence recorded during authorized inspection walkthroughs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {business.evidenceList.map(ev => (
            <div
              key={ev.id}
              className="bg-white rounded-2xl border border-[#E5E1D8] overflow-hidden shadow-xs space-y-3 p-3 flex flex-col justify-between"
            >
              <div className="relative h-44 w-full rounded-xl overflow-hidden bg-[#F4F1EA]">
                <img
                  src={ev.imageUrl}
                  alt={ev.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {ev.category}
                </div>
                {ev.isPrototype && (
                  <div className="absolute bottom-2 right-2 bg-[#F4F1EA] text-[#E67E22] text-[9.5px] font-bold px-2 py-0.5 rounded border border-[#E5E1D8]">
                    PROTOTYPE
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-serif font-bold text-[#1B4332]">{ev.title}</h4>
                <p className="text-xs text-[#2D3436]/70 leading-snug">{ev.caption}</p>
              </div>

              <div className="pt-2 border-t border-[#EDE8DF] flex items-center justify-between text-[11px] text-[#2D3436]/60">
                <span>{ev.authorityTag}</span>
                <span className="font-semibold text-[#1B4332]">{ev.verifiedDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
