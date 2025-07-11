import { gql } from "@apollo/client";

export const GET_LIEN_HE = gql`
  query MyQuery {
    pageBy(uri: "lien-he") {
      id
      lienHe {
        content {
          help
          information
          description
          location
          phone
          email
          linkEmail
          trangWeb
          linkWeb
        }
      }
      seo {
        fullHead
      }
    }
  }
`;
