"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, File, Folder } from 'lucide-react';

interface FileTreeProps {
  children: React.ReactNode;
}

interface FileTreeItemProps {
  name: string;
  type?: 'file' | 'folder';
  children?: React.ReactNode;
  defaultOpen?: boolean;
}

export const FileTree: React.FC<FileTreeProps> = ({ children }) => {
  return (
    <div className="my-6 bg-neutral-900 border border-neutral-700 rounded-lg p-4">
      <div className="font-mono text-sm space-y-1">
        {children}
      </div>
    </div>
  );
};

export const FileTreeItem: React.FC<FileTreeItemProps> = ({ 
  name, 
  type = 'file', 
  children, 
  defaultOpen = false 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const hasChildren = Boolean(children);

  return (
    <div>
      <div 
        className={`flex items-center gap-2 py-1 px-2 rounded hover:bg-neutral-800 ${
          hasChildren ? 'cursor-pointer' : ''
        }`}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {hasChildren ? (
          isOpen ? (
            <ChevronDown className="w-4 h-4 text-neutral-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          )
        ) : (
          <div className="w-4 h-4" />
        )}
        
        {type === 'folder' ? (
          <Folder className="w-4 h-4 text-blue-400" />
        ) : (
          <File className="w-4 h-4 text-neutral-400" />
        )}
        
        <span className={type === 'folder' ? 'text-blue-300' : 'text-neutral-300'}>
          {name}
        </span>
      </div>
      
      {hasChildren && isOpen && (
        <div className="ml-6 border-l border-neutral-700 pl-2">
          {children}
        </div>
      )}
    </div>
  );
};