"use client"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { useAtom } from "jotai"
import Link from "next/link";

import styles from "@/app/auth/signup/sign-up-page.module.scss";
import { sessionTokenAtom, userAtom } from "@/states/user"

import style from "./sign-in-page.module.scss"

const SERVER_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_ENDPOINT

export default function SignInPage() {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [user, setUser] = useAtom(userAtom)
  const [sessionToken, setSessionToken] = useAtom(sessionTokenAtom)

  const router = useRouter()

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const body = {
      email: email,
      password: password,
    }
    const res = await fetch(`${SERVER_ENDPOINT}/auth/signin`, {
      body: JSON.stringify(body),
      headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    })
    const json = await res.json()
    // console.log(json)
    // Save the token in local storage
    if (json.ok) {
      const { data } = json
      console.log(data)
      setSessionToken(data.accessToken)
      setUser({
          email: data.user.email,
          name: data.user.name,
          updatedAt: data.user.updated_at,
          userId: data.user.userId,
        },
      )
      router.push("/")
    }
  }

  return (
    <div className={style.pageWrapper}>
      <div className={style.formDiv}>
        <h2>Welcome back</h2>
        <form className={style.form} onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" value={email}
                 placeholder="johndoe@gmail.com"
                 onChange={(ev) => setEmail(ev.target.value)}
          />
          <label>Password</label>
          <input type="password" value={password} placeholder="********"
                 onChange={(ev) => setPassword(ev.target.value)} />
          <button
            type="submit"
          >Sign in
          </button>
        </form>
          <p>No account yet? <Link href="/auth/signup" className={styles.signInLink}>Sign up</Link></p>
      </div>
    </div>
  )
}