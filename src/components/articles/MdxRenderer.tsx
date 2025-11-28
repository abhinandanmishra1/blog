import { MdxPost } from "@/types/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { ArticleHeader } from "./ArticleHeader";

export const MdxRenderer = ({ post }: {
  post: MdxPost;
}) => {
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
          <MDXRemote components={mdxComponents} source={post.content?.raw || ''} />
        </div>
      </article>
    </div>
  );
}