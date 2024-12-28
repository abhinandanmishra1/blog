import { SeriesArticleCard, SeriesArticleLoader, SeriesViewLoader } from "../components";

import { useGetSeries } from "../hooks/useGetSeries";
import { useParams } from "react-router-dom";

const SeriesView = () => {
  const { slug } = useParams();
  const { series, hasNextPage, isLoading, error, loadMore } = useGetSeries(
    slug as string
  );

  if (isLoading && !series.slug) return <SeriesViewLoader />;
  if (error) return <div>Series not found</div>;

  console.log(series);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="relative rounded-2xl overflow-hidden mb-12">
        <img
          src={series.coverImage}
          alt={series.name}
          className="w-full h-[300px] md:h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="text-4xl font-bold text-white mb-4">{series.name}</h1>
          <p className="text-lg text-zinc-300 max-w-3xl">
            {series.description.html}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {series.posts?.edges?.map((article) => (
          <SeriesArticleCard key={article.node.slug} article={article.node} />
        ))}
      </div>

      {
        isLoading && (
          <div className="flex justify-center mt-6">
            <SeriesArticleLoader />
            <SeriesArticleLoader />
          </div>
        )
      }

      {hasNextPage && (
        <div className="flex justify-center mt-12">
          <button
            onClick={loadMore}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default SeriesView;
