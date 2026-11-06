import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, FolderGit2 } from 'lucide-react';
import Button from './Button';

export default function ProjectCard({ project, onSelectProject }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="group flex flex-col bg-white rounded-3xl border border-border overflow-hidden shadow-subtle hover:shadow-card-hover transition-all duration-300"
    >
      {/* Visual Header / Banner */}
      <div 
        onClick={() => onSelectProject(project)}
        className="relative h-48 sm:h-52 w-full overflow-hidden cursor-pointer bg-neutral-100 flex items-center justify-center"
      >
        {/* Subtle patterned gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient || 'from-blue-600 to-indigo-700'} opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500`} />
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-15 dot-pattern" />

        {/* Floating Mockup Card inside Banner */}
        <div className="relative z-10 w-4/5 max-w-xs p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-white transform group-hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-white/70">
              {project.category}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-white/80" />
            <p className="text-xs font-semibold truncate text-white">
              {project.title}
            </p>
          </div>
        </div>

        {/* Placeholder Tag */}
        {project.isPlaceholder && (
          <div className="absolute top-3 right-3 z-10">
            <span className="text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-white/90 text-primary shadow-sm backdrop-blur-sm">
              Placeholder Template
            </span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          {/* Subtitle / Category */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">
              {project.subtitle || project.category}
            </span>
          </div>

          {/* Project Title */}
          <h3 
            onClick={() => onSelectProject(project)}
            className="text-xl font-bold text-primary group-hover:text-accent transition-colors cursor-pointer flex items-center justify-between"
          >
            <span>{project.title}</span>
            <ArrowUpRight className="w-4 h-4 text-primary-subtle group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </h3>

          {/* Project Tagline / Description */}
          <p className="mt-2 text-sm text-primary-muted leading-relaxed line-clamp-2">
            {project.tagline || project.description}
          </p>

          {/* Technologies Badges */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-[#F3F5F7] text-primary-muted border border-border/70"
              >
                {tech}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="text-[11px] font-medium px-2 py-1 rounded-md bg-[#F3F5F7] text-primary-subtle">
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Action Links Footer */}
        <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub repo for ${project.title}`}
                className="p-2 rounded-full text-primary-muted hover:text-primary hover:bg-neutral-100 transition-colors"
                title={project.githubPlaceholder || "GitHub Repository"}
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo for ${project.title}`}
                className="p-2 rounded-full text-primary-muted hover:text-accent hover:bg-neutral-100 transition-colors"
                title={project.livePlaceholder || "Live Demo"}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => onSelectProject(project)}
            className="text-xs font-semibold text-accent hover:text-accent-hover hover:underline inline-flex items-center gap-1 focus:outline-none"
          >
            <span>View Details</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

