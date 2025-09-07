import Link from "next/link";
import clsx from "clsx";

import {type Chapter} from "@/types/content-types";

import styles from "./chapter-menu.module.scss";

interface ChapterMenuProps {
    currentCourseId: number
    currentLessonId: number
    courseTitle: string
    chapters: Chapter[]
}

export function ChapterMenu(props: ChapterMenuProps) {

    return (
        <div className={styles.chapterMenuWrapper}>
            <h3><Link href={`/course/${props.currentCourseId}`}>{props.courseTitle}</Link></h3>
            <menu className={styles.chapterMenu}>
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
        </div>
    )
}