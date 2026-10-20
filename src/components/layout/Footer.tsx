import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { siteMetadata } from "../../data/metadata";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "../common/Icons";

export default function Footer() {
  const portfolioUrl = "https://abhinandanmishra.in";

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-white text-xl font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
              <span>{siteMetadata.title}</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              In-depth engineering articles on distributed systems, system design, data structures, and modern web application development.
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href={siteMetadata.author.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={siteMetadata.author.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={siteMetadata.author.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider font-mono">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-zinc-400 hover:text-white transition-colors">
                  All Articles
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-zinc-400 hover:text-white transition-colors">
                  Categories & Tags
                </Link>
              </li>
              <li>
                <Link href="/series" className="text-zinc-400 hover:text-white transition-colors">
                  Article Series
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Connected Portfolio */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider font-mono">
              Portfolio & Products
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={portfolioUrl}
                  className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Main Portfolio</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://sdeforge.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>SDE Forge</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://codepad.abhinandanmishra.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>CodePad IDE</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/abhinandanmishra1/AI-Shipment-Copilot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>AI Shipment Copilot</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Author */}
          <div className="space-y-3">
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider font-mono">
              Author
            </h3>
            <div className="text-sm">
              <div className="font-semibold text-white">{siteMetadata.author.name}</div>
              <p className="text-xs text-zinc-400 mt-1">
                Software Engineer II @ Project44. Competitive programmer and systems enthusiast.
              </p>
            </div>
            <div className="pt-2">
              <a
                href={portfolioUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-blue-400 hover:bg-zinc-800 transition-colors font-medium"
              >
                <span>View Full Engineering Portfolio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 gap-2">
          <div>
            © {new Date().getFullYear()} {siteMetadata.author.name}. All articles published under MDX.
          </div>
          <div className="font-mono">
            Next.js 15 App Router • Pure Local MDX
          </div>
        </div>
      </div>
    </footer>
  );
}
