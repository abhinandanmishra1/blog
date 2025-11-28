import Link from 'next/link';
import Image from 'next/image';
import { HashnodePostNode } from '@/types/hashnode';
import { Card3D } from '@/components/shared/cards/Card3D';

interface ArticleCardProps {
  article: HashnodePostNode;
  variant?: 'default' | '3d';
}

export const ArticleCard = ({ article, variant = 'default' }: ArticleCardProps) => {
  const CardContent = () => (
    <div className="group relative bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 ease-out hover:border-zinc-700">
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/0 via-zinc-900/0 to-zinc-900/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />

      <div className="flex flex-col">
        <div className="aspect-[16/9] relative">
          <Image
            src={article.coverImage?.url || ''}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
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
          </div>

          <h3 className="text-xl font-bold text-zinc-200 mb-3 line-clamp-2 min-h-[48px] transition-colors duration-300 group-hover:text-white">
            {article.title}
          </h3>

          <p className="text-zinc-400 mb-4 line-clamp-2 min-h-[48px]">{article.brief}</p>

          <div className="flex items-center justify-between text-zinc-400">
            <div className="flex items-center gap-4">
              <Image
                src={article.author?.profilePicture || ''}
                alt={article.author?.name || ''}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm">
                {article.readTimeInMinutes} min read
              </span>
            </div>
            <span className="text-sm">
              {new Date(article.publishedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  if (variant === '3d') {
    return (
      <Link href={`/articles/${article.slug}`}>
        <Card3D color="rgb(255, 255, 255)">
          <CardContent />
        </Card3D>
      </Link>
    );
  }

  return (
    <Link href={`/articles/${article.slug}`}>
      <CardContent />
    </Link>
  );
};
