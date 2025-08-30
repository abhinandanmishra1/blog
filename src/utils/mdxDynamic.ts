import fm from 'front-matter';
import { MDXArticleMetadata } from './mdxArticles';

// Import all MDX files with their raw content for metadata extraction
// This is a Vite-specific feature that works at build time
const mdxFiles = import.meta.glob('../content/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

// Import all MDX components
const mdxComponents = import.meta.glob('../content/*.mdx', {
  eager: true
}) as Record<string, { default: React.ComponentType }>;

// Process all MDX files and extract metadata
const processedMDXFiles = new Map<string, {
  metadata: MDXArticleMetadata;
  component: React.ComponentType;
}>();

// Initialize the processed files map
for (const path in mdxFiles) {
  try {
    // Extract filename without extension as slug
    const fileName = path.split('/').pop()?.replace('.mdx', '') || '';
    const slug = fileName;
    
    // Get raw content and component
    const rawContent = mdxFiles[path];
    const componentModule = mdxComponents[path];
    
    if (!componentModule || !componentModule.default) {
      console.warn(`No component found for ${path}`, componentModule);
      continue;
    }
    
    // Validate that component is actually a function/component
    if (typeof componentModule.default !== 'function') {
      console.warn(`Component for ${path} is not a function:`, typeof componentModule.default, componentModule.default);
      continue;
    }
    
    // Parse frontmatter using gray-matter
    const { attributes, body, bodyBegin, frontmatter } = fm<Partial<MDXArticleMetadata>>(rawContent);
    const data = attributes;
    
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
      coverImage: data.coverImage || { url: '' },
      author: data.author || { name: 'Unknown', profilePicture: '' },
      views: data.views || 0,
      series: data.series || undefined
    };
    
    processedMDXFiles.set(slug, {
      metadata,
      component: componentModule.default
    });
    
  } catch (error) {
    console.warn(`Failed to process MDX file: ${path}`, error);
  }
}

// Export functions that work synchronously (since files are loaded eagerly)
export const getAllMDXArticlesDynamic = () => {
  return Array.from(processedMDXFiles.values());
};

export const getMDXArticleDynamic = (slug: string) => {
  return processedMDXFiles.get(slug) || null;
};

export const mdxArticleExistsDynamic = (slug: string): boolean => {
  return processedMDXFiles.has(slug);
};

// Get list of available MDX slugs
export const getMDXSlugs = (): string[] => {
  return Array.from(processedMDXFiles.keys());
};

// Debug function to see what files were loaded
export const debugMDXFiles = () => {
  console.log('Loaded MDX files:', {
    count: processedMDXFiles.size,
    slugs: Array.from(processedMDXFiles.keys()),
    files: Array.from(processedMDXFiles.entries()).map(([slug, file]) => ({
      slug,
      title: file.metadata.title,
      publishedAt: file.metadata.publishedAt,
      componentType: typeof file.component,
      componentName: file.component?.name || 'anonymous'
    }))
  });
  
  // Also log the actual component to check if it's valid
  const firstFile = Array.from(processedMDXFiles.values())[0];
  if (firstFile) {
    console.log('First component:', firstFile.component);
  }
};