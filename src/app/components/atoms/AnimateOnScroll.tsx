"use client";

import { AnimateOnScrollProps } from "@/src/types/AnimateOnScrollProps";
import { useEffect, useRef, useState } from "react";

export default function AnimateOnScroll({
  children,
  className = ""
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.6,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  const animationClass = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-10";

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1500ms] ease-out ${animationClass} ${className}`}
    >
      {children}
    </div>
  );
}
