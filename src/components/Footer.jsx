import React from 'react';
import { Github, Twitter, Instagram, Tv } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-white/5 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Tv className="text-primary w-6 h-6" />
              <span className="font-bold text-lg tracking-tight text-white">
                Ani<span className="text-primary">Discover</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-md">
              Your ultimate destination for discovering new anime, tracking your favorites, 
              and exploring the vast world of Japanese animation. Powered by Jikan API.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/search" className="hover:text-primary transition-colors">Search</a></li>
              <li><a href="/favorites" className="hover:text-primary transition-colors">Favorites</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} AniDiscover. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            Data provided by <a href="https://jikan.moe" target="_blank" rel="noreferrer" className="text-primary hover:underline">Jikan API</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
