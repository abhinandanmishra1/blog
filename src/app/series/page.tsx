import { PageHeader } from "@/components/ui/PageHeader";
import { SeriesGrid } from "@/components/ui/SeriesGrid";
import { getAllSeries } from "@/lib/server/mdxServer";

export default function SeriesPage() {
  const seriesList = getAllSeries();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <PageHeader
        title="Learning Series & Curricula"
        description="Structured, multi-part engineering deep dives designed to take you from foundational concepts to production-grade implementations."
      />
      <SeriesGrid first={Infinity} seriesList={seriesList as any} />
    </div>
  );
}
