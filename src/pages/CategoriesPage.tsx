import { CategoryGrid, PageHeader } from "../components";

export const CategoriesPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <PageHeader title="Explore by Category" description="Dive into various technical topics and find exactly what you're looking for" />
      <CategoryGrid first={Infinity} />
    </div>
  );
};
