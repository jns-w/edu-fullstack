"use client"
import {useCallback, useEffect} from "react"
import {Moon, Sun} from "lucide-react";
import Cookies from "js-cookie"
import {useAtom} from "jotai"

import {themeUserPreferenceAtom} from "@/states/ui"

import style from "./theme-toggle-button.module.scss"

/**
 * Theme Toggle Button
 * Note: when switching theme, we add a class to the body temporarily to hide css transitions
 */

export function ThemeToggleButton() {
    const [themeUserPreference, setThemeUserPreference] = useAtom(themeUserPreferenceAtom)

    const toggleTheme = useCallback(() => {
        // if (!themeUserPreference) {
        // const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        // setThemeUserPreference(systemTheme)
        // }
        const newTheme = themeUserPreference === "light" || !themeUserPreference ? "dark" : "light"
        Cookies.set("edu.c.theme", newTheme)
        setThemeUserPreference(newTheme)
    }, [themeUserPreference, setThemeUserPreference])

    function setThemeAttribute(theme: string) {
        document.body.classList.add("noTransitions")
        document.documentElement.setAttribute("data-theme", theme)
        setTimeout(() => {
            document.body.classList.remove("noTransitions")
        }, 100)
    }

    useEffect(() => {
        // NOTE: for using system theme to guide initial theme preference
        // if (!themeUserPreference) {
        //   const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        //   setThemeAttribute(systemTheme)
        //   return;
        // }
        if (!themeUserPreference) {
            setThemeAttribute("light")
            return;
        }
        setThemeAttribute(themeUserPreference)
    }, [setThemeUserPreference, themeUserPreference])

    return <button
        onClick={toggleTheme}
        className={style.themeToggleBtn}
    >
        {
            themeUserPreference === "light" || !themeUserPreference ?
                <Moon size={18}/> : <Sun size={18}/>
        }
    </button>
}

// export function ThemeToggleButtonSkeleton() {
//   return <SkeletonBlock className="min-h-[20px] min-w-[20px] !rounded-full" />
// }