import { fetchAllPosts } from '@/lib/api/hashnode';
import { getAllPosts } from '@/lib/server/mdxServer';
import { ArticlesClient } from '@/components/article';
import { PageHeader } from '@/components/ui';

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const initialCount = typeof resolvedSearchParams.count === 'string' ? parseInt(resolvedSearchParams.count) : 6;
  const initialSearchQuery = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : '';
  const initialTags = typeof resolvedSearchParams.tags === 'string' ? resolvedSearchParams.tags.split(',') : [];

  const [{ posts, pageInfo }, mdxPosts] = await Promise.all([
    fetchAllPosts("", initialCount),
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
        initialCount={initialCount}
        initialSearchQuery={initialSearchQuery}
        initialTags={initialTags}
      />
    </div>
  );
}
