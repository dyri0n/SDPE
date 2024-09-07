import { relations } from 'drizzle-orm';
import {
  pgTable,
  serial,
  integer,
  text,
  primaryKey,
  foreignKey,
} from 'drizzle-orm/pg-core';
import { planDeEstudio } from './planEstudio.schema';

export const asignatura = pgTable(
  // Nombre tabla
  'asignatura',
  // Atributos
  {
    id: serial('id').primaryKey(),

    nombre: text('nombre'),
    descripcion: text('descripcion'),
  },
);

export const asignaturaRelations = relations(asignatura, ({ many }) => {
  asignaturaContemplada: many(planContemplaAsignatura);
});

export const planContemplaAsignatura = pgTable(
  // Nombre tabla
  'plan_contempla_asignatura',
  // Atributos
  {
    idAsignatura: integer('asignatura_id').references(() => asignatura.id),
    idPlan: integer('plan_id').references(() => planDeEstudio.id),

    semestre: integer('semestre'),
  },
  // Restricciones
  (t) => {
    pk: primaryKey({ columns: [t.idPlan, t.idAsignatura] });
  },
);

export const planContemplaAsignaturaRelations = relations(
  planContemplaAsignatura,
  ({ one, many }) => {
    asignatura: one(asignatura, {
      fields: [planContemplaAsignatura.idAsignatura],
      references: [asignatura.id],
    });
    plan: one(planDeEstudio, {
      fields: [planContemplaAsignatura.idPlan],
      references: [planDeEstudio.id],
    });
    tributa: many(tributacion);
    requiere: many(tributacion);
  },
);

export const tributacion = pgTable(
  // Nombre tabla
  'tributacion',
  // Atributos
  {
    idPlan: integer('plan_id'),
    idAsignaturaRequerida: integer('previa_id'),
    idAsignaturaTributada: integer('tributada_id'),
  },
  // Restricciones
  (t) => {
    pk: primaryKey({
      columns: [t.idPlan, t.idAsignaturaTributada, t.idAsignaturaRequerida],
    });
    asignaturaTributada: foreignKey({
      name: 'asignatura_tributada',
      columns: [t.idPlan, t.idAsignaturaTributada],
      foreignColumns: [
        planContemplaAsignatura.idPlan,
        planContemplaAsignatura.idAsignatura,
      ],
    });
    asignaturaRequerida: foreignKey({
      name: 'asignatura_requerida',
      columns: [t.idPlan, t.idAsignaturaRequerida],
      foreignColumns: [
        planContemplaAsignatura.idPlan,
        planContemplaAsignatura.idAsignatura,
      ],
    });
  },
);

export const tributacionRelations = relations(tributacion, ({ one }) => {
  asignaturaTributada: one(planContemplaAsignatura, {
    fields: [tributacion.idPlan, tributacion.idAsignaturaTributada],
    references: [
      planContemplaAsignatura.idPlan,
      planContemplaAsignatura.idAsignatura,
    ],
  });
  asignaturaRequerida: one(planContemplaAsignatura, {
    fields: [tributacion.idPlan, tributacion.idAsignaturaRequerida],
    references: [
      planContemplaAsignatura.idPlan,
      planContemplaAsignatura.idAsignatura,
    ],
  });
});
