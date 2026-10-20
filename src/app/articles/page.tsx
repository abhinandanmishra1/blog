import { getAllPosts } from '@/lib/server/mdxServer';
import { ArticlesClient } from '@/components/article';
import { PageHeader } from '@/components/ui';

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const initialCount = typeof resolvedSearchParams.count === 'string' ? parseInt(resolvedSearchParams.count) : 9;
  const initialSearchQuery = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : '';
  const initialTags = typeof resolvedSearchParams.tags === 'string' ? resolvedSearchParams.tags.split(',') : [];

  const mdxPosts = getAllPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <PageHeader
        title="All Technical Articles"
        description="Comprehensive engineering deep dives on distributed systems, system design, data structures, and modern web application development."
      />

      <ArticlesClient
        mdxPosts={mdxPosts}
        initialCount={initialCount}
        initialSearchQuery={initialSearchQuery}
        initialTags={initialTags}
      />
    </div>
  );
}
