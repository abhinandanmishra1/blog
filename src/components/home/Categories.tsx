import { CategoryGrid, PageHeader } from "../ui";

export const Categories = ({ first = 3 }: { first?: number }) => {
  return (
    <section className="bg-neutral-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Explore by Category"
          description="Dive into various technical topics and find exactly what you're looking for"
        />
        <CategoryGrid first={first} />
      </div>
    </section>
  );
};
