import React, { useState } from 'react';
import {
  Store,
  CheckCircle2,
  QrCode,
  Shield,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  FileCheck,
  Building,
  Check,
} from 'lucide-react';
import { Business } from '../types';
import { onboardBusiness } from '../services/api';

interface OnboardPageProps {
  onSuccess: (newBusiness: Business) => void;
  isHindi: boolean;
}

export const OnboardPage: React.FC<OnboardPageProps> = ({ onSuccess, isHindi }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBusiness, setCreatedBusiness] = useState<Business | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    category: 'Restaurant' as Business['category'],
    locality: 'Civil Lines',
    fullAddress: '',
    fssaiNumber: '',
    fssaiType: 'State License',
    contactPhone: '',
    // Step 3 pledge items
    cleanWater: true,
    pestControl: true,
    oilManagement: true,
    staffHygiene: true,
    foodGradeStorage: true,
  });

  const categories: Business['category'][] = [
    'Restaurant',
    'Café',
    'Bakery',
    'Sweet Shop',
    'Street Food / Chaat',
    'Cloud Kitchen',
    'Traditional / Thali',
    'Fast Food / Snacks',
  ];

  const localities = [
    'Civil Lines',
    'Sadar',
    'Napier Town',
    'Wright Town',
    'Russell Chowk',
    'Ganjipura',
    'Gorakhpur',
    'Madan Mahal',
    'Vijay Nagar',
    'Garha',
  ];

  const handleNextStep = () => {
    if (currentStep === 1 && !formData.name.trim()) return;
    setCurrentStep(prev => prev + 1);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const biz = await onboardBusiness({
        name: formData.name,
        category: formData.category,
        locality: formData.locality,
        fullAddress: formData.fullAddress || `${formData.locality}, Jabalpur`,
        fssaiNumber: formData.fssaiNumber || 'PENDING-REG-2026',
        contactPhone: formData.contactPhone,
      });
      setCreatedBusiness(biz);
      setCurrentStep(4);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#D97724] text-xs font-bold uppercase tracking-wider">
          <Store className="w-3.5 h-3.5" />
          <span>{isHindi ? 'प्रतिष्ठान पंजीकरण' : 'Food Business Onboarding'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#163828] tracking-tight">
          {isHindi ? 'AaharSetu से जुड़ें' : 'Join the Transparency Initiative'}
        </h1>
        <p className="text-sm text-[#5D6B63] max-w-lg mx-auto">
          Get a persistent Universal Food Business ID (UFBI), verify your registrations, and
          receive your official counter QR plaque.
        </p>
      </div>

      {/* Stepper Header */}
      <div className="bg-white rounded-2xl border border-[#E6DFD5] p-4 shadow-xs">
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div
            className={`space-y-1 ${
              currentStep >= 1 ? 'text-[#163828] font-bold' : 'text-[#8E9B93]'
            }`}
          >
            <div
              className={`h-1.5 rounded-full ${
                currentStep >= 1 ? 'bg-[#163828]' : 'bg-[#E5DDD0]'
              }`}
            />
            <span>1. Identity</span>
          </div>
          <div
            className={`space-y-1 ${
              currentStep >= 2 ? 'text-[#163828] font-bold' : 'text-[#8E9B93]'
            }`}
          >
            <div
              className={`h-1.5 rounded-full ${
                currentStep >= 2 ? 'bg-[#163828]' : 'bg-[#E5DDD0]'
              }`}
            />
            <span>2. Licences</span>
          </div>
          <div
            className={`space-y-1 ${
              currentStep >= 3 ? 'text-[#163828] font-bold' : 'text-[#8E9B93]'
            }`}
          >
            <div
              className={`h-1.5 rounded-full ${
                currentStep >= 3 ? 'bg-[#163828]' : 'bg-[#E5DDD0]'
              }`}
            />
            <span>3. Pledge</span>
          </div>
          <div
            className={`space-y-1 ${
              currentStep >= 4 ? 'text-[#163828] font-bold' : 'text-[#8E9B93]'
            }`}
          >
            <div
              className={`h-1.5 rounded-full ${
                currentStep >= 4 ? 'bg-[#163828]' : 'bg-[#E5DDD0]'
              }`}
            />
            <span>4. Universal ID</span>
          </div>
        </div>
      </div>

      {/* STEP 1: BASIC DETAILS */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl border border-[#E6DFD5] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-[#163828]">Step 1: Establishment Details</h3>
            <p className="text-xs text-[#5D6B63]">
              Basic premise information for your Universal Food Business record.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#163828]">
                Establishment Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Narmada Heritage Sweets & Café"
                className="w-full px-4 py-2.5 rounded-xl border border-[#D5CBC0] text-sm text-[#163828] focus:ring-2 focus:ring-[#163828]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#163828]">
                  Food Category
                </label>
                <select
                  value={formData.category}
                  onChange={e =>
                    setFormData({ ...formData, category: e.target.value as any })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CBC0] bg-white text-xs font-semibold text-[#163828]"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#163828]">
                  Jabalpur Locality
                </label>
                <select
                  value={formData.locality}
                  onChange={e => setFormData({ ...formData, locality: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CBC0] bg-white text-xs font-semibold text-[#163828]"
                >
                  {localities.map(l => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#163828]">
                Full Street Address
              </label>
              <input
                type="text"
                value={formData.fullAddress}
                onChange={e => setFormData({ ...formData, fullAddress: e.target.value })}
                placeholder="Shop No., Landmark, Street Name, Jabalpur"
                className="w-full px-4 py-2.5 rounded-xl border border-[#D5CBC0] text-sm text-[#163828]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#163828]">
                Public Contact Phone
              </label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={e => setFormData({ ...formData, contactPhone: e.target.value })}
                placeholder="+91 761 240XXXX"
                className="w-full px-4 py-2.5 rounded-xl border border-[#D5CBC0] text-sm text-[#163828]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              disabled={!formData.name.trim()}
              onClick={handleNextStep}
              className="px-6 py-3 rounded-xl bg-[#163828] text-white text-xs font-bold hover:bg-[#1f4a36] disabled:opacity-40 transition-colors flex items-center gap-2"
            >
              <span>Continue to Licences</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: REGISTRATION & FSSAI */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl border border-[#E6DFD5] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-[#163828]">Step 2: Statutory Licences</h3>
            <p className="text-xs text-[#5D6B63]">
              Submit your existing municipal and food safety registration numbers for validation.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#163828]">
                FSSAI License / Registration Number
              </label>
              <input
                type="text"
                value={formData.fssaiNumber}
                onChange={e => setFormData({ ...formData, fssaiNumber: e.target.value })}
                placeholder="14-digit FSSAI Number (e.g. 11424850000XXX)"
                className="w-full px-4 py-2.5 rounded-xl border border-[#D5CBC0] font-mono text-sm text-[#163828] focus:ring-2 focus:ring-[#163828]"
              />
              <span className="text-[10.5px] text-[#78857E] block">
                If registration is underway, enter your FoSCoS application number.
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#163828]">
                Registration Category
              </label>
              <select
                value={formData.fssaiType}
                onChange={e => setFormData({ ...formData, fssaiType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CBC0] bg-white text-xs font-semibold text-[#163828]"
              >
                <option value="State License">State License (Turnover ₹12L - ₹20Cr)</option>
                <option value="Central License">Central License (Large Scale / Multi-state)</option>
                <option value="Petty FBO Registration">
                  Petty FBO Registration (Turnover &lt; ₹12L)
                </option>
              </select>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 rounded-xl border border-[#D5CBC0] text-xs font-bold text-[#163828]"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-3 rounded-xl bg-[#163828] text-white text-xs font-bold hover:bg-[#1f4a36] flex items-center gap-2"
            >
              <span>Continue to Hygiene Pledge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: CLEAN KITCHEN PLEDGE */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl border border-[#E6DFD5] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-[#163828]">
              Step 3: Clean Kitchen Self-Audit Pledge
            </h3>
            <p className="text-xs text-[#5D6B63]">
              Commit to the fundamental 5 pillars of safe food preparation before on-site inspection.
            </p>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E6DFD5] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.cleanWater}
                onChange={e => setFormData({ ...formData, cleanWater: e.target.checked })}
                className="w-4 h-4 rounded text-[#163828] mt-0.5"
              />
              <div className="text-xs">
                <strong className="text-[#163828] block">Potable Water Testing:</strong>
                <span className="text-[#5B6760]">
                  We use certified potable water for cooking and consumer drinking.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E6DFD5] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.pestControl}
                onChange={e => setFormData({ ...formData, pestControl: e.target.checked })}
                className="w-4 h-4 rounded text-[#163828] mt-0.5"
              />
              <div className="text-xs">
                <strong className="text-[#163828] block">Pest Management:</strong>
                <span className="text-[#5B6760]">
                  Routine contracted pest audits and sealed pantry storage.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E6DFD5] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.oilManagement}
                onChange={e => setFormData({ ...formData, oilManagement: e.target.checked })}
                className="w-4 h-4 rounded text-[#163828] mt-0.5"
              />
              <div className="text-xs">
                <strong className="text-[#163828] block">Safe Oil Cycling:</strong>
                <span className="text-[#5B6760]">
                  No repeated frying beyond prescribed Total Polar Materials (TPM &lt; 25%).
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E6DFD5] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.staffHygiene}
                onChange={e => setFormData({ ...formData, staffHygiene: e.target.checked })}
                className="w-4 h-4 rounded text-[#163828] mt-0.5"
              />
              <div className="text-xs">
                <strong className="text-[#163828] block">Staff Sanitisation:</strong>
                <span className="text-[#5B6760]">
                  Head nets, handwash dispensers, and clean kitchen aprons mandatory.
                </span>
              </div>
            </label>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 rounded-xl border border-[#D5CBC0] text-xs font-bold text-[#163828]"
            >
              Back
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleFinalSubmit}
              className="px-6 py-3 rounded-xl bg-[#163828] text-white text-xs font-bold hover:bg-[#1f4a36] disabled:opacity-50 flex items-center gap-2 shadow-xs"
            >
              <span>{isSubmitting ? 'Generating UFBI...' : 'Generate Universal Food ID'}</span>
              <ArrowRight className="w-4 h-4 text-[#E28738]" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: UNIVERSAL ID GENERATION & ROADMAP */}
      {currentStep === 4 && createdBusiness && (
        <div className="bg-white rounded-3xl border border-[#E6DFD5] p-6 sm:p-8 shadow-sm space-y-6 text-center animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-[#EBF7EE] text-[#1B5E20] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-[#D97724] uppercase tracking-widest">
              ONBOARDING COMPLETE
            </span>
            <h3 className="text-2xl font-black text-[#163828]">{createdBusiness.name}</h3>
            <p className="text-xs text-[#5D6B63]">
              Your Universal Food Business ID has been registered in the Jabalpur pilot registry.
            </p>
          </div>

          {/* Generated UFBI Badge & QR Preview */}
          <div className="p-6 bg-[#FAF8F5] rounded-3xl border border-[#E6DFD5] max-w-sm mx-auto space-y-4">
            <div className="font-mono text-sm font-bold text-[#163828] bg-white py-2 px-4 rounded-xl border border-[#D5CBC0]">
              UFBI: <span className="text-[#D97724]">{createdBusiness.ufbi}</span>
            </div>

            <div className="w-36 h-36 bg-white rounded-2xl mx-auto p-2 border border-[#D5CBC0] flex items-center justify-center shadow-xs">
              <QrCode className="w-full h-full text-[#163828]" />
            </div>

            <span className="text-[11px] text-[#697970] block">
              Official QR code ready for acrylic stand printing.
            </span>
          </div>

          {/* Next Steps Roadmap */}
          <div className="text-left bg-[#FAF8F5] rounded-2xl p-5 border border-[#E6DFD5] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#163828]">
              Verification Roadmap & Next Steps:
            </h4>
            <div className="space-y-2 text-xs text-[#536259]">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#163828] text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                  1
                </span>
                <span>
                  <strong>Document Audit:</strong> FSO desk team checks FSSAI & trade licence
                  validity (1-2 days).
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#163828] text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                  2
                </span>
                <span>
                  <strong>Premises Walkthrough:</strong> Municipal inspector verifies kitchen
                  sanitation and issues official score.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#163828] text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                  3
                </span>
                <span>
                  <strong>Counter Plaque Dispatch:</strong> Official acrylic AaharSetu display board
                  provided for customer entrance.
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSuccess(createdBusiness)}
            className="px-8 py-3.5 rounded-xl bg-[#163828] text-white text-xs font-bold hover:bg-[#1f4a36] transition-colors shadow-sm"
          >
            View Live Business Profile
          </button>
        </div>
      )}
    </div>
  );
};
