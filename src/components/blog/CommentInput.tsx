import React, { useState } from "react";

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

interface CommentInputProps {
  onSubmit: (content: string) => Promise<void>;
  placeholder?: string;
  submitLabel?: string;
  showAvatar?: boolean;
  userProfilePicture?: string;
}

export const CommentInput = ({
  onSubmit,
  placeholder = "Write a comment...",
  submitLabel = "Post Comment",
  showAvatar = true,
  userProfilePicture = "/default-avatar.png",
}: CommentInputProps) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(content);
      setContent("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        {showAvatar && (
          <img
            src={userProfilePicture}
            alt="Your avatar"
            className="w-10 h-10 rounded-full"
          />
        )}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-neutral-800/30 border border-neutral-700 rounded-lg p-3 min-h-[100px] text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600 resize-none"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isSubmitting ? "Posting..." : submitLabel}
        </button>
      </div>
    </form>
  );
};