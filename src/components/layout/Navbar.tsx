'use client'

import Link from 'next/link';
import { Menu } from 'lucide-react';
import React, { useState } from 'react';
import { siteMetadata } from '../../data/metadata';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-white font-bold text-xl hover:text-blue-400 transition-colors">
                {siteMetadata.title}
              </Link>
            </div>
          </div>
          <div className="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-8">
            <Link href="/articles" className="text-neutral-300 hover:text-white transition-colors duration-300 px-3 py-2">Articles</Link>
            <Link href="/categories" className="text-neutral-300 hover:text-white transition-colors duration-300 px-3 py-2">Categories</Link>
            <Link href="/series" className="text-neutral-300 hover:text-white transition-colors duration-300 px-3 py-2">Series</Link>
            <Link href="/about" className="text-neutral-300 hover:text-white transition-colors duration-300 px-3 py-2">About</Link>
          </div>
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-neutral-800/80 backdrop-blur-lg fixed inset-0 z-40 pt-16">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="text-neutral-300 hover:text-white block px-3 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/articles"
              className="text-neutral-300 hover:text-white block px-3 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Articles
            </Link>
            <Link
              href="/categories"
              className="text-neutral-300 hover:text-white block px-3 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="text-neutral-300 hover:text-white block px-3 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
