import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Sparkles, 
  Compass, 
  Cpu, 
  Target, 
  BookOpen, 
  Lightbulb,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import SectionHeading from '../components/SectionHeading';

const strengthIcons = {
  Zap: Zap,
  Sparkles: Sparkles,
  Compass: Compass,
  Cpu: Cpu,
};

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#FAFAF8] relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 subtle-grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          tag="ABOUT ME"
          title="Beyond the Code."
          subtitle="A little about who I am and what drives me."
        />

        {/* Split Layout: Left Content & Right Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Personal Narrative & Career Objective */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Lead Narrative Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 border border-border shadow-subtle"
            >
              <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider mb-4">
                <Lightbulb className="w-4 h-4" />
                <span>My Story & Drive</span>
              </div>

              <p className="text-lg md:text-xl font-medium text-primary leading-relaxed mb-4">
                "{personalInfo.aboutMe.lead}"
              </p>

              <p className="text-base text-primary-muted leading-relaxed">
                "{personalInfo.aboutMe.body}"
              </p>
            </motion.div>

            {/* Career Objective Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-gradient-to-br from-white to-[#F3F5F7] rounded-3xl p-8 border border-border shadow-subtle relative overflow-hidden"
            >
              <div className="w-1.5 h-full bg-accent absolute top-0 left-0" />
              
              <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-wider uppercase mb-3">
                <Target className="w-4 h-4 text-accent" />
                <span>Career Objective</span>
              </div>

              <blockquote className="text-base sm:text-lg italic text-primary/90 font-medium leading-relaxed pl-2">
                "{personalInfo.careerObjective}"
              </blockquote>

              <div className="mt-4 flex flex-wrap gap-2 pl-2">
                <span className="text-xs px-3 py-1 rounded-full bg-white text-primary border border-border font-medium">
                  🌱 Impactful Products
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-white text-primary border border-border font-medium">
                  🚀 Continuous Growth
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-white text-primary border border-border font-medium">
                  💡 Software Engineering
                </span>
              </div>
            </motion.div>

            {/* Professional Interests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="bg-white rounded-3xl p-8 border border-border shadow-subtle"
            >
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-accent" />
                <span>Professional Interests & Focus Areas</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {personalInfo.interests.map((interest, idx) => (
                  <div
                    key={interest}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-[#F3F5F7] border border-border/70 hover:border-accent/40 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-primary">
                      {interest}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Column: 4 Strengths & Personality Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="flex items-center justify-between mb-2 px-1">
              <h3 className="text-sm font-bold text-primary tracking-wider uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>Personal Strengths</span>
              </h3>
              <span className="text-xs text-primary-subtle">4 Core Qualities</span>
            </div>

            {/* 4 Feature Cards */}
            <div className="space-y-4">
              {personalInfo.strengths.map((strength, index) => {
                const Icon = strengthIcons[strength.icon] || Zap;
                return (
                  <motion.div
                    key={strength.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -3 }}
                    className="p-5 sm:p-6 rounded-3xl bg-white border border-border shadow-subtle hover:shadow-card hover:border-accent/30 transition-all duration-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-base text-primary">
                            {strength.title}
                          </h4>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-primary-subtle">
                            0{index + 1}
                          </span>
                        </div>
                        <p className="mt-1 text-xs sm:text-sm text-primary-muted leading-relaxed">
                          {strength.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Personality Summary Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-accent to-indigo-600 text-white shadow-card">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-white/80 block mb-1">
                Mindset & Philosophy
              </span>
              <p className="text-lg font-bold">
                "Creative thinking meets meaningful technology."
              </p>
              <p className="text-xs text-white/80 mt-2 leading-relaxed">
                Determined to turn challenges into opportunities and ideas into impactful digital realities.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

