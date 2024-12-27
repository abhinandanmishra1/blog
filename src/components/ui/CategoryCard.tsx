import { Card3D } from "./Card3D";

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  count: number;
  color: "blue" | "yellow" | "green";
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  title,
  description,
  count,
  color,
}) => {
  const colorClasses = {
    blue: "text-blue-400 group-hover:text-blue-300",
    yellow: "text-yellow-400 group-hover:text-yellow-300",
    green: "text-green-400 group-hover:text-green-300",
  };


  return (
    <Card3D color={color}>
      <div className="group bg-neutral-800 border border-neutral-700 rounded-xl p-6 hover:bg-neutral-750 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-neutral-700/30 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <span className="text-neutral-400 text-sm">{count} articles</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-neutral-400 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <img
                key={i}
                src={`https://avatar.iran.liara.run/public/${i}`}
                className="w-6 h-6 rounded-full border-2 border-neutral-800"
                alt={`Author ${i}`}
              />
            ))}
          </div>
          <a
            href="#"
            className={`${colorClasses[color]} transition-colors duration-300`}
          >
            View All →
          </a>
        </div>
      </div>
    </Card3D>
  );
};
