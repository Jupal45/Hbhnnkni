import React, { useState } from 'react';
import { Filter, ArrowLeft, History, Award, RotateCcw, AlertTriangle, Home } from 'lucide-react';
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

  const examKey = attempt.examType === 'paa' ? 'paa' : 'piense2';
  const examDef = EXAM_DEFINITIONS[examKey];
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
    <div className="min-h-screen w-full flex flex-col justify-between font-serif transition-colors duration-400">
      {/* Liquid Glass Header with Medium Gray Borders & Rounded Corners */}
      <header className="w-full relative z-20 px-4 sm:px-8 py-3">
        <div className="max-w-[1550px] mx-auto glass-panel rounded-2xl px-5 py-3 flex items-center justify-between flex-wrap gap-2 border border-slate-300/80 dark:border-slate-700/80 shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToForm}
              className="flex items-center gap-2 text-xs sm:text-sm font-sans font-bold hover:underline cursor-pointer uppercase tracking-wider btn-dynamic"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Pantalla de Envío</span>
            </button>
            {onBackToMainMenu && (
              <>
                <span className="opacity-40">•</span>
                <button
                  onClick={onBackToMainMenu}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-white/60 dark:hover:bg-slate-800/60 cursor-pointer transition uppercase btn-dynamic"
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
              className="flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-white/60 dark:hover:bg-slate-800/60 cursor-pointer transition uppercase btn-dynamic"
            >
              <History className="w-3.5 h-3.5" />
              <span>Historial</span>
            </button>
            <button
              onClick={onNewFullAttempt}
              className="hidden sm:flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-white/60 dark:hover:bg-slate-800/60 cursor-pointer transition uppercase btn-dynamic"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Nuevo Intento</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Full-Width Content Container with Rounded Corners & Medium Gray Borders */}
      <main className="w-full max-w-[1550px] mx-auto px-4 sm:px-8 py-8 flex-1">
        {/* Passing Recognition Certificate Banner / Component */}
        {isPassing ? (
          <div className="mb-8">
            <div className="glass-panel rounded-2xl p-4 border border-slate-300/80 dark:border-slate-700/80 flex items-center justify-between shadow-sm mb-4">
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-bold text-sm tracking-wide font-sans uppercase">
                  Puntaje Aprobatorio Oficial ({percentage}%) • {attempt.examType === 'paa' ? 'PAA' : examDef.shortTitle}
                </span>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase">
                Aprobado Oficial
              </span>
            </div>
            <TecRecognitionCertificate attempt={attempt} questions={questions} />
          </div>
        ) : (
          /* Notice for student needing more practice: Only advise to retry and review topics */
          <div className="glass-panel rounded-3xl border border-slate-300/80 dark:border-slate-700/80 p-6 sm:p-8 mb-8 font-serif shadow-md">
            <div className="flex items-start gap-4 pb-4 border-b border-slate-300/70 dark:border-slate-700/70">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-500">
                <AlertTriangle className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider block opacity-75">
                  Aviso Oficial • Desempeño Insuficiente
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold uppercase font-sans mt-0.5">
                  Debes volver a intentarlo
                </h2>
                <p className="text-sm mt-1 leading-relaxed opacity-90">
                  Puntaje obtenido: <strong>{score}</strong> de <strong>{total}</strong> reactivos (<strong>{percentage}%</strong>). El puntaje mínimo aprobatorio requerido es del <strong>60%</strong> ({Math.ceil(total * 0.6)} aciertos).
                </p>
              </div>
            </div>

            {/* Recommended topics to review */}
            <div className="mt-5 space-y-3">
              <div className="text-xs sm:text-sm font-sans font-bold uppercase tracking-wide opacity-80">
                Temas clave que debes repasar para tu siguiente intento:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(RECOMMENDED_STUDY_TOPICS[attempt.examType] || RECOMMENDED_STUDY_TOPICS.paa).map((sec, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-300/80 dark:border-slate-700/80 p-4 bg-white/50 dark:bg-slate-800/40">
                    <h3 className="text-xs font-sans font-extrabold uppercase border-b border-slate-300/60 dark:border-slate-700/60 pb-1.5 mb-2 text-indigo-600 dark:text-sky-300">
                      {sec.sectionTitle}
                    </h3>
                    <ul className="space-y-1 text-xs font-serif list-disc pl-4 opacity-90">
                      {sec.topics.map((t, tIdx) => (
                        <li key={tIdx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-300/70 dark:border-slate-700/70 flex flex-wrap gap-2 font-sans">
              <button
                onClick={onNewFullAttempt}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl cursor-pointer transition flex items-center gap-1.5 uppercase btn-dynamic shadow-md"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Presentar Nuevo Intento</span>
              </button>
              {incorrectCount > 0 && (
                <button
                  onClick={onRetryIncorrectOnly}
                  className="rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold px-4 py-2 cursor-pointer transition flex items-center gap-1.5 uppercase btn-dynamic"
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

        {/* Summary Scorecard with Medium Gray Border & Rounded Corners */}
        <div className="glass-panel rounded-3xl border border-slate-300/80 dark:border-slate-700/80 p-6 sm:p-8 mb-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-300/70 dark:border-slate-700/70">
            <div>
              <span className="text-[11px] uppercase font-bold tracking-wider opacity-75 font-mono">
                {attempt.studentOrganization || 'Ninguna'} • {attempt.examType === 'paa' ? 'PAA' : examDef.title}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 font-serif uppercase tracking-tight">
                Desglose Analítico por Secciones
              </h2>
              <p className="text-xs font-sans mt-0.5 opacity-80">
                Aspirante: <strong>{attempt.studentName || 'Aspirante'}</strong> • Tiempo total: {Math.floor(attempt.timeSpentSeconds / 60)} min {attempt.timeSpentSeconds % 60} seg
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap font-sans">
              {onBackToMainMenu && (
                <button
                  onClick={onBackToMainMenu}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-white/60 dark:hover:bg-slate-800/60 text-xs font-bold cursor-pointer transition flex items-center gap-1.5 uppercase btn-dynamic"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Menú de Inicio</span>
                </button>
              )}
              <button
                onClick={onNewFullAttempt}
                className="bg-gradient-to-r from-slate-900 to-indigo-950 dark:from-sky-500 dark:to-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer transition flex items-center gap-1.5 uppercase btn-dynamic shadow-md"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Nuevo Intento (∞)</span>
              </button>
            </div>
          </div>

          {/* Section Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {activeSections.map((sec: SectionInfo) => {
              const secKey = `part${sec.id}` as keyof typeof attempt.sectionScores;
              const secData = attempt.sectionScores[secKey] || { score: 0, total: sec.totalQuestions };
              const secPercent = secData.total > 0 ? Math.round((secData.score / secData.total) * 100) : 0;

              return (
                <div key={sec.id} className="rounded-2xl border border-slate-300/80 dark:border-slate-700/80 p-4 bg-white/60 dark:bg-slate-800/60 shadow-sm">
                  <div className="flex justify-between items-center text-xs font-bold mb-1 font-sans">
                    <span className="uppercase">Parte {sec.id}</span>
                    <span className="font-mono text-base font-extrabold">{secData.score} / {secData.total}</span>
                  </div>
                  <div className="text-xs opacity-75 truncate mb-3 font-serif">{sec.name}</div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 dark:bg-sky-500 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${secPercent}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs font-extrabold mt-2 font-mono opacity-85">
                    {secPercent}% de Aciertos
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Review Filter Bar with Rounded Corners & Medium Gray Border */}
        <div className="glass-panel rounded-2xl border border-slate-300/80 dark:border-slate-700/80 p-4 mb-6 flex flex-wrap items-center justify-between gap-3 font-sans text-xs shadow-sm">
          <div className="flex items-center gap-1.5 font-bold uppercase opacity-85">
            <Filter className="w-4 h-4 text-indigo-500" />
            <span>Filtrar Reactivos para Revisión:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 text-xs rounded-xl border cursor-pointer font-bold uppercase btn-dynamic ${
                filterMode === 'all'
                  ? 'bg-slate-900 dark:bg-sky-500 text-white border-transparent shadow-sm'
                  : 'bg-white/60 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700'
              }`}
            >
              Todos ({total})
            </button>
            <button
              onClick={() => setFilterMode('incorrect')}
              className={`px-3 py-1.5 text-xs rounded-xl border cursor-pointer font-bold uppercase btn-dynamic ${
                filterMode === 'incorrect'
                  ? 'bg-red-600 text-white border-transparent shadow-sm'
                  : 'bg-white/60 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700'
              }`}
            >
              Incorrectos ({incorrectCount})
            </button>
            <button
              onClick={() => setFilterMode('correct')}
              className={`px-3 py-1.5 text-xs rounded-xl border cursor-pointer font-bold uppercase btn-dynamic ${
                filterMode === 'correct'
                  ? 'bg-emerald-600 text-white border-transparent shadow-sm'
                  : 'bg-white/60 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700'
              }`}
            >
              Correctos ({score})
            </button>
            {activeSections.map((sec: SectionInfo) => (
              <button
                key={sec.id}
                onClick={() => setFilterMode(sec.id as any)}
                className={`px-3 py-1.5 text-xs rounded-xl border cursor-pointer font-bold uppercase btn-dynamic ${
                  filterMode === sec.id
                    ? 'bg-indigo-600 text-white border-transparent shadow-sm'
                    : 'bg-white/60 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700'
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

      {/* Footer with Medium Gray Border & Official Slogan */}
      <footer className="w-full border-t border-slate-300/70 dark:border-slate-700/70 py-4 px-4 text-center font-mono text-xs opacity-75">
        CLARIFY • Claridad académica para tu éxito • Desglose Oficial de Reactivos
      </footer>
    </div>
  );
};
