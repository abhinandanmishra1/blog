import React from 'react';

interface InlineCodeProps {
  children: React.ReactNode;
}

export const InlineCode: React.FC<InlineCodeProps> = ({ children }) => {
  return (
    <code className="bg-neutral-800 text-pink-300 px-1.5 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  );
};