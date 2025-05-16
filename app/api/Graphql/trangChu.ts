import { gql } from "@apollo/client";

export const GET_SEO_TRANG_CHU = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjE4OQ==") {
      seo {
        fullHead
      }
    }
  }
`;
