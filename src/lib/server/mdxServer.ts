import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MdxPost } from '@/types/mdx'

const contentDirectory = path.join(process.cwd(), 'src/content')

export function getAllPosts(): MdxPost[] {
  const fileNames = fs.readdirSync(contentDirectory)
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(contentDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      // Default values for required fields
      const defaultData = {
        readingTime: {
          text: "1 min read",
          minutes: 1,
          time: 60000,
          words: 200
        },
        tags: [],
        metadata: {
          language: 'en',
          isDraft: false,
          isArchived: false
        },
        content: {
          raw: content
        },
        publishedAt: data.date || new Date().toISOString(),
        title: data.title || fileName.replace(/\.mdx$/, ''),
        brief: data.excerpt || ''
      };

      return {
        slug,
        ...defaultData,
        ...data
      } satisfies MdxPost
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return allPostsData
}

export function getPostBySlug(slug: string): MdxPost | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Default values for required fields
    const defaultData = {
      readingTime: {
        text: "1 min read",
        minutes: 1,
        time: 60000,
        words: 200
      },
      tags: [],
      metadata: {
        language: 'en',
        isDraft: false,
        isArchived: false
      },
      content: {
        raw: content
      },
      publishedAt: data.date || new Date().toISOString(),
      title: data.title || slug,
      brief: data.excerpt || ''
    };

    return {
      slug,
      ...defaultData,
      ...data
    } satisfies MdxPost
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
