"use client";
import React, { useMemo, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { markdownToHtml } from '@/lib/renderer/markdownToHtml';
import styles from './markdown-styles.module.css';
import 'highlight.js/styles/atom-one-dark.css';
import hljs from 'highlight.js';

interface HashnodeMarkdownRendererProps {
    content: string;
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

export const HashnodeMarkdownRenderer: React.FC<HashnodeMarkdownRendererProps> = ({ content }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    const htmlContent = useMemo(() => {
        return markdownToHtml(content);
    }, [content]);



    useEffect(() => {
        if (!contentRef.current) return;

        // Handle code highlighting
        const codeBlocks = contentRef.current.querySelectorAll('pre code');
        codeBlocks.forEach((block) => {
            block.classList.add('hljs');
            // If marked didn't highlight it (no spans), try client-side highlighting
            if (!block.querySelector('span')) {
                hljs.highlightElement(block as HTMLElement);
            }
        });

        // Add copy buttons
        const preBlocks = contentRef.current.querySelectorAll('pre');
        preBlocks.forEach((pre) => {
            // Check if copy button already exists
            if (pre.querySelector(`.${styles['copy-button']}`)) return;

            const button = document.createElement('button');
            button.className = styles['copy-button'];
            button.ariaLabel = 'Copy code';
            button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;

            button.onclick = async () => {
                const code = pre.querySelector('code')?.textContent || '';
                await navigator.clipboard.writeText(code);
                button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-green-400"><polyline points="20 6 9 17 4 12"/></svg>`;
                setTimeout(() => {
                    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
                }, 2000);
            };
            pre.appendChild(button);
        });

        // Handle embeds
        const embedWrappers = contentRef.current.querySelectorAll('.embed-wrapper');
        embedWrappers.forEach((wrapper) => {
            const url = wrapper.getAttribute('data-url');
            if (!url) return;

            // Avoid re-rendering if already rendered
            if (wrapper.hasChildNodes()) return;

            const root = createRoot(wrapper);
            root.render(<EmbedComponent url={url} />);
        });
    }, [htmlContent]);

    return (
        <div
            ref={contentRef}
            className={styles.markdown}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
};
