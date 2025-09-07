import Link from "next/link";

import styles from "./chapter-menu.module.scss";

interface ChapterMenuProps {
    courseId: number
}

export function ChapterMenu(props: ChapterMenuProps) {

    return (
        <div className={styles.chapterMenuWrapper}>
            <menu className={styles.chapterMenu}>
                <li>
                    <h4>Chapter name</h4>
                    <ul>
                        <li><Link href={`/course/${props.courseId}/lesson/1`}>Lesson 1</Link></li>
                        <li><Link href={`/course/${props.courseId}/lesson/2`}>Lesson 2</Link></li>
                    </ul>
                </li>
                <li>
                    <h4>Chapter name</h4>
                    <ul>
                        <li>Lesson 1</li>
                        <li>Lesson 2</li>
                    </ul>
                </li>
            </menu>
        </div>
    )
}