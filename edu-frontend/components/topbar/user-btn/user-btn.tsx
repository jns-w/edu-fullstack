"use client"
import {FloatingPortal, offset, shift, useFloating} from "@floating-ui/react";
import {RESET} from "jotai/vanilla/utils";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {User} from "lucide-react";
import {useAtom} from "jotai";
import Link from "next/link";

import {DropdownMenu, MenuItem} from "@/components/dropdown-menu/dropdown-menu";
import {authTokenAtom, userAtom} from "@/states/user";

import styles from "./user-btn.module.scss"

export function UserBtn() {
    const [user, setUser] = useAtom(userAtom);
    const [authToken, setAuthToken] = useAtom(authTokenAtom)
    const [showDropdown, setShowDropdown] = useState(false)
    
    const router = useRouter()

    function signOutUser() {
        setShowDropdown(false)
        setUser(RESET)
        setAuthToken(RESET)
        router.push("/")
    }

    const {floatingStyles, refs} = useFloating({
        middleware: [offset(3), shift()],
        onOpenChange: setShowDropdown,
        open: showDropdown,
        placement: "bottom",
    })

    const dropdownItems: MenuItem[] = [
        {
            fn: signOutUser,
            label: "Sign out",
        },
    ]

    useEffect(() => {
     async function verifyAuthToken(token: null | string) {
         if (!token) return;
         const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/auth/verifyToken`, {
             body: JSON.stringify({
                 token
             }),
             headers: {
                 "Content-Type": "application/json",
             },
             method: "POST"
         })
         const json = await response.json()
         if (!json.ok) {
             // sign user out and remove token
             setAuthToken(RESET)
             setUser(RESET)
             router.push("/auth/signin")
         }
     }

     verifyAuthToken(authToken).then()
    }, [authToken, router, setAuthToken, setUser])

    if (!user) {
        return (
            <div className={styles.signInSignUpDiv}>
                <Link href={"/auth/signup"} className={styles.getStartedLink}>Get Started</Link>
                <p>&nbsp;or&nbsp;</p>
                <Link href={"/auth/signin"} className={styles.signInLink}>Sign In</Link>
            </div>
        )
    }

    return (
        <>
            <button
                ref={refs.setReference}
                className={styles.userBtn}
                onClick={() => setShowDropdown(true)}>
                <User size={15} strokeWidth={2}/>
                <p>{user.name}</p>
            </button>
            {showDropdown && (
                <FloatingPortal>
                    <div ref={refs.setFloating} style={floatingStyles}>
                        <DropdownMenu items={dropdownItems} showFn={setShowDropdown}/>
                    </div>
                </FloatingPortal>
            )}
        </>
    )
}