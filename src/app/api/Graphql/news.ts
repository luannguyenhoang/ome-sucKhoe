import { gql } from "@apollo/client";


export const GET_POSTS_AND_NEWS = gql`
  query GetPostsAndNews($size: Int!, $offset: Int!) {
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
    allNews {
      nodes {
        customeNews {
          image {
            node {
              mediaItemUrl
            }
          }
        }
        seo {
          fullHead
          title
          focusKeywords
        }
      }
    }
  }
`;
