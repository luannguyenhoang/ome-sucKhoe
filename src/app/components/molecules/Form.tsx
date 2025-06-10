export default function Form({ showTitle = false }: { showTitle?: boolean }) {
  return (
    <>
      {showTitle && (
        <div className="flex items-center my-7">
          <h2 className="text-2xl font-bold text-black mr-2 uppercase">
            Đăng ký
          </h2>
          <div className="h-2 w-2 rounded-full bg-blue-600 mr-1"></div>
          <div className="flex-1 gap-2">
            <div className="flex-1 h-[1px] mb-1 bg-gray-200"></div>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </div>
        </div>
      )}

      <form className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Name*"
            className="w-full p-3 border bg-white border-[f0f0f0] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-spartan"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="E-mail*"
            className="w-full p-3 border bg-white border-[f0f0f0] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-spartan"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Subject*"
            className="w-full p-3 border bg-white border-[f0f0f0] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-spartan"
          />
        </div>
        <div>
          <textarea
            placeholder="Your Message*"
            rows={4}
            className="w-full  bg-white p-3 border border-[f0f0f0] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-spartan"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 uppercase text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-spartan font-medium"
        >
          Đăng Ký
        </button>
      </form>
    </>
  );
}
