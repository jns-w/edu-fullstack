import {
    pgTable,
    serial,
    text,
    timestamp,
    jsonb,
    integer,
    varchar,
    customType,
    boolean,
    uniqueIndex
} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";

// Define custom tsvector type
const tsvector = customType<{ data: string }>({
    dataType() {
        return 'tsvector';
    },
});

export const users = pgTable("users", {
    userId: serial("user_id").primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
    categoryId: serial("category_id").primaryKey(),
    title: varchar("title", { length: 100 }).notNull(),
    description: text("description"),
});

export const courses = pgTable("courses", {
    courseId: serial("course_id").primaryKey(),
    categoryId: integer("category_id").references(() => categories.categoryId),
    title: varchar("title", { length: 100 }).notNull(),
    description: text("description"),
    content: text("content"),
});

export const chapters = pgTable("chapters", {
    chapterId: serial("chapter_id").primaryKey(),
    courseId: integer("course_id").references(() => courses.courseId),
    title: varchar("title", { length: 100 }).notNull(),
    orderIndex: integer("order_index").notNull(),
    searchVector: tsvector('search_vector').generatedAlwaysAs(
        () => sql`to_tsvector('english', "title")`
    ),
});

export const lessons = pgTable("lessons", {
    lessonId: serial("lesson_id").primaryKey(),
    chapterId: integer("chapter_id").references(() => chapters.chapterId),
    title: varchar("title", { length: 100 }).notNull(),
    orderIndex: integer("order_index").notNull(),
    content: text("content"),
    searchVector: tsvector('search_vector').generatedAlwaysAs(
        () => sql`to_tsvector('english', coalesce("title", '') || ' ' || coalesce("content", ''))`
    ), // FTS for title and content
});

export const topics = pgTable("topics", {
    topicId: serial("topic_id").primaryKey(),
    lessonId: integer("lesson_id").references(() => lessons.lessonId),
    title: varchar("title", { length: 100 }).notNull(),
    orderIndex: integer("order_index").notNull(),
    content: text("content"),
    searchVector: tsvector('search_vector').generatedAlwaysAs(
        () => sql`to_tsvector('english', coalesce("title", '') || ' ' || coalesce("content", ''))`
    ), // FTS for title and content
});

export const lessonProgress = pgTable('lesson_progress', {
    lessonProgressId: serial('lesson_progress_id').primaryKey(),
    userId: integer('user_id').references(() => users.userId).notNull(),
    lessonId: integer('lesson_id').references(() => lessons.lessonId).notNull(),
    completed: boolean('completed').notNull().default(false),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
    uniqueUserLesson: uniqueIndex('unique_user_lesson').on(table.userId, table.lessonId),
}));

// // Saved Resources table
// export const savedResources = pgTable('saved_resources', {
//     id: serial('id').primaryKey(),
//     userId: integer('user_id').references(() => users.id).notNull(),
//     title: text('title').notNull(),
//     url: text('url').notNull(),
//     resourceType: text('resource_type').notNull(),
//     source: text('source').notNull(),
//     savedAt: timestamp('saved_at').defaultNow().notNull(),
//     notes: text('notes'),
// });
//
// // Cache table
// export const cache = pgTable('cache', {
//     id: serial('id').primaryKey(),
//     query: text('query').notNull().unique(),
//     response: jsonb('response').notNull(),
//     createdAt: timestamp('created_at').defaultNow().notNull(),
//     expiresAt: timestamp('expires_at').notNull(),
// });