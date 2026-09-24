import { Question } from '../../types';
import { SectionInfo } from '../allQuestions';
import { paaPart1Questions } from './paaPart1Lectura';
import { paaPart2Questions } from './paaPart2Redaccion';
import { paaPart3Questions } from './paaPart3Matematicas';
import { paaPart4Questions } from './paaPart4Ingles';

export const paaAllQuestions: Question[] = [
  ...paaPart1Questions,
  ...paaPart2Questions,
  ...paaPart3Questions,
  ...paaPart4Questions,
];

export const paaSectionsInfo: SectionInfo[] = [
  {
    id: 1,
    name: 'Lectura',
    fullName: 'Parte 1: Lectura',
    durationMinutes: 50,
    totalQuestions: paaPart1Questions.length,
    description: 'Análisis textual, vocabulario en contexto, inferencias, textos dobles y recursos retóricos.',
  },
  {
    id: 2,
    name: 'Redacción',
    fullName: 'Parte 2: Redacción',
    durationMinutes: 30,
    totalQuestions: paaPart2Questions.length,
    description: 'Cohesión, coherencia textual, precisión léxica, sintaxis y enriquecimiento estilístico.',
  },
  {
    id: 3,
    name: 'Matemáticas',
    fullName: 'Parte 3: Matemáticas',
    durationMinutes: 60,
    totalQuestions: paaPart3Questions.length,
    description: 'Aritmética, álgebra, geometría euclidiana, estadística, probabilidad y reactivos de suplir respuesta.',
  },
  {
    id: 4,
    name: 'Inglés',
    fullName: 'Parte 4: Inglés (ESL)',
    durationMinutes: 40,
    totalQuestions: paaPart4Questions.length,
    description: 'Grammar structures, reading comprehension, vocabulary in context and sentence combining.',
  },
];

export const PAA_PART_DURATIONS: Record<number, number> = {
  1: 50 * 60, // 50 minutos
  2: 30 * 60, // 30 minutos
  3: 60 * 60, // 60 minutos
  4: 40 * 60, // 40 minutos
};

export function calculatePaaSectionScores(answers: Record<string, string>) {
  const p1 = paaPart1Questions.filter(q => answers[q.id] === q.correctAnswer).length;
  const p2 = paaPart2Questions.filter(q => answers[q.id] === q.correctAnswer).length;
  const p3 = paaPart3Questions.filter(q => answers[q.id] === q.correctAnswer).length;
  const p4 = paaPart4Questions.filter(q => answers[q.id] === q.correctAnswer).length;

  return {
    part1: { score: p1, total: paaPart1Questions.length },
    part2: { score: p2, total: paaPart2Questions.length },
    part3: { score: p3, total: paaPart3Questions.length },
    part4: { score: p4, total: paaPart4Questions.length },
  };
}
