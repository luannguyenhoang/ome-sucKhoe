import { categories } from "@/utils/category";
import { getCategoryDisplayName } from "@/utils/getCategoryDisplayNameAndColor";

interface CategoryTabsProps {
  selectedTabCategory: string;
  isPendingCategoryChange: boolean;
  isLoading: boolean;
  onCategoryChange: (index: number) => void;
}

export default function CategoryTabs({
  selectedTabCategory,
  isPendingCategoryChange,
  isLoading,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="max-w-[900px] mx-auto mb-8">
      <div className="lg:flex items-center justify-between mb-4">
        <div className="flex items-center ">
          <h2 className="text-3xl font-bold text-black mr-2">Phổ biến nhất</h2>
          <div className="h-2 w-2 rounded-full bg-blue-600 mr-1"></div>
          <div className="flex-1 gap-2 lg:mr-2">
            <div className="flex-1 min-w-8 h-[1px] mb-1 bg-gray-200"></div>
            <div className="flex-1 min-w-8 h-[1px] bg-gray-200"></div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-sm overflow-hidden">
          <div className="flex">
            {categories.map((slug, index) => {
              const isActive = selectedTabCategory === slug;

              return (
                <button
                  key={slug}
                  className={`px-4 py-3 text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? `bg-blue-600 text-white shadow-md relative`
                      : `text-gray-700 hover:bg-gray-100 ${
                          isPendingCategoryChange ? "opacity-60" : ""
                        }`
                  }`}
                  onClick={() => onCategoryChange(index)}
                  disabled={isLoading && isPendingCategoryChange && !isActive}
                >
                  {getCategoryDisplayName(slug)}
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 w-full h-[3px] bg-blue-500 blur-sm"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
