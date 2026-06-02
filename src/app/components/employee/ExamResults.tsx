import { useNavigate, useLocation } from "react-router";
import { CheckCircle, XCircle, RotateCcw, ArrowLeft } from "lucide-react";
import { colors } from "../shared";

interface ResultsState {
  score: number;
  answers: Record<number, number>;
  questions: { id: number; text: string; options: string[]; correct: number }[];
}

function ScoreCircle({ score }: { score: number }) {
  const passed = score >= 75;
  const r = 52;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;
  const color = passed ? colors.success : colors.error;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: 128, height: 128 }}>
      <svg width={128} height={128} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={64} cy={64} r={r} fill="none" stroke={`${color}20`} strokeWidth={10} />
        <circle cx={64} cy={64} r={r} fill="none" stroke={color} strokeWidth={10}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="absolute text-center">
        <div className="text-3xl font-bold" style={{ color }}>{score}</div>
        <div className="text-xs font-medium" style={{ color: colors.textSecondary }}>/ 100</div>
      </div>
    </div>
  );
}

export function ExamResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ResultsState | null;

  const score = state?.score ?? 72;
  const answers = state?.answers ?? {};
  const questions = state?.questions ?? [];
  const passed = score >= 75;
  const attemptsRemaining = 2;

  return (
    <div className="min-h-screen flex items-center justify-center py-12" style={{ backgroundColor: colors.bg }}>
      <div className="w-full max-w-2xl px-4">
        {/* Results card */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden mb-6" style={{ borderColor: colors.border }}>
          {/* Top stripe */}
          <div className="h-2" style={{ backgroundColor: passed ? colors.success : colors.error }} />

          <div className="p-8 text-center">
            <ScoreCircle score={score} />

            <div className="mt-4 mb-2">
              {passed ? (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle size={22} style={{ color: colors.success }} />
                  <span className="text-xl font-bold" style={{ color: colors.success }}>APPROVED</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <XCircle size={22} style={{ color: colors.error }} />
                  <span className="text-xl font-bold" style={{ color: colors.error }}>NOT APPROVED</span>
                </div>
              )}
            </div>

            <p className="text-sm" style={{ color: colors.textSecondary }}>
              {passed
                ? "Congratulations! You've successfully passed this exam."
                : "You need 75% or higher to pass. Review the material and try again."}
            </p>

            {!passed && attemptsRemaining > 0 && (
              <p className="text-sm mt-2 font-medium" style={{ color: colors.secondary }}>
                Attempts remaining: {attemptsRemaining}
              </p>
            )}
          </div>
        </div>

        {/* Question breakdown */}
        {questions.length > 0 && (
          <div className="bg-white rounded-2xl border shadow-sm p-6 mb-6" style={{ borderColor: colors.border }}>
            <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Question Breakdown</h3>
            <div className="space-y-4">
              {questions.map((q, i) => {
                const selected = answers[i];
                const isCorrect = selected === q.correct;
                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl border"
                    style={{ borderColor: isCorrect ? `${colors.success}30` : `${colors.error}30`, backgroundColor: isCorrect ? `${colors.success}05` : `${colors.error}05` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {isCorrect
                          ? <CheckCircle size={18} style={{ color: colors.success }} />
                          : <XCircle size={18} style={{ color: colors.error }} />
                        }
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>{q.text}</p>
                        <p className="text-xs" style={{ color: isCorrect ? colors.success : colors.error }}>
                          Your answer: <strong>{q.options[selected] ?? "(not answered)"}</strong>
                        </p>
                        {!isCorrect && (
                          <p className="text-xs mt-1" style={{ color: colors.success }}>
                            Correct: <strong>{q.options[q.correct]}</strong>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate("/employee/programs/1")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border font-medium text-sm"
            style={{ borderColor: colors.border, color: colors.textSecondary }}
          >
            <ArrowLeft size={16} /> Return to Program
          </button>
          {!passed && attemptsRemaining > 0 && (
            <button
              onClick={() => navigate("/employee/exam/3")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white"
              style={{ backgroundColor: colors.secondary }}
            >
              <RotateCcw size={16} /> Retry Exam
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
