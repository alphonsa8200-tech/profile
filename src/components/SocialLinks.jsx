import React, { useState } from 'react';
import { Github, Linkedin, Mail, Check, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

export default function SocialLinks({ className = "", iconSize = "w-4 h-4", showLabels = false }) {
  const [copied, setCopied] = useState(false);
  const { socials } = personalInfo;

  const handleCopyEmail = (e) => {
    e.preventDefault();
    if (socials.email?.address) {
      navigator.clipboard.writeText(socials.email.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* GitHub */}
      <a
        href={socials.github.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub Profile Placeholder"
        className="group relative flex items-center gap-2 p-2.5 rounded-full bg-white border border-border text-primary hover:text-accent hover:border-accent hover:shadow-subtle transition-all duration-200"
        title={`GitHub: ${socials.github.placeholder}`}
      >
        <Github className={iconSize} />
        {showLabels && <span className="text-xs font-medium pr-1">{socials.github.label}</span>}
      </a>

      {/* LinkedIn */}
      <a
        href={socials.linkedin.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn Profile Placeholder"
        className="group relative flex items-center gap-2 p-2.5 rounded-full bg-white border border-border text-primary hover:text-accent hover:border-accent hover:shadow-subtle transition-all duration-200"
        title={`LinkedIn: ${socials.linkedin.placeholder}`}
      >
        <Linkedin className={iconSize} />
        {showLabels && <span className="text-xs font-medium pr-1">{socials.linkedin.label}</span>}
      </a>

      {/* Email Link & Copy */}
      <div className="relative group">
        <a
          href={`mailto:${socials.email.address}`}
          className="flex items-center gap-2 p-2.5 rounded-full bg-white border border-border text-primary hover:text-accent hover:border-accent hover:shadow-subtle transition-all duration-200"
          aria-label="Send Email"
          title={`Email: ${socials.email.placeholder}`}
        >
          {copied ? <Check className={`${iconSize} text-emerald-600`} /> : <Mail className={iconSize} />}
          {showLabels && (
            <span className="text-xs font-medium pr-1">
              {copied ? "Copied!" : socials.email.label}
            </span>
          )}
        </a>
      </div>
    </div>
  );
}

