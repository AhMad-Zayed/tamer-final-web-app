import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "product_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "products" ADD COLUMN "category_id" integer NOT NULL;
  ALTER TABLE "coupons" ADD COLUMN "usage_count" numeric DEFAULT 0;
  ALTER TABLE "orders" ADD COLUMN "coupon_applied" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "product_categories_id" integer;
  CREATE UNIQUE INDEX "product_categories_slug_idx" ON "product_categories" USING btree ("slug");
  CREATE INDEX "product_categories_updated_at_idx" ON "product_categories" USING btree ("updated_at");
  CREATE INDEX "product_categories_created_at_idx" ON "product_categories" USING btree ("created_at");
  ALTER TABLE "products" ADD CONSTRAINT "products_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_category_idx" ON "products" USING btree ("category_id");
  CREATE INDEX "payload_locked_documents_rels_product_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("product_categories_id");
  ALTER TABLE "products" DROP COLUMN "category";
  DROP TYPE "public"."enum_products_category";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_category" AS ENUM('face', 'body', 'feet', 'hair', 'perfume', 'accessories');
  ALTER TABLE "product_categories" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "product_categories" CASCADE;
  ALTER TABLE "products" DROP CONSTRAINT "products_category_id_product_categories_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_product_categories_fk";
  
  DROP INDEX "products_category_idx";
  DROP INDEX "payload_locked_documents_rels_product_categories_id_idx";
  ALTER TABLE "products" ADD COLUMN "category" "enum_products_category" NOT NULL;
  ALTER TABLE "products" DROP COLUMN "category_id";
  ALTER TABLE "coupons" DROP COLUMN "usage_count";
  ALTER TABLE "orders" DROP COLUMN "coupon_applied";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "product_categories_id";`)
}
