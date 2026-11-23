import React, { useEffect } from 'react';
import { X, Download, ExternalLink, FileText, ShieldCheck } from 'lucide-react';
import type { ProjectDocument } from '../data/projectDocuments';

interface DocumentViewerModalProps {
  doc: ProjectDocument | null;
  onClose: () => void;
  isHindi: boolean;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  doc,
  onClose,
  isHindi,
}) => {
  useEffect(() => {
    if (!doc) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [doc, onClose]);

  if (!doc) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#071A33]/80 backdrop-blur-xs p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="doc-viewer-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl bg-[#F8FAFC] rounded-xl border border-[#CBD5E1] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sovereign Navy Header */}
        <div className="bg-[#0B2545] text-white px-4 sm:px-6 py-4 border-b border-[#1E3A5F] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[#13315C] border border-[#1E3A5F] flex items-center justify-center shrink-0 mt-0.5">
              <FileText className="w-4 h-4 text-[#FBBF24]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FBBF24]">
                  {doc.tag}
                </span>
                <span className="text-[10px] text-[#94A3B8]">·</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#34D399]">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{isHindi ? 'आधिकारिक परियोजना दस्तावेज़' : 'Official Project Dossier'}</span>
                </span>
              </div>
              <h3
                id="doc-viewer-title"
                className="text-base sm:text-lg font-serif font-bold text-white truncate"
              >
                {isHindi ? doc.titleHi : doc.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={doc.url}
              download={doc.filename}
              className="px-3 py-1.5 rounded-lg bg-[#13315C] hover:bg-[#1E3A5F] border border-[#334155] text-xs font-semibold text-white inline-flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#FBBF24]" />
              <span>{isHindi ? 'डाउनलोड' : 'Download'}</span>
            </a>
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#B45309] hover:bg-[#92400E] text-xs font-semibold text-white inline-flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{isHindi ? 'नए टैब में खोलें' : 'Open PDF'}</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label={isHindi ? 'बंद करें' : 'Close document viewer'}
              className="p-1.5 rounded-lg bg-[#13315C] hover:bg-[#1E3A5F] text-[#CBD5E1] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="flex-1 bg-[#E2E8F0] p-2 sm:p-4 overflow-hidden flex flex-col">
          <iframe
            src={`${doc.url}#view=FitH`}
            title={doc.title}
            className="w-full h-[65vh] sm:h-[70vh] rounded-lg border border-[#CBD5E1] bg-white"
          />
        </div>

        {/* Bottom Helpful Fallback Footer */}
        <div className="px-4 sm:px-6 py-3 bg-white border-t border-[#CBD5E1] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#475569]">
          <span>
            {isHindi
              ? 'यदि आपके ब्राउज़र में इनलाइन PDF नहीं दिख रही है, तो ऊपर दिए गए "डाउनलोड" या "नए टैब में खोलें" बटन का उपयोग करें।'
              : 'If inline PDF preview is restricted in your browser, use “Open PDF” or “Download” above.'}
          </span>
          <span className="font-mono text-[11px] text-[#0B2545] font-semibold">
            {doc.filename} · {doc.pages} {isHindi ? 'पृष्ठ' : 'pages'}
          </span>
        </div>
      </div>
    </div>
  );
};
