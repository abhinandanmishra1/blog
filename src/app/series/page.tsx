import { PageHeader } from "@/components/ui/PageHeader";
import { SeriesGrid } from "@/components/ui/SeriesGrid";
import { getAllSeries } from "@/lib/api/hashnode";

export default async function SeriesPage() {
  // Fetch all series from Hashnode
  const seriesList = await getAllSeries();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <PageHeader
        title="Learning Series"
        description="Structured learning paths to master different technologies"
      />
      <SeriesGrid first={Infinity} seriesList={seriesList} />
    </div>
  );
}
