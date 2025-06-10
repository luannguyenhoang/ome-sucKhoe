"use client";

import Link from "next/link";
import { BsLink45Deg } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export const SocialNetworkLinks = ({
  url,
  col = false,
  showTitle = true,
}: {
  url?: string;
  col?: boolean;
  showTitle?: boolean;
}) => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN || "";
  const fullUrl = url ? `${domain}/${url}` : domain;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      alert("Link đã được sao chép!");
    } catch (err) {
      alert("Không thể sao chép link, hãy thử lại.");
    }
  };

  const socialLinks = [
    {
      name: "Copy Link",
      href: "#",
      icon: <BsLink45Deg className="w-6 h-6" />,
      bgColor: "bg-gray-600",
      isExternal: false,
      onClick: handleCopyLink,
    },

    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        fullUrl
      )}`,
      icon: <FaFacebook className="w-6 h-6" />,
      bgColor: "bg-[#3b5998]",
      isExternal: true,
    },
    {
      name: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        fullUrl
      )}`,
      icon: <FaTwitter className="w-6 h-6" />,
      bgColor: "bg-[#1DA1F2]",
      isExternal: true,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/yourprofile",
      icon: <FaInstagram className="w-6 h-6" />,
      bgColor: "bg-[#E4405F]",
      isExternal: true,
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        fullUrl
      )}`,
      icon: <FaLinkedin className="w-6 h-6" />,
      bgColor: "bg-[#0077B5]",
      isExternal: true,
    },
  ];

  return (
    <div className="flex flex-col items-start gap-2">
      {showTitle && (
        <div className="text-xl font-semibold">Chia sẻ bài viết này:</div>
      )}
      <div className={`flex items-center gap-2 lg:${col ? "flex-col" : ""}`}>
        {socialLinks.map((social) => {
          const commonClasses =
            "w-11 text-white h-11 flex items-center border border-gray-300 justify-center rounded-full hover:opacity-80 transition-opacity duration-300";

          if (social.onClick) {
            return (
              <button
                key={social.name}
                onClick={social.onClick}
                className={`${social.bgColor} ${commonClasses}`}
                aria-label={social.name}
              >
                {social.icon}
              </button>
            );
          }

          return (
            <Link
              key={social.name}
              href={social.href}
              className={`${social.bgColor} ${commonClasses}`}
              aria-label={social.name}
              target={social.isExternal ? "_blank" : undefined}
              rel={social.isExternal ? "noopener noreferrer" : undefined}
            >
              {social.icon}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
