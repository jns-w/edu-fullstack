"use client"
import {FloatingPortal, offset, shift, useFloating} from "@floating-ui/react";
import {ReactNode, useEffect, useState} from "react";
import {useParams} from "next/navigation"
import {List} from "lucide-react";
import {useAtom} from "jotai";
import Link from "next/link";

import {ChapterMenuDropdown} from "@/components/chapter-menu-dropdown/chapter-menu-dropdown";
import {CourseSearchBar} from "@/components/course-search-bar/course-search-bar";
import {CourseProgress} from "@/components/course-progress/course-progress";
import {ChapterMenu} from "@/components/chapter-menu/chapter-menu";
import {courseProgressFlagAtom} from "@/states/course";
import {authTokenAtom, userAtom} from "@/states/user";

import styles from "./course-page.module.scss";

export default function CourseLayout({children}: { children: ReactNode }) {
    const params = useParams()
    const courseId = parseInt(params.courseId as string)
    const lessonId = parseInt(params.lessonId as string)
    const [user] = useAtom(userAtom)
    const [authToken] = useAtom(authTokenAtom)
    const [courseTitle, setCourseTitle] = useState("")
    const [chapters, setChapters] = useState([])
    const [showChaptersDropdown, setShowChaptersDropdown] = useState(false)
    const [progressRate, setProgressRate] = useState(0)
    const [courseProgressFlag,] = useAtom(courseProgressFlagAtom)

    const {floatingStyles, refs} = useFloating({
        middleware: [offset(3), shift()],
        onOpenChange: setShowChaptersDropdown,
        open: showChaptersDropdown,
        placement: "bottom-end",
    })

    useEffect(() => {
        async function fetchCourseProgress(courseId: number) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/user/course/${courseId}/progress`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "applications/json"
                },
                method: "GET"
            })
            const json = await response.json()

            if (json.ok) {
                const {data} = json
                setProgressRate(data.completionRate)
            }
        }

        fetchCourseProgress(courseId).then()
    }, [authToken, courseId, courseProgressFlag]);

    useEffect(() => {
        async function fetchCourseOutline(courseId: number) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/course/${courseId}/outline`,
                {
                    method: "GET",
                    // add bearer token only if user is logged in
                    ...(user && {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    })
                }
            )
            const json = await response.json()
            if (json.ok) {
                const {data} = json
                setCourseTitle(data.course.title)
                setChapters(data.chapters)
            }
        }

        fetchCourseOutline(courseId).then()
    }, [authToken, courseId, user])

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <section className={styles.courseSection}>
                    <div className={styles.courseSectionTopBar}>
                        {user ?
                            <CourseProgress progressRate={progressRate}/> :
                            <p><Link href={"/auth/signup"}>Sign up</Link> to track your progress</p>
                        }
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
