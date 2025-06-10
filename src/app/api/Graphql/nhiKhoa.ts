import { gql } from "@apollo/client";

export const GET_SEO_NHI_KHOA = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjIzNQ==") {
      seo {
        fullHead
      }
    }
  }
`;
