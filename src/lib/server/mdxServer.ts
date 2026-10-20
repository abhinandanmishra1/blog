import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MdxPost } from '@/types/mdx';

const contentDirectory = path.join(process.cwd(), 'src/content');

function calculateReadingTime(text: string): { text: string; minutes: number; time: number; words: number } {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return {
    text: `${minutes} min read`,
    minutes,
    time: minutes * 60 * 1000,
    words,
  };
}

export function getAllPosts(): MdxPost[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const readingTime = data.readTimeInMinutes
        ? {
            text: `${data.readTimeInMinutes} min read`,
            minutes: data.readTimeInMinutes,
            time: data.readTimeInMinutes * 60 * 1000,
            words: data.readTimeInMinutes * 200,
          }
        : calculateReadingTime(content);

      // Normalize tags
      const tags = (data.tags || []).map((t: string | { name: string; slug?: string }) => {
        if (typeof t === 'string') {
          return { name: t, slug: t.toLowerCase().replace(/\s+/g, '-') };
        }
        return {
          name: t.name,
          slug: t.slug || t.name.toLowerCase().replace(/\s+/g, '-'),
        };
      });

      // Normalize series
      let series = undefined;
      if (data.series) {
        if (typeof data.series === 'string') {
          series = {
            name: data.series,
            slug: data.series.toLowerCase().replace(/\s+/g, '-'),
            totalPosts: 1,
            partNumber: 1,
            totalParts: 1,
          };
        } else {
          series = {
            name: data.series.name,
            slug: data.series.slug || data.series.name.toLowerCase().replace(/\s+/g, '-'),
            description: data.series.description,
            totalPosts: data.series.totalPosts || 1,
            partNumber: data.series.partNumber || 1,
            totalParts: data.series.totalParts || 1,
          };
        }
      }

      // Normalize coverImage
      let coverImage = undefined;
      if (data.coverImage) {
        if (typeof data.coverImage === 'string') {
          coverImage = { url: data.coverImage };
        } else if (data.coverImage.url) {
          coverImage = data.coverImage;
        }
      }

      // Normalize author
      const author = data.author || {
        name: 'Abhinandan Mishra',
        profilePicture: 'https://github.com/abhinandanmishra1.png',
        bio: 'Software Engineer II @ Project44',
      };

      return {
        slug,
        title: data.title || slug,
        publishedAt: data.publishedAt || data.date || new Date().toISOString(),
        brief: data.brief || data.excerpt || '',
        readingTime,
        tags,
        series,
        author,
        coverImage,
        metadata: {
          language: 'en',
          isDraft: Boolean(data.isDraft),
          isArchived: false,
        },
        content: {
          raw: content,
        },
      } as MdxPost;
    })
    .filter((post) => !post.metadata?.isDraft)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return allPostsData;
}

export function getPostBySlug(slug: string): MdxPost | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const readingTime = data.readTimeInMinutes
      ? {
          text: `${data.readTimeInMinutes} min read`,
          minutes: data.readTimeInMinutes,
          time: data.readTimeInMinutes * 60 * 1000,
          words: data.readTimeInMinutes * 200,
        }
      : calculateReadingTime(content);

    const tags = (data.tags || []).map((t: string | { name: string; slug?: string }) => {
      if (typeof t === 'string') {
        return { name: t, slug: t.toLowerCase().replace(/\s+/g, '-') };
      }
      return {
        name: t.name,
        slug: t.slug || t.name.toLowerCase().replace(/\s+/g, '-'),
      };
    });

    let series = undefined;
    if (data.series) {
      if (typeof data.series === 'string') {
        series = {
          name: data.series,
          slug: data.series.toLowerCase().replace(/\s+/g, '-'),
          totalPosts: 1,
          partNumber: 1,
          totalParts: 1,
        };
      } else {
        series = {
          name: data.series.name,
          slug: data.series.slug || data.series.name.toLowerCase().replace(/\s+/g, '-'),
          description: data.series.description,
          totalPosts: data.series.totalPosts || 1,
          partNumber: data.series.partNumber || 1,
          totalParts: data.series.totalParts || 1,
        };
      }
    }

    let coverImage = undefined;
    if (data.coverImage) {
      if (typeof data.coverImage === 'string') {
        coverImage = { url: data.coverImage };
      } else if (data.coverImage.url) {
        coverImage = data.coverImage;
      }
    }

    const author = data.author || {
      name: 'Abhinandan Mishra',
      profilePicture: 'https://github.com/abhinandanmishra1.png',
      bio: 'Software Engineer II @ Project44',
    };

    return {
      slug,
      title: data.title || slug,
      publishedAt: data.publishedAt || data.date || new Date().toISOString(),
      brief: data.brief || data.excerpt || '',
      readingTime,
      tags,
      series,
      author,
      coverImage,
      metadata: {
        language: 'en',
        isDraft: Boolean(data.isDraft),
        isArchived: false,
      },
      content: {
        raw: content,
      },
    } as MdxPost;
  } catch {
    return null;
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) return [];
  const fileNames = fs.readdirSync(contentDirectory);
  return fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}

export function getAllTags(): { name: string; slug: string; count: number }[] {
  const posts = getAllPosts();
  const tagMap = new Map<string, { name: string; slug: string; count: number }>();

  posts.forEach((post) => {
    (post.tags || []).forEach((tag) => {
      const existing = tagMap.get(tag.slug);
      if (existing) {
        existing.count += 1;
      } else {
        tagMap.set(tag.slug, { name: tag.name, slug: tag.slug, count: 1 });
      }
    });
  });

  return Array.from(tagMap.values()).sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tagSlug: string): MdxPost[] {
  const posts = getAllPosts();
  return posts.filter((post) =>
    (post.tags || []).some((t) => t.slug.toLowerCase() === tagSlug.toLowerCase())
  );
}

export function getAllSeries(): { name: string; slug: string; description?: string; postCount: number }[] {
  const posts = getAllPosts();
  const seriesMap = new Map<string, { name: string; slug: string; description?: string; postCount: number }>();

  posts.forEach((post) => {
    if (post.series) {
      const sSlug = post.series.slug;
      const existing = seriesMap.get(sSlug);
      if (existing) {
        existing.postCount += 1;
      } else {
        seriesMap.set(sSlug, {
          name: post.series.name,
          slug: sSlug,
          description: post.series.description?.text,
          postCount: 1,
        });
      }
    }
  });

  return Array.from(seriesMap.values());
}

export function getPostsBySeries(seriesSlug: string): MdxPost[] {
  const posts = getAllPosts();
  return posts.filter(
    (post) => post.series?.slug.toLowerCase() === seriesSlug.toLowerCase()
  );
}

export function searchPosts(query: string): MdxPost[] {
  const posts = getAllPosts();
  if (!query || query.trim() === '') return posts;

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  return posts.filter((post) => {
    const title = (post.title || '').toLowerCase();
    const brief = (post.brief || '').toLowerCase();
    const tags = (post.tags || []).map((t) => t.name.toLowerCase()).join(' ');
    const content = (post.content.raw || '').toLowerCase();

    return terms.every(
      (term) =>
        title.includes(term) ||
        brief.includes(term) ||
        tags.includes(term) ||
        content.includes(term)
    );
  });
}
