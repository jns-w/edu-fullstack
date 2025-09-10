import {darcula, prism} from "react-syntax-highlighter/dist/esm/styles/prism";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import Markdown from "react-markdown";
import {ComponentProps} from "react";
import {useAtom} from "jotai/index";
import Link from "next/link";
import clsx from "clsx";

import {themeUserPreferenceAtom} from "@/states/ui";

import styles from "./markdown-content.module.scss"

interface MarkdownContentProps {
    children: string
}

export function MarkdownContent({children}: MarkdownContentProps) {
    return (
        <div className={styles.markdownWrapper}>
            <Markdown
                components={{
                    a: ({children, ...props}) => {
                        return <Link href={props.href as string}>{children}</Link>
                    },
                    code: ({...props}) => CodeBlock(props as CodeBlockProps),
                }}
            >
                {children}
            </Markdown>
        </div>
    )
}

interface CodeBlockProps extends ComponentProps<typeof SyntaxHighlighter> {
    children: string
    className?: string
    inline?: boolean

    [key: string]: unknown
}

function CodeBlock({children, className, inline, ...props}: CodeBlockProps) {
    const match = /language-(\w+)/.exec(className || "")
    const [theme] = useAtom(themeUserPreferenceAtom)

    // If inline code or no language specified, render as regular <code>
    if (inline || !match) {
        return (
            <code className={clsx(className, styles.code)} {...props}>
                {children}
            </code>
        )
    }
    // Render highlighted code block
    return (
        <div className={styles.codeWrapper}>
            <SyntaxHighlighter
                PreTag="div"
                language={match[1]}
                className={clsx(styles.code, className)}
                style={!theme || theme === "light" ? prism : darcula}
                {...(props as ComponentProps<typeof SyntaxHighlighter>)}
            >
                {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
        </div>
    )
}
