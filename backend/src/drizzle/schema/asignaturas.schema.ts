import { numeric, pgTable, serial, text } from 'drizzle-orm/pg-core';

// se pueden dejar las tablas en archivos separados si se desea modularidad
// se crea un archivo schema.ts que exporta cada una de las definiciones de tablas individuales dentro de una carpeta /schema
// para las relaciones muchos a muchos se puede definir la bridge table dentro de la tabla que la utiliza
export const asignaturas = pgTable('asignaturas', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  semestre: numeric('sem').notNull(),
  descripcion: text('desc'),
});
