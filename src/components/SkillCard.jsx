import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layout, Database, Wrench, Palette, Server, Check } from 'lucide-react';

const categoryIcons = {
  languages: Code2,
  frontend: Layout,
  backend: Server,
  databases: Database,
  devtools: Wrench,
  design: Palette,
};

export default function SkillCard({ category, index }) {
  const IconComponent = categoryIcons[category.id] || Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-3xl p-6 sm:p-7 border border-border shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Category Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary">
              {category.title}
            </h3>
            <span className="text-[11px] text-primary-subtle font-medium">
              Category 0{index + 1}
            </span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs text-primary-muted mb-5 leading-relaxed">
          {category.description}
        </p>

        {/* Skill Pills */}
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <div
              key={skill.name}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 ${
                skill.highlight
                  ? 'bg-accent/5 text-accent border-accent/20 hover:bg-accent/10'
                  : 'bg-[#F3F5F7] text-primary hover:bg-neutral-100 border-border/80'
              }`}
            >
              {skill.highlight && (
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              )}
              <span>{skill.name}</span>
              {skill.level && (
                <span className="text-[10px] text-primary-subtle font-normal ml-0.5">
                  ({skill.level})
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

