import { ApolloClient, DocumentNode } from "@apollo/client";
import { InMemoryCache } from "@apollo/experimental-nextjs-app-support";

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    ssrMode: typeof window === "undefined",
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "cache-first",
      },
    },
  });
  
  export const getData = async (query: DocumentNode) => {
    try {
      const response = await client.query({
        query,
        fetchPolicy: "cache-first",
      });
  
      if (!response?.data) {
        throw new Error(
          `GraphQL query failed with status: ${response?.networkStatus}`
        );
      }
  
      return response.data;
    } catch (error) {
      console.error("GraphQL Error:", error);
      return null;
    }
  }; 