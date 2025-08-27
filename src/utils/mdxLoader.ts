import matter from 'gray-matter';
import { MDXArticleMetadata } from './mdxArticles';

// This will be replaced with dynamic imports in production
// For now, we'll use a registry approach that's easier to maintain than the manual file

interface MDXFileInfo {
  slug: string;
  rawContent: string;
  metadata: MDXArticleMetadata;
  component: React.ComponentType;
}

// Registry of MDX files - this is auto-updated by our build process
// In development, you can manually add entries here
const MDX_FILE_REGISTRY = new Map<string, () => Promise<{ default: React.ComponentType; raw: string }>>();

// Import all MDX files dynamically
// This creates a more maintainable system than manual imports
const loadMDXFiles = async (): Promise<Map<string, MDXFileInfo>> => {
  const files = new Map<string, MDXFileInfo>();
  
  // For Vite, we can use import.meta.glob to get all MDX files
  const mdxModules = import.meta.glob('../content/*.mdx', { 
    query: '?raw',
    import: 'default'
  }) as Record<string, () => Promise<string>>;
  
  const mdxComponents = import.meta.glob('../content/*.mdx') as Record<string, () => Promise<{ default: React.ComponentType }>>;
  
  for (const path in mdxModules) {
    try {
      // Extract filename without extension as slug
      const fileName = path.split('/').pop()?.replace('.mdx', '') || '';
      const slug = fileName;
      
      // Load raw content and component
      const rawContent = await mdxModules[path]();
      const componentModule = await mdxComponents[path]();
      
      // Parse frontmatter
      const { data } = matter(rawContent);
      
      // Create metadata with auto-generated ID
      const metadata: MDXArticleMetadata = {
        id: `mdx-${slug}`,
        slug,
        ...data,
        // Ensure required fields have defaults
        title: data.title || 'Untitled',
        brief: data.brief || '',
        publishedAt: data.publishedAt || new Date().toISOString(),
        readTimeInMinutes: data.readTimeInMinutes || 5,
        tags: data.tags || [],
        coverImage: data.coverImage || null,
        author: data.author || { name: 'Unknown', profilePicture: '' },
        views: data.views || 0,
        series: data.series || undefined
      };
      
      files.set(slug, {
        slug,
        rawContent,
        metadata,
        component: componentModule.default
      });
      
    } catch (error) {
      console.warn(`Failed to load MDX file: ${path}`, error);
    }
  }
  
  return files;
};

// Cache for loaded files
let mdxFilesCache: Map<string, MDXFileInfo> | null = null;

// Load all MDX files and cache them
export const loadAllMDXFiles = async (): Promise<Map<string, MDXFileInfo>> => {
  if (mdxFilesCache) {
    return mdxFilesCache;
  }
  
  mdxFilesCache = await loadMDXFiles();
  return mdxFilesCache;
};

// Get all MDX articles (for listing)
export const getAllMDXArticlesDynamic = async () => {
  const files = await loadAllMDXFiles();
  return Array.from(files.values()).map(file => ({
    metadata: file.metadata,
    component: file.component
  }));
};

// Get specific MDX article by slug
export const getMDXArticleDynamic = async (slug: string) => {
  const files = await loadAllMDXFiles();
  const file = files.get(slug);
  
  if (!file) return null;
  
  return {
    metadata: file.metadata,
    component: file.component
  };
};

// Check if MDX article exists
export const mdxArticleExistsDynamic = async (slug: string): Promise<boolean> => {
  const files = await loadAllMDXFiles();
  return files.has(slug);
};

// For development: force reload cache
export const reloadMDXCache = () => {
  mdxFilesCache = null;
};