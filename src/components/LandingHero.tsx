import React from 'react';
import { 
  ArrowRight, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Clock, 
  Award,
  Layers
} from 'lucide-react';

interface LandingHeroProps {
  onStart: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStart,
  darkMode,
  onToggleTheme,
}) => {
  return (
    <div className={`min-h-screen w-full flex flex-col justify-between relative overflow-hidden transition-colors duration-500 font-serif ${
      darkMode ? 'liquid-mesh-dark text-slate-100' : 'liquid-mesh-light text-slate-900'
    }`}>
      {/* Dynamic ambient blur decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 dark:bg-blue-500/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 dark:bg-cyan-500/15 blur-3xl pointer-events-none" />

      {/* Top bar with ONLY the Dark Mode / Bright Mode option */}
      <header className="w-full relative z-20 px-6 py-5 flex justify-end">
        <button
          onClick={onToggleTheme}
          className={`p-2.5 sm:px-4 sm:py-2.5 rounded-2xl border flex items-center gap-2 text-xs font-semibold cursor-pointer btn-dynamic font-sans shadow-sm ${
            darkMode 
              ? 'bg-slate-800/80 border-slate-700/80 text-amber-300 hover:text-amber-200' 
              : 'bg-white/80 border-slate-300 text-slate-700 hover:text-slate-900'
          }`}
          title={darkMode ? 'Cambiar a Modo Brillante' : 'Cambiar a Modo Oscuro'}
        >
          {darkMode ? <Sun className="w-4 h-4 fill-current" /> : <Moon className="w-4 h-4 fill-current" />}
          <span>{darkMode ? 'Modo Brillante' : 'Modo Oscuro'}</span>
        </button>
      </header>

      {/* Main Hero Center Content */}
      <main className="w-full max-w-4xl mx-auto px-6 py-6 relative z-10 flex-1 flex flex-col justify-center items-center text-center">
        {/* Glass Hero Card with medium-gray rounded borders */}
        <div className="w-full glass-panel rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl border border-slate-300/80 dark:border-slate-700/80">
          
          {/* Definite Brand Title: CLARIFY - Organized elegantly without the logo box */}
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight uppercase font-sans mb-3 leading-none bg-gradient-to-r from-slate-900 via-indigo-900 to-sky-900 dark:from-white dark:via-sky-200 dark:to-indigo-300 bg-clip-text text-transparent select-none">
            CLARIFY
          </h1>

          {/* 5-Word Attractive Slogan */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-sans tracking-wide uppercase opacity-90 mb-4 text-indigo-600 dark:text-sky-300">
            Claridad académica para tu éxito
          </h2>

          {/* Refined gradient accent separator */}
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full mx-auto mb-6 opacity-75"></div>

          {/* Brief Description */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed opacity-85 font-serif mb-8">
            Portal oficial de simulacros estandarizados de pruebas académicas (SPA). Prepárate para las evaluaciones de admisión y diagnóstico <strong>PAA</strong> y <strong>PIENSE II</strong> con cronometraje riguroso por partes, desglose de reactivos y certificados oficiales descargables.
          </p>

          {/* Central SPA Simulation Showcase Box */}
          <div className="max-w-2xl mx-auto p-6 rounded-2xl border border-slate-300/80 dark:border-slate-700/80 bg-white/60 dark:bg-slate-800/60 shadow-md mb-8 text-left font-sans">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-300/60 dark:border-slate-700/60">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-500" />
                <span className="text-xs font-bold uppercase tracking-wider opacity-85">
                  Simulacros Oficiales SPA
                </span>
              </div>
              <span className="text-[11px] font-mono opacity-75">
                Escuela Patrocinadora: <strong>Ninguna</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-300/70 dark:border-slate-700/70 bg-white/40 dark:bg-slate-900/40">
                <div className="font-extrabold font-serif text-sm text-indigo-600 dark:text-sky-300 mb-1">
                  Examen PIENSE II
                </div>
                <div className="opacity-80 font-mono text-[11px] space-y-0.5">
                  <div>• 154 Reactivos • 130 Minutos</div>
                  <div>• 4 Partes con cronómetro estricto</div>
                  <div>• Escala oficial 200 - 800 pts</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-300/70 dark:border-slate-700/70 bg-white/40 dark:bg-slate-900/40">
                <div className="font-extrabold font-serif text-sm text-indigo-600 dark:text-sky-300 mb-1">
                  Examen PAA
                </div>
                <div className="opacity-80 font-mono text-[11px] space-y-0.5">
                  <div>• 175 Reactivos • 180 Minutos</div>
                  <div>• 4 Partes con cronómetro estricto</div>
                  <div>• Escala oficial 800 - 1600 pts</div>
                </div>
              </div>
            </div>

            {/* Prominent Action Button: Comenzar */}
            <div className="mt-6">
              <button
                onClick={onStart}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 dark:from-sky-500 dark:to-indigo-600 text-white font-extrabold text-base tracking-wide flex items-center justify-center gap-3 shadow-xl cursor-pointer btn-dynamic btn-glow-primary transition-all uppercase"
              >
                <span>Comenzar</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Feature highlights bar with rounded corners and medium gray border */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-300/70 dark:border-slate-700/70 text-left font-sans text-xs">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-300/60 dark:border-slate-700/60">
              <Clock className="w-5 h-5 text-indigo-500 shrink-0" />
              <div>
                <div className="font-bold">Cronometraje Improrrogable</div>
                <div className="opacity-75 text-[11px]">Secciones con tiempo oficial</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-300/60 dark:border-slate-700/60">
              <Award className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <div className="font-bold">Certificados Institucionales</div>
                <div className="opacity-75 text-[11px]">Formatos PDF, Word y Docs</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-300/60 dark:border-slate-700/60">
              <ShieldCheck className="w-5 h-5 text-sky-500 shrink-0" />
              <div>
                <div className="font-bold">Escuela Patrocinadora</div>
                <div className="opacity-75 text-[11px]">Por default: Ninguna</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Liquid Glass Footer */}
      <footer className="w-full relative z-20 py-4 px-6 text-center">
        <div className="max-w-4xl mx-auto glass-panel-subtle rounded-2xl py-3 px-4 font-mono text-[11px] opacity-75 border border-slate-300/60 dark:border-slate-700/60">
          CLARIFY • Claridad académica para tu éxito • Simulacros De Pruebas Académicas (SPA)
        </div>
      </footer>
    </div>
  );
};
