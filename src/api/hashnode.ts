import type { AllPostsData, PageInfo, Post, PostData, SeriesData } from "../types";
import { GraphQLClient, gql } from "graphql-request";

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

export const fetchAllPosts = async (cursor: string = ""): Promise<{ posts: Post[], pageInfo: PageInfo }> => {
  const data = await getPostsAtCursor(cursor);

  return {
    posts: data.publication.posts.edges.map(({ node }: { node: Post }) => node),
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
          series {
            name
            slug
            description
            posts {
              title
              slug
            }
          }
        }
      }
    `
  );

  return data.publication.series;
};