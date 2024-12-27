import { HashnodeSeries } from '../../types';
import { Link } from 'react-router-dom';
import React from 'react';

interface ViewSeriesProps {
  series: HashnodeSeries;
}

export const ViewSeries: React.FC<ViewSeriesProps> = ({ series }) => {
  return (
    <Link to={`/series/${series.slug}`} className="block">
      <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 hover:bg-neutral-750 transition-all duration-300">
        <h3 className="text-xl font-bold text-white mb-2">{series.name}</h3>
        <p className="text-neutral-400 mb-4">{series.description.html}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-neutral-300">{series.posts?.length || 0} articles</span>
          <span className="text-blue-400 hover:text-blue-300">View Series →</span>
        </div>
      </div>
    </Link>
  );
};
