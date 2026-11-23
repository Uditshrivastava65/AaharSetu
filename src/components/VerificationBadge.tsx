import React from 'react';
import { CheckCircle2, AlertCircle, Clock, HelpCircle, MinusCircle } from 'lucide-react';
import { VerificationStatusType } from '../types';

interface VerificationBadgeProps {
  status: VerificationStatusType;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  status,
  size = 'md',
  showLabel = true,
  className = '',
}) => {
  const configs = {
    VERIFIED: {
      bg: 'bg-[#ECFDF5]',
      text: 'text-[#14532D]',
      border: 'border-[#86EFAC]',
      icon: CheckCircle2,
      label: 'Verified',
      hindiLabel: 'सत्यापित',
    },
    CONDITIONAL: {
      bg: 'bg-[#FFFBEB]',
      text: 'text-[#92400E]',
      border: 'border-[#FCD34D]',
      icon: AlertCircle,
      label: 'Conditional',
      hindiLabel: 'सशर्त स्वीकृत',
    },
    PENDING: {
      bg: 'bg-[#F1F5F9]',
      text: 'text-[#334155]',
      border: 'border-[#CBD5E1]',
      icon: Clock,
      label: 'Under Review',
      hindiLabel: 'सत्यापनाधीन',
    },
    'NOT AVAILABLE': {
      bg: 'bg-[#F8FAFC]',
      text: 'text-[#475569]',
      border: 'border-[#CBD5E1]',
      icon: HelpCircle,
      label: 'Info Unavailable',
      hindiLabel: 'जानकारी उपलब्ध नहीं',
    },
    'NOT APPLICABLE': {
      bg: 'bg-[#F8FAFC]',
      text: 'text-[#64748B]',
      border: 'border-[#E2E8F0]',
      icon: MinusCircle,
      label: 'Not Applicable',
      hindiLabel: 'लागू नहीं',
    },
  };

  const current = configs[status] || configs.PENDING;
  const IconComponent = current.icon;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-semibold',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-3 py-1.5 gap-2 font-bold',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border whitespace-nowrap shrink-0 transition-colors ${current.bg} ${current.text} ${current.border} ${sizeClasses[size]} ${className}`}
      title={`Official Status: ${current.label}`}
    >
      <IconComponent className={`${iconSizes[size]} shrink-0`} />
      {showLabel && <span>{current.label}</span>}
    </span>
  );
};
