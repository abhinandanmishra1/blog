import { CategoryGrid } from "../ui/CategoryGrid";
import { getAllPostsTagWise } from "@/lib/api/hashnode";

export const Categories = async () => {
  // Fetch tag-wise posts for category counts
  const tagWisePosts = await getAllPostsTagWise();

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Categories</h2>
          <p className="text-gray-300">Explore articles by topic</p>
        </div>

        <CategoryGrid first={6} />
      </div>
    </section>
  );
};
