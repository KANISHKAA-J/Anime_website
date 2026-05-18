import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import AnimeCard from '../components/AnimeCard';
import { ShimmerCard } from '../components/Loader';
import { api } from '../services/api';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } }
};

const AnimeRow = ({ title, fetchFn, seeAllPath }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchFn();
        setData(result || []);
      } catch (error) {
        console.error(`Failed to load ${title}`, error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchFn, title]);

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-extrabold text-white relative inline-block font-display tracking-tight">
          {title}
          <div className="absolute -bottom-2.5 left-0 w-2/3 h-1 bg-gradient-to-r from-primary to-accent rounded-full shadow-[0_0_10px_rgba(0,242,254,0.4)]"></div>
        </h2>
        {seeAllPath && (
          <Link 
            to={seeAllPath} 
            className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-primary flex items-center gap-1 transition-all duration-300 hover:translate-x-1 border border-white/5 hover:border-primary/20 bg-white/[0.02] px-4 py-2 rounded-full backdrop-blur-md font-display"
          >
            See All <ChevronRight size={14} />
          </Link>
        )}
      </div>

      <div className="w-full overflow-x-auto hide-scrollbar pb-6 px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={loading ? "hidden" : "show"}
          className="flex gap-6 w-max max-w-7xl mx-auto"
        >
          {loading
            ? Array(6).fill(0).map((_, i) => (
                <div key={i} className="w-48 sm:w-56 shrink-0">
                  <ShimmerCard />
                </div>
              ))
            : data.map((anime) => (
                <motion.div key={anime.mal_id} variants={itemVariants} className="w-48 sm:w-56 shrink-0">
                  <AnimeCard anime={anime} />
                </motion.div>
              ))}
        </motion.div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="pb-20">
      <HeroBanner />
      
      <div className="mt-8 space-y-8">
        <AnimeRow 
          title="Trending Now" 
          fetchFn={api.getTopAnime} 
          seeAllPath="/search" 
        />
        <AnimeRow 
          title="Popular Movies" 
          fetchFn={api.getTrendingMovies} 
          seeAllPath="/search?type=movie" 
        />
        <AnimeRow 
          title="Top Airing" 
          fetchFn={api.getAiringAnime} 
          seeAllPath="/search?status=airing" 
        />
        <AnimeRow 
          title="Upcoming Season" 
          fetchFn={api.getUpcomingAnime} 
          seeAllPath="/search?status=upcoming" 
        />
      </div>
    </div>
  );
};

export default Home;
