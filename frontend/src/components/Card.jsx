import { motion } from 'framer-motion';

export default function Card({ 
  children, 
  className = '', 
  hover = true,
  onClick,
  ...props 
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)' } : {}}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-2xl overflow-hidden shadow-card ${hover ? 'hover-lift' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}