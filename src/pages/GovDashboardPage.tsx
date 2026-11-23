import React, { useState, useEffect } from 'react';
import {
  Shield,
  FileCheck2,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Cpu,
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
  }, [businesses.length]);

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
      {/* Sovereign Command Header */}
      <div className="bg-[#071A33] text-white rounded-xl p-6 sm:p-8 shadow-md border border-[#1E3A5F] gov-grid-pattern flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/15 text-[#FBBF24] text-xs font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>District Food Safety Administration · Jabalpur Division</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
            {isHindi ? 'शासकीय व प्रवर्तन निरीक्षण पोर्टल' : 'Authority & Enforcement Inspection Console'}
          </h1>
          <p className="text-xs sm:text-sm text-[#CBD5E1]">
            Operational workbench for Food Safety Officers (FSO) and Jabalpur Municipal Health
            Inspectors. Audit statutory compliance dossiers and issue verified public inspection determinations.
          </p>
        </div>

        <div className="p-4 bg-[#0B2545] border border-[#1E3A5F] rounded-lg text-xs space-y-1 shrink-0">
          <div className="text-[10px] uppercase font-bold tracking-wider text-[#FBBF24]">
            Active Officer Session
          </div>
          <div className="font-bold text-white">Inspector V. K. Tiwari (Badge #FSO-761)</div>
          <div className="text-[11px] text-[#CBD5E1]">Jurisdiction: Zone 3 (Civil Lines & Sadar)</div>
        </div>
      </div>

      {/* Overview Metrics Cards */}
      {metrics && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#F8FAFC] p-5 rounded-xl border border-[#CBD5E1] shadow-xs space-y-1">
            <span className="text-[10.5px] font-bold text-[#475569] uppercase tracking-wider block">
              Registered UFBI Outlets
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#0B2545] tabular-nums">
              {metrics.totalBusinesses}
            </div>
            <span className="text-[11px] text-[#14532D] font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Active Jabalpur registry</span>
            </span>
          </div>

          <div className="bg-[#F8FAFC] p-5 rounded-xl border border-[#CBD5E1] shadow-xs space-y-1">
            <span className="text-[10.5px] font-bold text-[#475569] uppercase tracking-wider block">
              Verified Compliance
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#14532D] tabular-nums">
              {metrics.verifiedCount}
            </div>
            <span className="text-[11px] text-[#475569] tabular-nums">
              {metrics.conditionalCount} Conditional · {metrics.pendingCount} Pending
            </span>
          </div>

          <div className="bg-[#F8FAFC] p-5 rounded-xl border border-[#CBD5E1] shadow-xs space-y-1">
            <span className="text-[10.5px] font-bold text-[#475569] uppercase tracking-wider block">
              Monthly Field Audits
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#0B2545] tabular-nums">
              {metrics.inspectionsCompletedMonth}
            </div>
            <span className="text-[11px] text-[#475569]">Routine & Surprise Audits</span>
          </div>

          <div className="bg-[#F8FAFC] p-5 rounded-xl border border-[#CBD5E1] shadow-xs space-y-1">
            <span className="text-[10.5px] font-bold text-[#475569] uppercase tracking-wider block">
              Open Citizen Grievances
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#B45309] tabular-nums">
              {metrics.openReportsCount}
            </div>
            <span className="text-[11px] text-[#475569] tabular-nums">
              {metrics.followUpsRequired} follow-up checks queued
            </span>
          </div>
        </div>
      )}

      {/* 2-Column Workspace: FSO Field Inspection Workstation + AI Inspection Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 cols: Interactive FSO Form */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#CBD5E1] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#CBD5E1]">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B45309]">
                FSO FIELD WORKBENCH
              </span>
              <h2 className="text-xl font-serif font-bold text-[#0B2545]">Digital Inspection Determination</h2>
            </div>
            <span className="text-[11px] px-2.5 py-1 bg-[#EEF2F6] border border-[#CBD5E1] font-mono font-bold rounded-md text-[#0B2545]">
              FSSAI SCHEDULE 4
            </span>
          </div>

          {submittedAuditSuccess && (
            <div className="p-4 bg-[#ECFDF5] border border-[#86EFAC] rounded-lg text-[#14532D] text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <div>
                <strong>Official Audit Recorded:</strong> Determination for {selectedBusiness.name} has
                been signed and logged in the public citizen QR registry.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmitAudit} className="space-y-5">
            {/* Target Business Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                Target Establishment:
              </label>
              <select
                value={selectedBizId}
                onChange={e => {
                  setSelectedBizId(e.target.value);
                  setAiSuggestions(null);
                }}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-sm font-semibold text-[#0B2545] focus:ring-2 focus:ring-[#0B2545]"
              >
                {businesses.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.locality} · {b.ufbi})
                  </option>
                ))}
              </select>
            </div>

            {/* Current Dossier Preview */}
            <div className="p-4 rounded-lg bg-[#EEF2F6] border border-[#CBD5E1] flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-[#0B2545] block">{selectedBusiness.name}</span>
                <span className="text-[#475569]">
                  {selectedBusiness.category} · FSSAI: {selectedBusiness.registrations.fssaiNumber}
                </span>
              </div>
              <VerificationBadge status={selectedBusiness.officialStatus} size="sm" />
            </div>

            {/* Inspection Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                Inspection Protocol:
              </label>
              <select
                value={inspectionType}
                onChange={e => setInspectionType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] bg-white text-xs font-medium text-[#0F172A]"
              >
                <option value="Routine Hygiene Audit">Routine Hygiene Audit (Scheduled)</option>
                <option value="Surprise Quality Check">Surprise Quality Check (Unannounced)</option>
                <option value="Citizen Complaint Verification">
                  Citizen Grievance Verification Audit
                </option>
                <option value="Oil & Raw Material Testing">
                  Oil Degradation (TPM) & Potable Water Testing
                </option>
              </select>
            </div>

            {/* Officer Findings */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                Officer Audit Findings & Field Notes:
              </label>
              <textarea
                rows={3}
                value={officerNote}
                onChange={e => setOfficerNote(e.target.value)}
                placeholder="Log physical inspection evidence: cold-chain probe temperatures, raw material batch dates, kitchen drainage & hygiene..."
                className="w-full p-3.5 rounded-lg border border-[#CBD5E1] text-xs text-[#0F172A] focus:ring-2 focus:ring-[#0B2545]"
                required
              />
            </div>

            {/* Verdict */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                Official Determination:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAuditVerdict('Verified')}
                  className={`p-2.5 rounded-lg border text-xs font-bold text-center transition-colors ${
                    auditVerdict === 'Verified'
                      ? 'bg-[#14532D] text-white border-[#14532D]'
                      : 'bg-[#F8FAFC] text-[#14532D] border-[#86EFAC]'
                  }`}
                >
                  Pass (Verified)
                </button>
                <button
                  type="button"
                  onClick={() => setAuditVerdict('Conditional')}
                  className={`p-2.5 rounded-lg border text-xs font-bold text-center transition-colors ${
                    auditVerdict === 'Conditional'
                      ? 'bg-[#B45309] text-white border-[#B45309]'
                      : 'bg-[#F8FAFC] text-[#B45309] border-[#FDE68A]'
                  }`}
                >
                  Conditional Pass
                </button>
                <button
                  type="button"
                  onClick={() => setAuditVerdict('Re-inspection')}
                  className={`p-2.5 rounded-lg border text-xs font-bold text-center transition-colors ${
                    auditVerdict === 'Re-inspection'
                      ? 'bg-[#991B1B] text-white border-[#991B1B]'
                      : 'bg-[#F8FAFC] text-[#991B1B] border-[#FECACA]'
                  }`}
                >
                  Flag Re-audit
                </button>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#13315C] transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <FileCheck2 className="w-4 h-4 text-[#FBBF24]" />
              <span>Digitally Sign & Commit to Public Ledger</span>
            </button>
          </form>
        </div>

        {/* Right 5 cols: AI Inspection Assistant */}
        <div className="lg:col-span-5 bg-[#F8FAFC] rounded-xl border border-[#CBD5E1] p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#CBD5E1]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#0B2545] text-white">
                <Sparkles className="w-4 h-4 text-[#FBBF24]" />
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-[#0B2545]">Inspection Aid Engine</h3>
                <span className="text-[10px] text-[#475569] font-semibold uppercase tracking-wider">
                  Schedule 4 CCP Advisory
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] px-2 py-0.5 rounded-md">
              ASSISTIVE ONLY
            </span>
          </div>

          <p className="text-xs text-[#334155] leading-relaxed">
            Synthesises category-specific Critical Control Points (CCP) tailored for{' '}
            <strong className="text-[#0B2545]">{selectedBusiness.category}</strong> premises (oil TPM
            thresholds, potable water TDS, cold-chain holding limits).
          </p>

          <button
            onClick={handleRunAiInspectionAssistant}
            disabled={isAiLoading}
            className="w-full py-2.5 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#13315C] disabled:opacity-50 transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <Sparkles className={`w-3.5 h-3.5 text-[#FBBF24] ${isAiLoading ? 'animate-spin' : ''}`} />
            <span>
              {isAiLoading
                ? 'Evaluating Critical Control Points...'
                : `Generate Audit Checklist (${selectedBusiness.category})`}
            </span>
          </button>

          {/* AI Checklist Output Area */}
          {aiSuggestions ? (
            <div className="space-y-4 pt-2 animate-in fade-in">
              <div className="p-4 rounded-lg bg-white border border-[#CBD5E1] space-y-2.5">
                <span className="text-[11px] font-bold text-[#0B2545] uppercase tracking-wider block">
                  Category Risk Checkpoints:
                </span>
                <div className="space-y-2 text-xs">
                  {aiSuggestions.observations?.map((obs: any, i: number) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-[#0B2545]">{obs.item}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border tabular-nums ${
                            obs.status === 'safe'
                              ? 'bg-[#ECFDF5] text-[#14532D] border-[#86EFAC]'
                              : 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
                          }`}
                        >
                          {obs.confidence}% weight
                        </span>
                      </div>
                      <p className="text-[11px] text-[#475569]">{obs.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E]">
                <strong>Synthesis Note:</strong> {aiSuggestions.recommendation}
              </div>
            </div>
          ) : (
            <div className="p-6 text-center border-2 border-dashed border-[#CBD5E1] rounded-xl text-xs text-[#475569] space-y-1.5 bg-white">
              <Cpu className="w-6 h-6 text-[#64748B] mx-auto" />
              <p>Select an establishment and trigger the checklist generator for field guidance.</p>
            </div>
          )}

          {/* Authority Disclaimer */}
          <div className="pt-2 text-[10.5px] text-[#64748B] text-center border-t border-[#CBD5E1]">
            *Statutory enforcement authority rests solely with the designated Food Safety Officer.
          </div>
        </div>
      </div>
    </div>
  );
};
