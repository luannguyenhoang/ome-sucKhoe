"use client";

import { Post } from "@/types/Post";
import { ALLOWED_CATEGORIES } from "@/utils/category";
import { getCategoryDisplayName } from "@/utils/getCategoryDisplayNameAndColor";
import { useCallback, useEffect, useState } from "react";

const CACHE_DURATION = 60;
const CACHE_KEY = "slider_posts_cache";

export const useSliderData = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const getPostsFromCache = useCallback(() => {
    if (typeof window === "undefined") return null;

    try {
      const cacheData = localStorage.getItem(CACHE_KEY);
      if (!cacheData) return null;

      const { data, timestamp } = JSON.parse(cacheData);
      const now = Date.now();
      const cacheMinutes = CACHE_DURATION * 60 * 1000;

      if (now - timestamp < cacheMinutes) {
        return data;
      }

      return null;
    } catch (error) {
      console.error("Lỗi khi đọc cache:", error);
      return null;
    }
  }, []);

  const savePostsToCache = useCallback((data: Post[]) => {
    if (typeof window === "undefined") return;

    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.error("Lỗi khi lưu cache:", error);
    }
  }, []);

  const getFallbackPosts = useCallback(() => {
    return ALLOWED_CATEGORIES.map((category, index) => ({
      title: `Latest Article in ${getCategoryDisplayName(category)}`,
      slug: `latest-article-${category}`,
      category: category,
      date: new Date(Date.now() - index * 86400000).toISOString(),
      views: 1000 + Math.floor(Math.random() * 2000),
      featured_image: "no-image.jpeg",
      author: "ADMIN",
    }));
  }, []);

  const hasNewData = useCallback(
    (oldPosts: Post[], newPosts: Post[]): boolean => {
      if (oldPosts.length !== newPosts.length) return true;

      for (let i = 0; i < newPosts.length; i++) {
        const newPost = newPosts[i];
        const oldPost = oldPosts.find((p) => p.slug === newPost.slug);

        if (
          !oldPost ||
          oldPost.title !== newPost.title ||
          oldPost.date !== newPost.date
        ) {
          return true;
        }
      }

      return false;
    },
    []
  );

  useEffect(() => {
    const fetchNewestPosts = async () => {
      setLoading(true);

      const cachedPosts = getPostsFromCache();
      if (cachedPosts && cachedPosts.length > 0) {
        setPosts(cachedPosts);
        setLoading(false);
      }

      try {
        const postsPromises = ALLOWED_CATEGORIES.map((category) =>
          fetch(`/api/posts?category=${category}&size=1`, {
            next: { revalidate: 0 },
            cache: "no-store",
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
                  featured_image: post.featured_image || "/no-image.jpeg",
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
          if (cachedPosts && cachedPosts.length > 0) {
            if (hasNewData(cachedPosts, newestPosts)) {
              setPosts(newestPosts);
              savePostsToCache(newestPosts);
            }
          } else {
            setPosts(newestPosts);
            savePostsToCache(newestPosts);
          }
        } else if (!cachedPosts || cachedPosts.length === 0) {
          const fallbackData = getFallbackPosts();
          setPosts(fallbackData);
          savePostsToCache(fallbackData);
        }
      } catch (error) {
        console.error("Error fetching newest posts:", error);
        if (!cachedPosts || cachedPosts.length === 0) {
          setPosts(getFallbackPosts());
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNewestPosts();
  }, [getPostsFromCache, savePostsToCache, getFallbackPosts, hasNewData]);

  return { posts, loading };
}; 