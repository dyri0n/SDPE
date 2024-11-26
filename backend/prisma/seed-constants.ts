import {
  Asignatura,
  Convenio,
  END,
  Estudiante,
  LineaAsignatura,
  Modalidad,
  Plan,
  Usuario,
} from '@prisma/client';

export const ESTUDIANTES: Estudiante[] = [
  {
    idEstudiante: 1,
    rut: '21.111.111-1',
    nombreCompleto: 'Valentina Andrea Rojas Morales',
    nombreSocial: 'Valentina Andrea Rojas Morales',
    agnioIngreso: 2019,
  },
  {
    idEstudiante: 2,
    rut: '22.222.222-2',
    nombreCompleto: 'Matías Joaquín Contreras López',
    nombreSocial: 'Matías Joaquín Contreras López',
    agnioIngreso: 2020,
  },
  {
    idEstudiante: 3,
    rut: '23.333.333-3',
    nombreCompleto: 'Francisca Antonia Silva Torres',
    nombreSocial: 'Francisca Antonia Silva Torres',
    agnioIngreso: 2019,
  },
  {
    idEstudiante: 4,
    rut: '24.444.444-4',
    nombreCompleto: 'Carlos Alberto Fuentes Castillo',
    nombreSocial: 'Martina Fuentes Castillo',
    agnioIngreso: 2020,
  },
];

