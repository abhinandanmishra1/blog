import Link from 'next/link';
import Image from 'next/image';
import { getPreviewPosts } from '@/lib/api/hashnode';

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
            <div
              key={post.slug}
              className="group relative bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 ease-out hover:border-zinc-700 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/0 via-zinc-900/0 to-zinc-900/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />

              <div className="flex flex-col">
                <div className="aspect-[16/9] relative">
                  <Image
                    src={post.coverImage?.url || ''}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <div className="flex gap-3 mb-4">
                    {post.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag.slug}
                        className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-zinc-200 mb-3 transition-colors duration-300 group-hover:text-white">
                    <Link href={`/articles/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-zinc-400 mb-4 line-clamp-2">{post.brief}</p>

                  <div className="flex items-center gap-6 text-zinc-400">
                    <div className="flex items-center gap-2">
                      <Image
                        src={post.author?.profilePicture || ''}
                        alt={post.author?.name || ''}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm">{post.author?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{post.readTimeInMinutes} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
