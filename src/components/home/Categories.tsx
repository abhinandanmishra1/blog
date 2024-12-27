import {
  Box,
  Code2,
  Cpu,
  Database,
  Gauge,
  Layout,
  Monitor,
  Server,
} from "lucide-react";

import { CategoryCard } from "../ui";
import { siteMetadata } from "../../data/metadata";
import { useMemo } from "react";

const getIcon = (icon: string) => {
  switch (icon) {
    case "Gauge":
      return <Gauge className="w-6 h-6 text-[rgb(72,187,120)]" />;
    case "Code2":
      return <Code2 className="w-6 h-6 text-[rgb(99,179,237)]" />;
    case "Layout":
      return <Layout className="w-6 h-6 text-[rgb(225,112,85)]" />;
    case "Server":
      return <Server className="w-6 h-6 text-[rgb(144,104,252)]" />;
    case "Monitor":
      return <Monitor className="w-6 h-6 text-[rgb(85,212,245)]" />;
    case "Database":
      return <Database className="w-6 h-6 text-[rgb(240,165,0)]" />;
    case "Cpu":
      return <Cpu className="w-6 h-6 text-[rgb(250,87,97)]" />;
    case "Box":
      return <Box className="w-6 h-6 text-[rgb(180,180,180)]" />;
  }
};

export const Categories = ({ first = 3 }: { first?: number }) => {
  const categories = useMemo(() => {
    return siteMetadata.categories.slice(0, first).map((category) => ({
      ...category,
      icon: getIcon(category.icon),
    }));
  }, [first]);
  
  return (
    <section className="bg-neutral-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Explore by Category
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Dive into various technical topics and find exactly what you're
            looking for
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              icon={category.icon}
              title={category.title}
              description={category.description}
              count={10}
              color={category.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
