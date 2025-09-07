"use client"
import {useParams} from "next/navigation";

import styles from "./lesson-page.module.scss"

export default function LessonPage() {
    const params = useParams()
    const courseId = params.courseId
    const lessonId = params.lessonId


    return <article className={styles.article}>
        Course: {courseId}
        Lesson: {lessonId}
    </article>
}