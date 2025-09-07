import { Router } from "express";
import { db } from "../config/db";
import { searchCourseById } from "../services/search.services";
import { chapters, courses, lessons } from "../config/schema";
import { asc, eq } from "drizzle-orm";

const router = Router();

router.get("/all", async (req, res) => {
    try {
        const result = await db.query.courses.findMany({
            orderBy: [asc(courses.courseId)]
        })
        res.status(200).json({ok: true, data: result})
    } catch (error) {
        res.status(500).json({error: "Request failed"})
    }
})

router.get("/:courseId/outline", async (req, res) => {
    const courseId = parseInt(req.params.courseId);
    if (isNaN(courseId)) {
        return res.status(400).json({ok: false, error: "Invalid Course ID"})
    }

    try {
        const course = await db
            .select({
                id: courses.courseId,
                title: courses.title,
                description: courses.description,
            })
            .from(courses)
            .where(eq(courses.courseId, courseId))
            .limit(1);

        if (!course.length) {
            return res.status(404).json({ok: false, error: "Course not found"});
        }

        const chaptersData = await db
            .select({
                chapterId: chapters.chapterId,
                chapterTitle: chapters.title,
                chapterOrderIndex: chapters.orderIndex,
                lessonId: lessons.lessonId,
                lessonTitle: lessons.title,
                lessonOrderIndex: lessons.orderIndex,
            })
            .from(chapters)
            .leftJoin(lessons, eq(lessons.chapterId, chapters.chapterId))
            .where(eq(chapters.courseId, courseId))
            .orderBy(chapters.orderIndex, lessons.orderIndex);

        const chaptersMap = new Map<number, {
            id: number;
            title: string;
            orderIndex: number;
            lessons: { id: number; title: string; orderIndex: number }[]
        }>();
        for (const row of chaptersData) {
            if (!chaptersMap.has(row.chapterId)) {
                chaptersMap.set(row.chapterId, {
                    id: row.chapterId,
                    title: row.chapterTitle,
                    orderIndex: row.chapterOrderIndex,
                    lessons: [],
                });
            }
            if (row.lessonId) {
                chaptersMap.get(row.chapterId)!.lessons.push({
                    id: row.lessonId,
                    title: row.lessonTitle || "",
                    orderIndex: row.lessonOrderIndex || 0,
                });
            }
        }

        const queryResult = {
            course: course[0],
            chapters: Array.from(chaptersMap.values()),
        }

        res.status(200).json({ok: true, data: queryResult})
    } catch (error) {
        res.status(500).json({error: "Request failed"})
    }
})

router.get("/:courseId/content", async (req, res) => {
    const courseId = parseInt(req.params.courseId);

    if (isNaN(courseId)) {
        return res.status(400).json({ok: false, error: "Invalid Course ID"})
    }

    try {
        const courseContent = await db
            .select({
                courseId: courses.courseId,
                title: courses.title,
                content: courses.content,
            })
            .from(courses)
            .where(eq(courses.courseId, courseId))
            .limit(1);

        if (!courseContent.length) {
            return res.status(404).json({ok: false, error: "Failed to get content"})
        }

        res.status(200).json({ok: true, data: courseContent[0]})
    } catch (error) {
        res.status(500).json({error: "Request failed"})
    }
})

router.get("/:courseId/search", async (req, res) => {
    const courseId = parseInt(req.params.courseId);
    if (isNaN(courseId)) {
        return res.status(400).json({ok: false, error: "Invalid Course ID"})
    }
    const query = req.query.q as string;
    if (!query) {
        return res.status(400).json({ok: false, error: "No query provided"})
    }
    try {
        const searchResult = await searchCourseById(courseId, query)
        res.status(200).json({ok: true, data: searchResult})
    } catch (error) {
        res.status(500).json({error: "Request failed"})
    }
})

export default router;