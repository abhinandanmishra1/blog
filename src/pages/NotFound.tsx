import React from 'react';
import { BackButton } from '../components';
import { FileX, Search } from 'lucide-react';

interface NotFoundProps {
  type?: 'article' | 'page';
  searchTerm?: string;
}

export const NotFound: React.FC<NotFoundProps> = ({ 
  type = 'page', 
  searchTerm 
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <BackButton />
      
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center">
            <FileX className="w-8 h-8 text-neutral-400" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4">
          {type === 'article' ? 'Article Not Found' : 'Page Not Found'}
        </h1>
        
        <p className="text-xl text-neutral-400 mb-8">
          {type === 'article' 
            ? searchTerm 
              ? `The article "${searchTerm}" could not be found.`
              : "The article you're looking for doesn't exist."
            : "The page you're looking for doesn't exist."
          }
        </p>
        
        <div className="space-y-4">
          <p className="text-neutral-500">
            {type === 'article' 
              ? "This article might have been moved, deleted, or the URL might be incorrect."
              : "This page might have been moved, deleted, or the URL might be incorrect."
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <BackButton 
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
              fallbackTo={type === 'article' ? '/articles' : '/'}
            />
            
            <a
              href={type === 'article' ? '/articles' : '/'}
              className="inline-flex items-center gap-2 border border-neutral-600 hover:border-neutral-500 text-neutral-300 hover:text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Search className="w-4 h-4" />
              {type === 'article' ? 'Browse Articles' : 'Go Home'}
            </a>
          </div>
        </div>
        
        {type === 'article' && (
          <div className="mt-12 p-6 bg-neutral-800/50 rounded-lg border border-neutral-700">
            <h3 className="text-lg font-semibold text-white mb-3">Looking for something specific?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <a href="/articles" className="text-blue-400 hover:text-blue-300 transition-colors">
                📚 All Articles
              </a>
              <a href="/categories" className="text-blue-400 hover:text-blue-300 transition-colors">
                🏷️ Categories
              </a>
              <a href="/series" className="text-blue-400 hover:text-blue-300 transition-colors">
                📖 Series
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};