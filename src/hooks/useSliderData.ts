"use client";

import { Post } from "@/src/types/Post";
import { ALLOWED_CATEGORIES } from "@/src/utils/category";
import { useEffect, useState } from "react";

export const useSliderData = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const fetchNewestPosts = async () => {
      setLoading(true);
      setIsEmpty(false);

      try {
        const postsPromises = ALLOWED_CATEGORIES.map((category) =>
          fetch(`/suc-khoe/api/posts?category=${category}&size=1`, {
            next: { revalidate: 0 },
            cache: "no-store"
          })
            .then((res) => {
              if (!res.ok)
                throw new Error(`Failed to fetch posts for ${category}`);
              return res.json();
            })
            .then((data) => {
              const post = data.posts?.[0];
              if (post) {
                return {
                  ...post,
                  category: category,
                  featured_image:
                    post.featured_image || "/suc-khoe/no-image.jpeg"
                };
              }
              return null;
            })
            .catch((error) => {
              console.error(`Error fetching post for ${category}:`, error);
              return null;
            })
        );

        const results = await Promise.all(postsPromises);
        const newestPosts = results.filter((post) => post !== null);

        if (newestPosts.length > 0) {
          setPosts(newestPosts);
        } else {
          setPosts([]);
          setIsEmpty(true);
        }
      } catch (error) {
        console.error("Error fetching newest posts:", error);
        setPosts([]);
        setIsEmpty(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNewestPosts();
  }, []);

  return { posts, loading, isEmpty };
};
