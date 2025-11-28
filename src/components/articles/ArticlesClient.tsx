"use client"
import { useState, useMemo } from 'react';
import { ArticleCard } from './ArticleCard';
import { HashnodePostNode, PageInfo } from '@/types/hashnode';
import { MdxPost } from '@/types/mdx';
import { fetchAllPosts } from '@/lib/api/hashnode';

interface ArticlesClientProps {
    initialPosts: HashnodePostNode[];
    mdxPosts: MdxPost[];
    initialPageInfo: PageInfo;
}

type FilterType = 'all' | 'mdx' | 'hashnode';

export const ArticlesClient = ({ initialPosts, mdxPosts, initialPageInfo }: ArticlesClientProps) => {
    const [posts, setPosts] = useState<HashnodePostNode[]>(initialPosts);
    const [pageInfo, setPageInfo] = useState<PageInfo>(initialPageInfo);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState<FilterType>('all');

    const loadMore = async () => {
        if (!pageInfo.hasNextPage || isLoading) return;

        setIsLoading(true);
        try {
            const { posts: newPosts, pageInfo: newPageInfo } = await fetchAllPosts(pageInfo.endCursor);
            setPosts([...posts, ...newPosts]);
            setPageInfo(newPageInfo);
        } catch (error) {
            console.error('Error loading more posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredPosts = useMemo(() => {
        let displayedPosts: (HashnodePostNode | MdxPost)[] = [];

        if (filter === 'all') {
            displayedPosts = [...mdxPosts, ...posts].sort((a, b) =>
                new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
            );
        } else if (filter === 'mdx') {
            displayedPosts = mdxPosts;
        } else {
            displayedPosts = posts;
        }

        return displayedPosts;
    }, [filter, mdxPosts, posts]);

    return (
        <>
            <div className="flex justify-center mb-12 gap-4">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'all'
                            ? 'bg-blue-500 text-white'
                            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                        }`}
                >
                    All Posts
                </button>
                <button
                    onClick={() => setFilter('mdx')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'mdx'
                            ? 'bg-blue-500 text-white'
                            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                        }`}
                >
                    MDX Blogs
                </button>
                <button
                    onClick={() => setFilter('hashnode')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'hashnode'
                            ? 'bg-blue-500 text-white'
                            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                        }`}
                >
                    Hashnode Articles
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-zinc-400">No articles found</p>
                </div>
            )}

            {filter !== 'mdx' && pageInfo.hasNextPage && (
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
