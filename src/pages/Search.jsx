import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { api } from '../services/api';
import AnimeCard from '../components/AnimeCard';
import { ShimmerCard } from '../components/Loader';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  
  // Filters
  const [type, setType] = useState(searchParams.get('type') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');

  // Debounce search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchResults(1, true);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, type, status]);

  const fetchResults = async (pageNum = 1, isNewSearch = false) => {
    if (!query && !type && !status && isNewSearch) {
      setResults([]);
      setHasNextPage(false);
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.searchAnime(query, pageNum, type, status);
      
      if (isNewSearch) {
        setResults(response.data);
      } else {
        setResults(prev => [...prev, ...response.data]);
      }
      
      setHasNextPage(response.pagination?.has_next_page || false);
      setPage(pageNum);
      
      // Update URL
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      if (type) params.set('type', type);
      if (status) params.set('status', status);
      setSearchParams(params);
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasNextPage) {
      fetchResults(page + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[80vh]">
      <h1 className="text-3xl font-bold text-white mb-8">Discover Anime</h1>
      
      {/* Search and Filters */}
      <div className="glass-panel rounded-2xl p-6 mb-10 space-y-6">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title..."
            className="w-full bg-surface border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-lg"
          />
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 text-gray-400">
            <Filter size={18} />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)}
            className="bg-surface border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary"
          >
            <option value="">Any Type</option>
            <option value="tv">TV</option>
            <option value="movie">Movie</option>
            <option value="ova">OVA</option>
            <option value="ona">ONA</option>
          </select>
          
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            className="bg-surface border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary"
          >
            <option value="">Any Status</option>
            <option value="airing">Airing</option>
            <option value="complete">Completed</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {results.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
          {loading && Array(6).fill(0).map((_, i) => <ShimmerCard key={`shimmer-${i}`} />)}
        </div>
      ) : loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {Array(12).fill(0).map((_, i) => <ShimmerCard key={`shimmer-${i}`} />)}
        </div>
      ) : (query || type || status) ? (
        <div className="text-center py-20 text-gray-400">
          <SearchIcon size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">No anime found matching your criteria.</p>
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">Type something to start searching.</p>
        </div>
      )}

      {/* Load More Button */}
      {hasNextPage && !loading && (
        <div className="flex justify-center mt-12">
          <button 
            onClick={loadMore}
            className="bg-surface hover:bg-primary border border-white/10 hover:border-primary text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg"
          >
            Load More Results
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
