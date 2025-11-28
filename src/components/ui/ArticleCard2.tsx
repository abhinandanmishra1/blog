"use client"
import Image from 'next/image';
import { Calendar, Clock, User } from "lucide-react";

import { formatDate } from "../../lib";
import { useRouter } from "next/navigation";

interface Article {
  slug: string;
  title: string;
  brief: string;
  coverImage?: {
    url: string;
  };
  tags: Array<{
    slug: string;
    name: string;
  }>;
  author: {
    name: string;
    profilePicture: string;
  };
  readTimeInMinutes: number;
  publishedAt: string;
}

export const ArticleCard2 = ({ article }: { article?: Article }) => {
  const router = useRouter();
  if (!article) return null;

  return (
    <div
      className="group relative bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 ease-out hover:border-zinc-700 cursor-pointer"
      onClick={() => router.push(`/articles/${article.slug}`)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/0 via-zinc-900/0 to-zinc-900/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />

      <div className="flex flex-col md:flex-row">
        <div className="md:w-48 lg:w-64">
          <div className="aspect-[16/9] md:aspect-square relative">
            <Image
              src={article.coverImage?.url || ''}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="flex-1 p-6">
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

          <h3 className="text-xl font-bold text-zinc-200 mb-3 transition-colors duration-300 group-hover:text-white">
            {article.title}
          </h3>

          <p className="text-zinc-400 mb-4 line-clamp-2">{article.brief}</p>

          <div className="flex items-center gap-6 text-zinc-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="text-sm">{article.author?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{article.readTimeInMinutes} min</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{formatDate(article.publishedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
