"use client";

import NextIcon from "@/src/icons/NextIcon";
import PreviousIcon from "@/src/icons/PreviousIcon";
import { getCategoryDisplayName } from "@/src/utils/getCategoryDisplayNameAndColor";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import xss from "xss";

const CardBlogVert = dynamic(() =>
  import("@/src/app/components/atoms/CardBlogVert").then(
    (mod) => mod.CardBlogVert
  )
);
const LoadingListPost = dynamic(() =>
  import("@/src/app/components/atoms/LoadingListPost").then(
    (mod) => mod.LoadingListPost
  )
);

export const StyledPaginate = styled(ReactPaginate)`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  gap: 4px;

  li {
    margin: 0;
    display: flex;
  }

  li a {
    border-radius: 4px;
    padding: 8px;
    border: 1px solid #dee2e6;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    min-height: 40px;
    text-align: center;
    color: #0d6efd;
    text-decoration: none;
    background: white;
    font-size: 14px;

    &:hover {
      background-color: #e9ecef;
      border-color: #dee2e6;
      color: #0a58ca;
    }
  }

  li.previous a,
  li.next a {
    border: 1px solid #dee2e6;
    color: #0d6efd;
    min-width: 40px;
    min-height: 40px;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  li.break a {
    border-color: transparent;
  }

  li.active a {
    background-color: #0d6efd;
    border-color: #0d6efd;
    color: white;

    &:hover {
      background-color: #0d6efd;
      border-color: #0d6efd;
      color: white;
    }
  }

  li.disabled a {
    color: #6c757d;
    pointer-events: none;
    background-color: white;
    border-color: #dee2e6;
  }

  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

export const ListPosts = ({
  handleRouter,
  type,
}: {
  handleRouter?: ({ selected }: { selected: number }) => void;
  type?: string;
}) => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchTerm = searchParams.get("search") || "";
  const first = 10;

  const [posts, setPosts] = useState<any[]>([]);
  const [totalPosts, setTotalPosts] = useState("0");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);

      try {
        let url = `/suc-khoe/api/posts?&size=${first}&offset=${
          (page - 1) * first
        }`;

        if (searchTerm) {
          url += `&search=${encodeURIComponent(searchTerm)}`;
        }

        if (type) {
          url += `&category=${encodeURIComponent(type)}`;
        }

        const res = await fetch(url, {
          next: { revalidate: 1 },
        });

        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }

        const data: { posts: any[]; totalPosts: string } = await res.json();
        const { posts, totalPosts } = data;

        if (posts?.length) {
          setPosts(posts);
          setTotalPosts(totalPosts);
        } else {
          setPosts([]);
          setTotalPosts("0");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
        setTotalPosts("0");
      }

      setIsLoading(false);
    };

    getPosts();
  }, [page, searchTerm, type]);

  return (
    <div>
      {!isLoading && (
        <div className="flex flex-col gap-4">
          <div>
            {posts?.map((post: any, index: number) => {
              const tag = getCategoryDisplayName(type);
              return (
                <CardBlogVert
                  date={post?.date}
                  key={index}
                  title={xss(post?.title)}
                  desc={xss(post?.excerpt)}
                  image={post?.featured_image || ""}
                  path={`${post?.slug}`}
                  tag={tag}
                />
              );
            })}
          </div>

          {posts?.length > 0 && (
            <div className="pt-8 flex justify-center">
              <StyledPaginate
                className="paginate"
                previousLabel={<PreviousIcon />}
                nextLabel={<NextIcon />}
                pageCount={Math.ceil(Number(totalPosts) / first)}
                onPageChange={handleRouter}
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                activeClassName="active"
                forcePage={Number(page) - 1}
              />
            </div>
          )}

          {posts?.length === 0 && (
            <div className="grid place-items-center h-[40vh]">
              {searchTerm ? (
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mx-auto mb-4 text-gray-400"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                  <p className="text-xl font-medium mb-2">
                    Không tìm thấy kết quả nào phù hợp
                  </p>
                  <p className="text-gray-500">
                    Vui lòng thử lại với từ khóa khác
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-xl font-medium">
                    Dữ liệu đang được chúng tôi cập nhập
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {isLoading && <LoadingListPost count={10} col={1} />}
    </div>
  );
};
