ALTER TABLE "chapters" drop column "search_vector";--> statement-breakpoint
ALTER TABLE "chapters" ADD COLUMN "search_vector" "tsvector" GENERATED ALWAYS AS (to_tsvector('english', "chapters"."title")) STORED;--> statement-breakpoint
ALTER TABLE "lessons" drop column "search_vector";--> statement-breakpoint
ALTER TABLE "lessons" ADD COLUMN "search_vector" "tsvector" GENERATED ALWAYS AS (to_tsvector('english', coalesce("lessons"."title", '') || ' ' || coalesce("lessons"."content", ''))) STORED;--> statement-breakpoint
ALTER TABLE "topics" drop column "search_vector";--> statement-breakpoint
ALTER TABLE "topics" ADD COLUMN "search_vector" "tsvector" GENERATED ALWAYS AS (to_tsvector('english', coalesce("topics"."title", '') || ' ' || coalesce("topics"."content", ''))) STORED;