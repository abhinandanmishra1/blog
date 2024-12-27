import { ArticleCard, ArticleLoader } from "../components";

import { useFetchPosts } from "../hooks";
import { useState } from "react";

export const Articles = () => {
  const [cursor, setCursor] = useState<string>("");
  const { posts, pageInfo, isLoading, error, isFetching } =
    useFetchPosts(cursor);

  if (isLoading && !posts.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
         <h1 className="text-4xl font-bold text-gray-100 mb-8">All Articles</h1>
        <ArticleLoader />
      </div>
    )
  }
  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        There was an error loading the articles.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl font-bold text-gray-100 mb-8">All Articles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <ArticleCard key={post.id} article={post} />
        ))}
      </div>
      {isLoading}
      {pageInfo?.hasNextPage && !isFetching && (
        <div className="text-center mt-12">
          <button
            onClick={() => setCursor(pageInfo.endCursor)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            disabled={isLoading}
          >
            Load More Articles
          </button>
        </div>
      )}
      {isFetching && (
        <div className="w-full mt-8">
          <ArticleLoader />
        </div>
      )}
    </div>
  );
};
