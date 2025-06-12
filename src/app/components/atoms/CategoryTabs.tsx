import NextIcon from "@/src/icons/NextIcon";
import PreviousIcon from "@/src/icons/PreviousIcon";
import { ALLOWED_CATEGORIES } from "@/src/utils/category";
import { getCategoryDisplayName } from "@/src/utils/getCategoryDisplayNameAndColor";
import { useCallback, useEffect, useRef, useState } from "react";
import type SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function CategoryTabs({
  selectedTabCategory,
  isPendingCategoryChange,
  isLoading,
  onCategoryChange,
}: any) {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);

  const updateNavigation = useCallback(() => {
    if (!swiper) return;
    const slideElements = Array.from(swiper.slides || []) as HTMLElement[];
    const totalWidth = slideElements.reduce(
      (sum, slide) => sum + slide.offsetWidth,
      0
    );
    const remainingWidth =
      totalWidth - Math.abs(swiper.translate) - (swiper.width || 0);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd || remainingWidth <= 30);
  }, [swiper]);

  const setupSwiper = useCallback(
    (swiperInstance: SwiperCore) => {
      setSwiper(swiperInstance);
      if (
        prevRef.current &&
        nextRef.current &&
        swiperInstance.params.navigation
      ) {
        (swiperInstance.params.navigation as any).prevEl = prevRef.current;
        (swiperInstance.params.navigation as any).nextEl = nextRef.current;
        swiperInstance.navigation.init();
        swiperInstance.navigation.update();
      }
      setIsBeginning(true);
      setTimeout(updateNavigation, 50);
    },
    [updateNavigation]
  );

  useEffect(() => {
    if (!swiper) return;

    updateNavigation();
    const timer = setTimeout(() => {
      swiper?.updateSize();
      swiper?.updateSlides();
      updateNavigation();
    }, 50);

    const handleResize = () => {
      swiper.updateSize();
      swiper.updateSlides();
      setTimeout(updateNavigation, 50);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [swiper, updateNavigation]);

  const handlePrevClick = useCallback(
    () => swiper && !isBeginning && swiper.slidePrev(),
    [swiper, isBeginning]
  );
  const handleNextClick = useCallback(
    () => swiper && !isEnd && swiper.slideNext(),
    [swiper, isEnd]
  );
  const swiperEvents = {
    onBeforeInit: setupSwiper,
    onInit: setupSwiper,
    onSwiper: setSwiper,
    onSlideChange: updateNavigation,
    onReachBeginning: () => setIsBeginning(true),
    onReachEnd: () => setIsEnd(true),
    onAfterInit: updateNavigation,
    onResize: updateNavigation,
    onUpdate: updateNavigation,
    onBreakpoint: updateNavigation,
    onFromEdge: updateNavigation,
    onTransitionEnd: updateNavigation,
    onTransitionStart: updateNavigation,
    onProgress: updateNavigation,
  };

  return (
    <div className="max-w-[900px] mx-auto overflow-hidden">
      <div className="lg:flex items-center justify-between">
        <div className="flex items-center lg:pb-0 pb-5">
          <h2 className="text-3xl font-bold text-black mr-2 whitespace-nowrap">
            Phổ biến nhất
          </h2>
          <div className="h-2 w-2 rounded-full bg-[#2962ff] mr-1"></div>
          <div className="flex-1 gap-2 lg:mr-2">
            <div className="flex-1 min-w-8 h-[1px] mb-1 bg-gray-200"></div>
            <div className="flex-1 min-w-8 h-[1px] bg-gray-200"></div>
          </div>
        </div>

        <div
          ref={swiperContainerRef}
          className="border border-gray-200 rounded-sm overflow-hidden lg:max-w-[70%] w-full relative"
        >
          <div
            ref={prevRef}
            onClick={handlePrevClick}
            className={`absolute top-1/2 text-white -translate-y-1/2 left-1 z-10 flex items-center justify-center bg-[#254e80] rounded-full border border-gray-200 w-6 h-6 cursor-pointer transition-all duration-300 opacity-40 hover:opacity-100 ${
              isBeginning ? "hidden" : ""
            }`}
          >
            <PreviousIcon />
          </div>
          <div
            ref={nextRef}
            onClick={handleNextClick}
            className={`absolute top-1/2 text-white -translate-y-1/2 right-1 z-10 flex items-center justify-center bg-[#254e80] rounded-full border border-gray-200 w-6 h-6 cursor-pointer transition-all duration-300 opacity-40 hover:opacity-100 ${
              isEnd ? "hidden" : ""
            }`}
          >
            <NextIcon />
          </div>
          <Swiper
            modules={[Navigation]}
            slidesPerView="auto"
            className="w-full"
            cssMode={true}
            watchOverflow={true}
            observer={true}
            observeParents={true}
            threshold={5}
            {...swiperEvents}
          >
            {ALLOWED_CATEGORIES.map((slug, index) => {
              const isActive = selectedTabCategory === slug;
              const isDisabled =
                isLoading && isPendingCategoryChange && !isActive;
              const buttonClass = isActive
                ? "bg-[#2962ff] text-white shadow-md relative"
                : `text-gray-700 hover:bg-gray-100 ${
                    isPendingCategoryChange ? "opacity-60" : ""
                  }`;
              return (
                <SwiperSlide key={slug} className="!w-auto">
                  <button
                    className={`px-4 py-3 text-sm font-bold transition-all duration-200 whitespace-nowrap ${buttonClass}`}
                    onClick={() => onCategoryChange(index)}
                    disabled={isDisabled}
                  >
                    {getCategoryDisplayName(slug)}
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
