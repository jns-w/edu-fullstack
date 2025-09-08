"use client"
import {useEffect, useState} from "react";
import {useAtom} from "jotai";

import {authTokenAtom, userAtom} from "@/states/user";

interface CourseProgressProps {
    progressRate: number
}

export function CourseProgress(props: CourseProgressProps) {
    const [user] = useAtom(userAtom)

    return (
        <div>
            Course Progress: {props.progressRate}%
        </div>
    )
}