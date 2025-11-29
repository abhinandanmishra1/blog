import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { HashnodePostNode } from '@/types/hashnode';
import { MdxPost } from '@/types/mdx';
import { formatDate } from '@/lib/dateUtils';
import { Card3D } from './Card3D';

interface ArticleCardProps {
    article: HashnodePostNode | MdxPost;
    variant?: 'default' | '3d';
}

export const ArticleCard = ({ article, variant = 'default' }: ArticleCardProps) => {
    // Helper to check if it's a Hashnode post
    const isHashnode = 'readTimeInMinutes' in article;
    const readTime = isHashnode ? article.readTimeInMinutes : article.readingTime?.minutes;
    const coverImage = isHashnode ? article.coverImage?.url : article.coverImage?.url;

    const CardContent = () => (
        <div className="group relative bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 ease-out hover:border-zinc-700 h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/0 via-zinc-900/0 to-zinc-900/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />

            <div className="flex flex-col h-full">
                <div className="aspect-[16/9] relative">
                    {coverImage ? (
                        <Image
                            src={coverImage}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-zinc-800" />
                    )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex gap-3 mb-4">
                        {article.tags?.slice(0, 2).map((tag) => (
                            <span
                                key={tag.slug}
                                className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full"
                            >
                                {tag.name}
                            </span>
                        ))}
                        {!isHashnode && (
                            <span className="px-3 py-1 text-xs font-medium bg-purple-500/10 text-purple-400 rounded-full">
                                MDX
                            </span>
                        )}
                    </div>

                    <h3 className="text-xl font-bold text-zinc-200 mb-3 line-clamp-2 transition-colors duration-300 group-hover:text-white">
                        {article.title}
                    </h3>

                    <p className="text-zinc-400 mb-4 line-clamp-2 flex-grow">{article.brief}</p>

                    <div className="flex items-center justify-between text-zinc-400 mt-auto">
                        <div className="flex items-center gap-4">
                            {article.author?.profilePicture ? (
                                <Image
                                    src={article.author.profilePicture}
                                    alt={article.author?.name || ''}
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 rounded-full"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-zinc-800" />
                            )}
                            <span className="text-sm">
                                {readTime} min read
                            </span>
                        </div>
                        <span className="text-sm">
                            {formatDate(article.publishedAt)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );

    if (variant === '3d') {
        return (
            <Link href={`/articles/${article.slug}`}>
                <Card3D color="rgb(255, 255, 255)">
                    <CardContent />
                </Card3D>
            </Link>
        );
    }

    return (
        <Link href={`/articles/${article.slug}`}>
            <CardContent />
        </Link>
    );
};
