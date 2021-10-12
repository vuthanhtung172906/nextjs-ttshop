import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}
const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};
export default function Layout({ children }: LayoutProps) {
  return (
    <motion.main
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ type: 'linear' }}
      className=""
    >
      {children}
    </motion.main>
  );
}
