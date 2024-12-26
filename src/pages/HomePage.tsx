import { AboutAuthor, ArticleGrid, Categories, Hero, Newsletter } from '../components';

import { mockUser } from '../data/mockData';
import { useFetchPreviewPosts } from '../hooks/useFetchPreviewPosts';

export function HomePage() {
  const {data: articles, isLoading, error} = useFetchPreviewPosts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading articles</div>;
  if (!articles) return <div>No articles found</div>;

  return (
    <>
      <Hero />
      <ArticleGrid 
        title="Latest Articles" 
        articles={articles}
        isLoading={isLoading}
      />
      <AboutAuthor user={mockUser} />
      <Categories />
      <Newsletter />
    </>
  );
}
