ALTER TABLE "chapters" RENAME COLUMN "order_number" TO "order_index";--> statement-breakpoint
ALTER TABLE "lessons" RENAME COLUMN "order_number" TO "order_index";--> statement-breakpoint
ALTER TABLE "topics" RENAME COLUMN "order_number" TO "order_index";--> statement-breakpoint
ALTER TABLE "lessons" ALTER COLUMN "content" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "topics" ADD COLUMN "content" text;