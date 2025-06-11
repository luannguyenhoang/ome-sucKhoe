import { gql } from "@apollo/client";

export const GET_SEO_VAN_DONG = gql`
  query MyQuery {
    pageBy(uri: "van-dong") {
      seo {
        fullHead
      }
    }
  }
`;
