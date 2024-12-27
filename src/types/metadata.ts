export interface SocialLinks {
    twitter?: string;
    github?: string;
    linkedin?: string;
    email?: string;
  }
  
  export interface Experience {
    title: string;
    company: string;
    period: string;
    highlights: string[];
  }
  
  export interface Education {
    degree: string;
    school: string;
    year: string;
    honors?: string;
  }
  
  export interface Author {
    name: string;
    bio: string;
    avatar: string;
    tagline: string;
    username: string;
    achievements?: string[];
    experience?: Experience[];
    education?: Education[];
    social: SocialLinks;
  }
  
  // ... rest of the interfaces remain unchanged
  
  export interface Category {
    name: string;
    description: string;
  }

  export interface Navigation {
    home: string;
    about: string;
    articles: string;
  }
  
  export interface SiteMetadata {
    title: string;
    description: string;
    siteUrl: string;
    author: Author;
    categories: Category[];
    // navigation: Navigation;
  }