/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ArrowRight, 
  Lock, 
  Clock, 
} from 'lucide-react';
import { AnswerOption, ExamAttempt, ExamType, Question } from './types';
import { MicrosoftFormsHeader } from './components/MicrosoftFormsHeader';
import { QuestionCard } from './components/QuestionCard';
import { SubmissionSuccess } from './components/SubmissionSuccess';
import { ResultsView } from './components/ResultsView';
import { HistoryModal } from './components/HistoryModal';
import { WelcomeGate } from './components/WelcomeGate';
import { StopSignBanner } from './components/StopSignBanner';
import { ResetWarningModal } from './components/ResetWarningModal';
import { LandingHero } from './components/LandingHero';
import { EXAM_DEFINITIONS, DEFAULT_SPONSORING_ORG } from './data/examConfig';
import { SectionInfo } from './data/allQuestions';

const STORAGE_ANSWERS_KEY = 'exam_current_answers';
const STORAGE_ATTEMPTS_KEY = 'exam_attempts_history';
const STORAGE_STUDENT_KEY = 'exam_student_name';
const STORAGE_ORG_KEY = 'exam_student_organization';
const STORAGE_STATUS_KEY = 'exam_test_status';
const STORAGE_PART_KEY = 'exam_current_part';
const STORAGE_TIMER_KEY = 'exam_part_timer';
const STORAGE_EXAM_TYPE_KEY = 'exam_selected_type';
const STORAGE_THEME_KEY = 'spa_theme';

