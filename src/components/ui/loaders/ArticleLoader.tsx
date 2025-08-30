export const ArticleLoader = () => {
  return (
    <div className="bg-neutral-900">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-neutral-800 border border-neutral-700 rounded-xl h-96 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
