"use client";

import { Post } from "@/types/Post";
import { categories } from "@/utils/category";
import { getCategoryDisplayName } from "@/utils/getCategoryDisplayNameAndColor";
import {
  MouseEvent,
  TouchEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ListCategorySlider from "../molecules/ListCategorySlider";
import Slide from "../molecules/Slide";

const CACHE_DURATION = 60;
const CACHE_KEY = "slider_posts_cache";

export default function SliderContainer() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const activeItemRefs = useRef<(HTMLButtonElement | null)[]>([]);

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
    return categories.map((category, index) => ({
      title: `Latest Article in ${getCategoryDisplayName(category)}`,
      slug: `latest-article-${category}`,
      category: category,
      date: new Date(Date.now() - index * 86400000).toISOString(),
      views: 1000 + Math.floor(Math.random() * 2000),
      featured_image: "/banner.jpg",
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

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
  }, [posts.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
  }, [posts.length]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const minSwipeDistance = 50;
    const swipeDiff = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDiff) > minSwipeDistance) {
      swipeDiff > 0 ? nextSlide() : prevSlide();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  }, [nextSlide, prevSlide]);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    setIsDragging(true);
    touchStartX.current = e.clientX;
    if (sliderRef.current) sliderRef.current.style.cursor = "grabbing";
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      touchEndX.current = e.clientX;
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    const minSwipeDistance = 50;
    const swipeDiff = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDiff) > minSwipeDistance) {
      swipeDiff > 0 ? nextSlide() : prevSlide();
    }

    setIsDragging(false);
    if (sliderRef.current) sliderRef.current.style.cursor = "grab";
  }, [isDragging, nextSlide, prevSlide]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      if (sliderRef.current) sliderRef.current.style.cursor = "grab";
    }
  }, [isDragging]);

  const postSlides = useMemo(() => {
    return posts.map((post, index) => (
      <div key={index} className="w-full flex-shrink-0">
        <Slide post={post} />
      </div>
    ));
  }, [posts]);

  useEffect(() => {
    if (sidebarRef.current && activeItemRefs.current[currentSlide]) {
      const sidebar = sidebarRef.current;
      const activeItem = activeItemRefs.current[currentSlide];

      if (activeItem) {
        const itemRect = activeItem.getBoundingClientRect();
        const sidebarRect = sidebar.getBoundingClientRect();
        const isMobile = window.innerWidth < 1024;
        if (isMobile) {
          const isVisible =
            itemRect.left >= sidebarRect.left &&
            itemRect.right <= sidebarRect.right;

          if (!isVisible) {
            const scrollLeft =
              activeItem.offsetLeft -
              sidebar.offsetLeft -
              sidebar.clientWidth / 2 +
              activeItem.clientWidth / 2;

            sidebar.scrollTo({
              left: scrollLeft,
              behavior: "smooth",
            });
          }
        } else {
          const isVisible =
            itemRect.top >= sidebarRect.top &&
            itemRect.bottom <= sidebarRect.bottom;

          if (!isVisible) {
            const scrollTop =
              activeItem.offsetTop -
              sidebar.offsetTop -
              sidebar.clientHeight / 2 +
              activeItem.clientHeight / 2;

            sidebar.scrollTo({
              top: scrollTop,
              behavior: "smooth",
            });
          }
        }
      }
    }
  }, [currentSlide]);

  const relatedPosts = useMemo(() => {
    activeItemRefs.current = new Array(posts.length).fill(null);

    return posts.map((post, index) => (
      <ListCategorySlider
        key={index}
        post={post}
        isActive={index === currentSlide}
        onClick={() => setCurrentSlide(index)}
        ref={(el) => {
          if (activeItemRefs.current) {
            activeItemRefs.current[index] = el;
          }
        }}
      />
    ));
  }, [posts, currentSlide]);

  if (loading) {
    return (
      <div className="w-full h-[720px] lg:bg-black/40 animate-pulse flex items-center justify-center" />
    );
  }

  return (
    <div className="relative w-full">
      <div
        className="relative overflow-hidden touch-pan-y cursor-grab"
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            display: "flex",
          }}
        >
          {postSlides}
        </div>
      </div>

      <div className="absolute lg:top-0 lg:right-0 bottom-0 lg:h-full h-fit lg:w-[30%] w-full bg-black/65 lg:bg-black/40 flex items-center">
        <div
          ref={sidebarRef}
          className="max-h-[330px] lg:overflow-y-auto overflow-x-auto w-full lg:py-10 py-6 px-4 hide-scrollbar"
        >
          <div className="flex h-fit lg:flex-col space-x-4 lg:space-x-0 space-y-0  lg:space-y-6 lg:px-10">
            {relatedPosts}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
