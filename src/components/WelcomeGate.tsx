import React, { useState } from 'react';
import { Play, History, FileText, GraduationCap, Building2 } from 'lucide-react';
import { ExamType } from '../types';
import { EXAM_DEFINITIONS, INSTITUTIONS_LIST } from '../data/examConfig';

interface WelcomeGateProps {
  studentName: string;
  onUpdateStudentName: (name: string) => void;
  selectedExam: ExamType;
  onSelectExam: (exam: ExamType) => void;
  studentOrganization: string;
  onUpdateOrganization: (org: string) => void;
  onStartExam: () => void;
  attemptsCount: number;
  onOpenHistory: () => void;
}

export const WelcomeGate: React.FC<WelcomeGateProps> = ({
  studentName,
  onUpdateStudentName,
  selectedExam,
  onSelectExam,
  studentOrganization,
  onUpdateOrganization,
  onStartExam,
  attemptsCount,
  onOpenHistory,
}) => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [customOrg, setCustomOrg] = useState<string>('');

  const currentDef = EXAM_DEFINITIONS[selectedExam];

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setErrorMsg('Por favor ingresa tu nombre completo antes de iniciar.');
      return;
    }
    setErrorMsg('');
    if (studentOrganization === 'Otro' && customOrg.trim()) {
      onUpdateOrganization(customOrg.trim());
    }
    onStartExam();
  };

  return (
    <div className="min-h-screen w-full bg-white text-black flex flex-col justify-between font-serif">
      {/* 100% White Top Header with Crisp Black Borders */}
      <header className="w-full bg-white text-black border-b-2 border-black py-4 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 border-2 border-black flex items-center justify-center bg-white shrink-0">
              <GraduationCap className="w-7 h-7 text-black stroke-[2]" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-black block font-bold">
                Simulacros De Pruebas Académicas
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight uppercase text-black">
                SPA
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono border-2 border-black px-3 py-1 uppercase tracking-wider bg-white text-black font-bold">
              Versión Oficial
            </span>
            {attemptsCount > 0 && (
              <button
                type="button"
                onClick={onOpenHistory}
                className="text-xs font-mono font-bold bg-white text-black px-3 py-1 border-2 border-black hover:bg-black hover:text-white cursor-pointer flex items-center gap-1.5 transition uppercase"
              >
                <History className="w-3.5 h-3.5" />
                <span>Historial ({attemptsCount})</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Full-Width Content Container - 100% White */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 flex-1 flex flex-col justify-center bg-white">
        {/* Main Information Box */}
        <div className="border-4 border-black p-6 sm:p-10 bg-white">
          {/* Section 1: Exam Selection Information Boxes */}
          <div className="mb-8">
            <div className="flex items-center justify-between pb-2 mb-4 border-b-2 border-black">
              <span className="text-xs sm:text-sm font-sans font-extrabold uppercase tracking-wider text-black">
                1. Selecciona la Prueba Estandarizada
              </span>
              <span className="text-[11px] font-mono text-black font-semibold">
                Activa: <strong className="text-black font-bold uppercase underline">{currentDef.shortTitle}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* PIENSE II Button Box */}
              <button
                type="button"
                onClick={() => onSelectExam('piense2')}
                className={`text-left p-5 transition-all cursor-pointer flex flex-col justify-between bg-white text-black ${
                  selectedExam === 'piense2'
                    ? 'border-4 border-black ring-2 ring-black'
                    : 'border-2 border-black hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
                    <span className="text-2xl font-extrabold font-serif tracking-tight text-black">
                      PIENSE II
                    </span>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 border-2 border-black ${
                      selectedExam === 'piense2' ? 'bg-black text-white' : 'bg-white text-black'
                    }`}>
                      {selectedExam === 'piense2' ? '✓ ACTIVO' : 'SELECCIONAR'}
                    </span>
                  </div>

                  <h2 className="text-xs sm:text-sm font-bold uppercase font-sans mb-1 text-black">
                    Prueba de Ingreso y Evaluación Media Superior
                  </h2>
                  <p className="text-xs font-serif leading-relaxed mb-4 text-black">
                    Evaluación de admisión y diagnóstico para <strong>PrepaTec</strong>, preparatorias y colegios de bachillerato.
                  </p>

                  <div className="p-3 border-2 border-black text-xs font-mono space-y-1 bg-white text-black">
                    <div className="font-bold">Estructura: 154 Reactivos • 130 Minutos</div>
                    <div className="text-[11px]">Parte 1: Habilidad Cognoscitiva (35 min)</div>
                    <div className="text-[11px]">Parte 2: Español / Lengua (30 min)</div>
                    <div className="text-[11px]">Parte 3: Matemáticas (35 min)</div>
                    <div className="text-[11px]">Parte 4: Inglés (30 min)</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t-2 border-black flex items-center justify-between text-xs font-sans text-black">
                  <span>Escala: 200 - 800 pts</span>
                  <span className="font-bold underline">
                    {selectedExam === 'piense2' ? 'Prueba Seleccionada' : 'Elegir PIENSE II'}
                  </span>
                </div>
              </button>

              {/* PAA Button Box - STRICTLY TITLE PAA */}
              <button
                type="button"
                onClick={() => onSelectExam('paa')}
                className={`text-left p-5 transition-all cursor-pointer flex flex-col justify-between bg-white text-black ${
                  selectedExam === 'paa'
                    ? 'border-4 border-black ring-2 ring-black'
                    : 'border-2 border-black hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
                    <span className="text-3xl font-extrabold font-serif tracking-tight text-black">
                      PAA
                    </span>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 border-2 border-black ${
                      selectedExam === 'paa' ? 'bg-black text-white' : 'bg-white text-black'
                    }`}>
                      {selectedExam === 'paa' ? '✓ ACTIVO' : 'SELECCIONAR'}
                    </span>
                  </div>

                  <p className="text-xs font-serif leading-relaxed mb-4 text-black">
                    Evaluación de razonamiento y filtro para nivel profesional, universidades y <strong>reclutamiento de talento</strong>.
                  </p>

                  <div className="p-3 border-2 border-black text-xs font-mono space-y-1 bg-white text-black">
                    <div className="font-bold">Estructura: 175 Reactivos • 180 Minutos</div>
                    <div className="text-[11px]">Parte 1: Lectura Crítica (50 min)</div>
                    <div className="text-[11px]">Parte 2: Redacción y Lengua (30 min)</div>
                    <div className="text-[11px]">Parte 3: Matemáticas / Razonamiento (60 min)</div>
                    <div className="text-[11px]">Parte 4: Inglés (40 min)</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t-2 border-black flex items-center justify-between text-xs font-sans text-black">
                  <span>Escala: 800 - 1600 pts</span>
                  <span className="font-bold underline">
                    {selectedExam === 'paa' ? 'Prueba Seleccionada' : 'Elegir PAA'}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Section 2: Registration Form */}
          <form onSubmit={handleStart} className="space-y-6 pt-4 border-t-2 border-black bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Candidate Name */}
              <div>
                <label htmlFor="studentName" className="block text-xs font-sans font-bold uppercase tracking-wider text-black mb-2">
                  Nombre Completo del Aspirante / Estudiante <span className="text-black font-mono font-bold">*</span>
                </label>
                <input
                  id="studentName"
                  type="text"
                  value={studentName}
                  onChange={(e) => {
                    onUpdateStudentName(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Ingresa tu nombre completo"
                  className="w-full px-4 py-3 border-2 border-black font-serif text-sm focus:outline-none focus:bg-slate-50 text-black bg-white"
                  autoFocus
                />
                {errorMsg && (
                  <p className="text-xs text-black font-sans font-bold mt-1.5 underline">
                    {errorMsg}
                  </p>
                )}
                <p className="text-[11px] text-black font-serif mt-1">
                  Este nombre se imprimirá en el certificado institucional y en el reporte final.
                </p>
              </div>

              {/* Institution / School / Organization Selection */}
              <div>
                <label htmlFor="studentOrg" className="block text-xs font-sans font-bold uppercase tracking-wider text-black mb-2 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Escuela Patrocinadora, Colegio o Institución</span>
                </label>
                <select
                  id="studentOrg"
                  value={studentOrganization}
                  onChange={(e) => onUpdateOrganization(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-black font-serif text-sm focus:outline-none focus:bg-slate-50 text-black bg-white cursor-pointer"
                >
                  {INSTITUTIONS_LIST.map((inst) => (
                    <option key={inst} value={inst}>
                      {inst}
                    </option>
                  ))}
                  <option value="Otro">Otra Escuela o Institución Patrocinadora...</option>
                </select>

                {studentOrganization === 'Otro' && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={customOrg}
                      onChange={(e) => setCustomOrg(e.target.value)}
                      placeholder="Escribe el nombre de tu escuela patrocinadora"
                      className="w-full px-3 py-2 border-2 border-black font-serif text-xs text-black bg-white"
                    />
                  </div>
                )}
                <p className="text-[11px] text-black font-serif mt-1">
                  Aparecerá en el certificado oficial y en el reporte final como escuela patrocinadora.
                </p>
              </div>
            </div>

            {/* Regulatory Instructions Information Box - 100% White */}
            <div className="border-2 border-black p-4 bg-white text-xs text-black space-y-1.5 font-sans">
              <div className="font-bold uppercase tracking-wide flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                <span>Normas Reglamentarias de Aplicación</span>
              </div>
              <p className="font-serif text-black leading-relaxed">
                Esta evaluación consta de cuatro partes consecutivas cronometradas con tiempo improrrogable. Al expirar el tiempo de cada sección, se bloquean las respuestas y se habilita la siguiente parte. La interfaz se mantiene en formato riguroso blanco y negro reglamentario.
              </p>
            </div>

            {/* Start Button - Prominent Information/Action Box - 100% White with Black Borders */}
            <button
              type="submit"
              className="w-full bg-white hover:bg-black hover:text-white text-black font-sans font-extrabold py-4 px-6 border-4 border-black transition flex items-center justify-center gap-2 text-base uppercase tracking-wider cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Comenzar Prueba {currentDef.shortTitle}</span>
            </button>
          </form>
        </div>
      </main>

      {/* Footer - 100% White */}
      <footer className="w-full border-t-2 border-black bg-white py-4 px-4 text-center font-mono text-xs text-black">
        SPA • Simulacros De Pruebas Académicas • Escuelas Patrocinadoras e Instituciones Educativas • Versión Oficial
      </footer>
    </div>
  );
};
