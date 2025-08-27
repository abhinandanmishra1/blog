import React from 'react';
import { BackButton } from '../components';
import { getAllMDXArticlesDynamic, getMDXSlugs } from '../utils/mdxDynamic';

export const MDXDebug = () => {
  const articles = getAllMDXArticlesDynamic();
  const slugs = getMDXSlugs();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <BackButton />
      
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-6">MDX Dynamic Loading Debug</h1>
          <p className="text-neutral-400">
            This page shows all dynamically loaded MDX articles with their metadata.
          </p>
        </div>

        <div className="bg-neutral-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">System Info</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-400">Total Articles:</span>
              <span className="text-white">{articles.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Available Slugs:</span>
              <span className="text-white">{slugs.join(', ')}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Loaded Articles</h2>
          
          {articles.length === 0 ? (
            <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
              <p className="text-yellow-300">No MDX articles found. Make sure you have .mdx files in the src/content folder with frontmatter.</p>
            </div>
          ) : (
            articles.map(({ metadata, component }) => (
              <div key={metadata.slug} className="bg-neutral-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{metadata.title}</h3>
                    <p className="text-neutral-400 text-sm">Slug: {metadata.slug}</p>
                  </div>
                  <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded">
                    {metadata.readTimeInMinutes} min read
                  </span>
                </div>
                
                <p className="text-neutral-300 mb-4">{metadata.brief}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-neutral-400">Published:</span>
                    <span className="text-white ml-2">
                      {new Date(metadata.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400">Views:</span>
                    <span className="text-white ml-2">{metadata.views}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400">Author:</span>
                    <span className="text-white ml-2">{metadata.author.name}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400">Tags:</span>
                    <span className="text-white ml-2">
                      {metadata.tags.map(tag => tag.name).join(', ')}
                    </span>
                  </div>
                </div>

                {metadata.series && (
                  <div className="mt-4 p-3 bg-neutral-700 rounded">
                    <span className="text-neutral-400 text-sm">Series:</span>
                    <span className="text-white ml-2">{metadata.series.name}</span>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-neutral-700">
                  <a 
                    href={`/articles/${metadata.slug}`}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    View Article →
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};