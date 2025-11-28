"use client"
import { MdxPost } from "@/types/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  Badge,
  Callout,
  CodeBlock,
  CodeSandbox,
  FileTree,
  FileTreeItem,
  ImageComparison,
  InlineCode,
  Steps,
  Step,
  Tabs,
  TabItem,
  YouTube
} from "@/components/mdx";
import { ArticleHeader } from "./ArticleHeader";

export const MdxRenderer = ({ post }: {
    post: MdxPost;
}) => {
    const components = {
      Badge,
      Callout,
      CodeBlock,
      CodeSandbox,
      FileTree,
      FileTreeItem,
      ImageComparison,
      InlineCode,
      Steps,
      Step,
      Tabs,
      TabItem,
      YouTube,
      // Override default elements with custom styling
      h1: (props: any) => <h1 className="text-4xl font-bold text-white mb-6" {...props} />,
      h2: (props: any) => <h2 className="text-3xl font-bold text-white mt-12 mb-6" {...props} />,
      h3: (props: any) => <h3 className="text-2xl font-bold text-white mt-8 mb-4" {...props} />,
      p: (props: any) => <p className="text-gray-300 mb-4 leading-relaxed" {...props} />,
      a: (props: any) => <a className="text-blue-400 hover:text-blue-300 transition-colors" {...props} />,
      ul: (props: any) => <ul className="list-disc list-inside text-gray-300 mb-4" {...props} />,
      ol: (props: any) => <ol className="list-decimal list-inside text-gray-300 mb-4" {...props} />,
      li: (props: any) => <li className="mb-2" {...props} />,
      blockquote: (props: any) => (
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 mb-4" {...props} />
      ),
      code: (props: any) => (
        <code className="bg-gray-800 rounded px-1 py-0.5 text-sm text-gray-300" {...props} />
      ),
      pre: (props: any) => (
        <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto mb-4" {...props} />
      ),
    };

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <article className="prose prose-lg max-w-none prose-dark">
          <ArticleHeader 
            title={post.title} 
            author={post.author} 
            publishedAt={post.publishedAt} 
            readTimeInMinutes={post.readingTime?.minutes || 5} 
            tags={post.tags}
          />
          
          <div className="prose prose-lg max-w-none prose-dark">
            <MDXRemote components={components} source={post.content || ''} />
          </div>
        </article>
      </div>
    );
}