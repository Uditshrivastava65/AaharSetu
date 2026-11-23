import React, { useState, useEffect } from 'react';
import {
  Shield,
  FileCheck2,
  Users,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Cpu,
  Search,
  Check,
  Send,
} from 'lucide-react';
import { Business, GovDashboardMetrics } from '../types';
import { getGovMetrics, getAIInspectionObservations } from '../services/api';
import { VerificationBadge } from '../components/VerificationBadge';
import { JABALPUR_BUSINESSES } from '../data/mockData';

interface GovDashboardPageProps {
  businesses: Business[];
  isHindi: boolean;
}

export const GovDashboardPage: React.FC<GovDashboardPageProps> = ({
  businesses,
  isHindi,
}) => {
  const [metrics, setMetrics] = useState<GovDashboardMetrics | null>(null);
  const [selectedBizId, setSelectedBizId] = useState<string>(businesses[0]?.id || '');
  const [inspectionType, setInspectionType] = useState('Routine Hygiene Audit');
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [auditVerdict, setAuditVerdict] = useState<'Verified' | 'Conditional' | 'Re-inspection'>(
    'Verified'
  );
  const [officerNote, setOfficerNote] = useState('');
  const [submittedAuditSuccess, setSubmittedAuditSuccess] = useState(false);

  useEffect(() => {
    getGovMetrics().then(setMetrics);
  }, []);

  const selectedBusiness =
    businesses.find(b => b.id === selectedBizId) || businesses[0] || JABALPUR_BUSINESSES[0];

  const handleRunAiInspectionAssistant = async () => {
    setIsAiLoading(true);
    try {
      const res = await getAIInspectionObservations(
        inspectionType,
        `Category: ${selectedBusiness.category}, Name: ${selectedBusiness.name}, Locality: ${selectedBusiness.locality}`
      );
      setAiSuggestions(res);
    } catch {
      // fallback handled in service
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmitAudit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedAuditSuccess(true);
    setTimeout(() => setSubmittedAuditSuccess(false), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#163828] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E28738] text-xs font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>Jabalpur District Food Safety Administration Pilot</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {isHindi ? 'शासकीय व प्रवर्तन निरीक्षण पोर्टल' : 'Authority & Enforcement Inspection Portal'}
          </h1>
          <p className="text-xs sm:text-sm text-[#BFD8CB]">
            Prototype dashboard for Food Safety Officers (FSO) and municipal health inspectors.
            Verify compliance dossiers, audit physical premises, and update public transparency status.
          </p>
        </div>

        <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-xs space-y-1 shrink-0">
          <div className="text-[10px] uppercase font-bold text-[#A6C8B5]">Officer Session</div>
          <div className="font-bold text-white">Inspector V. K. Tiwari (Badge #FSO-761)</div>
          <div className="text-[11px] text-[#A6C8B5]">Zone 3: Civil Lines & Sadar</div>
        </div>
      </div>

      {/* Overview Metrics Cards */}
      {metrics && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E6DFD5] shadow-xs space-y-1">
            <span className="text-[10.5px] font-bold text-[#718077] uppercase tracking-wider block">
              Registered Outlets
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#163828]">
              {metrics.totalBusinesses}
            </div>
            <span className="text-[11px] text-[#2D7A4D] font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>100% active in pilot</span>
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E6DFD5] shadow-xs space-y-1">
            <span className="text-[10.5px] font-bold text-[#718077] uppercase tracking-wider block">
              Verified Compliance
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#1B5E20]">
              {metrics.verifiedCount}
            </div>
            <span className="text-[11px] text-[#697970]">
              {metrics.conditionalCount} Conditional • {metrics.pendingCount} Pending
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E6DFD5] shadow-xs space-y-1">
            <span className="text-[10.5px] font-bold text-[#718077] uppercase tracking-wider block">
              Inspections (Q3 2026)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#163828]">
              {metrics.inspectionsConductedQuarter}
            </div>
            <span className="text-[11px] text-[#718077]">Routine & Surprise Audits</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E6DFD5] shadow-xs space-y-1">
            <span className="text-[10.5px] font-bold text-[#718077] uppercase tracking-wider block">
              Open Citizen Reports
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#D97724]">
              {metrics.openReportsCount}
            </div>
            <span className="text-[11px] text-[#85948C]">Dispatched to field officers</span>
          </div>
        </div>
      )}

      {/* 2-Column Workspace: FSO Field Inspection Workstation + AI Inspection Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 cols: Interactive FSO Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E6DFD5] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1]">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97724]">
                FSO WORKBENCH
              </span>
              <h2 className="text-xl font-black text-[#163828]">Digital Inspection Form</h2>
            </div>
            <span className="text-xs px-2.5 py-1 bg-[#FAF8F5] border border-[#D5CBC0] font-mono font-bold rounded-lg text-[#163828]">
              SCHEDULE 4 COMPLIANT
            </span>
          </div>

          {submittedAuditSuccess && (
            <div className="p-4 bg-[#EBF7EE] border border-[#C8E6C9] rounded-xl text-[#1B5E20] text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <div>
                <strong>Official Audit Dispatched:</strong> Status for {selectedBusiness.name} has
                been updated and synchronized with the public citizen QR registry.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmitAudit} className="space-y-5">
            {/* Target Business Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#163828]">
                Select Target Business for Inspection:
              </label>
              <select
                value={selectedBizId}
                onChange={e => {
                  setSelectedBizId(e.target.value);
                  setAiSuggestions(null);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CBC0] bg-[#FAF8F5] text-sm font-semibold text-[#163828] focus:ring-2 focus:ring-[#163828]"
              >
                {businesses.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.locality}, UFBI: {b.ufbi})
                  </option>
                ))}
              </select>
            </div>

            {/* Current Dossier Preview */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E6DFD5] flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-[#163828] block">{selectedBusiness.name}</span>
                <span className="text-[#65736B]">
                  Category: {selectedBusiness.category} • FSSAI: {selectedBusiness.registrations.fssaiNumber}
                </span>
              </div>
              <VerificationBadge status={selectedBusiness.officialStatus} size="sm" />
            </div>

            {/* Inspection Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#163828]">
                Inspection Protocol:
              </label>
              <select
                value={inspectionType}
                onChange={e => setInspectionType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CBC0] bg-white text-xs font-medium text-[#163828]"
              >
                <option value="Routine Hygiene Audit">Routine Hygiene Audit (Scheduled)</option>
                <option value="Surprise Quality Check">Surprise Quality Check (Unannounced)</option>
                <option value="Citizen Complaint Verification">
                  Citizen Complaint Verification Audit
                </option>
                <option value="Oil & Raw Material Testing">
                  Oil Degradation (TPM) & Raw Material Testing
                </option>
              </select>
            </div>

            {/* Officer Findings */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#163828]">
                Officer Audit Findings & Field Notes:
              </label>
              <textarea
                rows={3}
                value={officerNote}
                onChange={e => setOfficerNote(e.target.value)}
                placeholder="Log physical observations: temperature records, raw material batch codes, kitchen cleanliness..."
                className="w-full p-3.5 rounded-xl border border-[#D5CBC0] text-xs text-[#163828] focus:ring-2 focus:ring-[#163828]"
                required
              />
            </div>

            {/* Verdict */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#163828]">
                Inspection Finding & Official Determination:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAuditVerdict('Verified')}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-colors ${
                    auditVerdict === 'Verified'
                      ? 'bg-[#1B5E20] text-white border-[#1B5E20]'
                      : 'bg-[#FAF8F5] text-[#1B5E20] border-[#C8E6C9]'
                  }`}
                >
                  Pass (Verified)
                </button>
                <button
                  type="button"
                  onClick={() => setAuditVerdict('Conditional')}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-colors ${
                    auditVerdict === 'Conditional'
                      ? 'bg-[#B45309] text-white border-[#B45309]'
                      : 'bg-[#FAF8F5] text-[#B45309] border-[#FDE68A]'
                  }`}
                >
                  Conditional Pass
                </button>
                <button
                  type="button"
                  onClick={() => setAuditVerdict('Re-inspection')}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-colors ${
                    auditVerdict === 'Re-inspection'
                      ? 'bg-[#991B1B] text-white border-[#991B1B]'
                      : 'bg-[#FAF8F5] text-[#991B1B] border-[#FECACA]'
                  }`}
                >
                  Flag Re-inspection
                </button>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#163828] text-white text-xs font-bold hover:bg-[#1f4a36] transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <FileCheck2 className="w-4 h-4 text-[#E28738]" />
              <span>Sign Digitally & Commit to AaharSetu Public Ledger</span>
            </button>
          </form>
        </div>

        {/* Right 5 cols: AI Inspection Assistant */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#FAF8F5] to-[#F3EFE9] rounded-3xl border border-[#E6DFD5] p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6DFD5]">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#163828] text-white">
                <Sparkles className="w-4 h-4 text-[#E28738]" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#163828]">AI Inspection Assistant</h3>
                <span className="text-[10px] text-[#718077] font-semibold">
                  FSSAI Schedule 4 Rule Engine
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#163828] bg-[#FAF0E6] text-[#D97724] px-2 py-0.5 rounded">
              ASSISTIVE ONLY
            </span>
          </div>

          <p className="text-xs text-[#526058] leading-relaxed">
            Generates specific Critical Control Points (CCP) tailored to{' '}
            <strong>{selectedBusiness.category}</strong> establishments (e.g. oil TPM levels for
            chaat, water test for juice bars, cold chain for sweets).
          </p>

          <button
            onClick={handleRunAiInspectionAssistant}
            disabled={isAiLoading}
            className="w-full py-2.5 rounded-xl bg-[#163828] text-white text-xs font-bold hover:bg-[#1f4a36] disabled:opacity-50 transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <Sparkles className={`w-3.5 h-3.5 text-[#E28738] ${isAiLoading ? 'animate-spin' : ''}`} />
            <span>
              {isAiLoading ? 'Analyzing Critical Control Points...' : `Generate Checklist for ${selectedBusiness.category}`}
            </span>
          </button>

          {/* AI Checklist Output Area */}
          {aiSuggestions ? (
            <div className="space-y-4 pt-2 animate-in fade-in">
              <div className="p-3.5 rounded-2xl bg-white border border-[#E6DFD5] space-y-2">
                <span className="text-[11px] font-bold text-[#163828] uppercase tracking-wider block">
                  Category Risk Checkpoints:
                </span>
                <div className="space-y-2 text-xs">
                  {aiSuggestions.observations?.map((obs: any, i: number) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#ECE5DA] space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#163828]">{obs.item}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            obs.status === 'safe'
                              ? 'bg-[#EBF7EE] text-[#1B5E20]'
                              : 'bg-[#FEF7EC] text-[#B45309]'
                          }`}
                        >
                          {obs.confidence}% audit weight
                        </span>
                      </div>
                      <p className="text-[11px] text-[#55635B]">{obs.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF0E6] border border-[#F5DCBE] text-xs text-[#8A4C12]">
                <strong>AI Synthesis Note:</strong> {aiSuggestions.recommendation}
              </div>
            </div>
          ) : (
            <div className="p-6 text-center border-2 border-dashed border-[#D5CBC0] rounded-2xl text-xs text-[#717E77] space-y-1">
              <Cpu className="w-6 h-6 text-[#8B9891] mx-auto" />
              <p>Click above to trigger the AI inspection assistant for this establishment.</p>
            </div>
          )}

          {/* Authority Disclaimer */}
          <div className="pt-2 text-[10px] text-[#7E8D84] text-center border-t border-[#E6DFD5]">
            *Officer maintains final statutory authority. AI suggestions serve as field guidance
            only.
          </div>
        </div>
      </div>
    </div>
  );
};
