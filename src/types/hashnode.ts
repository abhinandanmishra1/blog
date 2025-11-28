import { BaseAuthor, BasePost, BaseSeries, BaseTag } from './common';

export interface HashnodeUser extends BaseAuthor {
  _id: string;
  username: string;
  tagline: string;
  photo: string;
}

// HashnodeTag extends BaseTag without additional properties
export type HashnodeTag = BaseTag;

export interface HashnodePosts {
  edges: {
    node: HashnodePostNode;
  }[];
  pageInfo: PageInfo;
  totalDocuments: number;
}

export interface HashnodeSeries extends BaseSeries {
  posts: HashnodePosts;
  views: number;
}

export interface HashnodePostNode extends Omit<BasePost, 'readingTime'> {
  id: string;
  brief: string;
  readTimeInMinutes: number;
  series?: HashnodeSeries;
  views: number;
}

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

export interface FullPost extends HashnodePostNode {
  content: {
    html: string;
    markdown: string;
  };
  comments: {
    totalDocuments: number;
    edges: {
      node: Comment;
    }[];
  };
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

export interface AllPostsData {
  publication: {
    posts: HashnodePosts;
  };
}

export interface PostData {
  publication: {
    post: FullPost;
  };
}

export interface SeriesData {
  publication: {
    seriesList: {
      totalDocuments: number;
      edges: {
        node: HashnodeSeries;
      }[];
    };
  };
}

export interface SubscribeToNewsletterResponse {
  subscribeToNewsletter: {
    status: string;
    errors?: {
      message: string;
    }[];
  };
}