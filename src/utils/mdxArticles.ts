// This file manages the MDX articles system
// Now using dynamic loading with frontmatter metadata!

import { HashnodePostNode } from '../types/hashnode';
import { 
  getAllMDXArticlesDynamic, 
  getMDXArticleDynamic, 
  mdxArticleExistsDynamic,
  debugMDXFiles
} from './mdxDynamic';

// MDX Article uses the exact same structure as Hashnode
export interface MDXArticleMetadata extends Omit<HashnodePostNode, 'series'> {
  // Optional series support for MDX articles
  series?: {
    name: string;
    slug: string;
    description: {
      html: string;
    };
    coverImage: string;
  };
}

// Export the dynamic functions with the same API as before
// This ensures backward compatibility with existing code
export const getMDXArticle = (slug: string) => {
  return getMDXArticleDynamic(slug);
};

export const getAllMDXArticles = () => {
  return getAllMDXArticlesDynamic();
};

export const mdxArticleExists = (slug: string): boolean => {
  return mdxArticleExistsDynamic(slug);
};

// Export debug function for development
export const debugMDXSystem = () => {
  debugMDXFiles();
};

// Optional: Log loaded articles in development
if (import.meta.env.DEV) {
  console.log('🚀 MDX Dynamic Loading System initialized');
  debugMDXFiles();
}