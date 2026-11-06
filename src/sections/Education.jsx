import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, BookOpen, Award, CheckCircle2, Building2 } from 'lucide-react';
import { educationData } from '../data/portfolio';
import SectionHeading from '../components/SectionHeading';

export default function Education() {
  return (
    <section id="education" className="py-24 bg-[#F3F5F7] relative overflow-hidden">
      {/* Decorative dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          tag="ACADEMICS"
          title="My Academic Journey."
          subtitle="Building rigorous fundamentals in Computer Science and Engineering."
        />

        {/* Timeline / Cards Container */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Vertical Timeline Guide Line (visible on larger screens) */}
          <div className="hidden md:block absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-accent via-indigo-300 to-transparent" />

          <div className="space-y-10">
            {educationData.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative md:pl-20"
              >
                {/* Timeline Icon Node */}
                <div className="hidden md:flex absolute left-4 -translate-x-1/2 top-6 w-9 h-9 rounded-full bg-white border-2 border-accent text-accent items-center justify-center shadow-accent-sm z-10">
                  <GraduationCap className="w-4 h-4" />
                </div>

                {/* Academic Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-subtle hover:shadow-card transition-all duration-300">
                  
                  {/* Card Header & Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>{edu.field}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-primary-muted font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        {edu.duration}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-accent" />
                        {edu.location}
                      </span>
                    </div>
                  </div>

                  {/* Degree Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-primary mb-1">
                    {edu.degree}
                  </h3>

                  {/* Institution */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary/80 mb-4">
                    <Building2 className="w-4 h-4 text-primary-muted" />
                    <span>{edu.institution}</span>
                    {edu.isPlaceholder && (
                      <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        Placeholder
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-primary-muted leading-relaxed mb-6">
                    {edu.description}
                  </p>

                  {/* Relevant Coursework */}
                  {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                    <div className="mb-6 pt-5 border-t border-border/80">
                      <h4 className="text-xs font-bold text-primary tracking-wider uppercase mb-3 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-accent" />
                        <span>Core Coursework & Foundations</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.relevantCoursework.map((course) => (
                          <span
                            key={course}
                            className="text-xs px-3 py-1.5 rounded-xl bg-[#F3F5F7] text-primary font-medium border border-border/70"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Academic Achievements / Highlights */}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div className="pt-4 border-t border-border/80">
                      <h4 className="text-xs font-bold text-primary tracking-wider uppercase mb-2 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-accent" />
                        <span>Academic Highlights</span>
                      </h4>
                      <ul className="space-y-1.5">
                        {edu.achievements.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-primary-muted">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

