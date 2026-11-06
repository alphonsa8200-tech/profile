import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { skillCategories } from '../data/portfolio';
import SectionHeading from '../components/SectionHeading';
import SkillCard from '../components/SkillCard';

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'languages', label: 'Languages' },
    { id: 'databases', label: 'Databases' },
    { id: 'devtools', label: 'Tools' },
    { id: 'design', label: 'UI/UX Design' }
  ];

  const displayedCategories = activeFilter === 'all' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.id === activeFilter);

  return (
    <section id="skills" className="py-24 bg-[#F3F5F7] relative overflow-hidden">
      {/* Decorative dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          tag="SKILLS & EXPERTISE"
          title="My Technical Toolkit."
          subtitle="Technologies and tools I explore to turn ideas into meaningful digital experiences."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveFilter(opt.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none ${
                activeFilter === opt.id
                  ? 'bg-accent text-white shadow-accent-sm'
                  : 'bg-white text-primary-muted hover:text-primary hover:bg-neutral-100 border border-border'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Skill Cards Grid (6 categories) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedCategories.map((category, index) => (
            <SkillCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>

        {/* Customization & Data Integrity Note */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-white border border-border shadow-subtle flex items-start sm:items-center gap-3.5 text-xs text-primary-muted"
        >
          <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
            <Edit3 className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-primary">Centralized Toolkit Configuration: </span>
            To add, remove, or update skills with your finalized tech stack, simply modify the <code className="text-accent font-mono font-medium">skillCategories</code> array inside <code className="bg-[#F3F5F7] px-1.5 py-0.5 rounded border border-border font-mono text-[11px]">src/data/portfolio.js</code>.
          </div>
        </motion.div>

      </div>
    </section>
  );
}

