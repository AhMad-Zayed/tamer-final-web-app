import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "shipping_zones" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"delivery_price" numeric NOT NULL,
  	"estimated_delivery_time" varchar,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "orders" ADD COLUMN "customer_info_shipping_zone_id" integer NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "totals_shipping_cost" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "shipping_zones_id" integer;
  CREATE UNIQUE INDEX "shipping_zones_name_idx" ON "shipping_zones" USING btree ("name");
  CREATE INDEX "shipping_zones_updated_at_idx" ON "shipping_zones" USING btree ("updated_at");
  CREATE INDEX "shipping_zones_created_at_idx" ON "shipping_zones" USING btree ("created_at");
  ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_info_shipping_zone_id_shipping_zones_id_fk" FOREIGN KEY ("customer_info_shipping_zone_id") REFERENCES "public"."shipping_zones"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_shipping_zones_fk" FOREIGN KEY ("shipping_zones_id") REFERENCES "public"."shipping_zones"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "orders_customer_info_customer_info_shipping_zone_idx" ON "orders" USING btree ("customer_info_shipping_zone_id");
  CREATE INDEX "payload_locked_documents_rels_shipping_zones_id_idx" ON "payload_locked_documents_rels" USING btree ("shipping_zones_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "shipping_zones" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "shipping_zones" CASCADE;
  ALTER TABLE "orders" DROP CONSTRAINT "orders_customer_info_shipping_zone_id_shipping_zones_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_shipping_zones_fk";
  
  DROP INDEX "orders_customer_info_customer_info_shipping_zone_idx";
  DROP INDEX "payload_locked_documents_rels_shipping_zones_id_idx";
  ALTER TABLE "orders" DROP COLUMN "customer_info_shipping_zone_id";
  ALTER TABLE "orders" DROP COLUMN "totals_shipping_cost";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "shipping_zones_id";`)
}
