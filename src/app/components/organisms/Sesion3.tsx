"use client";
import { defaultPosts } from "@/src/data/DefaultPosts";
import {
  getCategoryColor,
  getCategoryDisplayName,
} from "@/src/utils/getCategoryDisplayNameAndColor";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Sesion3() {
  const [posts, setPosts] = useState<any[]>();
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [navState, setNavState] = useState({ start: true, end: false });
  const categories = useMemo(
    () => [
      "y-hoc-co-truyen",
      "y-hoc-hien-dai",
      "spa-massage",
      "van-dong",
      "dinh-duong",
      "phuc-hoi-chuc-nang",
    ],
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const results = await Promise.all(
          categories.map(async (cat) => {
            try {
              const res = await fetch(`/suc-khoe/api/posts?category=${cat}&size=1`, {
                cache: "no-store",
              });

              const { posts } = await res.json();
              const post = posts?.[0];
              return post
                ? {
                    ...post,
                    category: cat,
                    featured_image: post.featured_image || "/suc-khoe/no-image.jpeg",
                  }
                : null;
            } catch {
              return null;
            }
          })
        );
        setPosts(results.filter(Boolean));
      } finally {
        setLoading(false);
      }
    })();
  }, [categories]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setNavState({
        start: scrollLeft < 10,
        end: scrollLeft + clientWidth >= scrollWidth - 10,
      });
    };

    setTimeout(checkScroll, 100);
    container.addEventListener("scroll", checkScroll);
    return () => container.removeEventListener("scroll", checkScroll);
  }, [loading, posts]);

  return (
    <section className="py-10 overflow-hidden relative">
      <div className="w-full">
        <div
          ref={containerRef}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
        >
          <div className="flex w-full flex-nowrap space-x-0">
            {posts?.map((post, i) => (
              <div
                key={i}
                className="relative min-w-[100vw] sm:min-w-[50vw] md:min-w-[33vw] lg:min-w-[25%] h-[500px] overflow-hidden snap-start border-0"
                style={{ marginLeft: i > 0 ? "-1px" : "0" }}
              >
                <Link href={`/${post.slug}`} className="block group h-full">
                  <div className="relative h-full w-full">
                    {loading ? (
                      <div className="absolute inset-0 bg-gray-200 animate-pulse">
                        <div className="absolute bottom-0 p-4 z-10 w-full">
                          <div className="h-6 w-24 bg-gray-300 rounded-sm mb-2"></div>
                          <div className="h-7 w-full bg-gray-300 rounded mb-1"></div>
                          <div className="h-7 w-3/4 bg-gray-300 rounded mb-2"></div>
                          <div className="flex space-x-2">
                            <div className="h-4 w-20 bg-gray-300 rounded"></div>
                            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                            <div className="h-4 w-24 bg-gray-300 rounded"></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Image
                          src={post.featured_image || "/suc-khoe/no-image.jpeg"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                        <div className="absolute bottom-0 p-4 z-10">
                          <div
                            className={`text-xs font-bold text-white px-2 py-1 rounded-sm mb-2 inline-block ${getCategoryColor(
                              post.category
                            )}`}
                          >
                            {getCategoryDisplayName(post.category)}
                          </div>
                          <h3 className="text-white text-lg font-bold mb-2 line-clamp-2">
                            <span className="inline bg-[linear-gradient(transparent_calc(100%_-_2px),#FFF_calc(100%_-_2px))] bg-no-repeat bg-[length:0%_100%] group-hover:bg-[length:100%_100%] transition-all duration-1000">
                              {post.title}
                            </span>
                          </h3>
                          <div className="flex text-xs text-gray-300">
                            <span>BY {post.author}</span>
                            <span className="mx-2">•</span>
                            <span>
                              {post.date &&
                                new Date(post.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {["prev", "next"].map((dir) => {
          const isNext = dir === "next";
          const disabled = isNext ? navState.end : navState.start;

          return (
            <button
              key={dir}
              onClick={() =>
                containerRef.current?.scrollBy({
                  left:
                    (containerRef.current.clientWidth / 4) * (isNext ? 1 : -1),
                  behavior: "smooth",
                })
              }
              className={`absolute top-1/2 ${
                isNext ? "right-4" : "left-4"
              } -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg hidden lg:block z-10 ${
                disabled ? "opacity-50" : ""
              }`}
              disabled={disabled}
              aria-label={isNext ? "Next" : "Previous"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={isNext ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6"} />
              </svg>
            </button>
          );
        })}

        <style jsx global>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </section>
  );
}
