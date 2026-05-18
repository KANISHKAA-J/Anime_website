import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Play, Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

const AnimeCard = ({ anime }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(anime.mal_id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(anime);
  };

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.03, boxShadow: '0 20px 40px -15px rgba(0, 242, 254, 0.35)' }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      className="relative group rounded-xl overflow-hidden glass-card border border-white/[0.04] hover:border-primary/40 transition-all duration-300"
    >
      <Link to={`/watch/${anime.mal_id}`} className="block relative aspect-[2/3] w-full">
        {/* Image */}
        <img
          src={anime.images.webp.large_image_url}
          alt={anime.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-85" />
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
          {anime.score && (
            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-xs font-semibold border border-white/[0.06] text-white">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span>{anime.score}</span>
            </div>
          )}
          {anime.type && (
            <div className="bg-primary/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold tracking-wider text-black w-fit uppercase border border-primary/20">
              {anime.type}
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/70 border border-white/[0.08] transition-colors z-10"
        >
          <Heart 
            size={15} 
            className={`transition-colors duration-300 ${isFav ? 'fill-accent text-accent filter drop-shadow-[0_0_8px_rgba(255,0,127,1)]' : 'text-white/80 group-hover:text-white'}`} 
          />
        </motion.button>

        {/* Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
          <motion.div 
            whileHover={{ scale: 1.15, boxShadow: '0 0 20px rgba(0, 242, 254, 0.8)' }}
            className="w-12 h-12 bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center border border-primary/50 transition-all duration-300"
          >
            <Play size={22} className="text-primary fill-primary ml-1" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-[#040508]/95 via-[#040508]/80 to-transparent pt-12 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight mb-1 font-display group-hover:text-primary transition-colors duration-300">
            {anime.title_english || anime.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            <span className="font-semibold text-primary/80">{anime.year || 'N/A'}</span>
            <span className="text-gray-600">•</span>
            <span>{anime.episodes ? `${anime.episodes} EPS` : 'Ongoing'}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AnimeCard;
