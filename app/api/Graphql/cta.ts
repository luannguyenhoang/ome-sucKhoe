import { gql } from "@apollo/client";

export const GET_CTA = gql`
  query MyQuery {
    allCta {
      nodes {
        ctaMain {
          cta {
            hotline
            messenger
            zalo
          }
        }
      }
    }
  }
`;
