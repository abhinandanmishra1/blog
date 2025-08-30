import { useFetchPost } from './useFetchPost';
import { getMDXArticle, mdxArticleExists } from '../utils/mdxArticles';

export const useIntegratedArticle = (slug: string | undefined) => {
  const isMDXArticle = slug ? mdxArticleExists(slug) : false;

  if (isMDXArticle && slug) {
    const mdxArticle = getMDXArticle(slug);
    return {
      data: mdxArticle ? { type: 'mdx' as const, data: mdxArticle } : null,
      isLoading: false,
      error: mdxArticle ? null : new Error('MDX article not found'),
      isError: !mdxArticle
    };
  }

  const hashnodeQuery = useFetchPost(slug);


  // Return Hashnode query result, transforming the data structure
  return {
    data: hashnodeQuery.data ? { type: 'hashnode' as const, data: hashnodeQuery.data } : null,
    isLoading: hashnodeQuery.isLoading,
    error: hashnodeQuery.error,
    isError: hashnodeQuery.isError
  };
};