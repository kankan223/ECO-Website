import { motion } from 'framer-motion';

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  href, 
  className = '',
  type = 'button',
  disabled = false,
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-[#3FAE5C] text-white hover:bg-[#359a4f] focus:ring-[#3FAE5C] shadow-soft hover:shadow-lg',
    secondary: 'bg-white text-[#3FAE5C] border-2 border-[#3FAE5C] hover:bg-[#3FAE5C]/5 focus:ring-[#3FAE5C]',
    outline: 'bg-transparent text-[#222] border-2 border-[#ECECEC] hover:border-[#3FAE5C] hover:text-[#3FAE5C]',
  };

  const buttonContent = (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className="inline-block" {...props}>
        {buttonContent}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} {...props}>
      {buttonContent}
    </button>
  );
}