import React from 'react';
import { BlogContent } from '../blog/BlogContent';
import { FullPost, Tag } from '@/types';
import { ViewSeries } from '../blog';
import { BlogPost } from '@/lib/mdx';
import { formatDate } from '@/lib';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface IntegratedArticleRendererProps {
  hashnodePost?: FullPost;
  mdxPost?: BlogPost;
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
    console.log(mdxPost)
    const { content, date, excerpt, tags } = mdxPost;
    
    // if (!MDXComponent || typeof MDXComponent !== 'function') {
    //   console.error('Invalid MDX component:', MDXComponent);
    //   return (
    //     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
    //       <h1 className="text-2xl font-bold text-white mb-4">Error Loading Article</h1>
    //       <p className="text-neutral-400">The MDX component for this article is invalid.</p>
    //     </div>
    //   );
    // }
    
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <article className="prose prose-lg max-w-none">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">{mdxPost.title}</h1>
          {mdxPost.date && (
            <time className="text-gray-400 text-sm">
              {new Date(mdxPost.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
        </header>
        
        <div className="prose prose-lg max-w-none">
          <MDXRemote source={mdxPost.content} />
        </div>
      </article>
    </div>
    );
  }

  return null;
};