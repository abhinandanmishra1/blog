import { MDXProvider } from '@mdx-js/react';
import { Badge } from './Badge';
import { Callout } from './Callout';
import { CodeBlock } from './CodeBlock';
import { CodeSandbox } from './CodeSandbox';
import { FileTree, FileTreeItem } from './FileTree';
import { ImageComparison } from './ImageComparison';
import { InlineCode } from './InlineCode';
import { Steps, Step } from './Steps';
import { Tabs, TabItem } from './Tabs';
import { YouTube } from './YouTube';

const components = {
  // Standard HTML elements with custom styling
  h1: (props: any) => (
    <h1 className="text-4xl font-bold text-white mb-6 mt-8" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-bold text-white mb-4 mt-8" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-bold text-white mb-3 mt-6" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="text-xl font-bold text-white mb-2 mt-4" {...props} />
  ),
  h5: (props: any) => (
    <h5 className="text-lg font-bold text-white mb-2 mt-4" {...props} />
  ),
  h6: (props: any) => (
    <h6 className="text-base font-bold text-white mb-2 mt-4" {...props} />
  ),
  p: (props: any) => (
    <p className="text-neutral-300 mb-4 leading-relaxed" {...props} />
  ),
  a: (props: any) => (
    <a 
      className="text-blue-400 hover:text-blue-300 underline underline-offset-2" 
      {...props} 
    />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside mb-4 space-y-1 text-neutral-300" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside mb-4 space-y-1 text-neutral-300" {...props} />
  ),
  li: (props: any) => (
    <li className="mb-1" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote 
      className="border-l-4 border-neutral-600 pl-4 py-2 my-6 bg-neutral-800/50 text-neutral-300 italic" 
      {...props} 
    />
  ),
  code: ({ className, children, ...props }: any) => {
    // If it's a code block (has className with language)
    if (className?.startsWith('language-')) {
      return <CodeBlock className={className} {...props}>{children}</CodeBlock>;
    }
    // If it's inline code
    return <InlineCode {...props}>{children}</InlineCode>;
  },
  pre: (props: any) => (
    <div {...props} />
  ),
  img: (props: any) => (
    <img 
      className="rounded-lg my-6 max-w-full h-auto" 
      {...props} 
    />
  ),
  hr: (props: any) => (
    <hr className="border-neutral-700 my-8" {...props} />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-neutral-700" {...props} />
    </div>
  ),
  thead: (props: any) => (
    <thead className="bg-neutral-800" {...props} />
  ),
  th: (props: any) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider" 
      {...props} 
    />
  ),
  td: (props: any) => (
    <td 
      className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300" 
      {...props} 
    />
  ),
  tr: (props: any) => (
    <tr className="hover:bg-neutral-800/50" {...props} />
  ),

  // Custom components
  Badge,
  Callout,
  CodeBlock,
  CodeSandbox,
  FileTree,
  FileTreeItem,
  ImageComparison,
  Steps,
  Step,
  Tabs,
  TabItem,
  YouTube,
};

interface MDXComponentsProps {
  children: React.ReactNode;
}

export const MDXComponents: React.FC<MDXComponentsProps> = ({ children }) => {
  return (
    <MDXProvider components={components}>
      <div className="prose prose-neutral prose-invert max-w-none">
        {children}
      </div>
    </MDXProvider>
  );
};