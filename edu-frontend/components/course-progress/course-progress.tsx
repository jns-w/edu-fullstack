"use client"
import styles from "./course-progress.module.scss";

interface CourseProgressProps {
    progressRate: number
}

export function CourseProgress(props: CourseProgressProps) {

    return (
        <div>
            Course Progress: {props.progressRate}%
            <div className={styles.progressTrack}>
                <div className={styles.progressBar}
                     style={{width: `${props.progressRate}%`}}
                />
            </div>
        </div>
    )
}