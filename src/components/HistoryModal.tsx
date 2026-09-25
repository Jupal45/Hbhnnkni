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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="glass-panel rounded-3xl border border-slate-300/80 dark:border-slate-700/80 w-full max-w-3xl max-h-[90vh] flex flex-col font-serif shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-300/70 dark:border-slate-700/70 bg-white/40 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg font-sans">
                Historial de Intentos Guardados ({attempts.length})
              </h3>
              <p className="text-[11px] opacity-75 font-serif">Intentos ilimitados registrados en este dispositivo</p>
            </div>
          </div>
          <button
            onClick={() => {
              setConfirmClearAll(false);
              onClose();
            }}
            className="p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clear All Confirmation Banner */}
        {confirmClearAll && (
          <div className="border-b border-slate-300 dark:border-slate-700 p-4 bg-amber-500/10 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
              <div className="text-xs sm:text-sm font-bold">
                ¿Confirmas eliminar permanentemente todo el historial ({attempts.length} intentos)?
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setConfirmClearAll(false)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold uppercase cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  onClearHistory();
                  setConfirmClearAll(false);
                }}
                className="px-4 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold uppercase transition cursor-pointer shadow-sm"
              >
                Sí, Borrar Todo
              </button>
            </div>
          </div>
        )}

        {/* Content list */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-3 font-sans">
          {attempts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-500">
                <BookOpen className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold">No hay intentos registrados todavía.</p>
              <p className="text-xs opacity-75 font-serif mt-1">Completa una prueba para ver tus resultados aquí.</p>
            </div>
          ) : (
            attempts.map((att, idx) => {
              const isPassing = att.score / att.totalQuestions >= 0.6;
              const dateStr = new Date(att.timestamp).toLocaleDateString('es-MX', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });
              const isDeletingThis = deletingId === att.id;

              return (
                <div
                  key={att.id}
                  className="rounded-2xl border border-slate-300/80 dark:border-slate-700/80 p-4 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/50 dark:bg-slate-800/40 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      #{attempts.length - idx}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm">
                          {att.customExamTitle || (att.examType === 'paa' ? 'Prueba PAA' : 'PIENSE II')}
                        </span>
                        <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                          isPassing
                            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}>
                          {isPassing ? 'Aprobado' : 'Por Mejorar'}
                        </span>
                      </div>
                      <div className="text-xs opacity-80 mt-0.5">
                        Aspirante: <strong>{att.studentName || 'Aspirante'}</strong> • Escuela: {att.studentOrganization || 'Ninguna'}
                      </div>
                      <div className="text-[11px] opacity-65 font-mono flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {dateStr}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {Math.floor(att.timeSpentSeconds / 60)}m {att.timeSpentSeconds % 60}s
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="text-right">
                      <div className="text-base font-extrabold font-mono text-indigo-600 dark:text-sky-300">
                        {att.score} / {att.totalQuestions}
                      </div>
                      <div className="text-[11px] opacity-75 font-mono">
                        {Math.round((att.score / att.totalQuestions) * 100)}%
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectAttemptForReview(att);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase flex items-center gap-1 cursor-pointer btn-dynamic shadow-sm"
                        title="Revisar examen resuelto"
                      >
                        <span>Revisar</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {onDeleteSingleAttempt && (
                        isDeletingThis ? (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                onDeleteSingleAttempt(att.id);
                                setDeletingId(null);
                              }}
                              className="px-2 py-1 rounded-lg bg-red-600 text-white text-[10px] font-bold"
                            >
                              Confirmar
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingId(null)}
                              className="px-1.5 py-1 text-[10px] border border-slate-300 dark:border-slate-700 rounded-lg"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setDeletingId(att.id)}
                            className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-500 hover:text-red-600 hover:border-red-300 transition cursor-pointer"
                            title="Eliminar este intento"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {attempts.length > 0 && (
          <div className="p-4 border-t border-slate-300/70 dark:border-slate-700/70 flex items-center justify-between font-sans text-xs bg-white/40 dark:bg-slate-800/40">
            <span className="opacity-75 font-mono">
              Total de intentos: <strong>{attempts.length}</strong>
            </span>
            {!confirmClearAll && (
              <button
                type="button"
                onClick={() => setConfirmClearAll(true)}
                className="text-xs text-red-600 hover:underline flex items-center gap-1 font-bold cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Vaciar Todo el Historial</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
