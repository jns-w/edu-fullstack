import {useOnClickOutside} from "usehooks-ts";
import {RefObject, useRef} from "react";
import Link from "next/link";
import clsx from "clsx";

import {type Chapter} from "@/types/content-types";

import styles from "./chapter-menu-dropdown.module.scss";

interface ChapterMenuProps {
    currentCourseId: number
    currentLessonId: number
    courseTitle: string
    chapters: Chapter[]
    showFn: (bool: boolean) => void
}

export function ChapterMenuDropdown(props: ChapterMenuProps) {
    const ref = useRef<HTMLMenuElement>(null)

    useOnClickOutside(ref as RefObject<HTMLUListElement>, () => {
        props.showFn(false)
    })

    return (
            <menu ref={ref} className={styles.chapterMenuDropdown}>
                {
                    props.chapters.map((chapter) => {
                        return (
                            <li className={styles.chapterItem} key={`${chapter.id}-${chapter.title}}`}>
                                <h4>{chapter.title}</h4>
                                <ul className={styles.lessonList}>
                                    {chapter.lessons.map((lesson) => {
                                        return (
                                            <li key={`${lesson.id}-${lesson.title}`} className={clsx(styles.lessonItem, lesson.id === props.currentLessonId && styles.activeLesson)}>
                                                <Link href={`/course/${props.currentCourseId}/lesson/${lesson.id}`}>{lesson.title}</Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                        )
                    })
                }
            </menu>
    )
}