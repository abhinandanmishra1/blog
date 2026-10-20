"use client";

import { useState, useMemo, useEffect, useCallback } from 'react';
import { Filter, Search, X } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ArticleCard } from '@/components/cards';
import { MdxPost } from '@/types/mdx';
import { useDebounce } from '@/hooks/useDebounce';

interface ArticlesClientProps {
  initialPosts?: any[];
  mdxPosts?: MdxPost[];
  posts?: MdxPost[];
  initialPageInfo?: any;
  initialCount?: number;
  initialSearchQuery?: string;
  initialTags?: string[];
}

export const ArticlesClient = ({
  mdxPosts = [],
  posts: directPosts,
  initialCount = 9,
  initialSearchQuery = '',
  initialTags = [],
}: ArticlesClientProps) => {
  const allPosts = directPosts || mdxPosts;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [displayCount, setDisplayCount] = useState(initialCount);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const [isFilterOpen, setIsFilterOpen] = useState(initialTags.length > 0);

  // Extract all unique tags
  const availableTags = useMemo(() => {
    const tagMap = new Map<string, { name: string; slug: string; count: number }>();
    allPosts.forEach((post) => {
      (post.tags || []).forEach((t) => {
        const slug = t.slug.toLowerCase();
        const existing = tagMap.get(slug);
        if (existing) {
          existing.count += 1;
        } else {
          tagMap.set(slug, { name: t.name, slug, count: 1 });
        }
      });
    });
    return Array.from(tagMap.values()).sort((a, b) => b.count - a.count);
  }, [allPosts]);

  // Sync query params
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

  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    const params: Record<string, string | number | null> = {};
    if (debouncedSearch) params.q = debouncedSearch;
    if (selectedTags.length > 0) params.tags = selectedTags.join(',');
    if (displayCount > 9) params.count = displayCount;

    const queryString = createQueryString(params);
    router.replace(`${pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false });
  }, [debouncedSearch, selectedTags, displayCount, pathname, router, createQueryString]);

  const toggleTag = (slug: string) => {
    setSelectedTags((prev) =>
      prev.includes(slug) ? prev.filter((t) => t !== slug) : [...prev, slug]
    );
  };

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      // Search query check
      if (debouncedSearch.trim()) {
        const terms = debouncedSearch.toLowerCase().split(/\s+/).filter(Boolean);
        const title = (post.title || '').toLowerCase();
        const brief = (post.brief || '').toLowerCase();
        const content = (post.content?.raw || '').toLowerCase();
        const tagNames = (post.tags || []).map((t) => t.name.toLowerCase()).join(' ');

        const matchesSearch = terms.every(
          (t) => title.includes(t) || brief.includes(t) || tagNames.includes(t) || content.includes(t)
        );
        if (!matchesSearch) return false;
      }

      // Tag filter check
      if (selectedTags.length > 0) {
        const postTags = (post.tags || []).map((t) => t.slug.toLowerCase());
        const matchesTags = selectedTags.some((t) => postTags.includes(t.toLowerCase()));
        if (!matchesTags) return false;
      }

      return true;
    });
  }, [allPosts, debouncedSearch, selectedTags]);

  const displayedPosts = filteredPosts.slice(0, displayCount);
  const hasMore = displayCount < filteredPosts.length;

  return (
    <div className="space-y-8">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, keywords, or topics..."
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
            selectedTags.length > 0 || isFilterOpen
              ? 'border-blue-500/50 bg-blue-500/10 text-blue-400'
              : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Filter className="w-4 h-4" />
          <span>Filter Tags</span>
          {selectedTags.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-mono">
              {selectedTags.length}
            </span>
          )}
        </button>
      </div>

      {/* Tag Filter Drawer */}
      {isFilterOpen && (
        <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>Filter by Topic / Tag:</span>
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="text-blue-400 hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const isSelected = selectedTags.includes(tag.slug);
              return (
                <button
                  key={tag.slug}
                  onClick={() => toggleTag(tag.slug)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    isSelected
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/60'
                  }`}
                >
                  {tag.name} <span className="text-[10px] opacity-75">({tag.count})</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-zinc-400 font-mono pt-2">
        <span>Showing {displayedPosts.length} of {filteredPosts.length} articles</span>
        {(searchQuery || selectedTags.length > 0) && (
          <span className="text-blue-400">Filtered view active</span>
        )}
      </div>

      {/* Grid */}
      {displayedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post) => (
            <ArticleCard key={post.slug} article={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-xl space-y-3">
          <p className="text-base text-zinc-300 font-semibold">No matching articles found</p>
          <p className="text-xs text-zinc-500">
            Try adjusting your search terms or clearing selected tag filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTags([]);
            }}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-500 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="text-center pt-8">
          <button
            onClick={() => setDisplayCount((prev) => prev + 6)}
            className="px-6 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-sm font-semibold transition-colors"
          >
            Load More Articles
          </button>
        </div>
      )}
    </div>
  );
};
