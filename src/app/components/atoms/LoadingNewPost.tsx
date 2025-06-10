export const LoadingNewPost = ({
  count,
  showTitle = false,
}: {
  count: number;
  showTitle?: boolean;
}) => {
  return (
    <div className=" rounded-md">
      {showTitle && (
        <div className="h-10 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
      )}
      <div className="flex flex-col space-y-4">
        {[...Array(count)].map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50"
          >
            <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex-grow">
              <div className="h-5 bg-gray-200 rounded w-4/4 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
