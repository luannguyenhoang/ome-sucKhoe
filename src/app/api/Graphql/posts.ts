import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts($size: Int!, $offset: Int!) {
    posts(where: { offsetPagination: { size: $size, offset: $offset } }) {
      pageInfo {
        offsetPagination {
          hasMore
          hasPrevious
          total
        }
      }
      nodes {
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        categories {
          nodes {
            slug
          }
        }
      }
    }
  }
`;

export const SEARCH_POSTS = gql`
  query SearchPosts($search: String!, $size: Int!, $offset: Int!) {
    posts(
      where: {
        search: $search
        offsetPagination: { size: $size, offset: $offset }
      }
    ) {
      pageInfo {
        offsetPagination {
          hasMore
          hasPrevious
          total
        }
      }
      nodes {
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        categories {
          nodes {
            slug
          }
        }
      }
    }
  }
`;

export const GET_SAME_POSTS = gql`
  query GetPostsByCategory($category: String!, $size: Int!) {
    posts(first: $size, where: { categoryName: $category }) {
      nodes {
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        categories {
          nodes {
            slug
            name
            id
          }
        }
      }
    }
  }
`;

export const GET_POSTS_BY_CATEGORY = gql`
  query GetPostsByCategory($slug: String!, $size: Int!, $offset: Int!) {
    posts(
      where: {
        categoryName: $slug
        offsetPagination: { size: $size, offset: $offset }
      }
    ) {
      pageInfo {
        offsetPagination {
          hasMore
          hasPrevious
          total
        }
      }
      nodes {
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        categories {
          nodes {
            slug
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($id: ID!) {
    post(id: $id, idType: SLUG) {
      title
      slug
      date
      content
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      categories {
        nodes {
          slug
        }
      }

      seo {
        fullHead
      }
    }
  }
`;

export const GET_SITEMAP = gql`
  query NewQuery {
    posts {
      nodes {
        slug
      }
    }
  }
`;

export const GET_SEO_PAGE_POSTS = gql`
  query MyQuery {
    pageBy(uri: "thu-vien") {
      seo {
        fullHead
      }
    }
  }
`;

export const GET_POSTS_COUNT_BY_CATEGORY = gql`
  query GetPostsCountByCategory($slug: String!) {
    posts(where: { categoryName: $slug }) {
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
`;
