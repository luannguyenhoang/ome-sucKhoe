import { gql } from "@apollo/client";

export const GET_LIEN_LAC = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjE5Mg==") {
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
