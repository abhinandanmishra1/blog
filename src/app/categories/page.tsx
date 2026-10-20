import { CategoryGrid } from "@/components/ui/CategoryGrid";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllPosts } from "@/lib/server/mdxServer";

export default function CategoriesPage() {
  const posts = getAllPosts();

  const tagWisePosts: Record<string, any[]> = {};
  posts.forEach((post) => {
    (post.tags || []).forEach((t) => {
      if (!tagWisePosts[t.slug]) {
        tagWisePosts[t.slug] = [];
      }
      tagWisePosts[t.slug].push(post);
    });
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <PageHeader
        title="Explore by Category & Topic"
        description="Filter and discover in-depth articles across distributed systems, algorithms, system design, and modern frontend development."
      />
      <CategoryGrid first={Infinity} tagWisePosts={tagWisePosts} />
    </div>
  );
}
