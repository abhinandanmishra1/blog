import React from 'react';
import { BackButton, MDXRenderer } from '../components';
import ExampleBlog from '../content/example-blog.mdx';

export const MDXDemo = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <BackButton />
      
      <MDXRenderer>
        <ExampleBlog />
      </MDXRenderer>
    </div>
  );
};