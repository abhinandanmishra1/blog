export const PageHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
        {title}
      </h2>
      <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};