export default function App() {
  // Dark mode vs Bright/Light mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_THEME_KEY);
    return saved === 'dark';
  });

  // Apply or remove .dark class on html
  useEffect(() => {
    localStorage.setItem(STORAGE_THEME_KEY, darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // Selected Exam Type: 'piense2' | 'paa'
  const [selectedExam, setSelectedExam] = useState<ExamType>(() => {
    const saved = localStorage.getItem(STORAGE_EXAM_TYPE_KEY);
    return saved === 'paa' || saved === 'piense2' ? saved : 'piense2';
  });

  // Student organization: DEFAULT IS ALWAYS 'Ninguna'
  const [studentOrganization, setStudentOrganization] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_ORG_KEY);
    return saved && saved !== 'Instituto Mater' ? saved : DEFAULT_SPONSORING_ORG;
  });

  // Active exam definition
  const examDef = EXAM_DEFINITIONS[selectedExam];
  const allActiveQuestions: Question[] = examDef.questions;
  const activeSections: SectionInfo[] = examDef.sections;
  const activePartDurations: Record<number, number> = examDef.partDurations;

  // Test status: 'landing' (inicio CLARIFY), 'spa' (Sección SPA), 'exam', 'submitted', 'results'
  const [testStatus, setTestStatus] = useState<'landing' | 'spa' | 'exam' | 'submitted' | 'results'>(() => {
    const saved = localStorage.getItem(STORAGE_STATUS_KEY);
    if (saved === 'exam' || saved === 'submitted' || saved === 'results') {
      return saved as any;
    }
    return 'landing';
  });

  // Student name
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem(STORAGE_STUDENT_KEY) || '';
  });

  // Current active part: strictly 1 -> 2 -> 3 -> 4
  const [currentPart, setCurrentPart] = useState<1 | 2 | 3 | 4>(() => {
    const saved = localStorage.getItem(STORAGE_PART_KEY);
    const parsed = saved ? parseInt(saved, 10) : 1;
    return (parsed >= 1 && parsed <= 4 ? parsed : 1) as 1 | 2 | 3 | 4;
  });

  // Timer countdown in seconds for current part
  const [timeRemaining, setTimeRemaining] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_TIMER_KEY);
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= 0) return parsed;
    }
    return activePartDurations[1] || 1800;
  });

  // Is current part locked? (when time has expired)
  const isPartLocked = timeRemaining <= 0;

  // Answers map
  const [answers, setAnswers] = useState<Record<string, AnswerOption>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ANSWERS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Exam attempts history
  const [attempts, setAttempts] = useState<ExamAttempt[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ATTEMPTS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Latest finished attempt
  const [latestAttempt, setLatestAttempt] = useState<ExamAttempt | null>(null);

  // Review mode attempt
  const [reviewAttempt, setReviewAttempt] = useState<ExamAttempt | null>(null);

  // Modals state
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isResetWarningOpen, setIsResetWarningOpen] = useState<boolean>(false);

  // Exam start timestamp for total elapsed time calculation
  const examStartTimestampRef = useRef<number>(Date.now());

  // Save selected exam type
  useEffect(() => {
    localStorage.setItem(STORAGE_EXAM_TYPE_KEY, selectedExam);
  }, [selectedExam]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_ANSWERS_KEY, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_ATTEMPTS_KEY, JSON.stringify(attempts));
  }, [attempts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_STUDENT_KEY, studentName);
  }, [studentName]);

  useEffect(() => {
    localStorage.setItem(STORAGE_ORG_KEY, studentOrganization);
  }, [studentOrganization]);

  useEffect(() => {
    localStorage.setItem(STORAGE_STATUS_KEY, testStatus);
  }, [testStatus]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PART_KEY, currentPart.toString());
  }, [currentPart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_TIMER_KEY, timeRemaining.toString());
  }, [timeRemaining]);

  // Countdown timer effect
  useEffect(() => {
    if (testStatus !== 'exam') return;

    if (timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStatus, timeRemaining]);

  // Filter questions for the active part
  const currentPartQuestions = useMemo(() => {
    return allActiveQuestions.filter((q) => q.part === currentPart);
  }, [allActiveQuestions, currentPart]);

  // Current section details
  const currentSectionInfo = useMemo(() => {
    return activeSections.find((s) => s.id === currentPart) || activeSections[0];
  }, [activeSections, currentPart]);

  // Total answered in current section
  const answeredInCurrentPart = useMemo(() => {
    return currentPartQuestions.filter((q) => !!answers[q.id]).length;
  }, [currentPartQuestions, answers]);

  // Have all questions in this part been answered?
  const allQuestionsAnsweredInPart = answeredInCurrentPart === currentPartQuestions.length;

  // Handle selecting an answer
  const handleSelectAnswer = (questionId: string, answer: AnswerOption) => {
    if (isPartLocked) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Start exam from SPA WelcomeGate
  const handleStartExam = () => {
    setTestStatus('exam');
    setCurrentPart(1);
    setTimeRemaining(activePartDurations[1]);
    examStartTimestampRef.current = Date.now();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Continue to next part or submit
  const handleContinueToNextPart = () => {
    if (currentPart < 4) {
      const nextPart = (currentPart + 1) as 1 | 2 | 3 | 4;
      setCurrentPart(nextPart);
      setTimeRemaining(activePartDurations[nextPart]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleFinalSubmit();
    }
  };

  // Final evaluation and submission
  const handleFinalSubmit = () => {
    let score = 0;
    allActiveQuestions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    const totalQuestions = allActiveQuestions.length;
    const timeSpentSeconds = Math.max(
      60,
      Math.floor((Date.now() - examStartTimestampRef.current) / 1000)
    );

    const sectionScores = examDef.calculateSectionScores(answers);

    const newAttempt: ExamAttempt = {
      id: `attempt_${Date.now()}`,
      timestamp: Date.now(),
      studentName: studentName || 'Aspirante',
      studentOrganization: studentOrganization || DEFAULT_SPONSORING_ORG,
      score,
      totalQuestions,
      sectionScores,
      answers: { ...answers },
      timeSpentSeconds,
      examType: selectedExam,
    };

    setLatestAttempt(newAttempt);
    setAttempts((prev) => [newAttempt, ...prev]);
    setTestStatus('submitted');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start fresh attempt
  const handleStartNewAttempt = () => {
    setAnswers({});
    setCurrentPart(1);
    setTimeRemaining(activePartDurations[1]);
    setLatestAttempt(null);
    setReviewAttempt(null);
    setTestStatus('spa');
    examStartTimestampRef.current = Date.now();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Retry only missed questions
  const handleRetryIncorrectOnly = () => {
    if (!latestAttempt && !reviewAttempt) return;
    const sourceAttempt = latestAttempt || reviewAttempt!;

    const preservedAnswers: Record<string, AnswerOption> = {};
    allActiveQuestions.forEach((q) => {
      if (sourceAttempt.answers[q.id] === q.correctAnswer) {
        preservedAnswers[q.id] = sourceAttempt.answers[q.id];
      }
    });

    setAnswers(preservedAnswers);
    setCurrentPart(1);
    setTimeRemaining(activePartDurations[1]);
    setTestStatus('exam');
    examStartTimestampRef.current = Date.now();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fast forward timer helper for testing
  const handleDevFastForward = () => {
    setTimeRemaining(0);
  };

  // Reset exam warning trigger
  const handleRequestResetTest = () => {
    setIsResetWarningOpen(true);
  };

  const handleConfirmResetTest = () => {
    setIsResetWarningOpen(false);
    setAnswers({});
    setCurrentPart(1);
    setTimeRemaining(activePartDurations[1]);
    setTestStatus('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear history
  const handleClearHistory = () => {
    setAttempts([]);
    localStorage.removeItem(STORAGE_ATTEMPTS_KEY);
    setLatestAttempt(null);
    setReviewAttempt(null);
  };

  // Delete single attempt
  const handleDeleteSingleAttempt = (attemptId: string) => {
    const updated = attempts.filter((a) => a.id !== attemptId);
    setAttempts(updated);
    if (latestAttempt?.id === attemptId) {
      setLatestAttempt(updated[0] || null);
    }
    if (reviewAttempt?.id === attemptId) {
      setReviewAttempt(null);
    }
  };

  // Format time helper
  const formatTime = (secs: number) => {
    const clamped = Math.max(0, secs);
    const m = Math.floor(clamped / 60);
    const s = clamped % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Choose questions list for results / review
  const activeReviewQuestions = useMemo(() => {
    if (reviewAttempt && reviewAttempt.examType && EXAM_DEFINITIONS[reviewAttempt.examType as 'piense2' | 'paa']) {
      return EXAM_DEFINITIONS[reviewAttempt.examType as 'piense2' | 'paa'].questions;
    }
    return allActiveQuestions;
  }, [reviewAttempt, allActiveQuestions]);

  return (
    <div className={`min-h-screen w-full flex flex-col font-serif transition-colors duration-400 ${
      darkMode ? 'liquid-mesh-dark text-slate-100' : 'liquid-mesh-light text-slate-900'
    }`}>
      {/* 0. PANTALLA DE INICIO: CLARIFY con eslogan 5 palabras, solo modo oscuro arriba y botón Comenzar */}
      {testStatus === 'landing' && (
        <LandingHero
          onStart={() => setTestStatus('spa')}
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
        />
      )}

      {/* 1. SECCIÓN SPA: Simulacros De Pruebas Académicas (PAA y PIENSE II) */}
      {testStatus === 'spa' && (
        <WelcomeGate
          studentName={studentName}
          onUpdateStudentName={(name) => setStudentName(name)}
          selectedExam={selectedExam}
          onSelectExam={(exam) => {
            setSelectedExam(exam);
            setTimeRemaining(EXAM_DEFINITIONS[exam].partDurations[1]);
          }}
          studentOrganization={studentOrganization}
          onUpdateOrganization={(org) => setStudentOrganization(org)}
          onStartExam={handleStartExam}
          attemptsCount={attempts.length}
          onOpenHistory={() => setIsHistoryOpen(true)}
          onBackToLanding={() => setTestStatus('landing')}
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
        />
      )}

      {/* 2. EXAM VIEW: Formato estandarizado con esquinas redondeadas y bordes gris medio */}
      {testStatus === 'exam' && (
        <div className="flex-1 flex flex-col">
          <MicrosoftFormsHeader
            currentPart={currentPart}
            timeRemainingSeconds={timeRemaining}
            isPartLocked={isPartLocked}
            sections={activeSections}
            examShortTitle={examDef.shortTitle}
            onDevFastForward={handleDevFastForward}
            onResetTest={handleRequestResetTest}
            darkMode={darkMode}
            onToggleTheme={toggleTheme}
          />

          <main className="w-full max-w-[1550px] mx-auto px-4 sm:px-8 py-6 flex-1">
            {/* Exam Title Card (Part 1 only) */}
            {currentPart === 1 && (
              <div className="glass-panel rounded-3xl border border-slate-300/80 dark:border-slate-700/80 p-6 sm:p-8 mb-6 text-center shadow-md">
                {selectedExam === 'piense2' ? (
                  <>
                    <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-serif">
                      PIENSE II
                    </h1>
                    <div className="w-20 h-1 bg-indigo-500 rounded-full mx-auto my-3"></div>
                    <h2 className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider">
                      Prueba de Ingreso y Evaluación en la Educación Secundaria y Media Superior
                    </h2>
                    <p className="text-xs italic mt-1.5 font-serif opacity-80">
                      Folleto Oficial de Examen • Simulacro Estandarizado (154 Reactivos • 130 Minutos)
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="text-4xl sm:text-7xl font-extrabold uppercase tracking-tight font-serif">
                      PAA
                    </h1>
                    <div className="w-20 h-1 bg-indigo-500 rounded-full mx-auto my-3"></div>
                    <h2 className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider">
                      Prueba de Aptitud Académica
                    </h2>
                    <p className="text-xs italic mt-1.5 font-serif opacity-80">
                      Folleto Oficial de Examen • Simulacro Estandarizado (175 Reactivos • 180 Minutos)
                    </p>
                  </>
                )}
              </div>
            )}

            {/* Section Title Banner with Rounded Corners */}
            <div className="glass-panel rounded-2xl border border-slate-300/80 dark:border-slate-700/80 p-5 mb-6 text-center shadow-sm">
              <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight font-serif">
                Parte {currentPart}: {currentSectionInfo.name}
              </h2>
              <div className="w-16 h-0.5 bg-indigo-500 rounded-full mx-auto my-2"></div>
              <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-mono font-medium flex-wrap opacity-85">
                <span>{currentPartQuestions.length} Reactivos</span>
                <span>•</span>
                <span>Tiempo asignado: {currentSectionInfo.durationMinutes} minutos</span>
              </div>
              <p className="text-xs font-serif italic mt-1.5 opacity-80">
                {currentSectionInfo.description}
              </p>
            </div>

            {/* Status & Timing Banners with Rounded Corners */}
            {isPartLocked ? (
              <div className="glass-panel rounded-2xl border border-slate-300/80 dark:border-slate-700/80 p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans shadow-sm">
                <div className="flex items-center gap-2.5">
                  <Lock className="w-5 h-5 text-indigo-500 shrink-0" />
                  <div>
                    <div className="font-bold text-sm">Tiempo de la sección concluido</div>
                    <div className="text-xs opacity-75 font-serif">
                      Las respuestas de esta parte están bloqueadas en modo lectura. Presiona continuar para avanzar.
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleContinueToNextPart}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 text-xs sm:text-sm rounded-xl flex items-center gap-2 shrink-0 cursor-pointer transition uppercase btn-dynamic shadow-md"
                >
                  <span>{currentPart < 4 ? `Continuar a la Parte ${currentPart + 1}` : 'Finalizar Examen'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : allQuestionsAnsweredInPart ? (
              <div className="glass-panel rounded-2xl border border-slate-300/80 dark:border-slate-700/80 p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-serif shadow-sm">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-indigo-500 shrink-0" />
                  <div>
                    <div className="font-bold text-sm">Has respondido todas las preguntas de esta parte</div>
                    <div className="text-xs opacity-80 leading-relaxed">
                      Por reglamento oficial, debes esperar a que termine el tiempo ({formatTime(timeRemaining)}) para continuar. Puedes repasar tus respuestas de esta sección.
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleDevFastForward}
                  className="text-xs text-indigo-600 dark:text-sky-400 hover:underline shrink-0 font-sans cursor-pointer font-bold uppercase btn-dynamic"
                  title="Acelerar espera para pruebas"
                >
                  Adelantar timer ({formatTime(timeRemaining)})
                </button>
              </div>
            ) : null}

            {/* Questions List for Current Part */}
            <div className="space-y-4">
              {currentPartQuestions.map((q) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  selectedAnswer={answers[q.id]}
                  onSelectAnswer={handleSelectAnswer}
                  isLocked={isPartLocked}
                />
              ))}
            </div>

            {/* Official STOP Banner with Rounded Corners */}
            <StopSignBanner
              currentPart={currentPart}
              timeRemainingSeconds={timeRemaining}
              isPartLocked={isPartLocked}
              totalQuestionsInPart={currentPartQuestions.length}
              answeredInPart={answeredInCurrentPart}
              sections={activeSections}
              examName={examDef.title}
            />

            {/* Bottom Progression Bar */}
            <div className="mt-8 border-t border-slate-300/70 dark:border-slate-700/70 pt-6 pb-12 font-sans">
              {isPartLocked ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel rounded-2xl border border-slate-300/80 dark:border-slate-700/80 p-4 shadow-sm">
                  <div className="text-xs font-serif opacity-90">
                    <strong>Parte {currentPart} finalizada.</strong> Tus respuestas han quedado registradas.
                  </div>
                  <button
                    onClick={handleContinueToNextPart}
                    className="w-full sm:w-auto bg-gradient-to-r from-slate-900 to-indigo-950 dark:from-sky-500 dark:to-indigo-600 text-white font-bold px-6 py-3 rounded-2xl text-sm flex items-center justify-center gap-2 cursor-pointer transition btn-dynamic shadow-md"
                  >
                    <span>{currentPart < 4 ? `Continuar a la Parte ${currentPart + 1}` : 'Finalizar Examen y Ver Resultados'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : allQuestionsAnsweredInPart ? (
                <div className="glass-panel rounded-2xl border border-slate-300/80 dark:border-slate-700/80 p-5 text-center shadow-sm">
                  <p className="text-sm font-bold font-serif mb-1">
                    Has completado las {currentPartQuestions.length} preguntas de la Parte {currentPart}.
                  </p>
                  <p className="text-xs opacity-75 font-serif">
                    El botón de continuar estará disponible cuando el temporizador llegue a <strong>00:00</strong> (Tiempo restante: <strong>{formatTime(timeRemaining)}</strong>).
                  </p>
                </div>
              ) : (
                <div className="flex justify-between items-center text-xs opacity-75 font-serif">
                  <span>Respondidas: {answeredInCurrentPart} de {currentPartQuestions.length}</span>
                  <span>Tiempo restante: <strong className="font-mono opacity-100">{formatTime(timeRemaining)}</strong></span>
                </div>
              )}
            </div>
          </main>
        </div>
      )}

      {/* 3. SUBMISSION SUCCESS VIEW */}
      {testStatus === 'submitted' && latestAttempt && (
        <SubmissionSuccess
          latestAttempt={latestAttempt}
          questions={activeReviewQuestions}
          onViewResults={() => setTestStatus('results')}
          onNewFullAttempt={handleStartNewAttempt}
          onRetryIncorrectOnly={handleRetryIncorrectOnly}
          onOpenHistory={() => setIsHistoryOpen(true)}
          onBackToMainMenu={() => setTestStatus('landing')}
        />
      )}

      {/* 4. RESULTS & RECOGNITION VIEW */}
      {testStatus === 'results' && (latestAttempt || reviewAttempt) && (
        <ResultsView
          questions={activeReviewQuestions}
          attempt={reviewAttempt || latestAttempt!}
          sections={activeSections}
          onNewFullAttempt={handleStartNewAttempt}
          onRetryIncorrectOnly={handleRetryIncorrectOnly}
          onOpenHistory={() => setIsHistoryOpen(true)}
          onBackToForm={() => setTestStatus('submitted')}
          onBackToMainMenu={() => setTestStatus('landing')}
        />
      )}

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        attempts={attempts}
        onSelectAttemptForReview={(attempt) => {
          setReviewAttempt(attempt);
          if (attempt.examType && EXAM_DEFINITIONS[attempt.examType as 'piense2' | 'paa']) {
            setSelectedExam(attempt.examType as 'piense2' | 'paa');
          }
          setTestStatus('results');
        }}
        onClearHistory={handleClearHistory}
        onDeleteSingleAttempt={handleDeleteSingleAttempt}
      />

      {/* Reset Test Warning Modal */}
      <ResetWarningModal
        isOpen={isResetWarningOpen}
        onClose={() => setIsResetWarningOpen(false)}
        onConfirmReset={handleConfirmResetTest}
      />
    </div>
  );
}
