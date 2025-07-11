import { gql } from "@apollo/client";

export const GET_EVENT = gql`
  query MyQuery {
    pageBy(uri: "su-kien") {
      event {
        content {
          link
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
export const GET_EVENT_UPCOMING = gql`
  query MyQuery {
    pageBy(uri: "su-kien") {
      event {
        content2 {
          link
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
        }
      }
    }
  }
`;
