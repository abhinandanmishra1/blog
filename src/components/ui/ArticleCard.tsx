import { Card3D } from "./Card3D";
import { Link } from "react-router-dom";
import { HashnodePostNode } from "../../types";
import React from "react";
import { formatDate } from "../../utils/dateUtils";

interface ArticleCardProps {
  article: HashnodePostNode;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link to={`/articles/${article.slug}`}>
      <Card3D color="rgb(255, 255, 255)">
        <article className="bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden transition-transform duration-300">
          <div className="aspect-[16/9]">
            <img
              src={article.coverImage?.url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex gap-3 mb-4">
              {article.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag.slug}
                  className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 min-h-[48px]">
              {article.title}
            </h3>
            <p className="text-neutral-400 mb-4 line-clamp-2 min-h-[48px]">
              {article.brief}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={article.author.profilePicture}
                  alt={article.author.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-neutral-300">
                  {article.readTimeInMinutes} min read
                </span>
              </div>
              <span className="text-sm text-neutral-400">
                {formatDate(article.publishedAt)}
              </span>
            </div>
          </div>
        </article>
      </Card3D>
    </Link>
  );
};
