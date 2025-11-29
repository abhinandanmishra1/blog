import React from 'react';
import Image from 'next/image';
import { ArticleContent } from './content/ArticleContent';
import { Comments } from './comments/Comments';
import { FullPost } from '@/types';
import { ViewSeries } from './ViewSeries';
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
  // Render MDX post first if available (local content priority)
  if (mdxPost) {
    return <MdxRenderer post={mdxPost} />;
  }

  // Render Hashnode post if available
  if (hashnodePost) {
    return (
      <article>
        <ArticleHeader
          title={hashnodePost.title}
          author={hashnodePost.author}
          publishedAt={hashnodePost.publishedAt}
          readTimeInMinutes={hashnodePost.readTimeInMinutes}
        />

        {hashnodePost.coverImage?.url && (
          <div className="mb-12 relative aspect-[21/9]">
            <Image
              src={hashnodePost.coverImage.url}
              alt={hashnodePost.title}
              fill
              className="rounded-xl object-cover"
            />
          </div>
        )}

        {hashnodePost.series && (
          <div className="mb-12">
            <ViewSeries series={hashnodePost.series} />
          </div>
        )}

        <ArticleContent post={hashnodePost} />

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

  return null;
};