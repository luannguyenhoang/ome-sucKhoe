import { getClient } from "@/src/lib/ApolloClient";
import { NextRequest, NextResponse } from "next/server";
import { GET_POSTS, GET_POSTS_BY_CATEGORY, SEARCH_POSTS } from "../Graphql/posts";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const size = searchParams.get("size");
  const offset = searchParams.get("offset");
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const additionalCategory = searchParams.get("additionalCategory");

  const pageSize = size ? parseInt(size) : 6;
  const offsetValue = offset ? parseInt(offset) : 0;

  try {
    let data;
    
    if (search) {
      // Sử dụng query tìm kiếm
      const variables = { search, size: pageSize, offset: offsetValue };
      const response = await getClient().query({ query: SEARCH_POSTS, variables });
      data = response.data;
    } else if (category) {
      // Sử dụng query lọc theo danh mục
      const variables = { slug: category, size: pageSize, offset: offsetValue };
      const response = await getClient().query({ query: GET_POSTS_BY_CATEGORY, variables });
      data = response.data;
    } else {
      // Query thông thường
      const variables = { size: pageSize, offset: offsetValue };
      const response = await getClient().query({ query: GET_POSTS, variables });
      data = response.data;
    }

    if (!data?.posts) {
      return NextResponse.json(
        { error: "No posts available" },
        { status: 404 }
      );
    }

    let posts =
      data.posts.nodes.map((node: any) => ({
        title: node.title,
        slug: node.slug,
        date: node.date,
        excerpt: node.excerpt,
        featured_image: node.featuredImage?.node?.mediaItemUrl || "/suc-khoe/no-image.jpeg",
        categories:
          node.categories?.nodes.map((category: any) => category.slug) || [],
      })) || [];

    if (additionalCategory) {
      posts = posts.filter((post: { categories?: string[] }) => 
        post.categories && post.categories.includes(additionalCategory)
      );
    }

    const totalPosts = additionalCategory ? posts.length.toString() : data.posts.pageInfo.offsetPagination.total.toString();
    const pageInfo = {
      hasMore: additionalCategory ? false : data.posts.pageInfo.offsetPagination.hasMore,
      hasPrevious: additionalCategory ? false : data.posts.pageInfo.offsetPagination.hasPrevious,
      total: additionalCategory ? posts.length : data.posts.pageInfo.offsetPagination.total,
    };

    return NextResponse.json({ posts, totalPosts, pageInfo }, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
