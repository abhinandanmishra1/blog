import React from 'react';
import { BlogContent } from '../blog/BlogContent';
import { FullPost } from '@/types';
import { ViewSeries } from '../blog';
import { MdxPost } from '@/types/mdx';
import { MdxRenderer } from './MdxRenderer';
import { ArticleHeader } from './ArticleHeader';

interface IntegratedArticleRendererProps {
  hashnodePost?: FullPost;
  mdxPost?: MdxPost;
}

export const IntegratedArticleRenderer: React.FC<IntegratedArticleRendererProps> = ({
  hashnodePost,
  mdxPost
}) => {
  // Render Hashnode post
  if (hashnodePost) {
    return (
      <article>
        <ArticleHeader title={hashnodePost.title} author={hashnodePost.author} publishedAt={hashnodePost.publishedAt} readTimeInMinutes={hashnodePost.readTimeInMinutes} />

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
    // const { content, date, excerpt, tags } = mdxPost;
  
    return (
      <MdxRenderer post={mdxPost} />
    );
  }

  return null;
};