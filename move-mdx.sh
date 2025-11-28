#!/bin/bash

# Create directories if they don't exist
mkdir -p src/components/mdx/{elements,code,media}

# Move element components
mv src/components/mdx/Badge.tsx src/components/mdx/elements/
mv src/components/mdx/Callout.tsx src/components/mdx/elements/
mv src/components/mdx/InlineCode.tsx src/components/mdx/elements/
mv src/components/mdx/Steps.tsx src/components/mdx/elements/
mv src/components/mdx/Tabs.tsx src/components/mdx/elements/
mv src/components/mdx/FileTree.tsx src/components/mdx/elements/

# Move code components
mv src/components/mdx/CodeBlock.tsx src/components/mdx/code/
mv src/components/mdx/CodeSandbox.tsx src/components/mdx/code/

# Move media components
mv src/components/mdx/ImageComparison.tsx src/components/mdx/media/
mv src/components/mdx/YouTube.tsx src/components/mdx/media/
