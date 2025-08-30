import { SeriesCard } from "./SeriesCard";
import { getAllSeries } from "@/lib/api/hashnode";

interface SeriesGridProps {
  first?: number;
  seriesList?: any[];
}

export const SeriesGrid = ({ first = 3, seriesList }: SeriesGridProps) => {
  if (!seriesList) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {seriesList.slice(0, first).map((series) => (
        <SeriesCard key={series.name} series={series} />
      ))}
    </div>
  );
};
