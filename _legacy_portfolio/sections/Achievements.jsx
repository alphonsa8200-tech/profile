import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink, ShieldCheck, Sparkles, Trophy, Users, Terminal } from 'lucide-react';
import { achievementsData } from '../data/portfolio';
import SectionHeading from '../components/SectionHeading';

const categoryIcons = {
  Certification: Award,
  Workshop: Users,
  Competition: Trophy,
  Milestone: Sparkles,
};

export default function Achievements() {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  return (
    <section id="achievements" className="py-24 bg-[#FAFAF8] relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 subtle-grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          tag="RECOGNITION & GROWTH"
          title="Learning Beyond the Classroom."
          subtitle="Continuous growth through certifications, workshops, hackathons, and technical milestones."
        />

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {achievementsData.map((item, index) => {
            const Icon = categoryIcons[item.category] || Award;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-border shadow-subtle hover:shadow-card hover:border-accent/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge & Date */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.category}</span>
                    </span>

                    <span className="text-xs text-primary-subtle font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-1">
                    {item.title}
                  </h3>

                  {/* Issuer */}
                  <p className="text-xs sm:text-sm font-semibold text-accent mb-3">
                    {item.issuer}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-primary-muted leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Footer status / Action */}
                <div className="pt-4 border-t border-border/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{item.badge}</span>
                  </div>

                  {item.linkText && (
                    <span className="text-xs text-primary-subtle cursor-default italic">
                      {item.linkText}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Centralized Config Note */}
        <div className="mt-12 text-center text-xs text-primary-subtle max-w-xl mx-auto">
          Add or edit your official certificates, symposium wins, and credentials in{' '}
          <code className="text-accent font-mono bg-white px-2 py-0.5 rounded border border-border">
            src/data/portfolio.js &rarr; achievementsData
          </code>
        </div>

      </div>
    </section>
  );
}

