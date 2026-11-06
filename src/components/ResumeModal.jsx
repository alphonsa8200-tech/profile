import React from 'react';
import { X, Download, FileText, CheckCircle2, Mail, ExternalLink, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import Button from './Button';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleDownload = () => {
    // Generates a structured text/document resume summary download for testing and ATS review
    const content = `=================================================================
RESUME — ${personalInfo.name.toUpperCase()}
${personalInfo.title} | ${personalInfo.location}
Status: ${personalInfo.statusBadge}
=================================================================

TAGLINE:
${personalInfo.tagline}

CAREER OBJECTIVE:
${personalInfo.careerObjective}

ABOUT ME:
${personalInfo.aboutMe.lead}
${personalInfo.aboutMe.body}

CORE STRENGTHS:
${personalInfo.strengths.map(s => `- ${s.title}: ${s.description}`).join('\n')}

TECHNICAL INTERESTS:
${personalInfo.interests.map(i => `- ${i}`).join('\n')}

CONTACT & PROFILES:
- Email: ${personalInfo.socials.email.address}
- GitHub: ${personalInfo.socials.github.url} (${personalInfo.socials.github.placeholder})
- LinkedIn: ${personalInfo.socials.linkedin.url} (${personalInfo.socials.linkedin.placeholder})

=================================================================
Note: This is a generated candidate profile resume. 
Replace with official PDF at: src/assets/documents/Alphonsa_Jaison_Resume.pdf
=================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Resume_${personalInfo.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-border p-6 sm:p-8 z-10 my-8 overflow-hidden">
        
        {/* Accent top gradient */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-accent via-indigo-400 to-blue-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-primary-muted hover:text-primary hover:bg-neutral-100 transition-colors"
          aria-label="Close resume preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Verified Profile Document
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-primary">
              {personalInfo.name} — Resume Profile
            </h3>
            <p className="text-sm text-primary-muted">
              {personalInfo.title} • {personalInfo.location}
            </p>
          </div>
        </div>

        {/* Informative Banner */}
        <div className="p-4 rounded-2xl bg-[#F3F5F7] border border-border/70 mb-6 text-xs text-primary-muted leading-relaxed">
          <p className="font-semibold text-primary mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Resume Placement Note
          </p>
          To attach your finalized official PDF document, place your file at <code className="bg-white px-1.5 py-0.5 rounded border border-border font-mono text-[11px] text-accent">src/assets/documents/Alphonsa_Jaison_Resume.pdf</code> or link your Google Drive / Cloud URL in <code className="bg-white px-1.5 py-0.5 rounded border border-border font-mono text-[11px] text-accent">src/data/portfolio.js</code>.
        </div>

        {/* Key Highlights */}
        <div className="space-y-4 mb-8">
          <div>
            <h4 className="text-xs font-bold text-primary tracking-wider uppercase mb-2">
              Career Objective
            </h4>
            <p className="text-sm text-primary-muted bg-white border border-border p-3.5 rounded-xl">
              "{personalInfo.careerObjective}"
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-primary tracking-wider uppercase mb-2">
              Core Strengths
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {personalInfo.strengths.map((str) => (
                <div key={str.id} className="flex items-center gap-2 text-xs text-primary bg-neutral-50 px-3 py-2 rounded-xl border border-border/50">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                  <span className="font-medium">{str.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="md"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Close
          </Button>

          <Button
            variant="primary"
            size="md"
            icon={Download}
            onClick={handleDownload}
            className="w-full sm:w-auto"
          >
            Download Candidate Summary
          </Button>
        </div>

      </div>
    </div>
  );
}

