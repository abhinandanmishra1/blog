import hljs from 'highlight.js';

export const highlight = (lang: string, code: string, ignoreIllegals?: boolean) => {
    return hljs.highlight(code, { language: lang, ignoreIllegals });
};

export const highlightAuto = (code: string, languageSubset?: string[]) => {
    return hljs.highlightAuto(code, languageSubset);
};

export const getLanguage = (lang: string) => {
    return hljs.getLanguage(lang);
};

export default {
    highlight,
    highlightAuto,
    getLanguage,
};
