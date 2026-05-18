import React from 'react';
import { motion } from 'framer-motion';

export const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full py-20">
      <motion.div
        className="w-12 h-12 border-4 border-surface border-t-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export const ShimmerCard = () => {
  return (
    <div className="glass-card rounded-xl overflow-hidden aspect-[2/3] relative animate-pulse">
      <div className="absolute inset-0 bg-white/5" />
      <div className="absolute bottom-0 w-full p-4 space-y-2">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/10 rounded w-1/2" />
      </div>
    </div>
  );
};
