import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FolderGit2, Info, PlusCircle } from 'lucide-react';
import { projectsData } from '../data/portfolio';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-24 bg-[#FAFAF8] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 subtle-grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          tag="SELECTED WORK"
          title="Things I've Built."
          subtitle="Turning creative ideas into practical digital solutions."
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectProject={handleSelectProject}
            />
          ))}
        </div>

        {/* Notice for Project Customization */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 max-w-3xl mx-auto p-5 rounded-3xl bg-[#F3F5F7] border border-border flex items-start gap-4 text-xs text-primary-muted leading-relaxed"
        >
          <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-primary">Adding Your Projects: </span>
            The cards above are structured templates ready for your real work. When you're ready to showcase your actual projects, simply update <code className="text-accent font-mono font-medium">projectsData</code> in <code className="bg-white px-1.5 py-0.5 rounded border border-border font-mono text-[11px]">src/data/portfolio.js</code> with your repository URLs, live deployment links, and project screenshots.
          </div>
        </motion.div>

      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}

