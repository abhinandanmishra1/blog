"use client"

import { Search, X } from "lucide-react";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const SearchInput = ({ value, onChange, placeholder = "Search articles..." }: SearchInputProps) => {
    return (
        <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-zinc-400" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-10 py-2 border border-zinc-700 rounded-lg leading-5 bg-zinc-800 text-zinc-200 placeholder-zinc-400 focus:outline-none focus:bg-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {value && (
                <button
                    onClick={() => onChange('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
};
