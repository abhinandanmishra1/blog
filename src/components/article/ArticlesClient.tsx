"use client"
import { useState, useMemo, useEffect, useCallback } from 'react';
import { Filter } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ArticleCard } from '@/components/cards';
import { HashnodePostNode, PageInfo } from '@/types/hashnode';
import { MdxPost } from '@/types/mdx';
import { fetchAllPosts, searchPosts } from '@/lib/api/hashnode';
import { SearchInput, TagFilter } from '@/components/ui';

// Wait, I should check if useDebounce exists. If not, I'll implement a simple debounce or create the hook.
// I'll assume I need to create it or implement inline. Let's implement inline debounce or simple effect.

import { useDebounce } from '@/hooks/useDebounce';

interface ArticlesClientProps {
    initialPosts: HashnodePostNode[];
    mdxPosts: MdxPost[];
    initialPageInfo: PageInfo;
    initialCount?: number;
    initialSearchQuery?: string;
    initialTags?: string[];
}

type FilterType = 'all' | 'mdx' | 'hashnode';

export const ArticlesClient = ({
    initialPosts,
    mdxPosts,
    initialPageInfo,
    initialCount = 6,
    initialSearchQuery = '',
    initialTags = []
}: ArticlesClientProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [allHashnodePosts, setAllHashnodePosts] = useState<HashnodePostNode[]>(initialPosts);
    const [pageInfo, setPageInfo] = useState<PageInfo>(initialPageInfo);
    const [isLoading, setIsLoading] = useState(false);
    const [displayCount, setDisplayCount] = useState(initialCount);
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
    const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
    const [isFilterOpen, setIsFilterOpen] = useState(initialTags.length > 0);
    const [searchResults, setSearchResults] = useState<HashnodePostNode[] | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    // Sync state to URL
    const createQueryString = useCallback(
        (params: Record<string, string | number | null>) => {
            const newSearchParams = new URLSearchParams(searchParams.toString());

            Object.entries(params).forEach(([key, value]) => {
                if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
                    newSearchParams.delete(key);
                } else {
                    newSearchParams.set(key, String(value));
                }
            });

            return newSearchParams.toString();
        },
        [searchParams]
    );

    useEffect(() => {
        const params: Record<string, string | number | null> = {};

        if (searchQuery) params.q = searchQuery;
        else params.q = null;

        if (selectedTags.length > 0) params.tags = selectedTags.join(',');
        else params.tags = null;

        if (displayCount > 6) params.count = displayCount;
        else params.count = null;

        const queryString = createQueryString(params);
        // Use replace to avoid cluttering history, or push if we want back button support for every char?
        // Usually replace for search typing, maybe push for filters?
        // Let's use replace for now to keep it simple and avoid history spam while typing.
        // We can optimize later if needed.
        router.replace(`${pathname}?${queryString}`, { scroll: false });
    }, [searchQuery, selectedTags, displayCount, pathname, router, createQueryString]);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    // Search effect
    useEffect(() => {
        const performSearch = async () => {
            if (debouncedSearchQuery.trim()) {
                setIsSearching(true);
                try {
                    // Search Hashnode posts
                    const results = await searchPosts(debouncedSearchQuery);
                    setSearchResults(results);
                } catch (error) {
                    console.error("Search error:", error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults(null);
            }
        };

        performSearch();
    }, [debouncedSearchQuery]);

    const loadMore = async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            // If we need more posts and there are more available, fetch them
            if (displayCount >= allHashnodePosts.length && pageInfo.hasNextPage) {
                const { posts: newPosts, pageInfo: newPageInfo } = await fetchAllPosts(pageInfo.endCursor);
                setAllHashnodePosts([...allHashnodePosts, ...newPosts]);
                setPageInfo(newPageInfo);
            }
            // Increase display count by 6
            setDisplayCount(prev => prev + 6);
        } catch (error) {
            console.error('Error loading more posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const filteredPosts = useMemo(() => {
        let displayedPosts: (HashnodePostNode | MdxPost)[] = [];

        // 1. Determine base source (Hashnode)
        const hashnodeSource = searchResults !== null ? searchResults : allHashnodePosts;

        // 2. Combine (No more type filter, always all)
        displayedPosts = [...mdxPosts, ...hashnodeSource];

        // 3. Apply Search Query to MDX (Hashnode is already searched if results exist)
        if (searchQuery.trim()) {
            const lowerQuery = searchQuery.toLowerCase();
            displayedPosts = displayedPosts.filter(post => {
                const isMdx = !('readTimeInMinutes' in post);
                if (isMdx) {
                    const terms = lowerQuery.split(/\s+/).filter(term => term.length > 0);
                    const title = post.title.toLowerCase();
                    const brief = post.brief ? post.brief.toLowerCase() : '';

                    // Check if ALL terms match title or brief (AND logic)
                    return terms.every(term =>
                        title.includes(term) ||
                        brief.includes(term)
                    );
                }
                return true; // Hashnode posts are already filtered by searchPosts
            });
        }

        // 4. Apply Tag Filter (Multiselect OR logic)
        if (selectedTags.length > 0) {
            displayedPosts = displayedPosts.filter(post =>
                post.tags?.some(tag => selectedTags.includes(tag.slug))
            );
        }

        // 5. Sort
        const sortedPosts = displayedPosts.sort((a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );

        // 6. Slice
        return sortedPosts.slice(0, displayCount);
    }, [mdxPosts, allHashnodePosts, searchResults, searchQuery, selectedTags, displayCount]);

    return (
        <>
            <div className="flex flex-col gap-6 mb-12">
                <div className="flex gap-4">
                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search articles..."
                    />
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`p-2 rounded-lg border transition-colors ${isFilterOpen
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600'
                            }`}
                        aria-label="Toggle filters"
                    >
                        <Filter className="w-5 h-5" />
                    </button>
                </div>

                {isFilterOpen && (
                    <TagFilter selectedTags={selectedTags} onSelectTag={toggleTag} />
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-zinc-400">
                        {isSearching ? 'Searching...' : 'No articles found'}
                    </p>
                </div>
            )}

            {!searchQuery && (displayCount < allHashnodePosts.length || pageInfo.hasNextPage) && (
                <div className="flex justify-center mt-12">
                    <button
                        onClick={loadMore}
                        disabled={isLoading}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Loading...' : 'Load More Articles'}
                    </button>
                </div>
            )}
        </>
    );
};
