import { useState } from 'react';

interface Card3DProps {
    children: React.ReactNode;
    className?: string;
    color: string;
}

export const Card3D = ({ children, className = '', color }: Card3DProps) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 10;
    const rotateX = -((y - centerY) / centerY) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
    setSpotlight({ 
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  const colorRgb = color.substring(4, color.length - 1);

  return (
    <div className="w-full" style={{ perspective: '1000px' }}>
      <div
        className={`relative w-full rounded-xl bg-gray-800/50 backdrop-blur-sm shadow-lg 
          transition-all duration-200 ease-linear overflow-hidden ${className}`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Spotlight gradient effect */}
        {isHovering && (
          <div 
            className="pointer-events-none absolute inset-0 transition duration-300 opacity-70"
            style={{
                // make the color slightly less opacity and more distributed
                background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(${colorRgb}, 0.15), transparent 80%)`
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
};
