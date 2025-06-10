"use client";

import { useSidebarScroll } from "@/src/hooks/useSidebarScroll";
import { useSliderData } from "@/src/hooks/useSliderData";
import { useSliderNavigation } from "@/src/hooks/useSliderNavigation";
import SidebarNavigation from "@/src/app/components/molecules/SidebarNavigation";
import SliderContent from "@/src/app/components/molecules/SliderContent";

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

  if (loading) {
    return (
      <div className="w-full h-[720px] lg:bg-black/40 animate-pulse flex items-center justify-center" />
    );
  }

  return (
    <div className="relative w-full">
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
