import React, { useState } from 'react';
import {
  Flag,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
} from 'lucide-react';
import { Business, CitizenReport } from '../types';
import { submitComplaint, trackComplaint } from '../services/api';
import { JABALPUR_BUSINESSES } from '../data/mockData';

interface ReportPageProps {
  businesses: Business[];
  preselectedBusiness?: Business | null;
  isHindi: boolean;
}

export const ReportPage: React.FC<ReportPageProps> = ({
  businesses,
  preselectedBusiness,
  isHindi,
}) => {
  const [activeMode, setActiveMode] = useState<'submit' | 'track'>('submit');

  // Submit Form state
  const [selectedBusinessId, setSelectedBusinessId] = useState(
    preselectedBusiness?.id || businesses[0]?.id || ''
  );
  const [category, setCategory] = useState<CitizenReport['category']>('Hygiene Concern');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReport, setSubmittedReport] = useState<CitizenReport | null>(null);

  // Track Form state (uses real sample ID from DEMO_REPORTS)
  const [trackingIdInput, setTrackingIdInput] = useState('REP-JBP-8492');
  const [trackedReport, setTrackedReport] = useState<CitizenReport | null>(null);
  const [trackError, setTrackError] = useState(false);
  const [isTrackSearching, setIsTrackSearching] = useState(false);

  const categories: CitizenReport['category'][] = [
    'Hygiene Concern',
    'Stale / Spoiled Food',
    'Pest / Infestation',
    'Staff Hygiene',
    'Misleading Information',
    'Other',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const biz = businesses.find(b => b.id === selectedBusinessId) || businesses[0] || JABALPUR_BUSINESSES[0];

    try {
      const rep = await submitComplaint({
        businessId: biz.id,
        businessName: biz.name,
        category,
        description,
        isAnonymous,
      });
      setSubmittedReport(rep);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingIdInput.trim()) return;

    setIsTrackSearching(true);
    setTrackError(false);
    try {
      const rep = await trackComplaint(trackingIdInput.trim());
      if (rep) {
        setTrackedReport(rep);
        setTrackError(false);
      } else {
        setTrackedReport(null);
        setTrackError(true);
      }
    } finally {
      setIsTrackSearching(false);
    }
  };

  const statusWorkflow = [
    { label: 'Report Received', step: 1 },
    { label: 'Preliminary Review', step: 2 },
    { label: 'Assigned to Ward Officer', step: 3 },
    { label: 'Inspection Scheduled', step: 4 },
    { label: 'Action Completed', step: 5 },
  ];

  const getActiveStep = (status: CitizenReport['status']) => {
    switch (status) {
      case 'REPORT RECEIVED':
        return 1;
      case 'PRELIMINARY REVIEW':
      case 'UNDER REVIEW':
        return 2;
      case 'ASSIGNED TO WARD OFFICER':
        return 3;
      case 'FIELD INSPECTION SCHEDULED':
      case 'OFFICIAL FINDING':
        return 4;
      case 'RESOLVED':
        return 5;
      default:
        return 2;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0B2545] text-white rounded-xl p-6 sm:p-8 border border-[#1E3A5F] shadow-md gov-grid-pattern text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#071A33] border border-[#1E3A5F] text-[#FBBF24] text-xs font-bold uppercase tracking-wider">
          <Flag className="w-3.5 h-3.5" />
          <span>{isHindi ? 'नागरिक संज्ञान एवं निवारण प्रकोष्ठ' : 'Citizen Grievance Redressal Desk'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          {isHindi ? 'खाद्य सुरक्षा संबंधी शिकायत दर्ज करें' : 'Report a Food Safety Concern'}
        </h1>
        <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-lg mx-auto">
          Log unhygienic food handling, storage deviations, or licensing concerns for review by
          Jabalpur Municipal & Food Safety Authorities.
        </p>
      </div>

      {/* Mode Switcher: Submit new vs Track existing */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-lg bg-[#DCE3EB] border border-[#CBD5E1]">
          <button
            onClick={() => setActiveMode('submit')}
            className={`px-5 py-2 rounded-md text-xs font-bold transition-all ${
              activeMode === 'submit'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'text-[#334155] hover:text-[#0B2545]'
            }`}
          >
            {isHindi ? 'नई शिकायत दर्ज करें' : 'File New Grievance'}
          </button>
          <button
            onClick={() => {
              setActiveMode('track');
              handleTrackSubmit({ preventDefault: () => {} } as any);
            }}
            className={`px-5 py-2 rounded-md text-xs font-bold transition-all ${
              activeMode === 'track'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'text-[#334155] hover:text-[#0B2545]'
            }`}
          >
            {isHindi ? 'शिकायत की स्थिति ट्रैक करें' : 'Track Grievance Status'}
          </button>
        </div>
      </div>

      {/* MODE 1: SUBMIT REPORT */}
      {activeMode === 'submit' && (
        <div className="bg-white rounded-xl border border-[#CBD5E1] p-6 sm:p-8 shadow-xs space-y-6">
          {submittedReport ? (
            <div className="text-center py-6 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-[#ECFDF5] border border-[#86EFAC] text-[#14532D] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#0B2545]">Grievance Registered Successfully</h3>
              <p className="text-xs text-[#475569] max-w-md mx-auto">
                Your submission has been routed to the Jabalpur Municipal Food Safety Unit. Retain your
                tracking docket reference below.
              </p>

              <div className="p-4 bg-[#F8FAFC] rounded-lg border border-[#CBD5E1] inline-block font-mono text-sm font-bold text-[#0B2545]">
                Docket ID: <span className="text-[#B45309]">{submittedReport.reportId}</span>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setTrackingIdInput(submittedReport.reportId);
                    setActiveMode('track');
                    setTrackedReport(submittedReport);
                  }}
                  className="px-5 py-2.5 bg-[#0B2545] text-white text-xs font-bold rounded-lg hover:bg-[#13315C]"
                >
                  Track Docket Status
                </button>
                <button
                  onClick={() => {
                    setSubmittedReport(null);
                    setDescription('');
                  }}
                  className="px-5 py-2.5 border border-[#CBD5E1] bg-white text-[#0B2545] text-xs font-bold rounded-lg hover:bg-[#F8FAFC]"
                >
                  File Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Important Statutory Disclaimer */}
              <div className="p-4 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                <div>
                  <strong>Statutory Process Notice:</strong> Citizen submissions trigger preliminary evaluation
                  by Food Safety Officers and are not public violation findings until field-verified.
                </div>
              </div>

              {/* Target Business Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                  Select Food Establishment:
                </label>
                <select
                  value={selectedBusinessId}
                  onChange={e => setSelectedBusinessId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-sm text-[#0B2545] font-medium focus:ring-2 focus:ring-[#0B2545]"
                >
                  {businesses.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.locality} · {b.ufbi})
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                  Observation Category:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`p-2.5 rounded-lg border text-xs font-medium text-left transition-colors ${
                        category === cat
                          ? 'border-[#0B2545] bg-[#0B2545] text-white font-bold'
                          : 'border-[#CBD5E1] bg-[#F8FAFC] text-[#334155] hover:bg-[#EEF2F6]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                  Factual Observation & Details:
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Provide date/time, specific food item or area observed, and objective details..."
                  className="w-full p-3.5 rounded-lg border border-[#CBD5E1] text-sm text-[#0F172A] focus:ring-2 focus:ring-[#0B2545] focus:outline-none"
                  required
                />
              </div>

              {/* Photo Evidence Drag-and-drop placeholder */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                  Attach Supporting Evidence (Optional):
                </label>
                <div className="p-6 rounded-xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] text-center space-y-1.5 hover:bg-[#EEF2F6] transition-colors cursor-pointer">
                  <UploadCloud className="w-7 h-7 text-[#475569] mx-auto" />
                  <div className="text-xs text-[#334155]">
                    <span className="font-bold text-[#0B2545]">Select file</span> or drag and drop photo/bill receipt
                  </div>
                  <span className="text-[10.5px] text-[#64748B] block">
                    PNG, JPG, PDF up to 10MB (Pilot demonstration upload)
                  </span>
                </div>
              </div>

              {/* Anonymous Checkbox */}
              <div className="flex items-center gap-3 p-3.5 bg-[#F8FAFC] rounded-lg border border-[#CBD5E1]">
                <input
                  type="checkbox"
                  id="anonymousCheck"
                  checked={isAnonymous}
                  onChange={e => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0B2545] focus:ring-[#0B2545]"
                />
                <label htmlFor="anonymousCheck" className="text-xs text-[#334155] cursor-pointer">
                  <strong className="text-[#0B2545]">Submit Anonymously:</strong> Withhold my identity from
                  the food establishment and public logs.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !description.trim()}
                className="w-full py-3.5 rounded-lg bg-[#0B2545] text-white text-sm font-bold hover:bg-[#13315C] disabled:opacity-40 transition-colors shadow-xs"
              >
                {isSubmitting ? 'Dispatching to Jabalpur Food Authority...' : 'Register Official Grievance'}
              </button>
            </form>
          )}
        </div>
      )}

      {/* MODE 2: TRACK REPORT */}
      {activeMode === 'track' && (
        <div className="bg-white rounded-xl border border-[#CBD5E1] p-6 sm:p-8 shadow-xs space-y-6">
          <form onSubmit={handleTrackSubmit} className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
              Enter Grievance Docket ID:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={trackingIdInput}
                onChange={e => setTrackingIdInput(e.target.value)}
                placeholder="e.g. REP-JBP-8492"
                className="flex-1 px-4 py-2.5 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] font-mono uppercase text-sm text-[#0B2545] focus:ring-2 focus:ring-[#0B2545]"
              />
              <button
                type="submit"
                disabled={isTrackSearching}
                className="px-5 py-2.5 bg-[#0B2545] text-white text-xs font-bold rounded-lg hover:bg-[#13315C]"
              >
                {isTrackSearching ? 'Checking...' : 'Check Status'}
              </button>
            </div>
          </form>

          {trackError && (
            <div className="p-4 bg-[#FEF2F2] rounded-lg border border-[#FECACA] text-[#991B1B] text-xs">
              No docket found with ID “{trackingIdInput}”. Try sample dockets:{' '}
              <button
                type="button"
                onClick={() => {
                  setTrackingIdInput('REP-JBP-8492');
                  trackComplaint('REP-JBP-8492').then(r => {
                    setTrackedReport(r);
                    setTrackError(!r);
                  });
                }}
                className="underline font-bold font-mono mr-2"
              >
                REP-JBP-8492
              </button>
              <button
                type="button"
                onClick={() => {
                  setTrackingIdInput('REP-JBP-9104');
                  trackComplaint('REP-JBP-9104').then(r => {
                    setTrackedReport(r);
                    setTrackError(!r);
                  });
                }}
                className="underline font-bold font-mono"
              >
                REP-JBP-9104
              </button>
            </div>
          )}

          {trackedReport && (
            <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-6 animate-in fade-in">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#CBD5E1] pb-4">
                <div>
                  <span className="text-[10px] font-bold text-[#B45309] uppercase tracking-wider">
                    GRIEVANCE DOCKET
                  </span>
                  <h3 className="text-lg font-bold text-[#0B2545] font-mono">
                    {trackedReport.reportId}
                  </h3>
                  <p className="text-xs text-[#475569]">
                    Establishment: <strong className="text-[#0B2545]">{trackedReport.businessName}</strong> · {trackedReport.category}
                  </p>
                </div>

                <span className="text-xs font-bold px-3 py-1 rounded-md bg-[#ECFDF5] text-[#14532D] border border-[#86EFAC]">
                  {trackedReport.status}
                </span>
              </div>

              {/* Progress Stepper */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#0B2545]">Resolution Workflow Stage:</span>
                <div className="grid grid-cols-5 gap-1.5 pt-1">
                  {statusWorkflow.map(item => {
                    const currentStep = getActiveStep(trackedReport.status);
                    const isCompleted = currentStep >= item.step;
                    const isCurrent = currentStep === item.step;

                    return (
                      <div key={item.step} className="space-y-1.5">
                        <div
                          className={`h-2 rounded-sm transition-colors ${
                            isCompleted ? 'bg-[#14532D]' : 'bg-[#CBD5E1]'
                          }`}
                        />
                        <span
                          className={`text-[9.5px] sm:text-[10px] block leading-tight font-medium ${
                            isCurrent
                              ? 'text-[#0B2545] font-bold'
                              : isCompleted
                              ? 'text-[#14532D]'
                              : 'text-[#64748B]'
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Finding & Authority Note */}
              <div className="p-4 bg-white rounded-lg border border-[#CBD5E1] space-y-1.5 text-xs">
                <div className="flex flex-wrap items-center justify-between text-[#475569] text-[11px]">
                  <span>Assigned Officer: <strong className="text-[#0B2545]">{trackedReport.authorityAssigned}</strong></span>
                  <span className="tabular-nums">Filed: {trackedReport.dateReported}</span>
                </div>
                <p className="text-[#334155] pt-1">
                  <strong className="text-[#0B2545]">Official Action Log:</strong> {trackedReport.findingNote}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
