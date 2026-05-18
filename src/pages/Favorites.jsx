import React from 'react';
import { Heart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFavorites } from '../hooks/useFavorites';
import AnimeCard from '../components/AnimeCard';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[80vh]">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="text-accent w-8 h-8 fill-accent" />
        <h1 className="text-3xl font-bold text-white">My Favorites</h1>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {favorites.map((anime) => (
            <motion.div
              key={anime.mal_id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <AnimeCard anime={anime} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-6 border border-white/5 shadow-xl">
            <Heart size={40} className="text-gray-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">No favorites yet</h2>
          <p className="text-gray-400 max-w-md mb-8">
            You haven't added any anime to your favorites list. Start exploring and save the ones you love!
          </p>
          <Link 
            to="/search" 
            className="flex items-center gap-2 bg-primary hover:bg-primaryHover text-white px-8 py-3 rounded-full font-semibold transition-all hover:scale-105 shadow-lg"
          >
            <Search size={20} />
            Discover Anime
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;
