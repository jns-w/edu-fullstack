import dynamic from "next/dynamic"
import Link from "next/link";

import {UserBtn} from "@/components/topbar/user-btn/user-btn";

import styles from "./topbar.module.scss"

const ThemeToggleButton = dynamic(() => import("./theme-toggle/theme-toggle-button").then(mod => mod.ThemeToggleButton))

export function Topbar() {
    return <div className={styles.topBarWrapper}>
        <div className={styles.topBarDiv}>
            <Link href="/" className={styles.homeBtn}>Edu-Fullstack</Link>
            <div className={styles.topBarRightDiv}>
                <UserBtn/>
                <ThemeToggleButton/>
            </div>
        </div>
    </div>
}