"use client"
import {useAtom} from "jotai";

import {authTokenAtom, userAtom} from "@/states/user";

import styles from "./course-progress.module.scss";

interface CourseProgressProps {
    progressRate: number
}

export function CourseProgress(props: CourseProgressProps) {
    const [user] = useAtom(userAtom)

    return (
        <div>
            Course Progress: {props.progressRate}%
            <div className={styles.progressTrack}>
                <div className={styles.progressBar} style={{width: `${props.progressRate}%`}}/>
            </div>
        </div>
    )
}