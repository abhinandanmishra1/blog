import { Code2, Cpu, Gauge } from 'lucide-react';

import React from 'react';

export const Categories = () => {
  return (
    <section className="bg-neutral-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Explore by Category</h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">Dive into various technical topics and find exactly what you're looking for</p>
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

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  count: number;
  color: 'blue' | 'yellow' | 'green';
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ icon, title, description, count, color }) => {
  const colorClasses = {
    blue: 'text-blue-400 group-hover:text-blue-300',
    yellow: 'text-yellow-400 group-hover:text-yellow-300',
    green: 'text-green-400 group-hover:text-green-300'
  };

  return (
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
            <img key={i} src={`https://avatar.iran.liara.run/public/${i}`} className="w-6 h-6 rounded-full border-2 border-neutral-800" alt={`Author ${i}`} />
          ))}
        </div>
        <a href="#" className={`${colorClasses[color]} transition-colors duration-300`}>View All →</a>
      </div>
    </div>
  );
};
