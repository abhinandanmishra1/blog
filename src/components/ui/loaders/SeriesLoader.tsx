export const Article2Loader = () => {
  return (
    <div className="w-full h-[250px] bg-neutral-800 border border-neutral-700 rounded-xl animate-pulse" />
  );
};

export const Article2ViewLoader = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="w-full h-[300px] md:h-[400px] object-cover animate-pulse bg-neutral-800 border border-neutral-700 rounded-xl"></div>
          <div className="flex flex-col gap-2">
            <Article2Loader />
            <Article2Loader />
          </div>
        </div>
      </div>
    </div>
  );
};
