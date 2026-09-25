import React from 'react';
import { Award, Printer, GraduationCap, Download, FileText } from 'lucide-react';
import { ExamAttempt, Question } from '../types';
import { downloadOrPrintPdf, downloadExamAsWord, downloadExamForGoogleDocs } from '../utils/exportExamDocument';

interface TecRecognitionCertificateProps {
  attempt: ExamAttempt;
  questions?: Question[];
}

export const TecRecognitionCertificate: React.FC<TecRecognitionCertificateProps> = ({ attempt, questions }) => {
  const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
  const isPaa = attempt.examType === 'paa';
  const examTitle = attempt.customExamTitle || (isPaa ? 'PAA' : 'PIENSE II');
  const orgName = attempt.studentOrganization || 'Ninguna';
  const estimatedScale = isPaa 
    ? Math.round(800 + (attempt.score / attempt.totalQuestions) * 800) // 800 - 1600 PAA scale
    : Math.round(200 + (attempt.score / attempt.totalQuestions) * 600); // 200 - 800 PIENSE scale

  const dateStr = new Date(attempt.timestamp).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="my-6 w-full print:m-0 print:p-0">
      {/* Certificate Outer Border Frame with Rounded Corners & Medium Gray Border */}
      <div className="glass-panel rounded-3xl border-4 border-slate-400 dark:border-slate-600 p-6 sm:p-10 shadow-xl relative overflow-hidden print:border-4 print:border-black print:m-0 print:p-4 print:break-inside-avoid print:max-h-[960px]">
        {/* Subtle Watermark Background - Graduation Cap */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
          <svg viewBox="0 0 24 24" className="w-96 h-96 fill-none stroke-current stroke-[1.5]">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </div>

        {/* Certificate Inner Border with Rounded Corners */}
        <div className="border border-slate-300 dark:border-slate-700 rounded-2xl p-5 sm:p-7 text-center relative z-10 bg-white/70 dark:bg-slate-900/70 print:p-4 print:bg-white">
          {/* Header Institutional Branding */}
          <div className="flex flex-col items-center mb-4">
            {/* Logo: Graduation Cap */}
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center mb-2.5 border border-slate-300 dark:border-slate-600 shadow-sm">
              <GraduationCap className="w-10 h-10 stroke-[2] text-indigo-600 dark:text-sky-400" />
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold tracking-widest uppercase font-sans">
              CLARIFY • RECONOCIMIENTO OFICIAL
            </h2>
            <div className="w-20 h-1 bg-indigo-500 rounded-full mt-2 mb-1"></div>
            <p className="text-[11px] sm:text-xs tracking-wider font-semibold uppercase font-mono opacity-80">
              Escuela Patrocinadora: {orgName} • Evaluación Estandarizada
            </p>
          </div>

          {/* Certificate Main Title */}
          <div className="my-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif uppercase">
              RECONOCIMIENTO DE ALTO DESEMPEÑO
            </h3>
            <p className="text-xs sm:text-sm mt-1 italic font-serif opacity-80">
              CLARIFY y la Escuela Patrocinadora ({orgName}) otorgan el presente reconocimiento a:
            </p>
          </div>

          {/* Student Name */}
          <div className="my-4 border-b-2 border-slate-400 dark:border-slate-600 pb-1.5 max-w-lg mx-auto">
            <h1 className="text-2xl sm:text-4xl font-bold tracking-wide font-serif">
              {attempt.studentName || 'Aspirante Destacado'}
            </h1>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-serif my-3 opacity-90">
            Por haber acreditado con <strong>calificación aprobatoria y destacada</strong> la evaluación oficial
            estandarizada <strong>{examTitle}</strong>, demostrando sobresaliente capacidad de razonamiento crítico,
            habilidades analíticas y aptitud académica con el respaldo de la institución evaluadora.
          </p>

          {/* Scores Summary Badge */}
          <div className="my-4 max-w-xl mx-auto rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div>
              <div className="text-[10px] uppercase font-bold font-sans opacity-75">{isPaa ? 'Lectura' : 'Cognoscitiva'}</div>
              <div className="font-extrabold text-sm font-mono">{attempt.sectionScores.part1.score} / {attempt.sectionScores.part1.total}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold font-sans opacity-75">{isPaa ? 'Redacción' : 'Español'}</div>
              <div className="font-extrabold text-sm font-mono">{attempt.sectionScores.part2.score} / {attempt.sectionScores.part2.total}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold font-sans opacity-75">Matemáticas</div>
              <div className="font-extrabold text-sm font-mono">{attempt.sectionScores.part3.score} / {attempt.sectionScores.part3.total}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold font-sans opacity-75">Inglés</div>
              <div className="font-extrabold text-sm font-mono">{attempt.sectionScores.part4.score} / {attempt.sectionScores.part4.total}</div>
            </div>
          </div>

          <div className="text-center mb-4">
            <span className="inline-block rounded-xl bg-white/80 dark:bg-slate-800/80 text-xs sm:text-sm font-bold px-4 py-1.5 font-mono uppercase border border-slate-300 dark:border-slate-600 shadow-sm">
              Puntaje Total: {attempt.score} / {attempt.totalQuestions} ({percentage}%) • Escala {isPaa ? 'PAA' : 'PIENSE II'}: {estimatedScale} / {isPaa ? '1600' : '800'} pts
            </span>
          </div>

          {/* Signatures & Seal */}
          <div className="mt-6 pt-4 border-t border-slate-300 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div className="text-center">
              <div className="font-serif italic text-sm border-b border-slate-300 dark:border-slate-600 pb-1 mx-4 font-semibold">
                Dirección de la Escuela Patrocinadora
              </div>
              <p className="text-[10px] mt-1 uppercase font-mono opacity-80">{orgName}</p>
            </div>

            {/* Institutional Seal with Rounded Border */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full border-2 border-slate-400 dark:border-slate-600 flex flex-col items-center justify-center shadow-inner">
                <GraduationCap className="w-6 h-6 stroke-[2] text-indigo-600 dark:text-sky-400" />
                <span className="text-[8px] font-bold uppercase tracking-tighter mt-0.5 font-mono">Acreditado</span>
                <span className="text-[7px] font-semibold uppercase opacity-75">CLARIFY Oficial</span>
              </div>
              <span className="text-[9px] mt-1 font-mono opacity-75">Folio: #{attempt.id.slice(-6).toUpperCase()}</span>
            </div>

            <div className="text-center">
              <div className="font-serif text-sm border-b border-slate-300 dark:border-slate-600 pb-1 mx-4 font-semibold">
                {dateStr}
              </div>
              <p className="text-[10px] mt-1 uppercase font-mono opacity-80">Fecha de Acreditación</p>
            </div>
          </div>
        </div>
      </div>

      {/* Print / Download Button Row */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 print:hidden font-sans">
        <div className="text-xs opacity-75 font-serif">
          Documento con valor diagnóstico y constancia emitida con respaldo institucional.
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold px-4 py-2 cursor-pointer transition uppercase btn-dynamic shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Reconocimiento</span>
          </button>
        </div>
      </div>
    </div>
  );
};
