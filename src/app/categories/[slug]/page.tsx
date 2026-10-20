import Image from 'next/image';
import { siteMetadata } from '@/data/metadata';
import { getIcon } from '@/lib/getIcon';
import { getAllPosts, getPostsByTag } from '@/lib/server/mdxServer';
import { ArticleCard2 } from '@/components/cards';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tagSlugs = new Set<string>();
  posts.forEach((p) => {
    (p.tags || []).forEach((t) => tagSlugs.add(t.slug));
  });
  siteMetadata.categories.forEach((c) => tagSlugs.add(c.tag));

  return Array.from(tagSlugs).map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const currentCategory = siteMetadata.categories.find((category) => category.tag === slug) || {
    title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
    tag: slug,
    description: `All technical articles filed under #${slug}`,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
    color: '#3B82F6',
    icon: 'Layers',
  };

  const categoryPosts = getPostsByTag(slug);
  const Icon = getIcon(currentCategory.icon, currentCategory.color, 'w-12 h-12');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <Link
        href="/categories"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Categories
      </Link>

      <div className="relative rounded-2xl overflow-hidden mb-12 h-[260px] sm:h-[300px] border border-zinc-800">
        <Image
          src={currentCategory.coverImage}
          alt={currentCategory.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10"
              style={{ backgroundColor: `${currentCategory.color}20` }}
            >
              {Icon}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              {currentCategory.title}
            </h1>
          </div>

          <p className="text-sm sm:text-base text-zinc-300 max-w-3xl">
            {currentCategory.description}
          </p>

          <div className="mt-3 text-xs font-mono text-zinc-400">
            {categoryPosts.length} article{categoryPosts.length === 1 ? '' : 's'} published
          </div>
        </div>
      </div>

      <div className="space-y-6 flex flex-col">
        {categoryPosts.map((article) => (
          <ArticleCard2 key={article.slug} article={article as any} />
        ))}
      </div>

      {categoryPosts.length === 0 && (
        <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl space-y-2">
          <p className="text-zinc-300 font-semibold">No articles found in this category yet</p>
          <p className="text-xs text-zinc-500">
            More deep dives for #{slug} will be published soon.
          </p>
        </div>
      )}
    </div>
  );
}
