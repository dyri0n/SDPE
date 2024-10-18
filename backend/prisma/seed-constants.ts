import {
  Asignatura,
  Convenio,
  END,
  Estudiante,
  LineaAsignatura,
  Modalidad,
  Plan,
  Practica,
} from '@prisma/client';

export const ESTUDIANTES: Estudiante[] = [
  {
    id: 1,
    rut: '21.111.111-1',
    nombreCompleto: 'Estudiante Numero Uno',
    agnioIngreso: 2019,
  },
  {
    id: 2,
    rut: '22.222.222-2',
    nombreCompleto: 'Estudiante Numero Dos',
    agnioIngreso: 2020,
  },
  {
    id: 3,
    rut: '23.333.333-3',
    nombreCompleto: 'Estudiante Numero Tres',
    agnioIngreso: 2019,
  },
  {
    id: 4,
    rut: '24.444.444-4',
    nombreCompleto: 'Estudiante Numero Cuatro',
    agnioIngreso: 2020,
  },
  {
    id: 5,
    rut: '25.555.555-5',
    nombreCompleto: 'Estudiante Numero Cinco',
    agnioIngreso: 2019,
  },
  {
    id: 6,
    rut: '26.666.666-6',
    nombreCompleto: 'Estudiante Numero Seis',
    agnioIngreso: 2019,
  },
  {
    id: 7,
    rut: '27.777.777-7',
    nombreCompleto: 'Estudiante Numero Siete',
    agnioIngreso: 2019,
  },
  {
    id: 8,
    rut: '28.888.888-8',
    nombreCompleto: 'Estudiante Numero Ocho',
    agnioIngreso: 2020,
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
    codigo: 309,
    titulo: '2019',
    anio: 2019,
    fechaInstauracion: new Date('2019-10-20'),
  },
  {
    id: 2,
    codigo: 325,
    titulo: '2019v2',
    anio: 2020,
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
    id: 1,
    fechaRendicion: new Date('2025'),
    formato: formato1,
  },
];

// fin end

export const MODALIDADES: Modalidad[] = [
  {
    id: 1,
    nombreModalidad: 'Escuela de lenguaje',
    fechaCreacion: undefined,
    fechaDesuso: undefined,
    validez: undefined,
  },
  {
    id: 2,
    nombreModalidad: 'Escuela/Colegio especial',
    fechaCreacion: undefined,
    fechaDesuso: undefined,
    validez: undefined,
  },
  {
    id: 3,
    nombreModalidad: 'Colegio Regular PIE',
    fechaCreacion: undefined,
    fechaDesuso: undefined,
    validez: undefined,
  },
  {
    id: 4,
    nombreModalidad: 'Modalidad No Convencional',
    fechaCreacion: undefined,
    fechaDesuso: undefined,
    validez: undefined,
  },
];

export const CONVENIOS: Convenio[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
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
    id: 13,
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
    id: 14,
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
    id: 15,
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

export const PRACTICAS: Practica[] = [
  {
    id: 1,
    nombre: 'Práctica 1',
    posicionRelativa: 1,
    competenciasRequeridas: {},
    idPlan: undefined,
    idAsignatura: undefined,
  },
  {
    id: 2,
    nombre: 'Práctica 2',
    posicionRelativa: 2,
    competenciasRequeridas: {},
    idPlan: undefined,
    idAsignatura: undefined,
  },
  {
    id: 3,
    nombre: 'Práctica 3 Etapa Infanto Juvenil',
    posicionRelativa: 3,
    competenciasRequeridas: {},
    idPlan: undefined,
    idAsignatura: undefined,
  },
  {
    id: 4,
    nombre: 'Práctica Profesional',
    posicionRelativa: 4,
    competenciasRequeridas: {},
    idPlan: undefined,
    idAsignatura: undefined,
  },
];

export const LINEA_ASIGNATURA: LineaAsignatura[] = [
  {
    id: 1,
    titulo: 'Corte Práctico',
    idPlan: undefined,
  },
  {
    id: 2,
    titulo: 'Licenciatura',
    idPlan: undefined,
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
