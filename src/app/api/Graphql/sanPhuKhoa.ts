import { gql } from "@apollo/client";

export const GET_SEO_SAN_PHU_KHOA = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjIzOQ==") {
      seo {
        fullHead
      }
    }
  }
`;
