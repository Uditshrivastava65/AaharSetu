import React from 'react';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { Business } from '../types';

interface FssaiComplianceBadgeProps {
  business: Business;
  size?: 'sm' | 'md';
  isHindi?: boolean;
  className?: string;
}

export const FssaiComplianceBadge: React.FC<FssaiComplianceBadgeProps> = ({
  business,
  size = 'sm',
  isHindi = false,
  className = '',
}) => {
  const fssaiNumber = business.registrations?.fssaiNumber || '';
  const hasActiveLicence =
    Boolean(fssaiNumber) && !fssaiNumber.toUpperCase().startsWith('PENDING');
  const registrationStatus = business.pillars?.applicableRegistration?.status;

  const isCompliant =
    business.officialStatus === 'VERIFIED' &&
    registrationStatus === 'VERIFIED' &&
    hasActiveLicence;

  const isConditional =
    !isCompliant &&
    (business.officialStatus === 'CONDITIONAL' || registrationStatus === 'CONDITIONAL');

  const config = isCompliant
    ? {
        bg: 'bg-[#ECFDF5]',
        text: 'text-[#14532D]',
        border: 'border-[#86EFAC]',
        icon: CheckCircle2,
        label: isHindi ? 'FSSAI सत्यापित' : 'FSSAI Verified',
        statusAttr: 'verified',
      }
    : isConditional
    ? {
        bg: 'bg-[#FFFBEB]',
        text: 'text-[#92400E]',
        border: 'border-[#FCD34D]',
        icon: AlertCircle,
        label: isHindi ? 'FSSAI सशर्त' : 'FSSAI Conditional',
        statusAttr: 'conditional',
      }
    : {
        bg: 'bg-[#F1F5F9]',
        text: 'text-[#334155]',
        border: 'border-[#CBD5E1]',
        icon: Clock,
        label: isHindi ? 'FSSAI समीक्षाधीन' : 'FSSAI Pending',
        statusAttr: 'pending',
      };

  const Icon = config.icon;

  const sizeClasses =
    size === 'md'
      ? 'text-xs px-2.5 py-1 gap-1.5 font-bold'
      : 'text-[10.5px] px-2 py-0.5 gap-1 font-bold';

  const iconSize = size === 'md' ? 'w-3.5 h-3.5' : 'w-3 h-3';

  const tooltip = [
    config.label,
    fssaiNumber ? `Licence: ${fssaiNumber}` : null,
    business.registrations?.fssaiValidity || null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <span
      data-fssai-status={config.statusAttr}
      title={tooltip}
      className={`inline-flex items-center rounded-md border whitespace-nowrap shrink-0 ${config.bg} ${config.text} ${config.border} ${sizeClasses} ${className}`}
    >
      <Icon className={`${iconSize} shrink-0`} aria-hidden="true" />
      <span>{config.label}</span>
    </span>
  );
};
