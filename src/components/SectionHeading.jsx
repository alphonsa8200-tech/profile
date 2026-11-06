import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({
  tag,
  title,
  subtitle,
  center = true,
  className = ""
}) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'} ${className}`}>
      {tag && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wider uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          {tag}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-base md:text-lg text-primary-muted leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

