export type AnswerOption = 'A' | 'B' | 'C' | 'D';
export type ExamType = 'piense2' | 'paa';

export interface OptionItem {
  key: AnswerOption;
  text: string;
}

export interface Question {
  id: string;
  part: number;
  partName: string;
  number: number;
  instructions?: string;
  passage?: {
    title?: string;
    text: string;
    lineNumbers?: boolean;
  };
  prompt: string;
  options: OptionItem[];
  correctAnswer: AnswerOption;
  explanation?: string;
  diagramType?: string;
  diagramData?: any;
}

export interface CustomExam {
  id: string;
  title: string;
  subject: string;
  description: string;
  authorName: string;
  sponsoringSchool: string;
  durationMinutes: number;
  createdAt: number;
  questions: Question[];
}

export interface ExamAttempt {
  id: string;
  timestamp: number;
  examType: ExamType;
  customExamTitle?: string;
  studentOrganization?: string;
  studentName: string;
  answers: Record<string, AnswerOption>;
  score: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  sectionScores: {
    part1: { score: number; total: number };
    part2: { score: number; total: number };
    part3: { score: number; total: number };
    part4: { score: number; total: number };
  };
}

export type ViewMode = 'form' | 'submitted' | 'results' | 'history';
export type TestSectionFilter = 'all' | 1 | 2 | 3 | 4;
