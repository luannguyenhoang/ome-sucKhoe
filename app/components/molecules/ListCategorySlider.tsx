import { formatDate } from "@/utils/date";
import { getCategoryDisplayName } from "@/utils/getCategoryDisplayNameAndColor";
import Image from "next/image";
import { forwardRef } from "react";

const ListCategorySlider = forwardRef<HTMLButtonElement, {
  post: any;
  isActive?: boolean;
  onClick: () => void;
}>(function ListCategorySlider({
  post,
  isActive = false,
  onClick,
}, ref) {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`flex-shrink-0 flex items-center space-x-4 group text-left transition-all duration-300 w-full lg:w-auto ${
        isActive ? "scale-105 opacity-100" : "opacity-60 hover:opacity-80"
      }`}
    >
      <div className="relative w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] flex-shrink-0 transition-transform">
        <Image
          src={post.featured_image || post.image || "/no-image.jpeg"}
          alt={post.title || "Post thumbnail"}
          fill
          className={`object-cover rounded-full ${
            isActive ? "brightness-110" : "brightness-90"
          }`}
          loading="lazy"
        />
      </div>
      <div className="overflow-hidden">
        <div className="text-gray-300 text-xs mb-1 truncate">
          {getCategoryDisplayName(post.category || post.categories?.[0] || "")}
        </div>
        <h4
          className={`font-semibold transition-colors truncate ${
            isActive ? "text-blue-400" : "text-white group-hover:text-blue-400"
          }`}
        >
          {post.title.length > 30
            ? post.title.substring(0, 30) + "..."
            : post.title}
        </h4>
        <div className="text-gray-400 text-xs mt-1 truncate">
          {formatDate(post.date)}
        </div>
      </div>
    </button>
  );
});

export default ListCategorySlider;
