import React from "react";
import { siteMetadata } from "@/data/metadata";
import { User, Award, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-zinc-800 pb-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Site & Author Configuration
        </h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Metadata reflected across the technical blog and shared with the portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Author Details Card */}
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 text-sm font-semibold text-white">
            <User className="w-4 h-4 text-blue-400" />
            <span>Author Profile</span>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <span className="text-xs font-mono text-zinc-500 block">Name:</span>
              <span className="text-white font-medium">{siteMetadata.author.name}</span>
            </div>
            <div>
              <span className="text-xs font-mono text-zinc-500 block">Username:</span>
              <span className="text-zinc-300 font-mono">@{siteMetadata.author.username}</span>
            </div>
            <div>
              <span className="text-xs font-mono text-zinc-500 block">Tagline:</span>
              <span className="text-zinc-300">{siteMetadata.author.tagline}</span>
            </div>
            <div>
              <span className="text-xs font-mono text-zinc-500 block">Bio:</span>
              <span className="text-zinc-400 text-xs">{siteMetadata.author.bio}</span>
            </div>
          </div>
        </div>

        {/* Competitive Honors */}
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 text-sm font-semibold text-white">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Competitive Programming Honors</span>
          </div>

          <div className="space-y-2.5">
            {siteMetadata.author.achievements?.map((ach, idx) => (
              <div key={idx} className="text-xs p-2 rounded bg-zinc-950 border border-zinc-800/80">
                <span className="text-zinc-300 font-medium block">{ach.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
