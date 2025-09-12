"use client"
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {useAtom} from "jotai";
import clsx from "clsx";

import {MarkdownContent} from "@/components/markdown-content/markdown-content";
import {courseProgressFlagAtom} from "@/states/course";
import {authTokenAtom, userAtom} from "@/states/user";
import {fetchWithAuth} from "@/utils/fetch";
import {Topic} from "@/types/content-types";

import styles from "./lesson-page.module.scss"

export default function LessonPage() {
    const params = useParams()
    const courseId = parseInt(params.courseId as string)
    const lessonId = parseInt(params.lessonId as string)
    const [authToken] = useAtom(authTokenAtom)
    const [user] = useAtom(userAtom)
    const [isLoading, setIsLoading] = useState(false)
    const [lessonTitle, setLessonTitle] = useState("")
    const [content, setContent] = useState("")
    const [topics, setTopics] = useState<Topic[]>([])
    const [lessonIsComplete, setLessonIsComplete] = useState(false)
    const [, setCourseProgressFlag] = useAtom(courseProgressFlagAtom)

    async function completeLesson(lessonId: number) {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/user/lesson/${lessonId}/complete`, authToken, {
            method: "POST"
        })
        const json = await response.json()

        if (json.ok) {
            setLessonIsComplete(true)
            setCourseProgressFlag(prev => prev === 0 ? 1 : 0)
        }
    }

    useEffect(() => {
        async function fetchLessonContent(lessonId: number) {
            setIsLoading(true)
            const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/lesson/${lessonId}/content`,
                authToken,
                {
                    method: "GET"
                })
            const json = await response.json()

            if (json.ok) {
                const {data} = json
                setLessonTitle(data.lesson.title)
                setContent(data.lesson.content)
                setTopics(data.lesson.topics)
                setLessonIsComplete(data.lessonCompleted)
            }

            setIsLoading(false)
        }

        fetchLessonContent(lessonId).then()
    }, [authToken, lessonId, user])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!content) {
        return <div>No content</div>
    }

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
        {
            user && (
                <button disabled={lessonIsComplete}
                        onClick={() => completeLesson(lessonId)}
                        className={clsx(styles.completeLessonBtn, lessonIsComplete && styles.completed)}
                >{lessonIsComplete ? "Completed!" : "Complete lesson"}
                </button>
            )
        }
    </article>
}