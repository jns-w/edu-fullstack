import {Search} from "lucide-react";
import {useState} from "react";

import styles from "./course-search-bar.module.scss"

interface CourseSearchBarProps {
    courseId: number
}

// interface SearchData {
//     matchingChapters
// }

export function CourseSearchBar(props: CourseSearchBarProps) {
    const [input, setInput] = useState("")
    const [searchData, setSearchData] = useState([])


    async function fetchSearchData(query: string) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/course/${props.courseId}/search?q=${query}`)
        const json = await response.json()

        if (json.ok) {
            const { data } = json
            setSearchData(data)
        }
    }

    return (
        <div className={styles.courseSearchBarWrapper}>
            <div className={styles.courseSearchBarDiv}>
                <input placeholder="Search within course.." className={styles.courseSearchBarInput}/>
                <Search size={18} strokeWidth={3} className={styles.searchIcon} onClick={() => fetchSearchData("algorithm")}/>
            </div>
        </div>
    )
}