import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Info } from 'lucide-react';
import { api } from '../services/api';

const HeroBanner = () => {
  const [trending, setTrending] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await api.getTopAnime();
        // Get top 5 for hero banner
        setTrending(data.slice(0, 5));
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrending();
  }, []);

  useEffect(() => {
    if (trending.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trending.length);
    }, 8000); // Change slide every 8s
    return () => clearInterval(interval);
  }, [trending]);

  if (trending.length === 0) {
    return <div className="w-full h-[60vh] md:h-[80vh] bg-surface animate-pulse" />;
  }

  const anime = trending[currentIndex];

  return (
    <div className="relative w-full h-[65vh] md:h-[88vh] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -left-1/4 top-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute right-1/4 bottom-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[150px] pointer-events-none -z-10 animate-float"></div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* Background Image - prefer trailer image if available, else large poster */}
          <img
            src={anime.trailer?.images?.maximum_image_url || anime.images.webp.large_image_url}
            alt={anime.title}
            className="w-full h-full object-cover object-top"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#040508] via-[#040508]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040508] via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="w-full md:w-2/3 lg:w-3/5 z-10 space-y-6">
          <div key={`content-${currentIndex}`}>
            {/* Tags Staggered */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="text-primary font-extrabold tracking-wider text-xs uppercase px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-md font-display filter drop-shadow-[0_0_5px_rgba(0,242,254,0.3)]">
                #TOP {currentIndex + 1}
              </span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-semibold text-gray-300">
                {anime.type}
              </span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-semibold text-gray-300">
                {anime.rating ? anime.rating.split(' ')[0] : 'NR'}
              </span>
            </motion.div>
            
            {/* Title Staggered */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-4 line-clamp-2 leading-[1.1] font-display"
            >
              {anime.title_english || anime.title}
            </motion.h1>
            
            {/* Synopsis Staggered */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-300 text-sm md:text-base line-clamp-3 md:line-clamp-4 mb-8 max-w-xl leading-relaxed"
            >
              {anime.synopsis}
            </motion.p>
            
            {/* Actions Staggered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link 
                to={`/anime/${anime.mal_id}`}
                className="flex items-center gap-2.5 bg-gradient-to-r from-primary to-primaryHover text-black px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-xs shadow-lg shadow-primary/20 hover:shadow-primary/45 border border-primary/20 transition-all duration-300 hover:scale-105"
              >
                <Play size={16} className="fill-black text-black animate-pulse" />
                View Details
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
        {trending.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-500 ${
              idx === currentIndex ? 'w-10 bg-primary shadow-[0_0_10px_rgba(0,242,254,0.8)]' : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
