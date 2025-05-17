import { toSlug } from "@/utils/toSlug";
import Image from "next/image";
import Link from "next/link";

export default function CardCategory({ category }: { category: any }) {
  return (
    <Link
      href={toSlug(category.link)}
      className="relative block h-[80px] rounded-md overflow-hidden group"
    >
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all z-10"></div>
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={category.image}
          alt={category.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:translate-x-4 scale-[1.1]"
        />
      </div>
      <div className="absolute inset-0 z-20 flex items-center justify-between p-4">
        <h3 className="text-white text-lg font-medium">{category.title}</h3>
        <div className="bg-white group-hover:bg-blue-600 group-hover:text-white rounded-full text-gray-500 w-8 h-8 flex items-center justify-center transition-colors duration-300">
          {category.count}
        </div>
      </div>
    </Link>
  );
}
