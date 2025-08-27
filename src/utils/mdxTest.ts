// Test direct import approach
import ExampleBlog from '../content/example-blog.mdx';
import AdvancedReactPatterns from '../content/advanced-react-patterns.mdx';

export const testMDXComponents = {
  'example-blog': ExampleBlog,
  'advanced-react-patterns': AdvancedReactPatterns
};

console.log('Direct imports:', {
  ExampleBlog: typeof ExampleBlog,
  AdvancedReactPatterns: typeof AdvancedReactPatterns
});