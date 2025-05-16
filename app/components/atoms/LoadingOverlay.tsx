export default function LoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-white bg-opacity-80 z-40 flex items-center justify-center rounded-md">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-2"></div>
      </div>
    </div>
  );
}
