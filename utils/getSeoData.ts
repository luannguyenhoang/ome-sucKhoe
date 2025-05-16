import { SeoData } from "@/types/SeoData";
import { ApolloClient, DocumentNode, InMemoryCache } from "@apollo/client";


/**
 * @param query
 * @param nodeKey
 * @param extraData
 * @param variables
 * @returns
 */
export async function getSeoData(
  query: DocumentNode,
  nodeKey: string,
  extraData: string[] = [],
  variables?: Record<string, any>
): Promise<SeoData> {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    ssrMode: true,
    cache: new InMemoryCache()
  });

  try {
    const response = await client.query({
      query,
      variables,
      fetchPolicy: "network-only"
    });

    // Handle both node-based and direct page queries
    let nodeData;

    // For direct page queries like GET_SEO_PAGE_CONG_NGHE_THONG_TIN
    nodeData = response?.data?.[nodeKey] || {};

    const result: SeoData = {
      seo: nodeData?.seo || {}
    };

    if (extraData.length > 0) {
      extraData.forEach((key) => {
        if (nodeData[key]) {
          result[key] = nodeData[key];
        }
      });
    }

    return result;
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {
      seo: {}
    };
  }
}
