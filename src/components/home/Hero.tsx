'use client'

import React from 'react';
import { siteMetadata } from "../../data/metadata";

export const Hero: React.FC = () => {
  const goToArticles = () => {
    const articles = document.getElementById('articles');
    if (articles) {
      articles.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const goToAbout = () => {
    const about = document.getElementById('about');
    if (about) {
      about.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="relative flex items-center min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyek0zNiAyNnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-32 pb-16">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">Welcome to My Tech Blog</h1>
          <p className="text-xl sm:text-2xl text-neutral-300 mb-10 max-w-2xl mx-auto">
            {siteMetadata.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={goToArticles} className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
              Read Articles
            </button>
            <button onClick={goToAbout} className="inline-flex items-center px-8 py-3 border border-neutral-600 text-base font-medium rounded-md text-white hover:bg-neutral-800 transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
