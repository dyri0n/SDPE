import {
  pgTable,
  serial,
  text,
  integer,
  foreignKey, primaryKey,
} from 'drizzle-orm/pg-core';
import {planContemplaAsignatura} from './asignatura.schema';


export const curso = pgTable(
  'curso',
  {
    id: serial('id'),
    idAsignatura: integer('asignatura_id').references(()=>planContemplaAsignatura.idAsignatura),
    idPlan: integer('plan_id').references(()=>planContemplaAsignatura.idPlan),
    nombre: text('nombre').notNull(),
    linkSyllabus: text('syllabus'),
  },
  (table) => ({
    cpk: primaryKey({ name: 'pk_curso', columns: [table.id] }),
  })
);
