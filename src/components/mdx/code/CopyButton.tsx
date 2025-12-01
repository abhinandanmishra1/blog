"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import styles from "./code-snippet.module.css";

export const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className={`${styles.copyButton} ${copied ? styles.copied : ""}`}
            title="Copy code"
        >
            {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
    );
};
