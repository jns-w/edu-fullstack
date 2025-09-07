import {Search} from "lucide-react";

import styles from "./course-search-bar.module.scss"

interface CourseSearchBarProps {
    courseId: number
}

export function CourseSearchBar(props: CourseSearchBarProps) {
    return (
        <div className={styles.courseSearchBarWrapper}>
            <div className={styles.courseSearchBarDiv}>
                <input placeholder="Search within course.." className={styles.courseSearchBarInput}/>
                <Search size={18} strokeWidth={3} className={styles.searchIcon} />
            </div>
        </div>
    )
}