import React, { useState } from 'react';
import {
  Store,
  CheckCircle2,
  QrCode,
  ArrowRight,
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

  const [formData, setFormData] = useState({
    name: '',
    category: 'Restaurants' as Business['category'],
    locality: 'Civil Lines',
    fullAddress: '',
    fssaiNumber: '',
    fssaiType: 'State License',
    contactPhone: '',
    cleanWater: true,
    pestControl: true,
    oilManagement: true,
    staffHygiene: true,
  });

  const categories: Business['category'][] = [
    'Restaurants',
    'Cafés',
    'Traditional / Thali',
    'Bakeries',
    'Sweet Shops',
    'Dhabas',
    'Street Food / Chaat',
    'Cloud Kitchens',
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
    'Cantt',
    'Tilhari',
    'Gwarighat',
    'Adhartal',
    'Ranjhi',
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
      {/* Header Banner */}
      <div className="bg-[#0B2545] text-white rounded-xl p-6 sm:p-8 border border-[#1E3A5F] shadow-md gov-grid-pattern text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#071A33] border border-[#1E3A5F] text-[#FBBF24] text-xs font-bold uppercase tracking-wider">
          <Store className="w-3.5 h-3.5" />
          <span>{isHindi ? 'प्रतिष्ठान पंजीकरण पोर्टल' : 'UFBI Establishment Onboarding'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          {isHindi ? 'AaharSetu से जुड़ें' : 'Register Your Food Establishment'}
        </h1>
        <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-lg mx-auto">
          Obtain a persistent Universal Food Business ID (UFBI), link statutory FSSAI licences, and
          generate your counter QR verification plaque.
        </p>
      </div>

      {/* Stepper Header */}
      <div className="bg-[#F8FAFC] rounded-xl border border-[#CBD5E1] p-4 shadow-xs">
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          {[
            { step: 1, label: '1. Identity' },
            { step: 2, label: '2. Licences' },
            { step: 3, label: '3. Pledge' },
            { step: 4, label: '4. UFBI Issued' },
          ].map(item => (
            <div
              key={item.step}
              className={`space-y-1.5 ${
                currentStep >= item.step ? 'text-[#0B2545] font-bold' : 'text-[#64748B]'
              }`}
            >
              <div
                className={`h-1.5 rounded-sm ${
                  currentStep >= item.step ? 'bg-[#0B2545]' : 'bg-[#CBD5E1]'
                }`}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: BASIC DETAILS */}
      {currentStep === 1 && (
        <div className="bg-white rounded-xl border border-[#CBD5E1] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-serif font-bold text-[#0B2545]">Step 1: Establishment Details</h3>
            <p className="text-xs text-[#475569]">
              Core premise details for your Universal Food Business Identity record.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                Establishment Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Narmada Heritage Sweets & Café"
                className="w-full px-4 py-2.5 rounded-lg border border-[#CBD5E1] text-sm text-[#0F172A] focus:ring-2 focus:ring-[#0B2545]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                  Food Business Category
                </label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-xs font-semibold text-[#0B2545]"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                  Jabalpur Ward / Locality
                </label>
                <select
                  value={formData.locality}
                  onChange={e => setFormData({ ...formData, locality: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-xs font-semibold text-[#0B2545]"
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
              <label className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                Full Street Address
              </label>
              <input
                type="text"
                value={formData.fullAddress}
                onChange={e => setFormData({ ...formData, fullAddress: e.target.value })}
                placeholder="Shop No., Landmark, Street Name, Jabalpur"
                className="w-full px-4 py-2.5 rounded-lg border border-[#CBD5E1] text-sm text-[#0F172A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                Public Contact Phone
              </label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={e => setFormData({ ...formData, contactPhone: e.target.value })}
                placeholder="+91 761 240XXXX"
                className="w-full px-4 py-2.5 rounded-lg border border-[#CBD5E1] text-sm text-[#0F172A]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              disabled={!formData.name.trim()}
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#13315C] disabled:opacity-40 transition-colors flex items-center gap-2"
            >
              <span>Continue to Licences</span>
              <ArrowRight className="w-4 h-4 text-[#FBBF24]" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: REGISTRATION & FSSAI */}
      {currentStep === 2 && (
        <div className="bg-white rounded-xl border border-[#CBD5E1] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-serif font-bold text-[#0B2545]">Step 2: Statutory Licences</h3>
            <p className="text-xs text-[#475569]">
              Link your FSSAI and municipal registration details for verification desk review.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                FSSAI License / Registration Number
              </label>
              <input
                type="text"
                value={formData.fssaiNumber}
                onChange={e => setFormData({ ...formData, fssaiNumber: e.target.value })}
                placeholder="14-digit FSSAI Number (e.g. 11424850000XXX)"
                className="w-full px-4 py-2.5 rounded-lg border border-[#CBD5E1] font-mono text-sm text-[#0B2545] focus:ring-2 focus:ring-[#0B2545]"
              />
              <span className="text-[10.5px] text-[#64748B] block">
                If registration is pending, enter your FoSCoS application reference.
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                Registration Category
              </label>
              <select
                value={formData.fssaiType}
                onChange={e => setFormData({ ...formData, fssaiType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-xs font-semibold text-[#0B2545]"
              >
                <option value="State License">State License (Turnover ₹12L – ₹20Cr)</option>
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
              className="px-5 py-2.5 rounded-lg border border-[#CBD5E1] bg-white text-xs font-bold text-[#0B2545] hover:bg-[#F8FAFC]"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#13315C] flex items-center gap-2"
            >
              <span>Continue to Hygiene Pledge</span>
              <ArrowRight className="w-4 h-4 text-[#FBBF24]" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: CLEAN KITCHEN PLEDGE */}
      {currentStep === 3 && (
        <div className="bg-white rounded-xl border border-[#CBD5E1] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-serif font-bold text-[#0B2545]">
              Step 3: Clean Kitchen Self-Audit Pledge
            </h3>
            <p className="text-xs text-[#475569]">
              Confirm adherence to baseline Schedule 4 sanitary requirements prior to field verification.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                key: 'cleanWater',
                title: 'Potable Water Compliance:',
                desc: 'We use tested potable water for cooking, ice, and consumer drinking.',
              },
              {
                key: 'pestControl',
                title: 'Pest Management:',
                desc: 'Scheduled pest control logs and sealed dry-ingredient storage.',
              },
              {
                key: 'oilManagement',
                title: 'Safe Cooking Oil Limits:',
                desc: 'Zero repeated frying beyond Total Polar Compounds (TPC < 25%) threshold.',
              },
              {
                key: 'staffHygiene',
                title: 'Food Handler Sanitation:',
                desc: 'Hairnets, aprons, clean gloves, and medical fitness records maintained.',
              },
            ].map(item => (
              <label
                key={item.key}
                className="flex items-start gap-3 p-3.5 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={(formData as any)[item.key]}
                  onChange={e => setFormData({ ...formData, [item.key]: e.target.checked })}
                  className="w-4 h-4 rounded text-[#0B2545] mt-0.5"
                />
                <div className="text-xs">
                  <strong className="text-[#0B2545] block">{item.title}</strong>
                  <span className="text-[#475569]">{item.desc}</span>
                </div>
              </label>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 rounded-lg border border-[#CBD5E1] bg-white text-xs font-bold text-[#0B2545]"
            >
              Back
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleFinalSubmit}
              className="px-6 py-2.5 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#13315C] disabled:opacity-50 flex items-center gap-2 shadow-xs"
            >
              <span>{isSubmitting ? 'Issuing UFBI...' : 'Generate Universal Food ID'}</span>
              <ArrowRight className="w-4 h-4 text-[#FBBF24]" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: UNIVERSAL ID GENERATION & ROADMAP */}
      {currentStep === 4 && createdBusiness && (
        <div className="bg-white rounded-xl border border-[#CBD5E1] p-6 sm:p-8 shadow-xs space-y-6 text-center animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-[#ECFDF5] border border-[#86EFAC] text-[#14532D] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-[#B45309] uppercase tracking-widest">
              UFBI PROVISIONALLY REGISTERED
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#0B2545]">{createdBusiness.name}</h3>
            <p className="text-xs text-[#475569]">
              Your Universal Food Business ID is now recorded in the Jabalpur Public Registry.
            </p>
          </div>

          {/* Generated UFBI Badge & QR Preview */}
          <div className="p-6 bg-[#F8FAFC] rounded-xl border border-[#CBD5E1] max-w-sm mx-auto space-y-4">
            <div className="font-mono text-sm font-bold text-white bg-[#0B2545] py-2 px-4 rounded-lg">
              UFBI: <span className="text-[#FBBF24]">{createdBusiness.ufbi}</span>
            </div>

            <div className="w-36 h-36 bg-white rounded-xl mx-auto p-2 border border-[#CBD5E1] flex items-center justify-center shadow-xs">
              <QrCode className="w-full h-full text-[#0B2545]" />
            </div>

            <span className="text-[11px] text-[#475569] block">
              Provisional QR code ready for counter verification plaque.
            </span>
          </div>

          {/* Next Steps Roadmap */}
          <div className="text-left bg-[#EEF2F6] rounded-xl p-5 border border-[#CBD5E1] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
              Verification Roadmap & Statutory Sign-Off:
            </h4>
            <div className="space-y-2 text-xs text-[#334155]">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-[#0B2545] text-[#FBBF24] flex items-center justify-center text-[10px] shrink-0 font-bold">
                  1
                </span>
                <span>
                  <strong className="text-[#0B2545]">Document Validation:</strong> Ward FSO desk verifies FSSAI &
                  municipal trade permit validity (1–2 working days).
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-[#0B2545] text-[#FBBF24] flex items-center justify-center text-[10px] shrink-0 font-bold">
                  2
                </span>
                <span>
                  <strong className="text-[#0B2545]">Premises Walkthrough:</strong> Inspector verifies kitchen
                  sanitation, potable water, and issues official hygiene grade.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-[#0B2545] text-[#FBBF24] flex items-center justify-center text-[10px] shrink-0 font-bold">
                  3
                </span>
                <span>
                  <strong className="text-[#0B2545]">Counter Plaque Dispatch:</strong> Physical AaharSetu
                  display stand authorised for public entrance.
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSuccess(createdBusiness)}
            className="px-8 py-3 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#13315C] transition-colors shadow-xs"
          >
            Open Registered Establishment Dossier
          </button>
        </div>
      )}
    </div>
  );
};
