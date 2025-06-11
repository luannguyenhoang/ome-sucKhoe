import { gql } from "@apollo/client";

export const GET_SEO_PHUC_HOI_CHUC_NANG = gql`
  query MyQuery {
    pageBy(uri: "phuc-hoi-chuc-nang") {
      seo {
        fullHead
      }
    }
  }
`;
