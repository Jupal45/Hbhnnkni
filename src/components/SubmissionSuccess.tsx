import React from 'react';
import { Eye, RotateCcw, AlertTriangle, GraduationCap, History, ArrowRight, Home } from 'lucide-react';
import { ExamAttempt, Question } from '../types';
import { ExamDownloadPanel } from './ExamDownloadPanel';
import { RECOMMENDED_STUDY_TOPICS } from '../data/examConfig';

interface SubmissionSuccessProps {
  latestAttempt: ExamAttempt;
  questions?: Question[];
  onViewResults: () => void;
  onNewFullAttempt: () => void;
  onRetryIncorrectOnly: () => void;
  onOpenHistory: () => void;
  onBackToMainMenu: () => void;
}

export const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({
  latestAttempt,
  questions,
  onViewResults,
  onNewFullAttempt,
  onRetryIncorrectOnly,
  onOpenHistory,
  onBackToMainMenu,
}) => {
  const percentage = Math.round((latestAttempt.score / latestAttempt.totalQuestions) * 100);
  const missedCount = latestAttempt.totalQuestions - latestAttempt.score;
  const isPassing = percentage >= 60;
  const isPaa = latestAttempt.examType === 'paa';
  const orgName = latestAttempt.studentOrganization || 'Ninguna';
  const recommendedTopics = RECOMMENDED_STUDY_TOPICS[latestAttempt.examType] || RECOMMENDED_STUDY_TOPICS.paa;
  const minimumPassingScore = Math.ceil(latestAttempt.totalQuestions * 0.6);

  return (
    <div className="min-h-screen w-full flex flex-col justify-between font-serif">
      {/* Top Header with Rounded Corners & Medium Gray Border */}
      <header className="w-full relative z-20 px-4 sm:px-8 py-3">
        <div className="max-w-[1550px] mx-auto glass-panel rounded-2xl px-5 py-3 flex items-center justify-between gap-3 border border-slate-300/80 dark:border-slate-700/80 shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToMainMenu}
              className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center gap-1.5 transition uppercase tracking-wider btn-dynamic"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Menú de Inicio</span>
            </button>
            <span className="hidden sm:inline opacity-40 font-mono text-xs">|</span>
            <span className="hidden sm:inline text-xs font-mono uppercase font-semibold opacity-80">
              Escuela Patrocinadora: {orgName} • Evaluación Concluida
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold opacity-80">
              Folio: #{latestAttempt.id.slice(-6).toUpperCase()}
            </span>
            <button
              onClick={onOpenHistory}
              className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center gap-1.5 transition uppercase btn-dynamic"
            >
              <History className="w-3.5 h-3.5" />
              <span>Historial</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-[1550px] mx-auto px-4 sm:px-8 py-6 flex-1 flex flex-col justify-center">
        {!isPassing ? (
          /* =========================================================================
             SI EL USUARIO NO RESPONDE NADA O SACA MENOR QUE LO QUE DEBERÍA:
             SOLO SE LE AVISA QUE LO VUELVA A INTENTAR Y QUE REPASE UNA SERIE DE TEMAS
             ========================================================================= */
          <div className="max-w-4xl mx-auto w-full glass-panel rounded-3xl border border-slate-300/80 dark:border-slate-700/80 p-6 sm:p-10 font-serif shadow-xl">
            {/* Header of Notice */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-300/70 dark:border-slate-700/70 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-500">
                  <AlertTriangle className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest block opacity-75">
                    Aviso Oficial • Desempeño Insuficiente
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-extrabold uppercase font-serif tracking-tight mt-0.5">
                    Debes volver a intentarlo
                  </h1>
                </div>
              </div>

              <span className="self-start sm:self-auto text-xs font-mono font-bold border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1 bg-white/60 dark:bg-slate-800/60 uppercase">
                {latestAttempt.score === 0 ? 'Sin Respuestas' : 'Puntaje No Aprobatorio'}
              </span>
            </div>

            {/* Score Summary Box */}
            <div className="my-5 p-4 rounded-2xl border border-slate-300/80 dark:border-slate-700/80 bg-white/50 dark:bg-slate-800/40">
              <p className="text-sm sm:text-base font-sans leading-relaxed opacity-90">
                {latestAttempt.score === 0 ? (
                  <>No se registraron aciertos suficientes en esta aplicación de la prueba <strong>{isPaa ? 'PAA' : 'PIENSE II'}</strong>.</>
                ) : (
                  <>
                    Has obtenido un puntaje de <strong>{latestAttempt.score}</strong> de <strong>{latestAttempt.totalQuestions}</strong> reactivos (<strong>{percentage}%</strong>).
                  </>
                )}{' '}
                El puntaje mínimo requerido para obtener la acreditación oficial es del <strong>60%</strong> ({minimumPassingScore} aciertos).
              </p>
            </div>

            {/* Review Topics Section */}
            <div className="space-y-4">
              <div className="pb-2 border-b border-slate-300/70 dark:border-slate-700/70">
                <h2 className="text-base sm:text-lg font-sans font-bold uppercase tracking-wide">
                  Temas recomendados para repasar antes de tu siguiente intento:
                </h2>
                <p className="text-xs opacity-75 font-serif mt-0.5">
                  Estudia y refuerza los siguientes conceptos clave de cada sección para superar con éxito la prueba:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedTopics.map((sec, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-300/80 dark:border-slate-700/80 p-4 bg-white/50 dark:bg-slate-800/40 shadow-sm">
                    <h3 className="text-xs font-sans font-extrabold uppercase border-b border-slate-300/60 dark:border-slate-700/60 pb-1.5 mb-2 text-indigo-600 dark:text-sky-300">
                      {sec.sectionTitle}
                    </h3>
                    <ul className="space-y-1.5 text-xs font-serif list-disc pl-4 opacity-90 leading-relaxed">
                      {sec.topics.map((topic, tIdx) => (
                        <li key={tIdx}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Retry Action Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-300/70 dark:border-slate-700/70 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onNewFullAttempt}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-6 py-3 rounded-2xl cursor-pointer transition flex items-center justify-center gap-2 text-sm uppercase tracking-wider btn-dynamic shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Volver a Intentarlo Ahora</span>
                </button>

                {missedCount > 0 && (
                  <button
                    type="button"
                    onClick={onRetryIncorrectOnly}
                    className="w-full sm:w-auto rounded-2xl border border-slate-300 dark:border-slate-700 px-4 py-3 text-xs font-bold cursor-pointer transition flex items-center justify-center gap-1.5 uppercase btn-dynamic"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Repasar Errores ({missedCount})</span>
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={onViewResults}
                className="w-full sm:w-auto text-xs text-indigo-600 dark:text-sky-400 hover:underline flex items-center justify-center gap-1 cursor-pointer font-bold uppercase"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Ver Examen y Explicaciones Detalladas</span>
              </button>
            </div>
          </div>
        ) : (
          /* =========================================================================
             USUARIO APROBADO CON ALTO DESEMPEÑO
             ========================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Official Scorecard with Rounded Corners */}
            <div className="lg:col-span-7 glass-panel rounded-3xl border border-slate-300/80 dark:border-slate-700/80 p-6 sm:p-8 font-serif shadow-xl flex flex-col justify-between">
              <div>
                {/* Header Title Area */}
                <div className="flex items-start justify-between border-b border-slate-300/70 dark:border-slate-700/70 pb-4 mb-4 gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 flex items-center justify-center shrink-0 shadow-sm">
                      <GraduationCap className="w-8 h-8 stroke-[2] text-indigo-600 dark:text-sky-400" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-widest font-bold font-mono opacity-75">
                        Escuela Patrocinadora: {orgName}
                      </span>
                      <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-none mt-0.5">
                        {latestAttempt.customExamTitle || (isPaa ? 'PAA' : 'PIENSE II')}
                      </h1>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-block rounded-xl font-mono text-xs font-bold px-3 py-1 border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase">
                      Acreditado
                    </span>
                    <div className="text-[10px] font-mono mt-1 opacity-75">
                      {new Date(latestAttempt.timestamp).toLocaleDateString('es-MX')}
                    </div>
                  </div>
                </div>

                {/* Student Metadata */}
                <div className="text-xs font-serif mb-4 pb-3 border-b border-slate-300/70 dark:border-slate-700/70 flex flex-wrap justify-between gap-2 opacity-90">
                  <div>
                    Aspirante Evaluado: <strong className="text-sm font-sans uppercase underline">{latestAttempt.studentName || 'Aspirante'}</strong>
                  </div>
                  <div className="font-mono font-semibold">
                    Tiempo: {Math.floor(latestAttempt.timeSpentSeconds / 60)}m {latestAttempt.timeSpentSeconds % 60}s
                  </div>
                </div>

                {/* Score KPI Box */}
                <div className="rounded-2xl border border-slate-300/80 dark:border-slate-700/80 bg-white/50 dark:bg-slate-800/40 p-4 mb-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-bold font-sans opacity-75">
                        Puntaje Total Registrado
                      </span>
                      <div className="text-4xl sm:text-5xl font-extrabold font-mono leading-none mt-1">
                        {latestAttempt.score}{' '}
                        <span className="text-base font-normal font-serif opacity-80">
                          de {latestAttempt.totalQuestions} reactivos ({percentage}%)
                        </span>
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <div className="text-[11px] font-mono font-semibold opacity-75">
                        Escala Estimada {isPaa ? 'PAA' : 'PIENSE II'}:
                      </div>
                      <div className="text-2xl font-bold font-mono text-indigo-600 dark:text-sky-300">
                        {isPaa
                          ? Math.round(800 + (latestAttempt.score / latestAttempt.totalQuestions) * 800)
                          : Math.round(200 + (latestAttempt.score / latestAttempt.totalQuestions) * 600)}{' '}
                        pts
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 Sections Breakdown */}
                <div>
                  <div className="text-xs font-bold uppercase font-sans tracking-wider mb-2 opacity-80">
                    Desglose de Desempeño por Sección:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs font-serif">
                    <div className="rounded-2xl p-3 border border-slate-300/70 dark:border-slate-700/70 bg-white/50 dark:bg-slate-800/40">
                      <div className="text-[10px] font-sans font-bold uppercase opacity-75">
                        {isPaa ? 'Parte 1: Lectura' : 'Parte 1: Cognoscitiva'}
                      </div>
                      <div className="font-extrabold text-lg font-mono mt-1">
                        {latestAttempt.sectionScores.part1.score} / {latestAttempt.sectionScores.part1.total}
                      </div>
                    </div>

                    <div className="rounded-2xl p-3 border border-slate-300/70 dark:border-slate-700/70 bg-white/50 dark:bg-slate-800/40">
                      <div className="text-[10px] font-sans font-bold uppercase opacity-75">
                        {isPaa ? 'Parte 2: Redacción' : 'Parte 2: Español'}
                      </div>
                      <div className="font-extrabold text-lg font-mono mt-1">
                        {latestAttempt.sectionScores.part2.score} / {latestAttempt.sectionScores.part2.total}
                      </div>
                    </div>

                    <div className="rounded-2xl p-3 border border-slate-300/70 dark:border-slate-700/70 bg-white/50 dark:bg-slate-800/40">
                      <div className="text-[10px] font-sans font-bold uppercase opacity-75">
                        Parte 3: Matemáticas
                      </div>
                      <div className="font-extrabold text-lg font-mono mt-1">
                        {latestAttempt.sectionScores.part3.score} / {latestAttempt.sectionScores.part3.total}
                      </div>
                    </div>

                    <div className="rounded-2xl p-3 border border-slate-300/70 dark:border-slate-700/70 bg-white/50 dark:bg-slate-800/40">
                      <div className="text-[10px] font-sans font-bold uppercase opacity-75">
                        Parte 4: Inglés
                      </div>
                      <div className="font-extrabold text-lg font-mono mt-1">
                        {latestAttempt.sectionScores.part4.score} / {latestAttempt.sectionScores.part4.total}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="mt-8 pt-5 border-t border-slate-300/70 dark:border-slate-700/70 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans">
                <button
                  type="button"
                  onClick={onViewResults}
                  className="w-full sm:w-auto bg-gradient-to-r from-slate-900 to-indigo-950 dark:from-sky-500 dark:to-indigo-600 text-white font-extrabold px-6 py-3 rounded-2xl cursor-pointer transition flex items-center justify-center gap-2 text-xs uppercase tracking-wider btn-dynamic btn-glow-primary shadow-md"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Examen Resuelto y Justificación</span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onNewFullAttempt}
                    className="flex-1 sm:flex-none rounded-2xl border border-slate-300 dark:border-slate-700 px-4 py-3 text-xs font-bold cursor-pointer transition flex items-center justify-center gap-1.5 uppercase btn-dynamic"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Nuevo Intento</span>
                  </button>

                  {missedCount > 0 && (
                    <button
                      type="button"
                      onClick={onRetryIncorrectOnly}
                      className="flex-1 sm:flex-none rounded-2xl border border-slate-300 dark:border-slate-700 px-4 py-3 text-xs font-bold cursor-pointer transition flex items-center justify-center gap-1.5 uppercase btn-dynamic"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Repasar Errores ({missedCount})</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Download & Export Panel */}
            <div className="lg:col-span-5 space-y-5">
              <ExamDownloadPanel
                attempt={latestAttempt}
                questions={questions || []}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full relative z-20 py-4 px-6 text-center font-mono text-xs opacity-75">
        CLARIFY • Evaluación inteligente para tu éxito • Folio #{latestAttempt.id.slice(-6).toUpperCase()}
      </footer>
    </div>
  );
};
