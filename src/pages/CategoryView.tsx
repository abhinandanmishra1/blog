import { Article2ViewLoader, ArticleCard2 } from '../components';

import { getIcon } from '../utils';
import { siteMetadata } from '../data/metadata';
import { useGetAllPostsTagWise } from '../hooks';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

export const CategoryView = () => {
  const { slug } = useParams();
  const { data: tagWisePosts, isLoading, error } = useGetAllPostsTagWise();
  
  const categoryPosts = tagWisePosts?.[slug as string] || [];
  const currentCategory = siteMetadata.categories.find(category => category.tag === slug);

  const Icon = useMemo(() => {
    if (!currentCategory?.icon) return null;
    return getIcon(currentCategory?.icon, currentCategory?.color, "w-12 h-12");
  }, [currentCategory?.icon, currentCategory?.color]);
  
  if (isLoading) return <Article2ViewLoader />;
  if (error) return <div>Category not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="relative rounded-2xl overflow-hidden mb-12">
        <img
          src={currentCategory?.coverImage}
          alt={currentCategory?.title}
          className="w-full h-[300px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${currentCategory?.color}20` }}
            >
              {Icon}
            </div>
            <h1 className="text-4xl font-bold text-white">
              {currentCategory?.title || 'Category'}
            </h1>
          </div>
          
          <p className="text-lg text-zinc-300 max-w-3xl">
            {currentCategory?.description || `Articles tagged with ${currentCategory?.title}`}
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
};
