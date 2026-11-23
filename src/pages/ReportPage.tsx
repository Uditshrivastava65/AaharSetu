import React, { useState } from 'react';
import {
  Flag,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  UploadCloud,
  FileText,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
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

  // Track Form state
  const [trackingIdInput, setTrackingIdInput] = useState('REP-JBP-8421');
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
        return 2;
      case 'ASSIGNED TO WARD OFFICER':
        return 3;
      case 'FIELD INSPECTION SCHEDULED':
        return 4;
      case 'RESOLVED':
        return 5;
      default:
        return 2;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#D97724] text-xs font-bold uppercase tracking-wider">
          <Flag className="w-3.5 h-3.5" />
          <span>{isHindi ? 'नागरिक संज्ञान एवं निवारण' : 'Citizen Grievance & Reporting'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#163828] tracking-tight">
          {isHindi ? 'खाद्य सुरक्षा संबंधी समस्या दर्ज करें' : 'Report a Food Safety Concern'}
        </h1>
        <p className="text-sm text-[#5C6A62] max-w-lg mx-auto">
          Notice an unhygienic storage issue, pest presence, or expired goods? Report it directly to
          municipal food safety authorities.
        </p>
      </div>

      {/* Mode Switcher: Submit new vs Track existing */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-xl bg-[#EDE6DC] border border-[#D5CBC0]">
          <button
            onClick={() => setActiveMode('submit')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'submit'
                ? 'bg-white text-[#163828] shadow-xs'
                : 'text-[#67746D] hover:text-[#163828]'
            }`}
          >
            {isHindi ? 'नई शिकायत दर्ज करें' : 'Submit Concern'}
          </button>
          <button
            onClick={() => {
              setActiveMode('track');
              handleTrackSubmit({ preventDefault: () => {} } as any);
            }}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'track'
                ? 'bg-white text-[#163828] shadow-xs'
                : 'text-[#67746D] hover:text-[#163828]'
            }`}
          >
            {isHindi ? 'शिकायत की स्थिति ट्रैक करें' : 'Track Existing Report'}
          </button>
        </div>
      </div>

      {/* MODE 1: SUBMIT REPORT */}
      {activeMode === 'submit' && (
        <div className="bg-white rounded-3xl border border-[#E6DFD5] p-6 sm:p-8 shadow-sm space-y-6">
          {submittedReport ? (
            /* Success confirmation */
            <div className="text-center py-6 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-[#EBF7EE] text-[#1B5E20] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-[#163828]">Report Registered Successfully</h3>
              <p className="text-xs text-[#5C6B62] max-w-md mx-auto">
                Your report has been received by the Jabalpur Municipal Food Safety Unit. Keep your
                tracking reference code safe.
              </p>

              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E6DFD5] inline-block font-mono text-sm font-bold text-[#163828]">
                Tracking ID: <span className="text-[#D97724]">{submittedReport.reportId}</span>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setTrackingIdInput(submittedReport.reportId);
                    setActiveMode('track');
                    setTrackedReport(submittedReport);
                  }}
                  className="px-5 py-2.5 bg-[#163828] text-white text-xs font-bold rounded-xl hover:bg-[#1f4a36]"
                >
                  Track Status Now
                </button>
                <button
                  onClick={() => {
                    setSubmittedReport(null);
                    setDescription('');
                  }}
                  className="px-5 py-2.5 border border-[#D5CBC0] text-xs font-bold rounded-xl hover:bg-[#FAF8F5]"
                >
                  Submit Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Important Statutory Disclaimer */}
              <div className="p-4 rounded-xl bg-[#FFFBF5] border border-[#FDE68A] text-xs text-[#92400E] flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                <div>
                  <strong>Official Process Notice:</strong> A citizen report is not an official
                  violation finding. Reports are routed to authorized authorities for preliminary
                  evaluation, verification, and inspection prioritization.
                </div>
              </div>

              {/* Target Business Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#163828]">
                  Select Food Business:
                </label>
                <select
                  value={selectedBusinessId}
                  onChange={e => setSelectedBusinessId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CBC0] bg-[#FAF8F5] text-sm text-[#163828] font-medium focus:ring-2 focus:ring-[#163828]"
                >
                  {businesses.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.locality}, UFBI: {b.ufbi})
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#163828]">
                  Concern Category:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-colors ${
                        category === cat
                          ? 'border-[#163828] bg-[#163828] text-white font-bold'
                          : 'border-[#D5CBC0] bg-[#FAF8F5] text-[#4E5C53] hover:bg-[#EDE6DC]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#163828]">
                  Specific Details & Description:
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe your observation objectively (date, item name, physical condition noticed)..."
                  className="w-full p-3.5 rounded-xl border border-[#D5CBC0] text-sm text-[#163828] focus:ring-2 focus:ring-[#163828] focus:outline-none"
                  required
                />
              </div>

              {/* Photo Evidence Drag-and-drop placeholder */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#163828]">
                  Attach Photographic Evidence (Optional):
                </label>
                <div className="p-6 rounded-2xl border-2 border-dashed border-[#D5CBC0] bg-[#FAF8F5] text-center space-y-2 hover:bg-[#F4ECE3] transition-colors cursor-pointer">
                  <UploadCloud className="w-8 h-8 text-[#79877F] mx-auto" />
                  <div className="text-xs text-[#526057]">
                    <span className="font-bold text-[#163828]">Click to upload</span> or drag and
                    drop photo/bill receipt
                  </div>
                  <span className="text-[10.5px] text-[#86958D] block">
                    PNG, JPG, PDF up to 10MB (Prototype demo)
                  </span>
                </div>
              </div>

              {/* Anonymous Checkbox */}
              <div className="flex items-center gap-3 p-3 bg-[#FAF8F5] rounded-xl border border-[#E6DFD5]">
                <input
                  type="checkbox"
                  id="anonymousCheck"
                  checked={isAnonymous}
                  onChange={e => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 rounded text-[#163828] focus:ring-[#163828]"
                />
                <label htmlFor="anonymousCheck" className="text-xs text-[#4F5E55] cursor-pointer">
                  <strong>Submit Anonymously:</strong> Keep my phone and identity private from the
                  food business and public view.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !description.trim()}
                className="w-full py-3.5 rounded-xl bg-[#163828] text-white text-sm font-bold hover:bg-[#1f4a36] disabled:opacity-40 transition-colors shadow-sm"
              >
                {isSubmitting ? 'Routing to Jabalpur Food Authority...' : 'Submit Citizen Concern'}
              </button>
            </form>
          )}
        </div>
      )}

      {/* MODE 2: TRACK REPORT */}
      {activeMode === 'track' && (
        <div className="bg-white rounded-3xl border border-[#E6DFD5] p-6 sm:p-8 shadow-sm space-y-6">
          <form onSubmit={handleTrackSubmit} className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#163828]">
              Enter Report Tracking ID:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={trackingIdInput}
                onChange={e => setTrackingIdInput(e.target.value)}
                placeholder="e.g. REP-JBP-8421"
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#D5CBC0] font-mono uppercase text-sm text-[#163828] focus:ring-2 focus:ring-[#163828]"
              />
              <button
                type="submit"
                disabled={isTrackSearching}
                className="px-5 py-2.5 bg-[#163828] text-white text-xs font-bold rounded-xl hover:bg-[#1f4a36]"
              >
                {isTrackSearching ? 'Checking...' : 'Check Status'}
              </button>
            </div>
          </form>

          {trackError && (
            <div className="p-4 bg-[#FEF2F2] rounded-xl border border-[#FECACA] text-[#991B1B] text-xs">
              No complaint found with ID "{trackingIdInput}". Try searching demo code:{' '}
              <button
                type="button"
                onClick={() => {
                  setTrackingIdInput('REP-JBP-8421');
                  handleTrackSubmit({ preventDefault: () => {} } as any);
                }}
                className="underline font-bold font-mono"
              >
                REP-JBP-8421
              </button>
            </div>
          )}

          {trackedReport && (
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E6DFD5] space-y-6 animate-in fade-in">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E6DFD5] pb-4">
                <div>
                  <span className="text-[10px] font-bold text-[#D97724] uppercase tracking-wider">
                    COMPLAINT DOSSIER
                  </span>
                  <h3 className="text-lg font-bold text-[#163828] font-mono">
                    {trackedReport.reportId}
                  </h3>
                  <p className="text-xs text-[#627169]">
                    Against: <strong>{trackedReport.businessName}</strong> ({trackedReport.category})
                  </p>
                </div>

                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EBF7EE] text-[#1B5E20] border border-[#C8E6C9]">
                  {trackedReport.status}
                </span>
              </div>

              {/* Progress Stepper */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#163828]">Official Resolution Stage:</span>
                <div className="grid grid-cols-5 gap-1 pt-1">
                  {statusWorkflow.map((item, idx) => {
                    const currentStep = getActiveStep(trackedReport.status);
                    const isCompleted = currentStep >= item.step;
                    const isCurrent = currentStep === item.step;

                    return (
                      <div key={item.step} className="space-y-1.5">
                        <div
                          className={`h-2 rounded-full transition-colors ${
                            isCompleted ? 'bg-[#2D7A4D]' : 'bg-[#E5DDD0]'
                          }`}
                        />
                        <span
                          className={`text-[9px] sm:text-[10px] block leading-tight font-medium ${
                            isCurrent
                              ? 'text-[#163828] font-bold'
                              : isCompleted
                              ? 'text-[#2D7A4D]'
                              : 'text-[#9AA8A0]'
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
              <div className="p-4 bg-white rounded-xl border border-[#E6DFD5] space-y-1 text-xs">
                <div className="flex items-center justify-between text-[#819087] text-[11px]">
                  <span>Authority: {trackedReport.authorityAssigned}</span>
                  <span>Logged: {trackedReport.dateReported}</span>
                </div>
                <p className="text-[#3F4D45] pt-1">
                  <strong>Officer Action Log:</strong> {trackedReport.findingNote}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
