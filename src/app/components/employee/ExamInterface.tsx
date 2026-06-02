import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { colors } from "../shared";

const EXAM_QUESTIONS = [
  {
    id: 1,
    text: "What is the FIRST action you should take when a fire alarm sounds in an underground mine operation?",
    options: [
      "Continue working until a supervisor confirms",
      "Immediately proceed to the nearest emergency exit following the evacuation plan",
      "Call your colleague on the radio to confirm",
      "Shut down all equipment before evacuating",
    ],
    correct: 1,
  },
  {
    id: 2,
    text: "Which of the following is the correct order for using a fire extinguisher (PASS technique)?",
    options: [
      "Push, Aim, Squeeze, Sweep",
      "Pull, Aim, Shoot, Squeeze",
      "Pull, Aim, Squeeze, Sweep",
      "Push, Angle, Squeeze, Spread",
    ],
    correct: 2,
  },
  {
    id: 3,
    text: "In an underground mine, what does the 'muster point' refer to?",
    options: [
      "The nearest fire extinguisher location",
      "The supervisor's office",
      "A designated safe assembly area for emergencies",
      "The underground ventilation control room",
    ],
    correct: 2,
  },
  {
    id: 4,
    text: "What minimum distance should be maintained between evacuation personnel and a smoke-filled area?",
    options: ["5 meters", "10 meters", "20 meters", "As far as possible per the evacuation route"],
    correct: 3,
  },
  {
    id: 5,
    text: "During a fire emergency, which type of extinguisher should NOT be used on electrical fires?",
    options: ["CO2 extinguisher", "Dry powder extinguisher", "Water extinguisher", "Halotron extinguisher"],
    correct: 2,
  },
];

export function ExamInterface() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showWarning, setShowWarning] = useState(false);

  const question = EXAM_QUESTIONS[current];
  const total = EXAM_QUESTIONS.length;
  const progress = ((current + 1) / total) * 100;
  const isLast = current === total - 1;
  const allAnswered = EXAM_QUESTIONS.every((_, i) => answers[i] !== undefined);

  const selectAnswer = (optionIdx: number) => {
    setAnswers(prev => ({ ...prev, [current]: optionIdx }));
  };

  const handleNext = () => {
    if (current < total - 1) setCurrent(c => c + 1);
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(c => c - 1);
  };

  const handleSubmit = () => {
    if (!allAnswered) { setShowWarning(true); setTimeout(() => setShowWarning(false), 3000); return; }
    const score = EXAM_QUESTIONS.filter((q, i) => answers[i] === q.correct).length;
    const pct = Math.round((score / total) * 100);
    navigate(`/employee/exam/${id}/results`, { state: { score: pct, answers, questions: EXAM_QUESTIONS } });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.bg }}>
      {/* Top bar */}
      <div className="bg-white border-b px-8 py-4" style={{ borderColor: colors.border }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-semibold" style={{ color: colors.textPrimary }}>Fire Safety Theory Exam</h2>
              <p className="text-xs" style={{ color: colors.textSecondary }}>Started: {new Date().toLocaleTimeString()}</p>
            </div>
            <div className="text-sm font-semibold" style={{ color: colors.textSecondary }}>
              Question <span style={{ color: colors.primary, fontSize: 18, fontWeight: 700 }}>{current + 1}</span> of {total}
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-2 rounded-full" style={{ backgroundColor: colors.border }}>
            <div className="h-2 rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: colors.secondary }} />
          </div>
          {/* Question dots */}
          <div className="flex gap-1.5 mt-2">
            {EXAM_QUESTIONS.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrent(i)}
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium cursor-pointer transition-all"
                style={{
                  backgroundColor: i === current ? colors.primary : answers[i] !== undefined ? `${colors.secondary}40` : colors.border,
                  color: i === current ? "white" : answers[i] !== undefined ? colors.secondary : colors.textSecondary,
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-3xl">
          <div className="bg-white rounded-2xl border shadow-sm p-8 mb-6" style={{ borderColor: colors.border }}>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-sm font-semibold px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: colors.primary }}
              >
                Question {current + 1}
              </span>
            </div>
            <p className="text-lg font-semibold leading-relaxed" style={{ color: colors.textPrimary }}>
              {question.text}
            </p>
          </div>

          <div className="space-y-3">
            {question.options.map((option, i) => {
              const selected = answers[current] === i;
              return (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  className="w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-sm"
                  style={{
                    borderColor: selected ? colors.primary : colors.border,
                    backgroundColor: selected ? colors.primary : "white",
                    color: selected ? "white" : colors.textPrimary,
                    boxShadow: selected ? `0 4px 12px ${colors.primary}30` : "none",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: selected ? "rgba(255,255,255,0.2)" : colors.bg, color: selected ? "white" : colors.textSecondary }}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    {option}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Warning */}
          {showWarning && (
            <div className="mt-4 p-3 rounded-xl text-sm font-medium text-white text-center" style={{ backgroundColor: colors.error }}>
              Please answer all questions before submitting.
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-t px-8 py-4" style={{ borderColor: colors.border }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className="px-6 py-2.5 rounded-xl border text-sm font-medium transition-all disabled:opacity-40"
            style={{ borderColor: colors.border, color: colors.textSecondary }}
          >
            ← Previous
          </button>

          <span className="text-xs" style={{ color: colors.textSecondary }}>
            {Object.keys(answers).length} of {total} answered
          </span>

          {isLast ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ backgroundColor: colors.secondary }}
            >
              Submit Exam →
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ backgroundColor: colors.primary }}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
