import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";
import { setContext } from "@apollo/client/link/context";

const API_GRAPHQL =
  process.env.NEXT_PUBLIC_API_GRAPHQL || "https://adminsuckhoe.ome.edu.vn/graphql";
const API_TOKEN = process.env.TOKEN || "";

const httpLink = new HttpLink({
  uri: API_GRAPHQL,
  fetch,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: API_TOKEN ? `Bearer ${API_TOKEN}` : "",
    },
  };
});

export const { getClient, query } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
});
