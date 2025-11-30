import type {
  AllPostsData,
  HashnodePostNode,
  HashnodeSeries,
  HashnodeTag,
  PostData,
  SeriesData,
  SubscribeToNewsletterResponse,
} from "@/types/hashnode";
import { GraphQLClient, gql } from "graphql-request";

import { siteMetadata } from "@/data/metadata";

export const getClient = () => {
  return new GraphQLClient("https://gql.hashnode.com");
};

const hashnodeURL = "abhinandanmishra1.hashnode.dev";

export const getPreviewPosts = async () => {
  const client = getClient();

  const allPosts = await client.request<AllPostsData>(
    gql`
      query allPosts {
        publication(host: "${hashnodeURL}") {
          id
          title
          posts(first: 6) {
            pageInfo{
              hasNextPage
              endCursor
            }
            edges {
              node {
                id
                author{
                  name
                  profilePicture
                }
                title
                brief
                slug
                coverImage {
                  url
                }
                tags {
                  name
                  slug
                }
                series {
                  name
                  slug
                }
                publishedAt
                readTimeInMinutes
              }
            }
          }
        }
      }
    `
  );

  return allPosts.publication.posts.edges.map(({ node }) => node);
};

const getPostsAtCursor = async (cursor = "", limit = 6) => {
  const client = getClient();

  const allPosts = await client.request<AllPostsData>(
    gql`
      query allPosts {
        publication(host: "${hashnodeURL}") {
          id
          title
          posts(first: ${limit}, after: "${cursor}") {
            pageInfo{
              hasNextPage
              endCursor
            }
            edges {
              node {
                id
                author{
                  name
                  profilePicture
                }
                title
                subtitle
                brief
                slug
                canonicalUrl
                coverImage {
                  url
                }
                tags {
                  name
                  slug
                }
                series {
                  name
                  slug
                }
                publishedAt
                updatedAt
                readTimeInMinutes
                content {
                  html
                }
                seo {
                  description
                }
                views
              }
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
    `
  );

  return allPosts;
};

export const fetchAllPosts = async (
  cursor: string = "",
  limit: number = 6
) => {
  const data = await getPostsAtCursor(cursor, limit);

  return {
    posts: data.publication.posts.edges.map(({ node }) => node),
    pageInfo: data.publication.posts.pageInfo,
  };
};

export const getPost = async (slug?: string) => {
  const client = getClient();

  const data = await client.request<PostData>(
    gql`
      query postDetails($slug: String!) {
        publication(host: "${hashnodeURL}") {
          post(slug: $slug) {
            id
            author {
              name
              profilePicture
            }
            publishedAt
            title
            brief
            slug
            readTimeInMinutes
            content {
              html
              markdown
            }
            tags {
              name
              slug
            }
            series {
              name
              slug
              description {
                html
              }
              posts(first: 20) {
                totalDocuments
              }
            }
            coverImage {
              url
            }
            comments(first: 8) {
              edges {
                node {
                  content {
                    html
                  }
                  replies(first: 4) {
                    totalDocuments
                    edges {
                      node {
                        content {
                          html
                        }
                        author {
                          name
                          id
                          profilePicture
                        }
                        dateAdded
                      }
                    }
                  }
                  author {
                    name
                    id
                    profilePicture
                  }
                  dateAdded
                }
              }
            }
          }
        }
      }
    `,
    { slug }
  );

  return data.publication.post;
};


export const getAllSeries = async () => {
  const client = getClient();

  const data = await client.request<SeriesData>(
    gql`
      query getAllSeries {
        publication(host: "${hashnodeURL}") {
          seriesList(first: 20) {
            edges {
              node {
                name
                description {
                  html
                }
                coverImage
                slug

                posts(first: 20) {
                  edges {
                    node {
                      views
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  );

  return data.publication.seriesList.edges.map(({ node }) => {
    return {
      ...node,
      views:
        node.posts?.edges.reduce((acc, curr) => acc + curr.node.views, 0) || 0,
    };
  });
};

export const getAllPostsTagWise = async () => {
  let cursor = "";
  let hasNextPage = true;
  const allPosts: HashnodePostNode[] = [];

  while (hasNextPage) {
    const { posts, pageInfo } = await fetchAllPosts(cursor);
    allPosts.push(...posts);
    cursor = pageInfo.endCursor;
    hasNextPage = pageInfo.hasNextPage;
  }

  const tagWisePosts = siteMetadata.tags.reduce((acc, tag) => {
    acc[tag.slug] = allPosts.filter((post) =>
      post.tags.some((t: HashnodeTag) => t.slug === tag.slug)
    );
    return acc;
  }, {} as Record<string, HashnodePostNode[]>);

  return tagWisePosts;
};


export const getSeries = async (slug?: string, cursor: string = "") => {
  const client = getClient();
  const data = await client.request<{
    publication: { series: HashnodeSeries };
  }>(
    gql`
      query getSeries($slug: String!) {
        publication(host: "${hashnodeURL}") {
          series(slug: $slug) {
            id
            name
            description {
              html
            }
            coverImage
            slug
            posts(first: 8, after: "${cursor}") {
              edges {
                node {
                  title
                  slug
                  brief
                  tags {
                    name
                    slug
                  }
                  coverImage {
                    url
                  }
                  publishedAt
                  updatedAt
                  readTimeInMinutes
                }
              }
              pageInfo {
                endCursor
                hasNextPage
              }
            }
          }
        }
      }
    `,
    { slug }
  );

  return {
    ...data.publication.series,
    views: data.publication.series.posts.edges.reduce(
      (acc, curr) => acc + curr.node.views,
      0
    ),
  };
};

export const subscribeToNewsletter = async (email: string) => {
  const client = getClient();
  try {
    const data = await client.request<SubscribeToNewsletterResponse>(gql`
      mutation subscribeToNewsletter($input: SubscribeToNewsletterInput!) {
        subscribeToNewsletter(input: $input) {
          status
        }
      }
    `, { input: { email, publicationId: "62a0d9bb68ad9b73958af585" } });

    return {
      status: data.subscribeToNewsletter.status,
      error: null
    };
  } catch (error: any) {
    const errorMessage = error.response?.errors?.[0]?.message;
    return {
      status: "error",
      error: errorMessage || "Something went wrong",
    };
  }
};

export const searchPosts = async (query: string) => {
  const client = getClient();
  const allPosts = await getAllPostsTagWise();
  const uniquePosts = new Map<string, HashnodePostNode>();
  Object.values(allPosts).flat().forEach(post => {
    uniquePosts.set(post.slug, post);
  });

  const posts = Array.from(uniquePosts.values());

  const lowerQuery = query.toLowerCase();
  const terms = lowerQuery.split(/\s+/).filter(term => term.length > 0);

  return posts.filter(post => {
    const title = post.title.toLowerCase();
    const brief = post.brief.toLowerCase();
    const tags = post.tags.map(t => t.name.toLowerCase());

    // Check if ALL terms match at least one field (AND logic)
    return terms.every(term =>
      title.includes(term) ||
      brief.includes(term) ||
      tags.some(tag => tag.includes(term))
    );
  });
};
