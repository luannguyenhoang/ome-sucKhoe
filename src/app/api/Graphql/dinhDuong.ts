import { gql } from "@apollo/client";

export const GET_SEO_DINH_DUONG = gql`
  query MyQuery {
    pageBy(uri: "dinh-duong") {
      seo {
        fullHead
      }
    }
  }
`;
