import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import AnimeCard from '../components/AnimeCard';
import { ShimmerCard } from '../components/Loader';
import { api } from '../services/api';

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
      <div className="flex items-center justify-between mb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white relative inline-block">
          {title}
          <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></div>
        </h2>
        {seeAllPath && (
          <Link to={seeAllPath} className="text-sm font-medium text-gray-400 hover:text-primary flex items-center transition-colors">
            See All <ChevronRight size={16} />
          </Link>
        )}
      </div>

      <div className="w-full overflow-x-auto hide-scrollbar pb-6 px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 w-max max-w-7xl mx-auto">
          {loading
            ? Array(6).fill(0).map((_, i) => (
                <div key={i} className="w-48 sm:w-56 shrink-0">
                  <ShimmerCard />
                </div>
              ))
            : data.map((anime) => (
                <div key={anime.mal_id} className="w-48 sm:w-56 shrink-0">
                  <AnimeCard anime={anime} />
                </div>
              ))}
        </div>
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
