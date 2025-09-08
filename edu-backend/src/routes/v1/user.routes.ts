import {Router} from "express";
import {authMiddleware, AuthRequest} from "../../middleware/auth";
import {db} from "../../config/db";
import {chapters, courses, lessonProgress, lessons} from "../../config/schema";
import {and, eq, sql} from "drizzle-orm";

const router = Router();

// NOTE: auth middleware applies to all routes in this file, auth token is verified and user data is embedded in req
router.use(authMiddleware);

router.get("/details", async (req: AuthRequest, res) => {
    console.log("User", req.user)
    res.send("User details")
})

router.get("/course-progress/:courseId", async (req: AuthRequest, res) => {
    const courseId = parseInt(req.params.courseId);
    console.log("Course", courseId)
    console.log("user", req.user)
})

// Toggle lesson completion
router.post("/lesson/:lessonId/complete", async (req: AuthRequest, res) => {
    const lessonId = parseInt(req.params.lessonId);
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(400).json({ok: false, error: "Request failed"})
    }

    if (isNaN(lessonId)) {
        return res.status(400).json({ ok: false, error: "Invalid lesson ID" });
    }

    try {
        // Check if lesson exists
        const lesson = await db
            .select({ id: lessons.lessonId })
            .from(lessons)
            .where(eq(lessons.lessonId, lessonId))
            .limit(1);

        if (!lesson.length) {
            return res.status(404).json({ ok: false, error: "Lesson not found" });
        }

        // Check existing completion status
        const existingProgress = await db
            .select({ completed: lessonProgress.completed })
            .from(lessonProgress)
            .where(
                and(
                    eq(lessonProgress.userId, userId),
                    eq(lessonProgress.lessonId, lessonId)
                )
            )
            .limit(1);

        const newCompletedStatus = !existingProgress[0]?.completed;

        // Upsert completion status
        await db
            .insert(lessonProgress)
            .values({
                userId,
                lessonId,
                completed: newCompletedStatus,
                updatedAt: new Date(),
            })
            .onConflictDoUpdate({
                target: [lessonProgress.userId, lessonProgress.lessonId],
                set: { completed: newCompletedStatus, updatedAt: new Date() },
            });

        res.status(200).json({ ok: true, completed: newCompletedStatus });
    } catch (error) {
        res.status(500).json({ ok: false, error: "Request failed" });
    }
});

// Get course progress
router.get('/course/:courseId/progress', async (req: AuthRequest, res) => {
    const courseId = parseInt(req.params.courseId);
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(400).json({ok: false, error: "Request failed"})
    }

    if (isNaN(courseId)) {
        return res.status(400).json({ ok: false, error: 'Invalid course ID' });
    }

    try {
        // Check if course exists
        const course = await db
            .select({ id: courses.courseId })
            .from(courses)
            .where(eq(courses.courseId, courseId))
            .limit(1);

        if (!course.length) {
            return res.status(404).json({ ok: false, error: 'Course not found' });
        }

        // Get total lessons in the course
        const totalLessons = await db
            .select({ count: sql<number>`count(*)::integer` })
            .from(lessons)
            .innerJoin(chapters, eq(lessons.chapterId, chapters.chapterId))
            .where(eq(chapters.courseId, courseId));

        const totalLessonsCount = totalLessons[0].count;

        // Get completed lessons
        const completedLessons = await db
            .select({ lessonId: lessonProgress.lessonId })
            .from(lessonProgress)
            .innerJoin(lessons, eq(lessonProgress.lessonId, lessons.lessonId))
            .innerJoin(chapters, eq(lessons.chapterId, chapters.chapterId))
            .where(
                and(
                    eq(lessonProgress.userId, userId),
                    eq(chapters.courseId, courseId),
                    eq(lessonProgress.completed, true)
                )
            );

        const completedLessonIds = completedLessons.map(row => row.lessonId);
        const completionRate = totalLessonsCount
            ? Math.round((completedLessonIds.length / totalLessonsCount) * 100)
            : 0;

        res.status(200).json({
            ok: true,
            data: {
                completionRate,
                completedLessons: completedLessonIds,
                totalLessons: totalLessonsCount,
            }
        });
    } catch (error) {
        res.status(500).json({ ok: false, error: "Failed to retrieve course progress" });
    }
});


export default router;