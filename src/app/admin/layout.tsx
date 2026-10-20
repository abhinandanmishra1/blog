import React from "react";
import Link from "next/link";
import { LayoutDashboard, FilePlus2, BookOpen, Settings, ArrowUpRight } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row pt-16">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-zinc-800/80 bg-zinc-900/40 p-4 space-y-6">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 font-bold text-sm tracking-tight text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span>Blog Admin Hub</span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">MDX & Metadata Operations</p>
        </div>

        <nav className="space-y-1 text-sm font-medium">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-blue-400" />
            <span>Dashboard Overview</span>
          </Link>
          <Link
            href="/admin/new"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 transition-colors"
          >
            <FilePlus2 className="w-4 h-4" />
            <span>Write New Article</span>
          </Link>
          <Link
            href="/articles"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
          >
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>Browse Public Articles</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4 text-zinc-400" />
            <span>Author & Metadata</span>
          </Link>
        </nav>

        <div className="pt-6 border-t border-zinc-800/80 px-3 space-y-2">
          <div className="text-[11px] font-mono uppercase text-zinc-500">Connected Sites</div>
          <Link
            href="/"
            className="flex items-center justify-between text-xs text-zinc-400 hover:text-white py-1"
          >
            <span>Blog Home</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href="https://abhinandanmishra.in"
            className="flex items-center justify-between text-xs text-zinc-400 hover:text-white py-1"
          >
            <span>Portfolio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-6xl overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
