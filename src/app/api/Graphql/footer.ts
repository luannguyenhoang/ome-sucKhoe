import { gql } from "@apollo/client";

export const GET_FOOTER = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjE4OQ==") {
      id
      trangChu {
        footer {
          logo {
            node {
              mediaItemUrl
            }
          }
          description
          url {
            linkinstagram
            linkX
            linkFacebook
          }
        }
      }
    }
  }
`;
