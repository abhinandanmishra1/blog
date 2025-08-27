import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({ 
  type = 'info', 
  title, 
  children 
}) => {
  const config = {
    info: {
      icon: Info,
      className: 'border-blue-500/20 bg-blue-500/10 text-blue-200',
      iconColor: 'text-blue-400'
    },
    warning: {
      icon: AlertCircle,
      className: 'border-yellow-500/20 bg-yellow-500/10 text-yellow-200',
      iconColor: 'text-yellow-400'
    },
    error: {
      icon: XCircle,
      className: 'border-red-500/20 bg-red-500/10 text-red-200',
      iconColor: 'text-red-400'
    },
    success: {
      icon: CheckCircle,
      className: 'border-green-500/20 bg-green-500/10 text-green-200',
      iconColor: 'text-green-400'
    }
  };

  const { icon: Icon, className, iconColor } = config[type];

  return (
    <div className={`my-6 p-4 border rounded-lg ${className}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconColor}`} />
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold mb-2">{title}</h4>
          )}
          <div className="prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};