import {ArticleCard} from '../ui/ArticleCard';
import { ArticleLoader } from '../ui';
import { useFetchPreviewPosts } from '../../hooks/useFetchPreviewPosts';

export const ArticleGrid= () => {
  const { data: articles, isLoading, error } = useFetchPreviewPosts();

  if (isLoading) {
    return (
      <section className="bg-neutral-900 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className='text-3xl md:text-4xl font-bold mb-12 text-white text-center'>Latest Articles</h1>
        <ArticleLoader />
      </section>
    );
  }

  if (error) return <div>Error loading articles</div>;
  if (!articles) return <div>No articles found</div>;

  return (
    <section className="bg-neutral-900 py-24" id="articles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles?.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};
