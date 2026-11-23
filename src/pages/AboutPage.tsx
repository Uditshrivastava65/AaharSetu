import React from 'react';
import {
  Shield,
  CheckCircle2,
  XCircle,
  Lock,
  Layers,
  Sparkles,
  Users,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { Logo } from '../components/Logo';

interface AboutPageProps {
  setActiveTab: (tab: string) => void;
  isHindi: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActiveTab, isHindi }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Editorial Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <Logo size="lg" isHindi={isHindi} className="justify-center" />
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#163828] tracking-tight">
          {isHindi ? 'भरोसा, शुद्धता और पारदर्शिता का सेतु' : 'The Architecture of Public Food Trust'}
        </h1>
        <p className="text-base sm:text-lg text-[#526058] leading-relaxed">
          {isHindi
            ? 'आहारसेतु नागरिकों, खाद्य प्रतिष्ठानों और प्राधिकृत निकायों के मध्य सूचनाओं के आदान-प्रदान की पारदर्शी व्यवस्था है।'
            : 'AaharSetu is a citizen-facing food-business transparency and verification platform designed to create a bridge between citizens, food businesses and authorised government authorities.'}
        </p>
      </div>

      {/* What AaharSetu IS vs What It Is NOT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* What It IS */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#F4FAF5] border border-[#CDE5D4] space-y-4">
          <div className="flex items-center gap-2 text-[#1B5E20]">
            <CheckCircle2 className="w-6 h-6" />
            <h3 className="text-lg font-extrabold">What AaharSetu IS</h3>
          </div>
          <ul className="space-y-3 text-sm text-[#3E5B47]">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D7A4D] mt-2 shrink-0" />
              <span>
                <strong>A Transparency Bridge:</strong> Connecting citizens with verified
                food-business registration and inspection records.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D7A4D] mt-2 shrink-0" />
              <span>
                <strong>One Universal Identity (UFBI):</strong> Assigning persistent public
                identifiers to dining premises regardless of aggregator changes.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D7A4D] mt-2 shrink-0" />
              <span>
                <strong>Public Hygiene & Education:</strong> Demystifying food safety standards,
                oil TPM metrics, and Indian culinary nutrition.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D7A4D] mt-2 shrink-0" />
              <span>
                <strong>Citizen Reporting Channel:</strong> Enabling direct routing of concerns to
                municipal health and food officers.
              </span>
            </li>
          </ul>
        </div>

        {/* What It Is NOT */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FFF8F7] border border-[#FCDAD7] space-y-4">
          <div className="flex items-center gap-2 text-[#991B1B]">
            <XCircle className="w-6 h-6" />
            <h3 className="text-lg font-extrabold">What AaharSetu Is NOT</h3>
          </div>
          <ul className="space-y-3 text-sm text-[#7D3734]">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C] mt-2 shrink-0" />
              <span>
                <strong>NOT a Commercial Food-Delivery App:</strong> No cart, no ordering, no
                delivery fleet, no commission margins.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C] mt-2 shrink-0" />
              <span>
                <strong>NOT a Government System Replacement:</strong> Does not issue statutory
                licenses or supersede official FSSAI/municipal powers.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C] mt-2 shrink-0" />
              <span>
                <strong>NOT a Pay-to-Rank Directory:</strong> Businesses cannot purchase higher
                ratings, premium placement, or bypass audits.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C] mt-2 shrink-0" />
              <span>
                <strong>NOT an Unverified Review Forum:</strong> Official safety decisions remain
                strictly separated from community feedback.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* The 4 Core Principles */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D97724]">
            Governing Values
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#163828]">
            The 4 Core Architectural Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#E6DFD5] space-y-2 shadow-xs">
            <span className="text-xs font-mono font-bold text-[#D97724]">01 / FIRST PRINCIPLE</span>
            <h3 className="text-base font-bold text-[#163828]">Citizen-First Transparency</h3>
            <p className="text-xs text-[#5D6B63] leading-relaxed">
              Every diner has the fundamental right to know whether the establishment serving them
              is registered, when its kitchen was last inspected, and what clean practices it
              pledges.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E6DFD5] space-y-2 shadow-xs">
            <span className="text-xs font-mono font-bold text-[#D97724]">02 / IDENTITY</span>
            <h3 className="text-base font-bold text-[#163828]">One Unified Food Business ID (UFBI)</h3>
            <p className="text-xs text-[#5D6B63] leading-relaxed">
              Food safety requires permanent geographic premises identity. UFBI ties compliance
              history to the kitchen location rather than ephemeral brand marketing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E6DFD5] space-y-2 shadow-xs">
            <span className="text-xs font-mono font-bold text-[#D97724]">03 / TRUTH</span>
            <h3 className="text-base font-bold text-[#163828]">Authoritative Evidence Over Noise</h3>
            <p className="text-xs text-[#5D6B63] leading-relaxed">
              Official verification status changes only when backed by signed inspection logs,
              certified water potability reports, and validated licenses.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E6DFD5] space-y-2 shadow-xs">
            <span className="text-xs font-mono font-bold text-[#D97724]">04 / PRIVACY</span>
            <h3 className="text-base font-bold text-[#163828]">Privacy by Design & Minimization</h3>
            <p className="text-xs text-[#5D6B63] leading-relaxed">
              Citizens can scan and verify without signing up, without installing tracking cookies,
              and without disclosing geolocation or payment information.
            </p>
          </div>
        </div>
      </div>

      {/* Jabalpur Pilot Statement */}
      <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#E6DFD5] space-y-4">
        <h3 className="text-lg font-bold text-[#163828]">About the Jabalpur Pilot Demonstration</h3>
        <p className="text-xs sm:text-sm text-[#5C6B62] leading-relaxed">
          This digital prototype implements a comprehensive food-safety transparency layer across 15
          demonstration food establishments in Jabalpur, Madhya Pradesh. The pilot illustrates how
          district food safety administrations, municipal health officers, and citizens can interact
          cohesively using shared QR infrastructure and calibrated AI inspection assistance.
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <button
            onClick={() => setActiveTab('explore')}
            className="px-5 py-2.5 rounded-xl bg-[#163828] text-white text-xs font-bold hover:bg-[#1f4a36] flex items-center gap-2 shadow-xs"
          >
            <span>Explore Pilot Outlets</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E28738]" />
          </button>
          <button
            onClick={() => setActiveTab('gov-demo')}
            className="px-5 py-2.5 rounded-xl border border-[#D5CBC0] bg-white text-[#163828] text-xs font-bold hover:bg-[#FAF8F5]"
          >
            Authority Demo
          </button>
        </div>
      </div>
    </div>
  );
};
