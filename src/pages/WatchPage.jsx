import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowLeft } from 'lucide-react';
import { api } from '../services/api';
import VideoPlayer from '../components/VideoPlayer';
import RecommendationSlider from '../components/RecommendationSlider';
import { Loader } from '../components/Loader';

const WatchPage = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchData = async () => {
      setLoading(true);
      try {
        window.scrollTo(0, 0);
        const [animeData, recData] = await Promise.all([
          api.getAnimeFullById(id),
          api.getAnimeRecommendations(id)
        ]);
        
        setAnime(animeData);
        setRecommendations((recData?.slice(0, 15) || []).map(r => r.entry));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWatchData();
  }, [id]);

  if (loading) return <div className="min-h-screen pt-20"><Loader /></div>;
  if (!anime) return <div className="text-center py-20 text-white">Anime not found</div>;

  return (
    <div className="pb-20 pt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back to Details */}
      <Link to={`/anime/${anime.mal_id}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-6 font-medium">
        <ArrowLeft size={20} /> Back to Details
      </Link>

      {/* Video Player Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mb-8"
      >
        <VideoPlayer 
          embedUrl={anime.trailer?.embed_url} 
          title={anime.title_english || anime.title} 
          posterImage={anime.trailer?.images?.maximum_image_url || anime.images.webp.large_image_url} 
        />
      </motion.div>

      {/* Anime Info */}
      <div className="glass-panel p-6 rounded-2xl mb-12">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
              {anime.title_english || anime.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
              {anime.score && (
                <div className="flex items-center gap-1 text-yellow-400 font-bold">
                  <Star className="fill-yellow-400" size={16} />
                  <span>{anime.score}</span>
                </div>
              )}
              <span className="text-gray-400">{anime.year || anime.aired?.prop?.from?.year || 'N/A'}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">{anime.episodes ? `${anime.episodes} Episodes` : 'Ongoing'}</span>
              <span className="text-gray-400">•</span>
              <span className="bg-primary/20 text-primary px-2 py-0.5 rounded font-medium">{anime.type}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {anime.genres?.map(g => (
                <span key={g.mal_id} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-300">
                  {g.name}
                </span>
              ))}
            </div>
            <p className="text-gray-300 text-base leading-relaxed line-clamp-4 md:line-clamp-none">
              {anime.synopsis}
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">You might also like</h2>
          <RecommendationSlider recommendations={recommendations} />
        </div>
      )}
    </div>
  );
};

export default WatchPage;
