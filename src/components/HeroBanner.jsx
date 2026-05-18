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
    <div className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image - prefer trailer image if available, else large poster */}
          <img
            src={anime.trailer?.images?.maximum_image_url || anime.images.webp.large_image_url}
            alt={anime.title}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="w-full md:w-2/3 lg:w-1/2 z-10 space-y-6">
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-primary font-bold tracking-wider text-sm">#TOP {currentIndex + 1}</span>
              <span className="px-2 py-0.5 border border-white/20 rounded text-xs text-gray-300">
                {anime.type}
              </span>
              <span className="px-2 py-0.5 border border-white/20 rounded text-xs text-gray-300">
                {anime.rating ? anime.rating.split(' ')[0] : 'NR'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 line-clamp-2 leading-tight">
              {anime.title_english || anime.title}
            </h1>
            
            <p className="text-gray-300 text-sm md:text-base line-clamp-3 md:line-clamp-4 mb-8 max-w-xl">
              {anime.synopsis}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link 
                to={`/anime/${anime.mal_id}`}
                className="flex items-center gap-2 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 shadow-lg shadow-primary/30"
              >
                <Play size={20} className="fill-white" />
                View Details
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {trending.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-8 bg-primary' : 'w-4 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
