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
  const orgName = latestAttempt.studentOrganization || 'Tecnológico de Monterrey';
  const recommendedTopics = RECOMMENDED_STUDY_TOPICS[latestAttempt.examType] || RECOMMENDED_STUDY_TOPICS.paa;
  const minimumPassingScore = Math.ceil(latestAttempt.totalQuestions * 0.6);

  return (
    <div className="min-h-screen w-full bg-white text-black flex flex-col justify-between font-serif">
      {/* 100% White Top Header with Crisp Black Borders */}
      <header className="w-full bg-white text-black border-b-2 border-black py-3 px-4 sm:px-8">
        <div className="max-w-[1550px] mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToMainMenu}
              className="text-xs font-mono font-bold bg-white text-black px-3.5 py-1.5 border-2 border-black hover:bg-black hover:text-white cursor-pointer flex items-center gap-1.5 transition uppercase tracking-wider"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Menú de Inicio</span>
            </button>
            <span className="hidden sm:inline text-black font-mono text-xs">|</span>
            <span className="hidden sm:inline text-xs font-mono uppercase text-black font-semibold">
              {orgName} (Escuela Patrocinadora) • Evaluación Concluida
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-black font-bold">
              Folio: #{latestAttempt.id.slice(-6).toUpperCase()}
            </span>
            <button
              onClick={onOpenHistory}
              className="text-xs font-mono font-bold bg-white text-black px-3 py-1.5 border-2 border-black hover:bg-black hover:text-white cursor-pointer flex items-center gap-1.5 transition uppercase"
            >
              <History className="w-3.5 h-3.5" />
              <span>Historial</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area - 100% White Background */}
      <main className="w-full max-w-[1550px] mx-auto px-4 sm:px-8 py-6 flex-1 flex flex-col justify-center bg-white">
        {!isPassing ? (
          /* =========================================================================
             SI EL USUARIO NO RESPONDE NADA O SACA MENOR QUE LO QUE DEBERÍA:
             SOLO SE LE AVISA QUE LO VUELVA A INTENTAR Y QUE REPASE UNA SERIE DE TEMAS
             ========================================================================= */
          <div className="max-w-4xl mx-auto w-full bg-white border-4 border-black p-6 sm:p-10 font-serif">
            {/* Header of Notice */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-black gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white text-black border-2 border-black flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-black block">
                    Aviso Oficial • Desempeño Insuficiente
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-extrabold uppercase text-black font-serif tracking-tight mt-0.5">
                    Debes volver a intentarlo
                  </h1>
                </div>
              </div>

              <span className="self-start sm:self-auto text-xs font-mono font-bold border-2 border-black px-3 py-1 bg-white text-black uppercase">
                {latestAttempt.score === 0 ? 'Sin Respuestas' : 'Puntaje No Aprobatorio'}
              </span>
            </div>

            {/* Score Summary Box */}
            <div className="my-5 p-4 border-2 border-black bg-white">
              <p className="text-sm sm:text-base font-sans leading-relaxed text-black">
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
              <div className="pb-2 border-b border-black">
                <h2 className="text-base sm:text-lg font-sans font-bold uppercase tracking-wide text-black">
                  Temas recomendados para repasar antes de tu siguiente intento:
                </h2>
                <p className="text-xs text-black font-serif mt-1">
                  Estudia y repasa los siguientes contenidos clave estructurados por cada una de las partes de la prueba:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedTopics.map((sec, idx) => (
                  <div key={idx} className="border-2 border-black p-4 bg-white">
                    <h3 className="text-xs sm:text-sm font-sans font-extrabold uppercase text-black border-b border-black pb-1.5 mb-2.5">
                      {sec.sectionTitle}
                    </h3>
                    <ul className="space-y-1.5 text-xs text-black font-serif list-disc pl-4 leading-relaxed">
                      {sec.topics.map((t, tIdx) => (
                        <li key={tIdx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions for Retry */}
            <div className="mt-8 pt-6 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-3 font-sans">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onNewFullAttempt}
                  className="w-full sm:w-auto bg-white hover:bg-black hover:text-white text-black font-extrabold py-3.5 px-6 border-4 border-black transition flex items-center justify-center gap-2 text-sm cursor-pointer uppercase tracking-wider"
                >
                  <RotateCcw className="w-4 h-4 stroke-[2.5]" />
                  <span>Volver a Intentar la Prueba</span>
                </button>

                {missedCount > 0 && latestAttempt.score > 0 && (
                  <button
                    type="button"
                    onClick={onRetryIncorrectOnly}
                    className="w-full sm:w-auto bg-white hover:bg-black hover:text-white text-black font-bold py-3.5 px-4 border-2 border-black transition flex items-center justify-center gap-1.5 text-xs cursor-pointer uppercase"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Repasar Errores ({missedCount})</span>
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={onBackToMainMenu}
                className="w-full sm:w-auto bg-white hover:bg-black hover:text-white text-black border-2 border-black font-bold py-3 px-5 text-xs transition flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider font-mono"
              >
                <Home className="w-4 h-4" />
                <span>Volver al Menú de Inicio</span>
              </button>
            </div>
          </div>
        ) : (
          /* =========================================================================
             SI EL USUARIO APRUEBA (SCORE >= 60%):
             PANTALLA DE RESULTADOS COMPLETOS, CERTIFICADO Y DESCARGA
             ========================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch w-full">
            {/* LEFT COLUMN: Overview, Folio & Comprehensive Scorecard (7 cols) */}
            <div className="lg:col-span-7 bg-white border-4 border-black p-5 sm:p-7 flex flex-col justify-between">
              <div>
                {/* Header Title Area */}
                <div className="flex items-start justify-between border-b-2 border-black pb-4 mb-4 gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 bg-white text-black border-2 border-black flex items-center justify-center shrink-0">
                      <GraduationCap className="w-8 h-8 stroke-[2]" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-widest text-black font-bold font-mono">
                        {orgName} • Escuela Patrocinadora
                      </span>
                      {/* Strictly "PAA" without any extra details */}
                      <h1 className="text-3xl sm:text-5xl font-extrabold uppercase text-black tracking-tight leading-none mt-0.5">
                        {isPaa ? 'PAA' : 'PIENSE II'}
                      </h1>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-block bg-white text-black font-mono text-xs font-bold px-2.5 py-1 border-2 border-black uppercase">
                      Acreditado
                    </span>
                    <div className="text-[10px] text-black font-mono mt-1">
                      {new Date(latestAttempt.timestamp).toLocaleDateString('es-MX')}
                    </div>
                  </div>
                </div>

                {/* Student Metadata */}
                <div className="text-xs text-black font-serif mb-4 pb-3 border-b-2 border-black flex flex-wrap justify-between gap-2">
                  <div>
                    Aspirante Evaluado: <strong className="text-sm font-sans text-black uppercase underline">{latestAttempt.studentName || 'Aspirante'}</strong>
                  </div>
                  <div className="font-mono text-black font-semibold">
                    Tiempo: {Math.floor(latestAttempt.timeSpentSeconds / 60)}m {latestAttempt.timeSpentSeconds % 60}s
                  </div>
                </div>

                {/* Score KPI Information Box - 100% White with Black Borders */}
                <div className="bg-white border-2 border-black p-4 mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-black uppercase tracking-wider font-bold font-sans">
                        Puntaje Total Registrado
                      </span>
                      <div className="text-4xl sm:text-5xl font-extrabold text-black font-mono leading-none mt-1">
                        {latestAttempt.score}{' '}
                        <span className="text-base font-normal text-black font-serif">
                          de {latestAttempt.totalQuestions} reactivos ({percentage}%)
                        </span>
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <div className="text-[11px] font-mono text-black font-semibold">
                        Escala Estimada {isPaa ? 'PAA' : 'PIENSE II'}:
                      </div>
                      <div className="text-2xl font-bold font-mono text-black">
                        {isPaa
                          ? Math.round(800 + (latestAttempt.score / latestAttempt.totalQuestions) * 800)
                          : Math.round(200 + (latestAttempt.score / latestAttempt.totalQuestions) * 600)}{' '}
                        pts
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 Sections Breakdown Information Boxes */}
                <div>
                  <div className="text-xs font-bold uppercase font-sans tracking-wider text-black mb-2">
                    Desglose de Desempeño por Sección:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs font-serif">
                    <div className="bg-white p-3 border-2 border-black">
                      <div className="text-black text-[10px] font-sans font-bold uppercase">
                        {isPaa ? 'Parte 1: Lectura' : 'Parte 1: Cognoscitiva'}
                      </div>
                      <div className="font-extrabold text-black text-lg font-mono mt-1">
                        {latestAttempt.sectionScores.part1.score} / {latestAttempt.sectionScores.part1.total}
                      </div>
                      <div className="text-[10px] text-black font-mono mt-0.5">
                        {latestAttempt.sectionScores.part1.total > 0
                          ? Math.round((latestAttempt.sectionScores.part1.score / latestAttempt.sectionScores.part1.total) * 100)
                          : 0}%
                      </div>
                    </div>

                    <div className="bg-white p-3 border-2 border-black">
                      <div className="text-black text-[10px] font-sans font-bold uppercase">
                        {isPaa ? 'Parte 2: Redacción' : 'Parte 2: Español'}
                      </div>
                      <div className="font-extrabold text-black text-lg font-mono mt-1">
                        {latestAttempt.sectionScores.part2.score} / {latestAttempt.sectionScores.part2.total}
                      </div>
                      <div className="text-[10px] text-black font-mono mt-0.5">
                        {latestAttempt.sectionScores.part2.total > 0
                          ? Math.round((latestAttempt.sectionScores.part2.score / latestAttempt.sectionScores.part2.total) * 100)
                          : 0}%
                      </div>
                    </div>

                    <div className="bg-white p-3 border-2 border-black">
                      <div className="text-black text-[10px] font-sans font-bold uppercase">
                        Parte 3: Matemáticas
                      </div>
                      <div className="font-extrabold text-black text-lg font-mono mt-1">
                        {latestAttempt.sectionScores.part3.score} / {latestAttempt.sectionScores.part3.total}
                      </div>
                      <div className="text-[10px] text-black font-mono mt-0.5">
                        {latestAttempt.sectionScores.part3.total > 0
                          ? Math.round((latestAttempt.sectionScores.part3.score / latestAttempt.sectionScores.part3.total) * 100)
                          : 0}%
                      </div>
                    </div>

                    <div className="bg-white p-3 border-2 border-black">
                      <div className="text-black text-[10px] font-sans font-bold uppercase">
                        Parte 4: Inglés
                      </div>
                      <div className="font-extrabold text-black text-lg font-mono mt-1">
                        {latestAttempt.sectionScores.part4.score} / {latestAttempt.sectionScores.part4.total}
                      </div>
                      <div className="text-[10px] text-black font-mono mt-0.5">
                        {latestAttempt.sectionScores.part4.total > 0
                          ? Math.round((latestAttempt.sectionScores.part4.score / latestAttempt.sectionScores.part4.total) * 100)
                          : 0}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Note */}
              <div className="mt-4 pt-3 border-t-2 border-black text-[11px] text-black font-serif">
                Calificación oficial registrada con el respaldo académico de la escuela patrocinadora <strong>({orgName})</strong>.
              </div>
            </div>

            {/* RIGHT COLUMN: Export Panel & Direct Action Center (5 cols) */}
            <div className="lg:col-span-5 bg-white border-4 border-black p-5 sm:p-7 flex flex-col justify-between">
              {/* Integrated Download Panel (Only PDF, Word, Docs without details) */}
              <div>
                {questions && questions.length > 0 && (
                  <div className="mb-5">
                    <ExamDownloadPanel
                      attempt={latestAttempt}
                      questions={questions}
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons Hub - 100% White with Black Borders */}
              <div className="space-y-2.5 font-sans pt-3 border-t-2 border-black">
                {/* Primary: View Detailed Results & Certificate */}
                <button
                  onClick={onViewResults}
                  className="w-full bg-white hover:bg-black hover:text-white text-black font-bold py-3.5 px-4 border-2 border-black transition flex items-center justify-center gap-2 text-sm cursor-pointer uppercase tracking-wider"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Reconocimiento y Respuestas</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={onNewFullAttempt}
                    className="bg-white hover:bg-black hover:text-white text-black border-2 border-black font-bold py-2.5 px-3 text-xs transition flex items-center justify-center gap-1.5 cursor-pointer uppercase"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Nuevo Intento (∞)</span>
                  </button>

                  <button
                    onClick={onOpenHistory}
                    className="bg-white hover:bg-black hover:text-white text-black border-2 border-black font-bold py-2.5 px-3 text-xs transition flex items-center justify-center gap-1.5 cursor-pointer uppercase font-mono"
                  >
                    <History className="w-3.5 h-3.5" />
                    <span>Ver Historial</span>
                  </button>
                </div>

                {/* Return to Main Menu button */}
                <button
                  onClick={onBackToMainMenu}
                  className="w-full bg-white hover:bg-black hover:text-white text-black border-2 border-black font-bold py-2.5 px-4 text-xs transition flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider font-mono"
                >
                  <Home className="w-4 h-4" />
                  <span>Volver al Menú de Inicio</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer - 100% White */}
      <footer className="w-full border-t-2 border-black bg-white py-3 px-4 text-center font-mono text-xs text-black">
        SPA • Simulacros De Pruebas Académicas • Escuelas Patrocinadoras • Resultados Oficiales
      </footer>
    </div>
  );
};
