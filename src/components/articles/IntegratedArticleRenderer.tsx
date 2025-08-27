import React from 'react';
import { BlogContent } from '../blog/BlogContent';
import { formatDate } from '../../utils/dateUtils';
import { MDXArticleMetadata } from '../../utils/mdxArticles';
import { FullPost } from '../../types';
import { ViewSeries } from '../blog';

interface IntegratedArticleRendererProps {
  hashnodePost?: FullPost;
  mdxPost?: {
    component: React.ComponentType;
    metadata: MDXArticleMetadata;
  };
}

export const IntegratedArticleRenderer: React.FC<IntegratedArticleRendererProps> = ({
  hashnodePost,
  mdxPost
}) => {
  // Render Hashnode post
  if (hashnodePost) {
    return (
      <article>
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-6">{hashnodePost.title}</h1>
          <div className="flex items-center gap-6 text-neutral-400">
            <div className="flex items-center gap-3">
              <img
                src={hashnodePost.author.profilePicture}
                alt={hashnodePost.author.name}
                className="w-10 h-10 rounded-full"
              />
              <span>{hashnodePost.author.name}</span>
            </div>
            <span>{formatDate(hashnodePost.publishedAt)}</span>
            <span>{hashnodePost.readTimeInMinutes} min read</span>
          </div>
        </header>

        {hashnodePost.coverImage?.url && (
          <div className="mb-12">
            <img
              src={hashnodePost.coverImage.url}
              alt={hashnodePost.title}
              className="w-full rounded-xl"
            />
          </div>
        )}

        {hashnodePost.series && (
          <div className="mb-12">
            <ViewSeries series={hashnodePost.series} />
          </div>
        )}

        <BlogContent post={hashnodePost} />

        <footer className="mt-12 pt-12 border-t border-neutral-800">
          <div className="flex flex-wrap gap-3">
            {hashnodePost.tags.map((tag) => (
              <span
                key={tag.slug}
                className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-full text-sm"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </footer>
      </article>
    );
  }

  // Render MDX post
  if (mdxPost) {
    const { component: MDXComponent, metadata } = mdxPost;
    
    if (!MDXComponent || typeof MDXComponent !== 'function') {
      console.error('Invalid MDX component:', MDXComponent);
      return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Error Loading Article</h1>
          <p className="text-neutral-400">The MDX component for this article is invalid.</p>
        </div>
      );
    }
    
    return (
      <article>
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-6">{metadata.title}</h1>
          <div className="flex items-center gap-6 text-neutral-400">
            <div className="flex items-center gap-3">
              <img
                src={metadata.author.profilePicture}
                alt={metadata.author.name}
                className="w-10 h-10 rounded-full"
              />
              <span>{metadata.author.name}</span>
            </div>
            <span>{formatDate(metadata.publishedAt)}</span>
            <span>{metadata.readTimeInMinutes} min read</span>
          </div>
        </header>

        {metadata.coverImage && (
          <div className="mb-12">
            <img
              src={metadata.coverImage.url}
              alt={metadata.title}
              className="w-full rounded-xl"
            />
          </div>
        )}

        <div className="mdx-content prose prose-neutral prose-invert max-w-none">
          <MDXComponent />
        </div>

        <footer className="mt-12 pt-12 border-t border-neutral-800">
          <div className="flex flex-wrap gap-3">
            {metadata.tags.map((tag) => (
              <span
                key={tag.slug}
                className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-full text-sm"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </footer>
      </article>
    );
  }

  return null;
};