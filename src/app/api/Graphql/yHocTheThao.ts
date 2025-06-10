import { gql } from "@apollo/client";

export const GET_SEO_Y_HOC_THE_THAO = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjI0MQ==") {
      seo {
        fullHead
      }
    }
  }
`;
