"use client"
import { CategoryCard } from "../ui";
import { getIcon } from "../../lib";
import { siteMetadata } from "../../data/metadata";
// import { useGetAllPostsTagWise } from "../../hooks/useGetAllPostsTagWise";
import { useMemo } from "react";

export const CategoryGrid = ({ first = 3 }: { first?: number }) => {
  // const { data: tagWisePosts } = useGetAllPostsTagWise();
  const tagWisePosts: Record<string, any[]> | null = null as any; // TODO: Implement useGetAllPostsTagWise hook
  const categories = useMemo(() => {
    const categoriesData = siteMetadata.categories.slice(0, first).map((category) => ({
      ...category,
      icon: getIcon(category.icon, category.color),
    }));

    // if(tagWisePosts) {
    //   return categoriesData.filter((category) => tagWisePosts?.[category.tag]?.length || 0 > 0);
    // }

    return categoriesData;
  }, [first]);

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
