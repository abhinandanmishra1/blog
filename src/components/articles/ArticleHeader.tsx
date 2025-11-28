"use client"
import { formatDate } from "@/lib";
import { MdxAuthor } from "@/types/mdx";
import { Badge } from "../mdx";
import { BaseTag } from "@/types/common";

interface ArticleHeaderProps {
    title: string;
    publishedAt: string;
    readTimeInMinutes: number;
    author?: MdxAuthor;
    tags?: BaseTag[];
}

export const ArticleHeader = ({ title, author, publishedAt, readTimeInMinutes, tags }: ArticleHeaderProps) => {

    return (
        <header className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-6">{title}</h1>
            <div className="flex items-center gap-6 text-neutral-400">
                {author && (
                    <div className="flex items-center gap-3">
                        {(author.avatar || author.profilePicture) && (
                            <img
                                src={author.avatar || author.profilePicture}
                                alt={author.name}
                                className="w-10 h-10 rounded-full"
                            />
                        )}
                        <span>{author.name}</span>
                    </div>
                )}
                <span>{formatDate(publishedAt)}</span>
                <span>{readTimeInMinutes} min read</span>
            </div>
            {
                tags && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {tags.map((tag) => (
                            <Badge key={tag.slug}>{tag.name}</Badge>
                        ))}
                    </div>
                )}
        </header>
    );
};