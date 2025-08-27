# MDX Blog System Guide

This guide explains how to use the MDX blog system that's been set up in your project.

## Available Components

### Text & Layout Components

#### Callout
Display important information with different styles:

```mdx
<Callout type="info" title="Information">
This is an informational callout.
</Callout>

<Callout type="warning" title="Warning">
This is a warning callout.
</Callout>

<Callout type="error" title="Error">
This is an error callout.
</Callout>

<Callout type="success" title="Success">
This is a success callout.
</Callout>
```

#### Badge
Add small status indicators:

```mdx
<Badge>Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
```

### Code Components

#### Code Blocks
Syntax highlighted code blocks with copy functionality:

```mdx
```javascript filename="example.js"
const greeting = "Hello, World!";
console.log(greeting);
```

#### Inline Code
For small code snippets: `const variable = "value"`

### Interactive Components

#### Tabs
Organize content in tabs:

```mdx
<Tabs defaultValue="tab1">
<TabItem value="tab1" label="First Tab">
Content for the first tab.
</TabItem>
<TabItem value="tab2" label="Second Tab">
Content for the second tab.
</TabItem>
</Tabs>
```

#### Steps
Create step-by-step instructions:

```mdx
<Steps>
<Step title="First Step">
Do this first.
</Step>
<Step title="Second Step">
Then do this.
</Step>
</Steps>
```

### File & Project Components

#### File Tree
Display project structure:

```mdx
<FileTree>
<FileTreeItem name="src" type="folder" defaultOpen>
<FileTreeItem name="components" type="folder">
<FileTreeItem name="Button.tsx" type="file" />
</FileTreeItem>
<FileTreeItem name="App.tsx" type="file" />
</FileTreeItem>
</FileTree>
```

### Media Components

#### YouTube
Embed YouTube videos:

```mdx
<YouTube id="VIDEO_ID" title="Video Title" />
```

#### CodeSandbox
Embed CodeSandbox examples:

```mdx
<CodeSandbox id="SANDBOX_ID" title="Demo Title" />
```

#### Image Comparison
Before/after image comparisons:

```mdx
<ImageComparison 
  before="/path/to/before.jpg" 
  after="/path/to/after.jpg" 
  alt="Comparison description" 
/>
```

## Writing Your Own MDX Blogs

1. Create a new `.mdx` file in the `src/content/` directory
2. Use any combination of Markdown syntax and the custom components above
3. Import and use the file in your React components with the `MDXRenderer`

### Example Usage

```tsx
import { MDXRenderer } from '../components';
import MyBlogPost from '../content/my-blog-post.mdx';

export const BlogPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <MDXRenderer>
        <MyBlogPost />
      </MDXRenderer>
    </div>
  );
};
```

## Features

- **Syntax Highlighting**: Powered by highlight.js
- **Copy Code**: All code blocks have copy buttons
- **Responsive**: All components work on mobile and desktop
- **Accessible**: Components follow accessibility best practices
- **Themeable**: Styled to match your dark theme

## Demo

Visit `/mdx-demo` to see all components in action with the example blog post.