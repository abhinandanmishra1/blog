"use client"
import 'highlight.js/styles/atom-one-dark.css';
import "./blog.css"

import React, { useEffect, useRef } from 'react';

import { FullPost } from '../../types';
import ReactDOM from 'react-dom';
import hljs from 'highlight.js';

interface BlogContentProps {
  post: FullPost;
}

const EmbedComponent: React.FC<{ url: string }> = ({ url }) => {
  if (url.includes('codesandbox.io')) {
    const sandboxUrl = url.replace('/s/', '/embed/');
    return (
      <iframe
        src={sandboxUrl}
        className="w-full h-[500px] rounded-lg border-0 mb-8"
        title="CodeSandbox Embed"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
    );
  }

  if (url.includes('codepen.io')) {
    const penUrl = url.replace('/pen/', '/embed/');
    return (
      <iframe
        src={penUrl}
        className="w-full h-[400px] rounded-lg border-0 mb-8"
        title="CodePen Embed"
        allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        loading="lazy"
      />
    );
  }

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.includes('youtu.be')
      ? url.split('youtu.be/')[1]
      : url.split('v=')[1]?.split('&')[0];
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        className="w-full aspect-video rounded-lg border-0 mb-8"
        title="YouTube Embed"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return null;
};

export const BlogContent: React.FC<BlogContentProps> = ({ post }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Handle code highlighting
    const codeBlocks = contentRef.current.querySelectorAll('pre code');
    codeBlocks.forEach((block) => {
      hljs.highlightElement(block as HTMLElement);

      const pre = block.parentElement;
      if (pre) {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';
        button.onclick = async () => {
          await navigator.clipboard.writeText(block.textContent || '');
          button.textContent = '✓ Copied!';
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 2000);
        };
        pre.appendChild(button);
      }
    });

    // Handle embeds
    const embedWrappers = contentRef.current.querySelectorAll('.embed-wrapper');
    embedWrappers.forEach((wrapper) => {
      const link = wrapper.querySelector('.embed-card') as HTMLAnchorElement;
      if (!link) return;

      const url = link.href;
      const container = document.createElement('div');

      const root = React.createElement(EmbedComponent, { url });
      wrapper.innerHTML = '';
      wrapper.appendChild(container);

      // @ts-expect-error - React 18 createRoot API
      const reactRoot = ReactDOM.createRoot(container);
      reactRoot.render(root);
    });
  }, [post.content.html]);

  return (
    <div className="blog-content">
      {/* Previous styles remain unchanged */}
      <div
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      />
    </div>
  );
};
