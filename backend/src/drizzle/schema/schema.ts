// se pueden dejar las tablas en archivos separados si se desea modularidad
// se crea un archivo schema.ts que exporta cada una de las definiciones de tablas individuales dentro de una carpeta /schema
// para las relaciones muchos a muchos se puede definir la bridge table dentro de la tabla que la utiliza

export * from './asignatura.schema';
export * from './curso.schema';
export * from './planEstudio.schema';
