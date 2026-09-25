import React, { useState } from 'react';
import { 
  Play, 
  History, 
  FileText, 
  Building2, 
  Sun, 
  Moon, 
  ArrowLeft, 
  Layers
} from 'lucide-react';
import { ExamType } from '../types';
import { EXAM_DEFINITIONS, INSTITUTIONS_LIST, DEFAULT_SPONSORING_ORG } from '../data/examConfig';

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
  onBackToLanding: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
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
  onBackToLanding,
  darkMode,
  onToggleTheme,
}) => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [customOrg, setCustomOrg] = useState<string>('');

  const currentDef = EXAM_DEFINITIONS[selectedExam as 'piense2' | 'paa'] || EXAM_DEFINITIONS.piense2;

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setErrorMsg('Por favor ingresa tu nombre completo antes de iniciar.');
      return;
    }
    setErrorMsg('');
    if (studentOrganization === 'Otro' && customOrg.trim()) {
      onUpdateOrganization(customOrg.trim());
    } else if (!studentOrganization) {
      onUpdateOrganization(DEFAULT_SPONSORING_ORG);
    }
    onStartExam();
  };

  return (
    <div className={`min-h-screen w-full flex flex-col justify-between font-serif transition-colors duration-400 ${
      darkMode ? 'liquid-mesh-dark text-slate-100' : 'liquid-mesh-light text-slate-900'
    }`}>
      {/* Liquid Glass Header with Medium Gray Borders & Rounded Corners */}
      <header className="w-full relative z-20 px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto glass-panel rounded-2xl px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-300/80 dark:border-slate-700/80 shadow-md">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToLanding}
              className={`p-2 sm:px-3 rounded-xl border flex items-center gap-1.5 text-xs font-semibold cursor-pointer btn-dynamic font-sans ${
                darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
              }`}
              title="Volver a la Pantalla de Inicio CLARIFY"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Inicio</span>
            </button>

            <div className="border-l border-slate-300/80 dark:border-slate-700/80 pl-3">
              <div className="text-[10px] font-mono uppercase tracking-wider font-bold opacity-80 text-sky-600 dark:text-sky-300">
                CLARIFY • SECCIÓN SPA
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold font-serif tracking-tight">
                Simulacros De Pruebas Académicas
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 font-sans">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={onToggleTheme}
              className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-semibold cursor-pointer btn-dynamic ${
                darkMode 
                  ? 'bg-slate-800/80 border-slate-700 text-amber-300' 
                  : 'bg-white/80 border-slate-300 text-slate-700'
              }`}
              title={darkMode ? 'Cambiar a Modo Brillante' : 'Cambiar a Modo Oscuro'}
            >
              {darkMode ? <Sun className="w-4 h-4 fill-current" /> : <Moon className="w-4 h-4 fill-current" />}
              <span className="hidden md:inline">{darkMode ? 'Modo Brillante' : 'Modo Oscuro'}</span>
            </button>

            {attemptsCount > 0 && (
              <button
                type="button"
                onClick={onOpenHistory}
                className={`text-xs font-mono font-bold px-3 py-1.5 rounded-xl border cursor-pointer flex items-center gap-1.5 btn-dynamic uppercase ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Historial ({attemptsCount})</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Full-Width Content Container with Medium Gray Borders & Rounded Corners */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 flex-1 flex flex-col justify-center relative z-10">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-300/80 dark:border-slate-700/80">
          
          {/* Section 1: Exam Selection Information Boxes */}
          <div className="mb-8">
            <div className="flex items-center justify-between pb-2 mb-4 border-b border-slate-300/70 dark:border-slate-700/70">
              <span className="text-xs sm:text-sm font-sans font-extrabold uppercase tracking-wider opacity-90 flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-500" />
                <span>1. Selecciona la Prueba Estandarizada SPA</span>
              </span>
              <span className="text-[11px] font-mono font-semibold opacity-80">
                Activa: <strong className="uppercase underline font-bold">{currentDef.shortTitle}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* PIENSE II Button Box with Rounded Corners and Medium Gray Border */}
              <button
                type="button"
                onClick={() => onSelectExam('piense2')}
                className={`text-left p-5 rounded-2xl transition-all cursor-pointer flex flex-col justify-between btn-dynamic border ${
                  selectedExam === 'piense2'
                    ? 'border-indigo-600 dark:border-sky-400 bg-indigo-50/50 dark:bg-sky-950/30 shadow-md ring-2 ring-indigo-500/20'
                    : 'border-slate-300/80 dark:border-slate-700/80 bg-white/50 dark:bg-slate-800/40 hover:bg-white/80 dark:hover:bg-slate-800/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-slate-300/60 dark:border-slate-700/60 pb-2">
                    <span className="text-2xl font-extrabold font-serif tracking-tight">
                      PIENSE II
                    </span>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                      selectedExam === 'piense2' 
                        ? 'bg-indigo-600 text-white border-indigo-600' 
                        : 'bg-white/60 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700'
                    }`}>
                      {selectedExam === 'piense2' ? '✓ ACTIVO' : 'SELECCIONAR'}
                    </span>
                  </div>

                  <h2 className="text-xs sm:text-sm font-bold uppercase font-sans mb-1 opacity-90">
                    Prueba de Ingreso y Evaluación Media Superior
                  </h2>
                  <p className="text-xs font-serif leading-relaxed mb-4 opacity-80">
                    Evaluación de admisión y diagnóstico para <strong>PrepaTec</strong>, preparatorias y colegios de bachillerato.
                  </p>

                  <div className="p-3 rounded-xl border border-slate-300/70 dark:border-slate-700/70 text-xs font-mono space-y-1 bg-white/40 dark:bg-slate-900/40">
                    <div className="font-bold">Estructura: 154 Reactivos • 130 Minutos</div>
                    <div className="text-[11px] opacity-80">Parte 1: Habilidad Cognoscitiva (35 min)</div>
                    <div className="text-[11px] opacity-80">Parte 2: Español / Lengua (30 min)</div>
                    <div className="text-[11px] opacity-80">Parte 3: Matemáticas (35 min)</div>
                    <div className="text-[11px] opacity-80">Parte 4: Inglés (30 min)</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-300/60 dark:border-slate-700/60 flex items-center justify-between text-xs font-sans">
                  <span className="opacity-75">Escala: 200 - 800 pts</span>
                  <span className="font-bold underline">
                    {selectedExam === 'piense2' ? 'Prueba Seleccionada' : 'Elegir PIENSE II'}
                  </span>
                </div>
              </button>

              {/* PAA Button Box with Rounded Corners and Medium Gray Border */}
              <button
                type="button"
                onClick={() => onSelectExam('paa')}
                className={`text-left p-5 rounded-2xl transition-all cursor-pointer flex flex-col justify-between btn-dynamic border ${
                  selectedExam === 'paa'
                    ? 'border-indigo-600 dark:border-sky-400 bg-indigo-50/50 dark:bg-sky-950/30 shadow-md ring-2 ring-indigo-500/20'
                    : 'border-slate-300/80 dark:border-slate-700/80 bg-white/50 dark:bg-slate-800/40 hover:bg-white/80 dark:hover:bg-slate-800/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-slate-300/60 dark:border-slate-700/60 pb-2">
                    <span className="text-3xl font-extrabold font-serif tracking-tight">
                      PAA
                    </span>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                      selectedExam === 'paa' 
                        ? 'bg-indigo-600 text-white border-indigo-600' 
                        : 'bg-white/60 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700'
                    }`}>
                      {selectedExam === 'paa' ? '✓ ACTIVO' : 'SELECCIONAR'}
                    </span>
                  </div>

                  <p className="text-xs font-serif leading-relaxed mb-4 opacity-80">
                    Evaluación de razonamiento y filtro para nivel profesional, universidades y <strong>reclutamiento de talento</strong>.
                  </p>

                  <div className="p-3 rounded-xl border border-slate-300/70 dark:border-slate-700/70 text-xs font-mono space-y-1 bg-white/40 dark:bg-slate-900/40">
                    <div className="font-bold">Estructura: 175 Reactivos • 180 Minutos</div>
                    <div className="text-[11px] opacity-80">Parte 1: Lectura Crítica (50 min)</div>
                    <div className="text-[11px] opacity-80">Parte 2: Redacción y Lengua (30 min)</div>
                    <div className="text-[11px] opacity-80">Parte 3: Matemáticas / Razonamiento (60 min)</div>
                    <div className="text-[11px] opacity-80">Parte 4: Inglés (40 min)</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-300/60 dark:border-slate-700/60 flex items-center justify-between text-xs font-sans">
                  <span className="opacity-75">Escala: 800 - 1600 pts</span>
                  <span className="font-bold underline">
                    {selectedExam === 'paa' ? 'Prueba Seleccionada' : 'Elegir PAA'}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Section 2: Registration Form */}
          <form onSubmit={handleStart} className="space-y-6 pt-4 border-t border-slate-300/70 dark:border-slate-700/70">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Candidate Name */}
              <div>
                <label htmlFor="studentName" className="block text-xs font-sans font-bold uppercase tracking-wider mb-2">
                  Nombre Completo del Aspirante / Estudiante <span className="text-red-500 font-mono font-bold">*</span>
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
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 font-serif text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/70 dark:bg-slate-800/70"
                  autoFocus
                />
                {errorMsg && (
                  <p className="text-xs text-red-500 dark:text-red-400 font-sans font-bold mt-1.5">
                    {errorMsg}
                  </p>
                )}
                <p className="text-[11px] opacity-75 font-serif mt-1">
                  Se imprimirá en el certificado institucional y en el reporte final.
                </p>
              </div>

              {/* Institution / School / Organization Selection (Default: Ninguna) */}
              <div>
                <label htmlFor="studentOrg" className="block text-xs font-sans font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Escuela Patrocinadora (Por default: Ninguna)</span>
                </label>
                <select
                  id="studentOrg"
                  value={studentOrganization}
                  onChange={(e) => onUpdateOrganization(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 font-serif text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/70 dark:bg-slate-800/70 cursor-pointer"
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
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-serif text-xs bg-white/70 dark:bg-slate-800/70"
                    />
                  </div>
                )}
                <p className="text-[11px] opacity-75 font-serif mt-1">
                  Aparecerá en el certificado oficial como escuela patrocinadora.
                </p>
              </div>
            </div>

            {/* Regulatory Instructions Information Box */}
            <div className="rounded-2xl border border-slate-300/80 dark:border-slate-700/80 p-4 bg-white/40 dark:bg-slate-800/40 text-xs space-y-1.5 font-sans">
              <div className="font-bold uppercase tracking-wide flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-500" />
                <span>Normas Reglamentarias de Aplicación</span>
              </div>
              <p className="font-serif leading-relaxed opacity-85">
                Esta evaluación consta de cuatro partes consecutivas cronometradas con tiempo improrrogable. Al expirar el tiempo de cada sección, se bloquean las respuestas y se habilita la siguiente parte. La interfaz se mantiene en formato riguroso blanco y negro reglamentario para recrear la prueba real.
              </p>
            </div>

            {/* Start Button */}
            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 dark:from-sky-500 dark:to-indigo-600 hover:opacity-95 text-white font-sans font-extrabold py-4 px-6 shadow-xl transition flex items-center justify-center gap-2 text-base uppercase tracking-wider cursor-pointer btn-dynamic btn-glow-primary"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Comenzar Prueba {currentDef.shortTitle}</span>
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full relative z-20 py-4 px-6 text-center font-mono text-xs opacity-75">
        CLARIFY • Sección SPA • Escuela Patrocinadora por Defecto: Ninguna
      </footer>
    </div>
  );
};
