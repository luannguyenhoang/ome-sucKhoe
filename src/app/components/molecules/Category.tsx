"use client";

import { GET_CATEGORY } from "@/src/app/api/Graphql/category";
import CardCategory from "@/src/app/components/atoms/CardCategory";
import { getData } from "@/src/lib/getData";
import { menus } from "@/src/router/router";
import { toSlug } from "@/src/utils/toSlug";
import { useCallback, useEffect, useState } from "react";

export const Category = ({ path }: { path?: string }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [parentPath, setParentPath] = useState<string | null>(null);

  const normalizePath = useCallback((pathToNormalize: string): string => {
    return pathToNormalize.startsWith("/")
      ? pathToNormalize
      : `/${pathToNormalize}`;
  }, []);

  const findMenuItemByPath = useCallback((pathToFind: string): any => {
    const normalizedPath = normalizePath(pathToFind);

    for (const menu of menus) {
      if (menu.path === normalizedPath) {
        return { menuItem: menu, parent: null };
      }

      if (!menu.childs) continue;

      for (const child of menu.childs) {
        if (child.path === normalizedPath) {
          return { menuItem: child, parent: menu };
        }

        if (!child.childs) continue;

        for (const grandChild of child.childs) {
          if (grandChild.path === normalizedPath) {
            return { menuItem: grandChild, parent: child };
          }
        }
      }
    }

    return { menuItem: null, parent: null };
  }, [normalizePath]);

  const findParentForSubcategory = useCallback((subcategoryPath: string): string | null => {
    const normalizedPath = normalizePath(subcategoryPath);

    for (const menu of menus) {
      if (!menu.childs) continue;
      for (const child of menu.childs) {
        const childPathSegment = child.path.split("/").pop() || "";
        if (normalizedPath.includes(childPathSegment)) {
          return menu.path.replace("/", "");
        }
        if (!child.childs) continue;

        for (const grandChild of child.childs) {
          const pathSegment = grandChild.path.split("/").pop() || "";
          if (normalizedPath.includes(pathSegment)) {
            return child.path.replace("/", "");
          }
        }
      }
    }

    return null;
  }, [normalizePath]);

  const findMatchingCategory = useCallback((
    categoryData: any[],
    subCategoryName: string,
    slug: string
  ): any | undefined => {
    return categoryData.find(
      (cat) =>
        toSlug(cat.nameCategory) === slug ||
        cat.nameCategory.toLowerCase().includes(subCategoryName.toLowerCase())
    );
  }, []);

  const getSubCategories = useCallback((menuItem: any, categoryData: any[]): any[] => {
    if (!menuItem.childs || menuItem.childs.length === 0) return categoryData;

    const subCategories = menuItem.childs
      .map((item: any) => {
        const subCategoryName = item.title;
        const slug = item.path.split("/").pop() || "";
        return findMatchingCategory(categoryData, subCategoryName, slug);
      })
      .filter(Boolean) as any[];

    return subCategories.length > 0 ? subCategories : categoryData;
  }, [findMatchingCategory]);

  const fetchCategoryCount = useCallback(async (slug: string): Promise<number> => {
    try {
      const countRes = await fetch(`/suc-khoe/api/posts/count?category=${slug}`);
      const countData = await countRes.json();
      return countData.total || 0;
    } catch (error) {
      console.error(`Error fetching count for ${slug}:`, error);
      return 0;
    }
  }, []);

  const mapCategoryToDisplayData = useCallback(async (
    item: any,
    linkPath: string
  ): Promise<any | null> => {
    if (!item) return null;

    const categoryName = item.nameCategory;
    const slug = toSlug(categoryName);
    const count = await fetchCategoryCount(slug);

    return {
      title: categoryName,
      image: item.image?.node?.mediaItemUrl || "",
      count,
      link: `/${linkPath}/${slug}`,
    };
  }, [fetchCategoryCount]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await getData(GET_CATEGORY);

        if (!data?.allCategory?.nodes[0]?.categoryPost?.content) {
          setCategories([]);
          return;
        }

        let categoryData = data.allCategory.nodes[0].categoryPost
          .content as any[];
        let currentPath = path || "";

        if (path) {
          const pathWithoutSlash = path.startsWith("/")
            ? path.substring(1)
            : path;
          const parent = findParentForSubcategory(pathWithoutSlash);

          if (parent) {
            currentPath = parent;
            setParentPath(parent);
          }

          const { menuItem } = findMenuItemByPath(`/${currentPath}`);

          if (menuItem && menuItem.childs && menuItem.childs.length > 0) {
            categoryData = getSubCategories(menuItem, categoryData);
          } else if (!menuItem) {
            for (const menu of menus) {
              if (!menu.childs) continue;

              const parentCategory = menu.childs.find(
                (child) =>
                  child.path.includes(currentPath) ||
                  currentPath.includes(child.path.split("/").pop() || "")
              );

              if (parentCategory?.childs && parentCategory.childs.length > 0) {
                categoryData = getSubCategories(parentCategory, categoryData);
                break;
              }
            }
          }
        }

        // Get count data for each category
        const linkBasePath = parentPath || path || "";
        const categoriesWithCount = await Promise.all(
          categoryData.map((item) =>
            mapCategoryToDisplayData(item, linkBasePath)
          )
        );

        setCategories(categoriesWithCount.filter(Boolean) as any[]);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err : new Error("Failed to fetch categories");
        setError(errorMessage);
        console.error("Failed to fetch categories:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [path, parentPath, findMenuItemByPath, findParentForSubcategory, getSubCategories, mapCategoryToDisplayData]);

  if (error) {
    return (
      <div className="mb-8 text-center text-red-600">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center mb-5 pt-5">
        <h2 className="text-2xl font-bold text-black mr-2 uppercase">
          DANH MỤC TIN TỨC
        </h2>
        <div className="h-2 w-2 rounded-full bg-blue-600 mr-1"></div>
        <div className="flex-1 gap-2">
          <div className="flex-1 h-[1px] mb-1 bg-gray-200"></div>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center">Đang tải...</div>
        ) : categories.length > 0 ? (
          categories.map((category, index) => (
            <CardCategory key={index} category={category} />
          ))
        ) : (
          <div className="text-center">Không có danh mục nào</div>
        )}
      </div>
    </div>
  );
};
