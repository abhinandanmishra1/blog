import { describe, it, expect } from '@jest/globals';
import { getPostBySlug, getAllPosts, getAllSlugs } from '../mdxServer';

describe('MDX Server Functions', () => {
    describe('getAllSlugs', () => {
        it('should return an array of slugs', () => {
            const slugs = getAllSlugs();
            expect(Array.isArray(slugs)).toBe(true);
            expect(slugs.length).toBeGreaterThan(0);
        });

        it('should include mdx-blog-guide slug', () => {
            const slugs = getAllSlugs();
            expect(slugs).toContain('mdx-blog-guide');
        });
    });

    describe('getAllPosts', () => {
        it('should return an array of MDX posts', () => {
            const posts = getAllPosts();
            expect(Array.isArray(posts)).toBe(true);
            expect(posts.length).toBeGreaterThan(0);
        });

        it('should have required fields', () => {
            const posts = getAllPosts();
            const post = posts[0];

            expect(post).toHaveProperty('slug');
            expect(post).toHaveProperty('title');
            expect(post).toHaveProperty('brief');
            expect(post).toHaveProperty('publishedAt');
            expect(post).toHaveProperty('content');
            expect(post).toHaveProperty('readingTime');
            expect(post).toHaveProperty('tags');
        });

        it('should have content.raw as a string', () => {
            const posts = getAllPosts();
            const post = posts[0];

            expect(post.content).toHaveProperty('raw');
            expect(typeof post.content.raw).toBe('string');
            expect(post.content.raw.length).toBeGreaterThan(0);
        });
    });

    describe('getPostBySlug', () => {
        it('should return a post for valid slug', () => {
            const post = getPostBySlug('mdx-blog-guide');
            expect(post).not.toBeNull();
            expect(post?.slug).toBe('mdx-blog-guide');
        });

        it('should return null for invalid slug', () => {
            const post = getPostBySlug('non-existent-slug');
            expect(post).toBeNull();
        });

        it('should have content.raw as a non-empty string', () => {
            const post = getPostBySlug('mdx-blog-guide');
            expect(post).not.toBeNull();
            expect(post?.content).toHaveProperty('raw');
            expect(typeof post?.content.raw).toBe('string');
            expect(post?.content.raw.length).toBeGreaterThan(0);
        });

        it('should parse frontmatter correctly', () => {
            const post = getPostBySlug('mdx-blog-guide');
            expect(post).not.toBeNull();
            expect(post?.title).toBe('The Ultimate Guide to Writing MDX Blogs');
            expect(post?.brief).toBeTruthy();
            expect(post?.tags).toBeDefined();
            expect(Array.isArray(post?.tags)).toBe(true);
        });

        it('should have valid readingTime object', () => {
            const post = getPostBySlug('mdx-blog-guide');
            expect(post).not.toBeNull();
            expect(post?.readingTime).toHaveProperty('text');
            expect(post?.readingTime).toHaveProperty('minutes');
            expect(post?.readingTime).toHaveProperty('time');
            expect(post?.readingTime).toHaveProperty('words');
        });
    });
});
