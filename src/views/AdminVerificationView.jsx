import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, Eye, AlertCircle, Phone, Mail, User, Calendar, MapPin, ArrowLeft, KeyRound, ExternalLink, QrCode } from 'lucide-react';

export default function AdminVerificationView({ 
  claims, 
  onApproveClaim, 
  onRejectClaim, 
  setActiveTab 
}) {
  const [selectedProofModal, setSelectedProofModal] = useState(null);
  const [rejectingClaimId, setRejectingClaimId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredClaims = claims.filter(c => {
    if (statusFilter === 'ALL') return true;
    return c.status === statusFilter;
  });

  const handleConfirmReject = (claimId) => {
    onRejectClaim(claimId, rejectionReason || 'Proof of ownership provided was inconclusive or did not match the item.');
    setRejectingClaimId(null);
    setRejectionReason('');
  };

  return (
    <div className="space-y-8 py-6 sm:py-8 max-w-7xl mx-auto px-4">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <button
            onClick={() => setActiveTab('home')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-brand transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-extrabold uppercase tracking-wider bg-brand-50 text-brand px-3 py-1 rounded-full border border-brand/20">
              Layout 5 — Admin Claim Verification Portal
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1939] tracking-tight">
            Claim Verification & Audit Console
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Review ownership claims privately, examine submitted proof, approve valid requests, and facilitate secure item returns.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-200">
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === st 
                  ? 'bg-brand text-white shadow-xs' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {st} ({st === 'ALL' ? claims.length : claims.filter(c => c.status === st).length})
            </button>
          ))}
        </div>
      </div>

      {/* Claims List Grid */}
      <div className="space-y-6">
        {filteredClaims.map((claim) => {
          const isPending = claim.status === 'PENDING';
          const isApproved = claim.status === 'APPROVED';
          const isRejected = claim.status === 'REJECTED';

          return (
            <div 
              key={claim.id}
              className={`bg-white rounded-3xl border transition-all p-6 sm:p-8 space-y-6 shadow-sm ${
                isApproved 
                  ? 'border-emerald-200 ring-2 ring-emerald-500/10' 
                  : isRejected 
                  ? 'border-red-200 bg-red-50/20' 
                  : 'border-surface-border'
              }`}
            >
              {/* Claim Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-extrabold text-brand bg-brand-50 px-3 py-1 rounded-lg">
                    {claim.id}
                  </span>
                  <span className="text-xs text-gray-500">
                    Target Item Ref: <strong className="text-gray-800">{claim.itemId}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${
                    isApproved 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : isRejected 
                      ? 'bg-red-100 text-red-800 border border-red-200' 
                      : 'bg-amber-100 text-amber-900 border border-amber-200 animate-pulse'
                  }`}>
                    {claim.status}
                  </span>
                </div>
              </div>

              {/* Two Column Audit Panel: Item Details vs Claimant Information */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. Item Details (4 Cols) */}
                <div className="lg:col-span-4 space-y-3 bg-gray-50/70 p-4 rounded-2xl border border-gray-100">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
                    Found Item in Custody
                  </h4>

                  <div className="flex items-center gap-3">
                    <img 
                      src={claim.itemImage} 
                      alt={claim.itemName}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-gray-200"
                    />
                    <div>
                      <h5 className="font-bold text-sm text-[#1C1939] leading-snug">{claim.itemName}</h5>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-brand" />
                        <span className="truncate">{claim.itemLocation}</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-gray-600 border-t border-gray-200/60 space-y-1">
                    <p className="font-semibold text-gray-800">Founder Contact Record:</p>
                    <p>{claim.founderContact?.name} • {claim.founderContact?.phone}</p>
                    <p className="text-gray-500">{claim.founderContact?.email}</p>
                  </div>
                </div>

                {/* 2. Claimant's Information & Narrative (5 Cols) */}
                <div className="lg:col-span-5 space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
                    Claimant's Submission & Narrative
                  </h4>

                  <div className="bg-brand-50/40 p-4 rounded-2xl border border-brand/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-[#1C1939] flex items-center gap-1.5">
                        <User className="w-4 h-4 text-brand" />
                        {claim.claimantName}
                      </span>
                      <span className="text-[11px] text-gray-500">Submitted: {new Date(claim.submittedAt).toLocaleDateString()}</span>
                    </div>

                    <div className="text-xs text-gray-600 space-y-1">
                      <p className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        <span>{claim.claimantPhone}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        <span>{claim.claimantEmail}</span>
                      </p>
                    </div>
                  </div>

                  {/* Ownership Story */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      Why Item Belongs to Them:
                    </span>
                    <p className="text-xs text-gray-800 bg-white p-3 rounded-xl border border-gray-200 mt-1 leading-relaxed">
                      "{claim.ownershipStory}"
                    </p>
                  </div>

                  {claim.serialNumber && (
                    <div className="text-xs">
                      <span className="font-bold text-gray-500">Submitted Serial/IMEI:</span>{' '}
                      <span className="font-mono font-bold text-brand bg-brand-50 px-2 py-0.5 rounded border border-brand/20">
                        {claim.serialNumber}
                      </span>
                    </div>
                  )}
                </div>

                {/* 3. Review Proof Documents Privately (3 Cols) */}
                <div className="lg:col-span-3 space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
                    Uploaded Proof of Ownership
                  </h4>

                  {claim.proofDocuments && claim.proofDocuments.length > 0 ? (
                    <div className="space-y-2">
                      {claim.proofDocuments.map((doc, idx) => (
                        <div key={idx} className="relative group rounded-2xl overflow-hidden border border-gray-200 aspect-[4/3] bg-gray-100">
                          <img 
                            src={doc} 
                            alt={`Proof ${idx + 1}`} 
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => setSelectedProofModal(doc)}
                            className="absolute inset-0 bg-black/50 text-white flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Inspect Proof</span>
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => setSelectedProofModal(claim.proofDocuments[0])}
                        className="w-full py-2 text-xs font-bold text-brand bg-brand-50 rounded-xl hover:bg-brand-100 transition-colors flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Review Proof Privately</span>
                      </button>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center text-xs text-gray-400">
                      No document proof uploaded. Evaluated via descriptive markings.
                    </div>
                  )}
                </div>

              </div>

              {/* Status Specific Action / Notification Banner */}
              {isApproved && (
                <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-xs space-y-3">
                  <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Claim Approved & Return Authorized</span>
                  </div>
                  <p className="text-emerald-800 leading-relaxed">
                    The claimant has been notified via email and SMS. The necessary contact details have been unlocked below to arrange safe retrieval:
                  </p>
                  
                  {/* Shared Contact Box for Arrange Return */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="bg-white p-3 rounded-xl border border-emerald-200">
                      <span className="font-bold text-gray-800 block mb-1">Founder Contact (To return item):</span>
                      <p className="text-gray-700">{claim.founderContact?.name}</p>
                      <p className="text-brand font-semibold">{claim.founderContact?.phone}</p>
                      <p className="text-gray-500">{claim.founderContact?.email}</p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-emerald-200">
                      <span className="font-bold text-gray-800 block mb-1">Claimant Contact (Owner):</span>
                      <p className="text-gray-700">{claim.claimantName}</p>
                      <p className="text-brand font-semibold">{claim.claimantPhone}</p>
                      <p className="text-gray-500">{claim.claimantEmail}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-900 bg-white/60 p-2.5 rounded-lg border border-emerald-100">
                    <QrCode className="w-4 h-4 text-emerald-700" />
                    <span>Return Token Generated: <strong>RTK-VERIFIED-{claim.id}</strong>. Both parties should present this code during handover.</span>
                  </div>
                </div>
              )}

              {isRejected && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-2xl text-xs text-red-900 space-y-1">
                  <div className="flex items-center gap-2 font-bold">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span>Claim Rejected</span>
                  </div>
                  <p>Reason: {claim.adminNotes || 'Evidence was insufficient to prove legal possession.'}</p>
                  <p className="text-gray-500 text-[11px]">Notice was automatically sent to {claim.claimantEmail}.</p>
                </div>
              )}

              {/* Action Buttons for Pending Claims (Approve & Reject) */}
              {isPending && (
                <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-gray-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-brand" />
                    <span>Approval releases return instructions & contacts safely.</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setRejectingClaimId(claim.id)}
                      className="px-5 py-2.5 rounded-xl border border-red-300 text-red-600 font-bold text-xs hover:bg-red-50 transition-colors"
                    >
                      Reject Claim
                    </button>

                    <button
                      onClick={() => onApproveClaim(claim.id)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-sm transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve Claim</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Rejection Modal / Prompt */}
              {rejectingClaimId === claim.id && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mt-3 space-y-3">
                  <h5 className="font-bold text-xs text-red-900">Provide Rejection Reason:</h5>
                  <input
                    type="text"
                    placeholder="e.g. Serial number did not match / insufficient proof of ownership"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-red-200 bg-white"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setRejectingClaimId(null)}
                      className="px-3 py-1.5 text-xs text-gray-600 hover:underline"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleConfirmReject(claim.id)}
                      className="px-4 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700"
                    >
                      Confirm Rejection
                    </button>
                  </div>
                </div>
              )}

            </div>
          );
        })}

        {filteredClaims.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800">No claims under this status</h3>
            <p className="text-xs text-gray-500">All submissions are up to date.</p>
          </div>
        )}
      </div>

      {/* Private Proof Inspection Modal */}
      {selectedProofModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <span className="font-bold text-sm text-gray-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand" />
                Private Proof Document Inspector
              </span>
              <button
                onClick={() => setSelectedProofModal(null)}
                className="text-xs font-bold text-gray-500 hover:text-gray-900 bg-gray-100 px-3 py-1 rounded-lg"
              >
                Close
              </button>
            </div>
            <div className="p-4 overflow-auto flex-1 flex items-center justify-center bg-gray-950">
              <img 
                src={selectedProofModal} 
                alt="Enlarged Proof" 
                className="max-h-[70vh] object-contain rounded-xl"
              />
            </div>
            <div className="p-3 bg-gray-50 border-t border-gray-100 text-center text-xs text-gray-500">
              Confidential — Document accessed under institutional privacy audit regulations.
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

