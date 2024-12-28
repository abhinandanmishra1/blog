import { BlogContent, ViewSeries } from "../components";
import { Link, useParams } from "react-router-dom";

import { ArrowLeft } from "lucide-react";
import { Comments } from "../components";
import { formatDate } from "../utils/dateUtils";
import { useFetchPost } from "../hooks/useFetchPost";

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useFetchPost(slug);
  const navigateToHashnode = () => {
    window.open(`https://hashnode.com/post/${slug}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-neutral-800 rounded w-3/4"></div>
          <div className="h-4 bg-neutral-800 rounded w-1/4"></div>
          <div className="h-96 bg-neutral-800 rounded"></div>
          <div className="space-y-4">
            <div className="h-4 bg-neutral-800 rounded"></div>
            <div className="h-4 bg-neutral-800 rounded"></div>
            <div className="h-4 bg-neutral-800 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Error</h1>
          <p className="text-neutral-400 mb-8">
            There was an error loading the blog post.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Post not found</h1>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <article>
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-6">{post.title}</h1>
          <div className="flex items-center gap-6 text-neutral-400">
            <div className="flex items-center gap-3">
              <img
                src={post.author.profilePicture}
                alt={post.author.name}
                className="w-10 h-10 rounded-full"
              />
              <span>{post.author.name}</span>
            </div>
            <span>{formatDate(post.publishedAt)}</span>
            <span>{post.readTimeInMinutes} min read</span>
          </div>
        </header>

        {post.coverImage?.url && (
          <div className="mb-12">
            <img
              src={post.coverImage.url}
              alt={post.title}
              className="w-full rounded-xl"
            />
          </div>
        )}

        {post.series && (
          <div className="mb-12">
            <ViewSeries series={post.series} />
          </div>
        )}

        <BlogContent post={post} />

        <footer className="mt-12 pt-12 border-t border-neutral-800">
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <Link
                key={tag.slug}
                to={`/tag/${tag.slug}`}
                className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-full text-sm hover:bg-neutral-700 transition-colors duration-300"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </footer>

        {/* <Comments comments={post.comments} /> */}
        <Comments
          comments={post.comments}
          userProfilePicture={post.author.profilePicture}
          // userProfilePicture={currentUser?.profilePicture} // Add this
          onPostComment={async (content) => {
            // Add your comment posting logic here
            console.log("Posting comment:", content);
          }}
          navigateToHashnode={navigateToHashnode}
        />
      </article>
    </div>
  );
};
