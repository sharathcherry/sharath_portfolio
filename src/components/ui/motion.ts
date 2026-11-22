import { type Transition } from 'framer-motion';

// Shared transition used across the app for consistent animation timing
export const defaultTransition: Transition = {
  duration: 0.3,
  ease: [0.16, 1, 0.3, 1],
};

// Simple fade‑in + upward slide variant
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
} as const;
