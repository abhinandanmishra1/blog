import sanitizeHtml from 'sanitize-html';
import sanitizeHtmlOptions from './sanitizeHTMLOptions';
import marked from './marked';
import { imageReplacer } from './image';

const extractMentions = (content: string) => {
    const regex = /@<a([^>]*)href="@(\S+)"([^>]*)>((?:.(?!\<\/a\>))*.)<\/a>/g;

    const replacer = (substring: string, ...args: any[]) => {
        const [p1, p2, p3, p4] = args;
        return `<a target='_blank' rel='noopener noreferrer' href="https://hashnode.com/@${p2}">${p4}</a>`;
    };
    return content.replace(regex, replacer);
};

const getSanitizedHTML = (content: string) => {
    return sanitizeHtml(content, sanitizeHtmlOptions);
};

const getHTMLFromMarkdown = (contentMarkdown: string) => {
    return marked(contentMarkdown);
};

const getOptimizedImages = (content: string) => {
    return imageReplacer(content, true);
};

const pipe =
    (...fns: any[]) =>
        (x: any) =>
            fns.reduce((v, f) => f(v), x);

const fixHashnodeImageSyntax = (content: string) => {
    // Regex to match ![](url align="left|right|center")
    // Captures: 1=alt, 2=url, 3=align
    return content.replace(/!\[(.*?)\]\((.*?) (align="(?:left|right|center)")\)/g, (match, alt, url, align) => {
        return `<img src="${url}" alt="${alt}" ${align} />`;
    });
};

const convertEmbeds = (content: string) => {
    // Regex to match %[url]
    return content.replace(/%\[(.*?)\]/g, (match, url) => {
        return `<div class="embed-wrapper" data-url="${url}"></div>`;
    });
};

export const markdownToHtml = (contentMarkdown: string) => {
    const content = pipe(
        fixHashnodeImageSyntax,
        convertEmbeds,
        getHTMLFromMarkdown,
        getSanitizedHTML,
        extractMentions,
        imageReplacer,
    )(contentMarkdown);

    return content;
};
