import { marked } from 'marked';
import highlightjs from './highlight';

const renderer = new marked.Renderer();

// @ts-ignore
// @ts-ignore
renderer.link = function (token) {
    // @ts-ignore
    const link = marked.Renderer.prototype.link.call(this, token);
    const { href, title } = token;
    const linkIsUserMention =
        title &&
        title.includes('s Profile - Hashnode') &&
        href &&
        href.includes('https://hashnode.com');

    if (linkIsUserMention) {
        return link.replace('<a', "<a class='user-mention' target='_blank' rel='noopener noreferrer'");
    }
    if (href && href.indexOf('#') === 0) {
        return link.replace('<a', "<a class='post-section-overview'");
    }
    return link.replace('<a', "<a target='_blank' rel='noopener noreferrer' ");
};

// @ts-ignore
renderer.tablecell = function (token, flags) {
    // @ts-ignore
    const content = this.parser.parseInline(token.tokens);
    const chunks = content.split('&lt;br&gt;-');

    flags = flags || {};
    const type = flags.header ? 'th' : 'td';
    const tag = '<' + type + (flags.align ? ' align="' + flags.align + '"' : '') + '>';

    if (chunks.length === 1) {
        return tag + content + '</' + type + '>\n';
    }

    if (chunks[0].indexOf('- ') === 0) {
        chunks[0] = chunks[0].substring(1);
    }

    let html = '';

    chunks.forEach(function (chunk: string) {
        html += '<li>' + chunk + '</li>';
    });

    return tag + '<ul>' + html + '</ul></' + type + '>\n';
};

const markedOpts: any = {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code: string, lang: string) {
        // Fix to prevent content-preview API from crashing on inputting long codeblocks with mixed characters without language.
        lang = lang || 'javascript';
        if (!lang) {
            return highlightjs.highlightAuto(code).value;
        }
        if (highlightjs.getLanguage(lang)) {
            return highlightjs.highlight(lang, code, true).value;
        } else {
            return highlightjs.highlightAuto(code, []).value;
        }
    },
};

export const markedInstance = (content: string) => {
    return marked(content, markedOpts);
}

export default markedInstance;
