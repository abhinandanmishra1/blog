import { PageHeader, SeriesGrid } from "../components";

// SeriesPage component
export const SeriesPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <PageHeader
        title="Learning Series"
        description="Structured learning paths to master different technologies"
      />
      <SeriesGrid first={Infinity} />
    </div>
  );
};
