import { ReactNode } from 'react';

interface Card3DProps {
  children: ReactNode;
  color?: string;
}

export const Card3D = ({ children, color = 'rgb(255, 255, 255)' }: Card3DProps) => {
  return (
    <div
      className="transform-gpu transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      <div
        className="relative"
        style={{
          transform: 'translateZ(0)',
          boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px ${color}`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
