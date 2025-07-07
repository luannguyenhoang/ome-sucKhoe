import { gql } from "@apollo/client";

export const GET_FORM = gql`
  query MyQuery {
    allForm {
      nodes {
        formMain {
          form {
            formMain
            formPopup
          }
        }
      }
    }
  }
`;
