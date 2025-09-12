import Link from "next/link";

import styles from "./page.module.scss";

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.welcomeDiv}>
                    <h1>Hi there, welcome to Edu-Fullstack.</h1>
                    <Link href={"/courses"} className={styles.goToCoursesBtn}>Go to courses</Link>
                    <p>Or <Link href={"/auth/signup"} className={styles.signUpLink}>sign up</Link> to track progress and access advanced features.</p>
                </div>
            </main>
        </div>
    );
}