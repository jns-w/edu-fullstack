import { db } from "../config/db";
import { chapters, lessons, topics } from "../config/schema";
import { eq, sql } from "drizzle-orm";

// Search function for a single course by ID
export async function searchCourseById(courseId: number, searchQuery: string) {
    try {
        // Validate inputs
        if (!searchQuery || typeof searchQuery !== "string") {
            throw new Error('Search query is required and must be a string');
        }
        if (!Number.isInteger(courseId)) {
            throw new Error('Course ID must be an integer');
        }

        // Format query for tsvector (e.g., "bubble sort" -> "bubble & sort")
        // const formattedQuery = searchQuery.trim().replace(/\s+/g, " & ");
        // const tsQuery = sql`to_tsquery('english', ${formattedQuery})`;
        const tsQuery = sql`plainto_tsquery('english', ${searchQuery.trim()})`

        // Search chapters
        const matchingChapters = await db
            .select({
                type: sql`'chapter' as type`,
                id: chapters.chapterId,
                title: chapters.title,
                orderIndex: chapters.orderIndex,
                match: sql`ts_headline('english', chapters.title, ${tsQuery}, 'StartSel=<b>, StopSel=</b>') as match`,
            })
            .from(chapters)
            .where(sql`chapters.course_id = ${courseId} AND chapters.search_vector @@ ${tsQuery}`);

        // Search lessons
        const matchingLessons = await db
            .select({
                type: sql`'lesson' as type`,
                id: lessons.lessonId,
                title: lessons.title,
                content: lessons.content,
                orderIndex: lessons.orderIndex,
                chapterId: lessons.chapterId,
                match: sql`ts_headline('english', coalesce(lessons.title, '') || ' ' || coalesce(lessons.content, ''), ${tsQuery}, 'StartSel=<b>, StopSel=</b>') as match`,
            })
            .from(lessons)
            .innerJoin(chapters, eq(lessons.chapterId, chapters.chapterId))
            .where(sql`chapters.course_id = ${courseId} AND lessons.search_vector @@ ${tsQuery}`);

        // Search topics
        const matchingTopics = await db
            .select({
                type: sql`'topic' as type`,
                id: topics.topicId,
                title: topics.title,
                content: topics.content,
                lessonId: topics.lessonId,
                match: sql`ts_headline('english', coalesce(topics.title, '') || ' ' || coalesce(topics.content, ''), ${tsQuery}, 'StartSel=<b>, StopSel=</b>') as match`,
            })
            .from(topics)
            .innerJoin(lessons, eq(topics.lessonId, lessons.lessonId))
            .innerJoin(chapters, eq(lessons.chapterId, chapters.chapterId))
            .where(sql`chapters.course_id = ${courseId} AND topics.search_vector @@ ${tsQuery}`);

        return {
            matchingChapters,
            matchingLessons,
            matchingTopics,
        };
    } catch (error) {
        console.error("Search error:", error);
        throw new Error(`Failed to search course ${courseId}: ${error}`);
    }
}