import { gql } from "@apollo/client";

export const GET_CATEGORY = gql`
  query MyQuery {
    allCategory {
      nodes {
        categoryPost {
          content {
            nameCategory
            image {
              node {
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  }
`;
