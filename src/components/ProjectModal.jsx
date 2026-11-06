import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Info } from 'lucide-react';
import Button from './Button';

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

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
        
        {/* Header accent strip */}
        <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${project.gradient || 'from-blue-600 to-indigo-700'}`} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-primary-muted hover:text-primary hover:bg-neutral-100 transition-colors"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Meta badge */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent">
            {project.category}
          </span>
          {project.isPlaceholder && (
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Template Placeholder
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-primary mb-2">
          {project.title}
        </h3>
        <p className="text-sm font-medium text-accent mb-6">
          {project.tagline}
        </p>

        {/* Notice for portfolio personalization */}
        {project.isPlaceholder && (
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#F3F5F7] border border-border/80 mb-6 text-xs text-primary-muted leading-relaxed">
            <Info className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-primary">Customization Note: </span>
              To showcase your real project, update this item in <code className="bg-white px-1.5 py-0.5 rounded border border-border font-mono text-[11px] text-accent">src/data/portfolio.js</code> under <code className="text-primary font-mono font-medium">projectsData</code> with your real screenshots, features, GitHub repository, and live demo link.
            </div>
          </div>
        )}

        {/* Project Description */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-primary tracking-wider uppercase mb-2">
            Project Overview
          </h4>
          <p className="text-sm text-primary-muted leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-bold text-primary tracking-wider uppercase mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-accent" />
              Key Features & Architectural Highlights
            </h4>
            <ul className="space-y-2">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-primary-muted">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies Used */}
        <div className="mb-8">
          <h4 className="text-xs font-bold text-primary tracking-wider uppercase mb-2">
            Technologies & Tools
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-lg bg-neutral-100 text-primary font-medium border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {project.githubUrl && (
              <Button
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="sm"
                icon={Github}
                iconPosition="left"
                className="w-full sm:w-auto"
                title={`GitHub: ${project.githubPlaceholder || project.githubUrl}`}
              >
                {project.githubPlaceholder ? "GitHub (Placeholder)" : "View Code"}
              </Button>
            )}

            {project.liveUrl && (
              <Button
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="sm"
                icon={ExternalLink}
                iconPosition="right"
                className="w-full sm:w-auto"
                title={`Live Demo: ${project.livePlaceholder || project.liveUrl}`}
              >
                {project.livePlaceholder ? "Live Demo (Placeholder)" : "Live Preview"}
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            Close
          </Button>
        </div>

      </div>
    </div>
  );
}

