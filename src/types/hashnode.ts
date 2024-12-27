export interface HashnodeUser {
  _id: string;
  name: string;
  username: string;
  tagline: string;
  photo: string;
  socialMedia: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface Tag {
  name: string;
  slug: string;
}

export interface HashnodeSeries {
  name: string;
  slug: string;
  description: {
    html: string;
  };
  posts?: {
    title: string;
    slug: string;
  }[];
}

interface Author {
  name: string;
  profilePicture: string;
}

interface CoverImage {
  url: string;
}

interface BasePost {
  id: string;
  author: Author;
  publishedAt: string;
  title: string;
  brief: string;
  slug: string;
  readTimeInMinutes: number;
  tags: Tag[];
  series?: HashnodeSeries;
  coverImage: CoverImage;
}

export interface Post extends BasePost {}

export interface FullPost extends BasePost {
  content: {
    html: string;
    markdown: string;
  };
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

export interface AllPostsData {
  publication: {
    id: string;
    title: string;
    posts: {
      pageInfo: PageInfo;
      edges: {
        node: Post;
      }[];
    };
  };
}

export interface PostData {
  publication: {
    post: FullPost;
  };
}

export interface SeriesData {
  publication: {
    series: HashnodeSeries[];
  };
}