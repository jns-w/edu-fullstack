"use client"
import {useEffect} from "react";
import {useAtom} from "jotai";

import {authTokenAtom, userAtom} from "@/states/user";

export function CourseProgress() {
    const [user] = useAtom(userAtom)
    const [authToken] = useAtom(authTokenAtom)

    useEffect(() => {
        async function fetchCourseProgress(courseId: number) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/course-progress/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "applications/json"
                },
                method: "GET"
            })
            const json = await response.json()

            if (json.ok) {

            }
        }
    }, []);

    return (
        <div>
            Course Progress
        </div>
    )
}