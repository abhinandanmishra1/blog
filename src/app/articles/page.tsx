import { fetchAllPosts } from '@/lib/api/hashnode';
import { ArticleCard } from '@/components/articles';
import { PageHeader } from '@/components/ui';

export default async function ArticlesPage() {
  // Fetch all posts from Hashnode API
  const { posts } = await fetchAllPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <PageHeader 
        title="All Articles" 
        description="Explore all articles on different topics like Web Development, System Design, Computer Science, etc." 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-zinc-400">No articles found</p>
        </div>
      )}
    </div>
  );
}
