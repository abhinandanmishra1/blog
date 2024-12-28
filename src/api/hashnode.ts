import type {
  AllPostsData,
  HashnodePostNode,
  HashnodeSeries,
  PostData,
  SeriesData,
  Tag,
} from "../types";
import { GraphQLClient, gql } from "graphql-request";

import { siteMetadata } from "../data/metadata";

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

const getPostsAtCursor = async (cursor = "") => {
  const client = getClient();

  const allPosts = await client.request<AllPostsData>(
    gql`
      query allPosts {
        publication(host: "${hashnodeURL}") {
          id
          title
          posts(first: 6, after: "${cursor}") {
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
  cursor: string = ""
) => {
  const data = await getPostsAtCursor(cursor);

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
                edges {
                  node {
                    title
                    slug
                  }
                }
              }
            }
            coverImage {
              url
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
      post.tags.some((t: Tag) => t.slug === tag.slug)
    );
    return acc;
  }, {} as Record<string, HashnodePostNode[]>);

  return tagWisePosts;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getSeries = async (slug?: string, cursor: string = "") => {
  const client = getClient();
  await wait(2000);
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
