import React from 'react';

interface StepsProps {
  children: React.ReactNode;
}

interface StepProps {
  children: React.ReactNode;
  title?: string;
}

export const Steps: React.FC<StepsProps> = ({ children }) => {
  return (
    <div className="my-8">
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export const Step: React.FC<StepProps> = ({ children, title }) => {
  return (
    <div className="relative pl-8">
      <div className="absolute left-0 top-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
      <div className="absolute left-2 top-6 w-0.5 h-full bg-blue-500/30"></div>
      <div>
        {title && (
          <h4 className="font-semibold text-white mb-2">{title}</h4>
        )}
        <div className="prose prose-neutral prose-invert max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
};