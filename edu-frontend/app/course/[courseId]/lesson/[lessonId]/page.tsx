"use client"
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";

import {MarkdownContent} from "@/components/markdown-content/markdown-content";
import {Topic} from "@/types/content-types";

import styles from "./lesson-page.module.scss"

export default function LessonPage() {
    const params = useParams()
    const courseId = parseInt(params.courseId as string)
    const lessonId = parseInt(params.lessonId as string)
    const [lessonTitle, setLessonTitle] = useState("")
    const [content, setContent] = useState("")
    const [topics, setTopics] = useState<Topic[]>([])

    useEffect(() => {
        async function fetchLessonContent(lessonId: number) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/lesson/${lessonId}/content`)
            const json = await response.json()

            if (json.ok) {
                const {data} = json
                setLessonTitle(data.title)
                setContent(data.content)
                setTopics(data.topics)
            }
        }

        fetchLessonContent(lessonId).then()
    }, [lessonId])

    return <article className={styles.article}>
        <h2>{lessonTitle}</h2>
        <MarkdownContent>
            {content}
        </MarkdownContent>
        {
            topics.map((topic) => {
                const title = topic.title || ""
                return (
                    <div key={`${topic.id}-${title}`}>
                        <h2>{title}</h2>
                        <MarkdownContent>
                            {topic.content}
                        </MarkdownContent>
                    </div>
                )
            })
        }
    </article>
}