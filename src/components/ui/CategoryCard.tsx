"use client";
import { Card3D } from "./Card3D";
import { useRouter } from "next/navigation";

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  slug: string;
  description: string;
  count: number;
  color: "blue" | "yellow" | "green" | string;
}

export const CategoryCard = ({
  icon,
  title,
  description,
  count,
  color,
  slug,
}: CategoryCardProps) => {
  const router = useRouter();
  
  return (
    <Card3D color={color}>
      <div 
        onClick={() => router.push(`/categories/${slug}`)} 
        className="group bg-neutral-800 border border-neutral-700 rounded-xl p-6 hover:bg-neutral-750 transition-all duration-300 cursor-pointer"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-neutral-700/30 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          {count > 0 && (
            <span className="text-neutral-400 text-sm">{count} articles</span>
          )}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-neutral-400 mb-4 line-clamp-1">{description}</p>
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
          <span
            style={{ color }}
            className="transition-colors duration-300"
          >
            View All →
          </span>
        </div>
      </div>
    </Card3D>
  );
};
