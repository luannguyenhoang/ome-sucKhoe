"use client";

import { Post } from "@/src/types/Post";
import { MouseEvent, TouchEvent } from "react";
import Slide from "./Slide";

interface SliderContentProps {
  posts: Post[];
  currentSlide: number;
  sliderRef: React.RefObject<HTMLDivElement>;
  handleTouchStart: (e: TouchEvent) => void;
  handleTouchMove: (e: TouchEvent) => void;
  handleTouchEnd: () => void;
  handleMouseDown: (e: MouseEvent) => void;
  handleMouseMove: (e: MouseEvent) => void;
  handleMouseUp: () => void;
  handleMouseLeave: () => void;
}

export default function SliderContent({
  posts,
  currentSlide,
  sliderRef,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleMouseLeave,
}: SliderContentProps) {
  return (
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
        {posts.map((post, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <Slide post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
