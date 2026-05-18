import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const TrailerModal = ({ isOpen, onClose, trailerUrl }) => {
  return (
    <AnimatePresence>
      {isOpen && trailerUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        >
          <div className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden relative shadow-2xl">
            <button 
              onClick={onClose}
              className="absolute -top-12 right-0 text-white hover:text-accent transition-colors focus:outline-none"
            >
              <X size={32} />
            </button>
            <iframe
              src={`${trailerUrl}?autoplay=1`}
              title="Trailer"
              className="w-full h-full border-0"
              allowFullScreen
              allow="autoplay; encrypted-media"
            ></iframe>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TrailerModal;
