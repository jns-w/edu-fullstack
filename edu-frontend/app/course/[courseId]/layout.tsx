"use client"
import {FloatingPortal, offset, shift, useFloating} from "@floating-ui/react";
import {ReactNode, useEffect, useState} from "react";
import {useParams} from "next/navigation"
import {List} from "lucide-react";
import {useAtom} from "jotai";

import {ChapterMenuDropdown} from "@/components/chapter-menu-dropdown/chapter-menu-dropdown";
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
    const [showChaptersDropdown, setShowChaptersDropdown] = useState(false)

    const {floatingStyles, refs} = useFloating({
        middleware: [offset(3), shift()],
        onOpenChange: setShowChaptersDropdown,
        open: showChaptersDropdown,
        placement: "bottom-end",
    })

    useEffect(() => {
        async function fetchCourseOutline(courseId: number) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/course/${courseId}/outline`)
            const json = await response.json()
            if (json.ok) {
                const {data} = json
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
                        {user ? "Course Progress" : "Sign up to track your progress"}
                        <CourseSearchBar courseId={courseId}/>
                    </div>
                    <div className={styles.courseContent}>
                        <div className={styles.chapterMenuWrapper}>
                            <ChapterMenu chapters={chapters} courseTitle={courseTitle} currentCourseId={courseId}
                                         currentLessonId={lessonId}/>
                        </div>
                        <div className={styles.chapterMenuDropdownWrapper}>
                            <button
                                ref={refs.setReference}
                                onClick={() => setShowChaptersDropdown(true)}
                                className={styles.showChapterMenuDropdownBtn}>
                                <List size={15}/>
                                <p>Chapters</p>
                            </button>
                            {
                                showChaptersDropdown && (
                                    <FloatingPortal>
                                        <div ref={refs.setFloating} style={floatingStyles}>
                                        <ChapterMenuDropdown courseTitle={""} chapters={chapters}
                                                             currentCourseId={courseId} currentLessonId={lessonId}
                                                             showFn={setShowChaptersDropdown}/>
                                        </div>
                                    </FloatingPortal>
                                )
                            }

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
