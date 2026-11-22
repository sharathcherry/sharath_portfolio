import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { defaultTransition } from './motion';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function ButtonPrimary({ children, onClick, className = '', type = 'button' }: Props) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={defaultTransition}
      className={`px-4 py-2 bg-white text-black rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 ${className}`}
    >
      {children}
    </motion.button>
  );
}
