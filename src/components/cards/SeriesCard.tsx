"use client"
import { BookOpen, Star, Users } from "lucide-react";
import Image from 'next/image';

import { Card3D } from './Card3D';
import { HashnodeSeries } from "../../types/hashnode";
import { getRandomColorInRGB } from "../../lib";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

export const SeriesCard = ({ series }: { series: HashnodeSeries }) => {
  const color = getRandomColorInRGB();
  const router = useRouter();

  const rating = useMemo(() => {
    if (series.views > 1000) return 5;
    if (series.views > 500) return 4.5;
    if (series.views > 200) return 4;
    if (series.views > 100) return 3.5;
    return 3;
  }, [series.views]);

  const views = useMemo(() => {
    if (series.views > 1000) return '1k+';
    if (series.views > 500) return '500+';
    if (series.views > 200) return '200+';
    if (series.views > 100) return '100+';
    return series.views;
  }, [series.views]);

  return (
    <Card3D color={color || ''}>
      <div className="w-full" style={{ perspective: "1000px" }} onClick={() => router.push(`series/${series.slug}`)}>
        <div
          className="relative w-full h-full rounded-xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm 
          transition-all duration-200 ease-linear overflow-hidden group hover:border-zinc-700"
        >
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: color }}
              >
                <BookOpen className="w-6 h-6" style={{ color: 'white' }} />
              </div>
              <div className="flex items-center space-x-1 text-zinc-400">
                <Star className="w-4 h-4" />
                <span className="text-sm">{rating}</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-zinc-200 line-clamp-1 group-hover:text-white transition-colors">
                {series.name}
              </h3>
              <p className="mt-2 text-zinc-400 text-sm line-clamp-2">{series.description?.html}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <div className="flex items-center space-x-2 text-zinc-400">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">{series.posts?.edges.length} articles</span>
              </div>
              <div className="flex items-center space-x-2 text-zinc-400">
                <Users className="w-4 h-4" />
                <span className="text-sm">{views} reads</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card3D>
  );
};
