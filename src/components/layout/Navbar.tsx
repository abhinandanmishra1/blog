import { Link, useNavigate } from 'react-router-dom';

import { Menu } from 'lucide-react';
import React from 'react';
import { siteMetadata } from '../../data/metadata';

interface NavbarProps {
  onMenuToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  const navigate = useNavigate();

  return (
    <nav className="border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <span className="text-white font-bold text-xl">{siteMetadata.title}</span>
            </div>
          </div>
          <div className="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-8">
            <Link to="articles" className="text-neutral-300 hover:text-white transition-colors duration-300 px-3 py-2">Articles</Link>
            <Link to="categories" className="text-neutral-300 hover:text-white transition-colors duration-300 px-3 py-2">Categories</Link>
            <Link to="series" className="text-neutral-300 hover:text-white transition-colors duration-300 px-3 py-2">Series</Link>
            <Link to="about" className="text-neutral-300 hover:text-white transition-colors duration-300 px-3 py-2">About</Link>
          </div>
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={onMenuToggle}
              className="text-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
