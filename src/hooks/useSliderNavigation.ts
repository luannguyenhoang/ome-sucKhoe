"use client";

import {
  MouseEvent,
  TouchEvent,
  useCallback,
  useRef,
  useState,
  MutableRefObject,
} from "react";

interface UseSliderNavigationProps {
  totalSlides: number;
}

export const useSliderNavigation = ({
  totalSlides,
}: UseSliderNavigationProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(
    null
  ) as any as unknown as React.RefObject<HTMLDivElement>;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

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

  return {
    currentSlide,
    sliderRef,
    isDragging,
    goToSlide,
    nextSlide,
    prevSlide,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
  };
};
