import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Shield,
  FileText,
  Eye,
  ExternalLink,
  Download,
  UserCheck,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { Logo } from '../components/Logo';
import {
  PROJECT_DOCUMENTS,
  CREATOR_INFO,
  type ProjectDocument,
} from '../data/projectDocuments';
import { DocumentViewerModal } from '../components/DocumentViewerModal';

interface AboutPageProps {
  setActiveTab: (tab: string) => void;
  isHindi: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActiveTab, isHindi }) => {
  const [activeDoc, setActiveDoc] = useState<ProjectDocument | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Charter Header Banner */}
      <div className="bg-[#0B2545] text-white rounded-xl p-8 sm:p-10 border border-[#1E3A5F] shadow-md gov-grid-pattern text-center space-y-4">
        <Logo variant="light" size="lg" isHindi={isHindi} className="justify-center" />
        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#FBBF24]">
          <Shield className="w-3.5 h-3.5" />
          <span>Public Digital Infrastructure Charter</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          {isHindi ? 'भरोसा, शुद्धता और पारदर्शिता का सेतु' : 'The Architecture of Public Food Trust'}
        </h1>
        <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed max-w-3xl mx-auto">
          {isHindi
            ? 'आहारसेतु नागरिकों, खाद्य प्रतिष्ठानों और प्राधिकृत निकायों के मध्य सूचनाओं के आदान-प्रदान की पारदर्शी व्यवस्था है।'
            : 'AaharSetu is a citizen-facing food-business transparency and verification layer connecting citizens, food establishments, and authorised municipal & food-safety authorities.'}
        </p>
      </div>

      {/* What AaharSetu IS vs What It Is NOT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* What It IS */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#ECFDF5] border border-[#86EFAC] space-y-4">
          <div className="flex items-center gap-2 text-[#14532D]">
            <CheckCircle2 className="w-6 h-6" />
            <h3 className="text-lg font-serif font-bold">What AaharSetu IS</h3>
          </div>
          <ul className="space-y-3 text-sm text-[#14532D]">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14532D] mt-2 shrink-0" />
              <span>
                <strong>A Civic Transparency Bridge:</strong> Presenting authorised registration,
                hygiene grades, and field inspection records to citizens at the point of dining.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14532D] mt-2 shrink-0" />
              <span>
                <strong>One Universal Identity (UFBI):</strong> Assigning persistent premise-bound
                identifiers independent of commercial delivery apps.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14532D] mt-2 shrink-0" />
              <span>
                <strong>Public Hygiene & Nutrition Literacy:</strong> Explaining oil TPM standards,
                water potability logs, and ICMR-NIN Indian nutrition profiles.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14532D] mt-2 shrink-0" />
              <span>
                <strong>Direct Grievance Routing:</strong> Allowing citizens to submit time-stamped
                concerns directly to ward food safety officers.
              </span>
            </li>
          </ul>
        </div>

        {/* What It Is NOT */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#FEF2F2] border border-[#FECACA] space-y-4">
          <div className="flex items-center gap-2 text-[#991B1B]">
            <XCircle className="w-6 h-6" />
            <h3 className="text-lg font-serif font-bold">What AaharSetu Is NOT</h3>
          </div>
          <ul className="space-y-3 text-sm text-[#7F1D1D]">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#991B1B] mt-2 shrink-0" />
              <span>
                <strong>NOT a Commercial Food-Delivery Platform:</strong> Zero food ordering, zero
                payment checkout, zero delivery commissions.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#991B1B] mt-2 shrink-0" />
              <span>
                <strong>NOT a Replacement for FSSAI / Municipal Systems:</strong> Supplements existing
                statutory databases without issuing legal licences.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#991B1B] mt-2 shrink-0" />
              <span>
                <strong>NOT a Pay-to-Rank Directory:</strong> Establishments cannot purchase higher
                standing, suppress audits, or pay for placement.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#991B1B] mt-2 shrink-0" />
              <span>
                <strong>NOT an Unverified Review Site:</strong> Statutory inspection outcomes remain
                strictly separated from diner sentiment scores.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* The 4 Core Principles */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#B45309]">
            Governance Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2545]">
            Core Institutional Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-white border border-[#CBD5E1] space-y-2 shadow-xs">
            <span className="text-[11px] font-mono font-bold text-[#B45309]">01 · FIRST PRINCIPLE</span>
            <h3 className="text-base font-serif font-bold text-[#0B2545]">Citizen-First Transparency</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Every citizen has the right to inspect whether a food business holds valid statutory
              registrations, when it was last audited, and what hygiene practices it maintains.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-[#CBD5E1] space-y-2 shadow-xs">
            <span className="text-[11px] font-mono font-bold text-[#B45309]">02 · IDENTITY</span>
            <h3 className="text-base font-serif font-bold text-[#0B2545]">Universal Food Business ID (UFBI)</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Food safety accountability demands permanent premise-level identity, binding audit
              history to the physical kitchen regardless of brand renames.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-[#CBD5E1] space-y-2 shadow-xs">
            <span className="text-[11px] font-mono font-bold text-[#B45309]">03 · EVIDENCE</span>
            <h3 className="text-base font-serif font-bold text-[#0B2545]">Authoritative Evidence Over Noise</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Official verification badges reflect signed Food Safety Officer logs, lab-tested
              potable water records, and verified FSSAI registrations.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-[#CBD5E1] space-y-2 shadow-xs">
            <span className="text-[11px] font-mono font-bold text-[#B45309]">04 · PRIVACY</span>
            <h3 className="text-base font-serif font-bold text-[#0B2545]">Privacy by Design & Minimization</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Citizens verify establishments immediately without mandatory logins, tracking cookies,
              or commercial profiling.
            </p>
          </div>
        </div>
      </div>

      {/* Jabalpur Pilot Statement */}
      <div className="p-8 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#0B2545]">
          About the Jabalpur Pilot Demonstration
        </h3>
        <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
          This digital prototype demonstrates a public food-safety transparency infrastructure across
          <strong> 30 demonstration food establishments</strong> across Jabalpur, Madhya Pradesh—spanning
          restaurants, cafés, sweet shops, traditional thali halls, clean street food hubs, dhabas,
          and cloud kitchens. It illustrates how district food safety administrations, municipal
          inspectors, and citizens collaborate via shared QR plaques and AI-assisted compliance checklists.
        </p>
        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab('explore')}
            className="px-5 py-2.5 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#13315C] flex items-center gap-2 shadow-xs"
          >
            <span>Open Public Registry (30 Outlets)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FBBF24]" />
          </button>
          <button
            onClick={() => setActiveTab('gov-demo')}
            className="px-5 py-2.5 rounded-lg border border-[#CBD5E1] bg-white text-[#0B2545] text-xs font-bold hover:bg-[#EEF2F6]"
          >
            Open Officer Inspection Console
          </button>
        </div>
      </div>

      {/* Official Project Documents Dossier */}
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#B45309]">
            {isHindi ? 'परियोजना अभिलेख एवं विवरण पुस्तिकाएँ' : 'Official Project Documents'}
          </span>
          <h2 className="text-2xl font-serif font-bold text-[#0B2545]">
            {isHindi ? 'आहारसेतु परियोजना दस्तावेज़' : 'Project Explainers & Concept Dossiers'}
          </h2>
          <p className="text-xs sm:text-sm text-[#475569]">
            {isHindi
              ? 'आहारसेतु की संपूर्ण अवधारणा, कार्यप्रणाली और परियोजना नोट को देखने या डाउनलोड करने के लिए नीचे दिए गए दस्तावेज़ खोलें।'
              : 'Open or download the official AaharSetu project explainer documents directly below.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECT_DOCUMENTS.map((doc) => (
            <div
              key={doc.id}
              className="p-6 rounded-xl bg-white border border-[#CBD5E1] shadow-xs flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#B45309]">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{doc.tag}</span>
                  </span>
                  <span className="text-[11px] font-mono text-[#64748B]">PDF</span>
                </div>
                <h3 className="text-base font-serif font-bold text-[#0B2545]">
                  {isHindi ? doc.titleHi : doc.title}
                </h3>
                <p className="text-xs font-semibold text-[#1E3A5F]">
                  {isHindi ? doc.subtitleHi : doc.subtitle}
                </p>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {isHindi ? doc.descriptionHi : doc.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setActiveDoc(doc)}
                  className="px-4 py-2 rounded-lg bg-[#0B2545] hover:bg-[#13315C] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-[#FBBF24]" />
                  <span>{isHindi ? 'दस्तावेज़ देखें' : 'View Document'}</span>
                </button>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] hover:bg-[#EEF2F6] text-[#0B2545] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>{isHindi ? 'नए टैब में खोलें' : 'Open PDF'}</span>
                </a>
                <a
                  href={doc.url}
                  download={doc.filename}
                  className="px-3.5 py-2 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#14532D] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'डाउनलोड' : 'Download'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About the Idea Man — Udit Shrivastava */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#0B2545] text-white border border-[#1E3A5F] shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#13315C] border border-[#334155] text-[11px] font-bold uppercase tracking-wider text-[#FBBF24]">
            <UserCheck className="w-3.5 h-3.5" />
            <span>{isHindi ? 'विचारक एवं अवधारणा प्रस्तावक · IDEA MAN' : 'ABOUT THE IDEA MAN & CONCEPT AUTHOR'}</span>
          </span>
          <span className="text-xs text-[#CBD5E1]">
            {isHindi ? CREATOR_INFO.educationHi : CREATOR_INFO.education}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
            {isHindi ? CREATOR_INFO.nameHi : CREATOR_INFO.name}
          </h3>
          <p className="text-xs font-semibold text-[#34D399]">
            {isHindi ? CREATOR_INFO.roleHi : CREATOR_INFO.role}
          </p>
          <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
            {isHindi ? CREATOR_INFO.bioHi : CREATOR_INFO.bio}
          </p>
          <blockquote className="text-xs sm:text-sm italic text-[#FDE68A] border-l-2 border-[#B45309] pl-3.5 py-1">
            {isHindi ? CREATOR_INFO.foundingQuestionHi : CREATOR_INFO.foundingQuestion}
          </blockquote>
        </div>

        <div className="pt-3 border-t border-[#1E3A5F] flex flex-wrap items-center gap-5 text-xs text-[#CBD5E1]">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#FBBF24]" />
            <span>{isHindi ? CREATOR_INFO.locationHi : CREATOR_INFO.location}</span>
          </span>
          <a
            href={`mailto:${CREATOR_INFO.email}`}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#FBBF24]" />
            <span>{CREATOR_INFO.email}</span>
          </a>
          <a
            href={`tel:${CREATOR_INFO.phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors font-mono"
          >
            <Phone className="w-3.5 h-3.5 text-[#34D399]" />
            <span>{CREATOR_INFO.phone}</span>
          </a>
        </div>
      </div>

      {/* Inline PDF Document Viewer Modal */}
      <DocumentViewerModal
        doc={activeDoc}
        onClose={() => setActiveDoc(null)}
        isHindi={isHindi}
      />
    </div>
  );
};
