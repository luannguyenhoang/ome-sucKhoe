import { gql } from "@apollo/client";

export const GET_SEO = gql`
  query GetSeo($uri: String!) {
    pageBy(uri: $uri) {
      seo {
        fullHead
      }
    }
  }
`;
