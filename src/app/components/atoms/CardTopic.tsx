import { Topic } from "@/src/types/Topic";
import { toSlug } from "@/src/utils/toSlug";
import Image from "next/image";
import Link from "next/link";

interface CardTopicProps {
  topic: Topic;
  screenSize: string;
}

export default function CardTopic({ topic, screenSize }: CardTopicProps) {
  return (
    <div
      key={topic.id}
      className={`relative rounded-md overflow-hidden ${
        screenSize === "sm" ? "w-full" : "w-56 mr-4"
      } h-64 flex-shrink-0 group`}
    >
      <Link
        href={`/${toSlug(topic.slug || "#")}`}
        className="cursor-pointer block w-full h-full"
      >
        <div className="relative w-full h-full">
          <Image
            src={topic.imageUrl || "/logo.png"}
            alt={topic.alt}
            width={192}
            height={192}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-40 transition-opacity"></div>
        </div>

        <div className="absolute bottom-3 w-full text-white font-semibold flex flex-col items-center justify-center drop-shadow-md select-none">
          <div className="text-[20px] hover:text-blue-500 transform translate-y-2 transition-transform duration-300 group-hover:-translate-y-2">{topic.title}</div>
          <div className="text-[15px] !font-medium transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300">
            ({topic.countPosts || 0})
          </div>
        </div>
      </Link>
    </div>
  );
}
