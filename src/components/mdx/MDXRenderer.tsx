import React from 'react';
import './mdx-styles.css';

interface MDXRendererProps {
  children: React.ReactNode;
  className?: string;
}

export const MDXRenderer: React.FC<MDXRendererProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`mdx-content prose prose-neutral prose-invert max-w-none ${className}`}>
      {children}
    </div>
  );
};