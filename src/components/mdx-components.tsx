import Image from 'next/image';
import type { MDXComponents } from 'mdx/types'

import { mdxComponents as CustomMDXComponents } from './mdx/MDXComponents';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...CustomMDXComponents,
    ...components,
  }
}
