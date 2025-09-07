import Link from "next/link";

import styles from "./courses-page.module.scss"

interface Course {
    courseId: number,
    title: string,
    description: string
}

export default async function CoursesPage() {

    const response = await fetch("http://localhost:8080/course/all", {
        cache: "force-cache",
        next: {revalidate: 30}
    })

    const {data} = await response.json()

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h2>Courses</h2>
                <ul className={styles.coursesList}>
                    {data.map((course: Course) => (
                        <li key={course.courseId}>
                            <Link href={`/course/${course.courseId}`}>
                                <div className={styles.courseDetailsDiv}>
                                    <h3>{course.title}</h3>
                                    <p> {course.description} </p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    )
}