import React, { useState } from 'react';
import { Download, Check, Copy, Printer, FileText } from 'lucide-react';
import { ExamAttempt, Question } from '../types';
import {
  downloadOrPrintPdf,
  downloadExamAsWord,
  downloadExamForGoogleDocs,
  copyExamRichTextToClipboard,
} from '../utils/exportExamDocument';

interface ExamDownloadPanelProps {
  attempt: ExamAttempt;
  questions: Question[];
  className?: string;
  variant?: 'card' | 'compact';
}

export const ExamDownloadPanel: React.FC<ExamDownloadPanelProps> = ({
  attempt,
  questions,
  className = '',
  variant = 'card',
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'word' | 'docs'>('pdf');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = () => {
    if (selectedFormat === 'pdf') {
      downloadOrPrintPdf(attempt, questions);
      setDownloadSuccess('Se ha abierto el diálogo de impresión / Guardar como PDF');
    } else if (selectedFormat === 'word') {
      downloadExamAsWord(attempt, questions);
      setDownloadSuccess('Descargando archivo para Word (.doc)...');
    } else if (selectedFormat === 'docs') {
      downloadExamForGoogleDocs(attempt, questions);
      setDownloadSuccess('Descargando archivo para Docs...');
    }

    setTimeout(() => {
      setDownloadSuccess(null);
    }, 4500);
  };

  const handleCopyForDocs = async () => {
    const success = await copyExamRichTextToClipboard(attempt, questions);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 4000);
    } else {
      downloadExamForGoogleDocs(attempt, questions);
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        <button
          onClick={() => downloadOrPrintPdf(attempt, questions)}
          className="flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-xs font-bold px-3 py-1.5 transition cursor-pointer uppercase btn-dynamic"
          title="Descargar PDF"
        >
          <span>PDF</span>
        </button>

        <button
          onClick={() => downloadExamAsWord(attempt, questions)}
          className="flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-xs font-bold px-3 py-1.5 transition cursor-pointer uppercase btn-dynamic"
          title="Descargar Word"
        >
          <span>Word</span>
        </button>

        <button
          onClick={() => downloadExamForGoogleDocs(attempt, questions)}
          className="flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-xs font-bold px-3 py-1.5 transition cursor-pointer uppercase btn-dynamic"
          title="Descargar Docs"
        >
          <span>Docs</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`glass-panel rounded-3xl border border-slate-300/80 dark:border-slate-700/80 p-5 sm:p-6 font-sans shadow-xl ${className}`}>
      {/* Header Info Box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-300/70 dark:border-slate-700/70 gap-2">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-lg border border-slate-300 dark:border-slate-700 font-mono bg-white/60 dark:bg-slate-800/60 opacity-80">
            Comprobante Oficial
          </span>
          <h3 className="text-lg sm:text-xl font-bold font-serif mt-1">
            Descargar Examen Resuelto y Certificado
          </h3>
        </div>
      </div>

      {/* Format Selection with Rounded Corners & Medium Gray Borders */}
      <div className="grid grid-cols-3 gap-3 my-4">
        {/* PDF Option */}
        <button
          type="button"
          onClick={() => setSelectedFormat('pdf')}
          className={`py-3 px-2 rounded-2xl border text-center text-xs sm:text-sm font-bold uppercase transition cursor-pointer font-sans btn-dynamic ${
            selectedFormat === 'pdf'
              ? 'border-indigo-600 dark:border-sky-400 bg-indigo-50/60 dark:bg-sky-950/40 text-indigo-700 dark:text-sky-300 shadow-sm'
              : 'border-slate-300/80 dark:border-slate-700/80 bg-white/50 dark:bg-slate-800/40 hover:bg-white/80'
          }`}
        >
          {selectedFormat === 'pdf' ? '✓ PDF' : 'PDF'}
        </button>

        {/* Word Option */}
        <button
          type="button"
          onClick={() => setSelectedFormat('word')}
          className={`py-3 px-2 rounded-2xl border text-center text-xs sm:text-sm font-bold uppercase transition cursor-pointer font-sans btn-dynamic ${
            selectedFormat === 'word'
              ? 'border-indigo-600 dark:border-sky-400 bg-indigo-50/60 dark:bg-sky-950/40 text-indigo-700 dark:text-sky-300 shadow-sm'
              : 'border-slate-300/80 dark:border-slate-700/80 bg-white/50 dark:bg-slate-800/40 hover:bg-white/80'
          }`}
        >
          {selectedFormat === 'word' ? '✓ Word' : 'Word'}
        </button>

        {/* Docs Option */}
        <button
          type="button"
          onClick={() => setSelectedFormat('docs')}
          className={`py-3 px-2 rounded-2xl border text-center text-xs sm:text-sm font-bold uppercase transition cursor-pointer font-sans btn-dynamic ${
            selectedFormat === 'docs'
              ? 'border-indigo-600 dark:border-sky-400 bg-indigo-50/60 dark:bg-sky-950/40 text-indigo-700 dark:text-sky-300 shadow-sm'
              : 'border-slate-300/80 dark:border-slate-700/80 bg-white/50 dark:bg-slate-800/40 hover:bg-white/80'
          }`}
        >
          {selectedFormat === 'docs' ? '✓ Docs' : 'Docs'}
        </button>
      </div>

      {/* Main Download Button */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={handleDownload}
          className="w-full rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 dark:from-sky-500 dark:to-indigo-600 text-white font-extrabold py-3.5 px-4 shadow-lg transition flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer btn-dynamic btn-glow-primary"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>
            {selectedFormat === 'pdf'
              ? 'Imprimir / Guardar como PDF'
              : selectedFormat === 'word'
              ? 'Descargar Archivo para Word (.doc)'
              : 'Descargar para Google Docs'}
          </span>
        </button>

        {/* Copy to clipboard for Google Docs */}
        <button
          type="button"
          onClick={handleCopyForDocs}
          className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 py-2.5 px-3 text-xs font-semibold cursor-pointer transition flex items-center justify-center gap-1.5 btn-dynamic"
        >
          {copySuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-600 dark:text-emerald-400">¡Copiado! Abre un Google Doc y presiona Ctrl+V</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 opacity-70" />
              <span>Copiar formato para pegar en Google Docs (Ctrl+V)</span>
            </>
          )}
        </button>
      </div>

      {downloadSuccess && (
        <div className="mt-3 p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-semibold text-center">
          {downloadSuccess}
        </div>
      )}
    </div>
  );
};
