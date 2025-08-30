interface PageHeaderProps {
  title: string;
  description: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
      <p className="text-gray-300 text-lg">{description}</p>
    </div>
  );
};
