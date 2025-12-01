import React from 'react';

interface DemoProps {
    children: React.ReactNode;
    title?: string;
}

export const Demo: React.FC<DemoProps> = ({ children, title }) => {
    return (
        <div className="my-8 border border-neutral-700 rounded-lg overflow-hidden bg-neutral-900/50">
            {title && (
                <div className="bg-neutral-800 px-4 py-2 border-b border-neutral-700 text-sm font-medium text-neutral-300">
                    {title}
                </div>
            )}
            <div className="p-6 flex items-center justify-center min-h-[200px] bg-[url('/grid.svg')] bg-center">
                {children}
            </div>
        </div>
    );
};
