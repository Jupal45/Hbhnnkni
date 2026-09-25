import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ResetWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
}

export const ResetWarningModal: React.FC<ResetWarningModalProps> = ({
  isOpen,
  onClose,
  onConfirmReset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="glass-panel rounded-3xl border border-slate-300/80 dark:border-slate-700/80 w-full max-w-md p-6 sm:p-7 shadow-2xl relative font-sans animate-in fade-in zoom-in duration-150">
        {/* Close icon button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          aria-label="Cerrar advertencia"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Warning Icon and Header */}
        <div className="flex items-center gap-3 border-b border-slate-300/70 dark:border-slate-700/70 pb-4 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
            <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold uppercase tracking-wide">
              ADVERTENCIA
            </h3>
            <p className="text-xs opacity-75 font-mono">
              Reinicio de la prueba en curso
            </p>
          </div>
        </div>

        {/* Message body */}
        <div className="space-y-3 font-serif text-sm leading-relaxed">
          <p className="font-bold">
            ¿Estás seguro de que deseas reiniciar la prueba?
          </p>
          <p className="text-xs sm:text-sm opacity-80">
            Se perderán todas las respuestas seleccionadas y el tiempo transcurrido en el intento actual.
          </p>
          <div className="rounded-xl border border-slate-300/80 dark:border-slate-700/80 bg-slate-100/60 dark:bg-slate-800/60 p-3 text-xs font-sans">
            <strong>Importante:</strong> Al presionar <strong>Continuar</strong>, la aplicación te llevará de vuelta a la <strong>Pantalla de Inicio</strong> para que puedas iniciar cuando estés listo.
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 pt-4 border-t border-slate-300/70 dark:border-slate-700/70 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 font-sans">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold uppercase transition cursor-pointer btn-dynamic"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirmReset}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold uppercase transition cursor-pointer btn-dynamic shadow-md"
          >
            Continuar y Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
};
