import { gql } from "@apollo/client";

export const GET_SEO_Y_HOC_HEN_DAI = gql`
  query MyQuery {
    pageBy(uri: "y-hoc-hien-dai") {
      seo {
        fullHead
      }
    }
  }
`;
