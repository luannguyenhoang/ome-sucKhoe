import { gql } from "@apollo/client";

export const GET_LIEN_LAC = gql`
  query MyQuery {
    pageBy(uri: "lien-lac") {
      id
      lienLac {
        fieldGroupName
        title
        content {
          title
          url
        }
      }
    }
  }
`;
