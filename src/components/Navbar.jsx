import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Heart, Dices, Tv } from 'lucide-react';
import { api } from '../services/api';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
      setSearchQuery('');
    }
  };

  const handleRandomAnime = async () => {
    try {
      const anime = await api.getRandomAnime();
      if (anime && anime.mal_id) {
        navigate(`/anime/${anime.mal_id}`);
        setIsMobileMenuOpen(false);
      }
    } catch (error) {
      console.error('Failed to get random anime', error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Search', path: '/search' },
    { name: 'Favorites', path: '/favorites' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#040508]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }} 
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative"
            >
              <Tv className="text-primary w-8 h-8 filter drop-shadow-[0_0_8px_rgba(0,242,254,0.6)]" />
              <div className="absolute inset-0 bg-primary/20 blur-md rounded-full -z-10"></div>
            </motion.div>
            <span className="font-bold text-xl tracking-tight text-white hidden sm:block font-display">
              Ani<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Discover</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 relative">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-300 ${isActive ? 'text-black font-semibold' : 'text-gray-300 hover:text-white'}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavTab"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-gradient-to-r from-primary to-primaryHover rounded-full -z-10 shadow-[0_0_15px_rgba(0,242,254,0.5)]"
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
            
            <button 
              onClick={handleRandomAnime}
              className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-gray-300 hover:text-accent transition-colors duration-300 group"
            >
              <Dices size={16} className="group-hover:rotate-180 transition-transform duration-500" />
              Surprise Me
            </button>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block flex-1 max-w-xs ml-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0c0e15]/60 border border-white/[0.08] rounded-full py-1.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/50 transition-all duration-300 placeholder:text-gray-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </form>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-white/[0.06] shadow-xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <form onSubmit={handleSearch} className="relative mt-2">
                <input
                  type="text"
                  placeholder="Search anime..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0c0e15]/80 border border-white/[0.08] rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/50 transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </form>
              <div className="flex flex-col space-y-3 mt-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-base font-medium px-2 py-1 rounded-md transition-colors ${isActive ? 'text-primary bg-primary/10 font-semibold' : 'text-gray-300 hover:text-white'}`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <button 
                  onClick={handleRandomAnime}
                  className="text-base font-medium text-gray-300 hover:text-accent px-2 py-1 text-left flex items-center gap-2 transition-colors"
                >
                  <Dices size={18} />
                  Surprise Me
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
