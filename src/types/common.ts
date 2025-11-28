export interface BaseAuthor {
  name: string;
  profilePicture?: string;
  bio?: string;
  socialMedia?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface BaseTag {
  name: string;
  slug: string;
  color?: string;
  description?: string;
}

export interface BaseSeries {
  name: string;
  slug: string;
  description?: {
    html?: string;
    text?: string;
  };
  coverImage?: string;
  totalPosts?: number;
}

export interface BasePost {
  id?: string;
  slug: string;
  title: string;
  publishedAt: string;
  brief?: string;
  excerpt?: string;
  content: {
    html?: string;
    markdown?: string;
    raw?: string;
  };
  author?: BaseAuthor;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
  tags: BaseTag[];
  series?: BaseSeries;
  coverImage?: {
    url: string;
    alt?: string;
    caption?: string;
  };
  seo?: {
    title?: string;
    description?: string;
    canonicalUrl?: string;
  };
  metadata?: {
    language?: string;
    isDraft?: boolean;
    isArchived?: boolean;
    lastModified?: string;
  };
  engagement?: {
    views?: number;
    likes?: number;
    comments?: number;
  };
}
