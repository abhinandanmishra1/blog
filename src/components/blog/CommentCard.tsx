import { formatDate } from "../../utils";

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

interface CommentCardProps {
  comment: Comment;
  depth?: number;
  isLastComment?: boolean;
}

export const CommentCard = ({
  comment,
  depth = 0,
  isLastComment = false,
}: CommentCardProps) => {
  const maxDepth = 3;
  const hasReplies = comment.replies?.edges.length > 0;
  const replyCount = comment.replies?.edges.length ?? 0;

  return (
    <div className={`relative ${depth > 0 ? "pl-8" : ""}`}>
      {/* Vertical connection line */}
      {depth > 0 && (
        <div
          className={`absolute left-0 top-0 w-px bg-neutral-700 ${
            isLastComment ? "h-[40px]" : "h-full"
          }`}
        />
      )}

      {depth > 0 && (
        <div className="absolute left-0 top-[40px] h-px w-8 bg-neutral-700" />
      )}

      <div className="relative">
        <div className="bg-neutral-800/50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={comment.author.profilePicture}
              alt={comment.author.name}
              className="w-10 h-10 rounded-full"
            />
            <span className="font-medium text-white">
              {comment.author.name}
            </span>
            <span className="text-sm text-neutral-400">
              {formatDate(comment.dateAdded)}
            </span>
          </div>
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: comment.content.html }}
          />
        </div>

        <button className="mt-2 text-sm text-neutral-400 hover:text-white transition-colors duration-200">
          Reply
        </button>

        {hasReplies && depth < maxDepth && (
          <div className="mt-4 space-y-4">
            {comment.replies.edges.map(({ node: reply }, index) => (
              <CommentCard
                key={`${reply.author.id}-${reply.dateAdded}`}
                comment={reply}
                depth={depth + 1}
                isLastComment={index === replyCount - 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};