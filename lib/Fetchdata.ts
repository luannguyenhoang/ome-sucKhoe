import { getClient } from "./ApolloClient";

export async function fetchData<T = any>(
  query: any,
  dataKey: string
): Promise<T | null> {
  try {
    const response = await getClient().query({ query });

    const nodes = response?.data?.[dataKey]?.nodes;
    if (!nodes?.length) return null;

    return nodes[0] as T;
  } catch (error: any) {
    console.error("Error fetching nodes:", error.message || error);
    return null;
  }
}
