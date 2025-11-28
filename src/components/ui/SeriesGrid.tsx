"use client"
import { SeriesCard } from "./SeriesCard";
// import { useFetchAllSeries } from "../../hooks/useFetchAllSeries";

export const SeriesGrid = ({ first = 3 }) => {
  // const { data: seriesList, isLoading, error } = useFetchAllSeries();
  // TODO: Implement useFetchAllSeries hook for Next.js
  const seriesList: any[] | null = null as any;
  const isLoading = false;
  const error = null;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>There was an error fetching the series</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {seriesList?.slice(0, first).map((series) => (
        <SeriesCard key={series.name} series={series} />
      ))}
    </div>
  );
};
