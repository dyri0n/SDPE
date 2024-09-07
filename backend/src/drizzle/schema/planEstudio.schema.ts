import { relations } from 'drizzle-orm';
import { pgTable, serial, text, date, integer } from 'drizzle-orm/pg-core';
import { planContemplaAsignatura } from './asignatura.schema';

export const planDeEstudio = pgTable(
  // Nombre Tabla
  'plan_de_estudio',
  // Atributos
  {
    id: serial('id').primaryKey(),

    titulo: text('titulo').unique(),
    anio: integer('anio'),
    fechaInstauracion: date('fecha_instauracion'),
  },
);

export const planDeEstudioRelations = relations(planDeEstudio, ({ many }) => {
  planContemplaAsignatura: many(planContemplaAsignatura);
});
