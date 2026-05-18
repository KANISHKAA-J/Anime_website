import React from 'react';
import { motion } from 'framer-motion';

export const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full py-20">
      <div className="relative w-16 h-16">
        <motion.div
          className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full filter drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 border-4 border-transparent border-b-accent rounded-full filter drop-shadow-[0_0_8px_rgba(255,0,127,0.5)]"
          animate={{ rotate: -360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export const ShimmerCard = () => {
  return (
    <div className="glass-card rounded-xl overflow-hidden aspect-[2/3] relative border border-white/[0.04] bg-[#0c0e15]/40">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-accent/5 to-transparent animate-pulse-slow" />
      <div className="absolute bottom-0 w-full p-4 space-y-3 bg-gradient-to-t from-background to-transparent pt-10">
        <div className="h-4 bg-white/10 rounded w-5/6 animate-pulse" />
        <div className="h-3 bg-white/5 rounded w-1/2 animate-pulse" />
      </div>
    </div>
  );
};
