import Image from 'next/image';
import { notFound } from 'next/navigation';
import { siteMetadata } from '@/data/metadata';
import { getIcon } from '@/lib/getIcon';
import { getAllPostsTagWise } from '@/lib/api/hashnode';
import { ArticleCard2 } from '@/components/cards';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const currentCategory = siteMetadata.categories.find(category => category.tag === slug);

  if (!currentCategory) {
    notFound();
  }

  // Get all posts and filter by category/tag using API
  const tagWisePosts = await getAllPostsTagWise();
  const categoryPosts = tagWisePosts[slug] || [];

  const Icon = getIcon(currentCategory.icon, currentCategory.color, "w-12 h-12");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <Link
        href="/categories"
        className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Categories
      </Link>

      <div className="relative rounded-2xl overflow-hidden mb-12 h-[300px]">
        <Image
          src={currentCategory.coverImage}
          alt={currentCategory.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${currentCategory.color}20` }}
            >
              {Icon}
            </div>
            <h1 className="text-4xl font-bold text-white">
              {currentCategory.title}
            </h1>
          </div>

          <p className="text-lg text-zinc-300 max-w-3xl">
            {currentCategory.description}
          </p>

          <div className="mt-4 text-sm text-zinc-400">
            {categoryPosts.length} articles
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {categoryPosts.map((article) => (
          <ArticleCard2 key={article.slug} article={article} />
        ))}
      </div>

      {categoryPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-zinc-400">No articles found in this category</p>
        </div>
      )}
    </div>
  );
}
