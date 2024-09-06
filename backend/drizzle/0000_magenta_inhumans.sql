CREATE TABLE IF NOT EXISTS "asignatura" (
	"id" serial NOT NULL,
	"nombre" text,
	"descripcion" text,
	CONSTRAINT "pk_asignatura" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "asignatura_tributa" (
	"plan_id" integer,
	"previa_id" integer,
	"tributada_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plan_contempla_asignatura" (
	"asignatura_id" integer,
	"plan_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "curso" (
	"id" serial NOT NULL,
	"asignatura_id" integer,
	"plan_id" integer,
	"nombre" text NOT NULL,
	"syllabus" text,
	CONSTRAINT "pk_curso" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plan_de_estudio" (
	"id" serial NOT NULL,
	"titulo" text,
	"anio" numeric,
	"fecha_instauracion" date,
	CONSTRAINT "pk_plan" PRIMARY KEY("id"),
	CONSTRAINT "plan_de_estudio_titulo_unique" UNIQUE("titulo")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asignatura_tributa" ADD CONSTRAINT "asignatura_tributa_plan_id_plan_de_estudio_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plan_de_estudio"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asignatura_tributa" ADD CONSTRAINT "asignatura_tributa_previa_id_asignatura_id_fk" FOREIGN KEY ("previa_id") REFERENCES "public"."asignatura"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asignatura_tributa" ADD CONSTRAINT "asignatura_tributa_tributada_id_asignatura_id_fk" FOREIGN KEY ("tributada_id") REFERENCES "public"."asignatura"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plan_contempla_asignatura" ADD CONSTRAINT "plan_contempla_asignatura_asignatura_id_asignatura_id_fk" FOREIGN KEY ("asignatura_id") REFERENCES "public"."asignatura"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plan_contempla_asignatura" ADD CONSTRAINT "plan_contempla_asignatura_plan_id_plan_de_estudio_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plan_de_estudio"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "curso" ADD CONSTRAINT "curso_asignatura_id_plan_contempla_asignatura_asignatura_id_fk" FOREIGN KEY ("asignatura_id") REFERENCES "public"."plan_contempla_asignatura"("asignatura_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "curso" ADD CONSTRAINT "curso_plan_id_plan_contempla_asignatura_plan_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plan_contempla_asignatura"("plan_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
