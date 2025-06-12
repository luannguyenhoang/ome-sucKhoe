"use client";

import SidebarNavigation from "@/src/app/components/molecules/SidebarNavigation";
import SliderContent from "@/src/app/components/molecules/SliderContent";
import { useSidebarScroll } from "@/src/hooks/useSidebarScroll";
import { useSliderData } from "@/src/hooks/useSliderData";
import { useSliderNavigation } from "@/src/hooks/useSliderNavigation";

export default function SliderContainer() {
  const { posts, loading } = useSliderData();
  const {
    currentSlide,
    sliderRef,
    goToSlide,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
  } = useSliderNavigation({ totalSlides: posts.length });
  const { sidebarRef, registerActiveItemRef } = useSidebarScroll({
    currentSlide,
    totalSlides: posts.length,
  });

  // Preload the first image to improve LCP
  const preloadFirstImage = () => {
    if (posts.length > 0 && posts[0].featured_image) {
      return (
        <link
          rel="preload"
          as="image"
          href={posts[0].featured_image}
          key="preload-first-slide"
        />
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="w-full h-[720px] lg:bg-black/40 animate-pulse flex items-center justify-center" />
    );
  }

  return (
    <div className="relative w-full">
      {preloadFirstImage()}
      <SliderContent
        posts={posts}
        currentSlide={currentSlide}
        sliderRef={sliderRef}
        handleTouchStart={handleTouchStart}
        handleTouchMove={handleTouchMove}
        handleTouchEnd={handleTouchEnd}
        handleMouseDown={handleMouseDown}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
        handleMouseLeave={handleMouseLeave}
      />

      <SidebarNavigation
        posts={posts}
        currentSlide={currentSlide}
        sidebarRef={sidebarRef}
        onSlideClick={goToSlide}
        registerActiveItemRef={registerActiveItemRef}
      />

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
