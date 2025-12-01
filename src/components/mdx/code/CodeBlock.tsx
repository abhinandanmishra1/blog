"use client"
import React, { useState, useRef } from 'react';
import { Check, Copy } from 'lucide-react';

export const CodeBlock = ({ children, ...props }: any) => {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const language = props['data-language'] || 'text';
  const filename = props['data-filename'] || props.filename;

  const handleCopy = async () => {
    if (preRef.current) {
      const text = preRef.current.textContent || '';
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group my-6 rounded-lg overflow-hidden border border-neutral-700">
      {filename && (
        <div className="bg-neutral-800 text-neutral-300 px-4 py-2 text-sm font-medium border-b border-neutral-700 flex items-center justify-between">
          <span>{filename}</span>
          {language && <span className="text-xs text-neutral-500 uppercase">{language}</span>}
        </div>
      )}
      <div className="relative">
        <pre
          ref={preRef}
          {...props}
          className={`p-4 overflow-x-auto text-sm leading-6 ${props.className || ''}`}
        >
          {children}
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 bg-neutral-800/80 hover:bg-neutral-700 rounded transition-colors opacity-0 group-hover:opacity-100 border border-neutral-700 backdrop-blur-sm"
          title="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-neutral-400" />
          )}
        </button>
      </div>
    </div>
  );
};