import Link from 'next/link';
import { getPreviewPosts } from '@/lib/api/hashnode';
import { ArticleCard } from '@/components/cards';

export const ArticleGrid = async () => {
  const posts = await getPreviewPosts();

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Latest Articles</h2>
          <p className="text-gray-300">Discover insights on web development, system design, and more.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <ArticleCard key={post.slug} article={post} />
          ))}
        </div>

        {posts.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href="/articles"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              View All Articles
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
