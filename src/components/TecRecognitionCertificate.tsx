import React from 'react';
import { Award, Printer, GraduationCap, Download, FileText } from 'lucide-react';
import { ExamAttempt, Question } from '../types';
import { downloadOrPrintPdf, downloadExamAsWord, downloadExamForGoogleDocs } from '../utils/exportExamDocument';

interface TecRecognitionCertificateProps {
  attempt: ExamAttempt;
  questions?: Question[];
}

export const TecRecognitionCertificate: React.FC<TecRecognitionCertificateProps> = ({ attempt, questions }) => {
  const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
  const isPaa = attempt.examType === 'paa';
  const examTitle = isPaa ? 'PAA' : 'PIENSE II';
  const orgName = attempt.studentOrganization || (isPaa ? 'Organizaciones Estudiantiles Tec' : 'PrepaTec');
  const estimatedScale = isPaa 
    ? Math.round(800 + (attempt.score / attempt.totalQuestions) * 800) // 800 - 1600 PAA scale
    : Math.round(200 + (attempt.score / attempt.totalQuestions) * 600); // 200 - 800 PIENSE scale

  const dateStr = new Date(attempt.timestamp).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="my-6 w-full print:m-0 print:p-0">
      {/* Certificate Outer Border Frame - Pure 100% Black & White Classical Institutional Style */}
      <div className="bg-white border-8 border-double border-black p-6 sm:p-10 shadow-none relative overflow-hidden print:border-4 print:border-black print:m-0 print:p-4 print:break-inside-avoid print:max-h-[960px]">
        {/* Subtle Watermark Background in Black - Graduation Cap */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <svg viewBox="0 0 24 24" className="w-96 h-96 fill-none stroke-black stroke-[1.5]">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </div>

        {/* Certificate Inner Border */}
        <div className="border-2 border-black p-5 sm:p-7 text-center relative z-10 bg-white print:p-4">
          {/* Header Institutional Branding */}
          <div className="flex flex-col items-center mb-4">
            {/* Logo: Graduation Cap */}
            <div className="w-16 h-16 bg-white text-black flex items-center justify-center mb-2.5 border-2 border-black">
              <GraduationCap className="w-10 h-10 stroke-[2]" />
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold tracking-widest text-black uppercase font-sans">
              SPA • SIMULACROS DE PRUEBAS ACADÉMICAS
            </h2>
            <div className="w-24 h-1 bg-black mt-2 mb-1"></div>
            <p className="text-[11px] sm:text-xs tracking-wider text-black font-semibold uppercase font-mono">
              {orgName} • Escuela Patrocinadora Oficial
            </p>
          </div>

          {/* Certificate Main Title */}
          <div className="my-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight font-serif uppercase">
              RECONOCIMIENTO DE ALTO DESEMPEÑO
            </h3>
            <p className="text-xs sm:text-sm text-black mt-1 italic font-serif">
              La Escuela Patrocinadora ({orgName}) y SPA otorgan el presente reconocimiento a:
            </p>
          </div>

          {/* Student Name */}
          <div className="my-4 border-b-2 border-black pb-1.5 max-w-lg mx-auto">
            <h1 className="text-2xl sm:text-4xl font-bold text-black tracking-wide font-serif">
              {attempt.studentName || 'Aspirante Destacado'}
            </h1>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-black max-w-2xl mx-auto leading-relaxed font-serif my-3">
            Por haber acreditado con <strong>calificación aprobatoria y destacada</strong> la evaluación oficial
            estandarizada <strong>{examTitle}</strong>, demostrando sobresaliente capacidad de razonamiento crítico,
            habilidades analíticas y aptitud académica con el respaldo de la escuela que patrocina la prueba.
          </p>

          {/* Scores Summary Badge */}
          <div className="my-4 max-w-xl mx-auto bg-white border-2 border-black p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div>
              <div className="text-[10px] text-black uppercase font-bold font-sans">{isPaa ? 'Lectura' : 'Cognoscitiva'}</div>
              <div className="font-extrabold text-black text-sm font-mono">{attempt.sectionScores.part1.score} / {attempt.sectionScores.part1.total}</div>
            </div>
            <div>
              <div className="text-[10px] text-black uppercase font-bold font-sans">{isPaa ? 'Redacción' : 'Español'}</div>
              <div className="font-extrabold text-black text-sm font-mono">{attempt.sectionScores.part2.score} / {attempt.sectionScores.part2.total}</div>
            </div>
            <div>
              <div className="text-[10px] text-black uppercase font-bold font-sans">Matemáticas</div>
              <div className="font-extrabold text-black text-sm font-mono">{attempt.sectionScores.part3.score} / {attempt.sectionScores.part3.total}</div>
            </div>
            <div>
              <div className="text-[10px] text-black uppercase font-bold font-sans">Inglés</div>
              <div className="font-extrabold text-black text-sm font-mono">{attempt.sectionScores.part4.score} / {attempt.sectionScores.part4.total}</div>
            </div>
          </div>

          <div className="text-center mb-4">
            <span className="inline-block bg-white text-black text-xs sm:text-sm font-bold px-4 py-1.5 font-mono uppercase border-2 border-black">
              Puntaje Total: {attempt.score} / {attempt.totalQuestions} ({percentage}%) • Escala {isPaa ? 'PAA' : 'PIENSE II'}: {estimatedScale} / {isPaa ? '1600' : '800'} pts
            </span>
          </div>

          {/* Signatures & Seal */}
          <div className="mt-6 pt-4 border-t-2 border-black grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div className="text-center">
              <div className="font-serif italic text-sm text-black border-b border-black pb-1 mx-4 font-semibold">
                Dirección de la Escuela Patrocinadora
              </div>
              <p className="text-[10px] text-black mt-1 uppercase font-mono">{orgName}</p>
            </div>

            {/* Institutional Seal - 100% Monochrome */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full border-4 border-double border-black flex flex-col items-center justify-center text-black bg-white">
                <GraduationCap className="w-6 h-6 stroke-[2]" />
                <span className="text-[8px] font-bold uppercase tracking-tighter mt-0.5 font-mono">Acreditado</span>
                <span className="text-[7px] font-semibold uppercase">Escuela Patrocinadora</span>
              </div>
              <span className="text-[9px] text-black mt-1 font-mono">Folio: #{attempt.id.slice(-6).toUpperCase()}</span>
            </div>

            <div className="text-center">
              <div className="font-serif text-sm text-black border-b border-black pb-1 mx-4 font-semibold">
                {dateStr}
              </div>
              <p className="text-[10px] text-black mt-1 uppercase font-mono">Fecha de Acreditación</p>
            </div>
          </div>
        </div>
      </div>

      {/* Print / Download Button Row - Monochrome */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 print:hidden font-sans">
        <div className="text-xs text-black font-serif">
          Documento con valor diagnóstico y constancia emitida por la escuela patrocinadora.
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-white hover:bg-black hover:text-white text-black text-xs font-bold px-4 py-2 border-2 border-black cursor-pointer transition uppercase"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Reconocimiento</span>
          </button>
        </div>
      </div>
    </div>
  );
};

