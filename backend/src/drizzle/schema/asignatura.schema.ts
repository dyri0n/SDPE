import {
  numeric,
  pgTable,
  serial,
  text,
  integer,
  primaryKey,
  foreignKey,
} from 'drizzle-orm/pg-core';
import { planDeEstudio } from './planEstudio.schema';

// se pueden dejar las tablas en archivos separados si se desea modularidad
// se crea un archivo schema.ts que exporta cada una de las definiciones de tablas individuales dentro de una carpeta /schema
// para las relaciones muchos a muchos se puede definir la bridge table dentro de la tabla que la utiliza
export const asignatura = pgTable('asignaturas', {
  id: serial('id').primaryKey(),
  codAsignatura: text('cod_asignatura'),
  name: text('name').notNull(),
  semestre: numeric('sem').notNull(),
  descripcion: text('desc'),
});

export const planContemplaAsignatura = pgTable(
  'plan_contempla_asignatura',
  {
    idAsignatura: integer('asignatura_id').references(() => asignatura.id),
    idPlan: integer('plan_id').references(() => planDeEstudio.id),
  },
  (table) => {
    return {
      pkPlanContemplaAsignatura: primaryKey({
        name: 'pk_plan_contempla_asignatura',
        columns: [table.idPlan, table.idAsignatura],
      }),
    };
  },
);

export const asignaturaTributa = pgTable(
  'asignatura_tributa',
  {
    idPlan: integer('plan_id'),
    idAsignaturaPrevia: integer('previa_id'),
    idAsignaturaTributada: integer('tributada_id'),
  },
  (table) => {
    return {
      pkAsignaturaTributa: primaryKey({
        name: 'pk_asignatura_tributa',
        columns: [
          table.idPlan,
          table.idAsignaturaPrevia,
          table.idAsignaturaTributada,
        ],
      }),
      asignaturaContempladaPrevia: foreignKey({
        columns: [table.idPlan, table.idAsignaturaPrevia],
        foreignColumns: [
          planContemplaAsignatura.idPlan,
          planContemplaAsignatura.idAsignatura,
        ],
        name: 'asignatura_contempleda_previa',
      }),
      asignaturaContempladaTributada: foreignKey({
        columns: [table.idPlan, table.idAsignaturaTributada],
        foreignColumns: [
          planContemplaAsignatura.idPlan,
          planContemplaAsignatura.idAsignatura,
        ],
        name: 'asignatura_contempleda_tributada',
      }),
    };
  },
);
