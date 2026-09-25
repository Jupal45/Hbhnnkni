import React from 'react';
import { Clock, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { SectionInfo, sectionsInfo as defaultSections } from '../data/allQuestions';

interface StopSignBannerProps {
  currentPart: 1 | 2 | 3 | 4;
  timeRemainingSeconds: number;
  isPartLocked: boolean;
  totalQuestionsInPart: number;
  answeredInPart: number;
  sections?: SectionInfo[];
  examName?: string;
}

export const StopSignBanner: React.FC<StopSignBannerProps> = ({
  currentPart,
  timeRemainingSeconds,
  isPartLocked,
  totalQuestionsInPart,
  answeredInPart,
  sections = defaultSections,
  examName = 'Prueba Estandarizada',
}) => {
  const currentSection = sections.find((s) => s.id === currentPart) || sections[0];
  const formatTime = (secs: number) => {
    const clamped = Math.max(0, secs);
    const m = Math.floor(clamped / 60);
    const s = clamped % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const totalExamMinutes = sections.reduce((acc, s) => acc + s.durationMinutes, 0);
  const totalExamQuestions = sections.reduce((acc, s) => acc + s.totalQuestions, 0);

  return (
    <div className="my-8 glass-panel rounded-3xl border border-slate-300/80 dark:border-slate-700/80 p-6 sm:p-8 shadow-md font-serif">
      {/* Official Exam STOP Header */}
      <div className="text-center border-b border-slate-300/70 dark:border-slate-700/70 pb-5">
        <div className="inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-800 text-white px-6 py-2.5 rounded-2xl mb-3 shadow-md">
          <AlertOctagon className="w-6 h-6 text-amber-400 shrink-0" />
          <span className="text-xl sm:text-2xl font-extrabold tracking-widest uppercase font-mono">
            DETÉNGASE
          </span>
        </div>

        <p className="text-base sm:text-lg font-bold uppercase tracking-wide mt-1 leading-snug">
          NO PASE A LA SIGUIENTE PARTE HASTA QUE SE LE INDIQUE.
        </p>
        <p className="text-xs sm:text-sm opacity-80 italic max-w-xl mx-auto mt-2 leading-relaxed">
          SI TERMINA ANTES DE QUE SE CUMPLA EL TIEMPO REGLAMENTARIO, REPASE SOLAMENTE LAS PREGUNTAS DE ESTA PARTE. NO TRABAJE EN NINGUNA OTRA PARTE NI SE ADELANTE.
        </p>
      </div>

      {/* Timing and Exam Specifications */}
      <div className="mt-5 pt-1 font-sans">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold mb-3 opacity-90">
          <Clock className="w-4 h-4 text-indigo-500" />
          <span>Detalles Reglamentarios de los Tiempos de la {examName}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-4">
          <div className="rounded-xl border border-slate-300/70 dark:border-slate-700/70 p-3 bg-white/50 dark:bg-slate-800/40">
            <span className="text-[10px] uppercase font-bold opacity-75 block font-mono">Sección Actual</span>
            <span className="font-bold text-sm">Parte {currentPart}</span>
            <span className="text-[11px] opacity-75 block truncate font-serif">{currentSection.name}</span>
          </div>

          <div className="rounded-xl border border-slate-300/70 dark:border-slate-700/70 p-3 bg-white/50 dark:bg-slate-800/40">
            <span className="text-[10px] uppercase font-bold opacity-75 block font-mono">Tiempo Restante</span>
            <span className="font-mono text-base font-extrabold text-indigo-600 dark:text-sky-300">{formatTime(timeRemainingSeconds)}</span>
            <span className="text-[11px] opacity-75 block font-serif">de {currentSection.durationMinutes} min asignados</span>
          </div>

          <div className="rounded-xl border border-slate-300/70 dark:border-slate-700/70 p-3 bg-white/50 dark:bg-slate-800/40">
            <span className="text-[10px] uppercase font-bold opacity-75 block font-mono">Progreso de Sección</span>
            <span className="font-mono text-base font-extrabold">{answeredInPart} / {totalQuestionsInPart}</span>
            <span className="text-[11px] opacity-75 block font-serif">
              {answeredInPart === totalQuestionsInPart ? 'Completada' : `${totalQuestionsInPart - answeredInPart} pendientes`}
            </span>
          </div>

          <div className="rounded-xl border border-slate-300/70 dark:border-slate-700/70 p-3 bg-white/50 dark:bg-slate-800/40">
            <span className="text-[10px] uppercase font-bold opacity-75 block font-mono">Estructura Global</span>
            <span className="font-mono text-base font-extrabold">{totalExamQuestions} Reactivos</span>
            <span className="text-[11px] opacity-75 block font-serif">{totalExamMinutes} min totales</span>
          </div>
        </div>

        {/* Section Times Table */}
        <div className="rounded-2xl border border-slate-300/70 dark:border-slate-700/70 overflow-hidden font-mono text-xs">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100/90 dark:bg-slate-800/80 text-left border-b border-slate-300/70 dark:border-slate-700/70">
                <th className="p-2 sm:p-2.5 font-bold">Sección</th>
                <th className="p-2 sm:p-2.5 font-bold">Contenido</th>
                <th className="p-2 sm:p-2.5 font-bold text-center">Reactivos</th>
                <th className="p-2 sm:p-2.5 font-bold text-center">Tiempo</th>
                <th className="p-2 sm:p-2.5 font-bold text-center">Estatus</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((sec) => {
                const isCurrent = sec.id === currentPart;
                const isPast = sec.id < currentPart;

                return (
                  <tr
                    key={sec.id}
                    className={`border-b border-slate-200/70 dark:border-slate-800/70 ${
                      isCurrent
                        ? 'bg-indigo-50/50 dark:bg-sky-950/30 font-bold'
                        : isPast
                        ? 'opacity-65'
                        : 'opacity-85'
                    }`}
                  >
                    <td className="p-2 sm:p-2.5 font-bold">Parte {sec.id}</td>
                    <td className="p-2 sm:p-2.5 font-serif">{sec.name}</td>
                    <td className="p-2 sm:p-2.5 text-center">{sec.totalQuestions}</td>
                    <td className="p-2 sm:p-2.5 text-center">{sec.durationMinutes} min</td>
                    <td className="p-2 sm:p-2.5 text-center">
                      {isCurrent ? (
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] bg-indigo-600 dark:bg-sky-500 text-white font-bold">
                          En Curso
                        </span>
                      ) : isPast ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Concluida
                        </span>
                      ) : (
                        <span className="text-[11px] opacity-60">Bloqueada</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
