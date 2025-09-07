CREATE TABLE "categories" (
	"category_id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "chapters" (
	"chapter_id" serial PRIMARY KEY NOT NULL,
	"course_id" integer,
	"title" varchar(100) NOT NULL,
	"order_number" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"course_id" serial PRIMARY KEY NOT NULL,
	"category_id" integer,
	"name" varchar(100) NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "lessons" (
	"lesson_id" serial PRIMARY KEY NOT NULL,
	"chapter_id" integer,
	"title" varchar(100) NOT NULL,
	"order_number" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "topics" (
	"topic_id" serial PRIMARY KEY NOT NULL,
	"lesson_id" integer,
	"title" varchar(100) NOT NULL,
	"order_number" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_course_id_courses_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("course_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_category_id_categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("category_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_chapter_id_chapters_chapter_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."chapters"("chapter_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "topics" ADD CONSTRAINT "topics_lesson_id_lessons_lesson_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("lesson_id") ON DELETE no action ON UPDATE no action;