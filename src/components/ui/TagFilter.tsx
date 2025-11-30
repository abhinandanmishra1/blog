"use client"

import { useState } from "react";
import { Search } from "lucide-react";
import { siteMetadata } from "@/data/metadata";

interface TagFilterProps {
    selectedTags: string[];
    onSelectTag: (tag: string) => void;
}

export const TagFilter = ({ selectedTags, onSelectTag }: TagFilterProps) => {
    const [tagSearch, setTagSearch] = useState("");

    const filteredTags = siteMetadata.tags.filter(tag => {
        const terms = tagSearch.toLowerCase().split(/\s+/).filter(t => t.length > 0);
        if (terms.length === 0) return true;

        const tagName = tag.name.toLowerCase();
        return terms.some(term => tagName.includes(term));
    });

    return (
        <div className="flex flex-col gap-4 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-zinc-500" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-9 pr-3 py-1.5 border border-zinc-700 rounded-md leading-5 bg-zinc-800 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:bg-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition-colors duration-200"
                    placeholder="Search tags..."
                    value={tagSearch}
                    onChange={(e) => setTagSearch(e.target.value)}
                />
            </div>
            <div className="flex flex-wrap gap-2">
                {filteredTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag.slug);
                    return (
                        <button
                            key={tag.slug}
                            onClick={() => onSelectTag(tag.slug)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${isSelected
                                ? 'bg-blue-500 text-white'
                                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                                }`}
                        >
                            {tag.name}
                        </button>
                    );
                })}
                {filteredTags.length === 0 && (
                    <p className="text-zinc-500 text-sm italic">No tags found</p>
                )}
            </div>
        </div>
    );
};

