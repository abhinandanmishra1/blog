import { BookOpen, Star, Users } from "lucide-react";

import { Card3D } from "./Card3D";
import { Series } from "../../types";
import { getIcon } from "../../utils";

export const SeriesCard = ({ series }: { series: Series }) => {
  const icon = getIcon(series.icon, series.color);
  return (
    <Card3D color={series.color}>
      <div className="w-full" style={{ perspective: "1000px" }}>
        <div
          className="relative w-full h-full rounded-xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm 
          transition-all duration-200 ease-linear overflow-hidden group hover:border-zinc-700"
        >
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: series.color }}
              >
                {icon}
              </div>
              <div className="flex items-center space-x-1 text-zinc-400">
                <Star className="w-4 h-4" />
                <span className="text-sm">{series.rating}</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-zinc-200 group-hover:text-white transition-colors">
                {series.title}
              </h3>
              <p className="mt-2 text-zinc-400 text-sm">{series.description}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <div className="flex items-center space-x-2 text-zinc-400">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">{series.articleCount} articles</span>
              </div>
              <div className="flex items-center space-x-2 text-zinc-400">
                <Users className="w-4 h-4" />
                <span className="text-sm">{series.readCount}+ reads</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card3D>
  );
};
