import { getAllSeries, getPostsBySeries } from '@/lib/server/mdxServer';
import { ArticleCard2 } from '@/components/cards';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Star, Sparkles } from 'lucide-react';

interface SeriesPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const allSeries = getAllSeries();
  return allSeries.map((s) => ({ slug: s.slug }));
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { slug } = await params;
  const allSeries = getAllSeries();
  const series = allSeries.find((s) => s.slug.toLowerCase() === slug.toLowerCase()) || {
    name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
    slug,
    description: `Structured multi-part series covering ${slug.replace(/-/g, ' ')}.`,
    postCount: 0,
  };

  const seriesPosts = getPostsBySeries(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <Link
        href="/series"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Series
      </Link>

      <div className="relative rounded-2xl overflow-hidden mb-12 border border-zinc-800 bg-zinc-900/60 p-8 sm:p-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Engineering Series</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {series.name}
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 max-w-3xl leading-relaxed">
          {series.description || `A comprehensive curriculum of guides and architectural analyses.`}
        </p>

        <div className="flex items-center gap-6 text-xs sm:text-sm text-zinc-400 pt-2 font-mono">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>{seriesPosts.length} article{seriesPosts.length === 1 ? '' : 's'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>4.9 / 5.0 Rating</span>
          </div>
        </div>
      </div>

      <div className="space-y-6 flex flex-col">
        {seriesPosts.map((article) => (
          <ArticleCard2 key={article.slug} article={article as any} />
        ))}
      </div>

      {seriesPosts.length === 0 && (
        <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl space-y-2">
          <p className="text-zinc-300 font-semibold">No articles found in this series yet</p>
          <p className="text-xs text-zinc-500">
            More guides will be published soon.
          </p>
        </div>
      )}
    </div>
  );
}
