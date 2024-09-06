import {
  pgTable,
  serial,
  text,
  integer,
  primaryKey,
  foreignKey,
} from 'drizzle-orm/pg-core';
import { planContemplaAsignatura } from './asignatura.schema';

export const curso = pgTable(
  'curso',
  {
    id: serial('id'),
    idAsignatura: integer('asignatura_id'),
    idPlan: integer('plan_id'),
    nombre: text('nombre').notNull(),
    linkSyllabus: text('syllabus'),
  },
  (table) => {
    return {
      pkCurso: primaryKey({
        name: 'pk_curso',
        columns: [table.id, table.idPlan, table.idAsignatura],
      }),
      asignaturaContemplada: foreignKey({
        name: 'plan_contempla_asignatura',
        columns: [table.idPlan, table.idAsignatura],
        foreignColumns: [
          planContemplaAsignatura.idPlan,
          planContemplaAsignatura.idAsignatura,
        ],
      }),
    };
  },
);
