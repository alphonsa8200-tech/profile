import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Sparkles, MapPin, Code2, Compass } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import Button from '../components/Button';
import SocialLinks from '../components/SocialLinks';

export default function Hero({ onOpenResume }) {
  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollDown = (e) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden">
      {/* Subtle Background Glow & Pattern */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 subtle-grid-bg opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status & Location Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2.5 mb-6"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-border text-primary text-xs font-semibold shadow-subtle">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {personalInfo.statusBadge}
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F5F7] text-primary-muted text-xs font-medium border border-border/80">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                {personalInfo.location}
              </span>
            </motion.div>

            {/* Introductory label */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs sm:text-sm font-bold tracking-widest text-accent uppercase mb-2 flex items-center gap-2"
            >
              <span>HELLO, I'M</span>
              <span className="w-8 h-[2px] bg-accent/40 rounded-full" />
            </motion.p>

            {/* Main Name Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-primary tracking-tight leading-[1.08] mb-4"
            >
              {personalInfo.name}
            </motion.h1>

            {/* Professional Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl sm:text-3xl font-semibold text-primary/80 mb-6 flex items-center gap-3"
            >
              <span className="bg-gradient-to-r from-accent to-indigo-700 bg-clip-text text-transparent font-bold">
                {personalInfo.title}
              </span>
              <span className="text-primary-subtle text-lg hidden sm:inline">•</span>
              <span className="text-base sm:text-lg text-primary-muted font-normal hidden sm:inline">
                CSE Student
              </span>
            </motion.div>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-primary-muted max-w-xl leading-relaxed mb-8"
            >
              {personalInfo.heroDescription}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto"
            >
              <Button
                href="#projects"
                onClick={handleScrollToProjects}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Explore My Work
              </Button>

              <Button
                variant="secondary"
                size="lg"
                icon={Download}
                iconPosition="left"
                onClick={onOpenResume}
                className="w-full sm:w-auto"
              >
                Download Resume
              </Button>
            </motion.div>

            {/* Social Links & Contact Quick Access */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-4 pt-2"
            >
              <span className="text-xs font-semibold text-primary-subtle tracking-wider uppercase">
                Find Me On:
              </span>
              <SocialLinks iconSize="w-4 h-4" />
            </motion.div>

          </div>

          {/* Right Column: Creative Profile Imagery / Editorial Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative w-full max-w-md"
            >
              
              {/* Outer decorative ring */}
              <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-accent/20 via-transparent to-indigo-300/30 blur-xl opacity-70" />

              {/* Main Profile Card Container */}
              <div className="relative bg-white rounded-[2.2rem] p-7 border border-border shadow-card overflow-hidden">
                
                {/* Background artistic pattern */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-accent/5 rounded-bl-[5rem] pointer-events-none" />

                {/* Profile Avatar / Editorial Monogram Display */}
                <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#F3F5F7] to-[#E8EEF8] border border-border/80 flex flex-col items-center justify-center p-6 text-center overflow-hidden mb-6 group">
                  
                  {/* Subtle animated floating background circle */}
                  <div className="absolute w-36 h-36 rounded-full bg-accent/10 -top-8 -right-8 animate-float pointer-events-none" />
                  
                  {/* Monogram Badge */}
                  <div className="w-24 h-24 rounded-3xl bg-accent text-white flex items-center justify-center font-extrabold text-3xl tracking-wider shadow-accent-md group-hover:scale-105 transition-transform duration-300">
                    {personalInfo.initials}
                  </div>

                  {/* Name badge */}
                  <div className="mt-4">
                    <h3 className="font-bold text-lg text-primary">{personalInfo.name}</h3>
                    <p className="text-xs text-primary-muted font-medium">{personalInfo.title} • Kerala, India</p>
                  </div>

                  {/* Profile placeholder note */}
                  <div className="absolute bottom-2 text-[10px] text-primary-subtle">
                    [Photo Placeholder • Custom Editorial Visual]
                  </div>
                </div>

                {/* Quick Info Grid inside Hero Card */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#F3F5F7] border border-border/60">
                    <span className="text-xs text-primary-muted font-medium">Academic Focus</span>
                    <span className="text-xs font-semibold text-primary">Computer Science & Engg.</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#F3F5F7] border border-border/60">
                    <span className="text-xs text-primary-muted font-medium">Primary Stack</span>
                    <span className="text-xs font-semibold text-accent">React • Tailwind • Node.js</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#F3F5F7] border border-border/60">
                    <span className="text-xs text-primary-muted font-medium">Mindset</span>
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Creative & Curious
                    </span>
                  </div>
                </div>

              </div>

              {/* Floating interactive badge 1 */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="hidden sm:flex absolute -left-6 bottom-16 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-border shadow-dropdown items-center gap-2.5 z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-primary-subtle font-bold">Focus</p>
                  <p className="text-xs font-bold text-primary">Clean Architecture</p>
                </div>
              </motion.div>

              {/* Floating interactive badge 2 */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                className="hidden sm:flex absolute -right-4 top-10 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-border shadow-dropdown items-center gap-2.5 z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-primary-subtle font-bold">Goal</p>
                  <p className="text-xs font-bold text-primary">Meaningful Impact</p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>

        {/* Scroll-down indicator */}
        <div className="mt-16 flex justify-center">
          <motion.a
            href="#about"
            onClick={handleScrollDown}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-primary-subtle hover:text-accent transition-colors"
            aria-label="Scroll down to About section"
          >
            <span className="text-[11px] font-semibold tracking-widest uppercase">Scroll Down</span>
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center bg-white shadow-subtle">
              <ArrowDown className="w-4 h-4 text-accent" />
            </div>
          </motion.a>
        </div>

      </div>
    </section>
  );
}

