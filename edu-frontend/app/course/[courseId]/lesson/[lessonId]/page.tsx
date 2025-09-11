"use client"
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {useAtom} from "jotai";
import clsx from "clsx";

import {MarkdownContent} from "@/components/markdown-content/markdown-content";
import {Topic} from "@/types/content-types";
import {authTokenAtom} from "@/states/user";

import styles from "./lesson-page.module.scss"

export default function LessonPage() {
    const params = useParams()
    const courseId = parseInt(params.courseId as string)
    const lessonId = parseInt(params.lessonId as string)
    const [authToken] = useAtom(authTokenAtom)
    const [lessonTitle, setLessonTitle] = useState("")
    const [content, setContent] = useState("")
    const [topics, setTopics] = useState<Topic[]>([])
    const [lessonIsComplete, setLessonIsComplete] = useState(false)

    async function completeLesson(lessonId: number) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/user/lesson/${lessonId}/complete`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            method: "POST"
        })
        const json = await response.json()

        if (json.ok) {
            setLessonIsComplete(true)
        }
    }

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
        <button disabled={lessonIsComplete}
                onClick={() => completeLesson(lessonId)}
                className={clsx(styles.completeLessonBtn, lessonIsComplete && styles.completed)}
        >{lessonIsComplete ? "Completed!" : "Complete lesson"}
        </button>
    </article>
}