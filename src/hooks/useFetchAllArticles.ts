import { useFetchPosts } from './useFetchAllPosts';
import { getAllMDXArticles } from '../utils/mdxArticles';
import { useMemo, useState, useCallback, useEffect } from 'react';

const POSTS_PER_PAGE = 6;

export const useFetchAllArticles = () => {
  const [cursor, setCursor] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Use the existing Hashnode hook
  const hashnodeQuery = useFetchPosts(cursor);
  const mdxArticles = getAllMDXArticles();

  // Transform MDX articles to match Hashnode post structure exactly
  const transformedMDXArticles = useMemo(() => {
    return mdxArticles.map(({ metadata }) => ({
      ...metadata, // Use exact Hashnode structure
      isMDX: true // Flag to identify MDX articles
    }));
  }, [mdxArticles]);

  // Combine ALL articles (both Hashnode and MDX) and sort by date
  const allCombinedArticles = useMemo(() => {
    if (!hashnodeQuery.posts) return transformedMDXArticles;
    
    const combined = [...transformedMDXArticles, ...hashnodeQuery.posts];
    return combined.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [hashnodeQuery.posts, transformedMDXArticles]);

  // Calculate what articles to show for current page (in multiples of 6)
  const paginatedArticles = useMemo(() => {
    const startIndex = 0;
    const endIndex = currentPage * POSTS_PER_PAGE;
    return allCombinedArticles.slice(startIndex, endIndex);
  }, [allCombinedArticles, currentPage]);

  // Calculate if we have more articles to show
  const hasMoreArticles = useMemo(() => {
    const totalShown = currentPage * POSTS_PER_PAGE;
    const moreLocalArticles = totalShown < allCombinedArticles.length;
    const moreHashnodeArticles = hashnodeQuery.pageInfo?.hasNextPage || false;
    
    return moreLocalArticles || moreHashnodeArticles;
  }, [currentPage, allCombinedArticles.length, hashnodeQuery.pageInfo]);

  // When cursor changes (new Hashnode data arrives), check if we should increment page
  useEffect(() => {
    if (cursor && hashnodeQuery.posts) {
      // We just fetched more Hashnode data, so increment page to show more articles
      setCurrentPage(prev => prev + 1);
    }
  }, [cursor, hashnodeQuery.posts]);

  // Load more function
  const loadMore = useCallback(() => {
    const totalShown = currentPage * POSTS_PER_PAGE;
    const moreLocalArticles = totalShown < allCombinedArticles.length;
    
    if (moreLocalArticles) {
      // We have more articles from what we already loaded, just show next page
      setCurrentPage(prev => prev + 1);
    } else if (hashnodeQuery.pageInfo?.hasNextPage) {
      // Need to fetch more from Hashnode
      setCursor(hashnodeQuery.pageInfo.endCursor);
      // Page will be incremented by useEffect when new data arrives
    }
  }, [currentPage, allCombinedArticles.length, hashnodeQuery.pageInfo]);

  // Debug logging (uncomment for debugging)
  // console.log('useFetchAllArticles Debug:', {
  //   cursor,
  //   currentPage,
  //   totalCombined: allCombinedArticles.length,
  //   showing: paginatedArticles.length,
  //   hasMore: hasMoreArticles,
  //   hashnodeCount: hashnodeQuery.posts?.length || 0,
  //   mdxCount: transformedMDXArticles.length,
  //   hashnodeHasNext: hashnodeQuery.pageInfo?.hasNextPage
  // });

  return {
    posts: paginatedArticles,
    pageInfo: {
      hasNextPage: hasMoreArticles,
      endCursor: hashnodeQuery.pageInfo?.endCursor || ''
    },
    isLoading: hashnodeQuery.isLoading,
    error: hashnodeQuery.error,
    isFetching: hashnodeQuery.isFetching,
    loadMore,
    // Additional info for UI
    totalArticles: allCombinedArticles.length,
    currentPage,
    hashnodeCount: hashnodeQuery.posts?.length || 0,
    mdxCount: transformedMDXArticles.length
  };
};