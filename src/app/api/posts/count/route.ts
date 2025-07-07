import { getClient } from "@/src/lib/ApolloClient";
import { NextResponse } from "next/server";
import { GET_POSTS_COUNT_BY_CATEGORY } from "../../Graphql/posts";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  if (!category) {
    return NextResponse.json(
      { error: "Category is required" },
      { status: 400 }
    );
  }

  try {
    const { data } = await getClient().query({
      query: GET_POSTS_COUNT_BY_CATEGORY,
      variables: {
        slug: category
      }
    });

    return NextResponse.json({
      total: data.posts.pageInfo.offsetPagination.total
    });
  } catch (error) {
    console.error("Error fetching post count:", error);
    return NextResponse.json(
      { error: "Failed to fetch post count" },
      { status: 500 }
    );
  }
}
