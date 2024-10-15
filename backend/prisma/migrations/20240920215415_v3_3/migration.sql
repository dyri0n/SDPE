-- AlterTable
CREATE SEQUENCE cursacion_id_seq;
ALTER TABLE "Cursacion" ALTER COLUMN "numIntento" SET DEFAULT 1,
ALTER COLUMN "grupo" SET DEFAULT 'A',
ALTER COLUMN "id" SET DEFAULT nextval('cursacion_id_seq');
ALTER SEQUENCE cursacion_id_seq OWNED BY "Cursacion"."id";
