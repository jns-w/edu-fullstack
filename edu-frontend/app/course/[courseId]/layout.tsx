"use client"
import {useParams} from "next/navigation"
import {ReactNode} from "react";

import {CourseSearchBar} from "@/components/course-search-bar/course-search-bar";
import {ChapterMenu} from "@/components/chapter-menu/chapter-menu";

import styles from "./course-page.module.scss";

export default function CourseLayout({children}: { children: ReactNode }) {
    const params = useParams()
    const courseId = parseInt(params.courseId as string)
    const content = "## HELLO\nHhaa. Okay man\n\nHere is the thing we are now  \n at a cross roads\n\n```js\ntest\nconst variable = 10\nconst variable2 = [100, 200]\n```\n\n [Bubble sort]() is a sorting algorithm that compares two adjacent elements and swaps them until they are in the intended order.\n\n Just like the movement of air bubbles in the water that rise up to the surface, each element of the array move to the end in each iteration. Therefore, it is called a bubble sort."

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <section className={styles.courseSection}>
                    <CourseSearchBar courseId={courseId}/>
                    <div className={styles.courseContent}>
                        <div className={styles.chapterMenuWrapper}>
                            <ChapterMenu courseId={courseId}/>
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
