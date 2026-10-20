import Link from 'next/link';
import { getAllPosts } from '@/lib/server/mdxServer';
import { ArticleCard } from '@/components/cards';
import { ArrowUpRight } from 'lucide-react';

export const ArticleGrid = async () => {
  const posts = getAllPosts();
  const previewPosts = posts.slice(0, 6);

  return (
    <section className="py-16 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-xs uppercase font-mono font-semibold tracking-wider text-blue-500 mb-2">
              Recent Publications
            </h2>
            <h3 className="text-3xl font-bold text-white tracking-tight">Latest Articles</h3>
            <p className="text-zinc-400 text-sm mt-1">
              Deep dives on distributed systems, system design, data structures, and frontend engineering.
            </p>
          </div>

          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors self-start sm:self-auto"
          >
            <span>Browse All Articles ({posts.length})</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewPosts.map((post) => (
            <ArticleCard key={post.slug} article={post} />
          ))}
        </div>

        {posts.length > 6 && (
          <div className="text-center mt-12">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              <span>View All Articles</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
