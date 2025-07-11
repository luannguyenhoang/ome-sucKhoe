import { gql } from "@apollo/client";

export const GET_FOOTER = gql`
  query MyQuery {
    pageBy(uri: "trang-chu") {
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
