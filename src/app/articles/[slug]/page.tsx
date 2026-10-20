import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs } from '@/lib/server/mdxServer';
import { MdxRenderer } from '@/components/article/MdxRenderer';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${post.title} | Abhinandan's Blog`,
    description: post.brief || `Read ${post.title} on Abhinandan's Technical Blog`,
    openGraph: {
      title: post.title,
      description: post.brief,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author?.name || 'Abhinandan Mishra'],
      images: post.coverImage?.url ? [post.coverImage.url] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.brief,
      images: post.coverImage?.url ? [post.coverImage.url] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const mdxPost = getPostBySlug(slug);

  if (!mdxPost) {
    notFound();
  }

  return <MdxRenderer post={mdxPost} />;
}
