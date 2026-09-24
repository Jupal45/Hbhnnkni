import { ExamType, Question } from '../types';
import { allQuestions as piense2Questions, sectionsInfo as piense2SectionsInfo, calculateSectionScores as calcPiense2Scores } from './allQuestions';
import { paaAllQuestions, paaSectionsInfo, PAA_PART_DURATIONS, calculatePaaSectionScores } from './paa/paaQuestions';

export interface ExamDefinition {
  id: ExamType;
  title: string;
  shortTitle: string;
  badge: string;
  targetAudience: string;
  organizationSupportText: string;
  totalQuestions: number;
  totalDurationMinutes: number;
  partDurations: Record<number, number>;
  sections: typeof piense2SectionsInfo;
  questions: Question[];
  calculateSectionScores: (answers: Record<string, string>) => {
    part1: { score: number; total: number };
    part2: { score: number; total: number };
    part3: { score: number; total: number };
    part4: { score: number; total: number };
  };
}

export const PIENSE2_PART_DURATIONS: Record<number, number> = {
  1: 35 * 60, // 35 min
  2: 30 * 60, // 30 min
  3: 35 * 60, // 35 min
  4: 30 * 60, // 30 min
};

export const EXAM_DEFINITIONS: Record<ExamType, ExamDefinition> = {
  piense2: {
    id: 'piense2',
    title: 'PIENSE II - Prueba de Ingreso y Evaluación en la Educación Secundaria / Media Superior',
    shortTitle: 'PIENSE II',
    badge: 'PrepaTec / Media Superior',
    targetAudience: 'Aspirantes a Educación Media Superior, PrepaTec y programas de bachillerato de excelencia.',
    organizationSupportText: 'Herramienta de diagnóstico de habilidades cognitivas, verbales y matemáticas.',
    totalQuestions: piense2Questions.length,
    totalDurationMinutes: 130,
    partDurations: PIENSE2_PART_DURATIONS,
    sections: piense2SectionsInfo,
    questions: piense2Questions,
    calculateSectionScores: calcPiense2Scores,
  },
  paa: {
    id: 'paa',
    title: 'PAA',
    shortTitle: 'PAA',
    badge: 'PAA',
    targetAudience: 'Evaluación estandarizada PAA.',
    organizationSupportText: 'Instrumento estandarizado de aptitud académica.',
    totalQuestions: paaAllQuestions.length,
    totalDurationMinutes: 180,
    partDurations: PAA_PART_DURATIONS,
    sections: paaSectionsInfo,
    questions: paaAllQuestions,
    calculateSectionScores: calculatePaaSectionScores,
  },
};

export const INSTITUTIONS_LIST = [
  'Instituto Mater',
  'PrepaTec',
  'Tecnológico de Monterrey',
  'FETEC (Federación de Estudiantes del Tec)',
  'Sociedades de Alumnos y Consejos Estudiantiles',
  'Grupos Estudiantiles y Capítulos Universitarios',
  'Universidad Nacional Autónoma de México (UNAM)',
  'Universidad Autónoma de Nuevo León (UANL)',
  'Universidad de Monterrey (UDEM)',
  'Colegio de Bachilleres / Preparatoria Oficial',
  'Colegio Particular / Instituto Privado',
  'Centros de Asesoría y Liderazgo Académico',
  'General / Aspirante Independiente',
];

export interface StudyTopic {
  sectionTitle: string;
  topics: string[];
}

export const RECOMMENDED_STUDY_TOPICS: Record<ExamType, StudyTopic[]> = {
  paa: [
    {
      sectionTitle: 'Parte 1: Lectura Crítica',
      topics: [
        'Análisis e interpretación de textos argumentativos, informativos y literarios',
        'Identificación de ideas centrales, hipótesis y posturas del autor',
        'Inferencia de significados contextuales y analogías complejas',
        'Distinción entre hechos, opiniones y evidencias',
      ],
    },
    {
      sectionTitle: 'Parte 2: Redacción y Lengua',
      topics: [
        'Concordancia gramatical (sujeto-verbo, género y número)',
        'Uso correcto de conectores lógicos y nexos discursivos',
        'Puntuación formal: coma, punto y coma, dos puntos y punto',
        'Corrección de ambigüedades, redundancias y errores de sintaxis',
      ],
    },
    {
      sectionTitle: 'Parte 3: Matemáticas y Razonamiento',
      topics: [
        'Operaciones aritméticas, fracciones, exponentes y radicales',
        'Álgebra lineal: ecuaciones, desigualdades y sistemas de ecuaciones',
        'Geometría: perímetros, áreas, volúmenes, ángulos y teorema de Pitágoras',
        'Razonamiento estadístico: promedios, porcentajes, probabilidad y lectura de tablas/gráficas',
      ],
    },
    {
      sectionTitle: 'Parte 4: Lengua Inglesa',
      topics: [
        'Vocabulario académico y comprensión contextual en inglés',
        'Tiempos verbales simples, compuestos y condicionales',
        'Estructura oracional y preposiciones de tiempo y lugar',
        'Comprensión lectora de pasajes cortos y detección del mensaje principal',
      ],
    },
  ],
  piense2: [
    {
      sectionTitle: 'Parte 1: Habilidad Cognoscitiva',
      topics: [
        'Analogías verbales y relaciones de significado entre palabras',
        'Secuencias lógicas, series numéricas y alfanuméricas',
        'Razonamiento inductivo, deductivo y reconocimiento de patrones',
        'Visualización espacial y relaciones geométricas básicas',
      ],
    },
    {
      sectionTitle: 'Parte 2: Español / Lengua',
      topics: [
        'Reglas de ortografía básica, acentuación (agudas, graves, esdrújulas)',
        'Estructura de la oración: núcleo del sujeto y predicado',
        'Relaciones semánticas: sinónimos, antónimos y homófonos',
        'Comprensión de lectura en textos continuos y discontinuos',
      ],
    },
    {
      sectionTitle: 'Parte 3: Matemáticas',
      topics: [
        'Operaciones fundamentales con números enteros y decimales',
        'Suma, resta, multiplicación y división de fracciones',
        'Regla de tres simple, cálculo de porcentajes y proporciones',
        'Cálculo de perímetros y áreas de figuras geométricas comunes',
      ],
    },
    {
      sectionTitle: 'Parte 4: Inglés',
      topics: [
        'Vocabulario esencial para la comunicación cotidiana',
        'Verbos básicos en presente y pasado (regulares e irregulares)',
        'Pronombres personales, posesivos y preposiciones básicas',
        'Lectura y comprensión de instrucciones y diálogos sencillos',
      ],
    },
  ],
};
