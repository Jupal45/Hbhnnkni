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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
      <div className="bg-white border-4 border-black w-full max-w-md p-6 shadow-2xl relative font-sans text-black animate-in fade-in zoom-in duration-150">
        {/* Close icon button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:bg-slate-200 p-1 rounded-xs transition cursor-pointer"
          aria-label="Cerrar advertencia"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon and Header */}
        <div className="flex items-center gap-3 border-b-2 border-black pb-4 mb-4">
          <div className="bg-black text-white p-2">
            <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold uppercase tracking-wide text-black">
              ADVERTENCIA
            </h3>
            <p className="text-xs text-slate-600 font-mono">
              Reinicio del simulacro PIENSE II
            </p>
          </div>
        </div>

        {/* Message body */}
        <div className="space-y-3 font-serif text-sm sm:text-base text-black leading-relaxed">
          <p className="font-bold">
            ¿Estás seguro de que deseas reiniciar la prueba?
          </p>
          <p className="text-xs sm:text-sm text-slate-800">
            Se perderán todas las respuestas seleccionadas y el tiempo transcurrido en el intento actual.
          </p>
          <div className="bg-slate-100 border border-black p-3 text-xs font-sans text-black">
            <strong>Importante:</strong> Al presionar <strong>Continuar</strong>, la aplicación te llevará de vuelta al <strong>Menú Principal</strong> para que puedas iniciar cuando estés listo.
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 pt-4 border-t border-black flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 font-sans">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 border-2 border-black text-black text-xs font-bold uppercase tracking-wider hover:bg-slate-100 transition cursor-pointer"
          >
            Cancelar (Volver al examen)
          </button>
          <button
            type="button"
            onClick={onConfirmReset}
            className="w-full sm:w-auto px-5 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 border-2 border-black transition cursor-pointer"
          >
            Continuar al Menú Principal
          </button>
        </div>
      </div>
    </div>
  );
};
