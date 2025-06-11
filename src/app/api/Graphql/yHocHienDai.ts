import { gql } from "@apollo/client";

export const GET_SEO_Y_HOC_HEN_DAI = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjIzNg==") {
      seo {
        fullHead
      }
    }
  }
`;
