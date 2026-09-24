import React, { useState } from 'react';
import { Filter, ArrowLeft, History, Award, BookOpen, RotateCcw, AlertTriangle, Home } from 'lucide-react';
import { Question, ExamAttempt } from '../types';
import { QuestionCard } from './QuestionCard';
import { SectionInfo, sectionsInfo as defaultSections } from '../data/allQuestions';
import { TecRecognitionCertificate } from './TecRecognitionCertificate';
import { ExamDownloadPanel } from './ExamDownloadPanel';
import { EXAM_DEFINITIONS, RECOMMENDED_STUDY_TOPICS } from '../data/examConfig';

interface ResultsViewProps {
  questions: Question[];
  attempt: ExamAttempt;
  sections?: SectionInfo[];
  onNewFullAttempt: () => void;
  onRetryIncorrectOnly: () => void;
  onOpenHistory: () => void;
  onBackToForm: () => void;
  onBackToMainMenu?: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  questions,
  attempt,
  sections,
  onNewFullAttempt,
  onRetryIncorrectOnly,
  onOpenHistory,
  onBackToForm,
  onBackToMainMenu,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'incorrect' | 'correct' | 1 | 2 | 3 | 4>('all');

  const examDef = EXAM_DEFINITIONS[attempt.examType || 'piense2'];
  const activeSections = sections || examDef.sections || defaultSections;

  const total = attempt.totalQuestions;
  const score = attempt.score;
  const percentage = Math.round((score / total) * 100);
  const incorrectCount = total - score;
  const isPassing = percentage >= 60;

  const filteredQuestions = questions.filter((q) => {
    const isCorrect = attempt.answers[q.id] === q.correctAnswer;
    if (filterMode === 'all') return true;
    if (filterMode === 'incorrect') return !isCorrect;
    if (filterMode === 'correct') return isCorrect;
    if (typeof filterMode === 'number') return q.part === filterMode;
    return true;
  });

