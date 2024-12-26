import { AlertCircle } from 'lucide-react';
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3 text-red-400">
      <AlertCircle className="w-5 h-5" />
      <p>{message}</p>
    </div>
  );
};
