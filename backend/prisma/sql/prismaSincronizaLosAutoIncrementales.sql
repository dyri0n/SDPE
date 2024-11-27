SELECT
    t.relname AS tabla,
    a.attname AS columna,
    pg_get_serial_sequence(format('%I.%I', n.nspname, t.relname), a.attname) AS secuencia
FROM pg_class t
JOIN pg_namespace n ON n.oid = t.relnamespace
JOIN pg_attribute a ON a.attrelid = t.oid
WHERE t.relkind = 'r' -- Sólo tablas
  AND a.attnum > 0
  AND NOT a.attisdropped;