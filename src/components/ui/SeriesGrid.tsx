import { SeriesCard } from "./SeriesCard";
import { siteMetadata } from "../../data/metadata";

export const SeriesGrid = ({ first = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {siteMetadata.seriesList.slice(0, first).map((series) => (
        <SeriesCard key={series.title} series={series} />
      ))}
    </div>
  );
};
