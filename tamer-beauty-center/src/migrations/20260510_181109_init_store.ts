import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_packages_media_type" AS ENUM('image', 'video', 'videoUrl');
  CREATE TYPE "public"."enum_products_variants_type" AS ENUM('size', 'type', 'color');
  CREATE TYPE "public"."enum_products_category" AS ENUM('face', 'body', 'feet', 'hair', 'perfume', 'accessories');
  CREATE TYPE "public"."enum_coupons_discount_type" AS ENUM('percentage', 'fixed');
  CREATE TYPE "public"."enum_orders_status" AS ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled');
  CREATE TYPE "public"."enum_orders_payment" AS ENUM('cod');
  CREATE TABLE "services_packages_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_services_packages_media_type" DEFAULT 'image',
  	"image_id" integer,
  	"video_id" integer,
  	"video_url" varchar
  );
  
  CREATE TABLE "services_packages_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "products_image_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "products_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_products_variants_type",
  	"additional_price" numeric DEFAULT 0
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"price" numeric NOT NULL,
  	"sale_price" numeric,
  	"stock" numeric DEFAULT 0 NOT NULL,
  	"category" "enum_products_category" NOT NULL,
  	"description" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "coupons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar NOT NULL,
  	"discount_type" "enum_coupons_discount_type" NOT NULL,
  	"value" numeric NOT NULL,
  	"expiry_date" timestamp(3) with time zone,
  	"max_uses" numeric,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "orders_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer NOT NULL,
  	"quantity" numeric DEFAULT 1 NOT NULL,
  	"price_at_purchase" numeric NOT NULL
  );
  
  CREATE TABLE "orders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order_number" varchar,
  	"status" "enum_orders_status" DEFAULT 'pending' NOT NULL,
  	"customer_info_name" varchar NOT NULL,
  	"customer_info_phone" varchar NOT NULL,
  	"customer_info_shipping_address" varchar NOT NULL,
  	"totals_subtotal" numeric NOT NULL,
  	"totals_discount" numeric DEFAULT 0,
  	"totals_total" numeric NOT NULL,
  	"gifting_is_gift" boolean DEFAULT false,
  	"gifting_recipient_name" varchar,
  	"gifting_gift_message" varchar,
  	"gifting_luxury_wrapping" boolean DEFAULT false,
  	"payment" "enum_orders_payment" DEFAULT 'cod' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "services_packages" ADD COLUMN "slug" varchar NOT NULL;
  ALTER TABLE "services_packages" ADD COLUMN "full_description" jsonb;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "coupons_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "orders_id" integer;
  ALTER TABLE "services_packages_media" ADD CONSTRAINT "services_packages_media_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_packages_media" ADD CONSTRAINT "services_packages_media_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_packages_media" ADD CONSTRAINT "services_packages_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_packages_faqs" ADD CONSTRAINT "services_packages_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_image_gallery" ADD CONSTRAINT "products_image_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_image_gallery" ADD CONSTRAINT "products_image_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_variants" ADD CONSTRAINT "products_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_packages_media_order_idx" ON "services_packages_media" USING btree ("_order");
  CREATE INDEX "services_packages_media_parent_id_idx" ON "services_packages_media" USING btree ("_parent_id");
  CREATE INDEX "services_packages_media_image_idx" ON "services_packages_media" USING btree ("image_id");
  CREATE INDEX "services_packages_media_video_idx" ON "services_packages_media" USING btree ("video_id");
  CREATE INDEX "services_packages_faqs_order_idx" ON "services_packages_faqs" USING btree ("_order");
  CREATE INDEX "services_packages_faqs_parent_id_idx" ON "services_packages_faqs" USING btree ("_parent_id");
  CREATE INDEX "products_image_gallery_order_idx" ON "products_image_gallery" USING btree ("_order");
  CREATE INDEX "products_image_gallery_parent_id_idx" ON "products_image_gallery" USING btree ("_parent_id");
  CREATE INDEX "products_image_gallery_image_idx" ON "products_image_gallery" USING btree ("image_id");
  CREATE INDEX "products_variants_order_idx" ON "products_variants" USING btree ("_order");
  CREATE INDEX "products_variants_parent_id_idx" ON "products_variants" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE UNIQUE INDEX "coupons_code_idx" ON "coupons" USING btree ("code");
  CREATE INDEX "coupons_updated_at_idx" ON "coupons" USING btree ("updated_at");
  CREATE INDEX "coupons_created_at_idx" ON "coupons" USING btree ("created_at");
  CREATE INDEX "orders_items_order_idx" ON "orders_items" USING btree ("_order");
  CREATE INDEX "orders_items_parent_id_idx" ON "orders_items" USING btree ("_parent_id");
  CREATE INDEX "orders_items_product_idx" ON "orders_items" USING btree ("product_id");
  CREATE INDEX "orders_updated_at_idx" ON "orders" USING btree ("updated_at");
  CREATE INDEX "orders_created_at_idx" ON "orders" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_coupons_fk" FOREIGN KEY ("coupons_id") REFERENCES "public"."coupons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_orders_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_coupons_id_idx" ON "payload_locked_documents_rels" USING btree ("coupons_id");
  CREATE INDEX "payload_locked_documents_rels_orders_id_idx" ON "payload_locked_documents_rels" USING btree ("orders_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_packages_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_packages_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_image_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "coupons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "orders_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "orders" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "services_packages_media" CASCADE;
  DROP TABLE "services_packages_faqs" CASCADE;
  DROP TABLE "products_image_gallery" CASCADE;
  DROP TABLE "products_variants" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "coupons" CASCADE;
  DROP TABLE "orders_items" CASCADE;
  DROP TABLE "orders" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_products_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_coupons_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_orders_fk";
  
  DROP INDEX "payload_locked_documents_rels_products_id_idx";
  DROP INDEX "payload_locked_documents_rels_coupons_id_idx";
  DROP INDEX "payload_locked_documents_rels_orders_id_idx";
  ALTER TABLE "services_packages" DROP COLUMN "slug";
  ALTER TABLE "services_packages" DROP COLUMN "full_description";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "products_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "coupons_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "orders_id";
  DROP TYPE "public"."enum_services_packages_media_type";
  DROP TYPE "public"."enum_products_variants_type";
  DROP TYPE "public"."enum_products_category";
  DROP TYPE "public"."enum_coupons_discount_type";
  DROP TYPE "public"."enum_orders_status";
  DROP TYPE "public"."enum_orders_payment";`)
}
