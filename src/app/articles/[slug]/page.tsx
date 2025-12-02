import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs } from '@/lib/mdx';
import { getPost } from '@/lib/api/hashnode';
import { IntegratedArticleRenderer } from '@/components/article';
import LikeButton from '@/components/LikeButton';

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const mdxPost = getPostBySlug(slug);
  const hashnodePost = await getPost(slug);

  if (!mdxPost && !hashnodePost) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* <BackButton /> */}

      <IntegratedArticleRenderer
        hashnodePost={hashnodePost}
        mdxPost={mdxPost ?? undefined}
      />

      {/* Like Button */}
      <div className="mt-12 flex justify-center">
        <LikeButton slug={slug} />
      </div>

      {/* Only show comments for Hashnode posts */}
      {/* {post && (
        <Comments
          comments={post.comments}
          userProfilePicture={post.author.profilePicture}
          onPostComment={async (content) => {
            console.log("Posting comment:", content);
          }}
          navigateToHashnode={navigateToHashnode}
        />
      )} */}
    </div>
  );
}
