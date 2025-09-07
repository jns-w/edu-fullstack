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

    // const content = "## HELLO\nHhaa. Okay man\n\nHere is the thing we are now  \n at a cross roads\n\n```js\ntest\nconst variable = 10\nconst variable2 = [100, 200]\n```\n\n [Bubble sort]() is a sorting algorithm that compares two adjacent elements and swaps them until they are in the intended order.\n\n Just like the movement of air bubbles in the water that rise up to the surface, each element of the array move to the end in each iteration. Therefore, it is called a bubble sort."
    
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
