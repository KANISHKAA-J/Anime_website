import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Play, Heart, Share2, Youtube, X } from 'lucide-react';
import { api } from '../services/api';
import { useFavorites } from '../hooks/useFavorites';
import AnimeCard from '../components/AnimeCard';
import { Loader } from '../components/Loader';
import TrailerModal from '../components/TrailerModal';
import VideoPlayer from '../components/VideoPlayer';
import { Link } from 'react-router-dom';

const AnimeDetails = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        window.scrollTo(0, 0);
        const [animeData, charData, recData] = await Promise.all([
          api.getAnimeFullById(id),
          api.getAnimeCharacters(id),
          api.getAnimeRecommendations(id)
        ]);
        
        setAnime(animeData);
        setCharacters(charData?.slice(0, 10) || []);
        // Map recommendations to match standard anime object structure for AnimeCard
        setRecommendations((recData?.slice(0, 12) || []).map(r => r.entry));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  if (loading) return <div className="min-h-screen pt-20"><Loader /></div>;
  if (!anime) return <div className="text-center py-20 text-white">Anime not found</div>;

  const isFav = isFavorite(anime.mal_id);

  return (
    <div className="pb-20">
      {/* Hero Banner */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={anime.trailer?.images?.maximum_image_url || anime.images.webp.large_image_url}
          alt={anime.title}
          className="w-full h-full object-cover opacity-40 blur-sm scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-48 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: Poster & Actions */}
          <div className="w-full md:w-1/4 shrink-0 flex flex-col items-center md:items-start">
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-48 md:w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-surface"
            >
              <img
                src={anime.images.webp.large_image_url}
                alt={anime.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="w-full mt-6 space-y-3">
              <Link 
                to={`/watch/${anime.mal_id}`}
                className="w-full bg-primary hover:bg-primaryHover text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary/20"
              >
                <Play size={20} className="fill-white" /> Watch Now
              </Link>
              {anime.trailer?.youtube_id && (
                <button 
                  onClick={() => setShowTrailer(true)}
                  className="w-full bg-surface border border-white/10 hover:bg-white/5 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Youtube size={20} className="text-accent" /> Watch Trailer
                </button>
              )}
              
              <div className="flex gap-3">
                <button 
                  onClick={() => toggleFavorite(anime)}
                  className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors border ${
                    isFav ? 'bg-accent/10 border-accent/30 text-accent' : 'bg-surface border-white/10 text-white hover:bg-white/5'
                  }`}
                >
                  <Heart size={20} className={isFav ? 'fill-accent' : ''} />
                  {isFav ? 'Favorited' : 'Favorite'}
                </button>
                <button className="w-12 h-12 shrink-0 bg-surface border border-white/10 text-white rounded-xl flex items-center justify-center hover:bg-white/5 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
            
            {/* Information Sidebar */}
            <div className="w-full glass-panel rounded-xl p-5 mt-6 space-y-4">
              <h3 className="font-bold text-white border-b border-white/10 pb-2">Information</h3>
              <div className="text-sm space-y-2">
                <p><span className="text-gray-400">Type:</span> <span className="text-white float-right">{anime.type}</span></p>
                <p><span className="text-gray-400">Episodes:</span> <span className="text-white float-right">{anime.episodes || 'Unknown'}</span></p>
                <p><span className="text-gray-400">Status:</span> <span className="text-white float-right">{anime.status}</span></p>
                <p><span className="text-gray-400">Aired:</span> <span className="text-white float-right">{anime.aired?.string}</span></p>
                <p><span className="text-gray-400">Studios:</span> <span className="text-white float-right">{anime.studios?.map(s => s.name).join(', ')}</span></p>
                <p><span className="text-gray-400">Source:</span> <span className="text-white float-right">{anime.source}</span></p>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="w-full md:w-3/4 md:pt-16">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
                {anime.title_english || anime.title}
              </h1>
              {anime.title_english && anime.title !== anime.title_english && (
                <h2 className="text-xl text-gray-400 mb-6 font-medium">{anime.title}</h2>
              )}

              <div className="flex flex-wrap items-center gap-4 mb-8">
                {anime.score && (
                  <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-lg text-white font-bold">
                    <Star className="text-yellow-400 fill-yellow-400" size={18} />
                    <span className="text-lg">{anime.score}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Rank</span>
                  <span className="text-white font-bold bg-surface px-2 py-1 rounded">#{anime.rank}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Popularity</span>
                  <span className="text-white font-bold bg-surface px-2 py-1 rounded">#{anime.popularity}</span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-8">
                {anime.genres?.map(g => (
                  <span key={g.mal_id} className="px-4 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-medium">
                    {g.name}
                  </span>
                ))}
              </div>

              {/* Video Player Section */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Youtube className="text-accent" /> Media
                </h3>
                <VideoPlayer 
                  embedUrl={anime.trailer?.embed_url} 
                  title={anime.title_english || anime.title} 
                  posterImage={anime.trailer?.images?.maximum_image_url || anime.images.webp.large_image_url} 
                />
              </div>

              {/* Synopsis */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-white mb-4">Synopsis</h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                  {anime.synopsis || 'No synopsis available.'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Characters Section */}
        {characters.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-6">Characters</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {characters.map((char) => (
                <div key={char.character.mal_id} className="glass-panel rounded-xl overflow-hidden flex flex-col">
                  <img src={char.character.images.webp.image_url} alt={char.character.name} className="w-full aspect-[3/4] object-cover" />
                  <div className="p-3">
                    <p className="font-bold text-white text-sm line-clamp-1">{char.character.name}</p>
                    <p className="text-xs text-gray-400">{char.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-6">Recommended Anime</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {recommendations.map((rec) => (
                <AnimeCard key={rec.mal_id} anime={rec} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      <TrailerModal 
        isOpen={showTrailer} 
        onClose={() => setShowTrailer(false)} 
        trailerUrl={anime.trailer?.embed_url} 
      />
    </div>
  );
};

export default AnimeDetails;
