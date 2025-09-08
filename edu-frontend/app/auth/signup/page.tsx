"use client"
import { useRouter } from "next/navigation"
import {FormEvent, useState} from "react"
import {useAtom} from "jotai/index";
import Link from "next/link";

import {authTokenAtom, userAtom} from "@/states/user";

import styles from "./sign-up-page.module.scss"

export default function SignUpPage() {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [user, setUser] = useAtom(userAtom)
    const [sessionToken, setSessionToken] = useAtom(authTokenAtom)

    const router = useRouter()

    async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault()
        const body = {
            email: email,
            name: username,
            password: password,
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/auth/signup`, {
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        })
        const json = await response.json()
        if (json.ok) {
            const { data } = json

            setSessionToken(data.accessToken)
            setUser({
                    email: data.user.email,
                    name: data.user.name,
                    updatedAt: data.user.updated_at,
                    userId: data.user.userId,
                },
            )
            router.push("/courses")
        }
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.formDiv}>
                <h2>Get started with us</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input type="email" value={email}
                           placeholder="johndoe@gmail.com"
                           onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <label>Display name</label>
                    <input type="text" value={username}
                           placeholder="johndoe"
                           onChange={(ev) => setUsername(ev.target.value)}
                    />
                    <label>Password</label>
                    <input type="password" value={password} placeholder="********"
                           onChange={(ev) => setPassword(ev.target.value)}/>
                    <button type="submit">Sign up</button>
                </form>
                <p>Already a user? <Link href="/auth/signin" className={styles.signInLink}>Sign in</Link></p>
            </div>
        </div>
    )
}