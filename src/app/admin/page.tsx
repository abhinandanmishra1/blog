import React from "react";
import Link from "next/link";
import { getAllPosts, getAllTags, getAllSeries } from "@/lib/server/mdxServer";
import { FileText, Tags, Layers, PenLine, Eye } from "lucide-react";

export default function AdminOverviewPage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const series = getAllSeries();

  const totalWords = posts.reduce((acc, p) => acc + (p.readingTime?.words || 0), 0);

  return (
    <div className="space-y-10">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Blog Admin Dashboard
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage your local MDX articles, frontmatter metadata, and content structure.
          </p>
        </div>

        <Link
          href="/admin/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors shadow-sm self-start sm:self-auto"
        >
          <PenLine className="w-4 h-4" />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono uppercase">Articles</span>
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{posts.length}</div>
          <p className="text-[11px] text-zinc-500">Live MDX articles</p>
        </div>

        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono uppercase">Categories</span>
            <Tags className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{tags.length}</div>
          <p className="text-[11px] text-zinc-500">Unique tags tracked</p>
        </div>

        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono uppercase">Series</span>
            <Layers className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{series.length}</div>
          <p className="text-[11px] text-zinc-500">Curricula tracks</p>
        </div>

        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono uppercase">Total Words</span>
            <FileText className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {totalWords.toLocaleString()}
          </div>
          <p className="text-[11px] text-zinc-500">Estimated word count</p>
        </div>
      </div>

      {/* Articles Inventory Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white tracking-tight">Article Inventory</h2>
          <span className="text-xs text-zinc-400 font-mono">{posts.length} published</span>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-zinc-900/80 text-xs uppercase font-mono text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="py-3.5 px-4">Article Title</th>
                  <th className="py-3.5 px-4">Series / Tags</th>
                  <th className="py-3.5 px-4">Read Time</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-sans">
                {posts.map((post) => (
                  <tr key={post.slug} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-semibold text-white max-w-sm sm:max-w-md truncate">
                        {post.title}
                      </div>
                      <div className="text-xs font-mono text-zinc-500 mt-0.5">
                        /{post.slug}.mdx
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {post.series && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            {post.series.name}
                          </span>
                        )}
                        {post.tags?.slice(0, 2).map((t) => (
                          <span
                            key={t.slug}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-800 text-zinc-400"
                          >
                            #{t.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-zinc-400">
                      {post.readingTime?.text}
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-zinc-400">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        href={`/articles/${post.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/20"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
