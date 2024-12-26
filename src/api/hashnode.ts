import type { AllPostsData, Post, PostData, SeriesData } from "../types";
import { GraphQLClient, gql } from "graphql-request";

export const getClient = () => {
  return new GraphQLClient("https://gql.hashnode.com");
};

const myHashnodeURL = "abhinandanmishra1.hashnode.dev";

export const getPreviewPosts = async () => {
  const client = getClient();

  const allPosts = await client.request<AllPostsData>(
    gql`
      query allPosts {
        publication(host: "${myHashnodeURL}") {
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
        publication(host: "${myHashnodeURL}") {
          id
          title
          posts(first: 10, after: "${cursor}") {
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

export const fetchAllPosts = async (): Promise<Post[]> => {
  let cursor = "";
  let hasNextPage = true;
  const postList = [];

  while (hasNextPage) {
    const data = await getPostsAtCursor(cursor);

    postList.push(
      ...data.publication.posts.edges.map(({ node }: { node: Post }) => node)
    );

    cursor = data.publication.posts.pageInfo.endCursor;
    hasNextPage = data.publication.posts.pageInfo.hasNextPage;
  }

  return postList;
};

export const getPost = async (slug?: string) => {
  const client = getClient();

  const data = await client.request<PostData>(
    gql`
      query postDetails($slug: String!) {
        publication(host: "${myHashnodeURL}") {
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
        publication(host: "${myHashnodeURL}") {
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