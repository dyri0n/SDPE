import {
  pgTable,
  serial,
  text,
  integer,
  primaryKey,
  foreignKey,
} from 'drizzle-orm/pg-core';
import { planContemplaAsignatura } from './asignatura.schema';
import { relations } from 'drizzle-orm';

export const curso = pgTable(
  // Nombre Tabla
  'curso',
  // Atributos
  {
    id: serial('id'),
    idPlan: integer('plan_id'),
    idAsignatura: integer('asignatura_id'),

    nombre: text('nombre').notNull(),
    linkSyllabus: text('syllabus'),
  },
  // Restricciones
  (t) => ({
    pk: primaryKey({ columns: [t.id, t.idPlan, t.idAsignatura] }),
    planContemplaAsignatura: foreignKey({
      name: 'plan_contempla_asignatura',
      columns: [t.idPlan, t.idAsignatura],
      foreignColumns: [
        planContemplaAsignatura.idPlan,
        planContemplaAsignatura.idAsignatura,
      ],
    }),
  }),
);

export const cursoRelations = relations(curso, ({ one }) => {
  planContemplaAsignatura: one(planContemplaAsignatura, {
    fields: [curso.idPlan, curso.idAsignatura],
    references: [
      planContemplaAsignatura.idPlan,
      planContemplaAsignatura.idAsignatura,
    ],
  });
});
