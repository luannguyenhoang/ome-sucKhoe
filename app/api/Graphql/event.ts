import { gql } from "@apollo/client";

export const GET_EVENT = gql`
 query MyQuery {
  pageBy(id: "cG9zdDozMjE0NA==") {
    event {
      content {
        date
        endTime
        eventname
        fieldGroupName
        name
        starttime
        banner {
          node {
            mediaItemUrl
          }
        }
        logo {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
}
`;
