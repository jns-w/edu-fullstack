"use client"
import {ReactNode, useEffect, useState} from "react";
import {useParams} from "next/navigation"
import {useAtom} from "jotai";

import {CourseSearchBar} from "@/components/course-search-bar/course-search-bar";
import {ChapterMenu} from "@/components/chapter-menu/chapter-menu";
import {userAtom} from "@/states/user";

import styles from "./course-page.module.scss";

export default function CourseLayout({children}: { children: ReactNode }) {
    const params = useParams()
    const courseId = parseInt(params.courseId as string)
    const lessonId = parseInt(params.lessonId as string)
    const [user] = useAtom(userAtom)
    const [courseTitle, setCourseTitle] = useState("")
    const [chapters, setChapters] = useState([])
    const content = "## HELLO\nHhaa. Okay man\n\nHere is the thing we are now  \n at a cross roads\n\n```js\ntest\nconst variable = 10\nconst variable2 = [100, 200]\n```\n\n [Bubble sort]() is a sorting algorithm that compares two adjacent elements and swaps them until they are in the intended order.\n\n Just like the movement of air bubbles in the water that rise up to the surface, each element of the array move to the end in each iteration. Therefore, it is called a bubble sort."
    
    useEffect(() => {
        async function fetchCourseOutline(courseId: number) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/course/${courseId}/outline`)
            const json = await response.json()
            if (json.ok) {
                const { data } = json
                setCourseTitle(data.course.title)
                setChapters(data.chapters)
            }
        }

        fetchCourseOutline(courseId).then()
    }, [courseId])

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <section className={styles.courseSection}>
                    <div className={styles.courseSectionTopBar}>
                        {user ? "Progress" : "Sign up to track your progress"}
                        <CourseSearchBar courseId={courseId}/>
                    </div>
                    <div className={styles.courseContent}>
                        <div className={styles.chapterMenuWrapper}>
                            <ChapterMenu chapters={chapters} courseTitle={courseTitle} currentCourseId={courseId} currentLessonId={lessonId}/>
                        </div>
                        <div className={styles.articleWrapper}>
                            {children}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
