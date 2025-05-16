"use client";

import { CardBlog } from "@/app/components/atoms/CardBlog";
import { LoadingListPost } from "@/app/components/atoms/LoadingListPost";
import {
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Heading
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import xss from "xss";

export const SamePosts = ({
  categories,
  currentSlug,
}: {
  categories: Array<{ slug: string; name: string; id: string }> | string[];
  currentSlug: string;
}) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!categories.length || !currentSlug) {
      setIsLoading(false);
      return;
    }

    const getPosts = async () => {
      setIsLoading(true);
      try {
        const categoryQuery = categories
          .map((cat) => {
            const slug = typeof cat === "string" ? cat : cat.slug;
            return `categories=${encodeURIComponent(slug)}`;
          })
          .join("&");

        const res = await fetch(
          `/api/same-posts?size=3&${categoryQuery}&exclude=${currentSlug}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: { posts: any[] } = await res.json();
        if (isMounted) setPosts(data.posts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        if (isMounted) setError("Không thể tải bài viết.");
      }
      if (isMounted) setIsLoading(false);
    };

    getPosts();

    return () => {
      isMounted = false;
    };
  }, [categories, currentSlug]);

  return (
    <>
      <Divider pt="32px" />
      <Box pt="20px">
        <HStack justifyContent="space-between" pb="16px">
          <Heading as="h3" size="md">
            Có thể bạn quan tâm
          </Heading>
          <Button as={Link} href="/thu-vien" variant="link" colorScheme="red">
            Xem tất cả
          </Button>
        </HStack>

        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {posts.map((post: any, index: number) => {
              const category = post.categories?.[0] || "";
              const tag = category === "tuyen-dung" ? "Tuyển dụng" : "Tin tức";

              return (
                <GridItem key={index}>
                  <CardBlog
                    title={xss(post?.title)}
                    desc={xss(post?.excerpt)}
                    image={post?.featured_image || ""}
                    path={`/${post?.slug}`}
                    tag={tag}
                  />
                </GridItem>
              );
            })}
          </div>
        )}
        {isLoading && <LoadingListPost count={3} col={3} />}
        {!isLoading && posts?.length === 0 && (
          <Grid placeItems={"center"} height={"40vh"}>
            Dữ liệu đang được chúng tôi cập nhập
          </Grid>
        )}
      </Box>
    </>
  );
};
