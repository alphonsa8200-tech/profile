import React from 'react';
import { ArrowUp, Heart, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo, navLinks } from '../data/portfolio';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Tagline */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-white font-extrabold text-sm tracking-wider shadow-accent-sm">
                {personalInfo.initials}
              </div>
              <span className="font-bold text-lg text-primary">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-sm text-primary-muted max-w-sm leading-relaxed mb-4">
              {personalInfo.tagline}
            </p>
            <div className="flex items-center gap-2 text-xs text-primary-subtle">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{personalInfo.statusBadge}</span>
              <span>•</span>
              <span>{personalInfo.location}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-primary tracking-wider uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-xs sm:text-sm text-primary-muted hover:text-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Socials */}
          <div>
            <h4 className="text-xs font-bold text-primary tracking-wider uppercase mb-4">
              Connect With Me
            </h4>
            <div className="space-y-2.5">
              <a
                href={personalInfo.socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs sm:text-sm text-primary-muted hover:text-accent transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Profile</span>
              </a>

              <a
                href={personalInfo.socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs sm:text-sm text-primary-muted hover:text-accent transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn Profile</span>
              </a>

              <a
                href={`mailto:${personalInfo.socials.email.address}`}
                className="flex items-center gap-2.5 text-xs sm:text-sm text-primary-muted hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{personalInfo.socials.email.address}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-subtle">
          <p className="flex items-center gap-1 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</span>
          </p>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Crafted with curiosity & code</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3F5F7] text-primary hover:text-accent hover:bg-neutral-200/80 transition-colors focus:outline-none"
              aria-label="Back to top of page"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

