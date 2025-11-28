import Link from 'next/link';
import { HashnodePostNode } from '@/types/hashnode';
import { MdxPost } from '@/types/mdx';
import { formatDate } from '@/lib/dateUtils';

interface ArticleCardProps {
  article: HashnodePostNode | MdxPost;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  // Helper to check if it's a Hashnode post
  const isHashnode = 'readTimeInMinutes' in article;
  const readTime = isHashnode ? article.readTimeInMinutes : article.readingTime?.minutes;
  const coverImage = isHashnode ? article.coverImage?.url : article.coverImage?.url;

  return (
    <Link href={`/articles/${article.slug}`} className="group relative bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 ease-out hover:border-zinc-700 cursor-pointer block">
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/0 via-zinc-900/0 to-zinc-900/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />

      <div className="flex flex-col">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={coverImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-6">
          <div className="flex gap-3 mb-4">
            {article.tags?.slice(0, 2).map((tag) => (
              <span
                key={tag.slug}
                className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full"
              >
                {tag.name}
              </span>
            ))}
            {!isHashnode && (
              <span className="px-3 py-1 text-xs font-medium bg-purple-500/10 text-purple-400 rounded-full">
                MDX
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-zinc-200 mb-3 transition-colors duration-300 group-hover:text-white">
            {article.title}
          </h3>

          <p className="text-zinc-400 mb-4 line-clamp-2">{article.brief}</p>

          <div className="flex items-center gap-6 text-zinc-400">
            <div className="flex items-center gap-2">
              <img
                src={article.author?.profilePicture}
                alt={article.author?.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm">{article.author?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">{readTime} min</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">{formatDate(article.publishedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