export const ASIGNATURAS: Asignatura[] = [
  {
    idAsignatura: 1,
    codigo: 'DE119',
    nombre: 'Expresión oral y escrita I',
    nombreCorto: 'ExprOralEscrI',
    unidad: 'Departamento de Español',
    caracter: 'NORMAL',
    areaFormacion: 'FG',
    creditos: 4,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 1,
    competencias: [
      'Comunicar ideas de forma clara y efectiva',
      'Escribir textos académicos',
      'Desarrollar habilidades de expresión oral',
    ],
    descripcion: 'Primera parte del curso de comunicación efectiva',
    linkSyllabus: 'https://ejemplo.com/syllabus-de119',
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 2,
    codigo: 'ED756',
    nombre: 'Fundamentos de la filosofía en educación',
    nombreCorto: 'FundFilosEd',
    unidad: 'Departamento de Educación',
    caracter: 'NORMAL',
    areaFormacion: 'FG',
    creditos: 3,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 1,
    competencias: [
      'Comprender los principios filosóficos aplicados a la educación',
      'Analizar problemas filosóficos educativos',
    ],
    descripcion: 'Curso introductorio a la filosofía aplicada a la educación',
    linkSyllabus: 'https://ejemplo.com/syllabus-ed756',
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 3,
    codigo: 'ED555',
    nombre: 'Identidad profesional y comunicación',
    nombreCorto: 'IdProfCom',
    unidad: 'Departamento de Educación',
    caracter: 'NORMAL',
    areaFormacion: 'FG',
    creditos: 4,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 1,
    competencias: [
      'Desarrollar una identidad profesional sólida',
      'Fortalecer habilidades comunicativas',
    ],
    descripcion:
      'Desarrollo de la identidad profesional a través de la comunicación',
    linkSyllabus: 'https://ejemplo.com/syllabus-ed555',
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 4,
    codigo: 'ED757',
    nombre: 'Educación inclusiva y su contexto',
    nombreCorto: 'EdInclContx',
    unidad: 'Departamento de Educación',
    caracter: 'NORMAL',
    areaFormacion: 'FE',
    creditos: 3,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 1,
    competencias: [
      'Analizar políticas y prácticas de inclusión',
      'Comprender el contexto de la educación inclusiva',
    ],
    descripcion: 'Estudio de la inclusión en el ámbito educativo',
    linkSyllabus: 'https://ejemplo.com/syllabus-ed757',
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 5,
    codigo: 'ED895',
    nombre: 'Fundamentos sociológicos en educación',
    nombreCorto: 'FndSocEd',
    unidad: 'Departamento de Educación',
    caracter: 'NORMAL',
    areaFormacion: 'FE',
    creditos: 4,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 2,
    competencias: [
      'Analizar los fundamentos sociológicos del sistema educativo',
      'Interpretar las relaciones sociales en el aula',
    ],
    descripcion:
      'Análisis de los fundamentos sociológicos en el sistema educativo',
    linkSyllabus: 'https://ejemplo.com/syllabus-ed895',
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 6,
    codigo: 'DE126',
    nombre: 'Expresión oral y escrita II',
    nombreCorto: 'ExprOralEscrII',
    unidad: 'Departamento de Español',
    caracter: 'NORMAL',
    areaFormacion: 'FG',
    creditos: 4,
    tributaciones: [],
    prerrequisitos: [], // Requiere 'Expresión oral y escrita I'
    posicion: null,
    semestre: 2,
    competencias: [
      'Mejorar habilidades de comunicación avanzada',
      'Escribir textos más complejos',
    ],
    descripcion: 'Segunda parte del curso de comunicación efectiva',
    linkSyllabus: 'https://ejemplo.com/syllabus-de126',
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 7,
    codigo: 'ED896',
    nombre: 'Enfoque sistémico y psicopedagógico',
    nombreCorto: 'SistPsicoPed',
    unidad: 'Departamento de Educación',
    caracter: 'NORMAL',
    areaFormacion: 'FE',
    creditos: 3,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 2,
    competencias: [
      'Comprender enfoques psicopedagógicos',
      'Aplicar un enfoque sistémico en la educación',
    ],
    descripcion:
      'Curso sobre enfoques psicopedagógicos aplicados a la educación',
    linkSyllabus: 'https://ejemplo.com/syllabus-ed896',
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 8,
    codigo: 'ED559',
    nombre: 'El alumno y su entorno social',
    nombreCorto: 'AlumEntSoc',
    unidad: 'Departamento de Educación',
    caracter: 'NORMAL',
    areaFormacion: 'FE',
    creditos: 4,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 2,
    competencias: [
      'Analizar el impacto social en el aprendizaje',
      'Desarrollar estrategias educativas inclusivas',
    ],
    descripcion:
      'Estudio del impacto del entorno social en el aprendizaje del alumno',
    linkSyllabus: 'https://ejemplo.com/syllabus-ed559',
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 9,
    codigo: 'KN003',
    nombre: 'Salud alimentaria',
    nombreCorto: 'SaludAlim',
    unidad: 'Departamento de Kinesiología y Nutrición',
    caracter: 'NORMAL',
    areaFormacion: 'FE',
    creditos: 3,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 3,
    competencias: [
      'Comprender la importancia de una nutrición adecuada',
      'Analizar hábitos alimentarios saludables',
    ],
    descripcion: 'Curso sobre nutrición y salud alimentaria',
    linkSyllabus: 'https://ejemplo.com/syllabus-kn003',
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 10,
    codigo: 'ED897',
    nombre: 'Política y marco jurídico',
    nombreCorto: 'PolMarJur',
    unidad: 'Departamento de Educación',
    caracter: 'NORMAL',
    areaFormacion: 'FE',
    creditos: 3,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 3,
    competencias: [
      'Analizar políticas educativas y el marco legal',
      'Comprender el impacto del marco jurídico en la educación',
    ],
    descripcion:
      'Análisis de políticas educativas y el marco jurídico que las regula',
    linkSyllabus: 'https://ejemplo.com/syllabus-ed897',
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 11,
    codigo: 'ED898',
    nombre: 'Fundamentos teóricos del aprendizaje',
    nombreCorto: 'FuTeAp',
    descripcion: 'Fundamentos teóricos que subyacen al proceso de aprendizaje',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
    caracter: 'NORMAL',
    areaFormacion: 'FP',
    creditos: 3,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 3,
    competencias: ['Comprender fundamentos del aprendizaje'],
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 12,
    codigo: 'DE127',
    nombre: 'Lingüística',
    nombreCorto: 'no especificado',
    descripcion:
      'Introducción a la lingüística aplicada en el contexto educativo',
    unidad: 'Departamento de Español',
    linkSyllabus: '',
    caracter: 'NORMAL',
    areaFormacion: 'FB',
    creditos: 3,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 3,
    competencias: ['Analizar estructuras lingüísticas'],
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 13,
    codigo: 'ED564',
    nombre: 'Aprendizaje profundo y docencia de calidad',
    nombreCorto: 'no especificado1',
    descripcion:
      'Curso sobre estrategias para fomentar un aprendizaje profundo y docencia de calidad',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
    caracter: 'NORMAL',
    areaFormacion: 'FP',
    creditos: 4,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 4,
    competencias: ['Implementar estrategias docentes'],
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 14,
    codigo: 'ED710',
    nombre: 'Liderazgo y colaboración pedagógica',
    nombreCorto: 'no especificado2',
    descripcion:
      'Fomento del liderazgo y la colaboración entre docentes en el entorno pedagógico',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
    caracter: 'NORMAL',
    areaFormacion: 'FP',
    creditos: 3,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 4,
    competencias: ['Liderar equipos pedagógicos'],
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 15,
    codigo: 'ED899',
    nombre: 'Currículo en contexto psicopedagógico',
    nombreCorto: 'no especificado3',
    descripcion: 'Estudio del currículo en relación con la psicopedagogía',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
    caracter: 'NORMAL',
    areaFormacion: 'FP',
    creditos: 4,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 4,
    competencias: ['Diseñar currículos psicopedagógicos'],
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 16,
    codigo: 'ED900',
    nombre: 'Neurociencias aplicadas a la educación diferencial',
    nombreCorto: 'no especificado4',
    descripcion:
      'Curso que aplica principios de neurociencia a la educación diferencial',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
    caracter: 'NORMAL',
    areaFormacion: 'FE',
    creditos: 5,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 4,
    competencias: ['Aplicar neurociencia en educación diferencial'],
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 17,
    codigo: 'EF018',
    nombre: 'Introducción a la psicomotricidad',
    nombreCorto: 'no especificado5',
    descripcion:
      'Curso introductorio sobre psicomotricidad y su importancia en la educación',
    unidad: 'Departamento de Ciencias de la Actividad Física y del Deporte',
    linkSyllabus: '',
    caracter: 'NORMAL',
    areaFormacion: 'FG',
    creditos: 2,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 5,
    competencias: ['Comprender fundamentos de psicomotricidad'],
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 18,
    codigo: 'DE128',
    nombre: 'Análisis del discurso',
    nombreCorto: 'no especificado11',
    descripcion: 'Curso sobre técnicas y teorías para el análisis del discurso',
    unidad: 'Departamento de Español',
    linkSyllabus: '',
    caracter: 'NORMAL',
    areaFormacion: 'FB',
    creditos: 3,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 5,
    competencias: ['Analizar discursos en contextos educativos'],
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 19,
    codigo: 'ED902',
    nombre: 'Gestión educativa',
    nombreCorto: 'no especificado12',
    descripcion:
      'Estudio de las prácticas de gestión en instituciones educativas',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
    caracter: 'NORMAL',
    areaFormacion: 'FE',
    creditos: 4,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 5,
    competencias: ['Gestionar instituciones educativas'],
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 20,
    codigo: 'ED903',
    nombre: 'Evaluación y calidad educativa',
    nombreCorto: 'no especificado13',
    descripcion:
      'Curso sobre métodos de evaluación y estándares de calidad en educación',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
    caracter: 'NORMAL',
    areaFormacion: 'FE',
    creditos: 4,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 5,
    competencias: ['Evaluar calidad educativa'],
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 21,
    codigo: 'ED904',
    nombre: 'Educación inclusiva',
    nombreCorto: 'no especificado14',
    descripcion: 'Estudio de estrategias para fomentar la inclusión en el aula',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
    caracter: 'NORMAL',
    areaFormacion: 'FE',
    creditos: 3,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 6,
    competencias: ['Implementar estrategias de inclusión educativa'],
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 22,
    codigo: 'ED905',
    nombre: 'Tecnologías para la educación diferencial',
    nombreCorto: 'no especificado15',
    descripcion:
      'Curso sobre el uso de herramientas tecnológicas en el ámbito de la educación diferencial',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
    caracter: 'NORMAL',
    areaFormacion: 'FE',
    creditos: 4,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 6,
    competencias: ['Aplicar tecnologías en contextos educativos diferenciales'],
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 23,
    codigo: 'ED906',
    nombre: 'Didáctica en contextos de diversidad cultural',
    nombreCorto: 'no especificado21',
    descripcion:
      'Desarrollo de habilidades para la enseñanza en contextos multiculturales',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
    caracter: 'NORMAL',
    areaFormacion: 'FP',
    creditos: 4,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 6,
    competencias: [
      'Desarrollar didácticas inclusivas en contextos culturales diversos',
    ],
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 24,
    codigo: 'ED907',
    nombre: 'Práctica profesional inicial',
    nombreCorto: 'no especificado22',
    descripcion: 'Primera experiencia práctica en el ámbito educativo',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
    caracter: 'PRACTICA',
    areaFormacion: 'FE',
    creditos: 6,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 6,
    competencias: ['Integrar conocimientos teóricos en la práctica educativa'],
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 25,
    codigo: 'ED908',
    nombre: 'Evaluación en contextos diversos',
    nombreCorto: 'no especificado23',
    descripcion: 'Métodos de evaluación adaptados a la diversidad estudiantil',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
    caracter: 'NORMAL',
    areaFormacion: 'FE',
    creditos: 4,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 7,
    competencias: ['Diseñar evaluaciones inclusivas'],
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 26,
    codigo: 'ED909',
    nombre: 'Diseño de proyectos educativos',
    nombreCorto: 'no especificado24',
    descripcion:
      'Elaboración de proyectos educativos enfocados en la mejora del aprendizaje',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
    caracter: 'NORMAL',
    areaFormacion: 'FE',
    creditos: 4,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 7,
    competencias: ['Planificar proyectos educativos efectivos'],
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 27,
    codigo: 'ED910',
    nombre: 'Práctica profesional avanzada',
    nombreCorto: 'no especificado25',
    descripcion: 'Práctica final en contextos educativos reales',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
    caracter: 'PRACTICA',
    areaFormacion: 'FE',
    creditos: 10,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 7,
    competencias: ['Desempeñarse como docente en entornos reales'],
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 28,
    codigo: 'ED911',
    nombre: 'Seminario de titulación',
    nombreCorto: 'no especificado31',
    descripcion: 'Preparación de la tesis o proyecto de titulación',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
    caracter: 'NORMAL',
    areaFormacion: 'FE',
    creditos: 6,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 7,
    competencias: ['Elaborar proyectos de titulación académica'],
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 29,
    codigo: 'ED912',
    nombre: 'Ética profesional docente',
    nombreCorto: 'no especificado32',
    descripcion: 'Reflexión sobre principios éticos en la profesión docente',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
    caracter: 'NORMAL',
    areaFormacion: 'FE',
    creditos: 3,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 8,
    competencias: ['Demostrar responsabilidad ética en el ejercicio docente'],
    idPlan: null,
    idLinea: null,
  },
  {
    idAsignatura: 30,
    codigo: 'ED913',
    nombre: 'Defensa de proyecto de titulación',
    nombreCorto: 'no especificado33',
    descripcion: 'Presentación y defensa del proyecto final de titulación',
    unidad: 'Departamento de Educación',
    linkSyllabus: '',
    caracter: 'PRACTICA',
    areaFormacion: 'FE',
    creditos: 4,
    tributaciones: [],
    prerrequisitos: [],
    posicion: null,
    semestre: 8,
    competencias: ['Defender proyectos académicos con rigor y claridad'],
    idPlan: null,
    idLinea: null,
  },
];

