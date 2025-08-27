
import { BackButton, BlogContent, IntegratedArticleRenderer, ViewSeries } from "../components";
import { Link, useParams } from "react-router-dom";

import { ArrowLeft } from "lucide-react";
import { Comments } from "../components";
import { formatDate } from "../utils/dateUtils";
import { useFetchPost } from "../hooks/useFetchPost";
import { useIntegratedArticle } from "../hooks";

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: articleData, isLoading, error } = useIntegratedArticle(slug);
  const navigateToHashnode = () => {
    if (articleData?.type === 'hashnode') {
      window.open(`https://hashnode.com/post/${slug}`, '_blank');
    }
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
          <BackButton className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300" />
        </div>
      </div>
    );
  }

  // if (!post) {
  //   return (
  //     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
  //       <h1 className="text-2xl font-bold text-white mb-4">Post not found</h1>
  //       <Link
  //         to="/"
  //         className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
  //       >
  //         <ArrowLeft className="w-4 h-4" />
  //         Back to Home
  //       </Link>
  //     </div>
  //   );
  // }

  if (!articleData) {
    return null; // This shouldn't happen due to the error check above
  }

  const post = articleData.type === 'hashnode' ? articleData.data : undefined;
  const mdxPost = articleData.type === 'mdx' ? articleData.data : undefined;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <BackButton />

      <IntegratedArticleRenderer 
        hashnodePost={post}
        mdxPost={mdxPost}
      />

      {/* Only show comments for Hashnode posts */}
      {post && (
        <Comments
          comments={post.comments}
          userProfilePicture={post.author.profilePicture}
          onPostComment={async (content) => {
            console.log("Posting comment:", content);
          }}
          navigateToHashnode={navigateToHashnode}
        />
      )}
    </div>
  );
};
