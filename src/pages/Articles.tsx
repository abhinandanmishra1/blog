import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useFetchAllPosts } from '../hooks';

export const Articles: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const { data: posts, isLoading: loading, error } = useFetchAllPosts(showAll);

  if (loading || !posts) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">There was an error loading the articles.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-100 mb-8">All Articles</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link 
            key={post.slug} 
            to={`/blog/${post.slug}`}
            className="block group"
          >
            <article className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-200 hover:-translate-y-1">
              {post.coverImage && (
                <img 
                  src={post.coverImage.url} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-100 mb-2 group-hover:text-blue-400">
                  {post.title}
                </h2>
                <p className="text-gray-400 mb-4 line-clamp-2">
                  {post.brief}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </time>
                  {post.readTimeInMinutes && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{post.readTimeInMinutes} min read</span>
                    </>
                  )}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {!showAll && posts.length > 0 && (
        <div className="text-center mt-12">
          <button
            onClick={() => setShowAll(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Load More Articles
          </button>
        </div>
      )}
    </div>
  );
};
