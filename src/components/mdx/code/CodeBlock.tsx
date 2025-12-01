"use client"
import React, { useState, useRef } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  filename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  className = '',
  filename
}) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const language = className.replace('language-', '');

  const handleCopy = async () => {
    if (codeRef.current) {
      const text = codeRef.current.textContent || '';
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group my-6">
      {filename && (
        <div className="bg-neutral-800 text-neutral-300 px-4 py-2 text-sm font-medium rounded-t-lg border-b border-neutral-700">
          {filename}
        </div>
      )}
      <div className="relative">
        <pre className={`bg-[#0d1117] p-4 rounded-lg ${filename ? 'rounded-t-none' : ''} overflow-x-auto`}>
          <code ref={codeRef} className={`${className} block`}>
            {children}
          </code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 bg-neutral-800 hover:bg-neutral-700 rounded transition-colors opacity-0 group-hover:opacity-100 border border-neutral-700"
          title="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-neutral-400" />
          )}
        </button>
        {language && !filename && (
          <span className="absolute top-2 left-2 text-xs text-neutral-500 select-none">
            {language}
          </span>
        )}
      </div>
    </div>
  );
};