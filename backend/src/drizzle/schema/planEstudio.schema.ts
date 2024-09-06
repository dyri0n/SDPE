import { numeric, pgTable, serial, text, date } from 'drizzle-orm/pg-core';

export const planDeEstudio = pgTable('plan_de_estudio', {
  id: serial('id').primaryKey(),
  titulo: text('titulo').unique(),
  anio: numeric('anio'),
  fechaInstauracion: date('fecha_instauracion'),
});
