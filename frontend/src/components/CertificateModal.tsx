import React from 'react';
import { X, Award, CheckCircle2, Printer, Copy, ShieldCheck } from 'lucide-react';
import type { Certificate } from '../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: Certificate;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  certificate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-8 border border-slate-100 animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Printable Area */}
        <div className="border-8 border-double border-slate-200 rounded-2xl p-8 sm:p-12 text-center bg-gradient-to-b from-amber-50/30 via-white to-blue-50/20 relative overflow-hidden shadow-inner">
          {/* Watermark / Brand Header */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-wider text-slate-900 uppercase">
              SHEK's<span className="text-blue-600">LMS</span>
            </span>
          </div>

          <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">
            Certificate of Achievement
          </p>
          <p className="text-xs text-slate-500 mb-6">This document formally certifies that</p>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight mb-4">
            {certificate.recipientName}
          </h2>

          <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed mb-4">
            has successfully fulfilled all curriculum requirements, continuous assessments, and practical compliance examinations for
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-blue-900 max-w-xl mx-auto mb-6">
            {certificate.courseTitle}
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-xs text-slate-600 pt-6 border-t border-slate-200">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Issued By</p>
              <p className="font-semibold text-slate-800">{certificate.organizationName}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Issue Date</p>
              <p className="font-semibold text-slate-800">{certificate.issuedDate}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Assessment Score</p>
              <p className="font-semibold text-emerald-600">{certificate.grade}% Pass</p>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between text-left text-[11px] text-slate-500 bg-white/70 p-3 rounded-xl border border-slate-200/60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>
                Credential Code: <strong className="font-mono text-slate-800">{certificate.certificateCode}</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold mt-2 sm:mt-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Cryptographically Verified</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            Official verifiable enterprise certificate issued on SHEK'sLMS Platform.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(certificate.certificateCode);
                alert(`Copied certificate code: ${certificate.certificateCode}`);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Credential Code</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
