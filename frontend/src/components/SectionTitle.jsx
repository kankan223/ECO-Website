import { motion } from 'framer-motion';

export default function SectionTitle({ title, subtitle, center = true, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${center ? 'text-center' : ''} ${className}`}
    >
      <h2 className="text-5xl md:text-4xl sm:text-3xl font-bold text-[#222] mb-4">
        {title}
        <span className="block w-24 h-1 bg-[#3FAE5C] mx-auto mt-4 rounded-full"></span>
      </h2>
      {subtitle && (
        <p className="text-lg text-muted max-w-3xl mx-auto mt-4">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}