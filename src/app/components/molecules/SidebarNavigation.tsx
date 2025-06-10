"use client";

import { Post } from "@/src/types/Post";
import ListCategorySlider from "./ListCategorySlider";

interface SidebarNavigationProps {
  posts: Post[];
  currentSlide: number;
  sidebarRef: any;
  onSlideClick: (index: number) => void;
  registerActiveItemRef: (index: number, ref: HTMLButtonElement | null) => void;
}

export default function SidebarNavigation({
  posts,
  currentSlide,
  sidebarRef,
  onSlideClick,
  registerActiveItemRef,
}: SidebarNavigationProps) {
  return (
    <div className="absolute lg:top-0 lg:right-0 bottom-0 lg:h-full h-fit lg:w-[30%] w-full bg-black/65 lg:bg-black/40 flex items-center">
      <div
        ref={sidebarRef}
        className="max-h-[330px] lg:overflow-y-auto overflow-x-auto w-full lg:py-10 py-6 px-4 hide-scrollbar"
      >
        <div className="flex h-fit lg:flex-col space-x-4 lg:space-x-0 space-y-0 lg:space-y-6 lg:px-10">
          {posts.map((post, index) => (
            <ListCategorySlider
              key={index}
              post={post}
              isActive={index === currentSlide}
              onClick={() => onSlideClick(index)}
              ref={(el) => registerActiveItemRef(index, el)}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 