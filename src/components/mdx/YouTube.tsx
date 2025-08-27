import React from 'react';

interface YouTubeProps {
  id: string;
  title?: string;
}

export const YouTube: React.FC<YouTubeProps> = ({ id, title }) => {
  return (
    <div className="my-8">
      <div className="relative aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={title || 'YouTube video'}
          className="absolute inset-0 w-full h-full rounded-lg"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
};