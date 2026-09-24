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
  examName = 'Prueba PIENSE II',
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
    <div className="my-8 bg-white border-4 border-black p-5 sm:p-7 shadow-xs font-serif text-black">
      {/* Official Exam STOP Header */}
      <div className="text-center border-b-2 border-black pb-5">
        <div className="inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-2 mb-3">
          <AlertOctagon className="w-6 h-6 text-white shrink-0" />
          <span className="text-2xl sm:text-3xl font-extrabold tracking-widest uppercase font-mono">
            DETÉNGASE
          </span>
        </div>

        <p className="text-base sm:text-lg font-bold uppercase tracking-wide text-black mt-1 leading-snug">
          NO PASE A LA SIGUIENTE PARTE HASTA QUE SE LE INDIQUE.
        </p>
        <p className="text-xs sm:text-sm text-slate-800 italic max-w-xl mx-auto mt-2 leading-relaxed">
          SI TERMINA ANTES DE QUE SE CUMPLA EL TIEMPO REGLAMENTARIO, REPASE SOLAMENTE LAS PREGUNTAS DE ESTA PARTE. NO TRABAJE EN NINGUNA OTRA PARTE NI SE ADELANTE.
        </p>
      </div>

      {/* Timing and Exam Specifications */}
      <div className="mt-5 pt-1 font-sans">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-black mb-3">
          <Clock className="w-4 h-4 text-black" />
          <span>Detalles Reglamentarios de los Tiempos de la {examName}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Current Part Timing Status */}
          <div className="bg-slate-50 border border-black p-3.5 rounded-none">
            <div className="font-bold text-black mb-1 flex items-center justify-between">
              <span>Tiempo de la Parte {currentPart}: {currentSection.name}</span>
              <span className="font-mono bg-white px-2 py-0.5 border border-black text-black font-bold">
                {currentSection.durationMinutes} min asignados
              </span>
            </div>
            <div className="mt-2 space-y-1 text-slate-900 font-serif">
              <div className="flex justify-between">
                <span>Reactivos en esta parte:</span>
                <strong>{totalQuestionsInPart} preguntas</strong>
              </div>
              <div className="flex justify-between">
                <span>Reactivos respondidos:</span>
                <strong className={answeredInPart === totalQuestionsInPart ? 'text-black underline font-bold' : 'text-slate-800'}>
                  {answeredInPart} de {totalQuestionsInPart}
                </strong>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-slate-300">
                <span>Tiempo restante:</span>
                <span className={`font-mono text-sm font-bold text-black`}>
                  {isPartLocked ? '00:00 (Agotado)' : formatTime(timeRemainingSeconds)}
                </span>
              </div>
              <div className="text-[11px] text-slate-700 mt-2 italic">
                {isPartLocked ? (
                  <span className="text-black font-bold not-italic flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 inline text-black" /> Tiempo completado. Ya puede continuar a la siguiente sección.
                  </span>
                ) : (
                  <span>
                    El avance estará habilitado al cumplirse el tiempo reglamentario de esta parte (o puede usar el botón superior <strong>"Adelantar timer"</strong>).
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Full Exam Structure and Timing Overview */}
          <div className="bg-slate-50 border border-black p-3.5 rounded-none">
            <div className="font-bold text-black mb-1 flex items-center justify-between">
              <span>Estructura Global del Simulacro</span>
              <span className="font-mono bg-black text-white px-2 py-0.5 font-bold">
                Total: {totalExamMinutes} min
              </span>
            </div>
            <ul className="mt-2 space-y-1.5 text-black font-serif">
              {sections.map((sec) => {
                const isThis = sec.id === currentPart;
                const isDone = sec.id < currentPart;
                return (
                  <li
                    key={sec.id}
                    className={`flex items-center justify-between px-2 py-1 text-[11px] ${
                      isThis
                        ? 'bg-slate-200 border border-black font-bold text-black'
                        : isDone
                        ? 'text-slate-500 line-through'
                        : 'text-slate-800'
                    }`}
                  >
                    <span>
                      Parte {sec.id}: {sec.name} ({sec.totalQuestions} reactivos)
                    </span>
                    <span className="font-mono font-semibold">{sec.durationMinutes} min</span>
                  </li>
                );
              })}
            </ul>
            <div className="text-[10px] text-slate-600 mt-2 border-t border-slate-300 pt-1 font-sans">
              Evaluación oficial estandarizada • {totalExamQuestions} reactivos en 4 partes cronometradas consecutivas.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
