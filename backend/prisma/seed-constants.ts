import { Asignatura, Estudiante, Plan } from '@prisma/client';

export const ESTUDIANTES: Estudiante[] = [
  {
    id: 1,
    rut: '21.111.111-1',
    nombreCompleto: 'Estudiante Numero Uno',
  },
  {
    id: 2,
    rut: '22.222.222-2',
    nombreCompleto: 'Estudiante Numero Dos',
  },
  {
    id: 3,
    rut: '23.333.333-3',
    nombreCompleto: 'Estudiante Numero Tres',
  },
  {
    id: 4,
    rut: '24.444.444-4',
    nombreCompleto: 'Estudiante Numero Cuatro',
  },
];

export const ASIGNATURAS: Asignatura[] = [
  {
    id: 1,
    codigo: 'DE119',
    nombre: 'Expresión oral y escrita I',
    descripcion: 'Primera parte del curso de comunicación efectiva',
    unidad: 'Departamento de Español',
    linkSyllabus: '',
  },
  {
    id: 2,
    codigo: 'ED756',
    nombre: 'Fundamentos de la filosofía en educación',
    descripcion: 'Curso introductorio a la filosofía aplicada a la educación',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
  },
  {
    id: 3,
    codigo: 'ED555',
    nombre: 'Identidad profesional y comunicación',
    descripcion:
      'Desarrollo de la identidad profesional a través de la comunicación',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
  },
  {
    id: 4,
    codigo: 'ED757',
    nombre: 'Educación inclusiva y su contexto',
    descripcion: 'Estudio de la inclusión en el ámbito educativo',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
  },
  {
    id: 5,
    codigo: 'ED895',
    nombre: 'Fundamentos sociológicos en educación',
    descripcion:
      'Análisis de los fundamentos sociológicos en el sistema educativo',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
  },
  {
    id: 6,
    codigo: 'DE126',
    nombre: 'Expresión oral y escrita II',
    descripcion: 'Segunda parte del curso de comunicación efectiva',
    unidad: 'Departamento de Español',
    linkSyllabus: '',
  },
  {
    id: 7,
    codigo: 'ED896',
    nombre: 'Enfoque sistémico y psicopedagógico',
    descripcion:
      'Curso sobre enfoques psicopedagógicos aplicados a la educación',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
  },
  {
    id: 8,
    codigo: 'ED559',
    nombre: 'El alumno y su entorno social',
    descripcion:
      'Estudio del impacto del entorno social en el aprendizaje del alumno',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
  },
  {
    id: 9,
    codigo: 'KN003',
    nombre: 'Salud alimentaria',
    descripcion: 'Curso sobre nutrición y salud alimentaria',
    unidad: 'Departamento de Kinesiología y Nutrición',
    linkSyllabus: '',
  },
  {
    id: 10,
    codigo: 'ED897',
    nombre: 'Política y marco jurídico',
    descripcion:
      'Análisis de políticas educativas y el marco jurídico que las regula',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
  },
  {
    id: 11,
    codigo: 'ED898',
    nombre: 'Fundamentos teóricos del aprendizaje',
    descripcion: 'Fundamentos teóricos que subyacen al proceso de aprendizaje',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
  },
  {
    id: 12,
    codigo: 'DE127',
    nombre: 'Lingüística',
    descripcion:
      'Introducción a la lingüística aplicada en el contexto educativo',
    unidad: 'Departamento de Español',
    linkSyllabus: '',
  },
  {
    id: 13,
    codigo: 'ED564',
    nombre: 'Aprendizaje profundo y docencia de calidad',
    descripcion:
      'Curso sobre estrategias para fomentar un aprendizaje profundo y docencia de calidad',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
  },
  {
    id: 14,
    codigo: 'ED710',
    nombre: 'Liderazgo y colaboración pedagógica',
    descripcion:
      'Fomento del liderazgo y la colaboración entre docentes en el entorno pedagógico',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
  },
  {
    id: 15,
    codigo: 'ED899',
    nombre: 'Currículo en contexto psicopedagógico',
    descripcion: 'Estudio del currículo en relación con la psicopedagogía',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
  },
  {
    id: 16,
    codigo: 'ED900',
    nombre: 'Neurociencias aplicadas a la educación diferencial',
    descripcion:
      'Curso que aplica principios de neurociencia a la educación diferencial',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
  },
  {
    id: 17,
    codigo: 'EF018',
    nombre: 'Introducción a la psicomotricidad',
    descripcion:
      'Curso introductorio sobre psicomotricidad y su importancia en la educación',
    unidad: 'Departamento de Ciencias de la Actividad Física y del Deporte',
    linkSyllabus: '',
  },
  {
    id: 18,
    codigo: 'DE128',
    nombre: 'Análisis del discurso',
    descripcion: 'Curso sobre técnicas y teorías para el análisis del discurso',
    unidad: 'Departamento de Español',
    linkSyllabus: '',
  },
  {
    id: 19,
    codigo: 'ED902',
    nombre: 'Gestión educativa',
    descripcion:
      'Estudio de las prácticas de gestión en instituciones educativas',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
  },
  {
    id: 20,
    codigo: 'ED903',
    nombre: 'Evaluación y calidad educativa',
    descripcion:
      'Curso sobre métodos de evaluación y estándares de calidad en educación',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
  },
  {
    id: 21,
    codigo: 'ED904',
    nombre: 'Educación y tecnología',
    descripcion:
      'Análisis del impacto de la tecnología en los procesos educativos',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
  },
  {
    id: 22,
    codigo: 'ED905',
    nombre: 'Pedagogía comparada',
    descripcion:
      'Estudio comparativo de diferentes modelos pedagógicos a nivel mundial',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
  },
  {
    id: 23,
    codigo: 'ED906',
    nombre: 'Historia de la educación',
    descripcion:
      'Curso sobre la evolución histórica de las prácticas y teorías educativas',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
  },
  {
    id: 24,
    codigo: 'EF019',
    nombre: 'Teoría y práctica del entrenamiento deportivo',
    descripcion: 'Principios y aplicaciones del entrenamiento deportivo',
    unidad: 'Departamento de Ciencias de la Actividad Física y del Deporte',
    linkSyllabus: '',
  },
  {
    id: 25,
    codigo: 'EF020',
    nombre: 'Educación física y recreación',
    descripcion:
      'Curso sobre la importancia de la actividad física y la recreación en la educación',
    unidad: 'Departamento de Ciencias de la Actividad Física y del Deporte',
    linkSyllabus: '',
  },
  {
    id: 26,
    codigo: 'KN004',
    nombre: 'Dietética y nutrición',
    descripcion:
      'Fundamentos y aplicaciones prácticas de la dietética y nutrición',
    unidad: 'Departamento de Kinesiología y Nutrición',
    linkSyllabus: '',
  },
  {
    id: 27,
    codigo: 'KN005',
    nombre: 'Biomecánica',
    descripcion: 'Estudio de los principios mecánicos del movimiento humano',
    unidad: 'Departamento de Kinesiología y Nutrición',
    linkSyllabus: '',
  },
  {
    id: 28,
    codigo: 'KN006',
    nombre: 'Fisiología del ejercicio',
    descripcion:
      'Análisis de las respuestas y adaptaciones fisiológicas al ejercicio',
    unidad: 'Departamento de Kinesiología y Nutrición',
    linkSyllabus: '',
  },
];

export const PLANES: Plan[] = [
  {
    id: 1,
    titulo: '2019',
    anio: 2019,
    fechaInstauracion: new Date('2019-10-20'),
  },
  {
    id: 2,
    titulo: '2019v2',
    anio: 2020,
    fechaInstauracion: new Date('2020-05-15'),
  },
];

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function getRandomEnumValue<T>(enumObj: T): T[keyof T] {
  const enumValues = Object.values(enumObj);
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
}
