import { fetchAllPosts } from '@/lib/api/hashnode';
import { getAllPosts } from '@/lib/server/mdxServer';
import { ArticlesClient } from '@/components/article';
import { PageHeader } from '@/components/ui';

export default async function ArticlesPage() {
  // Fetch initial posts from Hashnode API and MDX posts
  const [{ posts, pageInfo }, mdxPosts] = await Promise.all([
    fetchAllPosts(),
    getAllPosts()
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <PageHeader
        title="All Articles"
        description="Explore all articles on different topics like Web Development, System Design, Computer Science, etc."
      />

      <ArticlesClient
        initialPosts={posts}
        mdxPosts={mdxPosts}
        initialPageInfo={pageInfo}
      />
    </div>
  );
}
