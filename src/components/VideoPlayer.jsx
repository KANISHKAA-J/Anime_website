import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const VideoPlayer = ({ embedUrl, title, posterImage }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!embedUrl) {
    return (
      <div className="w-full aspect-video bg-surface rounded-2xl flex items-center justify-center border border-white/10 relative overflow-hidden">
        <img src={posterImage} alt="Fallback" className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm" />
        <div className="z-10 text-center">
          <p className="text-gray-400 text-lg mb-2">Video not available</p>
          <p className="text-gray-500 text-sm">No trailer or video source found for this anime.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video rounded-2xl overflow-hidden relative shadow-2xl shadow-primary/20 bg-black group border border-white/5">
      {!isPlaying ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={posterImage} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(true)}
            className="z-10 bg-primary/90 hover:bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(109,40,217,0.5)] transition-colors focus:outline-none"
          >
            <Play size={36} className="fill-white ml-2" />
          </motion.button>
        </div>
      ) : (
        <iframe
          src={`${embedUrl}?autoplay=1`}
          title={`Watch ${title}`}
          className="w-full h-full border-0"
          allowFullScreen
          allow="autoplay; encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default VideoPlayer;
