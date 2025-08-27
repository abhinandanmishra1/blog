import { useFetchPost } from './useFetchPost';
import { getMDXArticle, mdxArticleExists } from '../utils/mdxArticles';

export const useIntegratedArticle = (slug: string | undefined) => {
  // Check if it's an MDX article first
  const isMDXArticle = slug ? mdxArticleExists(slug) : false;
  
  // Use the Hashnode hook only if it's not an MDX article
  const hashnodeQuery = useFetchPost(slug, {
    enabled: !!slug && !isMDXArticle
  });

  if (isMDXArticle && slug) {
    const mdxArticle = getMDXArticle(slug);
    return {
      data: mdxArticle ? { type: 'mdx' as const, data: mdxArticle } : null,
      isLoading: false,
      error: mdxArticle ? null : new Error('MDX article not found'),
      isError: !mdxArticle
    };
  }

  // Return Hashnode query result, transforming the data structure
  return {
    data: hashnodeQuery.data ? { type: 'hashnode' as const, data: hashnodeQuery.data } : null,
    isLoading: hashnodeQuery.isLoading,
    error: hashnodeQuery.error,
    isError: hashnodeQuery.isError
  };
};