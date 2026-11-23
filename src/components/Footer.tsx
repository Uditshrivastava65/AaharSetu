import React, { useState } from 'react';
import {
  ShieldCheck,
  ExternalLink,
  HelpCircle,
  FileText,
  Eye,
  Download,
  UserCheck,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { Logo } from './Logo';
import {
  PROJECT_DOCUMENTS,
  CREATOR_INFO,
  type ProjectDocument,
} from '../data/projectDocuments';
import { DocumentViewerModal } from './DocumentViewerModal';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  isHindi: boolean;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, isHindi }) => {
  const [activeDoc, setActiveDoc] = useState<ProjectDocument | null>(null);

  return (
    <footer className="bg-[#071A33] text-[#CBD5E1] pt-12 pb-24 lg:pb-10 border-t-4 border-[#B45309]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-[#1E3A5F]">
          {/* Col 1 & 2: Institutional Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" size="lg" isHindi={isHindi} />
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-md pt-1">
              {isHindi
                ? 'आहारसेतु एक नागरिक-उन्मुख खाद्य-व्यापार पारदर्शिता और सत्यापन मंच है, जो नागरिकों, खाद्य प्रतिष्ठानों और प्राधिकृत खाद्य-सुरक्षा प्राधिकरणों के बीच सेतु का निर्माण करता है।'
                : 'AaharSetu is a citizen-facing food safety transparency and statutory registry initiative connecting diners, food business operators, and municipal enforcement authorities.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#FBBF24] font-semibold">
              <span>{isHindi ? '“जानें। सत्यापित करें। भरोसे के साथ खाएँ।”' : '“Know. Verify. Eat with Confidence.”'}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0B2545] rounded-md border border-[#1E3A5F] text-[11px] text-[#CBD5E1]">
              <ShieldCheck className="w-4 h-4 text-[#34D399] shrink-0" />
              <span>
                {isHindi
                  ? 'यह कोई व्यावसायिक फ़ूड डिलीवरी ऐप नहीं है, न ही वैधानिक निकायों का विकल्प।'
                  : 'Public Digital Infrastructure Pilot · Non-Commercial Registry'}
              </span>
            </div>
          </div>

          {/* Col 3: Citizen Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
              {isHindi ? 'नागरिक सेवाएँ' : 'Citizen Services'}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
              <li>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="hover:text-white transition-colors"
                >
                  {isHindi ? 'खाद्य पंजिका खोजें' : 'Food Business Registry'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('scan')}
                  className="hover:text-white transition-colors"
                >
                  {isHindi ? 'क्यूआर स्कैन व सत्यापन' : 'Verify Counter QR'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('map')}
                  className="hover:text-white transition-colors"
                >
                  {isHindi ? 'जबलपुर वार्ड मानचित्र' : 'Jabalpur Ward Map'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className="hover:text-white transition-colors"
                >
                  {isHindi ? 'भारतीय पोषण ज्ञानकोष' : 'ICMR-NIN Nutrition Guide'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('ai')}
                  className="hover:text-white transition-colors"
                >
                  {isHindi ? 'आहार AI सहायक' : 'Aahar AI Food Advisory'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Governance & Grievances */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
              {isHindi ? 'पारदर्शिता एवं निवारण' : 'Governance & Grievances'}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
              <li>
                <button
                  onClick={() => setActiveTab('report')}
                  className="hover:text-white transition-colors"
                >
                  {isHindi ? 'शिकायत दर्ज करें' : 'Lodge Safety Grievance'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('report')}
                  className="hover:text-white transition-colors"
                >
                  {isHindi ? 'शिकायत स्थिति ट्रैक करें' : 'Track Grievance Status'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('privacy')}
                  className="hover:text-white transition-colors"
                >
                  {isHindi ? 'गोपनीयता एवं डेटा सुरक्षा' : 'Data Minimization Policy'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('about')}
                  className="hover:text-white transition-colors"
                >
                  {isHindi ? 'सिद्धांत एवं कार्यप्रणाली' : 'Architectural Mandate'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: FBO & Authority Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
              {isHindi ? 'प्रतिष्ठान व प्रशासन' : 'Portals & Authorities'}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
              <li>
                <button
                  onClick={() => setActiveTab('onboard')}
                  className="hover:text-white transition-colors text-[#FBBF24] font-medium"
                >
                  {isHindi ? 'नया व्यवसाय पंजीकरण (UFBI)' : 'Onboard Establishment (UFBI)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('gov-demo')}
                  className="hover:text-white transition-colors"
                >
                  {isHindi ? 'शासकीय निरीक्षण पोर्टल' : 'FSO Inspection Portal'}
                </button>
              </li>
              <li>
                <a
                  href="https://fssai.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>FSSAI Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-[#64748B]" />
                </a>
              </li>
              <li>
                <span className="text-xs text-[#64748B] block pt-1">
                  Jabalpur Division Pilot (MP)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Prototype Statutory Notice */}
        <div className="my-6 p-4 rounded-lg bg-[#0B2545] border border-[#1E3A5F] text-xs text-[#CBD5E1] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-[#FBBF24] shrink-0 mt-0.5" />
            <span>
              <strong className="text-white">PROTOTYPE DEMONSTRATION NOTICE:</strong> All Jabalpur food establishments,
              Universal Food Business IDs (UFBI), inspection records, and photographic evidence
              are demonstration records created strictly for public transparency pilot evaluation.
            </span>
          </div>
        </div>

        {/* Project Documents & Concept Attribution Section */}
        <div className="py-6 border-t border-b border-[#1E3A5F] space-y-6">
          {/* Official Project Documents (2 PDFs) */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FBBF24]">
                  {isHindi ? 'आधिकारिक परियोजना अभिलेखागार' : 'OFFICIAL PROJECT ARCHIVE · PDF DOSSIERS'}
                </span>
                <h4 className="text-base font-serif font-bold text-white">
                  {isHindi
                    ? 'आहारसेतु परियोजना दस्तावेज़ देखें'
                    : 'Inspect AaharSetu Project Documents'}
                </h4>
              </div>
              <span className="text-xs text-[#94A3B8]">
                {isHindi
                  ? 'पूर्ण अवधारणा और परियोजना नोट सीधे ब्राउज़र में पढ़ें या डाउनलोड करें'
                  : 'Read inline or download the complete concept explainers & project note'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROJECT_DOCUMENTS.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-lg bg-[#0B2545] border border-[#1E3A5F] flex flex-col justify-between gap-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#FBBF24] uppercase tracking-wider">
                        <FileText className="w-3.5 h-3.5" />
                        <span>{doc.tag}</span>
                      </span>
                      <span className="text-[11px] font-mono text-[#94A3B8]">PDF</span>
                    </div>
                    <h5 className="text-sm font-serif font-bold text-white">
                      {isHindi ? doc.titleHi : doc.title}
                    </h5>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {isHindi ? doc.descriptionHi : doc.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveDoc(doc)}
                      className="px-3.5 py-2 rounded-md bg-[#B45309] hover:bg-[#92400E] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isHindi ? 'दस्तावेज़ देखें' : 'View Document'}</span>
                    </button>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-md bg-[#13315C] hover:bg-[#1E3A5F] border border-[#334155] text-xs font-semibold text-[#E2E8F0] inline-flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#FBBF24]" />
                      <span>{isHindi ? 'नए टैब में खोलें' : 'Open PDF'}</span>
                    </a>
                    <a
                      href={doc.url}
                      download={doc.filename}
                      className="px-3 py-2 rounded-md bg-[#071A33] hover:bg-[#13315C] border border-[#1E3A5F] text-xs font-semibold text-[#CBD5E1] inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-[#34D399]" />
                      <span>{isHindi ? 'डाउनलोड' : 'Download'}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About the Idea Man — Udit Shrivastava */}
          <div className="p-5 rounded-lg bg-[#0B2545] border border-[#1E3A5F] flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#13315C] border border-[#334155] text-[10px] font-bold uppercase tracking-wider text-[#FBBF24]">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'विचारक एवं प्रवर्तक · IDEA MAN' : 'ABOUT THE IDEA MAN & CONCEPT AUTHOR'}</span>
                </span>
                <span className="text-xs text-[#94A3B8]">
                  {isHindi ? CREATOR_INFO.educationHi : CREATOR_INFO.education}
                </span>
              </div>
              <h4 className="text-lg font-serif font-bold text-white">
                {isHindi ? CREATOR_INFO.nameHi : CREATOR_INFO.name}{' '}
                <span className="text-xs font-sans font-semibold text-[#34D399] ml-1">
                  — {isHindi ? CREATOR_INFO.roleHi : CREATOR_INFO.role}
                </span>
              </h4>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                {isHindi ? CREATOR_INFO.bioHi : CREATOR_INFO.bio}
              </p>
              <p className="text-xs italic text-[#FDE68A] border-l-2 border-[#B45309] pl-3 py-0.5">
                {isHindi ? CREATOR_INFO.foundingQuestionHi : CREATOR_INFO.foundingQuestion}
              </p>
            </div>

            <div className="flex flex-col gap-2 text-xs text-[#CBD5E1] shrink-0 lg:border-l lg:border-[#1E3A5F] lg:pl-6">
              <div className="inline-flex items-center gap-2 text-[#94A3B8]">
                <MapPin className="w-3.5 h-3.5 text-[#FBBF24] shrink-0" />
                <span>{isHindi ? CREATOR_INFO.locationHi : CREATOR_INFO.location}</span>
              </div>
              <a
                href={`mailto:${CREATOR_INFO.email}`}
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#FBBF24] shrink-0" />
                <span>{CREATOR_INFO.email}</span>
              </a>
              <a
                href={`tel:${CREATOR_INFO.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 hover:text-white transition-colors font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
                <span>{CREATOR_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Copyright Bar */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div>
            © {new Date().getFullYear()} AaharSetu (आहारसेतु) · Idea Proposed by{' '}
            <strong className="text-white">Udit Shrivastava</strong> · Jabalpur Public Food Safety Transparency Initiative
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Protocol
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setActiveTab('about')}
              className="hover:text-white transition-colors"
            >
              Statutory Charter
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setActiveTab('gov-demo')}
              className="hover:text-white transition-colors"
            >
              Officer Workbench
            </button>
          </div>
        </div>
      </div>

      {/* Inline PDF Document Viewer Modal */}
      <DocumentViewerModal
        doc={activeDoc}
        onClose={() => setActiveDoc(null)}
        isHindi={isHindi}
      />
    </footer>
  );
};
