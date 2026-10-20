'use client';

import Link from 'next/link';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import React, { useState } from 'react';
import { siteMetadata } from '../../data/metadata';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const portfolioUrl = "https://abhinandanmishra.in";

  return (
    <nav className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md fixed w-full top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-white font-bold text-lg hover:text-blue-400 transition-colors tracking-tight"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
              <span>{siteMetadata.title}</span>
            </Link>
            <span className="hidden sm:inline-block text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
              Technical Engineering
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/articles"
              className="text-zinc-300 hover:text-white transition-colors"
            >
              Articles
            </Link>
            <Link
              href="/categories"
              className="text-zinc-300 hover:text-white transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/series"
              className="text-zinc-300 hover:text-white transition-colors"
            >
              Series
            </Link>
            <Link
              href="/about"
              className="text-zinc-300 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
              title="Admin Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Admin</span>
            </Link>

            {/* Back to Portfolio Link */}
            <a
              href={portfolioUrl}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 text-xs font-semibold transition-all"
            >
              <span>Portfolio</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-2">
            <a
              href={portfolioUrl}
              className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20"
            >
              Portfolio ↗
            </a>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 py-4 space-y-2">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="block text-sm font-medium text-zinc-300 hover:text-white py-1.5"
          >
            Home
          </Link>
          <Link
            href="/articles"
            onClick={() => setIsMenuOpen(false)}
            className="block text-sm font-medium text-zinc-300 hover:text-white py-1.5"
          >
            Articles
          </Link>
          <Link
            href="/categories"
            onClick={() => setIsMenuOpen(false)}
            className="block text-sm font-medium text-zinc-300 hover:text-white py-1.5"
          >
            Categories
          </Link>
          <Link
            href="/series"
            onClick={() => setIsMenuOpen(false)}
            className="block text-sm font-medium text-zinc-300 hover:text-white py-1.5"
          >
            Series
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMenuOpen(false)}
            className="block text-sm font-medium text-zinc-300 hover:text-white py-1.5"
          >
            About
          </Link>
          <Link
            href="/admin"
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 py-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Dashboard</span>
          </Link>
        </div>
      )}
    </nav>
  );
};
