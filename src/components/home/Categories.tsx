import { Code2, Cpu, Gauge } from "lucide-react";

import { CategoryCard } from "../ui";

export const Categories = () => {
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
          <CategoryCard
            icon={<Code2 className="w-6 h-6 text-blue-400" />}
            title="React"
            description="Modern web development with React, hooks, and best practices"
            count={25}
            color="blue"
          />
          <CategoryCard
            icon={<Cpu className="w-6 h-6 text-yellow-400" />}
            title="JavaScript"
            description="Core concepts, ES6+, and advanced JavaScript patterns"
            count={32}
            color="yellow"
          />
          <CategoryCard
            icon={<Gauge className="w-6 h-6 text-green-400" />}
            title="Web Performance"
            description="Optimization techniques and performance metrics"
            count={18}
            color="green"
          />
        </div>
      </div>
    </section>
  );
};
