export interface Course {
    courseId: number
    title: string
    description: string
    content: string
}

export interface Chapter {
    id: number
    title: string
    orderIndex: number
    lessons: Lesson[]
}

export interface Lesson {
    id: number
    title: string
    orderIndex: number
    content: string
}

export interface Topic {
    id: number
    title: string
    content: string
}