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
import { EXAM_DEFINITIONS } from './data/examConfig';

const STORAGE_ANSWERS_KEY = 'exam_current_answers';
const STORAGE_ATTEMPTS_KEY = 'exam_attempts_history';
const STORAGE_STUDENT_KEY = 'exam_student_name';
const STORAGE_ORG_KEY = 'exam_student_organization';
const STORAGE_STATUS_KEY = 'exam_test_status';
const STORAGE_PART_KEY = 'exam_current_part';
const STORAGE_TIMER_KEY = 'exam_part_timer';
const STORAGE_EXAM_TYPE_KEY = 'exam_selected_type';

export default function App() {
  // Selected Exam Type: 'piense2' | 'paa'
  const [selectedExam, setSelectedExam] = useState<ExamType>(() => {
    const saved = localStorage.getItem(STORAGE_EXAM_TYPE_KEY);
    return saved === 'paa' || saved === 'piense2' ? saved : 'piense2';
  });

  // Student organization / institution (Instituto Mater, PrepaTec, Tec, etc.)
  const [studentOrganization, setStudentOrganization] = useState<string>(() => {
    return localStorage.getItem(STORAGE_ORG_KEY) || 'Instituto Mater';
  });

  // Active exam definition
  const examDef = EXAM_DEFINITIONS[selectedExam];
  const allActiveQuestions = examDef.questions;
  const activeSections = examDef.sections;
  const activePartDurations = examDef.partDurations;

  // Test status: 'gate' (menu principal), 'exam' (en curso), 'submitted', 'results'
  const [testStatus, setTestStatus] = useState<'gate' | 'exam' | 'submitted' | 'results'>(() => {
    const saved = localStorage.getItem(STORAGE_STATUS_KEY);
    if (saved === 'exam' || saved === 'submitted' || saved === 'results') {
      return saved as any;
    }
    return 'gate';
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
    return activePartDurations[1];
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

  // History of attempts (infinite attempts)
  const [attempts, setAttempts] = useState<ExamAttempt[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ATTEMPTS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [latestAttempt, setLatestAttempt] = useState<ExamAttempt | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ATTEMPTS_KEY);
      const parsed: ExamAttempt[] = saved ? JSON.parse(saved) : [];
      return parsed.length > 0 ? parsed[0] : null;
    } catch {
      return null;
    }
  });

  const [reviewAttempt, setReviewAttempt] = useState<ExamAttempt | null>(null);

  // Modals
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isResetWarningOpen, setIsResetWarningOpen] = useState<boolean>(false);

  // Timer interval ref
  const timerRef = useRef<any>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_EXAM_TYPE_KEY, selectedExam);
  }, [selectedExam]);

  useEffect(() => {
    localStorage.setItem(STORAGE_ORG_KEY, studentOrganization);
  }, [studentOrganization]);

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
    localStorage.setItem(STORAGE_STATUS_KEY, testStatus);
  }, [testStatus]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PART_KEY, currentPart.toString());
  }, [currentPart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_TIMER_KEY, timeRemaining.toString());
  }, [timeRemaining]);

  // Section Timer Countdown Hook: ONLY ticks when testStatus === 'exam' and timeRemaining > 0
  useEffect(() => {
    if (testStatus === 'exam' && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [testStatus, timeRemaining]);

  // Questions of the current section ONLY
  const currentPartQuestions = useMemo(() => {
    return allActiveQuestions.filter((q) => q.part === currentPart);
  }, [allActiveQuestions, currentPart]);

  const currentSectionInfo = useMemo(() => {
    return activeSections.find((s) => s.id === currentPart) || activeSections[0];
  }, [activeSections, currentPart]);

  // Part progress
  const answeredInCurrentPart = useMemo(() => {
    return currentPartQuestions.filter((q) => answers[q.id] !== undefined).length;
  }, [currentPartQuestions, answers]);

  const allQuestionsAnsweredInPart = answeredInCurrentPart === currentPartQuestions.length;

  // Handle answer selection (disabled if part is locked)
  const handleSelectAnswer = (questionId: string, optionKey: AnswerOption) => {
    if (isPartLocked) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  // Start exam from welcome gate
  const handleStartExam = () => {
    setAnswers({});
    setCurrentPart(1);
    setTimeRemaining(activePartDurations[1]);
    setTestStatus('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Continue to the next part or submit
  const handleContinueToNextPart = () => {
    if (currentPart < 4) {
      const next = (currentPart + 1) as 1 | 2 | 3 | 4;
      setCurrentPart(next);
      setTimeRemaining(activePartDurations[next]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Finished all 4 parts! Calculate score and submit
      handleFinishExam();
    }
  };

  // Fast forward timer to 0 for testing/convenience
  const handleDevFastForward = () => {
    setTimeRemaining(0);
  };

  // Open reset warning modal
  const handlePromptResetTest = () => {
    setIsResetWarningOpen(true);
  };

  // Confirm reset: wipe current test answers, timer, and return to main menu (gate)
  const handleConfirmResetTest = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    localStorage.removeItem(STORAGE_ANSWERS_KEY);
    localStorage.removeItem(STORAGE_PART_KEY);
    localStorage.removeItem(STORAGE_TIMER_KEY);
    localStorage.setItem(STORAGE_STATUS_KEY, 'gate');
    setAnswers({});
    setCurrentPart(1);
    setTimeRemaining(activePartDurations[1]);
    setIsResetWarningOpen(false);
    setTestStatus('gate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Finish exam
  const handleFinishExam = () => {
    const score = allActiveQuestions.filter((q) => answers[q.id] === q.correctAnswer).length;
    const sectionScores = examDef.calculateSectionScores(answers);

    // Estimate total time spent across all parts
    const totalAllocated = Object.values(activePartDurations).reduce((a, b) => a + b, 0);
    const timeSpent = Math.max(120, totalAllocated - timeRemaining);

    const newAttempt: ExamAttempt = {
      id: `attempt_${Date.now()}`,
      timestamp: Date.now(),
      examType: selectedExam,
      studentOrganization: studentOrganization || 'Organización Estudiantil Tec',
      studentName: studentName.trim() || 'Aspirante',
      answers: { ...answers },
      score,
      totalQuestions: allActiveQuestions.length,
      timeSpentSeconds: timeSpent,
      sectionScores,
    };

    setAttempts((prev) => [newAttempt, ...prev]);
    setLatestAttempt(newAttempt);
    setReviewAttempt(newAttempt);
    setTestStatus('submitted');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start a new full attempt
  const handleStartNewAttempt = () => {
    setAnswers({});
    setCurrentPart(1);
    setTimeRemaining(activePartDurations[1]);
    setTestStatus('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Retry only incorrect questions
  const handleRetryIncorrectOnly = () => {
    const attemptToUse = reviewAttempt || latestAttempt;
    if (!attemptToUse) return;

    const missedIds = allActiveQuestions
      .filter((q) => attemptToUse.answers[q.id] !== q.correctAnswer)
      .map((q) => q.id);

    if (missedIds.length === 0) {
      return;
    }

    const newAnswers = { ...answers };
    missedIds.forEach((id) => {
      delete newAnswers[id];
    });

    setAnswers(newAnswers);
    setCurrentPart(1);
    setTimeRemaining(activePartDurations[1]);
    setTestStatus('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear history completely
  const handleClearHistory = () => {
    setAttempts([]);
    setLatestAttempt(null);
    setReviewAttempt(null);
    localStorage.removeItem(STORAGE_ATTEMPTS_KEY);
  };

  // Delete a single attempt from history
  const handleDeleteSingleAttempt = (attemptId: string) => {
    const updated = attempts.filter((a) => a.id !== attemptId);
    setAttempts(updated);
    localStorage.setItem(STORAGE_ATTEMPTS_KEY, JSON.stringify(updated));
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
  const activeReviewQuestions = reviewAttempt && reviewAttempt.examType
    ? EXAM_DEFINITIONS[reviewAttempt.examType].questions
    : allActiveQuestions;

  return (
    <div className="min-h-screen w-full bg-white text-black flex flex-col font-serif">
      {/* 1. WELCOME GATE: Main menu where student chooses test between PAA and PIENSE II */}
      {testStatus === 'gate' && (
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
        />
      )}

      {/* 2. EXAM VIEW: Strictly sequential, timed, black & white paper style, no colors */}
      {testStatus === 'exam' && (
        <div className="flex-1 flex flex-col bg-white">
          {/* Header with ONLY the parts, timer, fast forward and reset test buttons */}
          <MicrosoftFormsHeader
            currentPart={currentPart}
            timeRemainingSeconds={timeRemaining}
            isPartLocked={isPartLocked}
            sections={activeSections}
            examShortTitle={examDef.shortTitle}
            onDevFastForward={handleDevFastForward}
            onResetTest={handlePromptResetTest}
          />

          {/* Main Paper Content Container */}
          <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 bg-white">
            {/* PART 1 GRAND TITLE REQUIREMENT */}
            {currentPart === 1 && (
              <div className="bg-white border-4 border-black p-5 sm:p-7 mb-6 text-center">
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-black font-bold block mb-2">
                  {selectedExam === 'piense2'
                    ? 'Tecnológico de Monterrey • PrepaTec • College Board'
                    : `Tecnológico de Monterrey • ${studentOrganization || 'Organizaciones Estudiantiles'} • College Board`}
                </span>
                
                {selectedExam === 'piense2' ? (
                  <>
                    <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-black font-serif">
                      PIENSE II
                    </h1>
                    <div className="w-24 h-1 bg-black mx-auto my-3"></div>
                    <h2 className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider text-black">
                      Prueba de Ingreso y Evaluación en la Educación Secundaria y Media Superior
                    </h2>
                    <p className="text-xs text-black italic mt-1.5 font-serif">
                      Folleto Oficial de Examen • Simulacro Estandarizado (154 Reactivos • 130 Minutos)
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="text-4xl sm:text-7xl font-extrabold uppercase tracking-tight text-black font-serif">
                      PAA
                    </h1>
                  </>
                )}
              </div>
            )}

            {/* Section Title Banner - Organized so texts fit straight */}
            <div className="bg-white border-2 border-black p-4 sm:p-5 mb-6 text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-black font-serif">
                Parte {currentPart}: {currentSectionInfo.name}
              </h2>
              <div className="w-16 h-0.5 bg-black mx-auto my-2"></div>
              <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-black font-mono font-medium flex-wrap">
                <span>{currentPartQuestions.length} Reactivos</span>
                <span>•</span>
                <span>Tiempo asignado: {currentSectionInfo.durationMinutes} minutos</span>
              </div>
              <p className="text-xs text-black font-serif italic mt-1.5">
                {currentSectionInfo.description}
              </p>
            </div>

            {/* Status & Timing Banners - 100% White with Black Borders */}
            {isPartLocked ? (
              /* TIME EXPIRED BANNER -> Part is locked, Continue button enabled */
              <div className="bg-white border-2 border-black p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans">
                <div className="flex items-center gap-2.5 text-black">
                  <Lock className="w-5 h-5 text-black shrink-0" />
                  <div>
                    <div className="font-bold text-sm">Tiempo de la sección concluido</div>
                    <div className="text-xs text-black font-serif">
                      Las respuestas de esta parte están bloqueadas en modo lectura. Presiona continuar para avanzar.
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleContinueToNextPart}
                  className="bg-white hover:bg-black hover:text-white text-black font-bold px-5 py-2.5 text-xs sm:text-sm border-2 border-black flex items-center gap-2 shrink-0 cursor-pointer transition uppercase"
                >
                  <span>{currentPart < 4 ? `Continuar a la Parte ${currentPart + 1}` : 'Finalizar Examen'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : allQuestionsAnsweredInPart ? (
              /* ALL ANSWERED BUT TIMER STILL RUNNING */
              <div className="bg-white border-2 border-black p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-serif">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-black shrink-0" />
                  <div>
                    <div className="font-bold text-sm text-black">Has respondido todas las preguntas de esta parte</div>
                    <div className="text-xs text-black leading-relaxed">
                      Por reglamento oficial, debes esperar a que termine el tiempo ({formatTime(timeRemaining)}) para continuar. Puedes repasar tus respuestas de esta sección.
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleDevFastForward}
                  className="text-xs text-black hover:underline shrink-0 font-sans cursor-pointer font-bold uppercase"
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

            {/* Official STOP Banner with Exam Timing Details */}
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
            <div className="mt-8 border-t-2 border-black pt-6 pb-12 font-sans">
              {isPartLocked ? (
                /* Button enabled when timer finished */
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-black p-4">
                  <div className="text-xs text-black font-serif">
                    <strong>Parte {currentPart} finalizada.</strong> Tus respuestas han quedado registradas.
                  </div>
                  <button
                    onClick={handleContinueToNextPart}
                    className="w-full sm:w-auto bg-black hover:bg-slate-800 text-white font-bold px-6 py-3 text-sm border border-black flex items-center justify-center gap-2 cursor-pointer transition"
                  >
                    <span>{currentPart < 4 ? `Continuar a la Parte ${currentPart + 1}` : 'Finalizar Examen y Ver Resultados'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : allQuestionsAnsweredInPart ? (
                /* Finished questions but waiting for timer */
                <div className="bg-slate-50 border border-black p-4 text-center">
                  <p className="text-sm font-bold text-black font-serif mb-1">
                    Has completado las {currentPartQuestions.length} preguntas de la Parte {currentPart}.
                  </p>
                  <p className="text-xs text-slate-700 font-serif">
                    El botón de continuar estará disponible cuando el temporizador llegue a <strong>00:00</strong> (Tiempo restante: <strong>{formatTime(timeRemaining)}</strong>).
                  </p>
                </div>
              ) : (
                /* Still answering questions */
                <div className="flex justify-between items-center text-xs text-slate-600 font-serif">
                  <span>Respondidas: {answeredInCurrentPart} de {currentPartQuestions.length}</span>
                  <span>Tiempo restante: <strong className="text-black font-mono">{formatTime(timeRemaining)}</strong></span>
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
          onBackToMainMenu={() => setTestStatus('gate')}
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
          onBackToMainMenu={() => setTestStatus('gate')}
        />
      )}

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        attempts={attempts}
        onSelectAttemptForReview={(attempt) => {
          setReviewAttempt(attempt);
          if (attempt.examType && EXAM_DEFINITIONS[attempt.examType]) {
            setSelectedExam(attempt.examType);
          }
          setTestStatus('results');
        }}
        onClearHistory={handleClearHistory}
        onDeleteSingleAttempt={handleDeleteSingleAttempt}
      />

      {/* Reset Test Warning Modal: asks confirmation and returns to main menu */}
      <ResetWarningModal
        isOpen={isResetWarningOpen}
        onClose={() => setIsResetWarningOpen(false)}
        onConfirmReset={handleConfirmResetTest}
      />
    </div>
  );
}
