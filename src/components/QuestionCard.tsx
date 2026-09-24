import React, { useState } from 'react';
import { Check, X, BookOpen, Lock, HelpCircle } from 'lucide-react';
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
      className={`bg-white border text-black transition-all mb-5 overflow-hidden font-serif ${
        isReviewMode
          ? isCorrect
            ? 'border-2 border-slate-900 bg-slate-50/40'
            : isWrong
            ? 'border-2 border-slate-900 bg-slate-100/60'
            : 'border border-slate-400'
          : isLocked
          ? 'border border-slate-400 opacity-90'
          : isAnswered
          ? 'border-2 border-black'
          : 'border border-slate-400 hover:border-black'
      }`}
    >
      {/* Instructions Header - Authentic College Board black & white box */}
      {question.instructions && (
        <div className="bg-slate-100 px-4 py-2.5 border-b border-black text-xs sm:text-sm text-black font-serif leading-relaxed">
          <span className="font-bold uppercase tracking-wider mr-1">
            Instrucciones:
          </span>
          <span className="whitespace-pre-line">{question.instructions}</span>
        </div>
      )}

      {/* Reading Passage */}
      {question.passage && (
        <div className="border-b border-black bg-slate-50 p-4 sm:p-5 font-serif">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1.5 font-bold text-black text-sm">
              <BookOpen className="w-4 h-4" />
              <span>{question.passage.title || 'Lectura de comprensión'}</span>
            </div>
            <button
              type="button"
              onClick={() => setShowPassage(!showPassage)}
              className="text-xs text-black underline font-serif cursor-pointer hover:font-bold"
            >
              {showPassage ? '[Ocultar lectura]' : '[Mostrar lectura]'}
            </button>
          </div>

          {showPassage && (
            <div className="bg-white border border-black p-4 text-xs sm:text-sm text-black leading-relaxed max-h-80 overflow-y-auto whitespace-pre-line">
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
            <span className="font-bold text-base sm:text-lg text-black font-serif shrink-0">
              {question.number}.
            </span>
            <div className="text-black text-sm sm:text-base font-serif leading-snug">
              <span className="whitespace-pre-line">{question.prompt}</span>
            </div>
          </div>

          {/* Locked / Review status */}
          <div className="shrink-0 text-xs font-serif">
            {isReviewMode ? (
              isCorrect ? (
                <span className="inline-flex items-center gap-1 border border-black px-2 py-0.5 text-xs font-bold text-black bg-slate-100">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> Correcta (+1 pt)
                </span>
              ) : isWrong ? (
                <span className="inline-flex items-center gap-1 border border-black px-2 py-0.5 text-xs font-bold text-black bg-slate-200">
                  <X className="w-3.5 h-3.5 stroke-[3]" /> Incorrecta (0 pt)
                </span>
              ) : (
                <span className="border border-slate-400 px-2 py-0.5 text-xs text-slate-600">
                  Sin contestar
                </span>
              )
            ) : isLocked ? (
              <span className="inline-flex items-center gap-1 text-slate-500 text-[11px] font-sans">
                <Lock className="w-3 h-3" /> Bloqueada
              </span>
            ) : null}
          </div>
        </div>

        {/* Cognitive & Math Diagrams (Pure black & white) */}
        {question.diagramType && (
          question.diagramType.startsWith('venn') || question.diagramType.startsWith('matrix') ? (
            <CognitiveDiagram type={question.diagramType} data={question.diagramData} />
          ) : (
            <MathDiagram type={question.diagramType} data={question.diagramData} />
          )
        )}

        {/* Options List - College Board standard (A), (B), (C), (D) */}
        <div className="space-y-2 mt-3 font-serif">
          {question.options.map((opt) => {
            const isSelected = selectedAnswer === opt.key;
            const isThisCorrect = question.correctAnswer === opt.key;

            let optionClasses = 'border border-slate-300 hover:border-black text-black';

            if (isReviewMode) {
              if (isThisCorrect) {
                optionClasses = 'border-2 border-black bg-slate-100 font-bold';
              } else if (isSelected && !isThisCorrect) {
                optionClasses = 'border-2 border-black line-through text-slate-500 bg-slate-50';
              } else {
                optionClasses = 'border border-slate-200 text-slate-400';
              }
            } else if (isSelected) {
              optionClasses = 'border-2 border-black bg-slate-100 font-bold';
            } else if (isLocked) {
              optionClasses = 'border border-slate-200 text-slate-500 opacity-80 cursor-not-allowed';
            }

            return (
              <label
                key={opt.key}
                onClick={() => {
                  if (!isReviewMode && !isLocked) {
                    onSelectAnswer(question.id, opt.key);
                  }
                }}
                className={`flex items-start gap-3 p-2.5 rounded-none border text-sm transition-all select-none ${
                  isLocked ? 'cursor-not-allowed' : 'cursor-pointer'
                } ${optionClasses}`}
              >
                {/* Standard Circle Indicator */}
                <div className="mt-0.5 shrink-0 flex items-center justify-center">
                  <div
                    className={`w-5 h-5 rounded-full border border-black flex items-center justify-center text-xs font-bold font-sans transition-all ${
                      isSelected
                        ? 'bg-black text-white'
                        : 'bg-white text-black'
                    }`}
                  >
                    {opt.key}
                  </div>
                </div>

                <div className="flex-1 leading-snug font-serif text-sm sm:text-base">
                  <span>{opt.text}</span>
                </div>

                {isReviewMode && isThisCorrect && (
                  <span className="text-[11px] font-bold text-black border border-black px-1.5 py-0.5 uppercase tracking-wider shrink-0 bg-white font-sans">
                    Respuesta correcta
                  </span>
                )}
                {isReviewMode && isSelected && !isThisCorrect && (
                  <span className="text-[11px] font-bold text-slate-700 border border-slate-400 px-1.5 py-0.5 uppercase tracking-wider shrink-0 bg-white font-sans">
                    Tu respuesta
                  </span>
                )}
              </label>
            );
          })}
        </div>

        {/* Explanation in Review Mode */}
        {isReviewMode && question.explanation && (
          <div className="mt-3.5 p-3 bg-slate-50 border border-black text-xs sm:text-sm text-black font-serif">
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Explicación:</span>
            </div>
            <p className="leading-relaxed text-slate-800">{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};
