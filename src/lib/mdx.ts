import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { HashnodePostNode } from '@/types';
import { BaseTag } from '@/types/common';

const contentDirectory = path.join(process.cwd(), 'src/content')

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

export interface BlogPost {
  slug: string
  title: string
  date: string
  publishedAt: string
  excerpt?: string
  content: {
    html?: string
    markdown?: string
    raw?: string
  }
  tags: BaseTag[]
  readingTime: {
    text: string
    minutes: number
    time: number
    words: number
  }
  [key: string]: any
}

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(contentDirectory)
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(contentDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        content: {
          markdown: content,
          raw: content,
        },
        publishedAt: data.date || data.publishedAt || new Date().toISOString(),
        readingTime: data.readingTime || {
          text: '5 min read',
          minutes: 5,
          time: 300000,
          words: 1000
        },
        ...data,
      } as BlogPost
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return allPostsData
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content: {
        markdown: content,
        raw: content,
      },
      publishedAt: data.date || data.publishedAt || new Date().toISOString(),
      readingTime: data.readingTime || {
        text: '5 min read',
        minutes: 5,
        time: 300000,
        words: 1000
      },
      ...data,
    } as BlogPost
  } catch (error) {
    return null
  }
}

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(contentDirectory)
  return fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''))
}
