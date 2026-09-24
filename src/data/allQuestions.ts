import { Question } from '../types';
import { part1Questions } from './part1Cognoscitiva';
import { part2Questions } from './part2Espanol';
import { part3Questions } from './part3Matematicas';
import { part4Questions } from './part4Ingles';

export const allQuestions: Question[] = [
  ...part1Questions,
  ...part2Questions,
  ...part3Questions,
  ...part4Questions,
];

export interface SectionInfo {
  id: 1 | 2 | 3 | 4;
  name: string;
  fullName: string;
  durationMinutes: number;
  totalQuestions: number;
  description: string;
}

export const sectionsInfo: SectionInfo[] = [
  {
    id: 1,
    name: 'Habilidad Cognoscitiva',
    fullName: 'Parte 1: Habilidad Cognoscitiva',
    durationMinutes: 35,
    totalQuestions: part1Questions.length,
    description: 'Relaciones de orden, analogías, secuencias lógicas, cuadros y razonamiento deducido.',
  },
  {
    id: 2,
    name: 'Español',
    fullName: 'Parte 2: Español',
    durationMinutes: 30,
    totalQuestions: part2Questions.length,
    description: 'Gramática, ortografía, semántica, comprensión de lectura y redacción indirecta.',
  },
  {
    id: 3,
    name: 'Matemáticas',
    fullName: 'Parte 3: Matemáticas',
    durationMinutes: 35,
    totalQuestions: part3Questions.length,
    description: 'Aritmética, álgebra, geometría, probabilidad y estadística.',
  },
  {
    id: 4,
    name: 'Inglés',
    fullName: 'Parte 4: Inglés',
    durationMinutes: 30,
    totalQuestions: part4Questions.length,
    description: 'Grammar, vocabulary, reading comprehension and writing improvement.',
  },
];

export function calculateScore(answers: Record<string, string>, questions = allQuestions) {
  let correct = 0;
  questions.forEach(q => {
    if (answers[q.id] === q.correctAnswer) {
      correct++;
    }
  });
  return correct;
}

export function calculateSectionScores(answers: Record<string, string>) {
  const p1 = part1Questions.filter(q => answers[q.id] === q.correctAnswer).length;
  const p2 = part2Questions.filter(q => answers[q.id] === q.correctAnswer).length;
  const p3 = part3Questions.filter(q => answers[q.id] === q.correctAnswer).length;
  const p4 = part4Questions.filter(q => answers[q.id] === q.correctAnswer).length;

  return {
    part1: { score: p1, total: part1Questions.length },
    part2: { score: p2, total: part2Questions.length },
    part3: { score: p3, total: part3Questions.length },
    part4: { score: p4, total: part4Questions.length },
  };
}
