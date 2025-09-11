"use client"
import {useParams} from "next/navigation"
import {useEffect, useState} from "react";

import {MarkdownContent} from "@/components/markdown-content/markdown-content";

import styles from "./course-page.module.scss"

export default function CoursePage() {
    const params = useParams()
    const courseId = parseInt(params.courseId as string)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    useEffect(() => {
        async function fetchData(courseId: number): Promise<void> {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/course/${courseId}/content`);
            const json = await response.json()

            if (json.ok) {
                const { data } = json
                setTitle(data.title)
                setContent(data.content)
            }

        }
        fetchData(courseId).then()
    }, [courseId])

    return (
        <article className={styles.article}>
            <h2>{title}</h2>
            <MarkdownContent>
                {content}
            </MarkdownContent>
        </article>
    );
}
