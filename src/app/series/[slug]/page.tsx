import { notFound } from 'next/navigation';
import { getSeries } from '@/lib/api/hashnode';
import { ArticleCard2 } from '@/components/cards';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Users, Star } from 'lucide-react';

interface SeriesPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { slug } = await params;

  try {
    const series = await getSeries(slug);

    if (!series) {
      notFound();
    }

    const rating = (() => {
      if (series.views > 1000) return 5;
      if (series.views > 500) return 4.5;
      if (series.views > 200) return 4;
      if (series.views > 100) return 3.5;
      return 3;
    })();

    const views = (() => {
      if (series.views > 1000) return '1k+';
      if (series.views > 500) return '500+';
      if (series.views > 200) return '200+';
      if (series.views > 100) return '100+';
      return series.views;
    })();

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Link
          href="/series"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Series
        </Link>

        <div className="relative rounded-2xl overflow-hidden mb-12">
          <div className="w-full h-[300px] md:h-[400px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 bg-blue-500/20">
                <BookOpen className="w-8 h-8 text-blue-400" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">{series.name}</h1>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <p className="text-lg text-zinc-300 max-w-3xl mb-4">
              {series.description?.html}
            </p>
            <div className="flex items-center gap-6 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{series.posts?.edges.length} articles</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{views} reads</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>⭐ {rating}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 flex flex-col gap-2">
          {series.posts?.edges?.map((article) => (
            <ArticleCard2 key={article.node.slug} article={article.node} />
          ))}
        </div>

        {(!series.posts?.edges || series.posts.edges.length === 0) && (
          <div className="text-center py-12">
            <p className="text-zinc-400">No articles found in this series</p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    notFound();
  }
}
