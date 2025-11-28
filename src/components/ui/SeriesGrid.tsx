"use client"
import { SeriesCard } from "./SeriesCard";
import { HashnodeSeries } from "@/types/hashnode";

interface SeriesGridProps {
  first?: number;
  seriesList?: HashnodeSeries[];
}

export const SeriesGrid = ({ first = 3, seriesList = [] }: SeriesGridProps) => {
  const isLoading = false;
  const error = null;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>There was an error fetching the series</div>;

  if (!seriesList || seriesList.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-400">No series found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {seriesList.slice(0, first).map((series) => (
        <SeriesCard key={series.name} series={series} />
      ))}
    </div>
  );
};
