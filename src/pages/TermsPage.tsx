import React from 'react';
import { ShieldAlert, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Title Banner */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-brand-800 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-300 bg-gold-500/20 px-3 py-1 rounded-full border border-gold-400/30">
            <FileText className="w-3.5 h-3.5 text-gold-400" />
            Legal Terms & Privacy
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Terms of Use & Compliance
          </h1>
          <p className="text-sm text-purple-200/80 leading-relaxed">
            Last Updated: 2026. Please review our laboratory terms of service and research compliance agreements before utilizing this website.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-brand-100 p-8 sm:p-12 shadow-sm space-y-8 text-xs sm:text-sm text-slate-600 leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
            1. Research Use Agreement (Non-Clinical)
          </h3>
          <p>
            All biochemical products, peptide sequences, and reference materials supplied by <strong>Peptide Cart</strong> are manufactured, analyzed, and delivered strictly for <strong>in-vitro laboratory research, chemical testing, and cellular assays</strong>.
          </p>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
            <strong>Mandatory Notice:</strong> Under no circumstance are these items licensed, indicated, or intended for human administration, veterinary use, clinical diagnostics, food additives, cosmetics, or any other unauthorized purpose.
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
            2. Customer Qualifications & Responsibilities
          </h3>
          <p>
            By viewing this catalog or submitting an institutional quote, the purchaser certifies that:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li>They are at least 21 years of age.</li>
            <li>They possess adequate laboratory facilities, safety hoods, and handling protocols to safely store and manage chemical substances.</li>
            <li>They acknowledge full responsibility for adherence to all provincial, federal, and local statutory regulations in their respective jurisdiction.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
            3. Non-Transactional Informational Catalog
          </h3>
          <p>
            This website functions as a structured informational repository and quotation request system. Automated card payment and point-of-sale checkout for scheduled or prescription substances are intentionally not implemented. All orders require explicit legal, institutional, and regulatory verification before commercial fulfillment is authorized.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
            4. Analytical Accuracy & Independent Testing
          </h3>
          <p>
            Certificates of Analysis (COAs) provided on this website represent legitimate third-party testing conducted by HYTE Research Division using HPLC and LC-MS. Peptide Cart guarantees that every distributed batch conforms to the published analytical threshold (≥ 99.0% purity).
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
            5. Privacy Policy & Data Security
          </h3>
          <p>
            We take laboratory privacy seriously. Research inquiries, institutional contact credentials, and communication logs are stored on encrypted servers with SSL 256-bit encryption. We never sell, lease, or monetize customer or researcher data with third-party advertisers.
          </p>
        </section>
      </div>
    </div>
  );
};
