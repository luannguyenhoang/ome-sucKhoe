import Link from "next/link";

export default function ButtonAnimation({
  text,
  uppercase = false,
  hoverBg = "bg-blue-600",
  bg = "bg-white",
  textColor = "text-gray-500",
  borderColor = "border-gray-300",
  rounded = "rounded-sm",
  fontWeight = "font-light",
  padding = "px-4 py-2",
  link = "/",
  margin = "mt-0",
}: {
  text: string;
  hoverBg?: string;
  bg?: string;
  textColor?: string;
  borderColor?: string;
  rounded?: string;
  fontWeight?: string;
  uppercase?: boolean;
  padding?: string;
  link?: string;
  margin?: string;
}) {
  return (
    <div className={`group/btn w-fit ${margin}`}>
      <Link href={link}>
        <button
          className={`w-fit border ${fontWeight} ${rounded} ${borderColor} hover:text-white ${bg} ${textColor} relative overflow-hidden ${
            uppercase ? "uppercase" : ""
          } ${padding}`}
        >
          <span className="relative z-10 flex items-center gap-2">
            {text}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transform transition-transform duration-300 group-hover/btn:scale-x-[-1]"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </span>
          <span
            className={`absolute inset-0 ${hoverBg} transform translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300`}
          ></span>
        </button>
      </Link>
    </div>
  );
}
