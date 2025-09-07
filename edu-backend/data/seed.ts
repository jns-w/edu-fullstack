import { db } from '../src/config/db';
import { courses, chapters, lessons, topics } from '../src/config/schema';
// @ts-ignore
import { mockData } from './mockData';

async function seedDatabase() {
    try {
        console.log('Starting database seeding...');

        // Insert courses
        for (const course of mockData.courses) {
            const [insertedCourse] = await db
                .insert(courses)
                .values({
                    title: course.title,
                    description: course.description || "",
                    content: course.content || "",
                })
                .returning({ courseId: courses.courseId });

            if (!course.chapters) continue;

            // Insert chapters
            for (const [index, chapter] of course.chapters.entries()) {
                const [insertedChapter] = await db
                    .insert(chapters)
                    .values({
                        courseId: insertedCourse.courseId,
                        title: chapter.title,
                        orderIndex: index + 1,
                    })
                    .returning({ chapterId: chapters.chapterId });

                if (!chapter.lessons) continue;

                // Insert lessons
                for (const [index, lesson] of chapter.lessons.entries()) {
                    const [insertedLesson] = await db
                        .insert(lessons)
                        .values({
                            chapterId: insertedChapter.chapterId,
                            title: lesson.title,
                            // @ts-ignore
                            content: lesson.content || "",
                            orderIndex: index + 1,
                        })
                        .returning({ lessonId: lessons.lessonId });

                    if (!lesson.topics) continue;

                    // Insert topics
                    for (const [index, topic] of lesson.topics.entries()) {
                        await db.insert(topics).values({
                            lessonId: insertedLesson.lessonId,
                            orderIndex: index + 1,
                            title: topic.title,
                            // @ts-ignore
                            content: topic.content || '',
                        });
                    }
                }
            }
        }

        console.log('Database seeding completed successfully');
    } catch (error) {
        console.error('Seeding failed:');
        throw error;
    }
}

// Run seeding
seedDatabase().then(() => {
    console.log('Seeding script finished');
    process.exit(0);
}).catch((error) => {
    console.error('Seeding script failed:', error);
    process.exit(1);
});