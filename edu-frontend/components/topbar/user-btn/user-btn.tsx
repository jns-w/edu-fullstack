"use client"

import {useAtom} from "jotai";
import Link from "next/link";

import {userAtom} from "@/states/user";

import styles from "./user-btn.module.scss"

export function UserBtn() {
    const [user] = useAtom(userAtom);
    
    if (!user) {
        return (
            <div className={styles.signInSignUpDiv}>
                <Link href={"/auth/signup"} className={styles.getStartedBtn}> Get Started</Link>
            </div>
        )
    }

    return (
        <div>
            {user?.name}
        </div>
    )
}