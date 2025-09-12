"use client"
import {useAtom} from "jotai";
import Link from "next/link";

import {userAtom} from "@/states/user";

import styles from "./page.module.scss";

export default function Home() {
    const [user] = useAtom(userAtom)

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                {
                    user ? (
                        <div className={styles.welcomeDiv}>
                            <h1>Welcome back, {user.name}!</h1>
                            <Link href={"/courses"} className={styles.goToCoursesBtn}>Go to courses</Link>
                        </div>
                    ) : (
                        <div className={styles.welcomeDiv}>
                            <h1>Hi there, welcome to Edu-Fullstack.</h1>
                            <Link href={"/courses"} className={styles.goToCoursesBtn}>Go to courses</Link>
                            <p>Or <Link href={"/auth/signup"} className={styles.signUpLink}>sign up</Link> to track
                                progress and access advanced features.</p>
                        </div>
                    )
                }
            </main>
        </div>
    );
}