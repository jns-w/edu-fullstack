import { Router } from "express";
import {db} from "../../config/db";
import {lessons, topics} from "../../config/schema";
import {eq} from "drizzle-orm";

const router = Router();

router.get("/:lessonId/content", async (req, res) => {
    const lessonId = parseInt(req.params.lessonId);
    if (isNaN(lessonId)) {
        return res.status(400).json({ok: false, error: "Invalid lesson ID"})
    }

    try {
        const lessonData = await db
            .select({
                lessonId: lessons.lessonId,
                lessonTitle: lessons.title,
                lessonContent: lessons.content,
                topicId: topics.topicId,
                topicTitle: topics.title,
                topicContent: topics.content,
            })
            .from(lessons)
            .leftJoin(topics, eq(topics.lessonId, lessons.lessonId))
            .where(eq(lessons.lessonId, lessonId))
            .orderBy(topics.orderIndex); // Order topics by createdAt

        if (!lessonData.length) {
            return res.status(404).json({ ok: false, error: 'Lesson not found' });
        }

        // Structure the response
        const lesson = {
            lessonId: lessonData[0].lessonId,
            title: lessonData[0].lessonTitle,
            content: lessonData[0].lessonContent,
            topics: lessonData
                .filter(row => row.topicId) // Only include rows with topics
                .map(row => ({
                    id: row.topicId,
                    title: row.topicTitle,
                    content: row.topicContent,
                })),
        };

        res.status(200).json({ok: true, data: lesson})
    } catch (error) {
        res.status(500).json({error: "Request failed"})
    }
})

export default router;