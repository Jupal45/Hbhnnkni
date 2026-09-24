import React, { useState } from 'react';
import { X, Award, Clock, Calendar, ArrowRight, Trash2, BookOpen, AlertTriangle, Check } from 'lucide-react';
import { ExamAttempt } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  attempts: ExamAttempt[];
  onSelectAttemptForReview: (attempt: ExamAttempt) => void;
  onClearHistory: () => void;
  onDeleteSingleAttempt?: (attemptId: string) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  attempts,
  onSelectAttemptForReview,
  onClearHistory,
  onDeleteSingleAttempt,
}) => {
  const [confirmClearAll, setConfirmClearAll] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
      <div className="bg-white border-4 border-black w-full max-w-3xl max-h-[90vh] flex flex-col font-serif text-black animate-in fade-in zoom-in duration-150">
        {/* Header */}
        <div className="bg-black text-white p-4 sm:p-5 flex items-center justify-between border-b-2 border-black">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-white" />
            <h3 className="font-bold text-base sm:text-lg uppercase font-serif tracking-tight">
              Historial de Intentos Guardados ({attempts.length})
            </h3>
          </div>
          <button
            onClick={() => {
              setConfirmClearAll(false);
              onClose();
            }}
            className="text-white hover:bg-slate-800 p-1 border border-white transition cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clear All Confirmation Banner (In-UI, no window.confirm) */}
        {confirmClearAll && (
          <div className="bg-white border-b-4 border-black p-4 text-black flex flex-col sm:flex-row items-center justify-between gap-3 font-sans">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-black shrink-0" />
              <div className="text-xs sm:text-sm font-bold">
                ¿Confirmas eliminar permanentemente todo el historial ({attempts.length} intentos)?
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setConfirmClearAll(false)}
                className="px-3 py-1.5 text-xs font-bold uppercase border-2 border-black bg-white hover:bg-slate-100 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onClearHistory();
                  setConfirmClearAll(false);
                }}
                className="px-4 py-1.5 text-xs font-bold uppercase border-2 border-black bg-black text-white hover:bg-slate-800 cursor-pointer"
              >
                Sí, Borrar Todo
              </button>
            </div>
          </div>
        )}

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {attempts.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-sans">
              <p className="text-base font-bold text-black">No hay intentos registrados.</p>
              <p className="text-xs text-slate-600 mt-1 font-serif">El historial está vacío. Completa un simulacro para registrar tu puntaje.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {attempts.map((att, idx) => {
                const percent = Math.round((att.score / att.totalQuestions) * 100);
                const dateStr = new Date(att.timestamp).toLocaleDateString('es-MX', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });
                const minutes = Math.floor(att.timeSpentSeconds / 60);
                const seconds = att.timeSpentSeconds % 60;
                const isPassing = percent >= 60;
                const isItemDeleting = deletingId === att.id;

                return (
                  <div
                    key={att.id}
                    className="border-2 border-black p-4 hover:bg-slate-50 transition bg-white"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-black font-sans">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-black text-white font-mono text-xs font-bold px-2 py-0.5 border border-black">
                          #{attempts.length - idx}
                        </span>
                        <span className="text-[10px] uppercase font-bold font-mono px-2 py-0.5 border-2 border-black bg-white text-black">
                          {att.examType === 'paa' ? 'PAA' : 'PIENSE II'}
                        </span>
                        <span className="font-bold text-black text-sm font-serif">
                          {att.studentName || 'Aspirante'}
                        </span>
                        {att.studentOrganization && (
                          <span className="text-[11px] text-slate-700 font-mono">
                            • {att.studentOrganization}
                          </span>
                        )}
                        {isPassing && (
                          <span className="text-[10px] bg-black text-white border border-black font-bold px-2 py-0.5 flex items-center gap-1 font-mono uppercase">
                            <Award className="w-3 h-3" /> Aprobado Oficial
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-600 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {dateStr}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {minutes}m {seconds}s
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="text-base font-bold text-black font-mono">
                          {att.score} / {att.totalQuestions}{' '}
                          <span className="text-xs font-sans text-slate-700 font-bold">({percent}%)</span>
                        </div>
                        <div className="flex gap-2 text-[11px] text-slate-700 mt-1 font-mono">
                          <span>P1: {att.sectionScores.part1.score}/{att.sectionScores.part1.total}</span>
                          <span>•</span>
                          <span>P2: {att.sectionScores.part2.score}/{att.sectionScores.part2.total}</span>
                          <span>•</span>
                          <span>P3: {att.sectionScores.part3.score}/{att.sectionScores.part3.total}</span>
                          <span>•</span>
                          <span>P4: {att.sectionScores.part4.score}/{att.sectionScores.part4.total}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Single attempt deletion button */}
                        {onDeleteSingleAttempt && (
                          isItemDeleting ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  onDeleteSingleAttempt(att.id);
                                  setDeletingId(null);
                                }}
                                className="px-2 py-1 text-[11px] font-bold bg-black text-white border border-black uppercase font-mono cursor-pointer"
                                title="Confirmar eliminar este intento"
                              >
                                Confirmar
                              </button>
                              <button
                                onClick={() => setDeletingId(null)}
                                className="px-2 py-1 text-[11px] font-bold bg-white text-black border border-black uppercase font-mono cursor-pointer"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeletingId(att.id)}
                              className="p-1.5 text-black hover:bg-slate-200 border border-slate-300 hover:border-black transition cursor-pointer"
                              title="Borrar este intento"
                              aria-label="Borrar intento"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )
                        )}

                        <button
                          onClick={() => {
                            onSelectAttemptForReview(att);
                            onClose();
                          }}
                          className="bg-white hover:bg-black hover:text-white text-black border-2 border-black text-xs font-bold px-3 py-1.5 transition flex items-center justify-center gap-1 cursor-pointer font-sans uppercase"
                        >
                          <span>Revisar respuestas</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-black bg-white flex items-center justify-between font-sans">
          {attempts.length > 0 && !confirmClearAll && (
            <button
              onClick={() => setConfirmClearAll(true)}
              className="text-xs text-black hover:underline flex items-center gap-1.5 cursor-pointer uppercase font-mono font-bold py-1 px-2 border border-black hover:bg-slate-100"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Borrar Todo el Historial</span>
            </button>
          )}

          <button
            onClick={() => {
              setConfirmClearAll(false);
              onClose();
            }}
            className="ml-auto bg-black text-white hover:bg-slate-800 text-xs font-bold px-4 py-2 border border-black cursor-pointer uppercase font-mono"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
