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

export interface HashnodePosts {
  title: string;
  slug: string;
  edges: {
    node: HashnodePostNode;
  }[];
  pageInfo: PageInfo;
}

export interface HashnodeSeries {
  name: string;
  slug: string;
  coverImage: string;
  description: {
    html: string;
  };
  posts: HashnodePosts;
  views: number;
}

interface Author {
  name: string;
  profilePicture: string;
}

interface CoverImage {
  url: string;
}

export interface HashnodePostNode {
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
  views: number;
}


export interface FullPost extends HashnodePostNode {
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