  return (
    <div className="min-h-screen w-full bg-white text-black flex flex-col justify-between font-serif">
      {/* 100% White Top Bar */}
      <header className="w-full bg-white text-black border-b-2 border-black py-4 px-4 sm:px-8">
        <div className="max-w-[1550px] mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToForm}
              className="flex items-center gap-2 text-xs sm:text-sm font-sans font-bold text-black hover:underline cursor-pointer uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Pantalla de Envío</span>
            </button>
            {onBackToMainMenu && (
              <>
                <span className="text-black">•</span>
                <button
                  onClick={onBackToMainMenu}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold bg-white text-black px-3 py-1.5 border-2 border-black hover:bg-black hover:text-white cursor-pointer transition uppercase"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Menú de Inicio</span>
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenHistory}
              className="flex items-center gap-1.5 text-xs font-mono font-bold bg-white text-black px-3 py-1.5 border-2 border-black hover:bg-black hover:text-white cursor-pointer transition uppercase"
            >
              <History className="w-3.5 h-3.5" />
              <span>Historial</span>
            </button>
            <button
              onClick={onNewFullAttempt}
              className="hidden sm:flex items-center gap-1.5 text-xs font-mono font-bold bg-white text-black px-3 py-1.5 border-2 border-black hover:bg-black hover:text-white cursor-pointer transition uppercase"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Nuevo Intento</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Full-Width Content Container */}
      <main className="w-full max-w-[1550px] mx-auto px-4 sm:px-8 py-8 flex-1">
        {/* Passing Recognition Certificate Banner / Component */}
        {isPassing ? (
          <div className="mb-8">
            <div className="bg-white text-black p-4 border-2 border-black flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-black" />
                <span className="font-bold text-sm tracking-wide font-sans uppercase">
                  Puntaje Aprobatorio Oficial ({percentage}%) • {attempt.examType === 'paa' ? 'PAA' : examDef.shortTitle}
                </span>
              </div>
              <span className="text-xs bg-white text-black font-mono font-bold px-3 py-0.5 border-2 border-black uppercase">
                Aprobado Oficial
              </span>
            </div>
            <TecRecognitionCertificate attempt={attempt} questions={questions} />
          </div>
        ) : (
          /* Notice for student needing more practice: Only advise to retry and review topics */
          <div className="bg-white border-4 border-black p-6 mb-8 font-serif">
            <div className="flex items-start gap-4 pb-4 border-b-2 border-black">
              <div className="w-12 h-12 bg-white text-black border-2 border-black flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-black block">
                  Aviso Oficial • Desempeño Insuficiente
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-black font-sans mt-0.5">
                  Debes volver a intentarlo
                </h2>
                <p className="text-sm text-black mt-1 leading-relaxed">
                  Puntaje obtenido: <strong>{score}</strong> de <strong>{total}</strong> reactivos (<strong>{percentage}%</strong>). El puntaje mínimo aprobatorio requerido es del <strong>60%</strong> ({Math.ceil(total * 0.6)} aciertos).
                </p>
              </div>
            </div>

            {/* Recommended topics to review */}
            <div className="mt-5 space-y-3">
              <div className="text-xs sm:text-sm font-sans font-bold uppercase tracking-wide text-black">
                Temas clave que debes repasar para tu siguiente intento:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(RECOMMENDED_STUDY_TOPICS[attempt.examType] || RECOMMENDED_STUDY_TOPICS.paa).map((sec, idx) => (
                  <div key={idx} className="border-2 border-black p-3 bg-white">
                    <h3 className="text-xs font-sans font-extrabold uppercase text-black border-b border-black pb-1 mb-2">
                      {sec.sectionTitle}
                    </h3>
                    <ul className="space-y-1 text-xs text-black font-serif list-disc pl-4">
                      {sec.topics.map((t, tIdx) => (
                        <li key={tIdx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-black flex flex-wrap gap-2 font-sans">
              <button
                onClick={onNewFullAttempt}
                className="bg-white hover:bg-black hover:text-white text-black text-xs font-extrabold px-5 py-2.5 border-4 border-black cursor-pointer transition flex items-center gap-1.5 uppercase"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Presentar Nuevo Intento de la Prueba</span>
              </button>
              {incorrectCount > 0 && (
                <button
                  onClick={onRetryIncorrectOnly}
                  className="bg-white hover:bg-black hover:text-white text-black border-2 border-black text-xs font-bold px-4 py-2 cursor-pointer transition flex items-center gap-1.5 uppercase"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Repasar Solo Errores ({incorrectCount})</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Download Solved Exam & Certificate Panel (Only shown if passing) */}
        {isPassing && (
          <ExamDownloadPanel
            attempt={attempt}
            questions={questions}
            className="mb-8"
          />
        )}

        {/* Summary Scorecard */}
        <div className="bg-white border-4 border-black p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
            <div>
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-600 font-mono">
                {attempt.studentOrganization || 'Institución Oficial'} • {attempt.examType === 'paa' ? 'PAA' : examDef.title}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black mt-1 font-serif uppercase">
                Desglose Analítico por Secciones
              </h2>
              <p className="text-xs text-slate-700 font-sans mt-0.5">
                Aspirante: <strong>{attempt.studentName || 'Aspirante'}</strong> • Tiempo total: {Math.floor(attempt.timeSpentSeconds / 60)} min {attempt.timeSpentSeconds % 60} seg
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {onBackToMainMenu && (
                <button
                  onClick={onBackToMainMenu}
                  className="bg-white hover:bg-black hover:text-white text-black text-xs font-bold px-4 py-2 border-2 border-black cursor-pointer transition flex items-center gap-1.5 font-sans uppercase"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Menú de Inicio</span>
                </button>
              )}
              <button
                onClick={onNewFullAttempt}
                className="bg-black hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 border-2 border-black cursor-pointer transition flex items-center gap-1.5 font-sans uppercase"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Nuevo Intento (∞)</span>
              </button>
            </div>
          </div>

          {/* Section Breakdown Cards - Monochrome */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {activeSections.map((sec) => {
              const secKey = `part${sec.id}` as keyof typeof attempt.sectionScores;
              const secData = attempt.sectionScores[secKey] || { score: 0, total: sec.totalQuestions };
              const secPercent = secData.total > 0 ? Math.round((secData.score / secData.total) * 100) : 0;

              return (
                <div key={sec.id} className="border-2 border-black p-4 bg-white">
                  <div className="flex justify-between items-center text-xs font-bold mb-1 font-sans">
                    <span className="uppercase">Parte {sec.id}</span>
                    <span className="font-mono text-base font-extrabold">{secData.score} / {secData.total}</span>
                  </div>
                  <div className="text-xs text-slate-700 truncate mb-3 font-serif">{sec.name}</div>
                  <div className="w-full bg-slate-200 h-2.5 border border-black overflow-hidden">
                    <div
                      className="bg-black h-2.5 transition-all duration-300"
                      style={{ width: `${secPercent}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs font-extrabold text-black mt-2 font-mono">
                    {secPercent}% de Aciertos
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Review Filter Bar - 100% Monochrome */}
        <div className="bg-white border-2 border-black p-4 mb-6 flex flex-wrap items-center justify-between gap-3 font-sans text-xs">
          <div className="flex items-center gap-1.5 font-bold uppercase text-black">
            <Filter className="w-4 h-4" />
            <span>Filtrar Reactivos para Revisión:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 text-xs border-2 cursor-pointer font-bold uppercase ${
                filterMode === 'all'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-black hover:bg-slate-100'
              }`}
            >
              Todos ({total})
            </button>
            <button
              onClick={() => setFilterMode('incorrect')}
              className={`px-3 py-1.5 text-xs border-2 cursor-pointer font-bold uppercase ${
                filterMode === 'incorrect'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-black hover:bg-slate-100'
              }`}
            >
              Incorrectos ({incorrectCount})
            </button>
            <button
              onClick={() => setFilterMode('correct')}
              className={`px-3 py-1.5 text-xs border-2 cursor-pointer font-bold uppercase ${
                filterMode === 'correct'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-black hover:bg-slate-100'
              }`}
            >
              Correctos ({score})
            </button>
            {activeSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setFilterMode(sec.id as any)}
                className={`px-3 py-1.5 text-xs border-2 cursor-pointer font-bold uppercase ${
                  filterMode === sec.id
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black hover:bg-slate-100'
                }`}
              >
                Parte {sec.id}
              </button>
            ))}
          </div>
        </div>

        {/* Questions list in review mode */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              selectedAnswer={attempt.answers[q.id]}
              onSelectAnswer={() => {}}
              isReviewMode={true}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t-2 border-black bg-white py-4 px-4 text-center font-mono text-xs text-slate-600">
        Tecnológico de Monterrey • PrepaTec • Organizaciones Estudiantiles • Desglose Oficial de Reactivos
      </footer>
    </div>
  );
};
