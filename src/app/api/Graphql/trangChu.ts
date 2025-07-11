import { gql } from "@apollo/client";

export const GET_SEO_TRANG_CHU = gql`
  query MyQuery {
    pageBy(uri: "trang-chu") {
      seo {
        fullHead
      }
    }
  }
`;
