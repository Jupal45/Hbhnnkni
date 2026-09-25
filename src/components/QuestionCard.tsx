import React, { useState } from 'react';
import { Check, X, BookOpen, Lock } from 'lucide-react';
import { Question, AnswerOption } from '../types';
import { CognitiveDiagram } from './CognitiveDiagram';
import { MathDiagram } from './MathDiagram';

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: AnswerOption;
  onSelectAnswer: (questionId: string, answer: AnswerOption) => void;
  isReviewMode?: boolean;
  isLocked?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  isReviewMode = false,
  isLocked = false,
}) => {
  const [showPassage, setShowPassage] = useState<boolean>(true);
  const isAnswered = !!selectedAnswer;
  const isCorrect = isReviewMode && selectedAnswer === question.correctAnswer;
  const isWrong = isReviewMode && isAnswered && selectedAnswer !== question.correctAnswer;

  return (
    <div
      id={`q-${question.id}`}
      className={`glass-panel rounded-2xl border transition-all mb-5 overflow-hidden font-serif ${
        isReviewMode
          ? isCorrect
            ? 'border-emerald-500/70 bg-emerald-50/20 dark:bg-emerald-950/20 shadow-sm'
            : isWrong
            ? 'border-red-400/70 bg-red-50/20 dark:bg-red-950/20 shadow-sm'
            : 'border-slate-300/80 dark:border-slate-700/80'
          : isLocked
          ? 'border-slate-300/80 dark:border-slate-700/80 opacity-90'
          : isAnswered
          ? 'border-indigo-500/80 dark:border-sky-400/80 shadow-sm'
          : 'border-slate-300/80 dark:border-slate-700/80 hover:border-slate-400 dark:hover:border-slate-600'
      }`}
    >
      {/* Instructions Header */}
      {question.instructions && (
        <div className="bg-slate-100/80 dark:bg-slate-800/60 px-4 py-2.5 border-b border-slate-300/70 dark:border-slate-700/70 text-xs sm:text-sm leading-relaxed">
          <span className="font-bold uppercase tracking-wider mr-1 text-slate-700 dark:text-slate-300">
            Instrucciones:
          </span>
          <span className="whitespace-pre-line opacity-90">{question.instructions}</span>
        </div>
      )}

      {/* Reading Passage */}
      {question.passage && (
        <div className="border-b border-slate-300/70 dark:border-slate-700/70 bg-slate-50/50 dark:bg-slate-800/40 p-4 sm:p-5 font-serif">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1.5 font-bold text-sm">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>{question.passage.title || 'Lectura de comprensión'}</span>
            </div>
            <button
              type="button"
              onClick={() => setShowPassage(!showPassage)}
              className="text-xs text-indigo-600 dark:text-sky-400 underline font-serif cursor-pointer hover:font-bold"
            >
              {showPassage ? '[Ocultar lectura]' : '[Mostrar lectura]'}
            </button>
          </div>

          {showPassage && (
            <div className="bg-white/80 dark:bg-slate-900/80 rounded-xl border border-slate-300/70 dark:border-slate-700/70 p-4 text-xs sm:text-sm leading-relaxed max-h-80 overflow-y-auto whitespace-pre-line shadow-inner">
              {question.passage.text}
            </div>
          )}
        </div>
      )}

      {/* Main Question Body */}
      <div className="p-4 sm:p-5">
        {/* Number & Prompt */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-2.5">
            <span className="font-bold text-base sm:text-lg font-serif shrink-0 opacity-80">
              {question.number}.
            </span>
            <div className="text-sm sm:text-base font-serif leading-snug">
              <span className="whitespace-pre-line font-medium">{question.prompt}</span>
            </div>
          </div>

          {/* Locked / Review status */}
          <div className="shrink-0 text-xs font-serif">
            {isReviewMode ? (
              isCorrect ? (
                <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-500 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> Correcta (+1 pt)
                </span>
              ) : isWrong ? (
                <span className="inline-flex items-center gap-1 rounded-lg border border-red-400 px-2 py-0.5 text-xs font-bold text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/40">
                  <X className="w-3.5 h-3.5 stroke-[3]" /> Incorrecta (0 pt)
                </span>
              ) : (
                <span className="rounded-lg border border-slate-300 dark:border-slate-600 px-2 py-0.5 text-xs opacity-75">
                  Sin contestar
                </span>
              )
            ) : isLocked ? (
              <span className="inline-flex items-center gap-1 opacity-70 text-[11px] font-sans">
                <Lock className="w-3 h-3" /> Bloqueada
              </span>
            ) : null}
          </div>
        </div>

        {/* Cognitive & Math Diagrams */}
        {question.diagramType && (
          question.diagramType.startsWith('venn') || question.diagramType.startsWith('matrix') ? (
            <CognitiveDiagram type={question.diagramType} data={question.diagramData} />
          ) : (
            <MathDiagram type={question.diagramType} data={question.diagramData} />
          )
        )}

        {/* Options List */}
        <div className="space-y-2 mt-3 font-serif">
          {question.options.map((opt) => {
            const isSelected = selectedAnswer === opt.key;
            const isThisCorrect = question.correctAnswer === opt.key;

            let optionClasses = 'border border-slate-300/80 dark:border-slate-700/80 hover:border-slate-400 dark:hover:border-slate-500 bg-white/50 dark:bg-slate-800/40';

            if (isReviewMode) {
              if (isThisCorrect) {
                optionClasses = 'border-2 border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 font-bold';
              } else if (isSelected && !isThisCorrect) {
                optionClasses = 'border-2 border-red-400 line-through opacity-75 bg-red-50/40 dark:bg-red-950/40';
              } else {
                optionClasses = 'border border-slate-200 dark:border-slate-800 opacity-60';
              }
            } else if (isSelected) {
              optionClasses = 'border-2 border-indigo-600 dark:border-sky-400 bg-indigo-50/60 dark:bg-sky-950/40 font-bold shadow-sm';
            } else if (isLocked) {
              optionClasses = 'border border-slate-200 dark:border-slate-800 opacity-70 cursor-not-allowed';
            }

            return (
              <label
                key={opt.key}
                onClick={() => {
                  if (!isReviewMode && !isLocked) {
                    onSelectAnswer(question.id, opt.key);
                  }
                }}
                className={`flex items-start gap-3 p-3 rounded-xl border text-sm transition-all select-none btn-dynamic ${
                  isLocked ? 'cursor-not-allowed' : 'cursor-pointer'
                } ${optionClasses}`}
              >
                {/* Standard Circle Indicator */}
                <div className="mt-0.5 shrink-0 flex items-center justify-center">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-mono font-bold ${
                      isSelected
                        ? 'border-indigo-600 dark:border-sky-400 bg-indigo-600 dark:bg-sky-500 text-white'
                        : 'border-slate-400 dark:border-slate-500 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {opt.key}
                  </div>
                </div>

                <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                  {opt.text}
                </div>

                {isReviewMode && isThisCorrect && (
                  <span className="shrink-0 text-[10px] font-sans font-bold uppercase text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/40">
                    Clave Oficial
                  </span>
                )}
              </label>
            );
          })}
        </div>

        {/* Academic Explanation in Review Mode */}
        {isReviewMode && question.explanation && (
          <div className="mt-4 p-3.5 rounded-xl border border-slate-300/80 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/50 text-xs leading-relaxed font-serif">
            <span className="font-bold uppercase font-sans tracking-wide block mb-1 text-slate-700 dark:text-slate-300">
              Explicación Oficial:
            </span>
            <p className="opacity-90">{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};
