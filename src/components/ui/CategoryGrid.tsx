import { CategoryCard } from "../ui";
import { getIcon } from "../../utils";
import { siteMetadata } from "../../data/metadata";
import { useGetAllPostsTagWise } from "../../hooks/useGetAllPostsTagWise";
import { useMemo } from "react";

export const CategoryGrid = ({ first = 3 }: { first?: number }) => {
  const { data: tagWisePosts } = useGetAllPostsTagWise();
  const categories = useMemo(() => {
    return siteMetadata.categories.slice(0, first).map((category) => ({
      ...category,
      icon: getIcon(category.icon, category.color),
    }));
  }, [first]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.filter((category) => tagWisePosts?.[category.tag]?.length || 0 > 0).map((category) => (
        <CategoryCard
          key={category.title}
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