export const PLANES: Plan[] = [
  {
    idPlan: 1,
    codigo: 309,
    titulo: '2019',
    agnio: 2019,
    fechaInstauracion: new Date('2019-10-20'),
  },
  {
    idPlan: 2,
    codigo: 325,
    titulo: '2019v2',
    agnio: 2020,
    fechaInstauracion: new Date('2020-05-15'),
  },
];

// END 2024

type Estandar = {
  titulo: string;
};

type Tematica = {
  numero: number;
  nombre: string;
  estandares: {
    [key: string]: Estandar;
  };
};

type NivelPA = {
  nombre_nivel: string;
  descriptor: string;
};

type SituacionPedagogica = {
  tipo: string;
  nombre: string;
  niveles: {
    nivel_1: NivelPA;
    nivel_2: NivelPA;
    nivel_3: NivelPA;
    nivel_4: NivelPA;
  };
};

export type FORMATO_END1 = {
  tematicas: {
    [key: string]: Tematica;
  };
  preguntas_abiertas: {
    [key: string]: SituacionPedagogica;
  };
};

const formato1: FORMATO_END1 = {
  tematicas: {
    t1: {
      numero: 1,
      nombre: 'Aprendizaje y desarrollo de estudiantes de Educación Básica',
      estandares: {
        e1: {
          titulo:
            'Conoce a los estudiantes de educación básica y sabe cómo ellos aprenden',
        },
        e2: {
          titulo:
            'Está preparado para promover el desarrollo personal y social de los estudiantes',
        },
      },
    },
    t2: {
      numero: 2,
      nombre: 'Diseño e implementación de la enseñanza',
      estandares: {
        e3: {
          titulo: 'Conoce el currículo de la educación básica',
        },
        e4: {
          titulo:
            'Sabe cómo diseñar e implementar estrategias enseñanza-aprendizaje adecuadas para los objetivos de acuerdo al contexto',
        },
        e5: {
          titulo:
            'Está preparado para gestionar la clase y crear un ambiente apropiado para el aprendizaje según contextos',
        },
        e6: {
          titulo:
            'Conoce y sabe aplicar métodos de evaluación para observar el progreso de los estudiantes y usar los resultados para retroalimentar el aprendizaje y la práctica pedagógica',
        },
        e7: {
          titulo: 'Conoce cómo se genera y transforma cultura escolar',
        },
        e8: {
          titulo:
            'Está preparado para atender la diversidad y promover la integración en el aula',
        },
      },
    },
    t3: {
      numero: 3,
      nombre: 'La profesión docente y el sistema educacional chileno',
      estandares: {
        e10: {
          titulo:
            'Aprende en forma continua y reflexiona sobre su práctica y su inserción en el sistema educacional',
        },
      },
    },
  },
  preguntas_abiertas: {
    pa1: {
      tipo: 'PA_SP',
      nombre: 'Resolución de situaciones pedagógicas en Ed. Parvularia',
      niveles: {
        nivel_1: {
          nombre_nivel: 'A',
          descriptor:
            'Proponen en detalle una estrategia pedagógica basada en la situación expuesta en el caso y en una perspectiva de ambiente de aprendizaje inclusivo.',
        },
        nivel_2: {
          nombre_nivel: 'B',
          descriptor:
            'Proponen una estrategia pedagógica basada en la situación expuesta en el caso y en una perspectiva de aprendizaje inclusivo, sin embargo, no realizan una explicación detallada de la propuesta.',
        },
        nivel_3: {
          nombre_nivel: 'C',
          descriptor:
            'Proponen una estrategia pedagógica similar a la señalada en el caso o en la que no se observa claramente la perspectiva de ambiente de aprendizaje inclusivo.',
        },
        nivel_4: {
          nombre_nivel: 'D',
          descriptor:
            'Proponen una estrategia similar a la señalada en el caso o en la que no se observa la perspectiva de ambiente de aprendizaje inclusivo.',
        },
      },
    },
    pa2: {
      tipo: 'PA_SP',
      nombre: 'Resolución de situaciones pedagógicas en Ed. Básica',
      niveles: {
        nivel_1: {
          nombre_nivel: 'A',
          descriptor:
            'Proponen una forma de solucionar el conflicto surgido entre los estudiantes del caso, considerando el uso de estrategias de resolución de conflictos y normas de convivencia.',
        },
        nivel_2: {
          nombre_nivel: 'B',
          descriptor:
            'Proponen una forma de solucionar el conflicto surgido entre los estudiantes del caso, sin embargo, consideran solo el uso de estrategias de resolución de conflictos o normas de convivencia.',
        },
        nivel_3: {
          nombre_nivel: 'C',
          descriptor:
            'Describen una actividad que no se relaciona claramente con el conflicto del caso, además, consideran solo el uso de estrategias de resolución de conflictos o normas de convivencia.',
        },
        nivel_4: {
          nombre_nivel: 'D',
          descriptor:
            'Mencionan solo una actividad que no hace alusión al conflicto del caso, además, consideran solo el uso de estrategias de resolución de conflictos o normas de convivencia.',
        },
      },
    },
    pa3: {
      tipo: 'PA_SP',
      nombre: 'Resolución de situaciones pedagógicas en Ed. Diferencial',
      niveles: {
        nivel_1: {
          nombre_nivel: 'A',
          descriptor:
            'Proponen una actividad de clase en que involucra la participación de los estudiantes en la que se comunica e implementan normas de convivencia de acuerdo con la información proporcionada en el caso.',
        },
        nivel_2: {
          nombre_nivel: 'B',
          descriptor:
            'Proponen una actividad en la que se comunica y se implementan normas de expresión escrita y utilización adecuada de recursos de cohesión.',
        },
        nivel_3: {
          nombre_nivel: 'C',
          descriptor:
            'Proponen una actividad en la que se comunica y se implementan normas, sin embargo, no se especifica cómo se involucrará a los estudiantes.',
        },
        nivel_4: {
          nombre_nivel: 'D',
          descriptor:
            'Describen una situación expuesta en el caso, sin proponer una actividad que involucre la comunicación e implementación de normas de convivencia.',
        },
      },
    },
    pa4: {
      tipo: 'PA_SP',
      nombre: 'Resolución de situaciones pedagógicas en Ed. Media',
      niveles: {
        nivel_1: {
          nombre_nivel: 'A',
          descriptor:
            'Proponen una actividad que permite conocer los intereses y expectativas de los estudiantes, considerando su heterogeneidad y la información entregada por el caso.',
        },
        nivel_2: {
          nombre_nivel: 'B',
          descriptor:
            'Proponen una actividad que permite conocer los intereses y expectativas de los estudiantes así como su heterogeneidad, sin embargo, está presentada de forma poco clara o detallada.',
        },
        nivel_3: {
          nombre_nivel: 'C',
          descriptor:
            'Proponen una actividad que es pertinente para el nivel expuesto en el caso, sin embargo, no permite recoger información sobre los intereses y expectativas de los estudiantes considerando la heterogeneidad de los estudiantes.',
        },
        nivel_4: {
          nombre_nivel: 'D',
          descriptor:
            'Mencionan una actividad o línea de acción que no es pertinente con el nivel expuesto en el caso o que no considera los intereses y expectativas de los estudiantes.',
        },
      },
    },
    pa5: {
      tipo: 'PA_CE',
      nombre: 'Habilidades de comunicación escrita',
      niveles: {
        nivel_1: {
          nombre_nivel: 'A',
          descriptor:
            'Son capaces de elaborar un texto de fácil comprensión, con una exposición de ideas focalizada en el tema.',
        },
        nivel_2: {
          nombre_nivel: 'B',
          descriptor:
            'Son capaces de elaborar un texto que comunica y reflexiona sobre las normas de expresión escrita.',
        },
        nivel_3: {
          nombre_nivel: 'C',
          descriptor:
            'Son capaces de elaborar un texto comprensible, aunque con cierto grado de dificultad.',
        },
        nivel_4: {
          nombre_nivel: 'D',
          descriptor:
            'Demuestran dificultades para elaborar un texto comprensible sobre el tema requerido.',
        },
      },
    },
  },
};

