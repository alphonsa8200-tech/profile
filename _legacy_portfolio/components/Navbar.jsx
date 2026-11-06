import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { navLinks, personalInfo } from '../data/portfolio';
import Button from './Button';

export default function Navbar({ onOpenResume }) {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section spy
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3.5 glass-nav shadow-subtle' 
        : 'py-5 bg-[#FAFAF8]/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo AJ */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="group flex items-center gap-3 focus:outline-none"
            aria-label="Alphonsa Jaison - Home"
          >
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white font-extrabold text-base tracking-wider shadow-accent-sm group-hover:scale-105 group-hover:bg-accent-hover transition-all duration-200">
              {personalInfo.initials}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-primary leading-tight group-hover:text-accent transition-colors">
                {personalInfo.name}
              </span>
              <span className="text-[11px] font-medium text-primary-muted flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {personalInfo.title}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-border/80 shadow-subtle">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative px-3.5 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-accent font-semibold bg-accent/10'
                      : 'text-primary-muted hover:text-primary hover:bg-neutral-100/60'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action CTA & Let's Connect */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              variant="primary"
              size="sm"
              icon={ArrowUpRight}
            >
              Let's Connect
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              variant="primary"
              size="sm"
              className="text-xs px-3 py-1.5"
            >
              Connect
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-primary hover:bg-neutral-100 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-border shadow-dropdown px-4 pt-4 pb-6 mt-2 transition-all">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-accent/10 text-accent font-semibold'
                      : 'text-primary-muted hover:text-primary hover:bg-neutral-100'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-border flex flex-col gap-2">
              <Button
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                variant="primary"
                size="md"
                className="w-full"
                icon={ArrowUpRight}
              >
                Let's Connect
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

