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
      <div className={`flex flex-wrap items-center gap-2 bg-white ${className}`}>
        <button
          onClick={() => downloadOrPrintPdf(attempt, questions)}
          className="flex items-center gap-1.5 bg-white hover:bg-black hover:text-white text-black text-xs font-bold px-3 py-1.5 border-2 border-black transition cursor-pointer uppercase"
          title="Descargar PDF"
        >
          <span>PDF</span>
        </button>

        <button
          onClick={() => downloadExamAsWord(attempt, questions)}
          className="flex items-center gap-1.5 bg-white hover:bg-black hover:text-white text-black text-xs font-bold px-3 py-1.5 border-2 border-black transition cursor-pointer uppercase"
          title="Descargar Word"
        >
          <span>Word</span>
        </button>

        <button
          onClick={() => downloadExamForGoogleDocs(attempt, questions)}
          className="flex items-center gap-1.5 bg-white hover:bg-black hover:text-white text-black text-xs font-bold px-3 py-1.5 border-2 border-black transition cursor-pointer uppercase"
          title="Descargar Docs"
        >
          <span>Docs</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white border-2 border-black p-5 sm:p-6 font-sans text-black ${className}`}>
      {/* Header Info Box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-black gap-2 bg-white">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-black bg-white border border-black px-2 py-0.5 font-mono">
            Comprobante Oficial
          </span>
          <h3 className="text-lg sm:text-xl font-bold font-serif text-black mt-1">
            Descargar Examen Resuelto y Certificado
          </h3>
        </div>
      </div>

      {/* Format Selection - STRICTLY ONLY PDF, Word, Docs without details */}
      <div className="grid grid-cols-3 gap-3 my-4">
        {/* PDF Option */}
        <button
          type="button"
          onClick={() => setSelectedFormat('pdf')}
          className={`py-3 px-2 border-2 text-center text-sm font-bold uppercase transition cursor-pointer font-sans ${
            selectedFormat === 'pdf'
              ? 'border-4 border-black bg-white text-black font-extrabold ring-1 ring-black'
              : 'border-2 border-black bg-white text-black hover:bg-slate-50'
          }`}
        >
          {selectedFormat === 'pdf' ? '✓ PDF' : 'PDF'}
        </button>

        {/* Word Option */}
        <button
          type="button"
          onClick={() => setSelectedFormat('word')}
          className={`py-3 px-2 border-2 text-center text-sm font-bold uppercase transition cursor-pointer font-sans ${
            selectedFormat === 'word'
              ? 'border-4 border-black bg-white text-black font-extrabold ring-1 ring-black'
              : 'border-2 border-black bg-white text-black hover:bg-slate-50'
          }`}
        >
          {selectedFormat === 'word' ? '✓ Word' : 'Word'}
        </button>

        {/* Docs Option */}
        <button
          type="button"
          onClick={() => setSelectedFormat('docs')}
          className={`py-3 px-2 border-2 text-center text-sm font-bold uppercase transition cursor-pointer font-sans ${
            selectedFormat === 'docs'
              ? 'border-4 border-black bg-white text-black font-extrabold ring-1 ring-black'
              : 'border-2 border-black bg-white text-black hover:bg-slate-50'
          }`}
        >
          {selectedFormat === 'docs' ? '✓ Docs' : 'Docs'}
        </button>
      </div>

      {/* Action Buttons & Feedback - 100% White Background */}
      <div className="bg-white border-2 border-black p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-black font-mono">
          Formato: <strong className="uppercase">{selectedFormat}</strong>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {selectedFormat === 'docs' && (
            <button
              onClick={handleCopyForDocs}
              className="bg-white hover:bg-black hover:text-white text-black border-2 border-black text-xs font-bold px-3 py-2 flex items-center gap-1.5 transition cursor-pointer font-sans uppercase"
            >
              {copySuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar para Docs</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={handleDownload}
            className="bg-white hover:bg-black hover:text-white text-black text-xs font-bold px-4 py-2 border-2 border-black flex items-center gap-2 transition cursor-pointer font-sans uppercase"
          >
            {selectedFormat === 'pdf' ? (
              <Printer className="w-3.5 h-3.5" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>Descargar</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="mt-3 p-2.5 bg-white border-2 border-black text-black text-xs flex items-center gap-2 font-mono">
          <Check className="w-4 h-4 shrink-0" />
          <span>{downloadSuccess}</span>
        </div>
      )}
    </div>
  );
};