export enum Nivel_PA {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}

export class Porcentaje {
  public valor: number;

  constructor(valor: number) {
    if (valor < 0 || valor > 1) {
      throw new Error('El valor debe estar entre 0 y 1.');
    }
    this.valor = valor;
  }

  public toString(decimals: number = 0) {
    if (decimals < 0) {
      console.error('No se admiten valores negativos, convirtiendo a 0');
      decimals = 0;
    }

    if (!Number.isInteger(decimals)) {
      console.error(
        'No es un número válido de decimales, convirtiendo a entero',
      );
      decimals = Math.floor(decimals);
    }

    return `${(this.valor * 100).toFixed(decimals)}%`;
  }
}

export type FORMATO_RESPUESTA = {
  tematicas: {
    t1: {
      e1: number;
      e2: number;
    };
    t2: {
      e3: number;
      e4: number;
      e5: number;
      e6: number;
      e7: number;
      e8: number;
    };
    t3: {
      e10: number;
    };
  };
  preguntas_abiertas: {
    pa1: {
      nivel_alcanzado: Nivel_PA;
    };
    pa2: {
      nivel_alcanzado: Nivel_PA;
    };
    pa3: {
      nivel_alcanzado: Nivel_PA;
    };
    pa4: {
      nivel_alcanzado: Nivel_PA;
    };
    pa5: {
      nivel_alcanzado: Nivel_PA;
    };
  };
};

