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
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative group rounded-xl overflow-hidden glass-card"
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
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80" />
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {anime.score && (
            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-xs font-semibold">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span>{anime.score}</span>
            </div>
          )}
          {anime.type && (
            <div className="bg-primary/80 backdrop-blur-md px-2 py-1 rounded-md text-xs font-semibold text-white w-fit">
              {anime.type}
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 bg-black/40 backdrop-blur-md rounded-full hover:bg-black/60 transition-colors z-10"
        >
          <Heart 
            size={16} 
            className={`transition-colors ${isFav ? 'fill-accent text-accent' : 'text-white'}`} 
          />
        </button>

        {/* Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
            <Play size={24} className="text-white fill-white ml-1" />
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight mb-1">
            {anime.title_english || anime.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <span>{anime.year || 'N/A'}</span>
            <span>•</span>
            <span>{anime.episodes ? `${anime.episodes} EPS` : 'Ongoing'}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AnimeCard;
