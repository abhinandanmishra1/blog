"use client";

import { BookOpen, Star, ArrowUpRight } from "lucide-react";
import { getRandomColorInRGB } from "../../lib";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

export const SeriesCard = ({ series }: { series: any }) => {
  const color = getRandomColorInRGB();
  const router = useRouter();

  const postsCount = series.postCount ?? series.posts?.edges?.length ?? 1;
  const descriptionText = typeof series.description === 'string'
    ? series.description
    : series.description?.text || series.description?.html || 'Curated series of structured engineering guides.';

  const views = series.views || (postsCount * 450);

  const rating = useMemo(() => {
    if (views > 1000) return '5.0';
    if (views > 500) return '4.8';
    if (views > 200) return '4.5';
    return '4.2';
  }, [views]);

  return (
    <div
      onClick={() => router.push(`/series/${series.slug}`)}
      className="cursor-pointer group relative rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200 overflow-hidden flex flex-col justify-between p-6 space-y-4"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div
            className="p-2.5 rounded-lg border border-white/10"
            style={{ backgroundColor: color || '#2563eb' }}
          >
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center space-x-1 text-amber-400 text-xs font-mono">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{rating}</span>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {series.name}
          </h3>
          <p className="mt-2 text-zinc-400 text-sm line-clamp-2 leading-relaxed">
            {descriptionText}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 text-xs text-zinc-400">
        <div className="flex items-center space-x-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{postsCount} article{postsCount === 1 ? '' : 's'}</span>
        </div>
        <div className="flex items-center space-x-1 text-blue-400 font-semibold group-hover:translate-x-0.5 transition-transform">
          <span>Explore</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
