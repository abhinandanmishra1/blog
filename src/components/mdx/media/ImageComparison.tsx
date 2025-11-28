"use client"
import React, { useState } from 'react';
import Image from 'next/image';

interface ImageComparisonProps {
  before: string;
  after: string;
  alt?: string;
}

export const ImageComparison: React.FC<ImageComparisonProps> = ({
  before,
  after,
  alt = 'Before and after comparison'
}) => {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="my-8">
      <div className="relative rounded-lg overflow-hidden">
        <Image
          src={showAfter ? after : before}
          alt={alt}
          width={800}
          height={600}
          className="w-full h-auto transition-opacity duration-300"
        />
        <div className="absolute bottom-4 left-4 flex gap-2">
          <button
            onClick={() => setShowAfter(false)}
            className={`px-3 py-1 text-sm rounded transition-colors ${!showAfter
                ? 'bg-blue-500 text-white'
                : 'bg-black/50 text-white hover:bg-black/70'
              }`}
          >
            Before
          </button>
          <button
            onClick={() => setShowAfter(true)}
            className={`px-3 py-1 text-sm rounded transition-colors ${showAfter
                ? 'bg-blue-500 text-white'
                : 'bg-black/50 text-white hover:bg-black/70'
              }`}
          >
            After
          </button>
        </div>
      </div>
    </div>
  );
};