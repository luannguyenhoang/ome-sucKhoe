"use client";
import { useEffect, useState } from "react";
import CardNewPostInDetailPost from "../atoms/CardNewPostInDetailPost";
import { LoadingNewPost } from "../atoms/LoadingNewPost";

export const NewPostInDetailPost = ({
  showTitle = true,
  count = 3,
  textColor = "text-black",
}: {
  showTitle?: boolean;
  count?: number;
  textColor?: string;
}) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryCounts, setCategoryCounts] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    const getLatestPosts = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(`/api/posts?size=${count}&offset=0`, {
          next: { revalidate: 1 },
        });

        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }

        const data: { posts: any[] } = await res.json();

        if (data.posts?.length) {
          setPosts(data.posts);
          const counts: { [key: string]: number } = {};
          await Promise.all(
            data.posts.map(async (post) => {
              const category = post.categories[0];
              if (category && !counts[category]) {
                try {
                  const countRes = await fetch(
                    `/api/posts/count?category=${category}`
                  );
                  if (countRes.ok) {
                    const countData = await countRes.json();
                    counts[category] = countData.total;
                  }
                } catch (error) {
                  console.error(
                    `Error fetching count for category ${category}:`,
                    error
                  );
                  counts[category] = 0;
                }
              }
            })
          );
          setCategoryCounts(counts);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching latest posts:", error);
        setPosts([]);
      }

      setIsLoading(false);
    };

    getLatestPosts();
  }, [count]);

  if (posts.length === 0 && !isLoading) {
    return (
      <div className="py-10">
        <div className="max-w-[900px] mx-auto text-center">
          <p>Không có bài viết mới nào.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mb-6">
      {showTitle && (
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold text-black mr-2 uppercase">
            Bài viết mới nhất
          </h2>
          <div className="h-2 w-2 rounded-full bg-blue-600 mr-1"></div>
          <div className="flex-1 gap-2">
            <div className="flex-1 h-[1px] mb-1 bg-gray-200"></div>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </div>
        </div>
      )}
      {isLoading ? (
        <LoadingNewPost count={count} />
      ) : (
        posts.map((post, index) => (
          <CardNewPostInDetailPost
            key={index}
            post={post}
            categoryCounts={categoryCounts}
            textColor={textColor}
          />
        ))
      )}
    </div>
  );
};
