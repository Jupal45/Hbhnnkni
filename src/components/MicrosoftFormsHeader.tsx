import React from 'react';
import { Clock, Lock, CheckCircle2, FastForward, RotateCcw, Sun, Moon } from 'lucide-react';
import { SectionInfo, sectionsInfo as defaultSections } from '../data/allQuestions';

interface HeaderProps {
  currentPart: 1 | 2 | 3 | 4;
  timeRemainingSeconds: number;
  isPartLocked: boolean;
  sections?: SectionInfo[];
  examShortTitle?: string;
  onDevFastForward?: () => void;
  onResetTest?: () => void;
  darkMode?: boolean;
  onToggleTheme?: () => void;
}

export const MicrosoftFormsHeader: React.FC<HeaderProps> = ({
  currentPart,
  timeRemainingSeconds,
  isPartLocked,
  sections = defaultSections,
  examShortTitle,
  onDevFastForward,
  onResetTest,
  darkMode,
  onToggleTheme,
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
    <header className="sticky top-0 z-30 glass-panel border-b border-slate-300/80 dark:border-slate-700/80 font-sans transition-colors">
      <div className="max-w-6xl w-full mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 overflow-x-auto sm:overflow-visible">
        {/* Left Side: Exam Short Title & 4 Parts Badges */}
        <div className="flex items-center gap-2 shrink-0">
          {examShortTitle && (
            <span className="font-extrabold font-mono text-xs uppercase px-2.5 py-1.5 bg-slate-900 dark:bg-sky-500 text-white border border-slate-700 dark:border-sky-400 shrink-0 whitespace-nowrap rounded-xl shadow-sm">
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
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs select-none transition-all whitespace-nowrap rounded-xl ${
                    isCurrent
                      ? 'bg-slate-900 dark:bg-sky-500/20 text-white dark:text-sky-300 font-bold border-2 border-slate-700 dark:border-sky-400 shadow-sm'
                      : isCompleted
                      ? 'bg-white/80 dark:bg-slate-800 text-slate-900 dark:text-slate-200 border border-slate-300 dark:border-slate-600 font-bold'
                      : 'bg-white/40 dark:bg-slate-900/40 text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-slate-700 font-normal'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : isFuture ? (
                    <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-white dark:bg-sky-400 shrink-0 animate-ping"></span>
                  )}
                  <span>Parte {sec.id}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Timer & Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 ml-auto">
          {/* Timer Display */}
          <div
            title="Tiempo restante de esta sección reglamentaria"
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border border-slate-300 dark:border-slate-600 font-mono text-sm sm:text-base font-bold whitespace-nowrap shadow-sm ${
              isTimeUp || isPartLocked
                ? 'bg-slate-900 text-white dark:bg-red-950 dark:text-red-300 dark:border-red-800'
                : isWarningTime
                ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 animate-pulse'
                : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
            }`}
          >
            <Clock className={`w-4 h-4 shrink-0 ${isTimeUp || isPartLocked ? 'text-white' : 'text-current'}`} />
            <span>{formatTime(timeRemainingSeconds)}</span>
            {isPartLocked && (
              <span className="text-[10px] uppercase bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-600 font-sans ml-1 font-bold">
                Agotado
              </span>
            )}
          </div>

          {/* Theme Toggle */}
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              title={darkMode ? 'Cambiar a Modo Brillante' : 'Cambiar a Modo Oscuro'}
              className="p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-amber-300 cursor-pointer btn-dynamic"
            >
              {darkMode ? <Sun className="w-4 h-4 fill-current" /> : <Moon className="w-4 h-4 fill-current" />}
            </button>
          )}

          {/* Adelantar Timer Button */}
          {onDevFastForward && (
            <button
              type="button"
              onClick={onDevFastForward}
              title="Adelantar cronómetro a 00:00"
              className="flex items-center gap-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 text-xs font-bold px-3 py-1.5 transition cursor-pointer whitespace-nowrap font-mono uppercase btn-dynamic"
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
              className="flex items-center gap-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 text-xs font-bold px-3 py-1.5 transition cursor-pointer whitespace-nowrap font-mono uppercase btn-dynamic"
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
