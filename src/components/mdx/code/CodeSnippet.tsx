import { codeToHtml } from "shiki";
import styles from "./code-snippet.module.css";
import { CopyButton } from "./CopyButton";

type CodeSnippetProps = {
    code: string;
    lang?: string;
    filename?: string;
    highlight?: number[];
};

export default async function CodeSnippet({
    code,
    lang = "tsx",
    filename,
    highlight = [],
}: CodeSnippetProps) {
    const html = await codeToHtml(code, {
        lang,
        theme: "github-dark",
    });

    return (
        <div className={styles.wrapper} data-highlight-lines={highlight.join(",")}>
            {filename && (
                <div className={styles.header}>
                    <span>{filename}</span>
                    {lang && <span className={styles.lang}>{lang}</span>}
                </div>
            )}
            <CopyButton text={code} />
            <div
                className={styles.code}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
}
