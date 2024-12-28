import { ArrowUpRight, MessageSquare } from "lucide-react";

import { CommentCard } from "./CommentCard";

export interface Comment {
  content: {
    html: string;
  };
  author: {
    name: string;
    id: string;
    profilePicture: string;
  };
  dateAdded: string;
  replies: {
    totalDocuments: number;
    edges: {
      node: Comment;
    }[];
  };
}

interface CommentsProps {
  comments: {
    edges: {
      node: Comment;
    }[];
  };
  userProfilePicture?: string;
  onPostComment?: (content: string) => Promise<void>;
  navigateToHashnode?: () => void;
}

export const Comments = ({
  comments,
  navigateToHashnode,
}: CommentsProps) => {
  const commentCount = comments.edges.length;

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">
          Comments {commentCount > 0 && `(${commentCount})`}
        </h2>
      </div>

      <div className="mb-8">
        {/* <CommentInput 
            onSubmit={onPostComment}
            userProfilePicture={userProfilePicture}
          /> */}
        {/* Comment on Hashnode button */}
        <button
          onClick={navigateToHashnode}
          className="group flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-lg text-blue-400 hover:bg-blue-600 hover:text-white hover:border-transparent transition-all duration-300"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="font-medium">Comment on Hashnode</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>
      </div>
      {/* )} */}

      {commentCount === 0 ? (
        <div className="text-center py-8 text-neutral-400">
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <div className="space-y-6">
          {comments.edges.map(({ node: comment }, index) => (
            <CommentCard
              key={`${comment.author.id}-${comment.dateAdded}`}
              comment={comment}
              isLastComment={index === commentCount - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
