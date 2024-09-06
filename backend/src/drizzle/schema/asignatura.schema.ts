
import { planDeEstudio } from './planEstudio.schema';
import { pgTable, serial, integer, primaryKey, text } from 'drizzle-orm/pg-core';

// se pueden dejar las tablas en archivos separados si se desea modularidad
// se crea un archivo schema.ts que exporta cada una de las definiciones de tablas individuales dentro de una carpeta /schema
// para las relaciones muchos a muchos se puede definir la bridge table dentro de la tabla que la utiliza
export const asignatura = pgTable('asignatura',
  {
    id : serial('id'),
    nombre: text('nombre'),
    descripcion: text('descripcion')
  },(table) => ({
    cpk: primaryKey({ name: 'pk_asignatura', columns: [table.id] }),
  })
);

export const planContemplaAsignatura = pgTable(
  'plan_contempla_asignatura',
  {
    idAsignatura: integer('asignatura_id').references(()=>asignatura.id),
    idPlan: integer('plan_id').references(()=>planDeEstudio.id)
  },
);

export const asignaturaTributa = pgTable(
  'asignatura_tributa',
  {
    idPlan: integer('plan_id').references(() => planDeEstudio.id),
    idAsignaturaPrevia: integer('previa_id').references(() => asignatura.id),
    idAsignaturaTributada: integer('tributada_id').references( () => asignatura.id),
  },
);
