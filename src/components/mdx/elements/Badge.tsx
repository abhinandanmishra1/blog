import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default' 
}) => {
  const variants = {
    default: 'bg-neutral-700 text-neutral-200',
    success: 'bg-green-900/50 text-green-300 border border-green-700',
    warning: 'bg-yellow-900/50 text-yellow-300 border border-yellow-700',
    error: 'bg-red-900/50 text-red-300 border border-red-700',
    info: 'bg-blue-900/50 text-blue-300 border border-blue-700'
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};