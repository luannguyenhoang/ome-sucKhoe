"use client";
import { defaultPosts } from "@/data/DefaultPosts";
import {
    getCategoryColor,
    getCategoryDisplayName,
} from "@/utils/getCategoryDisplayNameAndColor";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AnimateOnScroll from "../atoms/AnimateOnScroll";

interface Post {
  title: string;
  slug: string;
  category: string;
  featured_image: string;
  author: string;
  date?: string;
}

export default function Sesion3() {
  const [posts, setPosts] = useState<Post[]>(defaultPosts);
  const [isLoading, setIsLoading] = useState(true);

  const categories = useMemo(
    () => ["y-hoc-co-truyen", "nhi-khoa", "san-phu-khoa", "y-hoc-the-thao"],
    []
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsPromises = categories.map((category) =>
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
              return defaultPosts.find((p) => p.category === category);
            })
            .catch((error) => {
              console.error(`Error fetching post for ${category}:`, error);
              return defaultPosts.find((p) => p.category === category);
            })
        );

        const results = await Promise.all(postsPromises);
        const fetchedPosts = results.filter((post) => post !== null) as Post[];

        if (fetchedPosts.length > 0) {
          setPosts(fetchedPosts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [categories]);

  return (
    <AnimateOnScroll>
      <section className="py-10 overflow-hidden z-0">
        <div className="w-full px-0 mx-0">
          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar lg:overflow-x-hidden">
            <div className="flex w-full flex-nowrap">
              {posts.map((post, index) => (
                <div
                  key={index}
                  className="relative min-w-[100vw] sm:min-w-[50vw] md:min-w-[33.333vw] lg:w-1/4 lg:min-w-0 h-[500px] overflow-hidden border-0 snap-start"
                >
                  <Link
                    href={`/posts/${post.slug}`}
                    className="block group h-full"
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={post.featured_image || "/no-image.jpeg"}
                        alt={post.title}
                        fill
                        className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
                          isLoading ? "animate-pulse bg-gray-300" : ""
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

                      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                        <div
                          className={`text-xs font-bold text-white px-2 py-1 rounded-sm mb-2 inline-block ${getCategoryColor(
                            post.category
                          )}`}
                        >
                          {getCategoryDisplayName(post.category)}
                        </div>
                        <h3 className="text-white text-lg font-bold mb-2 line-clamp-2 z-0">
                          <div className="relative overflow-hidden group/title">
                            <span className="relative inline bg-[linear-gradient(transparent_calc(100%_-_2px),#FFFFFF_calc(100%_-_2px))] bg-no-repeat bg-[length:0%_100%] group-hover/title:bg-[length:100%_100%] transition-all duration-1000">
                              {post.title}
                            </span>
                          </div>
                        </h3>
                        <div className="flex items-center text-xs text-gray-300">
                          <span>BY {post.author}</span>
                          <span className="mx-2">•</span>
                          <span>
                            {post?.date
                              ? new Date(post.date).toLocaleDateString()
                              : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <style jsx global>{`
            /* Hide scrollbar for Chrome, Safari and Opera */
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }

            /* Hide scrollbar for IE, Edge and Firefox */
            .no-scrollbar {
              -ms-overflow-style: none; /* IE and Edge */
              scrollbar-width: none; /* Firefox */
            }
          `}</style>
        </div>
      </section>
    </AnimateOnScroll>
  );
}
