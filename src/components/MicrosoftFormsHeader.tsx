import React from 'react';
import { Clock, Lock, CheckCircle2, FastForward, RotateCcw } from 'lucide-react';
import { SectionInfo, sectionsInfo as defaultSections } from '../data/allQuestions';

interface HeaderProps {
  currentPart: 1 | 2 | 3 | 4;
  timeRemainingSeconds: number;
  isPartLocked: boolean;
  sections?: SectionInfo[];
  examShortTitle?: string;
  onDevFastForward?: () => void;
  onResetTest?: () => void;
}

export const MicrosoftFormsHeader: React.FC<HeaderProps> = ({
  currentPart,
  timeRemainingSeconds,
  isPartLocked,
  sections = defaultSections,
  examShortTitle,
  onDevFastForward,
  onResetTest,
}) => {
  const formatTime = (secs: number) => {
    const clamped = Math.max(0, secs);
    const m = Math.floor(clamped / 60);
    const s = clamped % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isWarningTime = timeRemainingSeconds > 0 && timeRemainingSeconds <= 120;
  const isTimeUp = timeRemainingSeconds <= 0;

  return (
    <header className="sticky top-0 z-30 bg-white text-black border-b-2 border-black font-sans">
      <div className="max-w-6xl w-full mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 overflow-x-auto sm:overflow-visible">
        {/* Left Side: Exam Short Title & 4 Parts Badges (Always straight, no awkward wrapping) */}
        <div className="flex items-center gap-2 shrink-0">
          {examShortTitle && (
            <span className="font-extrabold font-mono text-xs uppercase px-2.5 py-1.5 bg-black text-white border-2 border-black shrink-0 whitespace-nowrap">
              {examShortTitle}
            </span>
          )}

          <div className="flex items-center gap-1.5 shrink-0">
            {sections.map((sec) => {
              const isCurrent = sec.id === currentPart;
              const isCompleted = sec.id < currentPart;
              const isFuture = sec.id > currentPart;

              return (
                <div
                  key={sec.id}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs select-none transition-all whitespace-nowrap ${
                    isCurrent
                      ? 'bg-black text-white font-bold border-2 border-black'
                      : isCompleted
                      ? 'bg-white text-black border-2 border-black font-bold'
                      : 'bg-white text-slate-400 border border-slate-300 font-normal'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0" />
                  ) : isFuture ? (
                    <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-white shrink-0"></span>
                  )}
                  <span>Parte {sec.id}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Timer & Action Buttons - Straight horizontal alignment */}
        <div className="flex items-center gap-2 shrink-0 ml-auto">
          {/* Timer Display */}
          <div
            title="Tiempo restante de esta sección reglamentaria"
            className={`flex items-center gap-1.5 px-3 py-1 border-2 border-black font-mono text-sm sm:text-base font-bold whitespace-nowrap ${
              isTimeUp || isPartLocked
                ? 'bg-black text-white'
                : isWarningTime
                ? 'bg-white text-black animate-pulse'
                : 'bg-white text-black'
            }`}
          >
            <Clock className={`w-4 h-4 shrink-0 ${isTimeUp || isPartLocked ? 'text-white' : 'text-black'}`} />
            <span>{formatTime(timeRemainingSeconds)}</span>
            {isPartLocked && (
              <span className="text-[10px] uppercase bg-white text-black px-1.5 py-0.5 border border-black font-sans ml-1 font-bold">
                Agotado
              </span>
            )}
          </div>

          {/* Adelantar Timer Button */}
          {onDevFastForward && (
            <button
              type="button"
              onClick={onDevFastForward}
              title="Adelantar cronómetro a 00:00"
              className="flex items-center gap-1.5 bg-white hover:bg-black hover:text-white text-black border-2 border-black text-xs font-bold px-3 py-1.5 transition cursor-pointer whitespace-nowrap font-mono uppercase"
            >
              <FastForward className="w-3.5 h-3.5 shrink-0" />
              <span>Adelantar</span>
            </button>
          )}

          {/* Reiniciar Prueba Button */}
          {onResetTest && (
            <button
              type="button"
              onClick={onResetTest}
              title="Reiniciar simulacro desde el menú principal"
              className="flex items-center gap-1.5 bg-white hover:bg-black hover:text-white text-black border-2 border-black text-xs font-bold px-3 py-1.5 transition cursor-pointer whitespace-nowrap font-mono uppercase"
            >
              <RotateCcw className="w-3.5 h-3.5 shrink-0" />
              <span>Reiniciar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
