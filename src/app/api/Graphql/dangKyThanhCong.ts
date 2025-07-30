import { gql } from "@apollo/client";

export const GET_SEO_PAGE_DANG_KY_TC = gql`
  query MyQuery {
    pageBy(uri: "dang-ky-thanh-cong") {
      seo {
        fullHead
      }
    }
  }
`;
