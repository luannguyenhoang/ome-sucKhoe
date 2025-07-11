import { gql } from "@apollo/client";

export const GET_SEO_Y_HOC_CO_TRUYEN = gql`
  query MyQuery {
    pageBy(uri: "y-hoc-co-truyen") {
      seo {
        fullHead
      }
    }
  }
`;
