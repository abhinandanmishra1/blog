"use client";

import { Sandpack as SandpackComponent } from "@codesandbox/sandpack-react";

interface SandpackProps {
    files?: Record<string, string>;
    template?: "react" | "react-ts" | "vanilla" | "vanilla-ts" | "node";
    title?: string;
}

export const Sandpack = ({
    files = {},
    template = "react",
    title
}: SandpackProps) => {
    return (
        <div className="my-8">
            {title && (
                <div className="bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-300 rounded-t-lg border-b border-neutral-700">
                    {title}
                </div>
            )}
            <SandpackComponent
                template={template}
                theme="dark"
                files={files}
                options={{
                    showLineNumbers: true,
                    showInlineErrors: true,
                    wrapContent: true,
                    editorHeight: 400,
                    classes: {
                        "sp-wrapper": "border border-neutral-700 rounded-lg overflow-hidden",
                        "sp-layout": "!rounded-none",
                    }
                }}
            />
        </div>
    );
};
