import { CategoryCard } from "./CategoryCard";
import { getIcon } from "@/lib/getIcon";
import { siteMetadata } from "@/data/metadata";

interface CategoryGridProps {
  first?: number;
  tagWisePosts?: Record<string, any[]>;
}

export const CategoryGrid = ({ first = 3, tagWisePosts }: CategoryGridProps) => {
  const categories = siteMetadata.categories.slice(0, first).map((category) => ({
    ...category,
    icon: getIcon(category.icon, category.color),
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <CategoryCard
          key={category.title}
          slug={category.tag}
          icon={category.icon}
          title={category.title}
          description={category.description}
          count={tagWisePosts?.[category.tag]?.length || 0}
          color={category.color}
        />
      ))}
    </div>
  );
};
