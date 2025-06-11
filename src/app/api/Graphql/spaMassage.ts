import { gql } from "@apollo/client";

export const GET_SEO_SPA_MASSAGE = gql`
  query MyQuery {
    pageBy(uri: "spa-massage") {
      seo {
        fullHead
      }
    }
  }
`;