export const ENDS: END[] = [
  {
    idEND: 1,
    fechaRendicion: new Date('2025'),
    formato: formato1,
  },
];

// fin end

export const MODALIDADES: Modalidad[] = [
  {
    idModalidad: 1,
    nombreModalidad: 'Escuela de lenguaje',
    fechaCreacion: undefined,
    fechaDesuso: undefined,
    validez: undefined,
  },
  {
    idModalidad: 2,
    nombreModalidad: 'Escuela/Colegio especial',
    fechaCreacion: undefined,
    fechaDesuso: undefined,
    validez: undefined,
  },
  {
    idModalidad: 3,
    nombreModalidad: 'Colegio Regular PIE',
    fechaCreacion: undefined,
    fechaDesuso: undefined,
    validez: undefined,
  },
  {
    idModalidad: 4,
    nombreModalidad: 'Modalidad No Convencional',
    fechaCreacion: undefined,
    fechaDesuso: undefined,
    validez: undefined,
  },
];

export const CONVENIOS: Convenio[] = [
  {
    idConvenio: 1,
    titulo:
      'Convenio con Servicio Local de Educación Pública Chinchorro (SLEP)',
    centroPractica: 'Servicio Local de Educación Pública Chinchorro (SLEP)',
    fechaInicioConvenio: new Date(2019),
    fechaFinConvenio: undefined,
    validez: true,
    documentoConvenio: undefined,
    urlFoto: undefined,
    idModalidad: 3,
  },
  {
    idConvenio: 2,
    titulo: 'Convenio con Club Oro de Arica',
    centroPractica: 'Club Oro de Arica',
    fechaInicioConvenio: new Date(2020),
    fechaFinConvenio: undefined,
    validez: true,
    documentoConvenio: undefined,
    urlFoto: undefined,
    idModalidad: 4,
  },
  {
    idConvenio: 3,
    titulo:
      'Convenio con Entidad individual educacional Colibrí de Arica E.I.E.',
    centroPractica: 'Entidad individual educacional Colibrí de Arica E.I.E.',
    fechaInicioConvenio: new Date(2020),
    fechaFinConvenio: undefined,
    validez: true,
    documentoConvenio: undefined,
    urlFoto: undefined,
    idModalidad: 2,
  },
  {
    idConvenio: 4,
    titulo: 'Convenio con Integración Social del Limitado Visual Crisolvi.',
    centroPractica: 'Integración Social del Limitado Visual Crisolvi.',
    fechaInicioConvenio: new Date(2021),
    fechaFinConvenio: undefined,
    validez: true,
    documentoConvenio: undefined,
    urlFoto: undefined,
    idModalidad: 2,
  },
  {
    idConvenio: 5,
    titulo: 'Convenio con Escuela Especial de Lenguaje Pieecitos de Niño C.E.',
    centroPractica: 'Escuela Especial de Lenguaje Pieecitos de Niño C.E.',
    fechaInicioConvenio: new Date(2021),
    fechaFinConvenio: undefined,
    validez: true,
    documentoConvenio: undefined,
    urlFoto: undefined,
    idModalidad: 1,
  },
  {
    idConvenio: 6,
    titulo: 'Convenio con Corporación Educacional Parina',
    centroPractica: 'Corporación Educacional Parina',
    fechaInicioConvenio: new Date(2021),
    fechaFinConvenio: undefined,
    validez: true,
    documentoConvenio: undefined,
    urlFoto: undefined,
    idModalidad: 1,
  },
  {
    idConvenio: 7,
    titulo: 'Convenio con Fundación Down',
    centroPractica: 'Fundación Down',
    fechaInicioConvenio: new Date(2021),
    fechaFinConvenio: undefined,
    validez: true,
    documentoConvenio: undefined,
    urlFoto: undefined,
    idModalidad: 4,
  },
  {
    idConvenio: 8,
    titulo: 'Convenio con Colegio Tecnológico Don Bosco',
    centroPractica: 'Colegio Tecnológico Don Bosco',
    fechaInicioConvenio: new Date(2022),
    fechaFinConvenio: undefined,
    validez: true,
    documentoConvenio: undefined,
    urlFoto: undefined,
    idModalidad: 3,
  },
  {
    idConvenio: 9,
    titulo:
      'Convenio con Centro de Rehabilitación y Educación Especial de Arica Kanttauru',
    centroPractica:
      'Centro de Rehabilitación y Educación Especial de Arica Kanttauru',
    fechaInicioConvenio: new Date(2022),
    fechaFinConvenio: undefined,
    validez: true,
    documentoConvenio: undefined,
    urlFoto: undefined,
    idModalidad: 2,
  },
  {
    idConvenio: 10,
    titulo: 'Convenio con La Granjita School',
    centroPractica: 'La Granjita School',
    fechaInicioConvenio: new Date(2022),
    fechaFinConvenio: undefined,
    validez: true,
    documentoConvenio: undefined,
    urlFoto: undefined,
    idModalidad: 3,
  },
  {
    idConvenio: 11,
    titulo: 'Convenio con Escuela de Lenguaje Lucerito Musikal.',
    centroPractica: 'Escuela de Lenguaje Lucerito Musikal.',
    fechaInicioConvenio: new Date(2023),
    fechaFinConvenio: undefined,
    validez: true,
    documentoConvenio: undefined,
    urlFoto: undefined,
    idModalidad: 2,
  },
  {
    idConvenio: 12,
    titulo: 'Convenio con Colegio Mosaicos Corporación Educacional.',
    centroPractica: 'Colegio Mosaicos Corporación Educacional.',
    fechaInicioConvenio: new Date(2022),
    fechaFinConvenio: undefined,
    validez: true,
    documentoConvenio: undefined,
    urlFoto: undefined,
    idModalidad: 3,
  },
  {
    idConvenio: 13,
    titulo: 'Convenio con Aulas Hospitalarias San Sebastián E.I.E',
    centroPractica: 'Aulas Hospitalarias San Sebastián E.I.E',
    fechaInicioConvenio: new Date(2023),
    fechaFinConvenio: undefined,
    validez: true,
    documentoConvenio: undefined,
    urlFoto: undefined,
    idModalidad: 4,
  },
  {
    idConvenio: 14,
    titulo: 'Convenio con Colegio Especial Los Hibiscos',
    centroPractica: 'Colegio Especial Los Hibiscos',
    fechaInicioConvenio: new Date(2024),
    fechaFinConvenio: undefined,
    validez: true,
    documentoConvenio: undefined,
    urlFoto: undefined,
    idModalidad: 2,
  },
  {
    idConvenio: 15,
    titulo: 'Convenio con Colegio Hispano',
    centroPractica: 'Colegio Hispano',
    fechaInicioConvenio: new Date(2024),
    fechaFinConvenio: undefined,
    validez: true,
    documentoConvenio: undefined,
    urlFoto: undefined,
    idModalidad: 3,
  },
];

export const LINEA_ASIGNATURA: LineaAsignatura[] = [
  {
    idLinea: 1,
    titulo: 'Corte Práctico',
  },
  {
    idLinea: 2,
    titulo: 'Licenciatura',
  },
];

export const USUARIOS: Usuario[] = [
  {
    id: undefined,
    username: 'admin',
    email: 'admin@admin.com',
    hashedPassword: 'admin',
    nombreCompleto: 'admin',
  },
  {
    id: undefined,
    username: 'user',
    email: 'user@user.com',
    hashedPassword: 'user',
    nombreCompleto: 'user',
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
